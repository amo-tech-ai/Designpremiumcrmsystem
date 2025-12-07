import { supabase } from '../../utils/supabase/client';

// Helper to handle function invocation with consistent error handling
async function invoke<T>(functionName: string, body: any): Promise<T> {
  try {
    // We use the 'make-server-6522a742' prefix as per the monolithic server setup
    // mapped in supabase/functions/server/index.tsx
    const { data, error } = await supabase.functions.invoke(`make-server-6522a742/${functionName}`, {
      body,
    });

    if (error) {
      console.error(`Edge function ${functionName} error:`, error);
      throw error;
    }

    return data as T;
  } catch (err) {
    console.error(`Failed to invoke ${functionName}:`, err);
    throw err;
  }
}

export interface GenerateDeckInput {
  businessContext: string;
  urls?: string[];
  templateId: string;
  format: 'standard' | 'yc' | 'sequoia';
  deckId?: string; // Optional, can be passed to link immediately
  wizardData?: any; // Full wizard data for context
}

export interface GenerateDeckResponse {
  deckId: string;
  slides: any[];
}

export const generateDeck = async (input: GenerateDeckInput): Promise<GenerateDeckResponse> => {
  return invoke<GenerateDeckResponse>('generate-deck', input);
};

export interface GenerateSlideImageInput {
  slideId: string;
  prompt: string;
  style?: string;
}

export interface GenerateSlideImageResponse {
  imageUrl: string;
}

export const generateSlideImage = async (input: GenerateSlideImageInput): Promise<GenerateSlideImageResponse> => {
  return invoke<GenerateSlideImageResponse>('image-ai', input);
};

export interface RewriteSlideInput {
  slideId: string;
  action: 'rewrite';
  prompt: string;
  currentContent?: any;
}

export interface RewriteSlideResponse {
  title: string;
  content: string; // or string[] depending on implementation
  bullets: string[];
}

export const rewriteSlide = async (input: RewriteSlideInput): Promise<RewriteSlideResponse> => {
  return invoke<RewriteSlideResponse>('slide-ai', { ...input, action: 'rewrite' });
};

export interface AnalyzeSlideInput {
  slideId: string;
  slideContent: any; // content to analyze
  action: 'analyze';
}

export interface AnalyzeSlideResponse {
  score: number;
  suggestions: string[];
}

export const analyzeSlideAI = async (input: AnalyzeSlideInput): Promise<AnalyzeSlideResponse> => {
  return invoke<AnalyzeSlideResponse>('slide-ai', { ...input, action: 'analyze' });
};

export interface ChatSlideInput {
  action: 'chat' | 'expand' | 'shorten' | 'add-metrics';
  message?: string;
  slideTitle?: string;
  slideContent?: any;
  slideType?: string;
}

export const chatWithSlide = async (input: ChatSlideInput) => {
  return invoke<any>('slide-ai', input);
};

export interface ResearchTopicInput {
  query: string;
  slideType?: string;
}

export interface ResearchTopicResponse {
  content: string;
  citations: Array<{ url: string; title: string }>;
}

export const researchTopic = async (input: ResearchTopicInput): Promise<ResearchTopicResponse> => {
  return invoke<ResearchTopicResponse>('research-ai', input);
};
