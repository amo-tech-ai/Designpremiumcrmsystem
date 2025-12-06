import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface WorkflowStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
  colorStart: string;
  colorEnd: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export const WorkflowStepCard = ({
  stepNumber,
  title,
  description,
  icon: Icon,
  colorStart,
  colorEnd,
  isActive,
  onClick,
  className,
}: WorkflowStepCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center w-64 min-w-[250px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-300",
        "bg-white shadow-sm hover:shadow-xl border border-slate-100",
        isActive ? "ring-2 ring-offset-2" : "opacity-90 hover:opacity-100",
        className
      )}
      style={{
        '--step-color-start': colorStart,
        '--step-color-end': colorEnd,
        boxShadow: isActive ? `0 0 0 2px ${colorStart}` : undefined
      } as React.CSSProperties}
    >
      {/* Top Section: Icon */}
      <div className="pt-8 pb-4 flex justify-center w-full bg-gradient-to-b from-white to-slate-50/50">
        <div 
          className="p-3 rounded-xl border-2 bg-white relative z-10"
          style={{ borderColor: colorStart, color: colorStart }}
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
      </div>

      {/* Middle Section: The Curved Tab */}
      <div className="relative w-full">
        {/* The Notch - Pure CSS approach to match the reference 'peak' style */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45 bg-gradient-to-br z-0"
             style={{ 
               backgroundImage: `linear-gradient(to bottom right, ${colorStart}, ${colorEnd})`,
               borderRadius: '4px'
             }} 
        />
        
        {/* The Step Bar */}
        <div 
          className="relative z-10 py-2 w-full text-center text-white font-bold text-sm tracking-wider uppercase"
          style={{ background: `linear-gradient(to right, ${colorStart}, ${colorEnd})` }}
        >
          Step {stepNumber}
        </div>
      </div>

      {/* Bottom Section: Content */}
      <div className="flex-1 p-6 text-center flex flex-col items-center gap-2 bg-white w-full">
        <h3 className="font-bold text-lg text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>

      {/* Active Indicator Glow */}
      {isActive && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ background: `linear-gradient(to bottom, ${colorStart}, transparent)` }}
        />
      )}
    </motion.div>
  );
};
