import React, { useState } from 'react';
import { useActivities } from './hooks';
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { Mail, Phone, Calendar, FileText, File, CheckSquare, MessageSquare } from 'lucide-react';

// Filter tabs
const filters = ['All', 'Tasks', 'Emails', 'Calls', 'Notes', 'Files'];

const iconMap: Record<string, any> = {
  email: Mail,
  call: Phone,
  meeting: Calendar,
  note: FileText,
  task: CheckSquare,
  file: File,
  default: MessageSquare
};

const colorMap: Record<string, string> = {
  email: 'text-blue-500',
  call: 'text-green-500',
  meeting: 'text-purple-500',
  note: 'text-orange-500',
  task: 'text-teal-500',
  file: 'text-indigo-500',
  default: 'text-slate-500'
};

export const ActivityFeed: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const { activities, loading } = useActivities(20);

  const mappedActivities = activities.map(a => {
     const type = a.type?.toLowerCase() || 'default';
     const contactName = a.contact ? `${a.contact.first_name} ${a.contact.last_name}`.trim() : 'Unknown Contact';
     
     return {
       id: a.id,
       type: type.charAt(0).toUpperCase() + type.slice(1),
       title: a.type === 'note' ? 'Internal Note' : `${type.charAt(0).toUpperCase() + type.slice(1)} with ${contactName}`,
       description: a.content || 'No details provided',
       time: a.occurred_at ? new Date(a.occurred_at).toLocaleDateString() : 'Unknown date',
       icon: iconMap[type] || iconMap.default,
       color: colorMap[type] || colorMap.default,
       rawType: type
     };
  });

  const filteredActivities = activeFilter === 'All' 
    ? mappedActivities 
    : mappedActivities.filter(a => a.rawType === activeFilter.toLowerCase() || a.type === activeFilter); 

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
        {loading ? (
           <div className="text-center text-slate-400 py-10">Loading activities...</div>
        ) : filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => {
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
          })
        ) : (
          <div className="text-center text-slate-400 py-10">No recent activity</div>
        )}
      </div>
    </div>
  );
};
