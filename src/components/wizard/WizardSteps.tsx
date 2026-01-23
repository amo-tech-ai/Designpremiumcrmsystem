import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

interface WizardStepsProps {
  currentStep: number;
  steps: string[];
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full border-b border-stone-200 bg-[#fafaf8] px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-stone-200 -z-10" />
          
          {/* Active Progress Bar */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#0d5f4e] -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-2 group cursor-default">
                <div 
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 z-10 font-sans",
                    isActive ? "border-[#0d5f4e] bg-[#0d5f4e] text-white" : 
                    isCompleted ? "border-[#0d5f4e] bg-[#0d5f4e] text-white" : 
                    "border-stone-300 bg-white text-stone-400"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider transition-colors absolute mt-11 font-sans",
                  isActive ? "text-[#0d5f4e]" : 
                  isCompleted ? "text-[#0d5f4e]" : 
                  "text-stone-400"
                )}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};