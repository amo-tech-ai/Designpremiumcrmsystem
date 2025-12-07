import React, { useState } from 'react';
import { Sparkles, Globe, Calendar, Building2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent } from '../../ui/card';
import { UploadCard } from '../common/UploadCard';
import { Badge } from '../../ui/badge';

export const StepContext = () => {
  const [description, setDescription] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAutofill = () => {
    setIsAiLoading(true);
    setTimeout(() => {
      setIsAiLoading(false);
      setDescription("Acme is a visual collaboration platform for marketing teams to design, review, and approve creative assets 10x faster.");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Column: Form */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="border-0 shadow-sm ring-1 ring-slate-200">
          <CardContent className="p-6 space-y-6">
            
            {/* Website & Smart Fill */}
            <div className="space-y-3">
               <Label className="text-base">Website URL</Label>
               <div className="flex gap-3">
                 <div className="relative flex-grow">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input className="pl-10" placeholder="https://www.yourstartup.com" />
                 </div>
                 <Button 
                   variant="outline" 
                   onClick={handleAutofill}
                   disabled={isAiLoading}
                   className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 min-w-[140px]"
                 >
                   {isAiLoading ? (
                     <Sparkles className="w-4 h-4 animate-spin mr-2" />
                   ) : (
                     <Sparkles className="w-4 h-4 mr-2" />
                   )}
                   {isAiLoading ? "Analyzing..." : "Smart Autofill"}
                 </Button>
               </div>
               <p className="text-xs text-slate-500">
                 Enter your website to automatically extract company details using Gemini AI.
               </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
               <div className="space-y-2">
                   <div className="flex justify-between">
                      <Label className="text-base">One-Liner Description</Label>
                      <span className="text-xs text-slate-400">{description.length}/140</span>
                   </div>
                   <Textarea 
                     className="min-h-[80px] resize-none text-base"
                     placeholder="e.g. Acme is a visual collaboration platform..."
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     maxLength={140}
                   />
               </div>

               <div className="space-y-2">
                   <Label className="text-base">Long Description <span className="text-slate-400 font-normal text-sm">(Optional)</span></Label>
                   <Textarea 
                     className="min-h-[140px] resize-none text-base"
                     placeholder="Detailed description of your product, mission, and vision..."
                   />
               </div>
            </div>

            {/* Industry & Year */}
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <Label>Industry</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">B2B SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="health">Healthtech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label>Year Founded</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input className="pl-10" placeholder="YYYY" type="number" />
                  </div>
               </div>
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Right Column: Upload & AI Insights */}
      <div className="space-y-6">
        
        <div className="space-y-2">
           <Label>Cover Image</Label>
           <UploadCard 
             label="Upload Cover Image" 
             sublabel="1200x600px recommended" 
           />
        </div>

        {/* AI Extraction Panel (Mock) */}
        <div className="bg-white rounded-xl border border-indigo-100 p-5 shadow-sm space-y-4">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-indigo-100 rounded-md flex items-center justify-center">
                 <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <h4 className="text-sm font-semibold text-slate-900">Detected Signals</h4>
           </div>
           
           <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xs font-medium text-slate-500 mb-2">Target Audience</div>
                 <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">Marketing Teams</Badge>
                    <Badge variant="secondary" className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50">Agencies</Badge>
                 </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xs font-medium text-slate-500 mb-1">Core Problem</div>
                 <div className="text-sm text-slate-800">Slow approval cycles for creative assets</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xs font-medium text-slate-500 mb-1">Pricing Model</div>
                 <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-0">Freemium</Badge>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                 <div className="text-xs font-medium text-slate-500 mb-1">Value Proposition</div>
                 <div className="text-sm text-slate-800 italic">"Design 10x faster"</div>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
};
