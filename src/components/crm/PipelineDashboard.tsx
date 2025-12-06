import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WorkflowStepCard } from './WorkflowStepCard';
import { steps, leads, investorSteps, investorLeads } from './data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { 
  ArrowRight, 
  Filter, 
  Calendar as CalendarIcon, 
  Tag, 
  User, 
  MoreHorizontal, 
  Trash2, 
  ArrowUpRight,
  Download
} from 'lucide-react';
import { cn } from "../ui/utils";

interface PipelineDashboardProps {
  pipelineMode: 'sales' | 'investor';
  activeStepId: string;
  setActiveStepId: (id: string) => void;
  onLeadClick: (lead: any) => void;
}

export const PipelineDashboard: React.FC<PipelineDashboardProps> = ({
  pipelineMode,
  activeStepId,
  setActiveStepId,
  onLeadClick
}) => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  
  // Data selection based on mode
  const currentSteps = pipelineMode === 'investor' ? investorSteps : steps;
  const currentLeads = pipelineMode === 'investor' ? investorLeads : leads;

  // Filtering logic
  const filteredLeads = activeStepId 
    ? currentLeads.filter(l => l.stepId === activeStepId) 
    : currentLeads;

  // Bulk Selection Logic
  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map(l => l.id));
    }
  };

  const toggleSelectLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter(l => l !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  return (
    <div className="flex h-full">
      {/* LEFT PANEL: Pipeline Steps (Vertical) */}
      <div className="w-72 flex-shrink-0 border-r border-slate-200 bg-slate-50/50 overflow-y-auto p-6 space-y-6">
        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">
          {pipelineMode === 'investor' ? 'Investor Stages' : 'Sales Stages'}
        </h3>
        
        <div className="space-y-6 pb-10">
          {currentSteps.map((step, index) => (
            <div key={step.id} className="relative transform transition-transform origin-left hover:translate-x-1">
               {/* Vertical Connector Line */}
               {index < currentSteps.length - 1 && (
                 <div className="absolute left-8 top-full h-6 w-0.5 bg-slate-200 z-0" />
               )}
               
               <div className="transform scale-90 origin-top-left">
                 <WorkflowStepCard
                    {...step}
                    isActive={activeStepId === step.id}
                    onClick={() => setActiveStepId(step.id)}
                  />
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER PANEL: Table & Filters */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative bg-white">
        
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col gap-4">
           <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                 <h2 className="text-xl font-bold text-slate-800">
                    {currentSteps.find(s => s.id === activeStepId)?.title || 'All Deals'}
                 </h2>
                 <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-600">
                    {filteredLeads.length}
                 </Badge>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" /> Filters
                 </Button>
                 <Button className="bg-blue-600 hover:bg-blue-700 size-sm">
                    + New Deal
                 </Button>
              </div>
           </div>

           {/* Visual Filter Pills */}
           <div className="flex gap-2 items-center overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                 <User className="w-3 h-3" /> Owner: All
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                 <CalendarIcon className="w-3 h-3" /> Last Interaction: Any time
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition-colors">
                 <Tag className="w-3 h-3" /> Tags: All
              </div>
           </div>
        </div>

        {/* Table Area */}
        <div className="flex-grow overflow-auto">
          <Table>
            <TableHeader className="bg-slate-50 sticky top-0 z-10">
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                {pipelineMode === 'investor' && <TableHead>Funding Goal</TableHead>}
                {pipelineMode === 'investor' && <TableHead>Target Investors</TableHead>}
                <TableHead>Health</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead: any) => (
                  <TableRow 
                    key={lead.id} 
                    className={cn(
                      "group transition-colors cursor-pointer",
                      selectedLeads.includes(lead.id) ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-slate-50"
                    )}
                    onClick={(e) => {
                      // Prevent row click when clicking checkbox or actions
                      if ((e.target as HTMLElement).closest('.no-row-click')) return;
                      onLeadClick(lead);
                    }}
                  >
                    <TableCell className="no-row-click">
                      <Checkbox 
                        checked={selectedLeads.includes(lead.id)}
                        onCheckedChange={() => toggleSelectLead(lead.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                          <AvatarFallback>{lead.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="group-hover:text-blue-600 transition-colors">{lead.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company}</TableCell>
                    
                    {pipelineMode === 'investor' && (
                      <>
                        <TableCell>{lead.fundingGoal}</TableCell>
                        <TableCell>
                           <div className="flex flex-wrap gap-1">
                             {lead.targetInvestors?.map((tag: string) => (
                               <span key={tag} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-medium border border-indigo-100">
                                 {tag}
                               </span>
                             ))}
                           </div>
                        </TableCell>
                      </>
                    )}

                    <TableCell>
                       <div className="flex items-center gap-2">
                         <div className={cn(
                           "w-2 h-2 rounded-full",
                           lead.healthScore > 90 ? "bg-green-500" : lead.healthScore > 70 ? "bg-amber-500" : "bg-red-500"
                         )} />
                         <span className="text-xs font-medium">{lead.healthScore}%</span>
                       </div>
                    </TableCell>
                    <TableCell className="text-slate-500">{lead.lastActivity}</TableCell>
                    <TableCell className="text-right no-row-click">
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={pipelineMode === 'investor' ? 8 : 6} className="h-24 text-center text-slate-400">
                    No deals found in this stage.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Bulk Actions Sticky Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: selectedLeads.length > 0 ? 0 : 100 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-20 border border-slate-700/50"
        >
          <span className="text-sm font-medium text-slate-300 border-r border-slate-700 pr-4">
            {selectedLeads.length} selected
          </span>
          
          <div className="flex items-center gap-2">
             <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 text-xs gap-2">
                <User className="w-3 h-3" /> Assign
             </Button>
             <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 text-xs gap-2">
                <ArrowUpRight className="w-3 h-3" /> Move Stage
             </Button>
             <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 text-xs gap-2">
                <Tag className="w-3 h-3" /> Tag
             </Button>
             <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 text-xs gap-2">
                <Download className="w-3 h-3" /> Export
             </Button>
             <div className="w-px h-4 bg-slate-700 mx-2" />
             <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20 h-8 text-xs gap-2">
                <Trash2 className="w-3 h-3" /> Delete
             </Button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
