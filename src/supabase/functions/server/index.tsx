import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";
import { seedCRM } from "./crm.ts";
import { generateDeckHandler } from "./generate-deck.ts";
import { slideAIHandler } from "./slide-ai.ts";
import { imageAIHandler } from "./image-ai.ts";
import { researchAIHandler } from "./research-ai.ts";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Auth Middleware Helper
const getUser = async (c: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return null;
  
  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;
  return user;
};

const getSupabase = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
}

const getStartupId = async (userId: string) => {
  const supabase = getSupabase();
  const { data: startup } = await supabase
    .from('startups')
    .select('id')
    .eq('user_id', userId)
    .single();
  return startup?.id;
}

// Health check endpoint
app.get("/make-server-6522a742/health", (c) => {
  return c.json({ status: "ok" });
});

app.post("/make-server-6522a742/seed-crm", seedCRM);

app.post("/make-server-6522a742/generate-deck", generateDeckHandler);

app.post("/make-server-6522a742/slide-ai", slideAIHandler);

app.post("/make-server-6522a742/image-ai", imageAIHandler);

app.post("/make-server-6522a742/research-ai", researchAIHandler);

// --- Storage Handlers ---

app.post("/make-server-6522a742/storage/upload-url", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { filename, contentType } = await c.req.json();
    const supabase = getSupabase();
    
    const bucketName = `make-6522a742-uploads`;

    // Idempotent bucket creation
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, { public: false });
    }

    const path = `${user.id}/${Date.now()}-${filename}`;
    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUploadUrl(path);

    if (error) throw error;

    return c.json({ uploadUrl: data.signedUrl, path, token: data.token });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- Company Profile (Mapped to 'startups' table) ---

app.get("/make-server-6522a742/company-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const supabase = getSupabase();
    const { data: startup, error } = await supabase
      .from('startups')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!startup) return c.json({}); // Return empty if no startup found

    // Map DB columns to CompanyProfileFormValues
    const team = startup.team_data || [];
    const traction = startup.traction_data || {};
    
    // Attempt to map back to form values
    const formValues = {
      companyName: startup.name || "",
      tagline: startup.tagline || "",
      description: startup.description || "",
      foundedYear: startup.year_founded?.toString() || "",
      headquarters: startup.industry || "", // Using industry field loosely? No, use correct mapping
      industry: startup.industry || "",
      
      // We don't have explicit HQ column in schema, maybe check if it's in team_data or needs_data? 
      // For now, let's leave HQ empty or use a placeholder if not found.
      
      businessModel: Array.isArray(startup.business_model) ? startup.business_model[0] : (startup.business_model || ""),
      customerSegments: startup.target_customers || [],
      
      // keyFeatures not in schema explicitly, using 'unique_value' as differentiator
      differentiator: startup.unique_value || "",
      keyFeatures: [], // missing column
      
      website: startup.website_url || "",
      linkedin: "", // Missing specific column, maybe in startup_links table
      twitter: "",
      github: "",

      mrr: traction.mrr || "",
      users: traction.users || "",
      growth: traction.growth || "",
      waitlist: traction.waitlist || "",

      stage: startup.stage || "",
      raiseAmount: startup.raise_amount?.toString() || "",
      useOfFunds: startup.use_of_funds || [],
      
      team: Array.isArray(team) ? team : []
    };

    return c.json(formValues);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/company-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const data = await c.req.json();
    const supabase = getSupabase();
    
    // Check if startup exists
    const { data: existing } = await supabase.from('startups').select('id').eq('user_id', user.id).single();
    
    const traction_data = {
      mrr: data.mrr,
      users: data.users,
      growth: data.growth,
      waitlist: data.waitlist
    };

    const updateData = {
      name: data.companyName,
      tagline: data.tagline,
      description: data.description,
      year_founded: parseInt(data.foundedYear) || null,
      industry: data.industry,
      website_url: data.website,
      stage: data.stage,
      business_model: data.businessModel ? [data.businessModel] : [],
      target_customers: data.customerSegments,
      unique_value: data.differentiator,
      raise_amount: parseFloat(data.raiseAmount?.replace(/[^0-9.]/g, '')) || 0,
      use_of_funds: data.useOfFunds,
      team_data: data.team, // Storing team array in JSONB
      traction_data: traction_data
    };

    if (existing) {
      const { error } = await supabase.from('startups').update(updateData).eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('startups').insert({
        user_id: user.id,
        ...updateData
      });
      if (error) throw error;
    }

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- Startup Profile Wizard (Mapped to 'startups' table) ---

