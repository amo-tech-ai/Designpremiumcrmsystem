import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Project } from './ProjectCard';
import { Calendar, CheckCircle2, FileText, User, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

interface ProjectDetailSheetProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailSheet({ project, isOpen, onClose }: ProjectDetailSheetProps) {
  if (!project) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white border-l border-[#E1E6EE]">
        <SheetHeader className="mb-8">
          <div className="flex items-center gap-2.5 mb-3">
            <Badge variant="outline" className="bg-[#E8EEF5] text-[#4A5B78] border-[#E1E6EE] font-bold">
              {project.phase}
            </Badge>
            <Badge variant="outline" className={project.status === 'At Risk' ? 'bg-[#F2B6B6]/20 text-[#D56565] border-[#F2B6B6]/30 font-bold' : 'bg-[#A8E6C1]/20 text-[#4CAF73] border-[#A8E6C1]/30 font-bold'}>
              {project.status}
            </Badge>
          </div>
          <SheetTitle className="text-3xl font-bold text-[#1A1F2C] tracking-tight">{project.title}</SheetTitle>
          <SheetDescription className="text-[#6B7280] text-sm font-medium mt-1">
            Started on Jan 15, 2024 • Due by {project.dueDate}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Progress Section */}
          <section>
            <div className="flex justify-between items-end mb-2.5">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Overall Progress</h3>
              <span className="text-2xl font-bold text-[#4A5B78]">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-2.5 bg-[#F7F9FC]" indicatorClassName="bg-[#4A5B78]" />
            <p className="text-sm text-[#6B7280] mt-3 flex items-center gap-2 font-medium">
               <Clock className="w-4 h-4 text-[#9CA3AF]" /> On track to complete by due date.
            </p>
          </section>

          {/* Goals / Objectives */}
          <section className="bg-[#F7F9FC] p-6 rounded-2xl border border-[#E1E6EE]">
             <h3 className="text-xs font-bold text-[#1A1F2C] uppercase tracking-wider mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#A8E6C1]" /> Key Objectives
             </h3>
             <ul className="space-y-4">
                <li className="flex gap-3 items-start text-sm text-[#4A5B78] font-semibold">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#A8E6C1] mt-1.5 flex-shrink-0" />
                   Complete market research and competitor analysis
                </li>
                <li className="flex gap-3 items-start text-sm text-[#6B7280] font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#E1E6EE] mt-1.5 flex-shrink-0" />
                   Finalize initial wireframes for MVP
                </li>
                <li className="flex gap-3 items-start text-sm text-[#6B7280] font-medium">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#E1E6EE] mt-1.5 flex-shrink-0" />
                   Secure 5 letter of intents from pilot customers
                </li>
             </ul>
          </section>

          {/* Next Tasks */}
          <section>
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">Next Tasks</h3>
            <div className="space-y-3">
               <div className="flex items-center gap-4 p-4 bg-white border border-[#E1E6EE] rounded-xl shadow-sm hover:border-[#4A5B78]/30 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-[#E1E6EE] cursor-pointer group-hover:border-[#4A5B78] transition-colors" />
                  <span className="text-sm font-bold text-[#1A1F2C] flex-grow group-hover:text-[#4A5B78] transition-colors">Review legal agreements</span>
                  <Badge variant="secondary" className="text-[10px] bg-[#F6DFA9]/20 text-[#E0B45A] border border-[#F6DFA9]/30 font-bold">Urgent</Badge>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white border border-[#E1E6EE] rounded-xl shadow-sm hover:border-[#4A5B78]/30 transition-colors cursor-pointer group">
                  <div className="w-5 h-5 rounded-full border-2 border-[#E1E6EE] cursor-pointer group-hover:border-[#4A5B78] transition-colors" />
                  <span className="text-sm font-bold text-[#1A1F2C] flex-grow group-hover:text-[#4A5B78] transition-colors">Draft investor update email</span>
                  <Avatar className="w-6 h-6"><AvatarFallback className="bg-[#E8EEF5] text-[#4A5B78] text-[10px] font-bold">JD</AvatarFallback></Avatar>
               </div>
            </div>
            <Button variant="link" className="px-0 text-[#6F7EBC] mt-2 text-sm h-auto font-bold hover:text-[#4A5B78]">
               View all tasks <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </section>

          {/* Documents */}
          <section>
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-4">Attached Documents</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 p-4 bg-[#F7F9FC] hover:bg-[#E8EEF5] rounded-xl border border-[#E1E6EE] cursor-pointer transition-colors group">
                  <div className="p-2 bg-white rounded-lg border border-[#E1E6EE] group-hover:border-[#C9D7F2]">
                     <FileText className="w-5 h-5 text-[#6F7EBC] group-hover:text-[#4A5B78] transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                     <div className="text-sm font-bold text-[#1A1F2C] truncate">Pitch Deck v3</div>
                     <div className="text-[10px] font-medium text-[#6B7280]">PDF • 2.4MB</div>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-4 bg-[#F7F9FC] hover:bg-[#E8EEF5] rounded-xl border border-[#E1E6EE] cursor-pointer transition-colors group">
                  <div className="p-2 bg-white rounded-lg border border-[#E1E6EE] group-hover:border-[#A8E6C1]">
                     <FileText className="w-5 h-5 text-[#4CAF73] group-hover:text-[#4CAF73]/80 transition-colors" />
                  </div>
                  <div className="overflow-hidden">
                     <div className="text-sm font-bold text-[#1A1F2C] truncate">Financial Model</div>
                     <div className="text-[10px] font-medium text-[#6B7280]">XLSX • 1.1MB</div>
                  </div>
               </div>
            </div>
          </section>
        </div>

        <SheetFooter className="mt-8 pt-6 border-t border-[#E1E6EE]">
           <div className="flex justify-between w-full items-center">
              <div className="flex -space-x-2">
                 {project.members.map((m, i) => (
                    <Avatar key={i} className="w-9 h-9 border-2 border-white ring-1 ring-[#E1E6EE]">
                       <AvatarFallback className="bg-[#E8EEF5] text-[#4A5B78] text-xs font-bold">{m.charAt(0)}</AvatarFallback>
                    </Avatar>
                 ))}
                 <button className="w-9 h-9 rounded-full bg-[#F7F9FC] border-2 border-white ring-1 ring-[#E1E6EE] flex items-center justify-center text-[#9CA3AF] hover:bg-[#E8EEF5] hover:text-[#4A5B78] transition-colors">
                    <User className="w-4 h-4" />
                 </button>
              </div>
              <div className="flex gap-3">
                 <Button variant="outline" className="border-[#E1E6EE] text-[#6B7280] hover:text-[#1A1F2C] hover:bg-[#F7F9FC] font-medium h-10 px-4 rounded-xl">Edit Project</Button>
                 <Button className="bg-[#4A5B78] hover:bg-[#263344] text-white shadow-sm font-bold h-10 px-5 rounded-xl border-0">Open Board</Button>
              </div>
           </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
