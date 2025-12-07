import { supabase } from '../utils/supabase/client';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/**
 * Generic service to call Supabase Edge Functions.
 * Note: We use fetch directly instead of supabase.functions.invoke because 
 * our backend is a monolithic Hono server requiring specific route paths.
 */
export async function callEdgeFunction<T>(name: string, payload: unknown = {}): Promise<T> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 60000); // 60s timeout

  try {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token || publicAnonKey;

    // Hono server router pattern
    const url = `https://${projectId}.supabase.co/functions/v1/make-server-6522a742/${name}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(id);

    if (!response.ok) {
      let errorMessage = `Error calling ${name}: ${response.statusText}`;
      try {
        const errorBody = await response.json();
        if (errorBody.error) errorMessage = errorBody.error;
        if (errorBody.message) errorMessage = errorBody.message;
      } catch {
        // failed to parse error json
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data as T;

  } catch (error: any) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      throw new Error(`Request to ${name} timed out after 60 seconds`);
    }
    console.error(`Edge Function Error (${name}):`, error);
    throw error;
  }
}

// --- Typed Helpers ---

export interface GenerateDeckPayload {
  deckId: string;
  businessContext: string;
  sourceUrls?: string[];
  deckType: "investor_pitch" | "sales_deck";
  template?: string;
  wizardData?: Record<string, unknown>;
}

export const generateDeck = async (payload: GenerateDeckPayload) => {
  return callEdgeFunction('generate-deck', payload);
};

export const slideAI = async (payload: any) => {
  return callEdgeFunction('slide-ai', payload);
};

export const analyzeSlideAI = async (payload: { slideId: string; slideContent: any; action: 'analyze' }) => {
  return callEdgeFunction<{ score: number; suggestions: string[] }>('slide-ai', payload);
};

export const rewriteSlide = async (payload: { slideId: string; action: 'rewrite'; prompt: string; currentContent?: any }) => {
  return callEdgeFunction<{ title: string; content: string; bullets: string[] }>('slide-ai', payload);
};

export const chatWithSlide = async (payload: { action: string; message?: string; slideTitle?: string; slideContent?: any; slideType?: string }) => {
  return callEdgeFunction('slide-ai', payload);
};

export const imageAI = async (payload: {
  prompt: string;
  style: "photo" | "illustration" | "abstract" | "chart";
  aspectRatio: "16:9" | "1:1" | "4:3";
  slideType: string;
}) => {
  return callEdgeFunction<{ success: boolean; imageUrl: string; prompt: string }>('image-ai', payload);
};

export const researchAI = async (payload: {
  topic: string;
  requirements: string[];
  deckId?: string;
  slideId?: string;
}) => {
  return callEdgeFunction<{
    success: boolean;
    data: {
      tam: string;
      sam: string;
      som: string;
      cagr: string;
      sources: Array<{ url: string; snippet: string }>;
    }
  }>('research-ai', payload);
};

export const researchTopic = async (payload: { query: string; slideType?: string }) => {
  return callEdgeFunction<{ content: string; citations: Array<{ url: string; title: string }> }>('research-ai', payload);
};

export const generateSlideImage = async (payload: { slideId: string; prompt: string; style?: string }) => {
  return callEdgeFunction<{ imageUrl: string }>('image-ai', payload);
};