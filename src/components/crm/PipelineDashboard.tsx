import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Filter, ChevronDown, Sparkles, TrendingUp, Loader2, X, BarChart3, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { ContactPanel } from './ContactPanel';
import { useDeals, useCRMStats } from './hooks';
import { useRealtimeCRM } from './realtimeHooks';
import { DealCard } from './DealCard';
import { SkeletonDealCard } from '../ui/skeleton';

// Simple relative time helper to avoid date-fns dependency
const formatRelativeTime = (dateString: string) => {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
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
  
  // 1. Fetch Deals
  const { deals, loading, refresh, createDeal } = useDeals(pipelineMode);
  const { stats, refresh: refreshStats } = useCRMStats();

  // 2. Realtime Subscriptions
  useRealtimeCRM(() => {
    refresh();
    refreshStats();
  });

  // Data selection based on mode
  const currentSteps = pipelineMode === 'investor' ? investorSteps : steps;

  // 3. Map Backend Data to UI Format
  const mappedDeals = useMemo(() => {
    return deals.map(d => ({
       ...d,
       company: d.account?.name || d.account_name, // Handle joined account name or fallback
       stepId: d.stage || d.stage_id, // Support 'stage' (from SQL) or 'stage_id' (legacy KV)
       healthScore: d.ai_score || d.health_score || 50, // Use SQL 'ai_score' or KV 'health_score'
       aiRisk: d.enrichment?.risk_analysis || d.ai_risk, // Join result vs KV
       aiNextStep: d.enrichment?.next_action || d.ai_next_step,
       lastActivity: d.updated_at ? formatRelativeTime(d.updated_at) : 'Recently',
       amount: d.amount ? `$${d.amount.toLocaleString()}` : 'N/A'
    }));
  }, [deals]);

  // Filtering logic
  const filteredDeals = useMemo(() => {
    return activeStepId 
      ? mappedDeals.filter(d => d.stepId === activeStepId) 
      : mappedDeals;
  }, [activeStepId, mappedDeals]);

  const activeStep = currentSteps.find(s => s.id === activeStepId);

  // AI Summary Content (Using Server Aggregations)
  const aiSummary = useMemo(() => {
    if (!stats) return { text: "Loading AI insights..." };

    // Use server stats if available, otherwise fallback to client calc for immediate feedback
    const count = filteredDeals.length;
    const value = filteredDeals.reduce((sum, d) => sum + (Number(d.amount?.replace(/[^0-9.-]+/g,"")) || 0), 0);
    const avgProb = filteredDeals.reduce((acc, d) => acc + (d.probability || 0), 0) / (count || 1);

    return {
      text: count > 0 
        ? `${count} deals in ${activeStep?.title} worth ~$${(value/1000).toFixed(0)}k. Win probability is ${avgProb.toFixed(0)}%. ${stats.sales_win_rate ? `Overall win rate: ${stats.sales_win_rate}%.` : ''}`
        : `No deals in ${activeStep?.title}. Pipeline looks healthy otherwise with $${(stats.total_pipeline_value/1000).toFixed(0)}k total volume.`
    };
  }, [filteredDeals, activeStep, stats]);

  // Handle Create Seed Data if empty
  useEffect(() => {
    if (!loading && deals.length === 0) {
      // Optional: Auto-seed or prompt
    }
  }, [loading, deals]);

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
                          {/* Count Badge */}
                          <span className={cn(
                            "text-[10px] px-1.5 rounded-full font-medium",
                            activeStepId === step.id ? "bg-indigo-200 text-indigo-700" : "bg-slate-100 text-slate-500"
                          )}>
                            {mappedDeals.filter(l => l.stepId === step.id).length}
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
              <Button 
                onClick={() => {
                   // Mock create for now - typically opens modal
                   createDeal({
                     name: 'New Opportunity',
                     amount: 50000,
                     stage_id: activeStepId,
                     pipeline_type: pipelineMode,
                     account_name: 'Prospect Inc'
                   });
                }}
                className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
              >
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
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
               {Array.from({ length: 6 }).map((_, i) => (
                 <SkeletonDealCard key={i} />
               ))}
             </div>
          ) : filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
              {filteredDeals.map((lead: any) => (
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
               <Button variant="link" className="text-blue-600" onClick={() => createDeal({
                  name: 'New Deal',
                  stage_id: activeStepId,
                  pipeline_type: pipelineMode,
                  account_name: 'New Account'
               })}>Add your first deal</Button>
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
             <DealPanel 
               deal={selectedLead} 
               onClose={onCloseLead}
               pipelineMode={pipelineMode}
             />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};