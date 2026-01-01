import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { StepBusinessBasics } from './steps/StepBusinessBasics';
import { StepMarketContext } from './steps/StepMarketContext';
import { StepTeamEnrichment } from './steps/StepTeamEnrichment';
import { StepTractionMetrics } from './steps/StepTractionMetrics';
import { StepFundraisingGoals } from './steps/StepFundraisingGoals';
import { StepReviewGenerate } from './steps/StepReviewGenerate';

export interface WizardData {
  // Step 1: Business Basics
  problem: string;
  solution: string;
  oneLiner: string;
  
  // Step 2: Market Context
  industry: string;
  targetCustomer: string;
  competitors: string[];
  tam?: number;
  sam?: number;
  som?: number;
  marketSources?: Array<{ title: string; url: string; }>;
  
  // Step 3: Team
  founders: Array<{
    id: string;
    fullName: string;
    role: string;
    linkedinUrl: string;
    avatarUrl?: string;
    bio?: string;
    education?: string[];
    experience?: Array<{ company: string; title: string; duration: string; }>;
  }>;
  
  // Step 4: Traction
  activeUsers?: number;
  mrr?: number;
  customers?: number;
  growthRate?: number;
  launchedDate?: string;
  
  // Step 5: Fundraising
  fundingGoal?: number;
  stage?: string;
  timeline?: string;
  useOfFunds?: string;
}

interface OnboardingWizardProps {
  onComplete: () => void;
  onSaveDraft?: (data: WizardData) => Promise<void>;
}

const STEPS = [
  'Business Basics',
  'Market Context',
  'Team',
  'Traction',
  'Fundraising',
  'Review & Generate'
];

export function OnboardingWizard({ onComplete, onSaveDraft }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [wizardData, setWizardData] = useState<WizardData>({
    problem: '',
    solution: '',
    oneLiner: '',
    industry: '',
    targetCustomer: '',
    competitors: [],
    founders: [],
  });

  const updateData = (updates: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...updates }));
  };

  const handleSaveDraft = async () => {
    if (onSaveDraft) {
      setIsSaving(true);
      try {
        await onSaveDraft(wizardData);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleNext = async () => {
    // Auto-save on each step
    await handleSaveDraft();
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      onComplete();
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
      case 0:
        return <StepBusinessBasics data={wizardData} updateData={updateData} />;
      case 1:
        return <StepMarketContext data={wizardData} updateData={updateData} />;
      case 2:
        return <StepTeamEnrichment data={wizardData} updateData={updateData} />;
      case 3:
        return <StepTractionMetrics data={wizardData} updateData={updateData} />;
      case 4:
        return <StepFundraisingGoals data={wizardData} updateData={updateData} />;
      case 5:
        return <StepReviewGenerate data={wizardData} updateData={updateData} onComplete={onComplete} />;
      default:
        return <StepBusinessBasics data={wizardData} updateData={updateData} />;
    }
  };

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar Header - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-semibold text-gray-900">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
            
            <button
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
          
          <div className="flex items-center justify-between mt-2">
            {STEPS.map((step, index) => (
              <div
                key={step}
                className={`text-xs font-medium transition-colors ${
                  index === currentStep
                    ? 'text-indigo-600'
                    : index < currentStep
                    ? 'text-gray-900'
                    : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Step Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {STEPS[currentStep]}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {currentStep === 0 && "Let's start with the basics. What problem are you solving?"}
              {currentStep === 1 && "Help us understand your market and opportunity size."}
              {currentStep === 2 && "Who's building this? Add your team members."}
              {currentStep === 3 && "Show your progress. What traction have you achieved?"}
              {currentStep === 4 && "What are your fundraising goals and plans?"}
              {currentStep === 5 && "Review everything and generate your pitch deck."}
            </p>
          </div>

          {/* Step Content with Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Navigation - Sticky */}
      <div className="sticky bottom-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="text-sm text-gray-500">
              {currentStep + 1} of {STEPS.length}
            </div>

            <Button
              onClick={handleNext}
              disabled={isSaving}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {currentStep === STEPS.length - 1 ? 'Complete' : 'Continue'}
              {currentStep < STEPS.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
