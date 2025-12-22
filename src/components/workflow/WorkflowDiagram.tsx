import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Sparkles, 
  Workflow, 
  Database, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '../ui/utils';

// --- Types ---

type StepStatus = 'idle' | 'active' | 'completed';

interface WorkflowStep {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

// --- Data ---

const STEPS: WorkflowStep[] = [
  {
    id: 'trigger',
    title: 'Trigger',
    subtitle: 'On startup created',
    icon: Calendar
  },
  {
    id: 'analysis',
    title: 'AI Analysis',
    subtitle: 'Gemini analyzes data',
    icon: Sparkles
  },
  {
    id: 'process',
    title: 'Process',
    subtitle: 'Extract insights',
    icon: Workflow
  },
  {
    id: 'action',
    title: 'Action',
    subtitle: 'Generate assets',
    icon: Database
  },
  {
    id: 'complete',
    title: 'Complete',
    subtitle: 'Saved successfully',
    icon: CheckCircle2
  }
];

// --- Components ---

const StepCard = ({ 
  step, 
  status, 
  index 
}: { 
  step: WorkflowStep; 
  status: StepStatus;
  index: number;
}) => {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isIdle = status === 'idle';

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        layout
        initial={false}
        animate={{
          scale: isActive ? 1.05 : 1,
          borderColor: isActive || isCompleted ? '#FF6A3D' : '#E5E7EB',
          boxShadow: isActive 
            ? '0 10px 30px -10px rgba(255, 106, 61, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
          y: isActive ? -4 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "w-[140px] h-[120px] bg-white rounded-[14px] border border-solid flex flex-col items-center justify-center text-center p-3 relative z-10 transition-colors duration-300",
          isIdle && "border-gray-200"
        )}
      >
        {/* Active Pulse Glow */}
        {isActive && (
          <motion.div
            layoutId="active-glow"
            className="absolute inset-0 rounded-[14px] bg-[#FF6A3D]/5 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Icon */}
        <div className={cn(
          "mb-3 p-2 rounded-lg transition-colors duration-300",
          isActive || isCompleted ? "bg-[#FF6A3D]/10 text-[#FF6A3D]" : "bg-gray-50 text-gray-400"
        )}>
          <step.icon className="w-6 h-6" />
        </div>

        {/* Text */}
        <h4 className={cn(
          "text-sm font-semibold mb-1 transition-colors",
          isActive || isCompleted ? "text-gray-900" : "text-gray-500"
        )}>
          {step.title}
        </h4>
        <p className="text-[10px] leading-tight text-gray-400 font-medium">
          {step.subtitle}
        </p>
        
        {/* Success Checkmark overlay for completed state */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-[#FF6A3D] text-white rounded-full p-0.5 border-2 border-white shadow-sm"
            >
              <CheckCircle2 className="w-3 h-3" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Active Dot Indicator */}
      <div className="absolute -bottom-8 h-2 w-2 flex items-center justify-center">
        {isActive && (
          <motion.div 
            layoutId="active-dot"
            className="w-1.5 h-1.5 bg-[#FF6A3D] rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </div>
    </div>
  );
};

const Connector = ({ status }: { status: StepStatus }) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';

  return (
    <div className="flex-1 h-[1px] bg-gray-200 relative mx-2 self-center -mt-6">
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-[#FF6A3D]"
        initial={{ width: "0%" }}
        animate={{ 
          width: isCompleted ? "100%" : isActive ? "50%" : "0%" 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export const WorkflowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play the workflow animation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= STEPS.length) return 0; // Loop back to start
        return prev + 1;
      });
    }, 1800); // 1.8s per step

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="w-full bg-[#FAFAFA] py-20 border-y border-gray-100 overflow-hidden font-sans">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LEFT COLUMN: Header */}
          <div className="w-full lg:w-[35%] space-y-8 text-center lg:text-left">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                 <div className="w-1 h-6 bg-[#FF6A3D] rounded-full" />
                 <span className="text-xs font-bold tracking-widest text-[#6B7280] uppercase">
                   [ 01 / 03 ] · Automation Flow
                 </span>
              </div>
              <h2 className="text-4xl font-bold text-[#111827] leading-tight tracking-tight">
                Use StartupAI with <br />
                <span className="text-[#FF6A3D]">Workflow Automation</span>
              </h2>
            </div>
            
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Connect your favorite tools and let our Gemini-powered engine handle the heavy lifting. From market research to asset generation, it's fully automated.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-[#E5E7EB] text-[#374151] font-medium shadow-sm hover:bg-gray-50 transition-colors group">
                <Zap className="w-4 h-4 mr-2 text-[#FF6A3D]" />
                Explore Triggers
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#111827] text-white font-medium shadow-lg hover:bg-[#2e3545] transition-all hover:-translate-y-0.5">
                Start Automating <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Flow Diagram */}
          <div 
            className="w-full lg:w-[65%] relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#FF6A3D]/5 via-[#FF6A3D]/5 to-[#FF6A3D]/5 blur-3xl rounded-full -z-10" />

            {/* Steps Container */}
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-white/60 p-8 shadow-xl shadow-gray-100/50">
              <div className="flex justify-between w-full">
                {STEPS.map((step, index) => {
                  let status: StepStatus = 'idle';
                  if (activeStep > index) status = 'completed';
                  if (activeStep === index) status = 'active';
                  
                  const isLast = index === STEPS.length - 1;

                  return (
                    <React.Fragment key={step.id}>
                      <StepCard 
                        step={step} 
                        status={status} 
                        index={index}
                      />
                      {!isLast && (
                        <Connector status={status} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Status Text */}
              <div className="mt-12 text-center h-6">
                <AnimatePresence mode="wait">
                  {activeStep === STEPS.length && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="inline-flex items-center gap-2 text-sm font-medium text-[#FF6A3D] bg-[#FFF7ED] px-4 py-1.5 rounded-full border border-[#FFEDD5]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Workflow completed successfully
                    </motion.div>
                  )}
                  {activeStep < STEPS.length && (
                    <motion.p
                      key="processing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-gray-400 font-mono"
                    >
                      Processing step {activeStep + 1} of {STEPS.length}...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Floating label */}
            <div className="absolute -top-4 left-8 bg-white border border-gray-200 px-3 py-1 rounded-md shadow-sm flex items-center gap-2">
               <Workflow className="w-3 h-3 text-[#6B7280]" />
               <span className="text-[10px] font-semibold text-[#374151] uppercase tracking-wide">Workflow Automation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
