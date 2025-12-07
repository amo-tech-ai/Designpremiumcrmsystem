import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Bot, 
  Send, 
  Save, 
  Download, 
  ArrowRight, 
  MoreHorizontal, 
  Edit3, 
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  FileText,
  Presentation,
  Users,
  Target,
  ListTodo,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";

// --- Types & Data ---

type CanvasSection = {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
  row: 'top' | 'middle' | 'bottom';
  colSpan?: number;
  color?: string;
};

const canvasSections: CanvasSection[] = [
  // Top Row (Standard Lean Canvas Columns 1-5, Top/Middle split)
  {
    id: 'problem',
    title: 'Problem',
    subtitle: 'List your top 1-3 problems.',
    content: [
      'Freelancers waste 8+ hours/month doing manual bookkeeping',
      'High error rate leads to tax penalties',
      'Receipts difficult to track in real time'
    ],
    row: 'top',
    color: 'border-red-200 bg-red-50/30'
  },
  {
    id: 'solution',
    title: 'Solution',
    subtitle: 'Outline a possible solution for each problem.',
    content: [
      'AI bookkeeping assistant',
      'Auto-categorization',
      'AI tax estimator'
    ],
    row: 'top',
    color: 'border-green-200 bg-green-50/30'
  },
  {
    id: 'uvp',
    title: 'Unique Value Proposition',
    subtitle: 'Single, clear, compelling message.',
    content: [
      'The fastest way for freelancers to stay tax-ready with zero effort.'
    ],
    row: 'top',
    color: 'border-indigo-200 bg-indigo-50/30'
  },
  {
    id: 'unfair-advantage',
    title: 'Unfair Advantage',
    subtitle: 'Something that cannot be easily bought or copied.',
    content: [
      'Proprietary AI tax classifier',
      'Banking data integrations competitors lack'
    ],
    row: 'top',
    color: 'border-amber-200 bg-amber-50/30'
  },
  {
    id: 'customer-segments',
    title: 'Customer Segments',
    subtitle: 'List your target customers and users.',
    content: [
      'Freelancers',
      'Creators',
      'Remote consultants'
    ],
    row: 'top',
    color: 'border-blue-200 bg-blue-50/30'
  },
  // Middle Row Items (conceptually "below" the top items in standard layout)
  {
    id: 'existing-alternatives',
    title: 'Existing Alternatives',
    subtitle: 'How these problems are solved today.',
    content: [
      'QuickBooks',
      'Excel',
      'Manual notebooks'
    ],
    row: 'middle', // Positioned under Problem
    color: 'border-slate-200 bg-slate-50/50'
  },
  {
    id: 'key-metrics',
    title: 'Key Metrics',
    subtitle: 'Key numbers that tell you how your business is doing.',
    content: [
      'Monthly Active Users',
      'AI Accuracy Rate',
      'Retention (D30)'
    ],
    row: 'middle', // Positioned under Solution
    color: 'border-slate-200 bg-slate-50/50'
  },
  {
    id: 'high-level-concept',
    title: 'High-Level Concept',
    subtitle: 'Your X for Y analogy.',
    content: [
      'Mint.com for freelancers.'
    ],
    row: 'middle', // Positioned under UVP
    color: 'border-slate-200 bg-slate-50/50'
  },
  {
    id: 'channels',
    title: 'Channels',
    subtitle: 'Path to customers.',
    content: [
      'TikTok influencer ads',
      'YouTube tutorials',
      'LinkedIn content'
    ],
    row: 'middle', // Positioned under Unfair Advantage
    color: 'border-slate-200 bg-slate-50/50'
  },
  {
    id: 'early-adopters',
    title: 'Early Adopters',
    subtitle: 'Characteristics of ideal customers.',
    content: [
      'Consultants earning over $80k',
      'Digital nomads'
    ],
    row: 'middle', // Positioned under Customer Segments
    color: 'border-slate-200 bg-slate-50/50'
  },
  // Bottom Row
  {
    id: 'cost-structure',
    title: 'Cost Structure',
    subtitle: 'List your fixed and variable costs.',
    content: [
      'Cloud compute usage',
      'AI inference costs',
      'Payroll',
      'Customer support'
    ],
    row: 'bottom',
    colSpan: 1, // Will handle span in grid logic
    color: 'border-orange-200 bg-orange-50/30'
  },
  {
    id: 'revenue-streams',
    title: 'Revenue Streams',
    subtitle: 'List your sources of revenue.',
    content: [
      '$15/mo subscriptions',
      'Premium tax service add-on',
      'Affiliate revenue'
    ],
    row: 'bottom',
    colSpan: 1,
    color: 'border-emerald-200 bg-emerald-50/30'
  }
];

