import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Wand2 } from 'lucide-react';
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";
import { supabase } from '../../utils/supabase/client';

// Import new wizard components
import { PitchWizardData, INITIAL_DATA, STEPS, WizardStepId } from '../pitch-wizard/types';
import { StepContext } from '../pitch-wizard/steps/StepContext';
import { DeckTemplateSystem } from './DeckTemplateSystem';
import { StepDetails } from '../pitch-wizard/steps/StepDetails';
import { StepFinancials } from '../pitch-wizard/steps/StepFinancials';
import { PitchDeckGenerationScreen } from '../pitch-wizard/PitchDeckGenerationScreen';

import * as edgeFunctionService from '../../src/services/edgeFunctionService';

interface PitchDeckWizardProps {
  onNavigate?: (view: string) => void;
}

export const PitchDeckWizard: React.FC<PitchDeckWizardProps> = ({ onNavigate }) => {
  const [currentStepId, setCurrentStepId] = useState<WizardStepId>('context');
  const [data, setData] = useState<PitchWizardData>(INITIAL_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDeckId, setGeneratedDeckId] = useState<string | null>(null);

  // --- Navigation Logic ---

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStepId);
  const currentStep = STEPS[currentStepIndex];

  const canGoNext = () => {
    switch (currentStepId) {
      case 'context': return data.description.length > 0;
      case 'aesthetic': return !!data.theme;
      case 'details': return data.businessType.length > 0 && !!data.stage;
      case 'financials': return !!data.revenueModel;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canGoNext()) {
      toast.error("Please fill in required fields before proceeding.");
      return;
    }
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepId(STEPS[currentStepIndex + 1].id as WizardStepId);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepId(STEPS[currentStepIndex - 1].id as WizardStepId);
      window.scrollTo(0, 0);
    } else if (onNavigate) {
       onNavigate('dashboard');
    }
  };

  const handleUpdateData = (updates: Partial<PitchWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    try {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
         toast.error("You must be logged in to generate a deck");
         setIsGenerating(false);
         return;
      }
      
      // 2. Insert new row in public.decks
      const { data: deckData, error: insertError } = await supabase
        .from('decks')
        .insert({
           title: data.companyName || 'Untitled Pitch Deck',
           user_id: user.id,
           template: data.theme,
           status: 'generating',
           meta: {
             wizard_data: data,
             source_urls: [] // Assuming no source URLs for now as not collected in wizard yet
           }
        })
        .select()
        .single();
        
      if (insertError) throw insertError;
      
      const deckId = deckData.id;
      setGeneratedDeckId(deckId);

      // 3. Call generate-deck Edge Function via Service
      await edgeFunctionService.generateDeck({
        deckId,
        businessContext: data.description,
        templateId: data.theme,
        format: data.format,
        wizardData: data,
        urls: [] // Optional
      });

      // The generation screen will now take over polling via the deckId
      
    } catch (err) {
      console.error("Failed to start generation:", err);
      toast.error("Failed to start deck generation");
      setIsGenerating(false);
      setGeneratedDeckId(null);
    }
  };

  const handleGenerationComplete = (deckId: string) => {
    setIsGenerating(false);
    toast.success("Pitch Deck Generated Successfully!");
    
    // Update browser URL first
    window.history.pushState({}, '', `/pitch-deck/editor/${deckId}`);
    
    // If we have access to onNavigate (when embedded in App.tsx shell), use it
    if (onNavigate) {
       onNavigate('editor');
    } else {
       // Fallback reload if running standalone
       window.location.reload(); 
    }
  };

  // --- Conditional Rendering for Generation Screen ---
  if (isGenerating && generatedDeckId) {
    return <PitchDeckGenerationScreen deckId={generatedDeckId} onComplete={() => handleGenerationComplete(generatedDeckId)} />;
  }

  useEffect(() => {
    // Check for URL-based "generating" state on mount
    const path = window.location.pathname;
    if (path.startsWith('/pitch-deck/generating/')) {
       const id = path.split('/pitch-deck/generating/')[1];
       if (id) {
          setGeneratedDeckId(id);
          setIsGenerating(true);
       }
    }
  }, []);

  // --- Render Steps ---

  const renderStep = () => {
    switch (currentStepId) {
      case 'context': return <StepContext data={data} updateData={handleUpdateData} />;
      case 'aesthetic': return (
        <DeckTemplateSystem 
          value={data.theme} 
          onChange={(id) => handleUpdateData({ theme: id })} 
        />
      );
      case 'details': return <StepDetails data={data} updateData={handleUpdateData} />;
      case 'financials': return <StepFinancials data={data} updateData={handleUpdateData} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col font-sans text-slate-900 overflow-y-auto">
      
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF855D]">
                <Sparkles className="w-5 h-5" />
             </div>
             <div>
                <h1 className="text-sm font-bold text-slate-900 tracking-tight">PITCH WIZARD</h1>
                <p className="text-xs text-slate-500">Create your investor deck</p>
             </div>
          </div>

          {/* Progress Bar */}
          <div className="hidden md:flex items-center gap-2">
             {STEPS.map((step, index) => {
               const isActive = step.id === currentStepId;
               const isCompleted = index < currentStepIndex;
               
               return (
                  <div key={step.id} className="flex items-center">
                     <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
                        isActive ? "bg-slate-900 text-white shadow-sm" : 
                        isCompleted ? "text-slate-900 bg-slate-100" : "text-slate-400"
                     )}>
                        <span className={cn(
                           "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                           isActive ? "bg-white text-slate-900" : 
                           isCompleted ? "bg-slate-300 text-white" : "bg-slate-100 text-slate-300"
                        )}>
                           {step.number}
                        </span>
                        {step.label}
                     </div>
                     {index < STEPS.length - 1 && (
                        <div className="w-8 h-[1px] bg-slate-200 mx-2" />
                     )}
                  </div>
               );
             })}
          </div>

          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 md:py-12 pb-32">
        {renderStep()}
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] h-[72px] flex items-center">
         <div className="w-full max-w-5xl mx-auto px-4 flex items-center justify-between">
            
            <Button 
               variant="ghost" 
               onClick={handleBack}
               className="text-slate-500 hover:text-slate-900"
            >
               <ChevronLeft className="w-4 h-4 mr-2" />
               Back
            </Button>

            {currentStepIndex < STEPS.length - 1 ? (
               <div className="flex items-center gap-4">
                  {!canGoNext() && currentStepId === 'aesthetic' && (
                     <span className="hidden sm:inline-block text-xs text-orange-500 font-medium bg-orange-50 px-3 py-1.5 rounded-full">
                        Choose a template to continue
                     </span>
                  )}
                  <div className="hidden md:block text-sm font-medium text-slate-400">
                      Next: <span className="text-slate-900">{STEPS[currentStepIndex + 1].label}</span>
                  </div>
                  <Button 
                      onClick={handleNext}
                      disabled={!canGoNext()}
                      className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 shadow-lg shadow-slate-200"
                  >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
               </div>
            ) : (
               <Button 
                  onClick={handleGenerate} 
                  disabled={isGenerating}
                  className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 h-10 shadow-lg shadow-slate-200 transition-all hover:scale-[1.01]"
               >
                  {isGenerating ? (
                     <span className="flex items-center gap-2">Generating... <Sparkles className="w-4 h-4 animate-spin" /></span>
                  ) : (
                     <span className="flex items-center gap-2">Generate Deck <Sparkles className="w-4 h-4 text-[#FF855D]" /></span>
                  )}
               </Button>
            )}
         </div>
      </div>

    </div>
  );
};
