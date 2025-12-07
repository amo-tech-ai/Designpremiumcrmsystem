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
}

export const WizardFooter: React.FC<WizardFooterProps> = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onBack,
  isSaving = false,
  canNext = true
}) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:px-10 z-40">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
           <Button 
             variant="ghost" 
             onClick={onBack} 
             disabled={currentStep === 0}
             className="text-slate-500 hover:text-slate-900"
           >
             <ChevronLeft className="w-4 h-4 mr-1" /> Back
           </Button>
           
           <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
             {isSaving ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Saving changes...
                </>
             ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Changes saved
                </>
             )}
           </div>
        </div>

        <Button 
          onClick={onNext} 
          disabled={!canNext}
          className={cn(
            "min-w-[120px] transition-all",
            isLastStep ? "bg-emerald-600 hover:bg-emerald-700" : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {isLastStep ? "Finish & Save" : "Next Step"}
          {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
        </Button>
      </div>
    </div>
  );
};
