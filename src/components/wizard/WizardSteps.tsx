import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

interface WizardStepsProps {
  currentStep: number;
  steps: string[];
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full border-b border-[#E5E5E5] bg-[#F7F7F5] px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#E5E5E5] -z-10" />
          
          {/* Active Progress Bar */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#1A1A1A] -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-2 group cursor-default">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 z-10 font-sans",
                    isActive ? "border-[#1A1A1A] bg-[#1A1A1A] text-white shadow-sm" : 
                    isCompleted ? "border-[#1A1A1A] bg-white text-[#1A1A1A]" : 
                    "border-[#E5E5E5] bg-white text-[#9CA3AF]"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider transition-colors absolute mt-10 font-sans",
                  isActive ? "text-[#1A1A1A]" : 
                  isCompleted ? "text-[#1A1A1A]" : 
                  "text-[#9CA3AF]"
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