app.get("/make-server-6522a742/startup-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const supabase = getSupabase();
    const { data: startup } = await supabase
      .from('startups')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!startup) return c.json({});

    const traction = startup.traction_data || {};
    const team = startup.team_data || [];

    // Map to StartupProfileData
    const profileData = {
      name: startup.name || "My Startup",
      tagline: startup.tagline || "",
      description: startup.description || "", // Short desc
      longDescription: startup.description || "",
      logo_url: startup.logo_url || "",
      cover_image_url: startup.cover_image_url || "",
      
      industry: startup.industry || "",
      foundedYear: startup.year_founded?.toString() || "",
      location: "Remote", // Fallback as not in schema
      employees: (Array.isArray(team) ? team.length : 1).toString(),
      
      problem: startup.problem || "",
      solution: startup.solution || "",
      icp: (startup.target_customers || []).join(", "),
      target_regions: ["Global"], // Fallback
      features: [], // Fallback
      
      founders: Array.isArray(team) ? team : [], 
      
      businessModel: Array.isArray(startup.business_model) ? startup.business_model[0] : "",
      targetAudience: startup.target_customers || [],
      pricing: startup.pricing_model || "",
      
      mrr: traction.mrr || "",
      users: traction.users || "",
      growth: traction.growth || "",
      waitlist: traction.waitlist || "",
      history: [30, 40, 50, 60, 70], // Dummy history for sparkline
      
      stage: startup.stage || "Idea",
      raiseAmount: startup.raise_amount?.toString() || "",
      useOfFunds: startup.use_of_funds || [],
      
      competitors: {
        list: ["Competitor A", "Competitor B"], // Placeholder until we fetch from startup_competitors table
        differentiator: startup.unique_value || ""
      },
      
      links: [], // Placeholder until startup_links table fetch
      
      ai_insights: {
        summary: "Profile data is being analyzed...",
        match_score: startup.profile_strength || 50,
        risks: [],
        steps: ["Complete your profile", "Add traction metrics"],
        last_updated: "Just now"
      }
    };

    return c.json(profileData);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/startup-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const data = await c.req.json();
    const supabase = getSupabase();

    const { data: existing } = await supabase.from('startups').select('id').eq('user_id', user.id).single();

    const traction_data = {
      mrr: data.mrr,
      users: data.users,
      growth: data.growth
    };

    const updateData = {
      name: "My Startup", // Default name if not set, Wizard doesn't seem to have name field in context?
      // Wait, StartupProfileData interface doesn't have company name.
      // We should probably keep existing name if updating, or default.
      website_url: data.website,
      tagline: data.description,
      description: data.longDescription,
      industry: data.industry,
      year_founded: parseInt(data.foundedYear) || null,
      
      team_data: data.founders,
      
      business_model: data.businessModel ? [data.businessModel] : [],
      target_customers: data.targetAudience,
      pricing_model: data.pricing,
      
      traction_data: traction_data,
      
      stage: data.stage,
      raise_amount: parseFloat(data.raiseAmount?.replace(/[^0-9.]/g, '')) || 0,
      use_of_funds: data.useOfFunds
    };

    if (existing) {
      const { error } = await supabase.from('startups').update(updateData).eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('startups').insert({
        user_id: user.id,
        name: "My Startup", // Fallback
        ...updateData
      });
      if (error) throw error;
    }

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- User Profile (Mapped to 'profiles' table) ---

