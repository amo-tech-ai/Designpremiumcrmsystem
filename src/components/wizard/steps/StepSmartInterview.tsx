import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, TrendingUp, Users, DollarSign, Target, Zap, Package, Repeat } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Progress } from '../../ui/progress';
import { useStartupProfile } from '../StartupProfileContext';

// Question types
type QuestionType = 'choice' | 'text' | 'number' | 'multi-chip' | 'conditional';

interface AnswerOption {
  value: string;
  label: string;
  followUpQuestionId?: string;
}

interface ChipOption {
  value: string;
  label: string;
  category?: string;
}

interface Question {
  id: string;
  text: string;
  subtext?: string;
  disclaimer?: string;
  type: QuestionType;
  options?: AnswerOption[];
  chips?: ChipOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  insight: string;
  signals: string[];
  conditionalDisplay?: (answers: AnswerData[]) => boolean;
}

interface AnswerData {
  questionId: string;
  answer: string | string[];
  timestamp: Date;
}

// Dynamic chip generation based on business model
const getFeatureChips = (businessModel?: string): ChipOption[] => {
  // Default SaaS/Platform chips
  const saasChips: ChipOption[] = [
    { value: 'workflow_automation', label: 'Workflow automation', category: 'saas' },
    { value: 'collaboration', label: 'Collaboration / approvals', category: 'saas' },
    { value: 'analytics', label: 'Analytics & insights', category: 'saas' },
    { value: 'ai_assisted', label: 'AI-assisted creation', category: 'saas' },
    { value: 'integrations', label: 'Integrations (Shopify, Stripe, etc)', category: 'saas' },
    { value: 'compliance', label: 'Compliance / governance', category: 'saas' },
    { value: 'customization', label: 'Customization / configuration', category: 'saas' },
  ];

  const marketplaceChips: ChipOption[] = [
    { value: 'discovery', label: 'Supply discovery', category: 'marketplace' },
    { value: 'booking', label: 'Booking & scheduling', category: 'marketplace' },
    { value: 'payments', label: 'Payments & escrow', category: 'marketplace' },
    { value: 'trust', label: 'Ratings / trust system', category: 'marketplace' },
    { value: 'vendor_mgmt', label: 'Vendor management', category: 'marketplace' },
    { value: 'logistics', label: 'Logistics coordination', category: 'marketplace' },
  ];

  const fashionChips: ChipOption[] = [
    { value: 'event_planning', label: 'Event planning workflows', category: 'fashion' },
    { value: 'profiles', label: 'Designer / model profiles', category: 'fashion' },
    { value: 'shot_lists', label: 'Shot list automation', category: 'fashion' },
    { value: 'coordination', label: 'Sponsor & venue coordination', category: 'fashion' },
    { value: 'booking_services', label: 'Booking services (photo, video, venues)', category: 'fashion' },
    { value: 'content_calendar', label: 'Content calendar & publishing', category: 'fashion' },
    { value: 'ai_briefs', label: 'AI-generated briefs', category: 'fashion' },
  ];

  // Detect business model and return appropriate chips
  if (businessModel?.toLowerCase().includes('marketplace')) {
    return marketplaceChips;
  } else if (businessModel?.toLowerCase().includes('fashion') || businessModel?.toLowerCase().includes('event')) {
    return fashionChips;
  }
  
  // Default to SaaS chips
  return saasChips;
};

