import React from 'react';
import { Button } from '../ui/button';
import { Loader2, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { cn } from '../ui/utils';

interface WizardFooterProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  isSaving?: boolean;
  canNext?: boolean;
  nextLabel?: string;
  loadingLabel?: string;
  className?: string;
  variant?: 'default' | 'floating';
}

export const WizardFooter: React.FC<WizardFooterProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack,
  isSaving = false,
  canNext = true,
  nextLabel,
  loadingLabel = "Saving changes...",
  className,
  variant = 'default'
}) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFloating = variant === 'floating';

  if (isFloating) {
    return (
      <div className={cn("fixed bottom-8 right-8 z-50 flex items-center gap-3", className)}>
         {/* Floating Back Button (only if step > 0) */}
         <Button 
           variant="outline" 
           onClick={onBack} 
           disabled={currentStep === 0 || isSaving}
           className={cn(
             "h-14 w-14 rounded-full border-stone-300 bg-white text-[#1a1a1a] shadow-lg hover:bg-stone-50 p-0 flex items-center justify-center transition-all",
             (currentStep === 0) && "hidden"
           )}
         >
           <ChevronLeft className="w-5 h-5" />
         </Button>

         {/* Floating Next Button */}
         <Button 
            onClick={onNext} 
            disabled={!canNext || isSaving}
            className={cn(
              "h-14 px-8 rounded-full font-sans font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-base",
              "bg-[#0d5f4e] hover:bg-[#094438] text-white"
            )}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {nextLabel || (isLastStep ? "Finish & Save" : "Next Step")}
                {!isLastStep && <ChevronRight className="w-5 h-5 ml-2" />}
              </>
            )}
          </Button>
      </div>
    );
  }

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 p-5 md:px-10 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.03)]", className)}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
           <Button 
             variant="ghost" 
             onClick={onBack} 
             disabled={currentStep === 0 || isSaving}
             className="text-stone-600 hover:text-[#1a1a1a] hover:bg-stone-50 font-sans font-medium"
           >
             <ChevronLeft className="w-4 h-4 mr-1" /> Back
           </Button>
           
           <div className="hidden md:flex items-center gap-2 text-xs font-medium text-stone-500 font-sans">
             {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0d5f4e]" />
                  <span className="text-stone-600">{loadingLabel}</span>
                </>
             ) : (
                <>
                  {currentStep > 0 && (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0d5f4e]" />
                      <span className="text-stone-600">Changes saved</span>
                    </>
                  )}
                </>
             )}
           </div>
        </div>

        <Button 
          onClick={onNext} 
          disabled={!canNext || isSaving}
          className={cn(
            "min-w-[140px] transition-all h-11 rounded-xl font-sans font-bold shadow-sm hover:shadow-md",
            "bg-[#0d5f4e] hover:bg-[#094438] text-white"
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {nextLabel || (isLastStep ? "Finish & Save" : "Next Step")}
              {!isLastStep && <ChevronRight className="w-4 h-4 ml-2" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};