import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

export const imageAIHandler = async (c: any) => {
  try {
    const { prompt, style, aspectRatio, slideType } = await c.req.json();

    if (!GEMINI_API_KEY) {
      return c.json({ error: "Server configuration error: Missing AI Key" }, 500);
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return c.json({ error: "Server configuration error: Missing Supabase Credentials" }, 500);
    }

    // 1. Setup Supabase Client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 2. Ensure Bucket Exists (Idempotent)
    const bucketName = "make-6522a742-deck-assets";
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === bucketName)) {
      await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ["image/png", "image/jpeg"]
      });
    }

    // 3. Construct Prompt & Parameters
    // Map style to descriptive keywords
    const styleMap: Record<string, string> = {
      photo: "photorealistic, high quality photography, cinematic lighting",
      illustration: "modern vector illustration, flat design, corporate art style",
      abstract: "abstract geometric shapes, modern background, gradient, tech",
      chart: "professional data visualization, clean chart, business graphics"
    };

    const stylePrompt = styleMap[style] || styleMap["photo"];
    const fullPrompt = `Generate a ${stylePrompt} image suitable for a pitch deck slide.
    Slide Context: ${slideType}
    Subject: ${prompt}
    Requirements: Professional, clean, no text, high resolution.`;

    // 4. Call Google Imagen API
    // Using Imagen 3 endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        instances: [{ prompt: fullPrompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: aspectRatio || "16:9"
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini Imagen Error:", errText);
      throw new Error(`AI Image Generation failed: ${response.statusText}`);
    }

    const data = await response.json();
    const b64Data = data.predictions?.[0]?.bytesBase64Encoded;

    if (!b64Data) {
      throw new Error("No image data returned from AI");
    }

    // 5. Convert to Binary
    const binaryString = atob(b64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 6. Upload to Supabase
    const fileName = `generated/${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, bytes, {
        contentType: "image/png",
        upsert: false,
        metadata: {
          prompt,
          style,
          slideType,
          generatedBy: "Gemini Imagen 3"
        }
      });

    if (uploadError) {
      throw new Error(`Storage Upload Error: ${uploadError.message}`);
    }

    // 7. Get Signed URL
    const { data: signedUrlData, error: signError } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(fileName, 31536000); // 1 year validity

    if (signError || !signedUrlData?.signedUrl) {
      throw new Error("Failed to generate access URL");
    }

    return c.json({
      success: true,
      imageUrl: signedUrlData.signedUrl,
      prompt: prompt
    });

  } catch (error: any) {
    console.error("Image AI Handler Error:", error);
    return c.json({ error: error.message }, 500);
  }
};
