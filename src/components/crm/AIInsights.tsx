import React from 'react';
import { aiInsights } from './data';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Clock,
  BarChart3
} from 'lucide-react';
import { cn } from "../ui/utils";

interface InsightCardProps {
  insight: typeof aiInsights[0];
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const isRisk = insight.type === 'risk';
  const isPositive = insight.type === 'positive';
  
  // Gradient based on type
  const gradientClass = isRisk 
    ? "from-red-500 to-orange-500" 
    : isPositive 
      ? "from-green-500 to-emerald-500" 
      : "from-blue-500 to-indigo-500";

  const Icon = isRisk ? AlertTriangle : isPositive ? TrendingUp : Zap;

  return (
    <div className="relative group flex flex-col w-full">
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100 h-full flex flex-col transition-transform hover:scale-[1.01]">
        
        {/* Header Gradient Tab */}
        <div className={cn(
          "h-2 bg-gradient-to-r",
          gradientClass
        )} />

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className={cn(
              "p-3 rounded-xl bg-slate-50 border border-slate-100",
              isRisk ? "text-red-500 bg-red-50/50" : isPositive ? "text-green-500 bg-green-50/50" : "text-blue-500 bg-blue-50/50"
            )}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex gap-2">
               {insight.tags.map((tag, i) => (
                 <span key={i} className={cn("px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", tag.color)}>
                   {tag.label}
                 </span>
               ))}
            </div>
          </div>

          <h3 className="font-bold text-lg text-slate-800 mb-2">{insight.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
            {insight.description}
          </p>

          {/* AI Suggestions Section */}
          <div className="mt-auto bg-slate-50 rounded-lg p-4 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Sparkles className="w-12 h-12" />
            </div>
            
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-400 uppercase">
              <Sparkles className="w-3 h-3 text-purple-500" />
              AI Recommendation
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                 {insight.action}
              </div>
              <Button size="sm" className={cn(
                "h-8 text-xs gap-1 shadow-sm",
                isRisk 
                  ? "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              )}>
                Apply <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="mt-2 flex gap-3 text-[10px] text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Due: 2 days</span>
              <span className="font-medium text-blue-500 cursor-pointer hover:underline">View Details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AIInsights: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto bg-slate-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              AI Deal Intelligence
            </h2>
            <p className="text-slate-500 mt-1">Real-time analysis of your pipeline health and engagement.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            View Analytics Report
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <InsightCard insight={insight} />
            </motion.div>
          ))}
          
          {/* Placeholder for empty state or more */}
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 min-h-[300px] hover:bg-slate-50/50 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="font-medium mb-1">Waiting for more data...</h3>
              <p className="text-sm text-center max-w-[200px]">
                AI needs more interactions to generate accurate insights.
              </p>
            </motion.div>
        </div>

      </div>
    </div>
  );
};
