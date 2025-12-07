import React from 'react';
import { motion } from 'motion/react';
import { 
  MoreHorizontal, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  DollarSign
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";

interface DealCardProps {
  deal: any;
  onClick: () => void;
  isSelected?: boolean;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onClick, isSelected }) => {
  const {
    name,
    company,
    amount,
    healthScore,
    probability,
    tags,
    lastActivity,
    aiRisk,
    aiNextStep,
    stage
  } = deal;

  // Determine health color
  const healthColor = healthScore > 80 ? 'bg-emerald-500' : healthScore > 50 ? 'bg-amber-500' : 'bg-red-500';
  const healthText = healthScore > 80 ? 'Healthy' : healthScore > 50 ? 'At Risk' : 'Critical';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      onClick={onClick}
      className={cn(
        "group relative bg-white rounded-xl border p-5 cursor-pointer transition-all duration-200",
        isSelected 
          ? "border-blue-500 ring-1 ring-blue-500 shadow-md" 
          : "border-slate-200 hover:border-blue-300"
      )}
    >
      {/* Top Row: Logo & Amount */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm bg-white">
            <AvatarImage src={`https://logo.clearbit.com/${company.replace(/\s+/g, '').toLowerCase()}.com`} />
            <AvatarFallback className="bg-slate-100 text-slate-600 font-bold">{company.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{company}</h3>
            <p className="text-xs text-slate-500">{name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-slate-900 flex items-center justify-end gap-0.5">
             <DollarSign className="w-3 h-3 text-slate-400" />
             {amount || 'N/A'}
          </div>
          <div className="flex items-center justify-end gap-1.5 mt-1">
             <div className={cn("w-2 h-2 rounded-full", healthColor)} />
             <span className="text-[10px] uppercase font-medium text-slate-500">{healthText}</span>
          </div>
        </div>
      </div>

      {/* AI Probability Meter */}
      <div className="mb-4">
        <div className="flex justify-between items-end mb-1.5">
          <div className="flex items-center gap-1.5">
             <BrainCircuit className="w-3.5 h-3.5 text-purple-500" />
             <span className="text-xs font-medium text-purple-700">AI Win Probability</span>
          </div>
          <span className="text-xs font-bold text-slate-700">{probability}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${probability}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={cn(
               "h-full rounded-full",
               probability > 70 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" :
               probability > 40 ? "bg-gradient-to-r from-amber-400 to-amber-500" : 
               "bg-gradient-to-r from-red-400 to-red-500"
            )}
          />
        </div>
      </div>

      {/* Suggested Next Step (Bubble) */}
      {aiNextStep && (
        <div className="mb-4 bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex gap-2.5 items-start">
           <div className="mt-0.5 bg-blue-100 p-1 rounded-md text-blue-600 flex-shrink-0">
              <ArrowRight className="w-3 h-3" />
           </div>
           <div>
              <p className="text-xs font-medium text-slate-700 line-clamp-2">{aiNextStep}</p>
           </div>
        </div>
      )}

      {/* Risk Indicator if exists */}
      {aiRisk && (
         <div className="mb-4 flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1.5 rounded-md border border-amber-100">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">{aiRisk}</span>
         </div>
      )}

      {/* Footer: Tags & Activity */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
         <div className="flex gap-1 overflow-hidden">
            {tags?.slice(0, 2).map((tag: string) => (
               <Badge key={tag} variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-slate-100 text-slate-500">
                  {tag}
               </Badge>
            ))}
            {tags?.length > 2 && (
               <span className="text-[10px] text-slate-400 self-center">+{tags.length - 2}</span>
            )}
         </div>
         <div className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" />
            {lastActivity}
         </div>
      </div>

      {/* Hover Action */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
         <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-blue-600">
            <MoreHorizontal className="w-4 h-4" />
         </Button>
      </div>
    </motion.div>
  );
};
