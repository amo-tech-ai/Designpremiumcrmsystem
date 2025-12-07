import React from 'react';
import { 
  MoreHorizontal, 
  Linkedin, 
  Clock, 
  Sparkles,
  Building,
  ArrowUpRight,
  Mail,
  CheckSquare
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { motion } from 'motion/react';

interface ContactCardProps {
  contact: any;
  onClick: () => void;
  isSelected?: boolean;
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick, isSelected }) => {
  // Engagement Score Logic (Mock)
  const engagementColor = contact.engagementScore > 80 ? 'bg-emerald-500' : contact.engagementScore > 50 ? 'bg-amber-500' : 'bg-slate-300';
  const engagementText = contact.engagementScore > 80 ? 'High' : contact.engagementScore > 50 ? 'Medium' : 'Low';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={cn(
        "group relative bg-white rounded-xl border p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex flex-col justify-between h-full",
        isSelected 
          ? "border-indigo-500 ring-1 ring-indigo-500 shadow-md bg-indigo-50/10" 
          : "border-slate-200 hover:border-indigo-200"
      )}
    >
      {/* Header Actions */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-600 rounded-full shadow-sm" title="Send Message">
           <Mail className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-600 rounded-full shadow-sm" title="Add Task">
           <CheckSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-indigo-50 hover:text-indigo-600 rounded-full shadow-sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* Avatar & Profile */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-white shadow-sm ring-2 ring-slate-50">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.avatarSeed || contact.name}`} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold">{contact.name.substring(0,2)}</AvatarFallback>
            </Avatar>
            {contact.type === 'linkedin' && (
              <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-sm">
                <div className="bg-[#0A66C2] rounded-full p-1">
                  <Linkedin className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
            )}
            <div className={cn("absolute top-0 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full", engagementColor)} title={`Engagement: ${engagementText}`} />
          </div>
          
          <div className="pt-1">
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-700 transition-colors line-clamp-1">{contact.name}</h3>
            <div className="text-sm text-slate-500 flex items-center gap-1.5 mb-1">
               <Building className="w-3 h-3 text-slate-400" />
               <span className="line-clamp-1">{contact.company}</span>
            </div>
            <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">{contact.role || 'Contact'}</div>
          </div>
        </div>

        {/* AI Insight Bubble */}
        {contact.aiInsight && (
          <div className="bg-violet-50 border border-violet-100 rounded-lg p-2.5 flex items-start gap-2.5">
             <Sparkles className="w-3.5 h-3.5 text-violet-600 mt-0.5 flex-shrink-0" />
             <p className="text-xs text-violet-700 leading-relaxed font-medium">
               {contact.aiInsight}
             </p>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {contact.tags?.slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="px-2 py-0.5 h-5 text-[10px] bg-slate-100 text-slate-600 font-normal hover:bg-slate-200">
              {tag}
            </Badge>
          ))}
          {contact.tags?.length > 3 && (
            <span className="text-[10px] text-slate-400 flex items-center px-1">+{contact.tags.length - 3}</span>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{contact.lastActivity || '2d ago'}</span>
        </div>
        
        {/* Relationship Strength Indicator */}
        <div className="flex items-center gap-2" title="Relationship Strength">
           <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1 h-3 rounded-full", 
                    (contact.relationshipStrength || 3) >= i 
                      ? "bg-indigo-500" 
                      : "bg-slate-200"
                  )} 
                />
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};
