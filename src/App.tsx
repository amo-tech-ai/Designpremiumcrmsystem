import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './utils/supabase/client';
import { steps, investorSteps } from './components/crm/data';
import { ErrorBoundary as AppErrorBoundary } from './components/ErrorBoundary';
import { ErrorBoundary as CRMErrorBoundary } from './components/ErrorBoundary';
import { ErrorBoundary as EditorErrorBoundary } from './components/ErrorBoundary';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { AuthPage } from './components/auth/AuthPage';
import { Toaster } from './components/ui/sonner';

// Build 1.0.13 - 8TH EMERGENCY FIX! React imports + .figmaignore (AUTOMATED DELETION CONFIRMED)

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
const OnboardingWizard = lazy(() => import('./components/wizard-v2/OnboardingWizard').then(m => ({ default: m.OnboardingWizard })));
const StartupProfilePage = lazy(() => import('./components/startup-profile/StartupProfilePage').then(m => ({ default: m.StartupProfilePage })));
const PitchDeckEditor = lazy(() => import('./components/crm/PitchDeckEditor').then(m => ({ default: m.PitchDeckEditor })));
const LeanCanvasBuilder = lazy(() => import('./components/crm/LeanCanvasBuilder').then(m => ({ default: m.LeanCanvasBuilder })));
const DocumentWorkspace = lazy(() => import('./components/crm/DocumentWorkspace').then(m => ({ default: m.DocumentWorkspace })));
const DeckTemplateSystem = lazy(() => import('./components/crm/DeckTemplateSystem').then(m => ({ default: m.DeckTemplateSystem })));
const HowItWorksPage = lazy(() => import('./components/landing/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const BusinessModelPage = lazy(() => import('./components/landing/BusinessModelPage').then(m => ({ default: m.BusinessModelPage })));
const LandingPage = lazy(() => import('./components/landing/LandingPage').then(m => ({ default: m.LandingPage })));
const LandingPageV2 = lazy(() => import('./components/landing/LandingPageV2').then(m => ({ default: m.LandingPageV2 })));
const LandingPageV5 = lazy(() => import('./components/landing/LandingPageV5').then(m => ({ default: m.LandingPageV5 })));
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

type View = 'dashboard' | 'projects' | 'documents' | 'pipeline' | 'tasks' | 'activities' | 'contacts' | 'contact-detail' | 'insights' | 'discovery' | 'gtm' | 'lean-canvas' | 'wizard' | 'event-wizard' | 'startup-profile' | 'company-profile' | 'editor' | 'landing' | 'landing-v2' | 'landing-v5' | 'style-guide' | 'how-it-works' | 'business-model' | 'settings' | 'about' | 'careers' | 'legal' | 'contact' | 'blog' | 'community' | 'help' | 'templates' | 'pricing' | 'profile' | 'settings-account' | 'settings-billing' | 'settings-workspaces' | 'support';
type PipelineMode = 'sales' | 'investor';

export default function App() {
  // 🔓 DEV MODE: Set to true to bypass authentication during development
  const DEV_MODE_BYPASS_AUTH = true;
  
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>('contacts');
  const [pipelineMode, setPipelineMode] = useState<PipelineMode>('investor');
  
  const [activeSalesStepId, setActiveSalesStepId] = useState<string>(steps[0].id);
  const [activeInvestorStepId, setActiveInvestorStepId] = useState<string>(investorSteps[0].id);

  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [deckId, setDeckId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Skip auth check if DEV_MODE_BYPASS_AUTH is enabled
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('%c🔓 DEV MODE ACTIVE', 'background: #FCD34D; color: #000; padding: 8px 12px; font-weight: bold; font-size: 14px;');
      console.log('%cAuthentication bypassed for development', 'color: #F59E0B; font-weight: bold;');
      console.log('%cNote: Database operations requiring user.id will fail', 'color: #F59E0B;');
      console.log('%cPerfect for UI/UX testing and component development', 'color: #10B981;');
      console.log('%cTo re-enable auth: Set DEV_MODE_BYPASS_AUTH = false in App.tsx', 'color: #3B82F6;');
      setLoading(false);
      return;
    }
    
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

  // ========================================
  // URL SYNC: Bidirectional routing support
  // ========================================
  
  // Sync URL when view changes (pushState)
  useEffect(() => {
    const viewToPath: Record<View, string> = {
      'landing': '/',
      'landing-v2': '/landing-v2',
      'landing-v5': '/landing-v5',
      'style-guide': '/style-guide',
      'how-it-works': '/how-it-works',
      'business-model': '/business-model',
      'dashboard': '/app',
      'contacts': '/app/contacts',
      'contact-detail': '/app/contacts/detail',
      'pipeline': '/app/pipeline',
      'tasks': '/app/tasks',
      'activities': '/app/activities',
      'insights': '/app/insights',
      'projects': '/app/projects',
      'documents': '/app/documents',
      'discovery': '/app/discovery',
      'gtm': '/app/gtm',
      'lean-canvas': '/app/lean-canvas',
      'wizard': '/app/wizard',
      'event-wizard': '/app/event-wizard',
      'startup-profile': '/app/startup-profile',
      'company-profile': '/app/company-profile',
      'editor': deckId ? `/app/editor/${deckId}` : '/app/editor',
      'templates': '/app/templates',
      'about': '/about',
      'careers': '/careers',
      'legal': '/legal',
      'contact': '/contact',
      'blog': '/blog',
      'community': '/community',
      'help': '/help',
      'pricing': '/pricing',
      'profile': '/app/profile',
      'settings': '/app/settings',
      'settings-account': '/app/settings/account',
      'settings-billing': '/app/settings/billing',
      'settings-workspaces': '/app/settings/workspaces',
      'support': '/app/support',
    };
    
    const path = viewToPath[currentView] || '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [currentView, deckId]);

  // Handle browser back/forward (popstate)
  useEffect(() => {
    const pathToView = (pathname: string): View => {
      if (pathname === '/') return 'landing';
      if (pathname === '/landing-v2') return 'landing-v2';
      if (pathname === '/landing-v5') return 'landing-v5';
      if (pathname === '/style-guide') return 'style-guide';
      if (pathname === '/how-it-works') return 'how-it-works';
      if (pathname === '/business-model') return 'business-model';
      if (pathname === '/app' || pathname === '/app/') return 'dashboard';
      if (pathname === '/app/contacts') return 'contacts';
      if (pathname.startsWith('/app/contacts/')) return 'contact-detail';
      if (pathname === '/app/pipeline') return 'pipeline';
      if (pathname === '/app/tasks') return 'tasks';
      if (pathname === '/app/activities') return 'activities';
      if (pathname === '/app/insights') return 'insights';
      if (pathname === '/app/projects') return 'projects';
      if (pathname === '/app/documents') return 'documents';
      if (pathname === '/app/discovery') return 'discovery';
      if (pathname === '/app/gtm') return 'gtm';
      if (pathname === '/app/lean-canvas') return 'lean-canvas';
      if (pathname === '/app/wizard' || pathname.startsWith('/pitch-deck/generating/')) return 'wizard';
      if (pathname === '/app/event-wizard') return 'event-wizard';
      if (pathname === '/app/startup-profile') return 'startup-profile';
      if (pathname === '/app/company-profile') return 'company-profile';
      if (pathname.startsWith('/app/editor/') || pathname.startsWith('/pitch-deck/editor/')) {
        const parts = pathname.split('/');
        const id = parts[parts.length - 1];
        if (id) setDeckId(id);
        return 'editor';
      }
      if (pathname === '/app/templates') return 'templates';
      if (pathname === '/app/profile') return 'profile';
      if (pathname === '/app/settings') return 'settings';
      if (pathname === '/app/settings/account') return 'settings-account';
      if (pathname === '/app/settings/billing') return 'settings-billing';
      if (pathname === '/app/settings/workspaces') return 'settings-workspaces';
      if (pathname === '/app/support') return 'support';
      if (pathname === '/about') return 'about';
      if (pathname === '/careers') return 'careers';
      if (pathname === '/legal') return 'legal';
      if (pathname === '/contact') return 'contact';
      if (pathname === '/blog') return 'blog';
      if (pathname === '/community') return 'community';
      if (pathname === '/help') return 'help';
      if (pathname === '/pricing') return 'pricing';
      return 'landing'; // fallback
    };

    const handlePopState = () => {
      const view = pathToView(window.location.pathname);
      setCurrentView(view);
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initialize view from URL on mount
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
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

  if (currentView === 'landing-v5') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPageV5 onNavigate={(view) => setCurrentView(view as View)} />
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
  if (!session && !DEV_MODE_BYPASS_AUTH) {
    if (loading) return null; // Or a loading spinner
    return <AuthPage onAuthSuccess={() => setCurrentView('dashboard')} />;
  }

  // APPLICATION SHELL (Dashboard, Tools, CRM)
  return (
    <AppErrorBoundary>
      <div className="flex h-screen bg-[#F7F9FC] text-[#1A1F2C] font-sans overflow-hidden">
        <Toaster />
        
        {/* DEV MODE INDICATOR */}
        {DEV_MODE_BYPASS_AUTH && (
          <div className="fixed top-4 right-4 z-[100] bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg font-bold text-sm flex items-center gap-2 animate-pulse">
            <span>🔓</span>
            <span>DEV MODE - Auth Disabled</span>
          </div>
        )}
        
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