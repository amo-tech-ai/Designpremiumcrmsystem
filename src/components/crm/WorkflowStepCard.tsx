import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

interface WorkflowStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass: string; // Tailwind gradient class e.g., "from-purple-600 to-purple-500"
  isActive?: boolean;
  onClick?: () => void;
}

export const WorkflowStepCard: React.FC<WorkflowStepCardProps> = ({
  stepNumber,
  title,
  description,
  icon: Icon,
  colorClass,
  isActive,
  onClick,
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "relative flex flex-col w-64 transition-all duration-300 cursor-pointer group",
        isActive ? "scale-105 z-10" : "hover:scale-102 opacity-90 hover:opacity-100"
      )}
    >
      {/* Main Card Container - Split into Top and Bottom visually by the Step Bar */}
      <div className={cn(
        "bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 h-full flex flex-col",
        isActive && "ring-2 ring-offset-2 ring-blue-400 shadow-xl"
      )}>
        
        {/* Top Section: Icon */}
        <div className="p-6 flex justify-center items-center bg-gradient-to-b from-white to-slate-50">
          <div className={cn(
            "w-16 h-16 rounded-2xl border-[1.5px] flex items-center justify-center transition-colors duration-300",
            isActive ? "border-current text-current" : "border-slate-300 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-500"
          )}
          style={{ color: isActive ? undefined : undefined }} // We'll handle active color via class or inherit
          >
            <Icon className={cn("w-8 h-8", isActive ? "text-inherit" : "text-inherit")} />
          </div>
        </div>

        {/* Middle Section: The Curved Step Tab with Notch */}
        <div className="relative">
          <div className={cn(
            "h-12 flex items-center justify-center text-white font-bold tracking-wide text-sm uppercase bg-gradient-to-r relative z-10",
            colorClass
          )}>
            Step {stepNumber}
          </div>
          
          {/* The Notch/Pointer */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
             <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 0H24L12 12L0 0Z" className={cn("fill-current", colorClass.split(' ')[2] || 'text-purple-600')} style={{ fill: 'url(#gradient-fill)' }} />
               {/* We might need a simpler approach for the notch color to match gradient. 
                   Using a solid color that matches the gradient's end or middle is safer. 
                   Let's just use a colored triangle for now matching the 'to' color approx.
               */}
               <path d="M0 0C4 0 8 4 12 12C16 4 20 0 24 0H0Z" fill="currentColor" className={colorClass.includes('purple') ? 'text-purple-600' : colorClass.includes('blue') ? 'text-blue-500' : 'text-teal-500'} />
             </svg>
          </div>
        </div>

        {/* Bottom Section: Title & Description */}
        <div className="p-6 pt-8 flex-grow bg-white text-center">
          <h3 className="font-bold text-lg text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        
        {/* Bottom fading subtle gradient */}
        <div className="h-2 bg-gradient-to-b from-white to-slate-50" />
      </div>
    </div>
  );
};