const journeySteps = [
  { id: 'profile', label: 'Startup Profile', icon: FileText, status: 'complete' },
  { id: 'canvas', label: 'Lean Canvas', icon: LayoutGrid, status: 'current' },
  { id: 'deck', label: 'Pitch Deck', icon: Presentation, status: 'pending' },
  { id: 'gtm', label: 'GTM Strategy', icon: Target, status: 'pending' },
  { id: 'personas', label: 'CRM Personas', icon: Users, status: 'pending' },
  { id: 'tasks', label: 'Tasks', icon: ListTodo, status: 'pending' },
];

// --- Components ---

const CanvasCard = ({ section, isAiThinking }: { section: CanvasSection, isAiThinking: boolean }) => {
  return (
    <div className={cn(
      "relative flex flex-col p-4 md:p-5 h-full bg-white rounded-xl border transition-all duration-300 group hover:shadow-md",
      section.color,
      section.row === 'bottom' ? 'min-h-[200px]' : 'min-h-[280px]'
    )}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm md:text-base uppercase tracking-tight">{section.title}</h3>
          <p className="text-[10px] md:text-xs text-slate-500 leading-tight mt-1 max-w-[90%]">{section.subtitle}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow space-y-2">
        {section.content.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-2 text-sm text-slate-700 bg-white/60 p-1.5 rounded-md hover:bg-white hover:shadow-sm transition-all cursor-text border border-transparent hover:border-slate-100"
          >
            <div className="w-1 h-1 rounded-full bg-slate-400 mt-2 shrink-0" />
            <span>{item}</span>
          </motion.div>
        ))}
        {isAiThinking && section.id === 'solution' && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex items-center gap-2 text-xs text-indigo-500 font-medium bg-indigo-50 p-2 rounded-md animate-pulse"
           >
              <Sparkles className="w-3 h-3" /> AI generating more ideas...
           </motion.div>
        )}
      </div>

      {/* Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-100/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
         <Button size="sm" variant="ghost" className="h-6 text-[10px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2">
            <Sparkles className="w-3 h-3 mr-1" /> Improve with AI
         </Button>
         <Button size="sm" variant="ghost" className="h-6 w-6 p-0 rounded-full">
            <Edit3 className="w-3 h-3 text-slate-400" />
         </Button>
      </div>
    </div>
  );
};

const ChatMessage = ({ msg }: { msg: { role: 'ai' | 'user', text: string } }) => (
  <div className={cn("flex gap-3 mb-4", msg.role === 'user' ? "flex-row-reverse" : "")}>
    <div className={cn(
      "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
      msg.role === 'ai' ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : "bg-slate-200 text-slate-600"
    )}>
      {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <div className="text-xs font-bold">You</div>}
    </div>
    <div className={cn(
      "p-3 rounded-2xl text-sm max-w-[85%] shadow-sm",
      msg.role === 'ai' 
        ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none" 
        : "bg-indigo-600 text-white rounded-tr-none"
    )}>
      {msg.text}
    </div>
  </div>
);

export const LeanCanvasBuilder = ({ onNavigate }: { onNavigate?: (view: string) => void }) => {
  const [chatMessages, setChatMessages] = useState([
    { role: 'ai', text: "I've pre-filled your Lean Canvas based on your Startup Profile for 'TaxEasy AI'. How does the Problem section look to you?" }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMsg = { role: 'user', text: inputMessage } as const;
    setChatMessages([...chatMessages, newMsg]);
    setInputMessage("");
    setIsAiThinking(true);

    // Simulate AI response
    setTimeout(() => {
      setIsAiThinking(false);
      setChatMessages(prev => [...prev, { role: 'ai', text: "I've updated the Solution section with more specific features based on your input." }]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  // Helper to get section by ID
  const getSection = (id: string) => canvasSections.find(s => s.id === id)!;

  return (
    <div className="flex h-screen bg-[#F8F9FC] font-sans text-slate-900 overflow-hidden">
      
      {/* 1. Sidebar Navigation (Left) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden lg:flex z-20">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
           <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                 <LayoutGrid className="w-5 h-5" />
              </div>
              Canvas AI
           </div>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
           <div className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-wider">Builder Journey</div>
           <nav className="space-y-1 relative">
              {/* Connector Line */}
              <div className="absolute left-3.5 top-4 bottom-4 w-px bg-slate-100 -z-10" />
              
              {journeySteps.map((step, i) => (
                 <div 
                    key={step.id}
                    className={cn(
                       "group flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer",
                       step.status === 'current' ? "bg-indigo-50 border border-indigo-100" : "hover:bg-slate-50 border border-transparent"
                    )}
                    onClick={() => {
                       if (!onNavigate) return;
                       if (step.id === 'canvas') onNavigate('lean-canvas');
                       else if (step.id === 'deck') onNavigate('wizard');
                       else if (step.id === 'personas') onNavigate('contacts');
                       else if (step.id === 'profile') onNavigate('dashboard');
                       else onNavigate(step.id);
                    }}
                 >
                    <div className={cn(
                       "w-7 h-7 rounded-full flex items-center justify-center border-2 z-10 bg-white transition-colors",
                       step.status === 'complete' ? "border-emerald-500 text-emerald-500" : 
                       step.status === 'current' ? "border-indigo-600 text-indigo-600 shadow-md shadow-indigo-200" : 
                       "border-slate-200 text-slate-300"
                    )}>
                       {step.status === 'complete' ? <CheckCircle2 className="w-4 h-4" /> : <step.icon className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                       <div className={cn("text-sm font-medium", step.status === 'current' ? "text-indigo-900" : "text-slate-600")}>{step.label}</div>
                       {step.status === 'current' && <div className="text-[10px] text-indigo-500 font-medium">In Progress</div>}
                    </div>
                 </div>
              ))}
           </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                 <div className="text-sm font-bold mb-1">Pro Plan</div>
                 <div className="text-xs text-slate-300 mb-3">Unlock unlimited AI generations and export to PPTX.</div>
                 <Button size="sm" variant="secondary" className="w-full text-xs h-8 bg-white text-slate-900 hover:bg-slate-100">Upgrade</Button>
              </div>
           </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative">
         
         {/* Top Navigation Bar */}
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-10 shrink-0">
            <div className="flex items-center gap-4">
               <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => onNavigate && onNavigate('dashboard')}>
                  <ArrowRight className="w-5 h-5 rotate-180" />
               </Button>
               <div>
                  <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                     TaxEasy AI <Badge variant="outline" className="font-normal text-slate-500 bg-slate-50">Draft</Badge>
                  </h1>
                  <p className="text-xs text-slate-500">Last saved 2 mins ago</p>
               </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
               <div className="hidden md:flex items-center gap-2 mr-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Saved</span>
               </div>
               <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                  <Download className="w-4 h-4" /> Export
               </Button>
               <Button 
                  size="sm" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 gap-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  <Sparkles className="w-4 h-4" /> <span className="hidden sm:inline">AI Assistant</span>
               </Button>
            </div>
         </header>

         {/* Canvas Workspace - Scrollable */}
         <main className="flex-grow overflow-y-auto lg:overflow-hidden p-4 md:p-8 relative">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.4] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="max-w-[1400px] mx-auto">
               {/* 
                  LEAN CANVAS GRID LAYOUT 
               */}
               <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4 h-auto lg:h-[800px]">
                  
                  {/* Column 1 */}
                  <div className="flex flex-col gap-4 h-auto lg:h-full">
                     <div className="lg:flex-[3]">
                        <CanvasCard section={getSection('problem')} isAiThinking={isAiThinking} />
                     </div>
                     <div className="lg:flex-[2]">
                        <CanvasCard section={getSection('existing-alternatives')} isAiThinking={isAiThinking} />
                     </div>
                  </div>

                  {/* Column 2 */}
                  <div className="flex flex-col gap-4 h-auto lg:h-full">
                     <div className="lg:flex-[2]">
                        <CanvasCard section={getSection('solution')} isAiThinking={isAiThinking} />
                     </div>
                     <div className="lg:flex-[3]">
                        <CanvasCard section={getSection('key-metrics')} isAiThinking={isAiThinking} />
                     </div>
                  </div>

                  {/* Column 3 (Center) */}
                  <div className="flex flex-col gap-4 h-auto lg:h-full">
                     <div className="lg:flex-[3]">
                        <CanvasCard section={getSection('uvp')} isAiThinking={isAiThinking} />
                     </div>
                     <div className="lg:flex-[2]">
                        <CanvasCard section={getSection('high-level-concept')} isAiThinking={isAiThinking} />
                     </div>
                  </div>

                  {/* Column 4 */}
                  <div className="flex flex-col gap-4 h-auto lg:h-full">
                     <div className="lg:flex-[2]">
                        <CanvasCard section={getSection('unfair-advantage')} isAiThinking={isAiThinking} />
                     </div>
                     <div className="lg:flex-[3]">
                        <CanvasCard section={getSection('channels')} isAiThinking={isAiThinking} />
                     </div>
                  </div>

                  {/* Column 5 */}
                  <div className="flex flex-col gap-4 h-auto lg:h-full">
                     <div className="lg:flex-[3]">
                        <CanvasCard section={getSection('customer-segments')} isAiThinking={isAiThinking} />
                     </div>
                     <div className="lg:flex-[2]">
                        <CanvasCard section={getSection('early-adopters')} isAiThinking={isAiThinking} />
                     </div>
                  </div>

               </div>

               {/* Bottom Row: Cost & Revenue */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[250px]">
                  <CanvasCard section={getSection('cost-structure')} isAiThinking={isAiThinking} />
                  <CanvasCard section={getSection('revenue-streams')} isAiThinking={isAiThinking} />
               </div>
            </div>
         </main>

         {/* Bottom User Journey Flow (Horizontal) - as requested */}
         <div className="h-16 bg-white border-t border-slate-200 flex items-center px-8 shrink-0 overflow-x-auto hide-scrollbar">
            <div className="flex items-center gap-2 min-w-max mx-auto">
               {journeySteps.map((step, i) => (
                  <React.Fragment key={step.id}>
                     <div className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                        step.status === 'complete' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                        step.status === 'current' ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" :
                        "bg-white text-slate-500 border border-slate-200"
                     )}>
                        {step.status === 'complete' && <CheckCircle2 className="w-3 h-3" />}
                        {step.label}
                     </div>
                     {i < journeySteps.length - 1 && (
                        <div className="w-8 h-px bg-slate-200" />
                     )}
                  </React.Fragment>
               ))}
            </div>
         </div>

         {/* Toast Notification */}
         <AnimatePresence>
            {showToast && (
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-xl flex items-center gap-3 z-50"
               >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium">Lean Canvas updated successfully.</span>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* 3. AI Assistant Panel (Right) */}
      <aside className={cn(
         "w-80 bg-white border-l border-slate-200 flex flex-col z-30 shadow-xl lg:shadow-none absolute right-0 top-0 bottom-0 lg:static transform transition-transform duration-300",
         isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
      )}>
         <div className="h-16 flex items-center px-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
            <div className="flex items-center gap-3">
               <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full absolute -right-0.5 -bottom-0.5 border-2 border-white" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm">
                     <Bot className="w-4 h-4" />
                  </div>
               </div>
               <div>
                  <div className="text-sm font-bold text-slate-900">Canvas AI</div>
                  <div className="text-[10px] text-slate-500">Always active</div>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
               <X className="w-4 h-4" />
            </Button>
         </div>

         <div className="flex-grow p-4 overflow-y-auto bg-slate-50/30">
            {chatMessages.map((msg, i) => (
               <ChatMessage key={i} msg={msg} />
            ))}
            {isAiThinking && (
               <div className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0">
                     <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100" />
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200" />
                  </div>
               </div>
            )}
         </div>

         <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
               <input 
                  className="flex-grow bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Ask Canvas AI..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
               />
               <Button 
                  size="icon" 
                  className={cn(
                     "h-7 w-7 rounded-lg transition-all", 
                     inputMessage ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-400"
                  )}
                  onClick={handleSendMessage}
               >
                  <ArrowRight className="w-3.5 h-3.5" />
               </Button>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
               <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-slate-50 text-[10px] py-1">Refine UVP</Badge>
               <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-slate-50 text-[10px] py-1">Competitors?</Badge>
               <Badge variant="outline" className="whitespace-nowrap cursor-pointer hover:bg-slate-50 text-[10px] py-1">Monetization</Badge>
            </div>
         </div>
      </aside>

    </div>
  );
};
