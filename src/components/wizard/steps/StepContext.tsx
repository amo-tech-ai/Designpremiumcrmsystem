import React, { useState } from 'react';
import { Sparkles, Globe, Calendar, Building2, Plus, Trash2, Link as LinkIcon, Linkedin, Search, Image as ImageIcon } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent } from '../../ui/card';
import { UploadCard } from '../common/UploadCard';
import { Badge } from '../../ui/badge';
import { useStartupProfile } from '../StartupProfileContext';

export const StepContext = () => {
  const { data, updateData } = useStartupProfile();
  const [newUrl, setNewUrl] = useState('');

  const addUrl = () => {
    if (newUrl && !data.additionalUrls?.includes(newUrl)) {
      updateData({ additionalUrls: [...(data.additionalUrls || []), newUrl] });
      setNewUrl('');
    }
  };

  const removeUrl = (urlToRemove: string) => {
    updateData({ 
      additionalUrls: data.additionalUrls?.filter(url => url !== urlToRemove) || [] 
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Left Column: Form - 8 cols */}
      <div className="lg:col-span-8 space-y-6">
        <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-2xl">
          <CardContent className="p-8 space-y-8">
            
            {/* Startup Name */}
            <div className="space-y-2">
                <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Startup Name</Label>
                <Input 
                  className="h-11 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans" 
                  placeholder="e.g. Acme Corp" 
                  value={data.startupName || ''}
                  onChange={(e) => updateData({ startupName: e.target.value })}
                />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <div className="flex justify-between">
                   <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Startup Description</Label>
                   <span className="text-xs text-[#9CA3AF] font-sans">Used for AI grounding</span>
                </div>
                <Textarea 
                  className="min-h-[100px] resize-none text-base border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans"
                  placeholder="Describe your product, mission, and vision in 2-5 sentences..."
                  value={data.description || ''}
                  onChange={(e) => updateData({ description: e.target.value })}
                />
            </div>

            {/* Target Market */}
            <div className="space-y-2">
                <div className="flex justify-between">
                   <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Target Market</Label>
                   <span className="text-xs text-[#9CA3AF] font-sans">Helps refine audience & competitors</span>
                </div>
                <Textarea 
                  className="min-h-[80px] resize-none text-base border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans"
                  placeholder="Who are you building for? e.g. 'Enterprise marketing teams in North America'..."
                  value={data.targetMarket || ''}
                  onChange={(e) => updateData({ targetMarket: e.target.value })}
                />
            </div>

            <div className="h-px bg-[#F3F4F6]" />

            {/* URLs Section */}
            <div className="space-y-6">
                <h3 className="text-sm font-bold text-[#1A1A1A] font-sans uppercase tracking-wider">Digital Footprint</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Website URL</Label>
                      <div className="relative">
                         <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                         <Input 
                           className="pl-10 h-11 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans" 
                           placeholder="https://..." 
                           value={data.website || ''}
                           onChange={(e) => updateData({ website: e.target.value })}
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Label className="text-sm font-bold text-[#1A1A1A] font-sans">LinkedIn URL</Label>
                      <div className="relative">
                         <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                         <Input 
                           className="pl-10 h-11 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans" 
                           placeholder="https://linkedin.com/company/..." 
                           value={data.linkedin || ''}
                           onChange={(e) => updateData({ linkedin: e.target.value })}
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Additional URLs</Label>
                   <div className="flex gap-2">
                      <div className="relative flex-grow">
                         <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                         <Input 
                           className="pl-10 h-11 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans" 
                           placeholder="Blog post, press release, documentation..." 
                           value={newUrl}
                           onChange={(e) => setNewUrl(e.target.value)}
                           onKeyDown={(e) => e.key === 'Enter' && addUrl()}
                        />
                      </div>
                      <Button variant="outline" onClick={addUrl} className="h-11 border-[#E5E5E5] rounded-xl font-sans font-medium">
                         <Plus className="w-4 h-4 mr-2" /> Add
                      </Button>
                   </div>
                   
                   {data.additionalUrls && data.additionalUrls.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                         {data.additionalUrls.map((url, i) => (
                            <div key={i} className="flex items-center gap-2 bg-[#F7F7F5] px-3 py-1.5 rounded-lg border border-[#E5E5E5] text-sm text-[#1A1A1A]">
                               <LinkIcon className="w-3 h-3 text-[#9CA3AF]" />
                               <span className="truncate max-w-[200px]">{url}</span>
                               <button onClick={() => removeUrl(url)} className="text-[#9CA3AF] hover:text-[#EF4444]">
                                  <Trash2 className="w-3.5 h-3.5" />
                               </button>
                            </div>
                         ))}
                      </div>
                   )}
                </div>
            </div>

            <div className="h-px bg-[#F3F4F6]" />

            {/* Context Keywords */}
            <div className="space-y-2">
                <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Search Terms / Context Keywords</Label>
                <Textarea 
                  className="min-h-[80px] resize-none text-base border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans"
                  placeholder="e.g. AI for law, competitor-name, compliance automation..."
                  value={data.searchTerms || ''}
                  onChange={(e) => updateData({ searchTerms: e.target.value })}
                />
            </div>

            {/* Industry & Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Industry</Label>
                  <Select 
                    value={data.industry || ''} 
                    onValueChange={(val) => updateData({ industry: val })}
                  >
                    <SelectTrigger className="h-11 border-[#E5E5E5] rounded-xl font-sans">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saas">B2B SaaS</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="health">Healthtech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="ai">Artificial Intelligence</SelectItem>
                      <SelectItem value="consumer">Consumer App</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Year Founded</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                    <Input 
                      className="pl-10 h-11 border-[#E5E5E5] focus-visible:ring-[#1A1A1A] rounded-xl font-sans" 
                      placeholder="YYYY" 
                      type="number"
                      value={data.foundedYear || ''}
                      onChange={(e) => updateData({ foundedYear: e.target.value })}
                    />
                  </div>
               </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
               <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Cover Image</Label>
               <UploadCard 
                 label="Upload Cover Image" 
                 sublabel="1200x600px recommended" 
               />
            </div>

          </CardContent>
        </Card>
      </div>

      {/* Right Column: Workflow Sidebar - 4 cols */}
      <div className="lg:col-span-4 space-y-6">
         <div className="sticky top-24 space-y-6">
            <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
               {/* Decorative bg */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6B21A8] to-[#9C7AFE] blur-2xl opacity-20 rounded-full -translate-y-1/2 translate-x-1/2" />
               
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 text-white">
                        <Sparkles className="w-5 h-5" />
                     </div>
                     <h3 className="text-lg font-serif font-medium">What Gemini Will Do</h3>
                  </div>

                  <div className="space-y-4">
                     {[
                        "Run URL Context on all links",
                        "Search the web using grounded search",
                        "Extract features, audience, pricing, problem",
                        "Find real competitors + trends",
                        "Combine with your description + target market",
                        "Autofill later steps"
                     ].map((step, i) => (
                        <div key={i} className="flex gap-3 items-start text-sm text-white/80">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5 flex-shrink-0" />
                           <span className="leading-snug">{step}</span>
                        </div>
                     ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                     <p className="text-xs text-white/60 font-sans leading-relaxed">
                        Gemini 3 uses Google Search Grounding to find up-to-date market data that matches your startup's context.
                     </p>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 shadow-sm">
               <h4 className="text-sm font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#6B7280]" />
                  Why accurate context?
               </h4>
               <p className="text-sm text-[#6B7280] leading-relaxed">
                  The more details you provide here, the better Gemini can tailor your Pitch Deck, One-Pager, and Financial Models in later steps.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};
