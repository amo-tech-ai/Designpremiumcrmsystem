import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../ui/utils';

interface WizardStepsProps {
  currentStep: number;
  steps: string[];
}

export const WizardSteps: React.FC<WizardStepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full border-b border-slate-200 bg-white px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10 rounded-full" />
          
          {/* Active Progress Bar */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 -z-10 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-2">
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 bg-white",
                    isActive ? "border-indigo-600 text-indigo-600 scale-110 shadow-md ring-4 ring-indigo-50" : 
                    isCompleted ? "border-indigo-600 bg-indigo-600 text-white" : 
                    "border-slate-200 text-slate-400"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors absolute mt-10",
                  isActive ? "text-indigo-700" : 
                  isCompleted ? "text-slate-600" : 
                  "text-slate-400"
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
