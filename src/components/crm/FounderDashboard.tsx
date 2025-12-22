import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Calendar, 
  ChevronRight, 
  Edit, 
  Plus, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Zap, 
  Rocket, 
  Settings, 
  Bell, 
  Globe, 
  Briefcase, 
  MapPin, 
  Edit2, 
  Link as LinkIcon, 
  ExternalLink, 
  X, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Linkedin, 
  ArrowRight, 
  LayoutGrid, 
  PieChart,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { cn } from '../ui/utils';
import { useStartupProfile } from './hooks';
import { toast } from 'sonner@2.0.3';

// --- Default / Fallback Data ---
const DEFAULT_PROFILE = {
  name: "My Startup",
  tagline: "Your tagline goes here",
  logo_url: "https://api.dicebear.com/7.x/shapes/svg?seed=Startup&backgroundColor=1A1A1A",
  cover_image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  stage: "Idea",
  business_model: "SaaS",
  industry: "Tech",
  year_founded: "2024",
  location: "Remote",
  employees: "1",
  profile_strength: 20,
  problem: "Describe the problem you are solving.",
  solution: "Describe your solution.",
  icp: "Target Customer",
  target_regions: ["Global"],
  features: ["Feature 1", "Feature 2"],
  pricing_model: "Subscription",
  revenue_example: "$0/mo",
  founders: [],
  metrics: {
    mrr: "$0",
    growth: "0%",
    users: "0",
    waitlist: "0",
    history: [0, 0, 0, 0, 0]
  },
  fundraising: {
    is_raising: false,
    amount: "0",
    use_of_funds: []
  },
  links: [],
  competitors: {
    list: [],
    differentiator: "What makes you unique?"
  },
  ai_insights: {
    summary: "Complete your profile to get AI insights.",
    match_score: 0,
    risks: [],
    steps: [],
    last_updated: "Never"
  }
};

const WORKFLOWS = [
  { 
    title: "Fundraising Workflow", 
    desc: "Get ready to pitch investors. Generates tasks, pitch deck, and updates.", 
    icon: TrendingUp,
    status: "In Progress"
  },
  { 
    title: "GTM Workflow", 
    desc: "Launch your product with channel strategy, messaging, and ICP analysis.", 
    icon: Rocket,
    status: "Pending"
  },
  { 
    title: "Product Roadmap", 
    desc: "Define features, prioritization, and milestone planning.", 
    icon: Zap,
    status: "Not Started"
  }
];

const QUICK_ACTIONS = [
  { label: "Pitch Deck", icon: Sparkles },
  { label: "One-Pager", icon: FileText },
  { label: "Market Sizing", icon: BarChart3 },
  { label: "GTM Strategy", icon: Rocket },
  { label: "Data Room", icon: FileText },
  { label: "Outreach", icon: MessageSquare },
];

interface FounderDashboardProps {
  onNavigate: (view: string) => void;
  onLeadClick: (lead: any) => void;
}

