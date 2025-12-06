import React, { useState } from 'react';
import { PipelineDashboard } from './components/crm/PipelineDashboard';
import { TasksDashboard } from './components/crm/TasksDashboard';
import { ActivityFeed } from './components/crm/ActivityFeed';
import { ContactPanel } from './components/crm/ContactPanel';
import { AIInsights } from './components/crm/AIInsights';
import { FounderDashboard } from './components/crm/FounderDashboard';
import { ContactsDashboard } from './components/crm/ContactsDashboard';
import { DiscoveryDashboard } from './components/crm/DiscoveryDashboard';
import { GTMStrategy } from './components/crm/GTMStrategy';
import { PitchDeckWizard } from './components/crm/PitchDeckWizard';
import { PitchDeckEditor } from './components/crm/PitchDeckEditor';
import { DocumentWorkspace } from './components/crm/DocumentWorkspace';
import { LandingPage } from './components/landing/LandingPage';
import { LandingPageV2 } from './components/landing/LandingPageV2';
import { steps, investorSteps } from './components/crm/data';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Activity, 
  Users, 
  Sparkles, 
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  Home,
  LogOut,
  Rocket,
  Presentation,
  FileEdit,
  Globe,
  Zap,
  FileText
} from 'lucide-react';
import { Button } from "./components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { cn } from "./components/ui/utils";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Separator } from "./components/ui/separator";

