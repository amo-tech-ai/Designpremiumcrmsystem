import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { steps, leads, investorSteps, investorLeads } from './data';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  Search,
  Filter, 
  Plus, 
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { cn } from "../ui/utils";
import { DealCard } from './DealCard';
import { ContactPanel } from './ContactPanel';

// Mock AI Data Augmentation
const augmentLeadWithAI = (lead: any) => {
  const probability = Math.floor(Math.random() * 60) + 40; // 40-100%
  const risks = ["Stalled decision maker", "Budget concerns", "Competitor involved", null, null];
  const nextSteps = [
    "Send updated case study",
    "Schedule technical deep dive",
    "Follow up on proposal",
    "Connect on LinkedIn",
    "Intro to CTO"
  ];
  
  return {
    ...lead,
    amount: lead.value || "$120,000",
    healthScore: Math.floor(Math.random() * 100),
    probability,
    aiRisk: risks[Math.floor(Math.random() * risks.length)],
    aiNextStep: nextSteps[Math.floor(Math.random() * nextSteps.length)],
    tags: lead.tags || ["Enterprise", "Q3 Close"]
  };
};

interface PipelineDashboardProps {
  pipelineMode: 'sales' | 'investor';
  setPipelineMode: (mode: 'sales' | 'investor') => void;
  activeStepId: string;
  setActiveStepId: (id: string) => void;
  selectedLead: any;
  onLeadClick: (lead: any) => void;
  onCloseLead: () => void;
}

