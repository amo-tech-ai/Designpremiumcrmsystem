import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './utils/supabase/client';
import { AuthPage } from './components/auth/AuthPage';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { steps, investorSteps } from './components/crm/data';
import { cn } from "./components/ui/utils";
import { Toaster } from "sonner@2.0.3";
import { AppErrorBoundary, EditorErrorBoundary, CRMErrorBoundary } from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Lazy load heavy components for better performance
const ProjectsDashboard = lazy(() => import('./components/projects/ProjectsDashboard').then(m => ({ default: m.ProjectsDashboard })));
const PipelineDashboard = lazy(() => import('./components/crm/PipelineDashboard').then(m => ({ default: m.PipelineDashboard })));
const TasksDashboard = lazy(() => import('./components/crm/TasksDashboard').then(m => ({ default: m.TasksDashboard })));
const ActivityFeed = lazy(() => import('./components/crm/ActivityFeed').then(m => ({ default: m.ActivityFeed })));
const AIInsights = lazy(() => import('./components/crm/AIInsights').then(m => ({ default: m.AIInsights })));
const FounderDashboard = lazy(() => import('./components/crm/FounderDashboard').then(m => ({ default: m.FounderDashboard })));
const ContactsDashboard = lazy(() => import('./components/crm/ContactsDashboard').then(m => ({ default: m.ContactsDashboard })));
const ContactDetailPage = lazy(() => import('./components/crm/ContactDetailPage').then(m => ({ default: m.ContactDetailPage })));
const ContactDiscovery = lazy(() => import('./components/crm/ContactDiscovery').then(m => ({ default: m.ContactDiscovery })));
const GTMStrategy = lazy(() => import('./components/crm/GTMStrategy').then(m => ({ default: m.GTMStrategy })));
const PitchDeckWizard = lazy(() => import('./components/crm/PitchDeckWizard').then(m => ({ default: m.PitchDeckWizard })));
const EventWizard = lazy(() => import('./components/event-wizard/EventWizard').then(m => ({ default: m.EventWizard })));
const StartupProfileWizard = lazy(() => import('./components/wizard/StartupProfileWizard').then(m => ({ default: m.StartupProfileWizard })));
const PitchDeckEditor = lazy(() => import('./components/crm/PitchDeckEditor').then(m => ({ default: m.PitchDeckEditor })));
const LeanCanvasBuilder = lazy(() => import('./components/crm/LeanCanvasBuilder').then(m => ({ default: m.LeanCanvasBuilder })));
const DocumentWorkspace = lazy(() => import('./components/crm/DocumentWorkspace').then(m => ({ default: m.DocumentWorkspace })));
const DeckTemplateSystem = lazy(() => import('./components/crm/DeckTemplateSystem').then(m => ({ default: m.DeckTemplateSystem })));
const HowItWorksPage = lazy(() => import('./components/landing/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const BusinessModelPage = lazy(() => import('./components/landing/BusinessModelPage').then(m => ({ default: m.BusinessModelPage })));
const LandingPage = lazy(() => import('./components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LandingPageV2 = lazy(() => import('./components/landing/LandingPageV2').then(m => ({ default: m.LandingPageV2 })));
const StyleGuidePage = lazy(() => import('./components/style-guide/StyleGuidePage').then(m => ({ default: m.StyleGuidePage })));
const StandardPage = lazy(() => import('./components/landing/StandardPage').then(m => ({ default: m.StandardPage })));
const UserProfile = lazy(() => import('./components/user-profile/UserProfile').then(m => ({ default: m.UserProfile })));
const CompanyProfileEditor = lazy(() => import('./components/company-profile/CompanyProfileEditor').then(m => ({ default: m.CompanyProfileEditor })));
const AccountSettings = lazy(() => import('./components/settings/AccountSettings').then(m => ({ default: m.AccountSettings })));
const BillingSettings = lazy(() => import('./components/settings/BillingSettings').then(m => ({ default: m.BillingSettings })));
const WorkspaceSettings = lazy(() => import('./components/settings/WorkspaceSettings').then(m => ({ default: m.WorkspaceSettings })));
const HelpCenter = lazy(() => import('./components/support/HelpCenter').then(m => ({ default: m.HelpCenter })));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      <p className="text-slate-500 font-medium">Loading...</p>
    </div>
  </div>
);

type View = 'dashboard' | 'projects' | 'documents' | 'pipeline' | 'tasks' | 'activities' | 'contacts' | 'contact-detail' | 'insights' | 'discovery' | 'gtm' | 'lean-canvas' | 'wizard' | 'event-wizard' | 'startup-profile' | 'company-profile' | 'editor' | 'landing' | 'landing-v2' | 'style-guide' | 'how-it-works' | 'business-model' | 'settings' | 'about' | 'careers' | 'legal' | 'contact' | 'blog' | 'community' | 'help' | 'templates' | 'pricing' | 'profile' | 'settings-account' | 'settings-billing' | 'settings-workspaces' | 'support';
type PipelineMode = 'sales' | 'investor';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('contacts');
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
     if (currentView === 'landing') return (
       <Suspense fallback={<LoadingFallback />}>
         <LandingPage onNavigate={(view) => setCurrentView(view as View)} />
       </Suspense>
     );
     if (currentView === 'business-model') return (
       <Suspense fallback={<LoadingFallback />}>
         <BusinessModelPage onNavigate={(view) => setCurrentView(view as View)} />
       </Suspense>
     );
  }

  if (currentView === 'landing-v2') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPageV2 onNavigate={(view) => setCurrentView(view as View)} />
      </Suspense>
    );
  }

  if (currentView === 'style-guide') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <StyleGuidePage onNavigate={(view) => setCurrentView(view as View)} />
      </Suspense>
    );
  }
  
  if (currentView === 'how-it-works') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <HowItWorksPage onNavigate={(view) => setCurrentView(view as View)} />
      </Suspense>
    );
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
    return (
      <Suspense fallback={<LoadingFallback />}>
        <StandardPage 
          title={pageTitles[currentView]} 
          onNavigate={(view) => setCurrentView(view as View)} 
          currentView={currentView}
        />
      </Suspense>
    );
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
    <AppErrorBoundary>
      <div className="flex h-screen bg-[#F7F9FC] text-[#1A1F2C] font-sans overflow-hidden">
        <Toaster />
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <div className="hidden md:block h-full shadow-xl z-30">
          <Sidebar currentView={currentView} onNavigate={(view) => setCurrentView(view as View)} />
        </div>
        
        {/* MAIN CONTENT AREA */}
        <div className="flex-grow flex flex-col h-full overflow-hidden relative bg-[#F7F9FC]">
          
          {/* TOP HEADER (Mobile Nav + Search + Profile) */}
          <TopNavbar 
            currentView={currentView} 
            onNavigate={(view) => setCurrentView(view as View)} 
            showNavLinks={false}
          />
          
          <main className="flex-grow overflow-hidden relative">
            <Suspense fallback={<LoadingFallback />}>
              {currentView === 'dashboard' && (
                <CRMErrorBoundary>
                  <FounderDashboard 
                    onNavigate={(view) => setCurrentView(view as View)} 
                    onLeadClick={handleLeadClick}
                  />
                </CRMErrorBoundary>
              )}

              {currentView === 'projects' && (
                <div className="h-full overflow-y-auto">
                   <ProjectsDashboard />
                </div>
              )}

              {currentView === 'documents' && <DocumentWorkspace />}

              {currentView === 'pipeline' && (
                <CRMErrorBoundary>
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
                </CRMErrorBoundary>
              )}

              {currentView === 'insights' && (
                <CRMErrorBoundary>
                  <AIInsights />
                </CRMErrorBoundary>
              )}
              
              {currentView === 'tasks' && (
                <CRMErrorBoundary>
                  <TasksDashboard />
                </CRMErrorBoundary>
              )}
              
              {currentView === 'activities' && (
                <CRMErrorBoundary>
                  <div className="p-6 max-w-4xl mx-auto h-full overflow-hidden flex flex-col">
                     <ActivityFeed />
                  </div>
                </CRMErrorBoundary>
              )}
              
              {currentView === 'contacts' && (
                <CRMErrorBoundary>
                  <ContactsDashboard />
                </CRMErrorBoundary>
              )}
              
              {currentView === 'contact-detail' && (
                <CRMErrorBoundary>
                  <ContactDetailPage onBack={() => setCurrentView('contacts')} />
                </CRMErrorBoundary>
              )}
              
              {currentView === 'discovery' && (
                <CRMErrorBoundary>
                  <ContactDiscovery />
                </CRMErrorBoundary>
              )}

              {currentView === 'gtm' && (
                <CRMErrorBoundary>
                  <GTMStrategy />
                </CRMErrorBoundary>
              )}

              {currentView === 'wizard' && (
                <EditorErrorBoundary>
                  <PitchDeckWizard onNavigate={(view) => setCurrentView(view as View)} />
                </EditorErrorBoundary>
              )}
              
              {currentView === 'event-wizard' && <EventWizard onNavigate={(view) => setCurrentView(view as View)} />}

              {currentView === 'startup-profile' && <StartupProfileWizard onNavigate={(view) => setCurrentView(view as View)} />}

              {currentView === 'profile' && <UserProfile onNavigate={(view) => setCurrentView(view as View)} />}
              {currentView === 'company-profile' && <CompanyProfileEditor onNavigate={(view) => setCurrentView(view as View)} />}
              {currentView === 'settings-account' && <AccountSettings />}
              {currentView === 'settings-billing' && <BillingSettings />}
              {currentView === 'settings-workspaces' && <WorkspaceSettings />}
              {currentView === 'support' && <HelpCenter />}

              {currentView === 'editor' && (
                <EditorErrorBoundary>
                  <PitchDeckEditor deckId={deckId} />
                </EditorErrorBoundary>
              )}
              
              {currentView === 'lean-canvas' && <LeanCanvasBuilder onNavigate={(view) => setCurrentView(view as View)} />}

              {currentView === 'templates' && <DeckTemplateSystem />}
            </Suspense>
          </main>
        </div>
      </div>
    </AppErrorBoundary>
  );
}