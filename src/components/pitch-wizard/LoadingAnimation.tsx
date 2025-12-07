import React from 'react';
import { motion } from "motion/react";
import { cn } from "../../components/ui/utils";
import { Check, Circle } from 'lucide-react';

interface LoadingAnimationProps {
  currentStage: number; // 0, 1, 2
  progress: number; // 0 to 100
  stages: string[]; // ["Analyzing", "Drafting", "Finalizing"]
  className?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ 
  currentStage, 
  progress, 
  stages,
  className 
}) => {
  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Progress Bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-[#FF855D] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* Shimmer effect */}
        <motion.div 
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>

      {/* Stages visual */}
      <div className="flex justify-between items-center relative">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10" />
        
        {stages.map((stage, index) => {
          const isActive = index === currentStage;
          const isCompleted = index < currentStage;
          const isPending = index > currentStage;

          return (
            <div key={index} className="flex flex-col items-center gap-2 bg-[#FAF9F7] px-2">
              <motion.div 
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                  isActive ? "border-[#FF855D] bg-white" : 
                  isCompleted ? "border-[#FF855D] bg-[#FF855D]" : "border-slate-200 bg-white"
                )}
                initial={false}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : isActive ? (
                  <motion.div 
                    className="w-2 h-2 bg-[#FF855D] rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                ) : (
                  <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                )}
              </motion.div>
              <span className={cn(
                "text-xs font-medium transition-colors duration-300",
                isActive ? "text-[#FF855D]" : 
                isCompleted ? "text-slate-800" : "text-slate-400"
              )}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