// Smart Interview Questions (Production-Ready)
const INTERVIEW_QUESTIONS: Question[] = [
  // Question 1: Customer Status
  {
    id: 'has_customers',
    text: 'Do you currently have paying customers?',
    subtext: 'This helps investors evaluate momentum and risk.',
    disclaimer: 'Answer honestly — accuracy improves your score more than optimism.',
    type: 'choice',
    icon: <Users className="w-5 h-5" />,
    options: [
      { value: 'no', label: 'Not yet' },
      { value: 'early', label: 'Early users, no revenue' },
      { value: 'yes', label: 'Yes, paying customers', followUpQuestionId: 'mrr' },
    ],
    insight: 'Investors look for early proof of demand. Even small revenue signals reduce perceived risk and increase credibility.',
    signals: ['traction_status', 'revenue_stage'],
  },
  
  // Question 2: MRR (Conditional on having customers)
  {
    id: 'mrr',
    text: 'What is your current monthly recurring revenue (MRR)?',
    subtext: 'Approximate amount is fine.',
    disclaimer: 'Answer honestly — accuracy improves your score more than optimism.',
    type: 'number',
    icon: <DollarSign className="w-5 h-5" />,
    placeholder: '$5,000',
    insight: 'Revenue scale helps investors understand market validation and determines which funding stages you qualify for.',
    signals: ['revenue_scale', 'funding_readiness'],
    conditionalDisplay: (answers) => {
      const customerAnswer = answers.find(a => a.questionId === 'has_customers');
      return customerAnswer?.answer === 'yes';
    },
  },
  
  // Question 3: Core Feature Validation (Multi-Chip Selection)
  {
    id: 'core_features',
    text: 'Which parts of your product deliver the most value to users today?',
    subtext: 'Select all that apply.',
    type: 'multi-chip',
    icon: <Package className="w-5 h-5" />,
    chips: getFeatureChips(), // Dynamic based on business model
    insight: 'This helps investors understand your value mechanism, product category, and defensibility. Features that save time, money, or reduce risk create the strongest investor signals.',
    signals: ['primary_value_mechanism', 'product_category', 'defensibility_signal', 'automation_depth'],
  },
  
  // Question 4: Value Impact (Conditional Follow-up)
  {
    id: 'value_impact',
    text: 'Which of these directly saves users time, money, or risk?',
    subtext: 'Focus on measurable impact.',
    type: 'multi-chip',
    icon: <Zap className="w-5 h-5" />,
    chips: [], // Will be populated from previous answer
    insight: 'Quantifiable value propositions are crucial for investor confidence. Time, money, and risk reduction are the three pillars of defensible business value.',
    signals: ['quantifiable_value', 'user_benefit_clarity'],
    conditionalDisplay: (answers) => {
      const featuresAnswer = answers.find(a => a.questionId === 'core_features');
      return Array.isArray(featuresAnswer?.answer) && featuresAnswer.answer.length > 0;
    },
  },
  
  // Question 5: Growth & Demand (Rewritten)
  {
    id: 'user_acquisition',
    text: 'How are new users finding you right now?',
    subtext: 'Select the primary channel.',
    type: 'choice',
    icon: <TrendingUp className="w-5 h-5" />,
    options: [
      { value: 'founder_led', label: 'Founder-led outreach (manual sales)' },
      { value: 'referrals', label: 'Referrals / word of mouth' },
      { value: 'organic', label: 'Organic inbound (SEO, content, social)' },
      { value: 'partnerships', label: 'Partnerships' },
      { value: 'paid', label: 'Paid acquisition' },
      { value: 'not_yet', label: 'Not actively acquiring users yet' },
    ],
    insight: 'Your growth engine signals distribution risk and scalability potential. Organic and referral-driven growth are stronger signals of product-market fit than paid acquisition at early stages.',
    signals: ['growth_engine', 'distribution_risk', 'scalability_signal'],
  },
  
  // Question 6: Retention Signal (Conditional on active acquisition)
  {
    id: 'retention',
    text: 'Are users coming back without reminders or incentives?',
    subtext: 'Retention is a leading indicator of product-market fit.',
    type: 'choice',
    icon: <Repeat className="w-5 h-5" />,
    options: [
      { value: 'not_sure', label: 'Not sure yet' },
      { value: 'some_repeat', label: 'Some repeat usage' },
      { value: 'weekly_active', label: 'Weekly active users' },
      { value: 'strong_retention', label: 'Strong retention / habitual use' },
    ],
    insight: 'Investors care more about repeat usage than raw growth at early stages. Retention is a leading indicator of product-market fit and long-term viability.',
    signals: ['retention_signal', 'pmf_confidence', 'habitual_usage'],
    conditionalDisplay: (answers) => {
      const acquisitionAnswer = answers.find(a => a.questionId === 'user_acquisition');
      return acquisitionAnswer?.answer !== 'not_yet';
    },
  },
  
  // Question 7: AI/Automation Depth (Optional, shown only if AI detected)
  {
    id: 'ai_dependency',
    text: 'How essential is AI to your product?',
    subtext: 'This helps assess defensibility and moat strength.',
    type: 'choice',
    icon: <Sparkles className="w-5 h-5" />,
    options: [
      { value: 'nice_to_have', label: 'Nice-to-have enhancement' },
      { value: 'improves', label: 'Improves speed or quality' },
      { value: 'core', label: 'Core to the workflow' },
      { value: 'essential', label: "Product doesn't work without it" },
    ],
    insight: 'AI as a core dependency can be a significant moat if it creates proprietary data loops or unique insights. Surface-level AI features are less defensible.',
    signals: ['ai_core_dependency', 'defensibility_multiplier', 'moat_signal'],
    conditionalDisplay: (answers) => {
      // Show only if "AI-assisted" or similar AI features were selected
      const featuresAnswer = answers.find(a => a.questionId === 'core_features');
      if (Array.isArray(featuresAnswer?.answer)) {
        return featuresAnswer.answer.some((f: string) => 
          f.includes('ai_') || f.includes('automation')
        );
      }
      return false;
    },
  },
];

