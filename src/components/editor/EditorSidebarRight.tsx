import React, { useState, useEffect } from 'react';
import { Slide } from './types';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Sparkles, 
  Settings, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  LayoutTemplate,
  AlignLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll-area';
import { AIChatPanel } from './AIChatPanel';
import { analyzeSlideAI } from '../../src/services/edgeFunctionService';

interface EditorSidebarRightProps {
  currentSlide: Slide;
  onUpdateSlide: (updates: Partial<Slide>) => void;
  onAddSlide: (slide?: Partial<Slide>) => void;
  isOpen: boolean;
  onToggle: () => void;
}

type Tab = 'ai' | 'properties' | 'notes' | 'analysis';

export const EditorSidebarRight: React.FC<EditorSidebarRightProps> = ({
  currentSlide,
  onUpdateSlide,
  onAddSlide,
  isOpen,
  onToggle
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('ai');
  const [analysisResult, setAnalysisResult] = useState<{ score: number; suggestions: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Clear analysis when slide changes
  useEffect(() => {
    setAnalysisResult(null);
  }, [currentSlide.id]);

  // Run analysis when tab is active
  useEffect(() => {
    if (activeTab === 'analysis' && !analysisResult && !isAnalyzing) {
       setIsAnalyzing(true);
       analyzeSlideAI({ 
         slideId: currentSlide.id, 
         slideContent: currentSlide.content, 
         action: 'analyze' 
       })
       .then(res => {
          setAnalysisResult(res);
       })
       .catch(err => console.error("Analysis failed", err))
       .finally(() => setIsAnalyzing(false));
    }
  }, [activeTab, currentSlide.id, analysisResult, isAnalyzing, currentSlide.content]);

  const renderAnalysis = () => {
    if (isAnalyzing) {
       return (
         <div className="flex flex-col items-center justify-center h-40 gap-3 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <p className="text-sm">Analyzing slide quality...</p>
         </div>
       );
    }

    if (!analysisResult) {
       return (
         <div className="text-center text-sm text-slate-400 py-8">
            Could not analyze this slide.
         </div>
       );
    }

    const passed = analysisResult.score > 70;

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">Slide Analysis</h3>
          <p className="text-sm text-slate-500">AI Quality Score: <span className={cn("font-bold", passed ? "text-emerald-600" : "text-amber-600")}>{analysisResult.score}/100</span></p>
        </div>

        {passed ? (
           <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                 <h4 className="text-sm font-semibold text-emerald-900">Good Job!</h4>
                 <p className="text-xs text-emerald-700 mt-1">This slide follows investor best practices.</p>
              </div>
           </div>
        ) : (
           <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Suggestions</h4>
              {analysisResult.suggestions.map((suggestion, i) => (
                 <div key={i} className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800">{suggestion}</p>
                 </div>
              ))}
           </div>
        )}
        
        <Button variant="outline" size="sm" className="w-full" onClick={() => { setAnalysisResult(null); }}>
           <Settings className="w-3.5 h-3.5 mr-2" />
           Re-analyze
        </Button>
      </div>
    );
  };

  const renderProperties = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Properties</h3>
        <p className="text-sm text-slate-500">Customize layout and style.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Layout</Label>
          <div className="grid grid-cols-2 gap-2">
            <div 
               onClick={() => onUpdateSlide({ layout: 'image-left' })}
               className={cn("aspect-video bg-slate-100 rounded border-2 flex items-center justify-center cursor-pointer", currentSlide.layout === 'image-left' ? 'border-indigo-600' : 'border-slate-200')}
            >
              <LayoutTemplate className="w-4 h-4 text-slate-900" />
            </div>
            <div 
               onClick={() => onUpdateSlide({ layout: 'default' })}
               className={cn("aspect-video bg-white rounded border flex items-center justify-center cursor-pointer", (!currentSlide.layout || currentSlide.layout === 'default') ? 'border-indigo-600 border-2' : 'border-slate-200')}
            >
              <AlignLeft className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Theme Color</Label>
          <div className="flex gap-2">
            {['bg-slate-900', 'bg-[#F97316]', 'bg-indigo-600', 'bg-emerald-500', 'bg-rose-500'].map((color, i) => (
              <div key={i} className={cn("w-6 h-6 rounded-full cursor-pointer ring-offset-2 hover:ring-2 ring-slate-200", color, i === 1 ? 'ring-2 ring-slate-900' : '')} />
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Label>Show Image</Label>
          <Switch checked={!!currentSlide.imageUrl} onCheckedChange={(c) => onUpdateSlide({ imageUrl: c ? 'https://source.unsplash.com/random/800x600?business' : undefined })} />
        </div>
        
        <div className="flex items-center justify-between">
          <Label>Slide Number</Label>
          <Switch checked={true} />
        </div>
      </div>
    </div>
  );

  const renderNotes = () => (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-300">
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">Speaker Notes</h3>
        <p className="text-sm text-slate-500">Private notes for your presentation.</p>
      </div>

      <Textarea 
        value={currentSlide.notes || ''} 
        onChange={(e) => onUpdateSlide({ notes: e.target.value })}
        className="flex-grow resize-none bg-yellow-50/50 border-yellow-200 focus:border-yellow-300 text-sm leading-relaxed"
        placeholder="Add notes here..."
      />
      
      <div className="text-xs text-slate-400 text-center">
        Autosaved
      </div>
    </div>
  );

  return (
    <div 
      className={cn(
        "flex-shrink-0 bg-white border-l border-slate-200 transition-all duration-300 ease-in-out flex overflow-hidden",
        isOpen ? "w-[360px]" : "w-[48px]"
      )}
    >
       {/* Collapsed Vertical Bar */}
       <div className="w-[48px] flex-shrink-0 flex flex-col items-center py-4 gap-4 bg-slate-50 border-r border-slate-100">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle}
            className="mb-4 text-slate-400 hover:text-slate-900"
          >
             {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>

          <NavIcon icon={Sparkles} label="AI" active={activeTab === 'ai'} onClick={() => { setActiveTab('ai'); if (!isOpen) onToggle(); }} />
          <NavIcon icon={ShieldCheck} label="Check" active={activeTab === 'analysis'} onClick={() => { setActiveTab('analysis'); if (!isOpen) onToggle(); }} />
          <NavIcon icon={Settings} label="Props" active={activeTab === 'properties'} onClick={() => { setActiveTab('properties'); if (!isOpen) onToggle(); }} />
          <NavIcon icon={FileText} label="Notes" active={activeTab === 'notes'} onClick={() => { setActiveTab('notes'); if (!isOpen) onToggle(); }} />
       </div>

       {/* Expanded Content Area */}
       <div className={cn(
          "flex-grow flex flex-col h-full min-w-[312px] transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
       )}>
          {activeTab === 'ai' ? (
             <AIChatPanel 
                currentSlide={currentSlide}
                onUpdateSlide={onUpdateSlide}
                onAddSlide={onAddSlide}
                onClose={onToggle}
             />
          ) : (
             <ScrollArea className="flex-grow p-6">
                {activeTab === 'properties' && renderProperties()}
                {activeTab === 'analysis' && renderAnalysis()}
                {activeTab === 'notes' && renderNotes()}
             </ScrollArea>
          )}
       </div>
    </div>
  );
};

const NavIcon = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <div className="flex flex-col items-center gap-1 cursor-pointer group" onClick={onClick}>
     <div className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
        active ? "bg-[#F97316] text-white shadow-md" : "text-slate-500 group-hover:bg-slate-200"
     )}>
        <Icon className="w-4 h-4" />
     </div>
     <span className={cn("text-[10px] font-semibold", active ? "text-[#F97316]" : "text-slate-400")}>{label}</span>
  </div>
);