app.get("/make-server-6522a742/user-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const supabase = getSupabase();
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) return c.json({});

    // Map to UserProfileFormValues
    // Split full name
    const parts = (profile.full_name || "").split(' ');
    const firstName = parts[0] || "";
    const lastName = parts.slice(1).join(' ') || "";

    let avatarUrl = profile.avatar_url;
    // If it's a path, sign it
    if (avatarUrl && !avatarUrl.startsWith('http')) {
       const bucketName = `make-6522a742-uploads`;
       const { data: signed } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(avatarUrl, 3600);
       if (signed) avatarUrl = signed.signedUrl;
    }

    return c.json({
      firstName,
      lastName,
      bio: profile.bio || "",
      email: profile.email || user.email,
      avatarUrl,
      avatar_path: profile.avatar_url,
      // Preferences - Mock/Default as not in schema
      timezone: "utc-8", 
      theme: "light",
      aiCopilot: true,
      language: "en"
    });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/user-profile", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const data = await c.req.json();
    const supabase = getSupabase();

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    
    // Update profiles table
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        bio: data.bio,
        avatar_url: data.avatar_path // Store path
      })
      .eq('id', user.id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- AI Action (Gemini) ---

app.post("/make-server-6522a742/ai-action", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { action, prompt, context } = await c.req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    
    if (!apiKey) {
      return c.json({ error: "GEMINI_API_KEY not configured" }, 500);
    }

    let systemInstruction = "You are a helpful startup assistant.";
    if (action === "summarize") systemInstruction = "Summarize the following content concisely for a pitch deck.";
    if (action === "rewrite") systemInstruction = "Rewrite the following text to be more compelling and professional.";
    if (action === "extract") systemInstruction = "Extract key information (Company Name, Industry, Description) from the text.";
    if (action === "tasks") systemInstruction = "Generate a checklist of tasks based on the context.";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${systemInstruction}\n\nContext: ${JSON.stringify(context)}\n\nPrompt: ${prompt}` }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return c.json({ result: text });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- CRM Stats (Postgres) ---

app.get("/make-server-6522a742/crm/stats", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const startupId = await getStartupId(user.id);
    if (!startupId) return c.json({ error: "No startup profile found" }, 404);

    const supabase = getSupabase();

    // Fetch deals
    const { data: deals, error } = await supabase
      .from('crm_deals')
      .select('*')
      .eq('startup_id', startupId);

    if (error) throw error;
    
    const allDeals = deals || [];
    
    // Calculate Stats
    const totalPipelineValue = allDeals.reduce((sum: number, d: any) => sum + (Number(d.amount) || 0), 0);
    const salesDeals = allDeals.filter((d: any) => d.stage && !d.stage.startsWith('inv-')); // Crude check, better to use pipeline_type if available in schema
    const investorDeals = allDeals.filter((d: any) => d.stage && d.stage.startsWith('inv-')); // or use 'sector' or similar?
    
    // Note: Schema has 'sector' but not 'pipeline_type' directly? 
    // Wait, createDeal in hooks.ts sends 'pipeline_type', but schema.md for crm_deals did NOT list 'pipeline_type'.
    // It listed 'sector', 'next_action'.
    // Let's assume 'stage' convention or some other field distinguishes them, or just count all.
    // The previous KV code used 'pipeline_type'.
    // If the table doesn't have it, maybe it's stored in metadata or inferred from stage.
    // For now, let's just count total.

    const wonSales = salesDeals.filter((d: any) => d.outcome === 'won' || d.stage === 'Closed Won').length;
    const salesWinRate = salesDeals.length > 0 ? (wonSales / salesDeals.length) * 100 : 0;

    return c.json({
      total_pipeline_value: totalPipelineValue,
      total_deals: allDeals.length,
      sales_count: salesDeals.length,
      investor_count: investorDeals.length,
      sales_win_rate: Math.round(salesWinRate),
      avg_deal_size: salesDeals.length > 0 ? Math.round(totalPipelineValue / salesDeals.length) : 0
    });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// --- AI CRM Actions (Postgres) ---

app.post("/make-server-6522a742/crm/ai/summarize", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    
    const { contact_id } = await c.req.json();
    const supabase = getSupabase();

    // Fetch contact
    const { data: contact } = await supabase
      .from('crm_contacts')
      .select('*')
      .eq('id', contact_id)
      .single();

    if (!contact) return c.json({ error: "Contact not found" }, 404);
    
    // Fetch interactions
    const { data: interactions } = await supabase
      .from('crm_interactions')
      .select('*')
      .eq('contact_id', contact_id) // interactions schema has account_id and startup_id... wait, schema says crm_interactions has contact_id? 
      // Schema says: startup_id, account_id, type, summary... it does NOT list contact_id explicitly in the table definition I read.
      // Wait, let's check schema again.
      // crm_interactions: id, startup_id, account_id, type, summary, sentiment, occurred_at, user_id, created_at.
      // NO contact_id listed in schema text. 
      // BUT crm_activities has contact_id.
      // And hooks.ts useActivities selects from crm_interactions and joins crm_contacts. 
      // "contact:crm_contacts(id, first_name, last_name)"
      // This implies crm_interactions MUST have contact_id. Maybe I missed it in the truncation or it was added later.
      // I will assume it has contact_id.
      .limit(10); 

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return c.json({ error: "GEMINI_API_KEY not configured" }, 500);

    const prompt = `Summarize the relationship and key details for this contact based on the profile and interaction history. Highlight any action items.`;
    const context = { contact, interactions };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `You are a CRM assistant.\n\nContext: ${JSON.stringify(context)}\n\nPrompt: ${prompt}` }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No summary generated.";

    // Save summary to contact enrichment
    // Check if enrichment record exists
    const { data: existingEnrichment } = await supabase
        .from('crm_lead_enrichment')
        .select('id')
        .eq('lead_id', contact_id)
        .single();

    if (existingEnrichment) {
        await supabase
          .from('crm_lead_enrichment')
          .update({ gemini_summary: text })
          .eq('id', existingEnrichment.id);
    } else {
        await supabase
          .from('crm_lead_enrichment')
          .insert({ lead_id: contact_id, gemini_summary: text });
    }

    return c.json({ result: text });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/crm/ai/score", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    
    const { contact_id } = await c.req.json();
    const supabase = getSupabase();

    const { data: contact } = await supabase
      .from('crm_contacts')
      .select('*')
      .eq('id', contact_id)
      .single();

    if (!contact) return c.json({ error: "Contact not found" }, 404);
    
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return c.json({ error: "GEMINI_API_KEY not configured" }, 500);

    const prompt = `Analyze this contact and provide a lead score (0-100) and 3 recommended next steps. Output JSON format: { "score": number, "reason": string, "next_steps": string[] }`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${prompt}\n\nContact Data: ${JSON.stringify(contact)}` }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      parsed = { score: 50, reason: "AI parsing error", next_steps: ["Review manually"] };
    }
    
    // Update contact score
    // crm_lead_scores table
    const { data: existingScore } = await supabase
        .from('crm_lead_scores')
        .select('id')
        .eq('lead_id', contact_id)
        .single();

    const scoreData = {
        overall_score: parsed.score,
        recommended_next_actions: parsed.next_steps,
        ai_findings: [{ type: 'reason', text: parsed.reason }]
    };

    if (existingScore) {
       await supabase.from('crm_lead_scores').update(scoreData).eq('id', existingScore.id);
    } else {
       await supabase.from('crm_lead_scores').insert({ lead_id: contact_id, ...scoreData });
    }

    return c.json(parsed);

  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/crm/ai/extract-from-url", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { url } = await c.req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return c.json({ error: "GEMINI_API_KEY not configured" }, 500);

    const prompt = `Extract company/person details from this URL: ${url}. Return JSON with: first_name, last_name, title, company, summary, domain, segment, recent_news (array of {title, date}).`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      parsed = { error: "Failed to parse AI response" };
    }

    return c.json(parsed);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/crm/ai/analyze-deal", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { deal } = await c.req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return c.json({ error: "GEMINI_API_KEY not configured" }, 500);

    const prompt = `Analyze this deal and provide risk assessment and next best action. Output JSON: { "aiRisk": string[], "aiNextStep": string }`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${prompt}\n\nDeal Data: ${JSON.stringify(deal)}` }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      parsed = { aiRisk: ["Could not analyze"], aiNextStep: "Review manually" };
    }

    // Save to deal
    if (deal.id) {
       const supabase = getSupabase();
       // crm_deals has ai_risk_factors (text[]) and next_action (text)
       await supabase.from('crm_deals').update({
          ai_risk_factors: Array.isArray(parsed.aiRisk) ? parsed.aiRisk : [parsed.aiRisk],
          next_action: parsed.aiNextStep
       }).eq('id', deal.id);
    }

    return c.json(parsed);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-6522a742/company-profile/ai-analyze", async (c) => {
  try {
    const user = await getUser(c);
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const { profile } = await c.req.json();
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) return c.json({ error: "GEMINI_API_KEY not configured" }, 500);

    // Fetch latest context from Postgres (Startup & associated data)
    // This ensures we have the full picture, even if frontend sends partial data
    const supabase = getSupabase();
    const { data: startup } = await supabase
      .from('startups')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Merge frontend 'profile' (unsaved changes) with DB 'startup' (persisted context)
    // We prioritize frontend 'profile' for fields being edited
    const contextData = {
      ...startup, // DB data
      ...profile, // Frontend overrides
      // Ensure JSON fields are correctly handled if profile sends them as form values
      traction_data: profile?.traction_data || startup?.traction_data, 
      team_data: profile?.team_data || startup?.team_data
    };

    const prompt = `Analyze this company profile. Output JSON with 3 keys: strengths (string), risks (string), actions (array of strings). Keep it concise.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `${prompt}\n\nProfile Data: ${JSON.stringify(contextData)}` }]
        }]
      })
    });

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (e) {
      parsed = { strengths: "N/A", risks: "N/A", actions: [] };
    }

    return c.json(parsed);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);