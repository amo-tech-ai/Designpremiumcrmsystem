import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronLeft, Save, Eye, Share2, Download, Plus, Trash2, Copy, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';
import { supabase } from '../../utils/supabase/client';
import { EditorCanvas as SlideEditor } from '../editor/EditorCanvas';
import { EditorSidebarLeft as SlideOutline } from '../editor/EditorSidebarLeft';
import { EditorSidebarRight } from '../editor/EditorSidebarRight';
import { logger } from '../../utils/logger';

interface PitchDeckEditorProps {
  deckId?: string;
}

export const PitchDeckEditor: React.FC<PitchDeckEditorProps> = ({ deckId }) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('saved');
  const [isLoading, setIsLoading] = useState(!!deckId);
  const [hasError, setHasError] = useState(false);
  const [templateId, setTemplateId] = useState<string>('startup'); // Default to startup
  
  const saveTimeoutRef = useRef<any>(null);

  const loadDeck = useCallback(async (id: string) => {
    setIsLoading(true);
    setHasError(false);
    try {
      const { data: deck, error } = await deckService.getDeckById(id);
      
      if (error || !deck) {
        throw new Error("Deck not found");
      }

      if (deck.template) {
        setTemplateId(deck.template);
      }

      // Map DB slides to Frontend slides
      const mappedSlides: Slide[] = deck.slides.map(s => ({
        id: s.id,
        deck_id: s.deck_id,
        type: (s.type.charAt(0).toUpperCase() + s.type.slice(1)) as any, // Capitalize for frontend enum match if needed
        title: s.title,
        content: s.bullets || [],
        notes: s.speaker_notes,
        imageUrl: s.image_url,
        layout: s.layout || 'default'
      }));

      if (mappedSlides.length > 0) {
        setSlides(mappedSlides);
      } else {
        setSlides([]);
      }
    } catch (err) {
      logger.error("Failed to load deck:", err);
      setHasError(true);
      toast.error("Failed to load pitch deck");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (deckId) {
      loadDeck(deckId);
    } else {
      setSlides(MOCK_SLIDES);
    }
  }, [deckId, loadDeck]);

  const currentSlide = slides[currentSlideIndex];

  // --- Auto-Save Logic ---
  const triggerAutoSave = useCallback((slide: Slide) => {
    setSaveStatus('idle'); // Waiting for debounce
    
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        // Map Frontend slide to DB updates
        const updates = {
           title: slide.title,
           bullets: slide.content, // Map content -> bullets
           speaker_notes: slide.notes,
           image_url: slide.imageUrl,
           layout: slide.layout
        };

        const { error } = await deckService.updateSlide(slide.id, updates);

        if (error) throw error;

        // Also touch the deck updated_at
        if (slide.deck_id) {
           await deckService.updateDeck(slide.deck_id, {});
        }

        setSaveStatus('saved');
      } catch (err) {
        logger.error("Auto-save error:", err);
        setSaveStatus('error');
        toast.error("Failed to save changes");
      }
    }, 500); // Debounce 500ms
  }, []);

  // --- Handlers ---
  
  const handleOpenImageModal = () => {
    setIsImageModalOpen(true);
  };
  
  const handleSelectImage = (imageUrl: string) => {
    handleUpdateSlide({ imageUrl });
    setIsImageModalOpen(false);
  };

  const handleSelectSlide = (id: string) => {
    const index = slides.findIndex(s => s.id === id);
    if (index !== -1) setCurrentSlideIndex(index);
  };

  const handleAddSlide = async (newSlideData?: Partial<Slide>) => {
    const newId = crypto.randomUUID();
    // Calculate new position
    const maxPosition = slides.length > 0 ? slides.length : 0;
    
    const newSlide: Slide = {
      id: newId,
      deck_id: deckId,
      type: 'Title',
      title: 'New Slide',
      content: [''],
      notes: '',
      ...newSlideData
    };
    
    // Optimistic Update
    const updatedSlides = [...slides, newSlide];
    setSlides(updatedSlides);
    setCurrentSlideIndex(updatedSlides.length - 1); 
    
    if (deckId) {
      try {
        // Direct insert since service doesn't have createSlide yet
        const { error } = await supabase.from('slides').insert({
          id: newId,
          deck_id: deckId,
          type: newSlide.type.toLowerCase(),
          title: newSlide.title,
          bullets: newSlide.content,
          speaker_notes: newSlide.notes,
          position: maxPosition, // Use position
          updated_at: new Date().toISOString()
        });
        if (error) throw error;
      } catch (e) {
        console.error("Failed to create slide", e);
        toast.error("Failed to save new slide");
      }
    }
    
    toast.success("New slide added");
  };

  const handleUpdateSlide = (updates: Partial<Slide>) => {
    const newSlides = [...slides];
    const updatedSlide = { ...newSlides[currentSlideIndex], ...updates };
    newSlides[currentSlideIndex] = updatedSlide;
    setSlides(newSlides);
    
    // Trigger auto-save
    if (deckId) {
      triggerAutoSave(updatedSlide);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (slides.length <= 1) {
      toast.error("Cannot delete the last slide");
      return;
    }
    const index = slides.findIndex(s => s.id === id);
    const newSlides = slides.filter(s => s.id !== id);
    setSlides(newSlides);
    
    // Adjust index if necessary
    if (index === currentSlideIndex) {
      setCurrentSlideIndex(Math.max(0, index - 1));
    } else if (index < currentSlideIndex) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
    
    if (deckId) {
       try {
         // DELETE from slides
         await supabase.from('slides').delete().eq('id', id);
         
         // Reorder remaining slides
         const slideIds = newSlides.map(s => s.id);
         await deckService.reorderSlides(deckId, slideIds);
       } catch (e) {
         console.error("Failed to delete slide", e);
       }
    }
    
    toast.success("Slide deleted");
  };

  const handleDuplicateSlide = async (id: string) => {
    const index = slides.findIndex(s => s.id === id);
    if (index === -1) return;
    
    const slideToCopy = slides[index];
    const newId = crypto.randomUUID();
    
    const newSlide: Slide = {
      ...slideToCopy,
      id: newId,
      title: `${slideToCopy.title} (Copy)`,
      deck_id: deckId
    };
    
    const newSlides = [...slides];
    newSlides.splice(index + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrentSlideIndex(index + 1);
    
    if (deckId) {
       try {
         await supabase.from('slides').insert({
           id: newId,
           deck_id: deckId,
           type: newSlide.type.toLowerCase(),
           title: newSlide.title,
           bullets: newSlide.content,
           speaker_notes: newSlide.notes,
           image_url: newSlide.imageUrl,
           position: index + 1,
           updated_at: new Date().toISOString()
         });
         
         // Reorder all slides to ensure positions are correct
         const slideIds = newSlides.map(s => s.id);
         await deckService.reorderSlides(deckId, slideIds);
         
       } catch (e) {
         console.error("Failed to duplicate slide", e);
         toast.error("Failed to save duplicated slide");
       }
    }
    
    toast.success("Slide duplicated");
  };

  const handleMoveSlide = async (id: string, direction: 'up' | 'down') => {
    const index = slides.findIndex(s => s.id === id);
    if (index === -1) return;
    
    // Snapshot for rollback
    const previousSlides = [...slides];
    const previousIndex = currentSlideIndex;

    const newSlides = [...slides];
    let newIndex = currentSlideIndex;

    if (direction === 'up' && index > 0) {
      // Swap with previous
      [newSlides[index - 1], newSlides[index]] = [newSlides[index], newSlides[index - 1]];
      if (currentSlideIndex === index) newIndex = index - 1;
      else if (currentSlideIndex === index - 1) newIndex = index;
    } else if (direction === 'down' && index < slides.length - 1) {
      // Swap with next
      [newSlides[index], newSlides[index + 1]] = [newSlides[index + 1], newSlides[index]];
      if (currentSlideIndex === index) newIndex = index + 1;
      else if (currentSlideIndex === index + 1) newIndex = index;
    } else {
      return;
    }

    // 1. Update local state immediately
    setSlides(newSlides);
    setCurrentSlideIndex(newIndex);
    
    // 2. Call service to reorder
    if (deckId) {
       try {
         const slideIds = newSlides.map(s => s.id);
         const { error } = await deckService.reorderSlides(deckId, slideIds);
         if (error) throw error;

         toast.success("Order saved");
       } catch (err) {
         console.error("Failed to reorder slides:", err);
         // 4. Handle errors with restore
         setSlides(previousSlides);
         setCurrentSlideIndex(previousIndex);
         toast.error("Failed to save order");
       }
    }
  };

  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
         <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            <p className="text-sm font-medium text-slate-500">Loading your deck...</p>
         </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
         <div className="max-w-md text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Deck Not Found</h2>
            <p className="text-slate-500">We couldn't find the pitch deck you are looking for. It may have been deleted or you may not have permission to view it.</p>
            <Button onClick={() => window.location.href = '/'} variant="outline">
               Go Back Home
            </Button>
         </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden bg-[#F3F4F6] font-sans">
      <Toaster />
      
      {/* Left Sidebar */}
      <SlideOutline 
        slides={slides}
        currentSlideId={currentSlide?.id}
        onSelectSlide={handleSelectSlide}
        onAddSlide={() => handleAddSlide()}
        onDeleteSlide={handleDeleteSlide}
        onDuplicateSlide={handleDuplicateSlide}
        onMoveSlide={handleMoveSlide}
      />

      {/* Main Canvas */}
      {currentSlide ? (
        <SlideEditor 
          currentSlide={currentSlide}
          totalSlides={slides.length}
          currentIndex={currentSlideIndex}
          onUpdateSlide={handleUpdateSlide}
          onNextSlide={handleNextSlide}
          onPrevSlide={handlePrevSlide}
          onTriggerImageModal={handleOpenImageModal}
          saveStatus={saveStatus}
          templateId={templateId}
        />
      ) : (
        <div className="flex-grow flex items-center justify-center text-slate-400">
           No slides found
        </div>
      )}

      {/* Right Sidebar */}
      {currentSlide && (
        <EditorSidebarRight 
          currentSlide={currentSlide}
          onUpdateSlide={handleUpdateSlide}
          onAddSlide={handleAddSlide}
          isOpen={rightSidebarOpen}
          onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
      )}
      
      <ImageGenerationModal 
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        onSelectImage={handleSelectImage}
        initialPrompt={currentSlide?.title ? `Visual for: ${currentSlide.title}` : undefined}
        slideType={currentSlide?.type || 'General'}
        slideId={currentSlide?.id}
      />

    </div>
  );
};