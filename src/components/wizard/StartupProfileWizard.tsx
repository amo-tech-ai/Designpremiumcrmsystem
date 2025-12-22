import React, { useState } from 'react';
import { WizardSteps } from './WizardSteps';
import { WizardFooter } from './WizardFooter';
import { StepContext } from './steps/StepContext';
import { StepTeam } from './steps/StepTeam';
import { StepBusiness } from './steps/StepBusiness';
import { StepTraction } from './steps/StepTraction';
import { StepFunding } from './steps/StepFunding';
import { StepSummary } from './steps/StepSummary';
import { StepAISummary } from './steps/StepAISummary';
import { motion, AnimatePresence } from 'motion/react';
import { StartupProfileProvider, useStartupProfile } from './StartupProfileContext';

interface StartupProfileWizardProps {
  onNavigate: (view: string) => void;
}

const STEPS = ["Context", "AI Analysis", "Founders", "Business", "Traction", "Funding", "Review"];

const WizardContent: React.FC<StartupProfileWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const { saveData, isSaving, data } = useStartupProfile();

  const handleAutofill = async () => {
    // Simulate AI processing
    setIsAiGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsAiGenerating(false);
    
    // Proceed to Step 2
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleNext = async () => {
    if (currentStep !== 1) { // Don't save on AI Analysis step as it's read-only/review
       await saveData();
    }
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      onNavigate('dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <StepContext />;
      case 1: return <StepAISummary />;
      case 2: return <StepTeam />;
      case 3: return <StepBusiness />;
      case 4: return <StepTraction />;
      case 5: return <StepFunding />;
      case 6: return <StepSummary />;
      default: return <StepContext />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col font-sans text-[#1A1A1A]">
      {/* Top Navigation - Fixed at Top (Z-Index 30 to stay below modals but above content) */}
      <div className="sticky top-0 z-30 shadow-sm border-b border-[#E5E5E5] bg-[#F7F7F5]/95 backdrop-blur-sm">
        <WizardSteps currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Main Content - Single Scrollable Column 
          padding-top: pt-10 md:pt-16 (64px)
          padding-bottom: pb-40 (160px) to ensure content clears the fixed footer + 64px margin 
      */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 pt-10 md:pt-16 pb-40">
        <div className="mb-10 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
            <span className="text-xs font-bold text-[#6B21A8] uppercase tracking-wider bg-[#F3E8FF] px-2 py-1 rounded-md">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          <h1 className="text-4xl font-serif font-medium text-[#1A1A1A] tracking-tight">{STEPS[currentStep]}</h1>
          <p className="text-[#6B7280] mt-3 text-lg font-sans font-light max-w-2xl">
            {currentStep === 0 && "Add your links and Gemini 3 will build your profile."}
            {currentStep === 1 && "Review what Gemini found from your links and inputs."}
            {currentStep === 2 && "Who is behind the magic? Add your founding team members."}
            {currentStep === 3 && "Define your business model, pricing, and market position."}
            {currentStep === 4 && "Show your traction metrics, growth, and key milestones."}
            {currentStep === 5 && "Detail your funding history and future capital requirements."}
            {currentStep === 6 && "Review your profile and receive an AI-generated assessment."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation - Fixed at Bottom (Z-Index 50 to float above everything) */}
      <WizardFooter 
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNext={currentStep === 0 ? handleAutofill : handleNext}
        onBack={handleBack}
        isSaving={isSaving || isAiGenerating}
        nextLabel={currentStep === 0 ? "Run Smart Autofill" : undefined}
        loadingLabel={isAiGenerating ? "Analyzing description, links, & terms..." : "Saving changes..."}
      />
    </div>
  );
};

export const StartupProfileWizard: React.FC<StartupProfileWizardProps> = (props) => {
  return (
    <StartupProfileProvider>
      <WizardContent {...props} />
    </StartupProfileProvider>
  );
};
