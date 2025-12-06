import React, { useState } from 'react';
import { motion } from 'motion/react';
import { WorkflowStepCard } from './WorkflowStepCard';
import { ContactPanel } from './ContactPanel';
import { steps, leads, tasks, activities } from './data';
import { 
  ArrowUpRight, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Plus, 
  Filter, 
  ChevronDown,
  CheckSquare,
  Clock,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Activity
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../ui/utils";

// --- KPI Card Component ---
const KPICard = ({ title, value, change, icon: Icon, colorClass }: any) => (
  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex items-start justify-between group hover:shadow-md transition-all">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{value}</h3>
      <div className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full w-fit">
        <TrendingUp className="w-3 h-3" />
        {change}
      </div>
    </div>
    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", colorClass)}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

interface FounderDashboardProps {
  onNavigate: (view: string) => void;
  onLeadClick: (lead: any) => void;
}

export const FounderDashboard: React.FC<FounderDashboardProps> = ({ onNavigate, onLeadClick }) => {
  const [taskFilter, setTaskFilter] = useState<'my' | 'all'>('my');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50/50">
      
      {/* SCROLLABLE REGION */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-8 max-w-[1600px] mx-auto space-y-8">
          
          {/* 1. HERO SECTION & KPIs */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow w-full">
              <KPICard 
                title="Monthly Recurring Revenue" 
                value="$42,500" 
                change="+12% vs last month" 
                icon={DollarSign} 
                colorClass="bg-gradient-to-br from-purple-600 to-blue-600"
              />
              <KPICard 
                title="Pipeline Value" 
                value="$1.2M" 
                change="+5% this week" 
                icon={ArrowUpRight} 
                colorClass="bg-gradient-to-br from-blue-500 to-cyan-500"
              />
              <KPICard 
                title="Active Deals" 
                value="24" 
                change="8 closing soon" 
                icon={Briefcase} 
                colorClass="bg-gradient-to-br from-teal-500 to-emerald-500"
              />
            </div>
            
            {/* Quick Action */}
            <div className="flex-shrink-0">
               <Button className="h-14 px-8 text-base shadow-xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 rounded-xl">
                 <Plus className="w-5 h-5 mr-2" /> Add New Deal
               </Button>
            </div>
          </div>

          {/* 2. PIPELINE OVERVIEW (Horizontal Scroll) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-bold text-slate-800">Pipeline Overview</h2>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('pipeline')} className="text-blue-600 hover:text-blue-700">
                View Full Pipeline <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            {/* Scroll Container */}
            <div className="relative -mx-8 px-8 overflow-hidden">
               <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide px-1">
                 {steps.map((step) => {
                    // Mock count
                    const count = Math.floor(Math.random() * 8) + 1;
                    return (
                      <div key={step.id} className="flex-shrink-0 transform hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                        <div className="relative w-64">
                           <WorkflowStepCard {...step} isActive={false} />
                           {/* Overlay Count Badge */}
                           <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-100 text-slate-800 font-bold px-3 py-1 rounded-lg shadow-sm text-xs">
                             {count} Deals
                           </div>
                        </div>
                      </div>
                    );
                 })}
               </div>
               {/* Fade Edges */}
               <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-slate-50/50 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* 3. MAIN CONTENT GRID (Tasks + Feed + Contact) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Tasks & Activity (Span 8) */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* TASKS SECTION */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4">
                   <div className="flex items-center gap-4">
                      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-blue-500" />
                        Tasks
                      </h2>
                      <div className="bg-slate-100 p-1 rounded-lg flex text-xs font-medium">
                        <button 
                          onClick={() => setTaskFilter('my')}
                          className={cn("px-3 py-1 rounded-md transition-colors", taskFilter === 'my' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          My Tasks
                        </button>
                        <button 
                          onClick={() => setTaskFilter('all')}
                          className={cn("px-3 py-1 rounded-md transition-colors", taskFilter === 'all' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                        >
                          All Tasks
                        </button>
                      </div>
                   </div>
                   <Button size="sm" variant="outline" className="gap-2">
                     <Plus className="w-4 h-4" /> Add Task
                   </Button>
                </div>

                <div className="p-0">
                  {tasks.map((task, i) => (
                    <div key={task.id} className="flex items-center gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                      <Checkbox className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500" />
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn("font-medium text-sm text-slate-700 truncate", task.completed && "line-through text-slate-400")}>
                            {task.title}
                          </span>
                          <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-5 font-normal border-slate-200 text-slate-500")}>
                            {task.category}
                          </Badge>
                          {task.priority === 'High' && (
                            <Badge variant="secondary" className="bg-red-50 text-red-600 text-[10px] px-1.5 py-0 h-5 border-0">High</Badge>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-2">
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.dueDate}</span>
                           <span>•</span>
                           <span className="text-blue-500">Associated with Wayne Ent.</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-[10px] bg-slate-100 text-slate-500">JD</AvatarFallback>
                        </Avatar>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm transition-all cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="p-3 text-center">
                    <Button variant="ghost" className="text-xs text-slate-400 hover:text-blue-600 w-full">
                      View All Tasks
                    </Button>
                  </div>
                </div>
              </div>

              {/* ACTIVITY FEED SECTION */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-purple-500" />
                      Recent Activity
                    </h2>
                    <Button variant="ghost" size="sm" className="text-slate-400">
                      <Filter className="w-4 h-4" />
                    </Button>
                 </div>

                 <div className="space-y-0">
                    {activities.map((act, idx) => (
                       <div key={act.id} className="flex gap-4 relative pb-8 last:pb-0">
                          {/* Timeline Line */}
                          {idx < activities.length - 1 && (
                            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-100" />
                          )}

                          {/* Avatar / Icon */}
                          <div className="relative z-10">
                            <Avatar className="w-10 h-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className={cn(
                              "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center border border-slate-100 shadow-sm text-[10px]",
                              act.color
                            )}>
                               <act.icon className="w-3 h-3" />
                            </div>
                          </div>

                          <div className="flex-grow pt-1">
                             <div className="flex justify-between items-start">
                                <p className="text-sm text-slate-800">
                                  <span className="font-bold">User</span> {act.description.split(' ').slice(0, 1).join(' ')}d <span className="font-medium text-blue-600 cursor-pointer hover:underline">{act.title}</span>
                                </p>
                                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{act.time}</span>
                             </div>
                             <p className="text-xs text-slate-500 mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                               {act.description}
                             </p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Contact Panel (Span 4) */}
            <div className="xl:col-span-4">
               <div className="sticky top-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                     {/* Custom Header for Dashboard View of Contact Panel */}
                     <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-slate-700 text-sm">Quick Contact View</h3>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </Button>
                     </div>
                     
                     {/* We can reuse the ContactPanel internal logic or simplified view. 
                         For now, let's just render the ContactPanel with a 'default' or 'recent' lead if none selected.
                     */}
                     <ContactPanel 
                       lead={leads[0]} 
                       onClose={() => {}} 
                     />
                  </div>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