export const StepSmartInterview: React.FC = () => {
  const { data, updateData } = useStartupProfile();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState<string>('');
  const [extractedSignals, setExtractedSignals] = useState<string[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Get currently visible questions
  const visibleQuestions = INTERVIEW_QUESTIONS.filter(q => 
    !q.conditionalDisplay || q.conditionalDisplay(answers)
  );
  
  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const totalQuestions = visibleQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Dynamic chip population for follow-up questions
  React.useEffect(() => {
    if (currentQuestion?.id === 'value_impact') {
      const featuresAnswer = answers.find(a => a.questionId === 'core_features');
      if (Array.isArray(featuresAnswer?.answer)) {
        // Get the original chips to map labels
        const originalChips = getFeatureChips(data.businessModel);
        const selectedFeatures = featuresAnswer.answer as string[];
        const dynamicChips = originalChips.filter(chip => 
          selectedFeatures.includes(chip.value)
        );
        currentQuestion.chips = dynamicChips;
      }
    }
  }, [currentQuestion, answers, data.businessModel]);

  // Save interview data to profile context
  React.useEffect(() => {
    if (answers.length > 0) {
      updateData({
        interviewAnswers: answers,
        interviewSignals: extractedSignals,
        interviewConfidence: confidence,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, extractedSignals, confidence]);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleChipToggle = (value: string) => {
    setSelectedChips(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestion.type === 'multi-chip' && selectedChips.length === 0) return;
    if (currentQuestion.type === 'choice' && !selectedAnswer) return;
    if ((currentQuestion.type === 'number' || currentQuestion.type === 'text') && !textAnswer) return;

    const answer: AnswerData = {
      questionId: currentQuestion.id,
      answer: currentQuestion.type === 'multi-chip' ? selectedChips : (selectedAnswer || textAnswer),
      timestamp: new Date(),
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Extract signals with animation
    setTimeout(() => {
      const newSignals = [...extractedSignals, ...currentQuestion.signals];
      setExtractedSignals(newSignals);
      
      // Update confidence based on answers provided
      const newConfidence = Math.min(100, ((currentQuestionIndex + 1) / totalQuestions) * 100);
      setConfidence(newConfidence);
    }, 300);

    // Move to next question
    setTimeout(() => {
      // Recalculate visible questions with new answers
      const updatedVisibleQuestions = INTERVIEW_QUESTIONS.filter(q => 
        !q.conditionalDisplay || q.conditionalDisplay(newAnswers)
      );
      
      if (currentQuestionIndex + 1 < updatedVisibleQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setSelectedChips([]);
        setTextAnswer('');
      } else {
        setIsCompleted(true);
      }
    }, 600);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // Restore previous answer
      const prevAnswer = answers[answers.length - 1];
      if (prevAnswer) {
        if (Array.isArray(prevAnswer.answer)) {
          setSelectedChips(prevAnswer.answer as string[]);
        } else {
          setSelectedAnswer(prevAnswer.answer as string);
          setTextAnswer(prevAnswer.answer as string);
        }
      }
      
      // Remove last answer from state
      setAnswers(answers.slice(0, -1));
      
      // Recalculate signals
      const prevSignals = answers.slice(0, -1).flatMap(a => {
        const q = INTERVIEW_QUESTIONS.find(iq => iq.id === a.questionId);
        return q?.signals || [];
      });
      setExtractedSignals(prevSignals);
      
      // Recalculate confidence
      const newConfidence = Math.max(0, ((currentQuestionIndex - 1) / totalQuestions) * 100);
      setConfidence(newConfidence);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Three-Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL - Progress (20%) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <div className="space-y-4">
              <div className="text-xs text-stone-500 uppercase tracking-wide font-bold">
                Adaptive Interview
              </div>
              
              {/* Vertical Stepper */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5f4e]" />
                  <span className="text-stone-400">Profile</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#0d5f4e]" />
                  <span className="text-stone-400">Analysis</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <div className="w-4 h-4 rounded-full bg-[#0d5f4e] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <span className="text-[#0d5f4e]">Smart Interview</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full border-2 border-stone-300"></div>
                  <span className="text-stone-400">Review & Generate</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="pt-4 border-t border-stone-200">
                <div className="text-xs text-stone-500 font-medium">
                  {isCompleted ? 'Interview Complete' : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
                </div>
                <Progress value={isCompleted ? 100 : ((currentQuestionIndex + 1) / totalQuestions) * 100} className="mt-2 h-1.5" />
              </div>
            </div>
          </div>
        </div>

        {/* CENTER PANEL - Interview Interaction (55%) */}
        <div className="lg:col-span-7">
          {isCompleted ? (
            // Completion State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-8 md:p-12 border border-stone-200 text-center"
            >
              <div className="max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 bg-[#0d5f4e]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#0d5f4e]" />
                </div>
                <div>
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-3">
                    Interview Complete
                  </h2>
                  <p className="text-stone-600 leading-relaxed">
                    We've gathered valuable insights about your startup. Your responses will help us generate a more accurate investor profile.
                  </p>
                </div>
                <div className="pt-6 border-t border-stone-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[#0d5f4e]">{answers.length}</div>
                      <div className="text-xs text-stone-500 mt-1">Questions Answered</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#0d5f4e]">{extractedSignals.length}</div>
                      <div className="text-xs text-stone-500 mt-1">Signals Extracted</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#0d5f4e]">{Math.round(confidence)}%</div>
                      <div className="text-xs text-stone-500 mt-1">Confidence</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-stone-500 italic">
                  Click "Next" to continue to the business details section.
                </p>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl p-8 md:p-12 border border-stone-200"
              >
                {/* Section Header */}
                <div className="mb-8">
                  <h2 className="text-3xl font-serif text-[#1a1a1a] mb-2">
                    Let's understand your traction
                  </h2>
                  <p className="text-stone-500 text-sm">
                    {currentQuestion.subtext}
                  </p>
                </div>

                {/* Question Block */}
                <div className="space-y-6">
                  {/* Question with Icon */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0d5f4e]/10 flex items-center justify-center text-[#0d5f4e]">
                      {currentQuestion.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a] mb-2">
                        {currentQuestion.text}
                      </h3>
                      {currentQuestion.disclaimer && (
                        <p className="text-xs text-stone-500 italic mt-2">
                          {currentQuestion.disclaimer}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Answer Input */}
                  <div className="space-y-3 mt-6">
                    {/* Single Choice Options */}
                    {currentQuestion.type === 'choice' && currentQuestion.options?.map((option) => (
                      <motion.button
                        key={option.value}
                        onClick={() => handleAnswerSelect(option.value)}
                        className={`
                          w-full p-4 rounded-xl border-2 text-left transition-all
                          ${selectedAnswer === option.value
                            ? 'border-[#0d5f4e] bg-[#0d5f4e]/5'
                            : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                          }
                        `}
                        whileHover={{ scale: 1.005 }}
                        whileTap={{ scale: 0.995 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[#1a1a1a] font-medium">
                            {option.label}
                          </span>
                          {selectedAnswer === option.value && (
                            <CheckCircle2 className="w-5 h-5 text-[#0d5f4e]" />
                          )}
                        </div>
                      </motion.button>
                    ))}

                    {/* Multi-Chip Selection */}
                    {currentQuestion.type === 'multi-chip' && currentQuestion.chips && (
                      <div className="flex flex-wrap gap-2">
                        {currentQuestion.chips.map((chip) => (
                          <motion.button
                            key={chip.value}
                            onClick={() => handleChipToggle(chip.value)}
                            className={`
                              px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                              ${selectedChips.includes(chip.value)
                                ? 'border-[#0d5f4e] bg-[#0d5f4e] text-white'
                                : 'border-stone-300 bg-white text-stone-700 hover:border-stone-400'
                              }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {chip.label}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    {/* Number Input */}
                    {currentQuestion.type === 'number' && (
                      <div className="space-y-2">
                        <Input
                          type="text"
                          placeholder={currentQuestion.placeholder}
                          value={textAnswer}
                          onChange={(e) => setTextAnswer(e.target.value)}
                          className="text-lg p-4 h-auto border-2 border-stone-200 focus:border-[#0d5f4e] rounded-xl"
                        />
                      </div>
                    )}

                    {/* Text Input */}
                    {currentQuestion.type === 'text' && (
                      <Input
                        type="text"
                        placeholder={currentQuestion.placeholder}
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        className="text-lg p-4 h-auto border-2 border-stone-200 focus:border-[#0d5f4e] rounded-xl"
                      />
                    )}
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between pt-8 border-t border-stone-200">
                    <Button
                      variant="ghost"
                      onClick={handleBack}
                      disabled={currentQuestionIndex === 0}
                      className="text-stone-600 hover:text-[#1a1a1a]"
                    >
                      ← Back
                    </Button>
                    <Button
                      onClick={handleNextQuestion}
                      disabled={
                        (currentQuestion.type === 'choice' && !selectedAnswer) ||
                        (currentQuestion.type === 'multi-chip' && selectedChips.length === 0) ||
                        ((currentQuestion.type === 'number' || currentQuestion.type === 'text') && !textAnswer)
                      }
                      className="bg-[#0d5f4e] hover:bg-[#094438] text-white px-8"
                    >
                      {isLastQuestion ? 'Complete Interview' : 'Next Question →'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* RIGHT PANEL - AI Insights (25%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Why This Matters */}
          {!isCompleted && (
            <div className="bg-gradient-to-br from-[#0d5f4e]/5 to-[#6b9d89]/5 rounded-xl p-6 border border-[#0d5f4e]/10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#0d5f4e]" />
                <h4 className="font-bold text-[#1a1a1a] text-sm">Why this matters</h4>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed">
                {currentQuestion.insight}
              </p>
            </div>
          )}

          {/* Signal Extraction */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h4 className="font-bold text-[#1a1a1a] mb-3 text-sm">
              Extracted Signals
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {extractedSignals.map((signal, index) => (
                  <motion.div
                    key={`${signal}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-block"
                  >
                    <span className="inline-block px-3 py-1 bg-[#0d5f4e]/10 text-[#0d5f4e] rounded-full text-xs font-medium mr-2 mb-2">
                      {signal.replace(/_/g, ' ')}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {extractedSignals.length === 0 && (
                <p className="text-xs text-stone-400 italic">
                  Signals will appear as you answer
                </p>
              )}
            </div>
          </div>

          {/* Confidence Meter */}
          <div className="bg-white rounded-xl p-6 border border-stone-200">
            <h4 className="font-bold text-[#1a1a1a] mb-3 text-sm">
              Signal Confidence
            </h4>
            <div className="space-y-2">
              <Progress value={confidence} className="h-2" />
              <div className="flex justify-between text-xs text-stone-500">
                <span>{isCompleted ? 'Profile built!' : 'Building profile...'}</span>
                <span className="font-bold text-[#0d5f4e]">{Math.round(confidence)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
