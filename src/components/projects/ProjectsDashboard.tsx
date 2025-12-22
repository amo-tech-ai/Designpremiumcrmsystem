import React, { useState } from 'react';
import { motion } from 'motion/react';
import { KPICards } from './KPICards';
import { ProjectCard, Project } from './ProjectCard';
import { GanttTimeline } from './GanttTimeline';
import { AIInsightsPanel } from './AIInsightsPanel';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { ProjectDetailSheet } from './ProjectDetailSheet';
import { Button } from '../ui/button';
import { Search, Filter, ArrowUpDown, Plus, LayoutGrid, List } from 'lucide-react';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Seed Fundraising Sprint',
    status: 'In Progress',
    progress: 45,
    dueDate: 'Apr 15',
    tags: ['Fundraising', 'Finance'],
    members: ['Alex', 'Sarah'],
    lastActivity: '2h ago',
    phase: 'Outreach',
  },
  {
    id: '2',
    title: 'MVP v1 Build',
    status: 'At Risk',
    progress: 62,
    dueDate: 'Mar 01',
    tags: ['Product', 'Engineering'],
    members: ['Mike', 'Dev'],
    lastActivity: '5m ago',
    phase: 'Development',
  },
  {
    id: '3',
    title: 'Q1 GTM Launch',
    status: 'Planning',
    progress: 15,
    dueDate: 'May 20',
    tags: ['Marketing', 'Sales'],
    members: ['Sarah', 'Jenny'],
    lastActivity: '1d ago',
    phase: 'Strategy',
  },
  {
    id: '4',
    title: 'Investor Pipeline Expansion',
    status: 'Completed',
    progress: 100,
    dueDate: 'Feb 10',
    tags: ['Fundraising'],
    members: ['Alex'],
    lastActivity: '3d ago',
    phase: 'Done',
  },
  {
    id: '5',
    title: 'Legal Incorporation & IP',
    status: 'In Progress',
    progress: 80,
    dueDate: 'Feb 28',
    tags: ['Legal', 'Ops'],
    members: ['Alex', 'Lawyer'],
    lastActivity: '4h ago',
    phase: 'Review',
  }
];

export function ProjectsDashboard() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'list' | 'gantt'>('list');

  const filteredProjects = SAMPLE_PROJECTS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] pb-20 font-sans text-[#1A1A1A]">
      
      {/* Header Section */}
      <div className="bg-[#F7F7F5] border-b border-[#E5E5E5] sticky top-0 z-30">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight">Project Overview</h1>
                  <p className="text-base text-[#6B7280] mt-2 font-sans">Manage your initiatives, deadlines, and deliverables.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F7F7F5] shadow-sm h-11 px-5 rounded-xl font-medium font-sans">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                    <Button className="bg-[#1A1A1A] hover:bg-black text-white shadow-md hover:shadow-lg h-11 px-5 rounded-xl font-medium font-sans transition-all duration-200 border-0">
                        <Plus className="w-4 h-4 mr-2" /> New Project
                    </Button>
                </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
                 <Tabs defaultValue="list" className="w-full sm:w-auto" onValueChange={(v) => setView(v as any)}>
                    <TabsList className="grid w-full sm:w-[240px] grid-cols-2 bg-white p-1 h-11 rounded-xl border border-[#E5E5E5] shadow-sm">
                        <TabsTrigger value="list" className="text-sm font-medium data-[state=active]:bg-[#F7F7F5] data-[state=active]:text-[#1A1A1A] text-[#6B7280] rounded-lg transition-all flex items-center justify-center gap-2 font-sans">
                          <List className="w-4 h-4" /> List View
                        </TabsTrigger>
                        <TabsTrigger value="gantt" className="text-sm font-medium data-[state=active]:bg-[#F7F7F5] data-[state=active]:text-[#1A1A1A] text-[#6B7280] rounded-lg transition-all flex items-center justify-center gap-2 font-sans">
                          <LayoutGrid className="w-4 h-4" /> Timeline
                        </TabsTrigger>
                    </TabsList>
                 </Tabs>
                 
                 <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <Input 
                        placeholder="Search projects..." 
                        className="pl-10 bg-white border-[#E5E5E5] focus-visible:ring-[#1A1A1A]/10 focus-visible:border-[#1A1A1A] h-11 text-sm rounded-xl placeholder:text-[#9CA3AF] text-[#1A1A1A] shadow-sm transition-all font-sans"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                 </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 py-10 space-y-10">
        {/* KPI Section - Assuming KPICards handles its own internal styling or inherits well */}
        <KPICards />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Left Column (Main - 3/4) */}
            <div className="xl:col-span-3 space-y-8">
                
                {view === 'list' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-6 border-b border-[#E5E5E5] bg-white">
                            <h2 className="text-xl font-serif font-medium text-[#1A1A1A] flex items-center gap-3">
                              Active Projects 
                              <span className="px-2.5 py-0.5 rounded-full bg-[#F7F7F5] text-[#6B7280] text-xs font-bold font-sans">
                                {filteredProjects.length}
                              </span>
                            </h2>
                            <Button variant="ghost" size="sm" className="h-9 text-[#6B7280] hover:text-[#1A1A1A] hover:bg-[#F7F7F5] rounded-lg font-medium font-sans">
                                <ArrowUpDown className="w-3.5 h-3.5 mr-2" /> Sort by Status
                            </Button>
                        </div>
                        <div className="divide-y divide-[#E5E5E5]">
                            {filteredProjects.map((project) => (
                                <ProjectCard 
                                    key={project.id} 
                                    project={project} 
                                    variant="row" 
                                    onClick={() => setSelectedProject(project)}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <GanttTimeline projects={SAMPLE_PROJECTS} />
                )}

            </div>

            {/* Right Column (Sidebar - 1/4) */}
            <div className="space-y-8">
                <AIInsightsPanel />
                <QuickActions />
                <ActivityFeed />
            </div>

        </div>
      </div>

      {/* Project Detail Drawer */}
      <ProjectDetailSheet 
         project={selectedProject} 
         isOpen={!!selectedProject} 
         onClose={() => setSelectedProject(null)} 
      />

    </div>
  );
}
