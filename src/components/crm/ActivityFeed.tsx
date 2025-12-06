import React, { useState } from 'react';
import { activities } from './data';
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { Mail, Phone, Calendar, FileText, File, CheckSquare } from 'lucide-react';

// Filter tabs
const filters = ['All', 'Tasks', 'Emails', 'Calls', 'Notes', 'Files'];

export const ActivityFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredActivities = activeFilter === 'All' 
    ? activities 
    : activities.filter(a => a.type + 's' === activeFilter || a.type === activeFilter); // rough matching

  return (
    <div className="h-full flex flex-col bg-white rounded-xl border border-slate-100 shadow-sm">
      <div className="p-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Activity Feed</h3>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
                activeFilter === f 
                  ? "bg-slate-800 text-white" 
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        {filteredActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Timeline Line */}
              {index < filteredActivities.length - 1 && (
                <div className="absolute left-[15px] top-8 bottom-[-24px] w-[2px] bg-slate-100" />
              )}
              
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 bg-white border",
                activity.color.replace('text-', 'border-')
              )}>
                <Icon className={cn("w-4 h-4", activity.color)} />
              </div>
              
              <div className="flex-grow pb-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-slate-700">{activity.type}</span>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
                <h4 className="text-sm font-medium text-slate-800 mt-1">{activity.title}</h4>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