type View = 'dashboard' | 'documents' | 'pipeline' | 'tasks' | 'activities' | 'contacts' | 'insights' | 'discovery' | 'gtm' | 'wizard' | 'editor' | 'landing' | 'landing-v2' | 'settings';
type PipelineMode = 'sales' | 'investor';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing-v2');
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>('investor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [activeSalesStepId, setActiveSalesStepId] = useState<string>(steps[0].id);
  const [activeInvestorStepId, setActiveInvestorStepId] = useState<string>(investorSteps[0].id);

  const [selectedLead, setSelectedLead] = useState<any>(null);

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
  };

  const navItems = [
    { id: 'landing-v2', label: 'Home', icon: Zap, badge: 'New' },
    { id: 'landing', label: 'Landing V1', icon: Globe, badge: 'Public' },
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'documents', label: 'Documents', icon: FileText, badge: 'New' },
    { id: 'gtm', label: 'GTM Strategy', icon: Rocket, badge: 'Beta' },
    { id: 'wizard', label: 'Pitch Deck', icon: Presentation },
    { id: 'editor', label: 'Deck Editor', icon: FileEdit },
    { id: 'pipeline', label: 'Pipeline', icon: LayoutDashboard },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'contacts', label: 'Contacts', icon: Users },
    { id: 'discovery', label: 'Discovery', icon: Search },
    { id: 'insights', label: 'AI Insights', icon: Sparkles, badge: 'New' },
  ];

  // Full screen landing page views
  if (currentView === 'landing') {
    return <LandingPage onNavigate={(view) => setCurrentView(view as View)} />;
  }
  if (currentView === 'landing-v2') {
    return <LandingPageV2 onNavigate={(view) => setCurrentView(view as View)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside 
        className={cn(
          "bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ease-in-out z-40 flex-shrink-0 relative",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
           <div className="flex items-center gap-3 w-full overflow-hidden">
             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/20">
               SA
             </div>
             <span className={cn(
               "font-bold text-lg text-white whitespace-nowrap transition-opacity duration-300",
               isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
             )}>
               StartupAI
             </span>
           </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow py-6 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id as View);
                setSelectedLead(null);
              }}
              className={cn(
                "flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 group relative",
                currentView === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white",
                !isSidebarOpen && "justify-center"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                currentView === item.id ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              
              <span className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-300 origin-left",
                isSidebarOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 hidden"
              )}>
                {item.label}
              </span>

              {item.badge && isSidebarOpen && (
                <Badge className="ml-auto bg-purple-500/20 text-purple-300 border-0 text-[10px] px-1.5">
                  {item.badge}
                </Badge>
              )}

              {/* Tooltip for collapsed state */}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </button>
          ))}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-1">
          <button className={cn(
            "flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
            !isSidebarOpen && "justify-center"
          )}>
            <Settings className="h-5 w-5 flex-shrink-0" />
            <span className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-300",
                isSidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden"
            )}>Settings</span>
          </button>
          <button className={cn(
            "flex items-center gap-3 w-full p-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-900/10 transition-colors",
            !isSidebarOpen && "justify-center"
          )}>
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-300",
                isSidebarOpen ? "opacity-100" : "opacity-0 w-0 hidden"
            )}>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative bg-slate-50/50">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-slate-500 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <h1 className="font-bold text-xl text-slate-800 hidden md:block">
              {currentView === 'dashboard' && 'Founder Dashboard'}
              {currentView === 'pipeline' && 'Deals Pipeline'}
              {currentView === 'tasks' && 'Task Manager'}
              {currentView === 'activities' && 'Activity Feed'}
              {currentView === 'contacts' && 'Contacts'}
              {currentView === 'discovery' && 'Contact Discovery'}
              {currentView === 'gtm' && 'GTM Strategy'}
              {currentView === 'wizard' && 'Pitch Deck Wizard'}
              {currentView === 'editor' && 'Deck Editor'}
              {currentView === 'insights' && 'AI Insights'}
            </h1>
          </div>

          {/* Right Section: Search, Notifs, Profile */}
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block w-64">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
               <Input placeholder="Search..." className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 h-9" />
            </div>
            
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            
            <div className="h-8 w-px bg-slate-200 mx-1" />
            
            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:bg-slate-50 p-1 rounded-full pr-3 border border-transparent hover:border-slate-100 transition-colors">
              <Avatar className="h-8 w-8 border border-white shadow-sm">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="hidden xl:block text-sm text-left">
                <p className="font-bold text-slate-700 leading-none">Alex D.</p>
                <p className="text-xs text-slate-400">Head of Growth</p>
              </div>
              <ChevronDown className="h-3 w-3 text-slate-400 hidden xl:block" />
            </div>
          </div>
        </header>

        {/* Content View Switcher */}
        <main className="flex-grow overflow-hidden relative">
          
          {currentView === 'dashboard' && (
             <FounderDashboard 
               onNavigate={(view) => setCurrentView(view as View)} 
               onLeadClick={handleLeadClick}
             />
          )}

          {currentView === 'documents' && <DocumentWorkspace />}

          {currentView === 'pipeline' && (
            <div className="flex flex-col h-full">
               {/* Pipeline Mode Toggle */}
               <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center bg-slate-100 p-1 rounded-lg">
                   <button 
                     onClick={() => setPipelineMode('investor')}
                     className={cn(
                       "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                       pipelineMode === 'investor' 
                         ? "bg-white text-indigo-600 shadow-sm" 
                         : "text-slate-500 hover:text-slate-700"
                     )}
                   >
                     Investor Pipeline
                   </button>
                   <button 
                     onClick={() => setPipelineMode('sales')}
                     className={cn(
                       "px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                       pipelineMode === 'sales' 
                         ? "bg-white text-purple-600 shadow-sm" 
                         : "text-slate-500 hover:text-slate-700"
                     )}
                   >
                     Sales Pipeline
                   </button>
                 </div>
               </div>
               
               <div className="flex h-full overflow-hidden">
                  <div className="flex-grow h-full overflow-hidden">
                    <PipelineDashboard 
                       pipelineMode={pipelineMode}
                       activeStepId={pipelineMode === 'investor' ? activeInvestorStepId : activeSalesStepId}
                       setActiveStepId={pipelineMode === 'investor' ? setActiveInvestorStepId : setActiveSalesStepId}
                       onLeadClick={handleLeadClick}
                    />
                  </div>
                  <div className="w-[400px] flex-shrink-0 border-l border-slate-200 h-full bg-white hidden 2xl:block z-20">
                    <ContactPanel 
                       lead={selectedLead} 
                       onClose={() => setSelectedLead(null)}
                    />
                  </div>
               </div>
            </div>
          )}

          {currentView === 'insights' && <AIInsights />}
          
          {currentView === 'tasks' && <TasksDashboard />}
          
          {currentView === 'activities' && (
             <div className="p-6 max-w-4xl mx-auto h-full overflow-hidden flex flex-col">
                <ActivityFeed />
             </div>
          )}
          
          {currentView === 'contacts' && <ContactsDashboard />}
          
          {currentView === 'discovery' && <DiscoveryDashboard />}

          {currentView === 'gtm' && <GTMStrategy />}

          {currentView === 'wizard' && <PitchDeckWizard />}

          {currentView === 'editor' && <PitchDeckEditor />}

        </main>
      </div>
      
      {/* Render Contact Panel as Modal/Drawer on smaller screens or when needed? 
          For now keeping it integrated in layout 
      */}
    </div>
  );
}
