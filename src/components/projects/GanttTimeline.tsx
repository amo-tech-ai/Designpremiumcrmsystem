import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  format, 
  addDays, 
  addWeeks,
  addMonths,
  startOfWeek, 
  endOfWeek, 
  startOfMonth,
  endOfMonth,
  eachDayOfInterval, 
  eachWeekOfInterval,
  eachMonthOfInterval,
  isSameDay, 
  isSameWeek,
  isSameMonth,
  differenceInDays,
  parseISO,
  isValid
} from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Filter, 
  Layers,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '../ui/sheet';
import { Project } from './ProjectCard';
import { cn } from '../ui/utils';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

// --- Types ---

interface GanttTask extends Project {
  startDate: Date;
  endDate: Date;
  originalIndex: number;
}

type ViewMode = 'day' | 'week' | 'month';

interface GanttTimelineProps {
  projects: Project[];
}

// --- Constants ---

const COLUMN_WIDTH = {
  day: 60,
  week: 160,
  month: 220,
};

// Updated Pastel Phase Colors
const PHASE_COLORS: Record<string, string> = {
  'Discovery': 'bg-[#4A5B78]', // Slate Blue (Primary)
  'Design': 'bg-[#6F7EBC]', // Pastel Indigo (Accent 1)
  'Development': 'bg-[#263344]', // Deep Slate (Primary Dark)
  'Testing': 'bg-[#F6DFA9]', // Honey Pastel (Warning)
  'Launch': 'bg-[#A8E6C1]', // Mint Pastel (Success)
  // Fallbacks
  'Strategy': 'bg-[#6B7280]',
  'Outreach': 'bg-[#6F7EBC]',
  'Done': 'bg-[#A8E6C1]',
  'Review': 'bg-[#F6DFA9]',
};

// Light versions for Badges
const PHASE_COLORS_LIGHT: Record<string, string> = {
  'Discovery': 'bg-[#E8EEF5] text-[#4A5B78]',
  'Design': 'bg-[#C9D7F2] text-[#6F7EBC]',
  'Development': 'bg-[#E1E6EE] text-[#263344]',
  'Testing': 'bg-[#F6DFA9]/20 text-[#E0B45A]',
  'Launch': 'bg-[#A8E6C1]/20 text-[#4CAF73]',
  // Fallbacks
  'Strategy': 'bg-[#F7F9FC] text-[#6B7280]',
  'Outreach': 'bg-[#C9D7F2] text-[#6F7EBC]',
  'Done': 'bg-[#A8E6C1]/20 text-[#4CAF73]',
  'Review': 'bg-[#F6DFA9]/20 text-[#E0B45A]',
};

// --- Helper Functions ---

const generateDateRange = (viewMode: ViewMode, tasks: GanttTask[]) => {
  if (tasks.length === 0) return { start: new Date(), end: addMonths(new Date(), 1) };

  let minDate = tasks[0].startDate;
  let maxDate = tasks[0].endDate;

  tasks.forEach(t => {
    if (t.startDate < minDate) minDate = t.startDate;
    if (t.endDate > maxDate) maxDate = t.endDate;
  });

  if (viewMode === 'day') {
    return { start: addDays(minDate, -3), end: addDays(maxDate, 7) };
  } else if (viewMode === 'week') {
    return { start: startOfWeek(addWeeks(minDate, -1)), end: endOfWeek(addWeeks(maxDate, 2)) };
  } else {
    return { start: startOfMonth(addMonths(minDate, -1)), end: endOfMonth(addMonths(maxDate, 2)) };
  }
};

const getColumns = (viewMode: ViewMode, start: Date, end: Date) => {
  if (viewMode === 'day') {
    return eachDayOfInterval({ start, end });
  } else if (viewMode === 'week') {
    return eachWeekOfInterval({ start, end });
  } else {
    return eachMonthOfInterval({ start, end });
  }
};

// --- Component ---

