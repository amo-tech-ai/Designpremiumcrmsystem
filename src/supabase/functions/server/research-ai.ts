import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const researchAIHandler = async (c: any) => {
  try {
    const payload = await c.req.json();
    const { topic, requirements, deckId, slideId } = payload;

    if (!GEMINI_API_KEY) {
      return c.json({ error: "Server configuration error: Missing AI Key" }, 500);
    }

    // 1. Setup Supabase Client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 1. Construct Prompt
    const prompt = `
      You are a market researcher.
      Topic: ${topic}
      Requirements: ${JSON.stringify(requirements)}
      
      Task: Perform a deep research analysis.
      Find TAM, SAM, SOM, and CAGR for the given topic.
      Provide citations with URLs.
      
      Output JSON format:
      {
        "tam": "string",
        "sam": "string",
        "som": "string",
        "cagr": "string",
        "sources": [{"url": "string", "snippet": "string"}]
      }
    `;

    // 2. Call Gemini with Search Grounding
    // Note: Search Grounding via REST API requires specific tools configuration
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ googleSearchRetrieval: { dynamicRetrievalConfig: { mode: "MODE_DYNAMIC", dynamicThreshold: 0.7 } } }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${errText}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const groundingMetadata = data.candidates?.[0]?.groundingMetadata;

    if (!rawText) throw new Error("Empty AI response");

    // 3. Parse Result
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      const clean = rawText.replace(/```json/g, "").replace(/```/g, "");
      result = JSON.parse(clean);
    }

    // 4. Merge Search Metadata if present (fallback/augment sources)
    if (groundingMetadata?.groundingChunks) {
      const groundedSources = groundingMetadata.groundingChunks
        .filter((c: any) => c.web?.uri)
        .map((c: any) => ({
          url: c.web.uri,
          snippet: c.web.title || "Source"
        }));
      
      // If AI didn't return sources in JSON, or we want to append
      if (!result.sources || result.sources.length === 0) {
        result.sources = groundedSources;
      }
    }

    // 5. Save Citations (Postgres public.citations)
    if (slideId && result.sources && result.sources.length > 0) {
      const citationsToInsert = result.sources.map((s: any) => ({
        slide_id: slideId,
        source_url: s.url || "unknown",
        quote: s.snippet || "",
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('citations')
        .insert(citationsToInsert);
        
      if (error) {
        console.error("Failed to save citations:", error);
      }
    }

    return c.json({
      success: true,
      data: result
    });

  } catch (error: any) {
    console.error("Research AI Error:", error);
    return c.json({ error: error.message }, 500);
  }
};
