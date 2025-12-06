import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Presentation, 
  Target, 
  Search, 
  BarChart, 
  Map, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  MoreHorizontal, 
  Edit3, 
  Share2, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Bot,
  Zap,
  Layout,
  Type,
  Image as ImageIcon,
  MessageSquare,
  RefreshCw,
  Lightbulb,
  ShieldCheck,
  FileCheck,
  ChevronLeft,
  PanelRight,
  Bold,
  Italic,
  List,
  Columns
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

// Types
type ViewMode = 'dashboard' | 'editor';
type DocType = 'pitch-deck' | 'one-pager' | 'gtm' | 'market-research' | 'financial' | 'roadmap';

interface Document {
  id: string;
  title: string;
  type: string;
  lastEdited: string;
  status: 'Draft' | 'Final' | 'AI-Generated';
  author: string;
}

const RECENT_DOCS: Document[] = [
  { id: '1', title: 'Seed Round Pitch Deck v3', type: 'Pitch Deck', lastEdited: '2 hours ago', status: 'Draft', author: 'AD' },
  { id: '2', title: 'Q3 GTM Strategy', type: 'GTM Strategy', lastEdited: '1 day ago', status: 'AI-Generated', author: 'AI' },
  { id: '3', title: 'Market Analysis - Fintech', type: 'Market Research', lastEdited: '2 days ago', status: 'Final', author: 'AD' },
];

