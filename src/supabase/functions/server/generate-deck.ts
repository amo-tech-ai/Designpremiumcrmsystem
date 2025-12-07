import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const generateDeckHandler = async (c: any) => {
  try {
    const payload = await c.req.json();
    const { deckId, businessContext, deckType, wizardData, templateId, format } = payload;

    if (!deckId) {
      return c.json({ error: "deckId is required" }, 400);
    }

    const selectedTemplate = templateId || 'startup';

    // Update the deck with the template if provided
    if (templateId) {
      await supabase
        .from('decks')
        .update({ template: templateId })
        .eq('id', deckId);
    }

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return c.json({ error: "Server configuration error: Missing AI Key" }, 500);
    }

    // Define style instructions based on template
    const styleInstructions = {
      'startup': "Use a bright, optimistic, clear tech founder tone. Keep titles punchy.",
      'minimal-dark': "Use a confident, dramatic, concise, high-contrast messaging style. Short titles, strong verbs.",
      'classic-clean': "Use a professional, balanced, and trustworthy tone. Standard business terminology.",
      'enterprise-pro': "Use a formal, corporate, and detailed tone. Emphasize reliability and scale.",
      'modern-minimal': "Use a clean, friendly, and approachable SaaS tone. Simple language.",
      'dark-mode': "Use a sleek, futuristic, and developer-focused tone. Technical precision.",
      'vibrant-bold': "Use an energetic, exciting, and consumer-focused tone. engaging hooks.",
    };

    const toneInstruction = styleInstructions[selectedTemplate as keyof typeof styleInstructions] || styleInstructions['startup'];

    // 1. Construct the Prompt
    const prompt = `
      You are an expert venture capital consultant and pitch deck designer.
      
      PITCH DECK RULES:
      1. Title: Logo + tagline max 5 words
      2. Problem: Exactly 3 pain points
      3. Solution: One solution per problem
      4. Market: TAM/SAM/SOM with $ numbers + why now
      5. Competition: List 3 competitors, 2x2 matrix
      6. Traction: Single most impressive metric
      7. Team: Name + credential + past company logo
      8. Ask: Specific $ + 4 use-of-funds %

      AVOID: walls of text, no competition claims, features over outcomes

      Strictly enforce these schema constraints:
      - tagline: Must be under 50 characters (approx 5 words).
      - painPoints: Must have exactly 3 items.
      - market.whyNow: This field is required (string). Explain why this is the right time.
      - competitors: Must list at least 2 competitors.
      - useOfFunds: Must have between 3 and 4 items.

      ${format === 'yc' 
        ? `STRUCTURE (YC Format - 7 Slides):
           1. Title
           2. Traction (Show momentum early!)
           3. Problem
           4. Solution
           5. Market
           6. Team
           7. Ask`
        : `STRUCTURE (Sequoia Format - 10 Slides):
           1. Title
           2. Problem
           3. Solution
           4. Why Now
           5. Market Size
           6. Competition
           7. Product
           8. Business Model
           9. Team
           10. Financials/Ask`}

      Generate a ${deckType || "investor_pitch"} deck for a startup with the following context:
      ${businessContext}
      
      Additional Details: ${JSON.stringify(wizardData || {})}

      Style & Tone: ${toneInstruction}
      Use the "${selectedTemplate}" visual style when writing slide titles and bullets.

      Output a JSON object with a "slides" array. Each slide must have:
      - type: One of ['Title', 'Problem', 'Solution', 'Market', 'Product', 'Traction', 'BusinessModel', 'Team', 'Vision', 'Ask']
      - title: A compelling slide title.
      - content: An array of 3-5 punchy bullet points.
      - notes: Speaker notes for the presenter.
      - visualDescription: A prompt for an image generator to create a relevant background or illustration.

      Ensure the narrative flow is logical.
      Return ONLY the JSON.
    `;

    // 2. Call Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini API Error:", errText);
      throw new Error("Failed to generate content from AI provider");
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawText) {
      throw new Error("Empty response from AI");
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(rawText);
    } catch (e) {
      // Fallback cleanup if markdown blocks exist
      const cleanText = rawText.replace(/```json/g, "").replace(/```/g, "");
      parsedResult = JSON.parse(cleanText);
    }

    const slides = parsedResult.slides || [];

    // 3. Insert into Supabase
    // We assume the 'slides' table exists as per prompt instructions
    const slidesToInsert = slides.map((slide: any, index: number) => ({
      deck_id: deckId,
      order_index: index,
      type: slide.type,
      title: slide.title,
      content: slide.content, // Arrays are automatically stringified for JSONB columns usually
      notes: slide.notes,
      image_prompt: slide.visualDescription,
      created_at: new Date().toISOString()
    }));

    const { error: dbError } = await supabase
      .from('slides')
      .insert(slidesToInsert);

    if (dbError) {
      console.error("Database Insert Error:", dbError);
      // Fallback: If table doesn't exist, we return the slides to the frontend
      // so the frontend can handle it (e.g. using local state or KV)
      return c.json({ 
        warning: "Could not save to database (table might be missing), returning generated slides.",
        slides: slidesToInsert 
      });
    }

    return c.json({ success: true, count: slidesToInsert.length });

  } catch (error: any) {
    console.error("Generate Deck Error:", error);
    return c.json({ error: error.message }, 500);
  }
};
