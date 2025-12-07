import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Plus, 
  MoreHorizontal,
  Zap,
  Target,
  Globe,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  FileText,
  Rocket,
  BarChart3,
  Mail,
  FolderOpen,
  ArrowRight,
  MessageSquare,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Linkedin,
  Github,
  Twitter,
  Video,
  Link as LinkIcon,
  DollarSign,
  Calendar,
  MapPin,
  RefreshCw,
  ExternalLink,
  PieChart,
  Layers
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Progress } from "../ui/progress";
import { toast } from "sonner@2.0.3";
import { Separator } from "../ui/separator";

// --- Mock Data: SkyOffice ---
const STARTUP_PROFILE = {
  name: "SkyOffice",
  tagline: "Virtual HQ for async & remote-first teams",
  logo_url: "https://api.dicebear.com/7.x/shapes/svg?seed=SkyOffice&backgroundColor=6366f1",
  cover_image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  stage: "Seed",
  business_model: "B2B SaaS",
  industry: "Productivity",
  year_founded: "2023",
  location: "San Francisco, CA",
  employees: "12",
  profile_strength: 85,
  problem: "Remote teams struggle with fragmented workflows and async burnout.",
  solution: "A virtual HQ that unifies communication, standups, and task workflows.",
  icp: "SMB + Mid-market tech companies (20–500 employees)",
  target_regions: ["North America", "Europe"],
  features: [
    "Virtual HQ Rooms",
    "Async Standups",
    "Unified Activity Feed",
    "Meeting Playback",
    "Jira Integration"
  ],
  pricing_model: "Per User Subscription",
  revenue_example: "$49/mo per user",
  founders: [
    { name: "Alex Johnson", title: "CEO", bio: "ex-Slack PM", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", linkedin: "#" },
    { name: "Maria Chen", title: "CTO", bio: "ex-Notion Eng", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria", linkedin: "#" }
  ],
  metrics: {
    mrr: "$12,400",
    growth: "14%",
    users: "1,250",
    waitlist: "3,100",
    history: [35, 45, 60, 75, 80, 90, 100]
  },
  fundraising: {
    is_raising: true,
    amount: "$500,000",
    use_of_funds: ["Engineering", "Marketing", "Infrastructure"]
  },
  links: [
    { type: 'website', url: 'https://skyoffice.com', label: 'Website', icon: Globe },
    { type: 'linkedin', url: '#', label: 'LinkedIn', icon: Linkedin },
    { type: 'pitch_deck', url: '#', label: 'Pitch Deck', icon: FileText },
    { type: 'demo', url: '#', label: 'Demo Video', icon: Video },
    { type: 'github', url: '#', label: 'GitHub', icon: Github }
  ],
  competitors: {
    list: ["Slack", "Zoom", "Gather", "Microsoft Teams"],
    differentiator: "More async-first and task-integrated than Slack or Zoom."
  },
  ai_insights: {
    summary: "SkyOffice shows strong product-market fit signals in the remote work sector but needs more robust traction data for Series A readiness.",
    match_score: 85,
    risks: ["Low pricing clarity", "Competitor differentiation weak", "Churn metrics missing"],
    steps: ["Add detailed competitor comparison", "Upload latest cohort retention data", "Refine GTM channel strategy"],
    last_updated: "2 hours ago"
  }
};

const WORKFLOWS = [
  { 
    title: "Fundraising Workflow", 
    desc: "Get ready to pitch investors. Generates tasks, pitch deck, and updates.", 
    icon: TrendingUp,
    color: "bg-green-100 text-green-700" 
  },
  { 
    title: "GTM Workflow", 
    desc: "Launch your product with channel strategy, messaging, and ICP analysis.", 
    icon: Rocket,
    color: "bg-blue-100 text-blue-700"
  },
  { 
    title: "Product Roadmap", 
    desc: "Define features, prioritization, and milestone planning.", 
    icon: Zap,
    color: "bg-purple-100 text-purple-700"
  }
];

const QUICK_ACTIONS = [
  { label: "Pitch Deck", icon: Sparkles, color: "text-indigo-600 bg-indigo-50" },
  { label: "One-Pager", icon: FileText, color: "text-blue-600 bg-blue-50" },
  { label: "Market Sizing", icon: PieChart, color: "text-emerald-600 bg-emerald-50" },
  { label: "GTM Strategy", icon: Rocket, color: "text-purple-600 bg-purple-50" },
  { label: "Data Room", icon: FolderOpen, color: "text-amber-600 bg-amber-50" },
  { label: "Outreach", icon: Mail, color: "text-pink-600 bg-pink-50" },
];

interface FounderDashboardProps {
  onNavigate: (view: string) => void;
  onLeadClick: (lead: any) => void;
}

export const FounderDashboard: React.FC<FounderDashboardProps> = ({ onNavigate }) => {
  const [isAiPanelOpen, setIsAiPanelOpen] = useState(false); // Mobile toggle

  // --- Components ---

  const HeroSection = () => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8">
      {/* Cover Image */}
      <div 
        className="h-32 md:h-48 w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${STARTUP_PROFILE.cover_image_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <div className="px-6 pb-6 relative">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-10 md:-mt-12 gap-4 md:gap-6">
          {/* Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden z-10">
            <img src={STARTUP_PROFILE.logo_url} alt="Logo" className="w-full h-full object-cover" />
          </div>

          {/* Main Info */}
          <div className="flex-grow pt-2 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {STARTUP_PROFILE.name}
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">{STARTUP_PROFILE.stage}</Badge>
                </h1>
                <p className="text-slate-600 mt-1">{STARTUP_PROFILE.tagline}</p>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {STARTUP_PROFILE.industry}</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {STARTUP_PROFILE.business_model}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Est. {STARTUP_PROFILE.year_founded}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {STARTUP_PROFILE.location}</span>
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {STARTUP_PROFILE.employees} Employees</span>
                </div>
              </div>

              {/* Edit Action */}
              <Button onClick={() => onNavigate('wizard')} className="hidden md:flex bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm">
                <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Profile Strength */}
        <div className="flex items-center gap-4">
          <div className="flex-grow max-w-md">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Profile Strength</span>
              <span className="text-slate-500">{STARTUP_PROFILE.profile_strength}%</span>
            </div>
            <Progress value={STARTUP_PROFILE.profile_strength} className="h-2" />
            <p className="text-[10px] text-slate-400 mt-1">Complete more fields to reach 100%</p>
          </div>
          <Button variant="outline" size="sm" className="md:hidden ml-auto" onClick={() => onNavigate('wizard')}>
             <Edit2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-8">
      {QUICK_ACTIONS.map((action, i) => (
        <button 
          key={i}
          className="flex flex-col items-center justify-center p-3 md:p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group h-24 md:h-28"
          onClick={() => toast.info(`Launching ${action.label}...`)}
        >
          <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform", action.color)}>
             <action.icon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-700 text-center leading-tight">{action.label}</span>
        </button>
      ))}
    </div>
  );

  const InfoCard = ({ title, icon: Icon, children, className, action }: any) => (
    <Card className={cn("border-slate-200 shadow-sm h-full", className)}>
      <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 flex flex-row items-center justify-between space-y-0 px-4 py-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-800">
          {Icon && <Icon className="w-4 h-4 text-indigo-600" />} {title}
        </CardTitle>
        {action}
      </CardHeader>
      <CardContent className="p-4 pt-4">
        {children}
      </CardContent>
    </Card>
  );

  const Sparkline = ({ data }: { data: number[] }) => (
    <div className="flex items-end gap-1 h-8 w-full mt-3">
      {data.map((val, i) => (
        <div 
          key={i} 
          className="flex-1 bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500 transition-colors"
          style={{ height: `${val}%` }} 
        />
      ))}
    </div>
  );

  const FundraisingCard = () => (
    <InfoCard title="Fundraising" icon={DollarSign} action={<Button variant="ghost" size="icon" className="h-6 w-6"><Edit2 className="w-3 h-3 text-slate-400" /></Button>}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">
            Currently Raising
          </Badge>
          <span className="font-bold text-slate-900">{STARTUP_PROFILE.fundraising.amount}</span>
        </div>
        
        <div>
          <span className="text-xs font-bold uppercase text-slate-500">Use of Funds</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {STARTUP_PROFILE.fundraising.use_of_funds.map((use, i) => (
              <Badge key={i} variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100">
                {use}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button size="sm" variant="outline" className="w-full text-xs h-8">Update Funding Info</Button>
      </div>
    </InfoCard>
  );

  const LinksCard = () => (
    <InfoCard title="Important Links" icon={LinkIcon} action={<Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-3 h-3 text-slate-400" /></Button>}>
       <div className="space-y-2">
          {STARTUP_PROFILE.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group text-sm"
            >
               <div className="flex items-center gap-2 text-slate-700">
                 <link.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                 {link.label}
               </div>
               <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
       </div>
    </InfoCard>
  );

  // --- Main Layout ---
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8FAFC]">
      <div className="flex-grow overflow-y-auto scrollbar-thin">
        <div className="max-w-[1440px] mx-auto p-4 md:p-6 lg:p-8 pb-32 md:pb-8">
          
          {/* 1. Hero */}
          <HeroSection />

          {/* 2. Quick Actions */}
          <QuickActions />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN (Main Content) */}
            <div className="xl:col-span-9 space-y-6">
              
              {/* Row: Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Problem & Solution" icon={Target}>
                   <div className="space-y-4">
                     <div>
                       <span className="text-xs font-bold uppercase text-slate-400">Problem</span>
                       <p className="text-sm text-slate-700 leading-relaxed mt-1">{STARTUP_PROFILE.problem}</p>
                     </div>
                     <div>
                       <span className="text-xs font-bold uppercase text-slate-400">Solution</span>
                       <p className="text-sm text-slate-700 leading-relaxed mt-1">{STARTUP_PROFILE.solution}</p>
                     </div>
                   </div>
                </InfoCard>

                <InfoCard title="Target Market" icon={Globe}>
                   <ul className="space-y-3 text-sm text-slate-700">
                     <li className="flex justify-between">
                       <span className="text-slate-500">ICP</span>
                       <span className="font-medium text-right max-w-[120px] truncate">{STARTUP_PROFILE.icp}</span>
                     </li>
                     <li className="flex justify-between">
                       <span className="text-slate-500">Regions</span>
                       <span className="font-medium">{STARTUP_PROFILE.target_regions.join(", ")}</span>
                     </li>
                   </ul>
                   <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 mb-1">
                        <Sparkles className="w-3 h-3" /> AI Insight
                      </div>
                      <p className="text-xs text-indigo-900 leading-relaxed">Based on your industry, estimated TAM is $4.5B.</p>
                   </div>
                </InfoCard>

                <InfoCard title="Product Features" icon={ShieldCheck}>
                   <ul className="space-y-2">
                     {STARTUP_PROFILE.features.map((f, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                         <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                         <span className="leading-tight">{f}</span>
                       </li>
                     ))}
                   </ul>
                </InfoCard>
              </div>

              {/* Row: Business & Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Business Model" icon={Briefcase}>
                   <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-1 border-b border-slate-100">
                         <span className="text-slate-500">Model</span>
                         <span className="font-medium">{STARTUP_PROFILE.business_model}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-100">
                         <span className="text-slate-500">Pricing</span>
                         <span className="font-medium">{STARTUP_PROFILE.pricing_model}</span>
                      </div>
                      <div className="flex justify-between py-1">
                         <span className="text-slate-500">Revenue</span>
                         <span className="font-medium">{STARTUP_PROFILE.revenue_example}</span>
                      </div>
                   </div>
                   <div className="mt-3 text-xs text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-bold text-slate-700">AI Note:</span> Consider adding annual pricing incentives.
                   </div>
                </InfoCard>

                <InfoCard title="Founder & Team" icon={Users}>
                   <div className="space-y-4">
                      {STARTUP_PROFILE.founders.map((founder, i) => (
                         <div key={i} className="flex gap-3 items-start">
                            <Avatar className="w-9 h-9 border border-slate-200">
                               <AvatarImage src={founder.avatar} />
                               <AvatarFallback>{founder.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                               <div className="flex justify-between items-start">
                                 <div className="text-sm font-bold text-slate-900">{founder.name}</div>
                                 <a href={founder.linkedin} className="text-slate-400 hover:text-blue-600"><Linkedin className="w-3 h-3" /></a>
                               </div>
                               <div className="text-xs text-slate-500">{founder.title}</div>
                               <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{founder.bio}</div>
                            </div>
                         </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full text-xs h-8">
                        <Plus className="w-3 h-3 mr-2" /> Add Co-Founder
                      </Button>
                   </div>
                </InfoCard>

                <InfoCard title="Traction" icon={TrendingUp}>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                         <div className="text-xs text-slate-500 uppercase font-bold">MRR</div>
                         <div className="text-lg font-bold text-slate-900">{STARTUP_PROFILE.metrics.mrr}</div>
                      </div>
                      <div>
                         <div className="text-xs text-slate-500 uppercase font-bold">Users</div>
                         <div className="text-lg font-bold text-slate-900">{STARTUP_PROFILE.metrics.users}</div>
                      </div>
                      <div>
                         <div className="text-xs text-slate-500 uppercase font-bold">Growth</div>
                         <div className="text-lg font-bold text-green-600">+{STARTUP_PROFILE.metrics.growth}</div>
                      </div>
                      <div>
                         <div className="text-xs text-slate-500 uppercase font-bold">Waitlist</div>
                         <div className="text-lg font-bold text-slate-900">{STARTUP_PROFILE.metrics.waitlist}</div>
                      </div>
                   </div>
                   <Sparkline data={STARTUP_PROFILE.metrics.history} />
                </InfoCard>
              </div>

              {/* Row: Funding & Links & Competitors */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FundraisingCard />
                <LinksCard />
                <InfoCard title="Competitors" icon={Target} action={<Badge variant="outline">Overlap: Low</Badge>}>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {STARTUP_PROFILE.competitors.list.map((comp, i) => (
                      <Badge key={i} variant="outline" className="text-sm py-1 px-3 bg-slate-50 text-slate-700 font-medium">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm text-slate-600">
                    <span className="font-bold text-slate-800">Differentiator:</span> {STARTUP_PROFILE.competitors.differentiator}
                  </div>
                </InfoCard>
              </div>

              {/* Workflows */}
              <div>
                 <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-indigo-600" /> Recommended Workflows
                 </h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {WORKFLOWS.map((flow, i) => (
                       <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", flow.color)}>
                             <flow.icon className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors flex items-center justify-between">
                             {flow.title} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed">{flow.desc}</p>
                       </div>
                    ))}
                 </div>
              </div>

            </div>

            {/* RIGHT COLUMN (AI Panel) */}
            <div className="xl:col-span-3">
               {/* Mobile Toggle */}
               <div className="xl:hidden mb-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between bg-white border-violet-200 text-violet-700 hover:bg-violet-50 h-12"
                    onClick={() => setIsAiPanelOpen(!isAiPanelOpen)}
                  >
                    <span className="flex items-center gap-2 font-bold"><Sparkles className="w-4 h-4 fill-violet-200" /> AI Insights</span>
                    {isAiPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
               </div>

               {/* AI Panel Content */}
               <div className={cn(
                  "space-y-4 xl:sticky xl:top-6",
                  !isAiPanelOpen && "hidden xl:block"
               )}>
                  <Card className="border-violet-100 shadow-lg shadow-violet-100/50 bg-gradient-to-b from-white to-violet-50/50 overflow-hidden">
                     <CardHeader className="bg-violet-600 text-white pb-6 pt-6 relative overflow-hidden">
                        <div className="relative z-10">
                           <CardTitle className="flex items-center gap-2 text-lg">
                              <Sparkles className="w-5 h-5 text-violet-200" /> Gemini Coach
                           </CardTitle>
                           <CardDescription className="text-violet-100 mt-1 opacity-90 flex items-center gap-2">
                             <RefreshCw className="w-3 h-3" /> Updated {STARTUP_PROFILE.ai_insights.last_updated}
                           </CardDescription>
                        </div>
                        {/* Background blobs */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
                     </CardHeader>
                     
                     <CardContent className="pt-6 space-y-6">
                        
                        {/* Match Score */}
                        <div className="flex flex-col items-center justify-center p-4 bg-white/60 rounded-xl border border-violet-100 backdrop-blur-sm">
                           <div className="relative w-24 h-24 flex items-center justify-center">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-violet-600" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - STARTUP_PROFILE.ai_insights.match_score / 100)} strokeLinecap="round" />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                 <span className="text-2xl font-bold text-violet-700">{STARTUP_PROFILE.ai_insights.match_score}%</span>
                                 <span className="text-[10px] uppercase font-bold text-violet-400">Match</span>
                              </div>
                           </div>
                        </div>

                        {/* Summary */}
                        <div>
                           <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Summary</h4>
                           <p className="text-sm text-slate-700 leading-relaxed italic">
                              "{STARTUP_PROFILE.ai_insights.summary}"
                           </p>
                        </div>

                        {/* Risks */}
                        <div>
                           <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Detected Risks</h4>
                           <div className="space-y-2">
                              {STARTUP_PROFILE.ai_insights.risks.map((item, i) => (
                                 <div key={i} className="flex gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-100 items-start">
                                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Next Steps */}
                        <div>
                           <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Recommended Steps</h4>
                           <div className="space-y-2">
                              {STARTUP_PROFILE.ai_insights.steps.map((item, i) => (
                                 <div key={i} className="flex gap-2 text-xs text-violet-700 bg-violet-50 p-2 rounded-lg border border-violet-100 items-start">
                                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <Separator className="bg-violet-100" />

                        <div className="grid grid-cols-1 gap-2">
                           <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-md shadow-violet-200">
                              Generate Tasks
                           </Button>
                           <Button variant="outline" className="w-full border-violet-200 text-violet-700 hover:bg-violet-50">
                              Improve Profile
                           </Button>
                           <Button variant="ghost" className="w-full text-slate-500 hover:text-violet-600">
                              Ask Gemini Anything
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Floating Action Bar */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
         <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-full p-2 shadow-2xl flex items-center justify-between pl-6 pr-2 border border-slate-700">
            <span className="font-semibold text-sm">Actions</span>
            <div className="flex gap-2">
               <Button size="sm" className="rounded-full bg-indigo-600 hover:bg-indigo-500 text-xs h-9">
                  <Sparkles className="w-3 h-3 mr-2" /> Pitch Deck
               </Button>
               <Button size="icon" variant="ghost" className="rounded-full hover:bg-white/10 text-slate-300 h-9 w-9">
                  <MessageSquare className="w-4 h-4" />
               </Button>
            </div>
         </div>
      </div>
      
    </div>
  );
};
