import React, { useState, useRef } from 'react';
import { EventWizardHeader } from './EventWizardHeader';
import { EventWizardStep1 } from './EventWizardStep1';
import { EventWizardStep2 } from './EventWizardStep2';
import { WizardFooter } from '../wizard/WizardFooter';
import { EventWizardData, INITIAL_EVENT_DATA, EventAnalysis } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface EventWizardProps {
  onNavigate?: (view: string) => void;
}

export const EventWizard: React.FC<EventWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<EventWizardData>(INITIAL_EVENT_DATA);
  const [isGenerating, setIsGenerating] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const totalSteps = 5;

  const updateData = (updates: Partial<EventWizardData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const scrollToTop = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generateMockAnalysis = (inputData: EventWizardData): EventAnalysis => {
      return {
          summary: `This is a ${inputData.durationHours || 4}-hour ${inputData.eventType?.replace('_', ' ') || 'event'} in ${inputData.cityOrVenue || "San Francisco"} designed for ${inputData.audiencePersona || "attendees"}. The plan prioritizes networking density and value delivery within a ${inputData.budgetCurrency} ${inputData.budgetAmount} budget.`,
          complexity: 'Medium',
          tags: [inputData.audiencePersona || "General", `${inputData.expectedAttendees} Attendees`, `$${inputData.budgetAmount} Budget`],
          urlSignals: {
            capacity: "Est. 150-200",
            venueType: "Modern Industrial / Loft",
            vibe: "Professional yet creative, good natural light"
          },
          searchGrounding: {
            benchmarks: "Similar events in SF average $150/head",
            conflicts: "No major conflicting tech events found on this date.",
            costValidation: "Budget is tight but feasible for this venue tier."
          },
          feasibility: {
            score: 85,
            explanation: "The budget aligns well with the expected attendee count and venue choice. Timeline is sufficient for marketing and logistics."
          },
          constraints: [
            "Venue has strict noise ordinances after 10 PM",
            "Catering needs to be finalized 2 weeks prior",
            "Limited parking availability in the area"
          ],
          risks: [
            {
              severity: 'medium',
              risk: "Budget Buffer Low",
              mitigation: "Allocated 10% contingency from marketing budget."
            },
             {
              severity: 'low',
              risk: "Weather Dependency",
              mitigation: "Outdoor patio has covered backup option."
            }
          ],
          reasoning: [
            "Interpreted 'Networking' goal as requiring open floor plan and extended breaks.",
            "Used venue URL to determine maximum capacity and layout options.",
            "Cross-referenced date with local holidays to ensure high attendance.",
            "Adjusted catering estimates based on current local inflation rates."
          ],
          refinedDescription: inputData.eventDescription || `Join us for an exclusive ${inputData.eventType?.replace('_', ' ') || 'event'} focused on ${inputData.primaryGoal?.replace('_', ' ') || 'connection'}. Featuring industry leaders and curated networking opportunities in the heart of ${inputData.cityOrVenue || 'the city'}.`
        };
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate basic fields
      if (!data.eventName) {
        toast.error("Please enter an event name");
        return;
      }
      
      setIsGenerating(true);
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock analysis
      const analysis = generateMockAnalysis(data);
      updateData({ analysis });
      
      setIsGenerating(false);
      
      setCurrentStep(prev => prev + 1);
      scrollToTop();
      toast.success("Event plan generated!");
    } else if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      scrollToTop();
    } else {
      // Finish
      if (onNavigate) onNavigate('dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    } else if (onNavigate) {
      onNavigate('dashboard');
    }
  };
  
  const getStepTitle = () => {
      switch(currentStep) {
          case 1: return "Event Details";
          case 2: return "AI Summary";
          case 3: return "Plan & Tasks";
          case 4: return "Marketing";
          case 5: return "Review";
          default: return "";
      }
  };

  const getNextLabel = () => {
      if (currentStep === 1) return "Generate Event Plan ✨";
      if (currentStep === 2) return "Generate Tasks & Timeline ✨";
      return undefined;
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F7F5] font-sans text-[#1A1A1A] overflow-hidden">
      {/* Header */}
      <EventWizardHeader 
        currentStep={currentStep} 
        totalSteps={totalSteps} 
        stepTitle={getStepTitle()}
        className="relative top-auto left-auto right-auto shrink-0 bg-[#F7F7F5] backdrop-blur-none"
      />

      {/* Main Content */}
      <main ref={mainRef} className="flex-1 overflow-y-auto px-6 py-8 scroll-smooth">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="pb-32"
          >
            {currentStep === 1 && (
              <EventWizardStep1 data={data} updateData={updateData} />
            )}
            
            {currentStep === 2 && (
              <EventWizardStep2 data={data} updateData={updateData} />
            )}

            {/* Placeholder for future steps */}
            {currentStep > 2 && (
              <div className="max-w-3xl mx-auto text-center py-20">
                <h2 className="text-2xl font-serif font-bold mb-4">Step {currentStep} Content</h2>
                <p className="text-slate-500">This step is under construction.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <WizardFooter 
        currentStep={currentStep - 1} 
        totalSteps={totalSteps}
        onNext={handleNext}
        onBack={handleBack}
        isSaving={isGenerating}
        nextLabel={getNextLabel()}
        loadingLabel="Generating plan..."
        variant="floating"
      />
    </div>
  );
};