export const FounderDashboard: React.FC<FounderDashboardProps> = ({ onNavigate }) => {
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false); 
  
  const { profile, loading } = useStartupProfile();

  const STARTUP_PROFILE = profile ? {
      ...DEFAULT_PROFILE,
      ...profile,
      metrics: {
          mrr: profile.mrr || "$0",
          growth: profile.growth || "0%",
          users: profile.users || "0",
          waitlist: profile.waitlist || "0",
          history: profile.history || [0,0,0,0,0]
      },
      fundraising: {
          amount: profile.raiseAmount || "0",
          use_of_funds: profile.useOfFunds || []
      }
  } : DEFAULT_PROFILE;

  // --- Components ---
  
  if (loading) {
      return (
          <div className="flex items-center justify-center h-screen bg-[#F7F7F5]">
              <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-4 border-[#1A1A1A] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#6B7280] font-medium font-sans">Loading Dashboard...</p>
              </div>
          </div>
      );
  }

  const HeroSection = () => (
    <div className="relative mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E5E5E5]">
        <div className="space-y-4">
           <h1 className="text-4xl font-serif text-[#1A1A1A] tracking-tight leading-tight">
             {STARTUP_PROFILE.name}
           </h1>
           <p className="text-[#6B7280] text-lg max-w-2xl font-sans font-light">
             {STARTUP_PROFILE.tagline}
           </p>
           
           <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-[#6B7280] font-sans font-medium">
             <span className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> {STARTUP_PROFILE.industry}</span>
             <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {STARTUP_PROFILE.location}</span>
             <span className="flex items-center gap-2"><Users className="w-4 h-4" /> {STARTUP_PROFILE.employees} Employees</span>
           </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={() => setIsEditProfileOpen(true)} 
            className="bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F7F7F5] shadow-sm font-sans font-medium h-11 px-6 rounded-xl transition-all"
          >
            Edit Profile
          </Button>
          <Button 
             className="bg-[#1A1A1A] text-white hover:bg-black shadow-lg shadow-black/5 font-sans font-medium h-11 px-6 rounded-xl transition-all"
          >
             Share Profile
          </Button>
        </div>
      </div>
    </div>
  );

  const NextBestAction = () => (
    <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-md mb-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="flex items-center gap-5 relative z-10">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
          <Sparkles className="w-6 h-6 text-[#F3E8FF]" />
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1 font-sans">Next Best Action</div>
          <h3 className="text-xl font-serif font-medium tracking-wide">Update your Investor Deck</h3>
          <p className="text-white/70 text-sm mt-1 font-sans">Your fundraising workflow is active but the deck is 2 weeks old.</p>
        </div>
      </div>
      
      <Button className="bg-white text-[#1A1A1A] hover:bg-[#F3E8FF] border-0 font-bold px-6 h-11 rounded-xl shadow-none relative z-10 whitespace-nowrap">
        Update Deck
      </Button>
    </div>
  );

  const KPISection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
       {[
         { label: "MRR", value: STARTUP_PROFILE.metrics.mrr, change: "+12%", trend: "up" },
         { label: "Active Users", value: STARTUP_PROFILE.metrics.users, change: "+5%", trend: "up" },
         { label: "Runway", value: "8 Mo", change: "-1 Mo", trend: "down" },
         { label: "Profile Score", value: `${STARTUP_PROFILE.profile_strength}%`, change: "Improving", trend: "neutral" }
       ].map((kpi, i) => (
         <Card key={i} className="border border-[#E5E5E5] shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
               <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-3 font-sans">{kpi.label}</div>
               <div className="flex items-end justify-between">
                  <div className="text-3xl font-serif text-[#1A1A1A]">{kpi.value}</div>
                  <div className={cn(
                    "text-xs font-bold px-2 py-1 rounded-md mb-1",
                    kpi.trend === 'up' ? "bg-[#DCFCE7] text-[#166534]" :
                    kpi.trend === 'down' ? "bg-[#FEE2E2] text-[#991B1B]" :
                    "bg-[#F3F4F6] text-[#4B5563]"
                  )}>
                    {kpi.change}
                  </div>
               </div>
            </CardContent>
         </Card>
       ))}
    </div>
  );

  const InfoCard = ({ title, icon: Icon, children, className, action }: any) => (
    <Card className={cn("border border-[#E5E5E5] shadow-sm bg-white rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200", className)}>
      <CardHeader className="pb-4 pt-6 px-6 border-b border-[#F3F4F6] bg-white flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-serif text-[#1A1A1A] flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-[#6B7280]" />} {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent className="p-6 font-sans">
        {children}
      </CardContent>
    </Card>
  );

  const WorkflowCard = ({ workflow }: { workflow: any }) => (
    <div className="group relative flex gap-4 p-5 rounded-xl border border-[#E5E5E5] hover:border-[#1A1A1A]/20 bg-white hover:bg-[#F9FAFB] transition-all cursor-pointer">
       <div className={cn(
         "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
         workflow.status === 'In Progress' ? "bg-[#FEF3C7] text-[#92400E]" : 
         workflow.status === 'Completed' ? "bg-[#DCFCE7] text-[#166534]" :
         "bg-[#F3F4F6] text-[#6B7280]"
       )}>
          <workflow.icon className="w-6 h-6" strokeWidth={1.5} />
       </div>
       <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
             <h4 className="font-bold text-[#1A1A1A] text-sm font-sans">{workflow.title}</h4>
             <Badge variant="outline" className={cn(
               "text-[10px] font-bold uppercase tracking-wider border-0 px-2 py-0.5",
               workflow.status === 'In Progress' ? "bg-[#FEF3C7] text-[#92400E]" : 
               "bg-[#F3F4F6] text-[#6B7280]"
             )}>
               {workflow.status}
             </Badge>
          </div>
          <p className="text-xs text-[#6B7280] leading-relaxed">{workflow.desc}</p>
       </div>
       <ChevronRight className="w-4 h-4 text-[#E5E5E5] group-hover:text-[#1A1A1A] absolute right-4 top-1/2 -translate-y-1/2 transition-colors" />
    </div>
  );

  // Ai Assistant Content (Right Column)
  const AiAssistantContent = () => (
     <div className="bg-white border border-[#E5E5E5] shadow-sm rounded-2xl overflow-hidden h-full flex flex-col">
        <div className="p-6 border-b border-[#E5E5E5] bg-[#F3E8FF]/30">
           <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#A855F7] flex items-center justify-center border border-[#E9D5FF]">
                 <Sparkles className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="font-serif font-medium text-[#1A1A1A] text-lg">AI Coach</h3>
                 <p className="text-xs text-[#6B7280] font-sans uppercase tracking-wider">Strategic Insights</p>
              </div>
           </div>
        </div>
        
        <div className="p-6 space-y-8 flex-grow overflow-y-auto font-sans">
          
          {/* Insight Block */}
          <div>
             <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Focus Area</h4>
             <div className="bg-[#F3E8FF]/20 rounded-xl p-5 border border-[#F3E8FF]">
                <p className="text-sm text-[#1A1A1A] leading-relaxed italic font-medium">
                  "{STARTUP_PROFILE.ai_insights.summary}"
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#6B21A8]">
                   <Zap className="w-3.5 h-3.5" /> High Impact Opportunity
                </div>
             </div>
          </div>

          {/* Risks */}
          <div>
              <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Risk Radar</h4>
              <div className="space-y-3">
                {STARTUP_PROFILE.ai_insights.risks.length > 0 ? STARTUP_PROFILE.ai_insights.risks.map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm text-[#991B1B] bg-[#FEE2E2]/40 p-3 rounded-lg border border-[#FEE2E2] items-start">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                )) : (
                    <div className="text-sm text-[#6B7280] italic">No critical risks detected.</div>
                )}
              </div>
          </div>

          {/* Steps */}
          <div>
              <h4 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Suggested Steps</h4>
              <div className="space-y-3">
                {STARTUP_PROFILE.ai_insights.steps.map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm text-[#1A1A1A] bg-[#F7F7F5] p-3 rounded-lg border border-[#E5E5E5] hover:border-[#D1D5DB] transition-colors cursor-pointer group items-start">
                      <div className="w-5 h-5 rounded-full border border-[#D1D5DB] bg-white group-hover:border-[#1A1A1A] transition-colors flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </div>
                ))}
              </div>
          </div>

        </div>
        
        <div className="p-4 border-t border-[#E5E5E5] bg-[#F7F7F5]">
           <Button variant="outline" className="w-full bg-white border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F3E8FF] hover:border-[#F3E8FF] hover:text-[#6B21A8] h-11 rounded-xl font-bold transition-all shadow-sm">
             Generate Full Report
           </Button>
        </div>
     </div>
  );

  // --- Main Layout ---
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F7F7F5] relative font-sans text-[#1A1A1A]">
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <div className="max-w-[1600px] mx-auto p-8 lg:p-10 pb-32">
          
          {/* 1. Hero & Header */}
          <HeroSection />

          {/* 2. Next Best Action */}
          <NextBestAction />

          {/* 3. KPI Grid */}
          <KPISection />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN (Main Content - 2/3) */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* Active Workflows */}
              <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm p-6 md:p-8">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="font-serif text-xl text-[#1A1A1A]">Active Workflows</h3>
                    <Button variant="link" className="text-[#6B7280] hover:text-[#1A1A1A] p-0 h-auto font-sans font-medium">View All</Button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {WORKFLOWS.map((flow, i) => (
                       <WorkflowCard key={i} workflow={flow} />
                    ))}
                    <button className="flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-[#E5E5E5] hover:border-[#1A1A1A] hover:bg-[#F7F7F5] transition-all gap-2 text-[#6B7280] hover:text-[#1A1A1A] group h-full min-h-[100px]">
                       <Plus className="w-6 h-6 text-[#D1D5DB] group-hover:text-[#1A1A1A]" />
                       <span className="text-xs font-bold uppercase tracking-wider">Add Workflow</span>
                    </button>
                 </div>
              </div>
              
              {/* Quick Assets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard title="Pitch Materials" icon={FileText} action={<Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>}>
                   <div className="space-y-1">
                      {[
                        { name: "Series A Deck.pdf", date: "2d ago", size: "2.4 MB" },
                        { name: "Financial Model v3.xlsx", date: "5d ago", size: "1.1 MB" },
                        { name: "One Pager.pdf", date: "1w ago", size: "800 KB" }
                      ].map((file, i) => (
                         <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F7F7F5] rounded-lg transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-[#F3F4F6] rounded-lg flex items-center justify-center text-[#6B7280] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                                  <FileText className="w-4 h-4" />
                               </div>
                               <div>
                                  <div className="text-sm font-medium text-[#1A1A1A]">{file.name}</div>
                                  <div className="text-[10px] text-[#9CA3AF]">{file.date} • {file.size}</div>
                               </div>
                            </div>
                            <Button size="icon" variant="ghost" className="h-7 w-7 opacity-0 group-hover:opacity-100"><ArrowRight className="w-3.5 h-3.5" /></Button>
                         </div>
                      ))}
                   </div>
                   <Button variant="outline" className="w-full mt-5 border-[#E5E5E5] text-[#1A1A1A] text-xs font-bold h-9 rounded-lg">View Data Room</Button>
                </InfoCard>

                <InfoCard title="Team Availability" icon={Users}>
                   <div className="space-y-4">
                      {STARTUP_PROFILE.founders.map((founder, i) => (
                         <div key={i} className="flex items-center gap-4">
                            <Avatar className="w-10 h-10 border border-[#E5E5E5]">
                               <AvatarImage src={founder.avatar} />
                               <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                               <div className="text-sm font-bold text-[#1A1A1A]">{founder.name}</div>
                               <div className="flex items-center gap-2 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-[#DCFCE7] border border-[#166534]"></div>
                                  <span className="text-xs text-[#6B7280]">Online</span>
                               </div>
                            </div>
                         </div>
                      ))}
                      <div className="pt-2">
                        <Button variant="ghost" className="w-full text-xs text-[#6B7280] hover:text-[#1A1A1A]">Manage Team Access</Button>
                      </div>
                   </div>
                </InfoCard>
              </div>

            </div>

            {/* RIGHT COLUMN (AI Panel - 1/3) */}
            <div className="xl:col-span-4 h-full min-h-[600px]">
              <AiAssistantContent />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
