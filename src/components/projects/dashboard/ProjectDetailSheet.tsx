import { Project } from './types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '../../ui/sheet';
import { Badge } from '../../ui/badge';
import { Progress } from '../../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Calendar, CheckSquare, FileText, Link as LinkIcon, Users, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

interface ProjectDetailSheetProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailSheet({ project, isOpen, onClose }: ProjectDetailSheetProps) {
  if (!project) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <Badge variant="outline" className="mb-2 w-fit">
                {project.phase} Phase
              </Badge>
              <SheetTitle className="text-2xl font-bold">{project.title}</SheetTitle>
              <SheetDescription className="text-base">
                {project.description}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {/* Status Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Status</h3>
            <div className="bg-slate-50 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Completion</span>
                <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2.5" />
              <div className="flex gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Due in {project.dueDate.replace(' days left', '')} days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckSquare className="w-4 h-4 text-slate-400" />
                  <span>12/18 Tasks</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Team Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" /> Team
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {project.members.map((member, i) => (
                  <Avatar key={i} className="w-10 h-10 border-2 border-white ring-1 ring-slate-100">
                    <AvatarImage src={member} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="outline" size="sm" className="h-10 rounded-full">
                + Add Member
              </Button>
            </div>
          </div>

          <Separator />

          {/* Deliverables/Docs */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" /> Key Deliverables
            </h3>
            <div className="grid gap-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">Project Spec v1.pdf</span>
                </div>
                <LinkIcon className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">Financial Model.xlsx</span>
                </div>
                <LinkIcon className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Upcoming Tasks */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Next Steps
            </h3>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 mt-0.5 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">Review final designs with stakeholders</p>
                    <p className="text-xs text-slate-500 mt-1">Due Tomorrow</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button className="w-full sm:w-auto" size="lg">Open Project Board</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
