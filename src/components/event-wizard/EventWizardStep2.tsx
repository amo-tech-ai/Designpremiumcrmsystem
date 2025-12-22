import React from 'react';
import { 
  Sparkles, 
  Globe, 
  Search, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Zap,
  Edit2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { cn } from '../ui/utils';
import { EventWizardData } from './types';
import { format } from 'date-fns';

interface EventWizardStep2Props {
  data: EventWizardData;
  updateData: (updates: Partial<EventWizardData>) => void;
}

export const EventWizardStep2: React.FC<EventWizardStep2Props> = ({ data, updateData }) => {
  const { analysis } = data;

  if (!analysis) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32">
       {/* 1. Event Overview Card */}
       <Card className="border-[#E5E5E5] shadow-sm rounded-2xl overflow-hidden bg-white">
          <CardContent className="p-8">
             <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                <div className="space-y-4 flex-1">
                   <div className="space-y-1">
                      <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">
                        {data.eventName || "Untitled Event"}
                      </h2>
                      <div className="flex items-center gap-4 text-[#6B7280] text-sm">
                         <span className="flex items-center gap-1.5 capitalize">
                           <Zap className="w-4 h-4" /> {data.eventType?.replace('_', ' ') || "Event"}
                         </span>
                         <span>•</span>
                         <span className="flex items-center gap-1.5">
                           <Calendar className="w-4 h-4" /> 
                           {data.eventDate ? format(data.eventDate, "MMM d, yyyy") : "Date TBD"}
                         </span>
                         <span>•</span>
                         <span className="flex items-center gap-1.5">
                           <MapPin className="w-4 h-4" /> 
                           {data.cityOrVenue || "Location TBD"}
                         </span>
                      </div>
                   </div>
                   
                   <p className="text-[#1A1A1A] text-lg leading-relaxed max-w-3xl">
                      {analysis.summary}
                   </p>

                   <div className="flex gap-2 flex-wrap pt-2">
                      <Badge variant="secondary" className="bg-[#F3E8FF] text-[#6B21A8] hover:bg-[#F3E8FF]">
                         {data.audiencePersona || "General Audience"}
                      </Badge>
                      <Badge variant="outline" className="border-[#E5E5E5] text-[#6B7280]">
                         {data.expectedAttendees || 0} Attendees
                      </Badge>
                      <Badge variant="outline" className="border-[#E5E5E5] text-[#6B7280]">
                         {data.budgetCurrency} {data.budgetAmount || 0} Budget
                      </Badge>
                      <Badge className={cn(
                        "text-white",
                        analysis.complexity === 'High' ? "bg-orange-500" :
                        analysis.complexity === 'Medium' ? "bg-blue-500" : "bg-green-500"
                      )}>
                        {analysis.complexity} Complexity
                      </Badge>
                   </div>
                </div>
             </div>
          </CardContent>
       </Card>

       {/* 2. AI Inputs & Signals */}
       <section>
          <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI Inputs & Signals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {/* Card 1: User Inputs */}
             <Card className="bg-white border-[#E5E5E5] shadow-sm">
                <CardHeader className="pb-3">
                   <CardTitle className="text-base font-medium text-[#1A1A1A]">User Inputs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-[#4B5563]">
                   <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Goal</span>
                      <span className="font-medium text-right capitalize">{data.primaryGoal?.replace('_', ' ') || "N/A"}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Duration</span>
                      <span className="font-medium text-right">{data.durationHours || 0} Hours</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Search</span>
                      <span className="font-medium text-right truncate max-w-[150px]">{data.searchTerms || "None"}</span>
                   </div>
                </CardContent>
             </Card>

             {/* Card 2: URL Context */}
             <Card className="bg-white border-[#E5E5E5] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <Globe className="w-24 h-24" />
                </div>
                <CardHeader className="pb-3">
                   <CardTitle className="text-base font-medium text-[#1A1A1A] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-[#6B21A8]" /> URL Context
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm relative z-10">
                   {data.venueUrl ? (
                     <>
                        <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
                           <span className="text-[#9CA3AF]">Est. Capacity</span>
                           <span className="font-medium text-[#1A1A1A]">{analysis.urlSignals.capacity}</span>
                        </div>
                        <div className="flex justify-between border-b border-dashed border-gray-100 pb-2">
                           <span className="text-[#9CA3AF]">Venue Type</span>
                           <span className="font-medium text-[#1A1A1A]">{analysis.urlSignals.venueType}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-[#9CA3AF]">Vibe</span>
                           <span className="font-medium text-[#1A1A1A]">{analysis.urlSignals.vibe}</span>
                        </div>
                     </>
                   ) : (
                     <div className="text-center py-4 text-[#9CA3AF] italic">
                        No venue URL provided
                     </div>
                   )}
                </CardContent>
                <div className="bg-[#F7F7F5] px-4 py-2 text-[10px] uppercase font-bold text-[#6B7280] tracking-wider text-center border-t border-[#E5E5E5]">
                   Extracted using Gemini URL Context
                </div>
             </Card>

             {/* Card 3: Search Grounding */}
             <Card className="bg-white border-[#E5E5E5] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-5">
                   <Search className="w-24 h-24" />
                </div>
                <CardHeader className="pb-3">
                   <CardTitle className="text-base font-medium text-[#1A1A1A] flex items-center gap-2">
                      <Search className="w-4 h-4 text-[#6B21A8]" /> Search Grounding
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm relative z-10">
                   <div className="flex flex-col gap-1 border-b border-dashed border-gray-100 pb-2">
                      <span className="text-[#9CA3AF] text-xs">Benchmarks</span>
                      <span className="font-medium text-[#1A1A1A] leading-tight">{analysis.searchGrounding.benchmarks}</span>
                   </div>
                   <div className="flex flex-col gap-1 border-b border-dashed border-gray-100 pb-2">
                      <span className="text-[#9CA3AF] text-xs">Conflicts</span>
                      <span className="font-medium text-[#1A1A1A] leading-tight">{analysis.searchGrounding.conflicts}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-[#9CA3AF] text-xs">Cost Validation</span>
                      <span className="font-medium text-[#1A1A1A] leading-tight">{analysis.searchGrounding.costValidation}</span>
                   </div>
                </CardContent>
                <div className="bg-[#F7F7F5] px-4 py-2 text-[10px] uppercase font-bold text-[#6B7280] tracking-wider text-center border-t border-[#E5E5E5]">
                   Validated with Google Search
                </div>
             </Card>
          </div>
       </section>

       {/* 3. AI Insights & Analysis */}
       <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Intelligence (2 cols width) */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Event Intelligence
                </h3>
             </div>

             {/* Feasibility Score */}
             <Card className="bg-gradient-to-br from-white to-[#F7F7F5] border-[#E5E5E5]">
                <CardContent className="p-6 flex items-center gap-6">
                   <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                      {/* Ring */}
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                         <path
                            className="text-gray-200"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                         />
                         <path
                            className={cn(
                               "transition-all duration-1000",
                               analysis.feasibility.score >= 80 ? "text-green-500" :
                               analysis.feasibility.score >= 50 ? "text-yellow-500" : "text-red-500"
                            )}
                            strokeDasharray={`${analysis.feasibility.score}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                         />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                         <span className="text-3xl font-bold text-[#1A1A1A]">{analysis.feasibility.score}</span>
                         <span className="text-[10px] text-[#6B7280] font-medium uppercase">Score</span>
                      </div>
                   </div>
                   <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#1A1A1A] mb-2">Feasibility Score</h4>
                      <p className="text-[#4B5563] text-sm leading-relaxed">
                         {analysis.feasibility.explanation}
                      </p>
                   </div>
                </CardContent>
             </Card>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Constraints */}
                <Card className="border-[#E5E5E5] bg-white">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold text-[#6B7280] uppercase">Inferred Constraints</CardTitle>
                   </CardHeader>
                   <CardContent>
                      <ul className="space-y-2">
                         {analysis.constraints.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#1A1A1A]">
                               <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6B21A8] shrink-0" />
                               {c}
                            </li>
                         ))}
                      </ul>
                   </CardContent>
                </Card>

                {/* Risks */}
                <Card className="border-[#E5E5E5] bg-white">
                   <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold text-[#6B7280] uppercase">Detected Risks</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-3">
                      {analysis.risks.map((risk, i) => (
                         <div key={i} className="bg-[#FFF1F2] border border-[#FECDD3] rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                               <AlertTriangle className="w-4 h-4 text-[#BE123C]" />
                               <span className="text-xs font-bold text-[#BE123C] uppercase tracking-wide">{risk.severity} Risk</span>
                            </div>
                            <p className="text-sm font-medium text-[#881337] mb-1">{risk.risk}</p>
                            <p className="text-xs text-[#9F1239] opacity-90">Mitigation: {risk.mitigation}</p>
                         </div>
                      ))}
                   </CardContent>
                </Card>
             </div>
          </div>

          {/* Right: Reasoning Panel */}
          <div>
             <Card className="h-full border-[#E5E5E5] bg-[#F8FAFC] shadow-inner">
                <CardHeader className="pb-4 border-b border-[#E2E8F0]">
                   <CardTitle className="flex items-center gap-2 text-[#1A1A1A]">
                      <Sparkles className="w-5 h-5 text-[#6B21A8]" />
                      How Gemini Reasoned
                   </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="space-y-4">
                      {analysis.reasoning.map((r, i) => (
                         <div key={i} className="flex gap-3">
                            <div className="flex flex-col items-center">
                               <div className="w-6 h-6 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#6B21A8] shadow-sm shrink-0">
                                  {i + 1}
                               </div>
                               {i !== analysis.reasoning.length - 1 && (
                                  <div className="w-px h-full bg-[#E2E8F0] my-1" />
                               )}
                            </div>
                            <p className="text-sm text-[#475569] leading-relaxed pt-0.5">
                               {r}
                            </p>
                         </div>
                      ))}
                   </div>
                   <div className="bg-white rounded-lg p-3 border border-[#E2E8F0] text-xs text-[#64748B] italic">
                      "You can edit the description below to correct any assumptions I've made."
                   </div>
                </CardContent>
             </Card>
          </div>
       </section>

       {/* 4. Refined Description */}
       <section>
          <Card className="border-[#E5E5E5] shadow-md bg-white">
             <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#F7F7F5]">
                <CardTitle className="text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                   <Edit2 className="w-4 h-4 text-[#6B21A8]" /> AI-Refined Event Description
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <Textarea 
                   value={analysis.refinedDescription}
                   onChange={(e) => updateData({ 
                      analysis: { 
                         ...analysis, 
                         refinedDescription: e.target.value 
                      } 
                   })}
                   className="min-h-[150px] border-0 focus-visible:ring-0 text-base leading-relaxed p-6 resize-none"
                />
             </CardContent>
          </Card>
       </section>
    </div>
  );
};
