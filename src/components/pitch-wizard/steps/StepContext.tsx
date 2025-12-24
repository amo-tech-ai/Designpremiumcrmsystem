import React from 'react';
import { PitchWizardData } from '../types';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Plus, X, Globe, FileText } from 'lucide-react';
import { cn } from '../../ui/utils';

interface StepContextProps {
  data: PitchWizardData;
  updateData: (updates: Partial<PitchWizardData>) => void;
}

export const StepContext: React.FC<StepContextProps> = ({ data, updateData }) => {
  const [urlInput, setUrlInput] = React.useState('');

  const handleAddUrl = () => {
    // FIXED: Added URL validation
    if (!urlInput) return;
    
    // Validate URL format
    try {
      new URL(urlInput);
    } catch {
      // Show error toast (if toast is available)
      console.error('Invalid URL format');
      return;
    }
    
    // Check for duplicates and limit
    if (!data.urls.includes(urlInput) && data.urls.length < 5) {
      updateData({ urls: [...data.urls, urlInput] });
      setUrlInput('');
    }
  };

  const removeUrl = (urlToRemove: string) => {
    updateData({ urls: data.urls.filter(url => url !== urlToRemove) });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell me about your startup.</h2>
        <p className="text-slate-500 text-lg">I'll use this to structure your narrative, financials, and market slides.</p>
      </div>

      {/* Card 1: Deck Type & Format */}
      <Card className="border-0 shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-1 space-y-2">
          {/* Deck Type Selector */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100/50 p-1 rounded-xl">
            <button
              onClick={() => updateData({ deckType: 'investor' })}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                data.deckType === 'investor' 
                  ? "bg-white text-[#FF855D] shadow-sm ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <FileText className="w-4 h-4" /> Investor Pitch
            </button>
            <button
              onClick={() => updateData({ deckType: 'sales' })}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                data.deckType === 'sales' 
                  ? "bg-white text-[#FF855D] shadow-sm ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <BriefcaseIcon className="w-4 h-4" /> Sales Deck
            </button>
          </div>

          {/* Format Selector */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100/50 p-1 rounded-xl">
            <button
              onClick={() => updateData({ format: 'yc' })}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1",
                data.format === 'yc' 
                  ? "bg-white text-[#FF855D] shadow-sm ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <span className="flex items-center gap-2">YC Format</span>
              <span className="text-[10px] opacity-70 font-normal">7 Slides • Traction First</span>
            </button>
            <button
              onClick={() => updateData({ format: 'sequoia' })}
              className={cn(
                "py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-1",
                data.format === 'sequoia' 
                  ? "bg-white text-[#FF855D] shadow-sm ring-1 ring-black/5" 
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <span className="flex items-center gap-2">Sequoia Format</span>
              <span className="text-[10px] opacity-70 font-normal">10 Slides • Strategic Depth</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Description */}
      <Card className="border-0 shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6 md:p-8 space-y-4">
          <div className="space-y-1">
            <Label className="text-lg font-semibold text-slate-900">Startup Description</Label>
            <p className="text-slate-500 text-sm">What problem do you solve and for whom?</p>
          </div>
          
          <div className="relative">
            <Textarea
              value={data.description}
              onChange={(e) => updateData({ description: e.target.value })}
              placeholder="e.g. Sun AI is a startup that uses generative AI to create pitch decks for early-stage companies..."
              className="min-h-[160px] text-base leading-relaxed resize-none p-4 bg-slate-50 border-slate-200 focus:border-[#FF855D] focus:ring-[#FF855D]"
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded-md">
              {data.description.length} chars
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 3: Website */}
      <Card className="border-0 shadow-sm ring-1 ring-slate-100">
        <CardContent className="p-6 md:p-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-grow space-y-4">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-slate-900">Have a website?</Label>
                <p className="text-slate-500 text-sm">We can crawl it to extract features and pricing.</p>
              </div>

              <div className="flex gap-2">
                <Input 
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://www.yourcompany.com"
                  className="bg-slate-50 border-slate-200 focus:border-[#FF855D] focus:ring-[#FF855D]"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddUrl()}
                />
                <Button 
                  onClick={handleAddUrl}
                  variant="outline"
                  className="border-slate-200 hover:bg-slate-50 hover:text-[#FF855D]"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              {data.urls.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {data.urls.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-sm text-slate-600 shadow-sm">
                      <span className="truncate max-w-[200px]">{url}</span>
                      <button 
                        onClick={() => removeUrl(url)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);