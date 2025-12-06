import React from 'react';
import { motion } from 'motion/react';
import { WorkflowStepCard } from './WorkflowStepCard';
import { tasks } from './data';
import { CheckCircle2, Circle, Plus, MoreHorizontal, Calendar } from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { cn } from "../ui/utils";

// Reuse the card style but maybe slightly smaller or header only? 
// Prompt says: "Use the curved-tab cards as category headers"
// So I will render them at the top of columns.

const taskCategories = [
  { id: 'Research', stepNumber: 1, title: 'Research', description: 'Gathering intial data', colorClass: 'from-purple-600 to-purple-500' },
  { id: 'Planning', stepNumber: 2, title: 'Planning', description: 'Structuring the approach', colorClass: 'from-purple-500 to-blue-500' },
  { id: 'Execution', stepNumber: 3, title: 'Execution', description: 'Performing the work', colorClass: 'from-blue-500 to-blue-400' },
  { id: 'Review', stepNumber: 4, title: 'Review', description: 'Quality assurance checks', colorClass: 'from-blue-400 to-teal-400' },
  { id: 'Completion', stepNumber: 5, title: 'Completion', description: 'Final delivery', colorClass: 'from-teal-400 to-teal-300' },
];

// Icons mapping (using generic icons for now as I don't have them imported in data.ts for these specific categories)
import { Search, Map, Play, CheckSquare, Flag } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Research: Search,
  Planning: Map,
  Execution: Play,
  Review: CheckSquare,
  Completion: Flag,
};

export const TasksDashboard: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-x-auto">
      <div className="flex space-x-6 min-w-max pb-4">
        {taskCategories.map((cat) => (
          <div key={cat.id} className="w-72 flex flex-col space-y-4">
            {/* Header Card */}
            <div className="transform scale-90 origin-top-left">
               <WorkflowStepCard
                 stepNumber={cat.stepNumber}
                 title={cat.title}
                 description={cat.description}
                 icon={categoryIcons[cat.id]}
                 colorClass={cat.colorClass}
                 isActive={true} // Always look "active" or colorful
               />
            </div>

            {/* Task List */}
            <div className="space-y-3 -mt-4"> {/* Negative margin to pull up under the scaled card if needed */}
              <div className="flex justify-between items-center px-2">
                <span className="text-sm font-semibold text-slate-500">
                  {tasks.filter(t => t.category === cat.id).length} Tasks
                </span>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-4 w-4 text-slate-400" />
                </Button>
              </div>
              
              {tasks.filter(t => t.category === cat.id).map(task => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <button className="text-slate-300 hover:text-blue-500 transition-colors">
                        {task.completed ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Circle className="h-5 w-5" />}
                      </button>
                      <span className={cn("font-medium text-slate-700", task.completed && "line-through text-slate-400")}>
                        {task.title}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pl-7">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{task.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={cn(
                        "text-[10px] h-5 px-1.5",
                        task.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                      )}>
                        {task.priority}
                      </Badge>
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-[9px]">JD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <Button variant="outline" className="w-full border-dashed text-slate-400 hover:text-blue-500 hover:border-blue-300">
                + Add Task
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
