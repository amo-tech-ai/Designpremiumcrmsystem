import { Project } from './types';
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Track': return 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200';
      case 'At Risk': return 'bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200';
      case 'Delayed': return 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200';
      case 'Completed': return 'bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
    }
  };

  return (
    <Card 
      className="group hover:border-indigo-200 hover:shadow-md transition-all duration-200 cursor-pointer border-slate-200"
      onClick={() => onClick(project)}
    >
      <CardHeader className="pb-3 space-y-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${getStatusColor(project.status)} font-medium border`}>
            {project.status}
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-1">
            {project.lastActivity}
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2 bg-slate-100" />
          
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-50 text-slate-600 px-2 py-1 rounded-md border border-slate-100 font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-50 flex justify-between items-center text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{project.dueDate}</span>
        </div>
        <div className="flex -space-x-2">
          {project.members.map((member, i) => (
            <Avatar key={i} className="w-6 h-6 border-2 border-white ring-1 ring-slate-100">
              <AvatarImage src={member} />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
