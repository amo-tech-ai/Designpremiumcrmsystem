import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './utils/supabase/client';
import { AuthPage } from './components/auth/AuthPage';
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
import { StartupProfileWizard } from './components/wizard/StartupProfileWizard';
import { PitchDeckEditor } from './components/crm/PitchDeckEditor';
import { LeanCanvasBuilder } from './components/crm/LeanCanvasBuilder';
import { DocumentWorkspace } from './components/crm/DocumentWorkspace';
import { DeckTemplateSystem } from './components/crm/DeckTemplateSystem';
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

import { UserProfile } from './components/user-profile/UserProfile';
import { CompanyProfileEditor } from './components/company-profile/CompanyProfileEditor';
import { AccountSettings } from './components/settings/AccountSettings';
import { BillingSettings } from './components/settings/BillingSettings';
import { WorkspaceSettings } from './components/settings/WorkspaceSettings';
import { HelpCenter } from './components/support/HelpCenter';

type View = 'dashboard' | 'documents' | 'pipeline' | 'tasks' | 'activities' | 'contacts' | 'insights' | 'discovery' | 'gtm' | 'lean-canvas' | 'wizard' | 'startup-profile' | 'company-profile' | 'editor' | 'landing' | 'landing-v2' | 'how-it-works' | 'business-model' | 'settings' | 'about' | 'careers' | 'legal' | 'contact' | 'blog' | 'community' | 'help' | 'templates' | 'pricing' | 'profile' | 'settings-account' | 'settings-billing' | 'settings-workspaces' | 'support';
type PipelineMode = 'sales' | 'investor';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('landing-v2');
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>('investor');
  
  const [activeSalesStepId, setActiveSalesStepId] = useState<string>(steps[0].id);
  const [activeInvestorStepId, setActiveInvestorStepId] = useState<string>(investorSteps[0].id);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [deckId, setDeckId] = useState<string | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Check for URL-based "generating" state on mount
    const path = window.location.pathname;
    if (path.startsWith('/pitch-deck/generating/')) {
       const id = path.split('/pitch-deck/generating/')[1];
       if (id) {
          setCurrentView('wizard'); // Force wizard view to show the generation screen
       }
    } else if (path.startsWith('/pitch-deck/editor/')) {
      const id = path.split('/pitch-deck/editor/')[1];
      if (id) {
        setDeckId(id);
        setCurrentView('editor');
      }
    }
  }, []);

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
  if (['about', 'careers', 'legal', 'contact', 'blog', 'community', 'help', 'pricing'].includes(currentView)) {
    const pageTitles: Record<string, string> = {
      about: 'About Us',
      careers: 'Join Our Team',
      legal: 'Legal & Privacy',
      contact: 'Contact Us',
      blog: 'Latest Insights',
      community: 'Community Forum',
      help: 'Help Center',
      pricing: 'Pricing Plans'
    };
    return <StandardPage title={pageTitles[currentView]} onNavigate={(view) => setCurrentView(view as View)} />;
  }

  // Auth Protection for App Shell
  /*
  if (!session) {
    if (loading) return null; // Or a loading spinner
    return <AuthPage onAuthSuccess={() => setCurrentView('dashboard')} />;
  }
  */

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
          {currentView === 'startup-profile' && <StartupProfileWizard onNavigate={(view) => setCurrentView(view as View)} />}

          {currentView === 'profile' && <UserProfile onNavigate={(view) => setCurrentView(view as View)} />}
          {currentView === 'company-profile' && <CompanyProfileEditor onNavigate={(view) => setCurrentView(view as View)} />}
          {currentView === 'settings-account' && <AccountSettings />}
          {currentView === 'settings-billing' && <BillingSettings />}
          {currentView === 'settings-workspaces' && <WorkspaceSettings />}
          {currentView === 'support' && <HelpCenter />}

          {currentView === 'editor' && <PitchDeckEditor deckId={deckId} />}
          
          {currentView === 'lean-canvas' && <LeanCanvasBuilder onNavigate={(view) => setCurrentView(view as View)} />}

          {currentView === 'templates' && <DeckTemplateSystem />}

        </main>
      </div>
    </div>
  );
}