export const DocumentWorkspace = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F7F7FB] text-slate-900 font-sans">
      {/* 1. Page Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <span>Workspace</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-600 font-medium">
                {viewMode === 'dashboard' ? 'Dashboard' : 'Document Editor'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {viewMode === 'dashboard' ? 'Startup Document Workspace' : 'Seed Round Pitch Deck v3'}
            </h1>
            <p className="text-slate-500 mt-1">
              {viewMode === 'dashboard' 
                ? 'Generate, manage, and edit your core startup documents with AI.'
                : 'Last edited 2 hours ago • AI Assistant Active'
              }
            </p>
          </div>

          <div className="flex items-center gap-3">
            {viewMode === 'editor' && (
               <Button variant="ghost" onClick={() => setViewMode('dashboard')} className="text-slate-500">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back
               </Button>
            )}
            <Button variant="outline" className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
              <Plus className="w-4 h-4 mr-2" /> New Document
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 border-0">
              <Sparkles className="w-4 h-4 mr-2" /> Generate with AI
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12 pb-24">
        <AnimatePresence mode="wait">
          {viewMode === 'dashboard' ? (
            <DashboardView key="dashboard" onOpenDoc={() => setViewMode('editor')} />
          ) : (
            <EditorView key="editor" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// ------------------------------------------------------------------
// DASHBOARD VIEW
// ------------------------------------------------------------------

const DashboardView = ({ onOpenDoc }: { onOpenDoc: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Row 1: Document Categories */}
      <section>
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-xl font-bold text-slate-900">Create New</h2>
           <Button variant="link" className="text-indigo-600">View Templates</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DocCategoryCard 
            title="Pitch Deck" 
            desc="Investor-ready slides with narrative flow."
            icon={Presentation}
            color="from-blue-500 to-indigo-500"
            onClick={onOpenDoc}
          />
          <DocCategoryCard 
            title="One-Pager" 
            desc="Executive summary and key metrics."
            icon={FileText}
            color="from-emerald-500 to-teal-500"
            onClick={onOpenDoc}
          />
          <DocCategoryCard 
            title="GTM Strategy" 
            desc="Launch plans, channels, and loops."
            icon={Target}
            color="from-purple-500 to-pink-500"
            onClick={onOpenDoc}
          />
          <DocCategoryCard 
            title="Market Research" 
            desc="Competitor analysis and sizing."
            icon={Search}
            color="from-orange-500 to-red-500"
            onClick={onOpenDoc}
          />
          <DocCategoryCard 
            title="Financial Model" 
            desc="Projections, burn rate, and unit economics."
            icon={BarChart}
            color="from-cyan-500 to-blue-500"
            onClick={onOpenDoc}
          />
          <DocCategoryCard 
            title="Product Roadmap" 
            desc="Feature timeline and milestones."
            icon={Map}
            color="from-violet-500 to-purple-500"
            onClick={onOpenDoc}
          />
        </div>
      </section>

      {/* Row 2: AI Workflow Cards */}
      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">AI Assistants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AIWorkflowCard 
            title="Document Generator"
            desc="Create any startup document automatically using Gemini."
            icon={Sparkles}
            bg="bg-indigo-50"
            accent="text-indigo-600"
          />
          <AIWorkflowCard 
            title="AI Reviewer"
            desc="Analyze clarity, correctness, narrative flow, and missing elements."
            icon={CheckCircle2}
            bg="bg-emerald-50"
            accent="text-emerald-600"
          />
          <AIWorkflowCard 
            title="AI Insights Panel"
            desc="Surface risks, opportunities, and industry benchmarks."
            icon={Lightbulb}
            bg="bg-amber-50"
            accent="text-amber-600"
          />
        </div>
      </section>

      {/* Row 3: Recent Documents */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Documents</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Last Edited</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RECENT_DOCS.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={onOpenDoc}>
                  <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FileText className="w-4 h-4" />
                    </div>
                    {doc.title}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{doc.type}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.lastEdited}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className={cn(
                      "font-normal",
                      doc.status === 'Draft' && "bg-slate-100 text-slate-600",
                      doc.status === 'Final' && "bg-emerald-50 text-emerald-600",
                      doc.status === 'AI-Generated' && "bg-purple-50 text-purple-600",
                    )}>
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Workflow Diagram Section */}
      <section className="py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-8 text-center">Intelligent Document Workflow</h2>
        <div className="relative">
           {/* Connecting Line */}
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 hidden md:block" />
           
           <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <WorkflowNode step="1" title="Choose Doc" icon={Layout} />
              <WorkflowNode step="2" title="Input Info" icon={Type} />
              <WorkflowNode step="3" title="AI Draft" icon={Sparkles} active />
              <WorkflowNode step="4" title="Edit" icon={Edit3} />
              <WorkflowNode step="5" title="AI Review" icon={ShieldCheck} />
              <WorkflowNode step="6" title="Export" icon={Download} />
           </div>
        </div>
      </section>

      {/* 5. AI User Journey Section */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm">
        <div className="text-center mb-10">
          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 mb-4">AI Architecture</Badge>
          <h2 className="text-2xl font-bold text-slate-900">How StartupAI Powers Your Documents</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
           {/* Step 1 */}
           <div className="space-y-4 relative">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full">
                 <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-slate-600 border border-slate-100">
                    <Zap className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-2">Context Ingestion</h3>
                 <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> User Inputs</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> URL Scraper</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-300" /> RAG Knowledge</li>
                 </ul>
              </div>
              <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 text-slate-300 w-5 h-5" />
           </div>

           {/* Step 2 */}
           <div className="space-y-4 relative">
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 h-full">
                 <div className="w-10 h-10 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center mb-4 text-white">
                    <Bot className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-2">AI Processing</h3>
                 <p className="text-sm text-slate-600 mb-3">Gemini Pro 1.5 processes context and generates structured drafts.</p>
                 <Badge variant="outline" className="bg-white text-indigo-600 border-indigo-200">Processing...</Badge>
              </div>
              <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 text-slate-300 w-5 h-5" />
           </div>

           {/* Step 3 */}
           <div className="space-y-4 relative">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-full">
                 <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-slate-600 border border-slate-100">
                    <Edit3 className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-2">Refinement Loop</h3>
                 <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Collaborative Edit</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> AI Suggestions</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Style Matching</li>
                 </ul>
              </div>
              <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 text-slate-300 w-5 h-5" />
           </div>

           {/* Step 4 */}
           <div className="space-y-4">
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 h-full">
                 <div className="w-10 h-10 bg-emerald-600 rounded-full shadow-lg shadow-emerald-200 flex items-center justify-center mb-4 text-white">
                    <FileCheck className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900 mb-2">Final Output</h3>
                 <p className="text-sm text-slate-600">Export to PDF, PPTX, or share via live link.</p>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// EDITOR VIEW
// ------------------------------------------------------------------

const EditorView = () => {
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="h-[calc(100vh-12rem)] min-h-[600px] flex flex-col md:flex-row gap-6"
    >
      {/* Left Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col hidden md:flex">
         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Outline</h3>
         <div className="flex-grow space-y-1 overflow-y-auto">
            {['Problem Statement', 'Solution', 'Market Size', 'Business Model', 'Competition', 'Go-to-Market', 'Team', 'Financials'].map((item, i) => (
               <button key={item} className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  i === 0 ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"
               )}>
                  {i + 1}. {item}
               </button>
            ))}
         </div>
         <div className="pt-4 border-t border-slate-100 mt-2">
            <Button variant="outline" className="w-full justify-start text-slate-600">
               <Plus className="w-4 h-4 mr-2" /> Add Section
            </Button>
         </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-grow bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
         {/* Toolbar */}
         <div className="border-b border-slate-100 p-2 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:text-indigo-600"><Bold className="w-4 h-4" /></Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:text-indigo-600"><Italic className="w-4 h-4" /></Button>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:text-indigo-600"><List className="w-4 h-4" /></Button>
               <div className="w-px h-4 bg-slate-200 mx-2" />
               <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-white hover:text-indigo-600"><ImageIcon className="w-4 h-4" /></Button>
            </div>
            <div className="flex items-center gap-2">
               <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                  className={cn("h-8 px-2 text-slate-500 gap-2 hover:bg-white hover:text-indigo-600", isAiPanelOpen && "bg-indigo-50 text-indigo-600")}
               >
                  <PanelRight className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:inline">{isAiPanelOpen ? 'Hide AI' : 'Show AI'}</span>
               </Button>
            </div>
         </div>

         <div className="flex-grow overflow-y-auto p-8 md:p-12 relative">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="space-y-2">
                   <input 
                      type="text" 
                      defaultValue="The Problem" 
                      className="text-3xl font-bold text-slate-900 w-full border-none focus:ring-0 p-0 placeholder:text-slate-300 bg-transparent"
                   />
                   <div className="h-1 w-20 bg-indigo-500 rounded-full" />
                </div>

                <div className="prose prose-slate max-w-none">
                   <p className="text-lg text-slate-600 leading-relaxed">
                      Startups struggle to create high-quality, investor-ready documents efficiently. Founders spend <span className="bg-yellow-100 px-1 rounded">too much time formatting</span> and not enough time iterating on strategy.
                   </p>
                   <div className="my-6 p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 min-h-[200px] cursor-pointer hover:bg-slate-100 transition-colors border-dashed border-2">
                      <div className="text-center">
                         <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                         <span className="text-sm font-medium">Drag & drop image or generate with AI</span>
                      </div>
                   </div>
                   <p className="text-lg text-slate-600 leading-relaxed">
                      Existing tools are either too simple (Google Docs) or too complex (Design tools). There is no "middle layer" that combines intelligence with structure.
                   </p>
                   <ul className="list-disc pl-5 space-y-2 text-slate-600">
                      <li>Fragmented workflows across 5+ tools</li>
                      <li>Lack of design expertise</li>
                      <li>Writer's block on critical sections</li>
                   </ul>
                </div>
            </div>
         </div>
      </div>

      {/* Right AI Panel */}
      <AnimatePresence>
        {isAiPanelOpen && (
          <motion.div
             initial={{ width: 0, opacity: 0 }}
             animate={{ width: "auto", opacity: 1 }}
             exit={{ width: 0, opacity: 0 }}
             transition={{ duration: 0.3, ease: "easeInOut" }}
             className="flex-shrink-0 overflow-hidden"
          >
             <div className="w-full md:w-80 h-full bg-white rounded-2xl border border-slate-200 p-0 flex flex-col shadow-lg shadow-indigo-100/50">
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-[#8b5cf6] to-[#d946ef] text-white flex items-center justify-between">
                   <div className="flex items-center gap-2 font-bold">
                      <Sparkles className="w-4 h-4" />
                      AI Assistant
                   </div>
                   <Button size="icon" variant="ghost" className="h-6 w-6 text-white hover:bg-white/20"><MoreHorizontal className="w-4 h-4" /></Button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-[#FAFAFE]">
                   
                   {/* Suggestion Card */}
                   <div className="bg-[#EEF2FF] rounded-xl p-4 border border-[#E0E7FF] shadow-sm">
                      <h4 className="text-sm font-bold text-[#3730A3] mb-2 flex items-center gap-2">
                         <Lightbulb className="w-4 h-4 text-[#4F46E5]" />
                         Suggestion
                      </h4>
                      <p className="text-sm text-[#4338CA] mb-4 leading-relaxed">
                         This section focuses heavily on the "what" but misses the "why". Consider adding a specific example of a user pain point.
                      </p>
                      <Button className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-sm font-medium rounded-lg">
                         Apply Fix
                      </Button>
                   </div>

                   {/* Quick Actions */}
                   <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                         <QuickActionBtn icon={RefreshCw} label="Rewrite" color="text-blue-500" />
                         <QuickActionBtn icon={MessageSquare} label="Expand" color="text-purple-500" />
                         <QuickActionBtn icon={Search} label="Research" color="text-indigo-500" />
                         <QuickActionBtn icon={CheckCircle2} label="Grammar" color="text-emerald-500" />
                      </div>
                   </div>

                </div>
                
                <div className="p-4 border-t border-slate-100 bg-white">
                   <div className="relative">
                      <input 
                         type="text" 
                         placeholder="Ask AI to edit..." 
                         className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                      <Button size="icon" className="absolute right-1 top-1 h-7 w-7 bg-indigo-600 hover:bg-indigo-700 rounded-md">
                         <ArrowRight className="w-3 h-3 text-white" />
                      </Button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ------------------------------------------------------------------
// HELPER COMPONENTS
// ------------------------------------------------------------------

const DocCategoryCard = ({ title, desc, icon: Icon, color, onClick }: any) => (
  <motion.button 
    whileHover={{ y: -4, shadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
    onClick={onClick}
    className="bg-white rounded-xl p-6 text-left border border-slate-100 shadow-sm relative overflow-hidden group w-full"
  >
    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-md`}>
       <Icon className="w-6 h-6" />
    </div>
    <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
    <p className="text-sm text-slate-500 mb-4 h-10">{desc}</p>
    <div className="flex items-center text-sm font-medium text-slate-400 group-hover:text-indigo-600 transition-colors">
       Create Doc <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
    </div>
  </motion.button>
);

const AIWorkflowCard = ({ title, desc, icon: Icon, bg, accent }: any) => (
  <div className={`rounded-2xl p-6 ${bg} border border-transparent hover:border-opacity-50 hover:shadow-md transition-all`}>
     <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center ${accent} mb-3 shadow-sm`}>
        <Icon className="w-4 h-4" />
     </div>
     <h3 className={`font-bold text-slate-900 mb-2`}>{title}</h3>
     <p className="text-sm text-slate-600">{desc}</p>
  </div>
);

const WorkflowNode = ({ step, title, icon: Icon, active }: any) => (
  <div className="flex flex-col items-center relative z-10">
     <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center border-4 border-[#F7F7FB] transition-all duration-300",
        active 
           ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110" 
           : "bg-white text-slate-400 border-slate-100"
     )}>
        <Icon className="w-5 h-5" />
     </div>
     <div className="mt-3 text-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Step {step}</span>
        <span className={cn("font-medium text-sm", active ? "text-indigo-700" : "text-slate-600")}>{title}</span>
     </div>
  </div>
);

const QuickActionBtn = ({ icon: Icon, label, color }: any) => (
  <button className="flex flex-col items-start p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left">
    <Icon className={`w-5 h-5 mb-2 ${color}`} />
    <span className="text-sm font-medium text-slate-700">{label}</span>
  </button>
);
