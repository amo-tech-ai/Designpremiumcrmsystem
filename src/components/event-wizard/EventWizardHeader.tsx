import React from 'react';
import { Sparkles } from 'lucide-react';

import { cn } from '../ui/utils';

interface EventWizardHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
  className?: string;
}

export const EventWizardHeader: React.FC<EventWizardHeaderProps> = ({ currentStep, totalSteps, stepTitle, className }) => {
  return (
    <div className={cn("fixed top-0 left-0 right-0 h-16 bg-[#F7F7F5]/80 backdrop-blur-md border-b border-[#E5E5E5] z-50 flex items-center px-6 md:px-10 justify-between", className)}>
      {/* Logo Area */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-serif font-bold text-xl text-[#1A1A1A]">StartupAI</span>
        <span className="hidden md:inline-block text-lg text-[#1A1A1A]/40 font-serif ml-1">Event Wizard</span>
      </div>

      {/* Step Indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
        <div className="text-sm font-medium text-[#6B7280] font-sans flex items-center gap-2 whitespace-nowrap">
          <span>Step <span className="text-[#1A1A1A] font-bold">{currentStep}</span> of {totalSteps}</span>
          {stepTitle && (
             <>
               <span className="text-[#E5E5E5] mx-1">—</span>
               <span className="text-[#1A1A1A] font-medium">{stepTitle}</span>
             </>
          )}
        </div>
      </div>

      {/* Right Side - Powered By Badge */}
      <div className="hidden md:flex items-center gap-2">
         <div className="bg-white border border-[#E5E5E5] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#6B21A8]" />
            <span className="text-xs font-medium text-[#1A1A1A]">Powered by Gemini 3 Pro</span>
         </div>
      </div>
    </div>
  );
};
