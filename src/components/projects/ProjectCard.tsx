import React from 'react';
import { Calendar, MoreHorizontal, Clock, ArrowRight, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '../ui/utils';

export interface Project {
  id: string;
  title: string;
  status: 'In Progress' | 'At Risk' | 'Completed' | 'Planning';
  progress: number;
  dueDate: string;
  tags: string[];
  members: string[];
  lastActivity: string;
  phase: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: 'vertical' | 'horizontal' | 'row';
  onClick?: () => void;
}

// Luxury Utility Status Configuration
const statusConfig = {
  'In Progress': { 
    color: 'text-[#92400E]', // Amber Text
    bg: 'bg-[#FEF3C7]',     // Amber Bg
    border: 'border-[#FDE68A]', 
    icon: Circle 
  },
  'At Risk': { 
    color: 'text-[#991B1B]', // Red Text
    bg: 'bg-[#FEE2E2]',     // Red Bg
    border: 'border-[#FECACA]', 
    icon: AlertCircle 
  },
  'Completed': { 
    color: 'text-[#166534]', // Green Text
    bg: 'bg-[#DCFCE7]',     // Green Bg
    border: 'border-[#BBF7D0]', 
    icon: CheckCircle2 
  },
  'Planning': { 
    color: 'text-[#4B5563]', // Gray Text
    bg: 'bg-[#F3F4F6]',     // Gray Bg
    border: 'border-[#E5E7EB]', 
    icon: Circle 
  },
};

export function ProjectCard({ project, variant = 'horizontal', onClick }: ProjectCardProps) {
  const StatusIcon = statusConfig[project.status].icon;
  const statusStyle = statusConfig[project.status];

  // ROW VARIANT (List View)
  if (variant === 'row') {
    return (
      <div 
        className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-[#F7F7F5] transition-colors cursor-pointer gap-4 border-l-4 border-transparent hover:border-l-[#1A1A1A]"
        onClick={onClick}
      >
        <div className="flex items-start gap-4 min-w-0 flex-1">
            <div className={cn("mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0", statusStyle.color.replace('text-', 'bg-'))} />
            <div className="min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#1A1A1A] font-sans truncate group-hover:text-[#1A1A1A] transition-colors">
                        {project.title}
                    </h3>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5 h-5 border-[#E5E5E5] text-[#6B7280] font-bold bg-[#FFFFFF]">
                        {project.phase}
                    </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#6B7280] font-sans">
                    <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" /> {project.dueDate}
                    </span>
                    <span className="hidden sm:inline text-[#E5E5E5]">•</span>
                    <span className="hidden sm:flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" /> {project.lastActivity}
                    </span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-8 flex-shrink-0">
             {/* Progress */}
             <div className="w-32 hidden md:block">
                 <div className="flex justify-between text-[10px] mb-1.5 font-sans">
                     <span className="text-[#9CA3AF] font-bold uppercase tracking-wider">Progress</span>
                     <span className="font-bold text-[#1A1A1A]">{project.progress}%</span>
                 </div>
                 <Progress 
                    value={project.progress} 
                    className="h-2 bg-[#F3F4F6]" 
                    indicatorClassName={project.status === 'At Risk' ? 'bg-[#991B1B]' : 'bg-[#1A1A1A]'} 
                 />
             </div>

             {/* Team */}
             <div className="flex -space-x-3">
                {project.members.map((member, i) => (
                  <Avatar key={i} className="w-8 h-8 border-2 border-white ring-1 ring-[#E5E5E5]">
                    <AvatarFallback className="bg-[#F3F4F6] text-[#4B5563] text-[10px] font-bold">
                      {member.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ))}
             </div>

             <Button variant="ghost" size="icon" className="h-8 w-8 text-[#9CA3AF] group-hover:text-[#1A1A1A] group-hover:bg-[#E5E5E5] rounded-lg">
                <ArrowRight className="w-4 h-4" />
             </Button>
        </div>
      </div>
    );
  }

  // CARD VARIANT (Grid/Vertical)
  return (
    <Card 
      className="group hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer border-[#E5E5E5] flex flex-col h-full overflow-hidden bg-white rounded-2xl shadow-sm"
      onClick={onClick}
    >
      <CardHeader className="p-6 pb-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border font-sans", statusStyle.bg, statusStyle.color, statusStyle.border)}>
             <StatusIcon className="w-3 h-3" />
             {project.status}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-[#9CA3AF] hover:text-[#1A1A1A] hover:bg-[#F3F4F6] rounded-lg">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <div>
            <h3 className="font-bold text-lg text-[#1A1A1A] font-sans group-hover:text-black transition-colors line-clamp-1 tracking-tight">
            {project.title}
            </h3>
            <p className="text-xs text-[#6B7280] mt-1 line-clamp-1 font-medium font-sans">{project.phase} • Due {project.dueDate}</p>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0 flex-grow">
        <div className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-sans">
              <span className="font-bold text-[#6B7280] uppercase tracking-wider">Progress</span>
              <span className="font-bold text-[#1A1A1A]">{project.progress}%</span>
            </div>
            <Progress 
                value={project.progress} 
                className="h-2 bg-[#F3F4F6]" 
                indicatorClassName={project.status === 'At Risk' ? 'bg-[#991B1B]' : 'bg-[#1A1A1A]'} 
            />
          </div>
          <div className="flex gap-2 flex-wrap">
              {project.tags.slice(0, 2).map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-[#F7F7F5] text-[#6B7280] hover:bg-[#E5E5E5] hover:text-[#1A1A1A] font-medium border border-[#E5E5E5] rounded-md px-2 py-0.5 font-sans">
                      {tag}
                  </Badge>
              ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-[#F7F7F5] border-t border-[#E5E5E5] flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.members.map((member, i) => (
             <Avatar key={i} className="w-7 h-7 border-2 border-white ring-1 ring-[#E5E5E5]">
              <AvatarFallback className="bg-white text-[#4B5563] text-[10px] font-bold shadow-sm">
                {member.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
        <span className="text-[10px] text-[#9CA3AF] font-medium flex items-center gap-1.5 font-sans">
          <Clock className="w-3.5 h-3.5" /> {project.lastActivity}
        </span>
      </CardFooter>
    </Card>
  );
}