export function GanttTimeline({ projects }: GanttTimelineProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [tasks, setTasks] = useState<GanttTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  const [draggingTask, setDraggingTask] = useState<{ id: string, type: 'move' | 'resize-l' | 'resize-r', startX: number, originalStart: Date, originalEnd: Date } | null>(null);
  const [filterPhase, setFilterPhase] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializedTasks = projects.map((p, i) => {
      const today = new Date();
      const start = addWeeks(today, i * 1.5 - 2); 
      const duration = 14 + (i % 3) * 7; 
      const end = addDays(start, duration);
      
      return {
        ...p,
        startDate: start,
        endDate: end,
        originalIndex: i
      };
    });
    setTasks(initializedTasks);
  }, [projects]);

  const filteredTasks = useMemo(() => {
    if (!filterPhase) return tasks;
    return tasks.filter(t => t.phase === filterPhase);
  }, [tasks, filterPhase]);

  const dateRange = useMemo(() => generateDateRange(viewMode, tasks), [viewMode, tasks]);
  const columns = useMemo(() => getColumns(viewMode, dateRange.start, dateRange.end), [viewMode, dateRange]);
  
  const totalWidth = columns.length * COLUMN_WIDTH[viewMode];

  const getXPosition = (date: Date) => {
    const daysFromStart = differenceInDays(date, dateRange.start);
    
    if (viewMode === 'day') {
      return daysFromStart * COLUMN_WIDTH.day;
    } else if (viewMode === 'week') {
      const weeksFromStart = daysFromStart / 7;
      return weeksFromStart * COLUMN_WIDTH.week;
    } else {
      const monthsFromStart = (date.getFullYear() - dateRange.start.getFullYear()) * 12 + (date.getMonth() - dateRange.start.getMonth());
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      const dayRatio = (date.getDate() - 1) / daysInMonth;
      return (monthsFromStart + dayRatio) * COLUMN_WIDTH.month;
    }
  };

  const handleMouseDown = (e: React.MouseEvent, task: GanttTask, type: 'move' | 'resize-l' | 'resize-r') => {
    e.stopPropagation();
    setDraggingTask({
      id: task.id,
      type,
      startX: e.clientX,
      originalStart: task.startDate,
      originalEnd: task.endDate
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggingTask) return;

      const deltaX = e.clientX - draggingTask.startX;
      
      let pxPerDay = 0;
      if (viewMode === 'day') pxPerDay = COLUMN_WIDTH.day;
      else if (viewMode === 'week') pxPerDay = COLUMN_WIDTH.week / 7;
      else pxPerDay = COLUMN_WIDTH.month / 30.44;

      const daysDelta = deltaX / pxPerDay;
      
      setTasks(prev => prev.map(t => {
        if (t.id !== draggingTask.id) return t;

        if (draggingTask.type === 'move') {
          return {
            ...t,
            startDate: addDays(draggingTask.originalStart, daysDelta),
            endDate: addDays(draggingTask.originalEnd, daysDelta)
          };
        } else if (draggingTask.type === 'resize-l') {
          const newStart = addDays(draggingTask.originalStart, daysDelta);
          if (newStart >= t.endDate) return t;
          return { ...t, startDate: newStart };
        } else {
          const newEnd = addDays(draggingTask.originalEnd, daysDelta);
          if (newEnd <= t.startDate) return t;
          return { ...t, endDate: newEnd };
        }
      }));
    };

    const handleMouseUp = () => {
      if (draggingTask) {
        setDraggingTask(null);
      }
    };

    if (draggingTask) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingTask, viewMode]);

  return (
    <Card className="border-[#E1E6EE] shadow-sm overflow-hidden bg-white rounded-2xl">
      {/* 1. Header Row (Controls) */}
      <div className="flex flex-col md:flex-row items-center justify-between p-5 border-b border-[#E1E6EE] gap-4 bg-white z-20 relative">
        <Tabs defaultValue="week" value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-auto">
            <TabsList className="grid w-[240px] grid-cols-3 h-9 bg-[#F7F9FC] p-1 border border-[#E1E6EE] rounded-lg">
                <TabsTrigger value="day" className="text-xs font-medium h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#4A5B78] text-[#6B7280]">Day</TabsTrigger>
                <TabsTrigger value="week" className="text-xs font-medium h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#4A5B78] text-[#6B7280]">Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs font-medium h-7 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#4A5B78] text-[#6B7280]">Month</TabsTrigger>
            </TabsList>
        </Tabs>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-white border-[#E1E6EE] text-[#6B7280] hover:bg-[#F7F9FC] hover:text-[#4A5B78] font-medium rounded-lg">
                <Filter className="w-3.5 h-3.5 mr-2 text-[#9CA3AF]" />
                {filterPhase || 'Filter Phase'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border-[#E1E6EE]">
              <DropdownMenuItem onClick={() => setFilterPhase(null)} className="text-[#1A1F2C] focus:bg-[#F7F9FC]">
                All Phases
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#E1E6EE]" />
              {Array.from(new Set(tasks.map(t => t.phase))).map(phase => (
                <DropdownMenuItem key={phase} onClick={() => setFilterPhase(phase)} className="text-[#1A1F2C] focus:bg-[#F7F9FC]">
                  <div className={cn("w-2 h-2 rounded-full mr-2", PHASE_COLORS[phase] || 'bg-[#9CA3AF]')} />
                  {phase}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="h-9 text-[#6B7280] hover:bg-[#F7F9FC] rounded-lg font-medium">
             <Layers className="w-3.5 h-3.5 mr-2" /> Legend
          </Button>
        </div>
      </div>

      <CardContent className="p-0 relative">
        {/* Mobile List View */}
        <div className="md:hidden p-4 space-y-3 bg-[#F7F9FC] max-h-[500px] overflow-y-auto">
          {filteredTasks.map(task => (
             <div 
               key={task.id} 
               className="bg-white border border-[#E1E6EE] rounded-xl p-4 shadow-sm active:scale-[0.98] transition-transform"
               onClick={() => { setSelectedTask(task); setIsDrawerOpen(true); }}
             >
                <div className="flex justify-between items-start mb-3">
                   <h4 className="font-bold text-[#1A1F2C] text-sm leading-tight">{task.title}</h4>
                   <Badge variant="secondary" className="text-[10px] h-5 font-bold shrink-0 ml-2 bg-[#F7F9FC] text-[#6B7280]">{task.phase}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-[#6B7280] mb-3">
                   <div className="flex items-center gap-1.5 font-medium">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      <span>{format(task.startDate, 'MMM d')} - {format(task.endDate, 'MMM d')}</span>
                   </div>
                   <div className="font-bold text-[#4A5B78]">{(differenceInDays(task.endDate, task.startDate) / 7).toFixed(1)}w</div>
                </div>

                <div className="relative h-2 w-full bg-[#E8EEF5] rounded-full overflow-hidden">
                   <div className={cn("absolute inset-y-0 left-0 rounded-full", PHASE_COLORS[task.phase])} style={{ width: `${task.progress}%` }} />
                </div>
             </div>
          ))}
        </div>

        {/* Desktop Gantt View */}
        <div className="hidden md:flex flex-col h-[600px]">
          
          {/* Timeline Container */}
          <div className="flex-1 overflow-auto relative scrollbar-thin" ref={containerRef}>
            <div style={{ width: Math.max(totalWidth, 800), minHeight: '100%' }} className="relative bg-[#F7F9FC]/50">
              
              {/* Grid Header */}
              <div className="sticky top-0 z-10 flex border-b border-[#E1E6EE] bg-white/95 backdrop-blur-sm h-[50px]">
                {columns.map((col, i) => (
                  <div 
                    key={i} 
                    style={{ width: COLUMN_WIDTH[viewMode] }}
                    className="flex-shrink-0 border-r border-[#E1E6EE] p-2 text-center flex flex-col justify-center"
                  >
                    <span className="text-xs font-bold text-[#1A1F2C]">
                      {viewMode === 'day' ? format(col, 'EEE d') : 
                       viewMode === 'week' ? `Week ${format(col, 'w')}` : 
                       format(col, 'MMMM yyyy')}
                    </span>
                    {viewMode === 'week' && (
                      <span className="text-[10px] text-[#6B7280] font-medium mt-0.5">
                        {format(col, 'MMM d')}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid Body */}
              <div className="relative min-h-[550px]">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {columns.map((col, i) => (
                    <div 
                      key={i} 
                      style={{ width: COLUMN_WIDTH[viewMode] }}
                      className="flex-shrink-0 border-r border-[#E1E6EE] h-full"
                    />
                  ))}
                </div>

                {/* Tasks Rows */}
                <div className="pt-6 pb-12 space-y-3">
                  {filteredTasks.map((task) => {
                    const xStart = getXPosition(task.startDate);
                    const xEnd = getXPosition(task.endDate);
                    const width = Math.max(xEnd - xStart, 10);

                    const durationWeeks = (differenceInDays(task.endDate, task.startDate) / 7).toFixed(1);
                    const isHovered = hoveredTask === task.id;

                    return (
                      <div 
                        key={task.id} 
                        className="relative h-10 flex items-center group"
                        onMouseEnter={() => setHoveredTask(task.id)}
                        onMouseLeave={() => setHoveredTask(null)}
                      >
                         <div
                            className={cn(
                              "absolute h-8 rounded-lg shadow-sm flex items-center px-3 cursor-pointer select-none transition-all",
                              PHASE_COLORS[task.phase] || 'bg-[#6B7280]',
                              isHovered ? "shadow-md ring-2 ring-white ring-offset-2 ring-offset-[#F7F9FC] z-10" : "opacity-90 hover:opacity-100"
                            )}
                            style={{ 
                              left: xStart, 
                              width: width,
                              transform: 'translate3d(0,0,0)' 
                            }}
                            onMouseDown={(e) => handleMouseDown(e, task, 'move')}
                            onClick={() => {
                              setSelectedTask(task);
                              setIsDrawerOpen(true);
                            }}
                         >
                            {/* Drag Handles */}
                            <div 
                                className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/20 rounded-l-lg"
                                onMouseDown={(e) => handleMouseDown(e, task, 'resize-l')}
                            />
                            <div 
                                className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-white/20 rounded-r-lg"
                                onMouseDown={(e) => handleMouseDown(e, task, 'resize-r')}
                            />

                            <span className="text-white text-xs font-bold truncate mix-blend-plus-lighter pl-1 text-shadow-sm">
                              {task.title}
                            </span>
                            
                            {/* Tooltip */}
                            <AnimatePresence>
                              {isHovered && !draggingTask && (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: -45 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-white rounded-xl shadow-xl border border-[#E1E6EE] p-4 z-50 pointer-events-none text-left"
                                >
                                  <div className="flex items-center gap-2 mb-1.5">
                                    <div className={cn("w-2 h-2 rounded-full", PHASE_COLORS[task.phase] || 'bg-[#6B7280]')} />
                                    <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{task.phase}</span>
                                  </div>
                                  <h4 className="font-bold text-[#1A1F2C] text-sm mb-2">{task.title}</h4>
                                  <div className="flex justify-between text-xs text-[#6B7280] border-t border-[#F7F9FC] pt-2">
                                     <span>{format(task.startDate, 'MMM d')} - {format(task.endDate, 'MMM d')}</span>
                                     <span className="font-bold text-[#4A5B78]">{durationWeeks} weeks</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legend */}
          <div className="border-t border-[#E1E6EE] bg-white p-3 flex flex-wrap gap-6 items-center text-xs justify-center shrink-0 z-20">
            {Object.entries(PHASE_COLORS).slice(0, 5).map(([phase, colorClass]) => (
              <div key={phase} className="flex items-center gap-2">
                <div className={cn("w-2.5 h-2.5 rounded-full", colorClass)} />
                <span className="text-[#6B7280] font-medium">{phase}</span>
              </div>
            ))}
          </div>

        </div>
      </CardContent>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-white border-l border-[#E1E6EE]">
          {selectedTask && (
            <div className="space-y-6">
              <SheetHeader className="pb-4 border-b border-[#E1E6EE]">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className={cn("rounded-md px-2 py-0.5 border-0 font-bold", PHASE_COLORS_LIGHT[selectedTask.phase] || 'bg-[#F7F9FC] text-[#6B7280]')}>
                    {selectedTask.phase}
                  </Badge>
                  <Badge variant="outline" className="border-[#E1E6EE] text-[#6B7280] font-medium">
                    {selectedTask.status}
                  </Badge>
                </div>
                <SheetTitle className="text-xl font-bold text-[#1A1F2C]">{selectedTask.title}</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#6B7280] text-xs uppercase font-bold tracking-wider">Start Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-[#9CA3AF]" />
                      <Input 
                        type="date" 
                        value={format(selectedTask.startDate, 'yyyy-MM-dd')} 
                        readOnly
                        className="pl-9 h-10 bg-[#F7F9FC] border-[#E1E6EE] text-[#1A1F2C] rounded-lg focus-visible:ring-[#4A5B78]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#6B7280] text-xs uppercase font-bold tracking-wider">Due Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-[#9CA3AF]" />
                      <Input 
                        type="date" 
                        value={format(selectedTask.endDate, 'yyyy-MM-dd')} 
                        readOnly
                        className="pl-9 h-10 bg-[#F7F9FC] border-[#E1E6EE] text-[#1A1F2C] rounded-lg focus-visible:ring-[#4A5B78]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <Label className="text-[#6B7280] font-bold">Completion</Label>
                    <span className="font-bold text-[#1A1F2C]">{selectedTask.progress}%</span>
                  </div>
                  <div className="h-2.5 bg-[#E8EEF5] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4A5B78] rounded-full" style={{ width: `${selectedTask.progress}%` }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#6B7280] text-xs uppercase font-bold tracking-wider">Assigned Team</Label>
                  <div className="flex gap-2">
                    {selectedTask.members.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 bg-white border border-[#E1E6EE] rounded-full px-2 py-1 pr-3 shadow-sm">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#E8EEF5] text-[#4A5B78] text-[10px] font-bold">{m.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-semibold text-[#1A1F2C]">{m}</span>
                      </div>
                    ))}
                    <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-dashed border-[#E1E6EE] hover:border-[#4A5B78] hover:bg-[#F7F9FC] hover:text-[#4A5B78]">
                      <span className="text-[#9CA3AF] text-lg leading-none mb-0.5 group-hover:text-[#4A5B78]">+</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#6B7280] text-xs uppercase font-bold tracking-wider">Notes</Label>
                  <div className="p-4 bg-[#F7F9FC] rounded-xl border border-[#E1E6EE] min-h-[100px] text-sm text-[#6B7280] italic">
                    No additional notes for this task.
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-8 pt-4 border-t border-[#E1E6EE] flex sm:justify-between gap-4">
                 <Button variant="ghost" className="text-[#D56565] hover:bg-[#F2B6B6]/20 hover:text-[#D56565] font-medium" onClick={() => setIsDrawerOpen(false)}>
                   Delete Task
                 </Button>
                 <div className="flex gap-3">
                   <Button variant="outline" onClick={() => setIsDrawerOpen(false)} className="border-[#E1E6EE] text-[#6B7280] hover:text-[#1A1F2C] hover:bg-[#F7F9FC] font-medium rounded-lg">Cancel</Button>
                   <Button onClick={() => setIsDrawerOpen(false)} className="bg-[#4A5B78] hover:bg-[#263344] text-white rounded-lg font-bold shadow-sm border-0">Save Changes</Button>
                 </div>
              </SheetFooter>

            </div>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
}
