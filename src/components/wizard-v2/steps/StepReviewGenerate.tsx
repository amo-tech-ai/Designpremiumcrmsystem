import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Sparkles, FileText, Download, ArrowRight, Check } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import type { WizardData } from '../OnboardingWizard';

interface StepReviewGenerateProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
  onComplete: () => void;
}

export function StepReviewGenerate({ data, onComplete }: StepReviewGenerateProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['business']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState('');
  const [deckGenerated, setDeckGenerated] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const calculateCompleteness = () => {
    let filled = 0;
    let total = 0;

    // Business Basics (weight: 2x)
    total += 6;
    if (data.problem) filled += 2;
    if (data.solution) filled += 2;
    if (data.oneLiner) filled += 2;

    // Market Context (weight: 2x)
    total += 8;
    if (data.industry) filled += 2;
    if (data.targetCustomer) filled += 2;
    if (data.tam) filled += 2;
    if (data.competitors.length > 0) filled += 2;

    // Team (weight: 1x)
    total += 2;
    if (data.founders.length > 0) filled += 2;

    // Traction (weight: 1x)
    total += 4;
    if (data.activeUsers) filled += 1;
    if (data.mrr) filled += 1;
    if (data.customers) filled += 1;
    if (data.growthRate) filled += 1;

    // Fundraising (weight: 1x)
    total += 4;
    if (data.fundingGoal) filled += 1;
    if (data.stage) filled += 1;
    if (data.timeline) filled += 1;
    if (data.useOfFunds) filled += 1;

    return Math.round((filled / total) * 100);
  };

  const handleGenerateDeck = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Step 1: Analyzing profile (0-30%)
    setGenerationStep('Analyzing your profile...');
    for (let i = 0; i <= 30; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setGenerationProgress(i);
    }
    
    // Step 2: Generating slides (30-60%)
    setGenerationStep('Creating slide content...');
    for (let i = 30; i <= 60; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setGenerationProgress(i);
    }
    
    // Step 3: Adding charts (60-85%)
    setGenerationStep('Adding charts and visuals...');
    for (let i = 60; i <= 85; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setGenerationProgress(i);
    }
    
    // Step 4: Finalizing (85-100%)
    setGenerationStep('Finalizing your pitch deck...');
    for (let i = 85; i <= 100; i += 3) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setGenerationProgress(i);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsGenerating(false);
    setDeckGenerated(true);
    
    // Confetti celebration!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 200);
  };

  const completeness = calculateCompleteness();

  const sections = [
    {
      id: 'business',
      title: 'Business Basics',
      completed: !!(data.problem && data.solution && data.oneLiner),
      items: [
        { label: 'Problem', value: data.problem },
        { label: 'Solution', value: data.solution },
        { label: 'One-liner', value: data.oneLiner },
      ]
    },
    {
      id: 'market',
      title: 'Market Context',
      completed: !!(data.industry && data.targetCustomer),
      items: [
        { label: 'Industry', value: data.industry },
        { label: 'Target Customer', value: data.targetCustomer },
        { label: 'TAM', value: data.tam ? `$${(data.tam / 1000000000).toFixed(1)}B` : undefined },
        { label: 'SAM', value: data.sam ? `$${(data.sam / 1000000000).toFixed(1)}B` : undefined },
        { label: 'SOM', value: data.som ? `$${(data.som / 1000000).toFixed(0)}M` : undefined },
        { label: 'Competitors', value: data.competitors.join(', ') },
      ]
    },
    {
      id: 'team',
      title: 'Team',
      completed: data.founders.length > 0,
      items: data.founders.map(f => ({ label: f.fullName, value: f.role }))
    },
    {
      id: 'traction',
      title: 'Traction',
      completed: !!(data.activeUsers || data.mrr || data.customers),
      items: [
        { label: 'Active Users', value: data.activeUsers?.toLocaleString() },
        { label: 'MRR', value: data.mrr ? `$${data.mrr.toLocaleString()}` : undefined },
        { label: 'Customers', value: data.customers?.toLocaleString() },
        { label: 'Growth Rate', value: data.growthRate ? `${data.growthRate}%` : undefined },
      ]
    },
    {
      id: 'fundraising',
      title: 'Fundraising',
      completed: !!(data.fundingGoal && data.stage),
      items: [
        { label: 'Goal', value: data.fundingGoal ? `$${(data.fundingGoal / 1000000).toFixed(1)}M` : undefined },
        { label: 'Stage', value: data.stage },
        { label: 'Timeline', value: data.timeline },
        { label: 'Use of Funds', value: data.useOfFunds },
      ]
    },
  ];

  return (
    <div className="space-y-8">
      {/* Completeness Score */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Profile Completeness</h3>
            <p className="text-gray-600 mt-1">Review your information before generating</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {completeness}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
        
        <Progress value={completeness} className="h-3" />
        
        {completeness >= 70 ? (
          <div className="mt-4 flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">Great! Your profile is complete enough to generate a pitch deck.</span>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-sm font-medium">Add more details to improve your pitch deck (aim for 70%+)</span>
          </div>
        )}
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {section.completed ? (
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded" />
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-500">
                    {section.items.filter(i => i.value).length} of {section.items.length} fields filled
                  </p>
                </div>
              </div>

              {expandedSections.includes(section.id) ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-6 space-y-4 bg-gray-50">
                    {section.items.map((item, idx) => (
                      item.value && (
                        <div key={idx} className="grid grid-cols-3 gap-4">
                          <div className="text-sm font-semibold text-gray-700">{item.label}</div>
                          <div className="col-span-2 text-sm text-gray-900">{item.value}</div>
                        </div>
                      )
                    ))}
                    
                    {section.items.filter(i => i.value).length === 0 && (
                      <div className="text-sm text-gray-500 italic">No data added yet</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Generate Deck Section */}
      {!deckGenerated ? (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex p-4 bg-white rounded-full shadow-lg mb-6">
              <FileText className="w-12 h-12 text-purple-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Generate Your Pitch Deck?
            </h3>
            <p className="text-gray-600 mb-6">
              We'll create a professional 12-slide pitch deck using all your information. 
              This usually takes about 30 seconds.
            </p>

            {!isGenerating ? (
              <Button
                onClick={handleGenerateDeck}
                disabled={completeness < 50}
                className="w-full max-w-md h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Pitch Deck
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">{generationStep}</span>
                    <span className="text-sm font-bold text-purple-600">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-3" />
                </div>

                <div className="bg-white rounded-xl p-6 border border-purple-200">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Check className={`w-5 h-5 ${generationProgress > 0 ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={generationProgress > 0 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        Analyzing profile
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className={`w-5 h-5 ${generationProgress > 30 ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={generationProgress > 30 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        Creating slides
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className={`w-5 h-5 ${generationProgress > 60 ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={generationProgress > 60 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        Adding charts
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Check className={`w-5 h-5 ${generationProgress > 85 ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={generationProgress > 85 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                        Done!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {completeness < 50 && (
              <p className="text-sm text-amber-600 mt-4">
                Please complete at least 50% of your profile to generate a deck
              </p>
            )}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex p-4 bg-white rounded-full shadow-lg mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              🎉 Your Pitch Deck is Ready!
            </h3>
            <p className="text-gray-600 mb-8">
              We've created a professional 12-slide pitch deck with your problem, solution, market size, 
              team, traction, and fundraising information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                variant="outline"
                className="flex items-center gap-2 h-12 text-base"
              >
                <FileText className="w-5 h-5" />
                View Deck
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 h-12 text-base"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </div>

            <Button
              onClick={onComplete}
              className="w-full max-w-md h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
