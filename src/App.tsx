import React, { useState } from 'react';
import { PipelineDashboard } from './components/crm/PipelineDashboard';
import { TasksDashboard } from './components/crm/TasksDashboard';
import { ActivityFeed } from './components/crm/ActivityFeed';
import { ContactPanel } from './components/crm/ContactPanel';
import { AIInsights } from './components/crm/AIInsights';
import { FounderDashboard } from './components/crm/FounderDashboard';
import { ContactsDashboard } from './components/crm/ContactsDashboard';
import { ContactDiscovery } from './components/crm/ContactDiscovery';
import { GTMStrategy } from './components/crm/GTMStrategy';
import { PitchDeckWizard } from './components/crm/PitchDeckWizard';
import { PitchDeckEditor } from './components/crm/PitchDeckEditor';
import { LeanCanvasBuilder } from './components/crm/LeanCanvasBuilder';
import { DocumentWorkspace } from './components/crm/DocumentWorkspace';
import { HowItWorksPage } from './components/landing/HowItWorksPage';
import { BusinessModelPage } from './components/landing/BusinessModelPage';
import { LandingPage } from './components/landing/LandingPage';
import { LandingPageV2 } from './components/landing/LandingPageV2';
import { StandardPage } from './components/landing/StandardPage';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { steps, investorSteps } from './components/crm/data';
import { cn } from "./components/ui/utils";
import { Toaster } from "sonner@2.0.3";

type View = 'dashboard' | 'documents' | 'pipeline' | 'tasks' | 'activities' | 'contacts' | 'insights' | 'discovery' | 'gtm' | 'lean-canvas' | 'wizard' | 'editor' | 'landing' | 'landing-v2' | 'how-it-works' | 'business-model' | 'settings' | 'about' | 'careers' | 'legal' | 'contact' | 'blog' | 'community' | 'help' | 'templates' | 'pricing' | 'profile';
type PipelineMode = 'sales' | 'investor';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('landing-v2');
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>('investor');
  
  const [activeSalesStepId, setActiveSalesStepId] = useState<string>(steps[0].id);
  const [activeInvestorStepId, setActiveInvestorStepId] = useState<string>(investorSteps[0].id);

  const [selectedLead, setSelectedLead] = useState<any>(null);

  const handleLeadClick = (lead: any) => {
    setSelectedLead(lead);
  };

  // Full screen landing page views that DON'T need the app shell
  if (['landing', 'business-model'].includes(currentView)) {
     if (currentView === 'landing') return <LandingPage onNavigate={(view) => setCurrentView(view as View)} />;
     if (currentView === 'business-model') return <BusinessModelPage onNavigate={(view) => setCurrentView(view as View)} />;
  }

  if (currentView === 'landing-v2') {
    return <LandingPageV2 onNavigate={(view) => setCurrentView(view as View)} />;
  }
  
  if (currentView === 'how-it-works') {
    return <HowItWorksPage onNavigate={(view) => setCurrentView(view as View)} />;
  }
  
  // Standard Pages (About, Legal etc)
  if (['about', 'careers', 'legal', 'contact', 'blog', 'community', 'help', 'templates', 'pricing'].includes(currentView)) {
    const pageTitles: Record<string, string> = {
      about: 'About Us',
      careers: 'Join Our Team',
      legal: 'Legal & Privacy',
      contact: 'Contact Us',
      blog: 'Latest Insights',
      community: 'Community Forum',
      help: 'Help Center',
      templates: 'Template Library',
      pricing: 'Pricing Plans'
    };
    return <StandardPage title={pageTitles[currentView]} onNavigate={(view) => setCurrentView(view as View)} />;
  }

  // APPLICATION SHELL (Dashboard, Tools, CRM)
  return (
    <div className="flex h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden">
      <Toaster />
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <div className="hidden md:block h-full shadow-xl z-30">
        <Sidebar currentView={currentView} onNavigate={(view) => setCurrentView(view as View)} />
      </div>
      
      {/* MAIN CONTENT AREA */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative bg-slate-50/50">
        
        {/* TOP HEADER (Mobile Nav + Search + Profile) */}
        <TopNavbar 
          currentView={currentView} 
          onNavigate={(view) => setCurrentView(view as View)} 
          showNavLinks={false}
        />
        
        <main className="flex-grow overflow-hidden relative">
          
          {currentView === 'dashboard' && (
             <FounderDashboard 
               onNavigate={(view) => setCurrentView(view as View)} 
               onLeadClick={handleLeadClick}
             />
          )}

          {currentView === 'documents' && <DocumentWorkspace />}

          {currentView === 'pipeline' && (
            <div className="h-full overflow-hidden">
              <PipelineDashboard 
                 pipelineMode={pipelineMode}
                 setPipelineMode={setPipelineMode}
                 activeStepId={pipelineMode === 'investor' ? activeInvestorStepId : activeSalesStepId}
                 setActiveStepId={pipelineMode === 'investor' ? setActiveInvestorStepId : setActiveSalesStepId}
                 selectedLead={selectedLead}
                 onLeadClick={handleLeadClick}
                 onCloseLead={() => setSelectedLead(null)}
              />
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
          
          {currentView === 'discovery' && <ContactDiscovery />}

          {currentView === 'gtm' && <GTMStrategy />}

          {currentView === 'wizard' && <PitchDeckWizard onNavigate={(view) => setCurrentView(view as View)} />}

          {currentView === 'profile' && <PitchDeckWizard onNavigate={(view) => setCurrentView(view as View)} />}

          {currentView === 'editor' && <PitchDeckEditor />}
          
          {currentView === 'lean-canvas' && <LeanCanvasBuilder onNavigate={(view) => setCurrentView(view as View)} />}

        </main>
      </div>
    </div>
  );
}