export const PipelineDashboard: React.FC<PipelineDashboardProps> = ({
  pipelineMode,
  setPipelineMode,
  activeStepId,
  setActiveStepId,
  selectedLead,
  onLeadClick,
  onCloseLead
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Data selection based on mode
  const currentSteps = pipelineMode === 'investor' ? investorSteps : steps;
  const rawLeads = pipelineMode === 'investor' ? investorLeads : leads;
  
  // Memoize and augment data
  const currentLeads = useMemo(() => {
    return rawLeads.map(augmentLeadWithAI);
  }, [rawLeads]);

  // Filtering logic
  const filteredLeads = useMemo(() => {
    return activeStepId 
      ? currentLeads.filter(l => l.stepId === activeStepId) 
      : currentLeads;
  }, [activeStepId, currentLeads]);

  const activeStep = currentSteps.find(s => s.id === activeStepId);

  // AI Summary Content
  const aiSummary = useMemo(() => {
    const totalValue = filteredLeads.length * 120000; // Mock calc
    const avgProb = filteredLeads.reduce((acc, l) => acc + l.probability, 0) / (filteredLeads.length || 1);
    
    return {
      text: filteredLeads.length > 0 
        ? `${filteredLeads.length} deals in ${activeStep?.title} worth ~$${(totalValue/1000).toFixed(0)}k. Win probability is ${avgProb.toFixed(0)}%. Focus on the 2 at-risk accounts.`
        : `No deals in ${activeStep?.title}. AI suggests adding new prospects from LinkedIn.`
    };
  }, [filteredLeads, activeStep]);

  return (
    <div className="flex h-full overflow-hidden bg-slate-50/50">
      
      {/* LEFT PANEL: Stage Navigator */}
      <div className="w-[280px] flex-shrink-0 border-r border-slate-200 bg-white overflow-y-auto p-4 flex flex-col gap-6 z-10">
        
        {/* Mode Toggle */}
        <div className="bg-slate-100 p-1 rounded-lg flex shrink-0">
           <button 
             onClick={() => setPipelineMode('investor')}
             className={cn(
               "flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all text-center",
               pipelineMode === 'investor' 
                 ? "bg-white text-indigo-600 shadow-sm" 
                 : "text-slate-500 hover:text-slate-700"
             )}
           >
             Investor
           </button>
           <button 
             onClick={() => setPipelineMode('sales')}
             className={cn(
               "flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all text-center",
               pipelineMode === 'sales' 
                 ? "bg-white text-purple-600 shadow-sm" 
                 : "text-slate-500 hover:text-slate-700"
             )}
           >
             Sales
           </button>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-wider mb-3 px-2">
            Pipeline Stages
          </h3>
          <div className="space-y-3 pb-10">
            {currentSteps.map((step, index) => (
              <div key={step.id} className="relative group">
                 {/* Vertical Line Connector */}
                 {index < currentSteps.length - 1 && (
                   <div className="absolute left-[34px] top-10 bottom-[-20px] w-[2px] bg-slate-100 group-hover:bg-indigo-50 transition-colors z-0" />
                 )}
                 
                 <div 
                   onClick={() => setActiveStepId(step.id)}
                   className={cn(
                     "relative z-10 flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all border",
                     activeStepId === step.id 
                       ? "bg-indigo-50 border-indigo-200 shadow-sm" 
                       : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                   )}
                 >
                    {/* Icon Circle */}
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors shadow-sm",
                      activeStepId === step.id 
                        ? "bg-indigo-600 text-white" 
                        : "bg-white border border-slate-200 text-slate-400 group-hover:border-indigo-200 group-hover:text-indigo-500"
                    )}>
                      <step.icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0 pt-0.5">
                       <div className="flex justify-between items-center mb-0.5">
                          <span className={cn(
                            "font-bold text-sm truncate",
                            activeStepId === step.id ? "text-indigo-900" : "text-slate-700"
                          )}>
                            {step.title}
                          </span>
                          {/* Count Badge (Mock) */}
                          <span className={cn(
                            "text-[10px] px-1.5 rounded-full font-medium",
                            activeStepId === step.id ? "bg-indigo-200 text-indigo-700" : "bg-slate-100 text-slate-500"
                          )}>
                            {currentLeads.filter(l => l.stepId === step.id).length}
                          </span>
                       </div>
                       <p className={cn(
                         "text-xs line-clamp-2",
                         activeStepId === step.id ? "text-indigo-700/80" : "text-slate-400"
                       )}>
                         {step.description}
                       </p>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER PANEL: Deals Board */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative bg-slate-50/50">
        
        {/* Top Toolbar */}
        <div className="px-8 py-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">{activeStep?.title}</h1>
              <div className="h-6 w-px bg-slate-200" />
              <div className="relative w-64">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <Input placeholder="Search deals..." className="pl-9 bg-slate-50 border-slate-200" />
              </div>
           </div>
           <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                <Plus className="w-4 h-4" /> Add Deal
              </Button>
           </div>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          
          {/* AI Pipeline Summary */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-blue-500/10 border border-indigo-100 flex items-start gap-4"
          >
             <div className="p-2 bg-white rounded-lg shadow-sm text-indigo-600">
                <Sparkles className="w-5 h-5" />
             </div>
             <div>
                <h3 className="text-sm font-bold text-indigo-900 mb-1">AI Pipeline Analysis</h3>
                <p className="text-sm text-indigo-800/80 leading-relaxed">
                   {aiSummary.text}
                </p>
             </div>
          </motion.div>

          {/* Deals Grid */}
          {filteredLeads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {filteredLeads.map((lead: any) => (
                <DealCard 
                  key={lead.id} 
                  deal={lead} 
                  onClick={() => onLeadClick(lead)}
                  isSelected={selectedLead?.id === lead.id}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
               <LayoutGrid className="w-10 h-10 mb-3 opacity-20" />
               <p>No deals in this stage</p>
               <Button variant="link" className="text-blue-600">Add your first deal</Button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Context (Slide-over) */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div 
             initial={{ x: '100%', opacity: 0.5 }}
             animate={{ x: 0, opacity: 1 }}
             exit={{ x: '100%', opacity: 0.5 }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
             className="w-[450px] bg-white border-l border-slate-200 shadow-2xl z-30 flex-shrink-0 h-full"
          >
             <ContactPanel 
               lead={selectedLead} 
               onClose={onCloseLead} 
             />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

