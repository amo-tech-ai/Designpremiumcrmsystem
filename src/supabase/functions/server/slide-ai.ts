import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

export const slideAIHandler = async (c: any) => {
  try {
    const payload = await c.req.json();
    const { 
      action, 
      slideTitle, 
      slideContent, 
      slideType, 
      deckContext, 
      message, 
      tone 
    } = payload;

    if (!GEMINI_API_KEY) {
      return c.json({ error: "Server configuration error: Missing AI Key" }, 500);
    }

    // 1. Construct prompt based on action
    let systemInstruction = `
      You are an expert pitch deck copywriter and analyst.
      Context: ${deckContext || "A professional investor pitch deck."}
      Slide Type: ${slideType || "General"}
      Current Title: ${slideTitle}
      Current Content: ${JSON.stringify(slideContent)}
      Tone: ${tone || "Professional, confident, and concise."}
    `;

    let userPrompt = "";

    switch (action) {
      case "rewrite":
        userPrompt = `Rewrite the slide content to be more compelling and clearer. Focus on strong verbs and benefits. Output a JSON object with 'title', 'content' (array of strings), and 'explanation'.`;
        break;
      case "expand":
        userPrompt = `Expand the slide content by adding 20-30% more detail. Add sub-points or data backing if relevant. Output a JSON object with 'title', 'content' (array of strings), and 'explanation'.`;
        break;
      case "shorten":
        userPrompt = `Condense the slide content. Max 4 bullet points. Be extremely punchy. Output a JSON object with 'title', 'content' (array of strings), and 'explanation'.`;
        break;
      case "analyze":
        userPrompt = `Analyze this slide. Provide a 'clarityScore' (0-100), 'impactScore' (0-100), 'toneScore' (0-100), and an array of 'suggestions'. Output JSON.`;
        break;
      case "chat":
        userPrompt = `The user says: "${message}". Respond helpfully. If you recommend changing the slide, provide a 'suggestedAction' object with 'type' (update_content | update_title) and 'payload'. Output JSON with 'reply' and optional 'suggestedAction'.`;
        break;
      default:
        return c.json({ error: "Invalid action" }, 400);
    }

    // 2. Call Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemInstruction + "\n\nTask: " + userPrompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      }),
    });

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      throw new Error(`Gemini API Error: ${errText}`);
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("Empty AI response");

    // 3. Parse and Return
    let result;
    try {
      result = JSON.parse(rawText);
    } catch {
      // Clean markdown if present
      const clean = rawText.replace(/```json/g, "").replace(/```/g, "");
      result = JSON.parse(clean);
    }

    return c.json({
      success: true,
      result: result
    });

  } catch (error: any) {
    console.error("Slide AI Error:", error);
    return c.json({ error: error.message }, 500);
  }
};
