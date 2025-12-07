import React from 'react';
import { PitchWizardData } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Sparkles, BrainCircuit, FileText, Palette, BarChart3, DollarSign, AlertCircle } from 'lucide-react';
import { cn } from '../../ui/utils';

interface StepFinancialsProps {
  data: PitchWizardData;
  updateData: (updates: Partial<PitchWizardData>) => void;
  // onGenerate and isGenerating are no longer needed here as they are handled in the parent footer
}

const REVENUE_MODELS = ['Subscription', 'Usage-Based', 'Commission', 'One-Time', 'Hybrid'];

const TEMPLATES_LOOKUP = [
  { id: 'Classic Clean', category: 'UNIVERSAL' },
  { id: 'Enterprise Pro', category: 'CORPORATE' },
  { id: 'Modern Minimal', category: 'SAAS' },
  { id: 'Dark Mode', category: 'TECH' },
  { id: 'Vibrant Bold', category: 'CONSUMER' },
  { id: 'Vibrant Vision', category: 'CREATIVE' },
  { id: 'Vibrant Impact', category: 'CREATIVE' },
  { id: 'Vibrant Features', category: 'CREATIVE' },
  { id: 'Vibrant Journey', category: 'CREATIVE' },
];

export const StepFinancials: React.FC<StepFinancialsProps> = ({ data, updateData }) => {
  
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  const getThemeCategory = (themeId: string) => {
    return TEMPLATES_LOOKUP.find(t => t.id === themeId)?.category || 'General';
  };

  const truncate = (str: string, length: number) => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
  };

  const SummarySection = ({ icon: Icon, title, children, className }: { icon: any, title: string, children: React.ReactNode, className?: string }) => (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white py-1 z-10">
        <Icon className="w-3.5 h-3.5" />
        {title}
      </div>
      <div className="pl-5 space-y-3">
        {children}
      </div>
    </div>
  );

  const SummaryRow = ({ label, value, isMissing, isChips = false, warning }: { label: string, value: React.ReactNode, isMissing?: boolean, isChips?: boolean, warning?: string }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 text-sm">
      <span className="text-slate-500 font-medium min-w-[100px] pt-0.5">{label}</span>
      <div className="flex-1 text-right flex flex-col items-end">
        {isMissing ? (
           <span className="text-orange-500 flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded text-xs font-medium">
             <AlertCircle className="w-3 h-3" /> {warning || 'Incomplete'}
           </span>
        ) : (
           <div className={cn("font-medium text-slate-900", isChips ? "flex flex-wrap justify-end gap-1.5" : "")}>
             {value}
           </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-10 md:mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Finalize & Generate</h2>
        <p className="text-slate-500 text-lg">Set your business model and review your selections.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Column: Business Model & AI Settings */}
        <div className="lg:col-span-5 space-y-6">
            <Card className="border-0 shadow-sm ring-1 ring-slate-100">
              <CardHeader>
                 <CardTitle className="text-xl font-bold text-slate-900">Business Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                     <Label>Revenue Model</Label>
                     <Select value={data.revenueModel} onValueChange={(val) => updateData({ revenueModel: val })}>
                       <SelectTrigger className="bg-slate-50 border-slate-200">
                          <SelectValue placeholder="Select..." />
                       </SelectTrigger>
                       <SelectContent>
                          {REVENUE_MODELS.map(m => (
                             <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                       </SelectContent>
                     </Select>
                  </div>
                  <div className="space-y-2">
                     <Label>Avg Price / Deal Size ($)</Label>
                     <Input 
                        type="number" 
                        placeholder="e.g. 1000" 
                        value={data.dealSize || ''}
                        onChange={(e) => updateData({ dealSize: parseInt(e.target.value) || 0 })}
                        className="bg-slate-50 border-slate-200"
                     />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] p-1 text-white shadow-lg">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-start gap-4">
                     <div className="bg-white/20 p-2 rounded-lg shrink-0">
                        <BrainCircuit className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h3 className="font-bold text-lg flex items-center gap-2">
                           Gemini 3 Reasoning
                           <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 text-[10px]">NEW</Badge>
                        </h3>
                        <p className="text-indigo-100 text-sm mt-1">
                           Enable advanced strategic reasoning. (~30s longer)
                        </p>
                     </div>
                  </div>
                  <Switch 
                     checked={data.enableAiReasoning}
                     onCheckedChange={(c) => updateData({ enableAiReasoning: c })}
                     className="data-[state=checked]:bg-white data-[state=checked]:text-indigo-600 shrink-0 ml-4"
                  />
               </div>
            </div>
            
             <div className="hidden lg:block bg-yellow-50/80 rounded-lg p-4 text-sm text-yellow-800 border border-yellow-100 flex items-start gap-3">
               <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
               <span className="leading-relaxed">AI will generate 10–12 slides tailored to your startup profile and financial inputs.</span>
             </div>
        </div>

        {/* Right Column: Review Summary */}
        <div className="lg:col-span-7 h-full">
            <Card className="border-0 shadow-lg ring-1 ring-slate-100 flex flex-col rounded-xl overflow-hidden bg-white h-full max-h-[600px] lg:max-h-[calc(100vh-280px)] min-h-[400px]">
               <CardHeader className="bg-white border-b border-slate-100 pb-4 pt-6 shrink-0 z-10">
                  <CardTitle className="text-lg font-bold text-[#1E293B]">Review Summary</CardTitle>
               </CardHeader>
               
               <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  <CardContent className="space-y-8 py-6 bg-white">
                     
                     {/* Step 1: Context */}
                     <SummarySection icon={FileText} title="Context">
                        <SummaryRow 
                          label="Deck Type" 
                          value={<span className="capitalize">{data.deckType} Deck</span>} 
                        />
                        <SummaryRow 
                          label="Description" 
                          value={
                            data.description.length < 20 ? null : (
                              <span className="text-slate-600 font-normal block leading-relaxed text-xs text-right break-words max-w-[250px] ml-auto">
                                 {truncate(data.description, 150)}
                              </span>
                            )
                          } 
                          isMissing={data.description.length < 20}
                          warning="Add more detail"
                        />
                        <SummaryRow 
                          label="Website" 
                          value={
                             data.urls.length > 0 ? (
                                data.urls.map(url => (
                                  <Badge key={url} variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-normal lowercase">
                                    {url.replace(/^https?:\/\/(www\.)?/, '')}
                                  </Badge>
                                ))
                             ) : <span className="text-slate-400 italic">No URLs added</span>
                          }
                          isChips
                        />
                     </SummarySection>

                     {/* Step 2: Aesthetic */}
                     <SummarySection icon={Palette} title="Aesthetic">
                        <SummaryRow 
                          label="Theme" 
                          value={data.theme}
                          isMissing={!data.theme} 
                        />
                        <SummaryRow 
                          label="Category" 
                          value={<Badge variant="secondary" className="bg-slate-100 text-slate-600">{getThemeCategory(data.theme)}</Badge>}
                          isMissing={!data.theme}
                        />
                     </SummarySection>

                     {/* Step 3: Details */}
                     <SummarySection icon={BarChart3} title="Details">
                        <SummaryRow 
                           label="Business Type" 
                           value={data.businessType.map(t => <Badge key={t} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-0">{t}</Badge>)}
                           isMissing={data.businessType.length === 0}
                           isChips
                        />
                        <SummaryRow label="Stage" value={data.stage} isMissing={!data.stage} />
                        <SummaryRow label="Team Size" value={data.teamSize} isMissing={!data.teamSize} />
                        <SummaryRow label="Traction" value={data.traction} isMissing={!data.traction} />
                        <SummaryRow 
                           label="Target Raise" 
                           value={formatCurrency(data.targetRaise)} 
                           isMissing={!data.targetRaise}
                        />
                        <SummaryRow 
                           label="Focus Areas" 
                           value={data.deckFocus.map(f => <Badge key={f} variant="outline" className="bg-slate-50 text-slate-600">{f}</Badge>)}
                           isMissing={data.deckFocus.length === 0}
                           isChips
                        />
                     </SummarySection>

                     {/* Step 4: Financials */}
                     <SummarySection icon={DollarSign} title="Financials">
                        <SummaryRow label="Revenue Model" value={data.revenueModel} isMissing={!data.revenueModel} />
                        <SummaryRow 
                           label="Avg Deal Size" 
                           value={data.dealSize ? `$${data.dealSize.toLocaleString()}` : null} 
                           isMissing={!data.dealSize}
                           warning="Enter value"
                        />
                     </SummarySection>

                  </CardContent>
               </div>
            </Card>

            <div className="lg:hidden mt-6 bg-yellow-50/80 rounded-lg p-4 text-sm text-yellow-800 border border-yellow-100 flex items-start gap-3">
               <Sparkles className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
               <span className="leading-relaxed">AI will generate 10–12 slides tailored to your startup profile and financial inputs.</span>
             </div>
        </div>

      </div>
    </div>
  );
};
