import React from 'react';
import { PitchWizardData } from '../types';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Slider } from '../../ui/slider';
import { cn } from '../../ui/utils';
import { Badge } from '../../ui/badge';
import { Check } from 'lucide-react';

interface StepDetailsProps {
  data: PitchWizardData;
  updateData: (updates: Partial<PitchWizardData>) => void;
}

const BUSINESS_TYPES = ['AI SaaS', 'Marketplace', 'B2B SaaS', 'Consumer App', 'Fintech', 'Creator / Media', 'Hardware', 'Other'];
const STAGES = ['Idea', 'MVP', 'Pre-Seed', 'Seed', 'Series A+', 'Growth'];
const FOCUS_AREAS = [
  'Raising capital', 
  'Selling to Customers', 
  'Joining an accelerator', 
  'Closing customers', 
  'Updating existing investors', 
  'Internal strategy', 
  'Recruiting'
];
const TEAM_SIZES = ['Solo', '2-5', '6-15', '16+'];
const TRACTION_STAGES = ['Pre-launch', 'Early users', 'Paying customers', 'Growing revenue'];

export const StepDetails: React.FC<StepDetailsProps> = ({ data, updateData }) => {
  
  const toggleMultiSelect = (field: 'businessType' | 'deckFocus', value: string, max?: number) => {
    const current = data[field];
    if (current.includes(value)) {
      updateData({ [field]: current.filter(item => item !== value) });
    } else {
      if (max && current.length >= max) return;
      updateData({ [field]: [...current, value] });
    }
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
       <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell Us About Your Business</h2>
        <p className="text-slate-500 text-lg">These details help the AI tailor your investor pitch narrative and financial projections.</p>
      </div>

      <Card className="border-0 shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-8 space-y-8">
          
          {/* Business Type */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-slate-900">What type of business is this? <span className="text-sm font-normal text-slate-400 ml-2">(Select all that apply)</span></Label>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_TYPES.map(type => {
                const isSelected = data.businessType.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggleMultiSelect('businessType', type)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                      isSelected 
                        ? "bg-[#FF855D] text-white border-[#FF855D]" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#FF855D] hover:text-[#FF855D]"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />}
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-slate-900">What stage are you at?</Label>
            <div className="flex flex-wrap gap-2">
              {STAGES.map(stage => {
                const isSelected = data.stage === stage;
                return (
                  <button
                    key={stage}
                    onClick={() => updateData({ stage })}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                      isSelected 
                        ? "bg-[#FF855D] text-white border-[#FF855D]" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#FF855D] hover:text-[#FF855D]"
                    )}
                  >
                    {stage}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focus */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-slate-900">What is your main focus for this deck? <span className="text-sm font-normal text-slate-400 ml-2">(Max 3)</span></Label>
            <div className="flex flex-wrap gap-2">
              {FOCUS_AREAS.map(focus => {
                const isSelected = data.deckFocus.includes(focus);
                return (
                  <button
                    key={focus}
                    onClick={() => toggleMultiSelect('deckFocus', focus, 3)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                      isSelected 
                        ? "bg-[#FF855D] text-white border-[#FF855D]" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-[#FF855D] hover:text-[#FF855D]"
                    )}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 inline-block mr-1.5 -mt-0.5" />}
                    {focus}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Team & Traction Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-3">
               <Label className="text-lg font-semibold text-slate-900">Team Size</Label>
               <div className="flex flex-wrap gap-2">
                 {TEAM_SIZES.map(size => (
                   <button
                     key={size}
                     onClick={() => updateData({ teamSize: size })}
                     className={cn(
                       "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                       data.teamSize === size 
                         ? "bg-[#FF855D] text-white border-[#FF855D]" 
                         : "bg-white text-slate-600 border-slate-200 hover:border-[#FF855D] hover:text-[#FF855D]"
                     )}
                   >
                     {size}
                   </button>
                 ))}
               </div>
            </div>
            <div className="space-y-3">
               <Label className="text-lg font-semibold text-slate-900">Traction</Label>
               <div className="flex flex-wrap gap-2">
                 {TRACTION_STAGES.map(trac => (
                   <button
                     key={trac}
                     onClick={() => updateData({ traction: trac })}
                     className={cn(
                       "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                       data.traction === trac 
                         ? "bg-[#FF855D] text-white border-[#FF855D]" 
                         : "bg-white text-slate-600 border-slate-200 hover:border-[#FF855D] hover:text-[#FF855D]"
                     )}
                   >
                     {trac}
                   </button>
                 ))}
               </div>
            </div>
          </div>

          {/* Target Raise Slider */}
          <div className="pt-6 pb-2 space-y-6 bg-slate-50/50 p-6 rounded-xl border border-slate-100">
             <div className="flex justify-between items-end">
                <Label className="text-lg font-semibold text-slate-900">Target Raise Amount</Label>
                <div className="text-3xl font-bold text-[#FF855D]">
                   {formatCurrency(data.targetRaise)}
                </div>
             </div>
             <Slider 
               defaultValue={[500000]}
               max={5000000}
               min={100000}
               step={100000}
               value={[data.targetRaise]}
               onValueChange={(vals) => updateData({ targetRaise: vals[0] })}
               className="py-4"
             />
             <div className="flex justify-between text-xs font-medium text-slate-400 px-1">
                <span>$100k</span>
                <span>$1M</span>
                <span>$5M+</span>
             </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
