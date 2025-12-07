import React from 'react';
import { Slide } from './types';
import { SlideRenderer } from './SlideRenderer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../ui/utils';

interface EditorCanvasProps {
  currentSlide: Slide;
  totalSlides: number;
  currentIndex: number;
  onUpdateSlide: (updates: Partial<Slide>) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onTriggerImageModal?: () => void;
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  templateId?: string;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  currentSlide,
  totalSlides,
  currentIndex,
  onUpdateSlide,
  onNextSlide,
  onPrevSlide,
  onTriggerImageModal,
  saveStatus = 'saved',
  templateId = 'startup'
}) => {
  return (
    <div className="flex-grow bg-[#F3F4F6] flex flex-col relative overflow-hidden h-full">
      {/* Top Bar info could go here, but sidebar handles navigation title */}
      
      <div className="flex-grow flex items-center justify-center p-8 md:p-12 relative overflow-y-auto">
        
        {/* Previous Button */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md hover:bg-slate-50 z-10 transition-all",
            currentIndex === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={onPrevSlide}
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </Button>

        {/* Slide Card Container */}
        <div className="w-full max-w-[960px] aspect-video shadow-xl rounded-xl transition-all duration-300">
           <SlideRenderer 
             slide={currentSlide} 
             onChange={onUpdateSlide} 
             isActive={true} 
             onTriggerImageModal={onTriggerImageModal}
             templateId={templateId}
           />
        </div>

        {/* Next Button */}
        <Button
          variant="secondary"
          size="icon"
          className={cn(
            "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md hover:bg-slate-50 z-10 transition-all",
            currentIndex === totalSlides - 1 ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          onClick={onNextSlide}
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </Button>

      </div>

import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// ... (inside component)

      {/* Footer / Status Bar */}
      <div className="h-8 flex items-center justify-center text-[10px] text-slate-400 font-medium gap-2 border-t border-slate-200 bg-white">
         {saveStatus === 'saving' && (
           <>
             <Loader2 className="w-3 h-3 animate-spin" />
             Saving...
           </>
         )}
         {saveStatus === 'saved' && (
           <>
             <CheckCircle2 className="w-3 h-3 text-emerald-500" />
             Saved
           </>
         )}
         {saveStatus === 'error' && (
           <>
             <AlertCircle className="w-3 h-3 text-red-500" />
             Error saving changes
           </>
         )}
         {saveStatus === 'idle' && (
            <span className="opacity-50">Waiting...</span>
         )}
      </div>
    </div>
  );
};
