import React from 'react';
import { 
  Activity, 
  Target, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Mail,
  Calendar,
  MoveRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface ScoringTabProps {
  lead: any;
}

export const ScoringTab: React.FC<ScoringTabProps> = ({ lead }) => {
  // Mock Scores
  const score = 82;
  const fitScore = 40; // out of 50
  const engagementScore = 30; // out of 30
  const intentScore = 12; // out of 20

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      
      {/* 1. Scoring Summary Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Activity className="w-32 h-32 text-blue-900" />
        </div>
        
        <div className="relative z-10 flex-shrink-0">
           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg border-4 border-blue-50">
              <div className="text-center">
                 <div className="text-3xl font-bold leading-none">{score}</div>
                 <div className="text-[10px] uppercase opacity-80 font-bold">Score</div>
              </div>
           </div>
        </div>
        
        <div className="relative z-10">
           <h3 className="text-xl font-bold text-slate-800">{lead?.name}</h3>
           <div className="text-slate-500 mb-2">{lead?.role} at {lead?.company}</div>
           <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0 px-3 py-1 text-sm">
              High Potential
           </Badge>
        </div>
      </div>

      {/* 2. Scoring Breakdown Cards */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Fit Score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                 <Target className="w-4 h-4 text-blue-500" /> Fit Score
              </div>
              <span className="font-bold text-slate-800">{fitScore}/50</span>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(fitScore/50)*100}%` }}></div>
           </div>
           <div className="text-xs text-slate-500 flex gap-2">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Industry Match</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-green-500" /> Size Match</span>
           </div>
        </div>

        {/* Engagement Score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                 <Zap className="w-4 h-4 text-amber-500" /> Engagement Score
              </div>
              <span className="font-bold text-slate-800">{engagementScore}/30</span>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(engagementScore/30)*100}%` }}></div>
           </div>
           <div className="text-xs text-slate-500 flex gap-3">
              <span>4 Email Opens</span>
              <span>12 Page Views</span>
              <span className="text-amber-600 font-bold">Demo Booked</span>
           </div>
        </div>

        {/* Intent Score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                 <TrendingUp className="w-4 h-4 text-purple-500" /> Intent Score
              </div>
              <span className="font-bold text-slate-800">{intentScore}/20</span>
           </div>
           <div className="w-full bg-slate-100 h-2 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${(intentScore/20)*100}%` }}></div>
           </div>
           <div className="text-xs text-slate-500">
              Funding raised recently ($5M) • Hiring signals detected
           </div>
        </div>

      </div>

      {/* 3. AI Insights */}
      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
         <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-slate-700">Gemini Analysis</h4>
         </div>
         <ul className="space-y-2 text-sm text-slate-600 list-disc pl-4">
            <li>Lead clicked pricing page <span className="font-bold text-slate-800">3 times</span> this week.</li>
            <li>Matches ICP: AI Ops, 50+ employees.</li>
            <li className="text-green-600 font-bold">High probability of booking meeting.</li>
         </ul>
         <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-800 font-medium mt-2">
            Recommended: Follow up within 48 hours
         </div>
      </div>

      {/* 4. Lead Actions Bar */}
      <div className="grid grid-cols-2 gap-3 pt-2">
         <Button variant="outline" className="gap-2"><CheckCircle className="w-4 h-4" /> Add Task</Button>
         <Button variant="outline" className="gap-2"><Mail className="w-4 h-4" /> Send Email</Button>
         <Button className="col-span-2 bg-purple-600 hover:bg-purple-700 gap-2">
            <MoveRight className="w-4 h-4" /> Convert to Deal
         </Button>
      </div>

    </div>
  );
};
