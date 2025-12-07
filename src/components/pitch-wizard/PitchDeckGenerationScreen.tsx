import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import { LoadingAnimation } from './LoadingAnimation';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { cn } from '../../components/ui/utils';
import { supabase } from '../../../utils/supabase/client';

interface PitchDeckGenerationScreenProps {
  deckId: string;
  onComplete: () => void;
}

const STAGES = ["Analyzing", "Drafting slides", "Finalizing design"];
const TIPS = [
  "Investors spend an average of 3 minutes and 44 seconds reading a pitch deck.",
  "We're using your brand colors to generate a cohesive visual identity.",
  "The 'Why Now' slide is often the most critical slide for urgency.",
  "Keep your text concise. Investors skim before they read.",
  "Traction speaks louder than words. We're highlighting your metrics."
];

const STATUS_MESSAGES = [
  "Analyzing your startup details...",      // Stage 0
  "Extracting key value propositions...",   // Stage 0
  "Applying your chosen visual theme...",   // Stage 1
  "Generating slide layouts...",            // Stage 1
  "Writing narrative and story flow...",    // Stage 1
  "Building market size & traction slides...", // Stage 2
  "Finalizing deck exports...",             // Stage 2
  "Polishing details..."                    // Stage 2
];

export const PitchDeckGenerationScreen: React.FC<PitchDeckGenerationScreenProps> = ({ deckId, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Derived state
  const currentStage = progress < 35 ? 0 : progress < 80 ? 1 : 2;

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Poll for status
  useEffect(() => {
    if (!deckId) return;

    const pollInterval = setInterval(async () => {
       try {
         const { data, error } = await supabase
           .from('decks')
           .select('status')
           .eq('id', deckId)
           .single();

         if (error) throw error;

         if (data.status === 'complete') {
            setProgress(100);
            clearInterval(pollInterval);
         } else if (data.status === 'error') {
            setHasError(true);
            setErrorMessage("An error occurred during generation.");
            clearInterval(pollInterval);
         } else {
             // Fake progress while waiting, capped at 90%
             setProgress(prev => Math.min(90, prev + 1));
         }
       } catch (err) {
          console.error("Polling error:", err);
          // Don't error out completely on one poll fail, but maybe track consecutive failures
       }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [deckId]);

  // Status message rotation based on progress/stage
  useEffect(() => {
    // Map progress range to status message subsets
    let targetStatusIndex = 0;
    if (progress < 15) targetStatusIndex = 0;
    else if (progress < 30) targetStatusIndex = 1;
    else if (progress < 45) targetStatusIndex = 2;
    else if (progress < 60) targetStatusIndex = 3;
    else if (progress < 75) targetStatusIndex = 4;
    else if (progress < 90) targetStatusIndex = 5;
    else targetStatusIndex = 6;

    if (targetStatusIndex !== currentStatusIndex) {
      setCurrentStatusIndex(targetStatusIndex);
    }
  }, [progress]);

  // Tip rotation (every 4s)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Completion handler
  useEffect(() => {
    if (progress >= 100) {
      // Small delay before navigating to show 100% state
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (hasError) {
    return (
      <div className="fixed inset-0 z-50 bg-[#FAF9F7] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Generation Failed</h2>
          <p className="text-slate-500">{errorMessage || "Something went wrong while creating your deck. Please try again."}</p>
          <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF9F7] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Main Content Container */}
      <motion.div 
        className="w-full max-w-[600px] flex flex-col items-center space-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        
        {/* Header Icon & Title */}
        <div className="flex flex-col items-center space-y-6 text-center">
          <motion.div 
            className="w-20 h-20 bg-gradient-to-tr from-indigo-50 to-orange-50 rounded-2xl flex items-center justify-center shadow-sm border border-white"
            animate={{ 
              boxShadow: ["0 4px 6px -1px rgba(0, 0, 0, 0.1)", "0 10px 15px -3px rgba(99, 102, 241, 0.2)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"] 
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Sparkles className="w-10 h-10 text-[#FF855D]" />
            </motion.div>
          </motion.div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Generating Your Pitch Deck</h1>
            <p className="text-slate-500 text-lg">Sit tight! We're crafting a professional deck for you.</p>
          </div>
        </div>

        {/* Loading & Status Section */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-8 relative overflow-hidden">
          {/* Subtle gradient accent at top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-500 opacity-20" />
          
          <LoadingAnimation 
            currentStage={currentStage} 
            progress={progress} 
            stages={STAGES} 
          />

          <div className="flex flex-col items-center space-y-2 py-2 h-16 justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStatusIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-base font-medium text-slate-700 text-center"
              >
                {STATUS_MESSAGES[currentStatusIndex]}
              </motion.p>
            </AnimatePresence>
            <div className="text-xs font-mono text-slate-400">
               {formatTime(elapsedTime)}
            </div>
          </div>
        </div>

        {/* Tips Carousel */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
             <motion.div
                key={currentTipIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 flex items-start gap-3"
             >
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 flex-shrink-0">
                   <Lightbulb className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                   <p className="text-xs font-bold text-indigo-900 uppercase tracking-wide">Pro Tip</p>
                   <p className="text-sm text-indigo-800 leading-relaxed">
                      {TIPS[currentTipIndex]}
                   </p>
                </div>
             </motion.div>
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
};
