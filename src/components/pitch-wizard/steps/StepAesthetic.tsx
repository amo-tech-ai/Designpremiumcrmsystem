import React from 'react';
import { PitchWizardData } from '../types';
import { Card } from '../../ui/card';
import { Check } from 'lucide-react';
import { cn } from '../../ui/utils';
import { Badge } from '../../ui/badge';

interface StepAestheticProps {
  data: PitchWizardData;
  updateData: (updates: Partial<PitchWizardData>) => void;
}

const TEMPLATES = [
  { id: 'Classic Clean', category: 'UNIVERSAL', font: 'Inter', bg: 'bg-white', text: 'text-slate-900', border: 'border-slate-200' },
  { id: 'Enterprise Pro', category: 'CORPORATE', font: 'Playfair Display', bg: 'bg-[#1e293b]', text: 'text-white', border: 'border-slate-800' },
  { id: 'Modern Minimal', category: 'SAAS', font: 'DM Sans', bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-100' },
  { id: 'Dark Mode', category: 'TECH', font: 'Inter', bg: 'bg-black', text: 'text-white', border: 'border-slate-800' },
  { id: 'Vibrant Bold', category: 'CONSUMER', font: 'Space Grotesk', bg: 'bg-white', text: 'text-black', border: 'border-slate-200' },
  { id: 'Vibrant Vision', category: 'CREATIVE', font: 'Syne', bg: 'bg-white', text: 'text-black', border: 'border-slate-200' },
  { id: 'Vibrant Impact', category: 'CREATIVE', font: 'Clash Display', bg: 'bg-white', text: 'text-black', border: 'border-slate-200' },
  { id: 'Vibrant Features', category: 'CREATIVE', font: 'Outfit', bg: 'bg-white', text: 'text-black', border: 'border-slate-200' },
  { id: 'Vibrant Journey', category: 'CREATIVE', font: 'Epilogue', bg: 'bg-[#8b5cf6]', text: 'text-white', border: 'border-purple-500' },
];

export const StepAesthetic: React.FC<StepAestheticProps> = ({ data, updateData }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Define Your Aesthetic</h2>
        <p className="text-slate-500 text-lg">Choose a visual theme. The AI will adapt fonts, layouts, and image generation styles to match.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((template) => {
          const isSelected = data.theme === template.id;
          
          return (
            <div 
              key={template.id}
              onClick={() => updateData({ theme: template.id })}
              className={cn(
                "group relative cursor-pointer rounded-xl transition-all duration-300",
                isSelected ? "ring-2 ring-[#FF855D] ring-offset-2 scale-[1.02]" : "hover:scale-[1.01]"
              )}
            >
              <Card className="overflow-hidden border-0 shadow-sm h-[200px] flex flex-col">
                {/* Thumbnail Area */}
                <div className={cn(
                  "flex-grow p-6 flex flex-col justify-center items-start transition-colors",
                  template.bg,
                  template.text
                )}>
                  <div className="space-y-2 w-full">
                    <div className="h-2 w-12 bg-current opacity-20 rounded-full" />
                    <h3 className={cn("text-2xl font-bold leading-tight truncate w-full", template.id === 'Vibrant Bold' ? 'text-4xl' : '')} style={{ fontFamily: template.font }}>
                      {template.id}
                    </h3>
                    {template.id.includes('Vibrant') && (
                       <div className="space-y-1 mt-2">
                          <div className="h-1.5 w-full bg-current opacity-10 rounded-full" />
                          <div className="h-1.5 w-2/3 bg-current opacity-10 rounded-full" />
                       </div>
                    )}
                    {template.id === 'Enterprise Pro' && <div className="w-full h-[1px] bg-white/20 my-2" />}
                  </div>
                </div>

                {/* Footer Area */}
                <div className="h-12 bg-white border-t border-slate-100 flex items-center justify-between px-4">
                  <span className={cn(
                    "text-sm font-semibold transition-colors",
                    isSelected ? "text-[#FF855D]" : "text-slate-700"
                  )}>
                    {template.id}
                  </span>
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold text-slate-400 bg-slate-50">
                    {template.category}
                  </Badge>
                </div>
              </Card>

              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-[#FF855D] rounded-full flex items-center justify-center text-white shadow-md animate-in zoom-in duration-200">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
