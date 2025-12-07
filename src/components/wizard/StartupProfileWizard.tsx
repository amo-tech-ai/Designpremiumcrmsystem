import React, { useState } from 'react';
import { WizardSteps } from './WizardSteps';
import { WizardFooter } from './WizardFooter';
import { StepContext } from './steps/StepContext';
import { StepTeam } from './steps/StepTeam';
import { StepBusiness } from './steps/StepBusiness';
import { StepTraction } from './steps/StepTraction';
import { StepFunding } from './steps/StepFunding';
import { StepSummary } from './steps/StepSummary';
import { motion, AnimatePresence } from 'motion/react';

interface StartupProfileWizardProps {
  onNavigate: (view: string) => void;
}

const STEPS = ["Context", "Founders", "Business", "Traction", "Funding", "Summary"];

export const StartupProfileWizard: React.FC<StartupProfileWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleNext = () => {
    setIsSaving(true);
    // Simulate save delay
    setTimeout(() => {
      setIsSaving(false);
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        // Finish action
        onNavigate('dashboard');
      }
    }, 600);
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
      case 1: return <StepTeam />;
      case 2: return <StepBusiness />;
      case 3: return <StepTraction />;
      case 4: return <StepFunding />;
      case 5: return <StepSummary />;
      default: return <StepContext />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col pb-24">
      {/* Top Navigation */}
      <div className="sticky top-0 z-30 shadow-sm">
        <WizardSteps currentStep={currentStep} steps={STEPS} />
      </div>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">{STEPS[currentStep]}</h1>
          <p className="text-slate-500 mt-2">
            {currentStep === 0 && "Let's start with the basics. Tell us about your company."}
            {currentStep === 1 && "Who is behind the magic? Add your founding team."}
            {currentStep === 2 && "Define your business model and market position."}
            {currentStep === 3 && "Show your traction metrics and key milestones."}
            {currentStep === 4 && "Detail your funding history and capital requirements."}
            {currentStep === 5 && "Review your profile and get an AI assessment."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <WizardFooter 
        currentStep={currentStep}
        totalSteps={STEPS.length}
        onNext={handleNext}
        onBack={handleBack}
        isSaving={isSaving}
      />
    </div>
  );
};
