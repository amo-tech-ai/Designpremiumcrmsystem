import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Project } from './ProjectCard';

interface TimelinePreviewProps {
  projects: Project[];
}

export function TimelinePreview({ projects }: TimelinePreviewProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <Card className="border-[#E1E6EE] shadow-sm bg-white rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between py-4 px-6 border-b border-[#E1E6EE]">
        <CardTitle className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#4A5B78]" /> Timeline Overview
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-[#4A5B78] hover:text-[#263344] hover:bg-[#E8EEF5] text-xs font-bold">
          Full Timeline <ArrowRight className="w-3 h-3 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto scrollbar-thin">
          <div className="min-w-[600px] p-6">
            {/* Header Months */}
            <div className="flex mb-4 pl-32 border-b border-[#E1E6EE] pb-2">
              {months.map((month) => (
                <div key={month} className="flex-1 text-xs font-bold text-[#9CA3AF] uppercase text-center tracking-wider">
                  {month}
                </div>
              ))}
            </div>

            {/* Project Rows */}
            <div className="space-y-6">
              {projects.map((project, idx) => (
                <div key={project.id} className="relative flex items-center group">
                  {/* Project Name Label */}
                  <div className="w-32 flex-shrink-0 pr-4">
                    <div className="text-sm font-bold text-[#1A1F2C] truncate" title={project.title}>
                      {project.title}
                    </div>
                    <div className="text-[10px] text-[#6B7280] font-medium uppercase">{project.phase}</div>
                  </div>

                  {/* Gantt Bars Area */}
                  <div className="flex-1 relative h-8 bg-[#F7F9FC] rounded-lg border border-[#E1E6EE] overflow-hidden">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex">
                      {months.map((m) => (
                        <div key={m} className="flex-1 border-r border-[#E1E6EE] last:border-0" />
                      ))}
                    </div>

                    {/* Bar - Calculating pseudo random positions for demo */}
                    <div 
                      className={`absolute top-1.5 bottom-1.5 rounded-md shadow-sm transition-all duration-300 group-hover:scale-[1.02] ${
                        idx % 3 === 0 ? 'bg-[#4A5B78] left-[10%] w-[40%]' : // Slate Blue
                        idx % 3 === 1 ? 'bg-[#4CAF73] left-[30%] w-[50%]' : // Forest Mint
                        'bg-[#6F7EBC] left-[50%] w-[30%]' // Soft Indigo
                      }`}
                    >
                       <div className="w-full h-full opacity-0 group-hover:opacity-20 bg-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
