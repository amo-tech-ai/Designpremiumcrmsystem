import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { ScrollArea, ScrollBar } from '../../ui/scroll-area';
import { Project } from './types';

interface TimelinePreviewProps {
  projects: Project[];
}

export function TimelinePreview({ projects }: TimelinePreviewProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-semibold text-slate-900">Timeline Preview</CardTitle>
          <div className="flex gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Active</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <span>Planned</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="min-w-[500px]">
            {/* Header */}
            <div className="flex border-b border-slate-100 pb-2 mb-4">
              <div className="w-32 shrink-0" />
              <div className="flex-1 grid grid-cols-6 gap-0">
                {months.map(m => (
                  <div key={m} className="text-xs font-medium text-slate-400 text-center">{m}</div>
                ))}
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-4">
              {projects.map((project, i) => (
                <div key={project.id} className="flex items-center group">
                  <div className="w-32 shrink-0 truncate pr-4 text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </div>
                  <div className="flex-1 relative h-6 bg-slate-50 rounded-full overflow-hidden">
                    {/* Simulated bars based on index for variety */}
                    <div 
                      className={`absolute top-1 bottom-1 rounded-full opacity-90 transition-all group-hover:opacity-100 ${
                        project.status === 'On Track' ? 'bg-emerald-400' : 
                        project.status === 'At Risk' ? 'bg-amber-400' :
                        project.status === 'Delayed' ? 'bg-rose-400' : 'bg-blue-400'
                      }`}
                      style={{ 
                        left: `${(i * 15) + 5}%`, 
                        width: `${30 + (i * 10)}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
