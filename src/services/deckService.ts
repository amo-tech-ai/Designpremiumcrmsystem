import { supabase } from '../utils/supabase/client';
import type { Deck, Slide as DbSlide, SlideType } from '../src/types/deck';
import { Slide as FrontendSlide } from '../components/editor/types';

// --- Analysis Service ---

interface AnalysisResult {
  passed: boolean;
  suggestions: string[];
}

export const analyzeSlide = (slide: FrontendSlide): AnalysisResult => {
  const suggestions: string[] = [];
  const type = slide.type?.toLowerCase() || '';

  // Title length check (approx 5 words)
  if (type === 'title') {
     const titleWords = slide.title.split(/\s+/).filter(w => w.length > 0).length;
     if (titleWords > 6) { 
       suggestions.push(`Title/Tagline is too long (${titleWords} words). Best practice is max 5 words.`);
     }
  }

  // Problem: Exactly 3 points
  if (type === 'problem') {
    if (slide.content.length !== 3) {
      suggestions.push(`Problem slides are most effective with exactly 3 concrete pain points (currently ${slide.content.length}).`);
    }
  }

  // Solution: Mirror problem (heuristic)
  if (type === 'solution') {
     if (slide.content.length > 4) {
        suggestions.push("Keep solution points focused. One solution per problem point.");
     }
  }

  // Market: Why Now
  if (type === 'market') {
    const hasWhyNow = slide.content.some(c => c.toLowerCase().includes('now') || c.toLowerCase().includes('timing') || c.toLowerCase().includes('catalyst'));
    if (!hasWhyNow) {
      suggestions.push("Include a 'Why Now' point to explain market timing.");
    }
  }

  // Competition: At least 2 competitors (heuristic)
  if (type === 'competition') {
     if (slide.content.length < 2) {
       suggestions.push("List at least 2 competitors or alternatives.");
     }
     const hasNone = slide.content.some(c => c.toLowerCase().includes('no competition') || c.toLowerCase().includes('unique'));
     if (hasNone) {
        suggestions.push("Avoid claiming 'no competition'. Investors prefer to see how you position against alternatives.");
     }
  }

  // Traction: One powerful metric
  if (type === 'traction') {
    if (slide.content.length > 4) {
       suggestions.push("Focus on one 'North Star' metric rather than a laundry list.");
    }
  }

  // Ask: Use of funds
  if (type === 'ask' || type === 'financials') {
    if (slide.content.length < 3) {
      suggestions.push("Break down use of funds into at least 3 categories (e.g., Product, Sales, Operations).");
    }
  }

  return {
    passed: suggestions.length === 0,
    suggestions
  };
};

// --- Deck CRUD Services ---

export const getDecks = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // If no user, return empty array (guest mode)
    if (!user) {
      return { data: [], error: null };
    }

    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('user_id', user.id)
      .order('last_accessed_at', { ascending: false });

    if (error) throw error;
    return { data: data as Deck[], error: null };
  } catch (error) {
    console.error('Error fetching decks:', error);
    return { data: null, error };
  }
};

export const getDeckById = async (id: string) => {
  try {
    // Fetch deck
    const { data: deck, error: deckError } = await supabase
      .from('decks')
      .select('*')
      .eq('id', id)
      .single();
    
    if (deckError) throw deckError;

    // Fetch slides
    const { data: slides, error: slidesError } = await supabase
      .from('slides')
      .select('*')
      .eq('deck_id', id)
      .order('position', { ascending: true });

    if (slidesError) throw slidesError;

    // Update last_accessed_at (fire and forget)
    supabase.from('decks').update({ last_accessed_at: new Date().toISOString() }).eq('id', id).then();

    return { 
      data: { ...deck, slides: slides as DbSlide[] } as (Deck & { slides: DbSlide[] }), 
      error: null 
    };
  } catch (error) {
    console.error(`Error fetching deck ${id}:`, error);
    return { data: null, error };
  }
};

export const createDeck = async (deckData: Partial<Deck>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('decks')
      .insert({
        ...deckData,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return { data: data as Deck, error: null };
  } catch (error) {
    console.error('Error creating deck:', error);
    return { data: null, error };
  }
};

export const updateDeck = async (id: string, updates: Partial<Deck>) => {
  try {
    const { data, error } = await supabase
      .from('decks')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as Deck, error: null };
  } catch (error) {
    console.error(`Error updating deck ${id}:`, error);
    return { data: null, error };
  }
};

export const deleteDeck = async (id: string) => {
  try {
    const { error } = await supabase
      .from('decks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error(`Error deleting deck ${id}:`, error);
    return { error };
  }
};

export const updateSlide = async (id: string, updates: Partial<DbSlide>) => {
  try {
    const { data, error } = await supabase
      .from('slides')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data: data as DbSlide, error: null };
  } catch (error) {
    console.error(`Error updating slide ${id}:`, error);
    return { data: null, error };
  }
};

export const reorderSlides = async (deckId: string, slideIds: string[]) => {
  try {
    // Update position for each slide
    // This could be optimized with a stored procedure or multiple updates
    // For now, loop through and update. Note: Promise.all might hit rate limits or DB locks if too many.
    
    const updates = slideIds.map((id, index) => 
      supabase
        .from('slides')
        .update({ position: index })
        .eq('id', id)
        .eq('deck_id', deckId) // Security check
    );

    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error);
    
    if (errors.length > 0) throw errors[0].error;

    return { error: null };
  } catch (error) {
    console.error(`Error reordering slides for deck ${deckId}:`, error);
    return { error };
  }
};

export const uploadSlideImage = async (slideId: string, file: File) => {
  try {
    // 1. Generate unique path
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const path = `slides/${slideId}/${Date.now()}-${sanitizedName}`;

    // 2. Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('deck-assets')
      .upload(path, file);

    if (uploadError) throw uploadError;

    // 3. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('deck-assets')
      .getPublicUrl(path);

    // 4. Create asset record
    // We try to insert, but if it fails (e.g. table doesn't exist yet or schema mismatch), 
    // we shouldn't block the UI update if we got the URL.
    try {
      await supabase
        .from('assets')
        .insert({
          slide_id: slideId,
          object_path: path,
          asset_type: 'image',
          filename: file.name,
          size_bytes: file.size
        });
    } catch (assetErr) {
      console.warn("Failed to create asset record:", assetErr);
    }

    // 5. Update slide.image_url
    const { error: slideError } = await supabase
      .from('slides')
      .update({ image_url: publicUrl })
      .eq('id', slideId);

    if (slideError) throw slideError;

    return { url: publicUrl, error: null };
  } catch (error) {
    console.error("Error uploading slide image:", error);
    return { url: null, error };
  }
};