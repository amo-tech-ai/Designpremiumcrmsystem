import React, { useState } from 'react';
import { 
  Target, 
  Megaphone, 
  Box, 
  Compass, 
  Handshake, 
  Rocket, 
  ArrowRight,
  Globe,
  Zap,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Sparkles,
  LayoutTemplate,
  Users,
  MessageSquare,
  Map,
  TrendingUp,
  Ticket,
  Music,
  Calendar,
  Instagram,
  Mic2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

export const GTMStrategy: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="flex flex-col xl:flex-row h-full bg-[#F6F7FB] overflow-hidden font-sans text-slate-800">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar order-2 xl:order-1">
        <div className="max-w-6xl mx-auto w-full p-6 md:p-8 space-y-10 md:space-y-12">
          
          {/* 1. HEADER SECTION (EVENT-OS Context) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Go-To-Market Strategy (GTM)</h1>
              <p className="text-slate-500 text-lg max-w-2xl font-medium">
                A simple step-by-step plan to launch your event product, reach attendees, attract sponsors, and grow steadily.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="bg-white hover:bg-slate-50 gap-2 border-slate-200 text-slate-600 rounded-xl shadow-sm">
                <LayoutTemplate className="w-4 h-4" /> View Templates
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg shadow-blue-900/20 gap-2 rounded-xl border-0">
                <Sparkles className="w-4 h-4" /> Generate Strategy with AI
              </Button>
            </div>
          </div>

          {/* 2. EVENT-OS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Audience & Market', 
                desc: 'Understand your event niche, attendee groups, and customer demand.', 
                icon: Users, 
                color: 'text-blue-600', 
                bg: 'bg-blue-50' 
              },
              { 
                title: 'Messaging & Value', 
                desc: 'Explain what makes your event or product experience unique.', 
                icon: MessageSquare, 
                color: 'text-violet-600', 
                bg: 'bg-violet-50' 
              },
              { 
                title: 'Launch Channels', 
                desc: 'Choose how you’ll reach attendees, partners, and your earliest customers.', 
                icon: Megaphone, 
                color: 'text-teal-600', 
                bg: 'bg-teal-50' 
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105", card.bg, card.color)}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-800 mb-2">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* 3. EVENT-OS LAUNCH WORKFLOW (6 Steps) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Launch Workflow</h2>
            </div>

            <div className="relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 transform -translate-y-1/2 rounded-full"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                {[
                  { id: 1, title: 'Know Your Audience', desc: 'Profiles, needs, and segments.', icon: Users },
                  { id: 2, title: 'Create Messaging', desc: 'What you offer and why it matters.', icon: MessageSquare },
                  { id: 3, title: 'Event/Product Readiness', desc: 'Theme, tickets, onboarding, and feature setup.', icon: Calendar },
                  { id: 4, title: 'Marketing Channels', desc: 'IG, TikTok, LinkedIn, PR, partnerships.', icon: Megaphone },
                  { id: 5, title: 'Activation & Sales', desc: 'Convert interest into signups and paid users.', icon: Ticket },
                  { id: 6, title: 'Scale & Repeat', desc: 'Grow, refine, expand.', icon: TrendingUp }
                ].map((step, idx) => {
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  
                  return (
                    <div 
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className={cn(
                        "relative flex flex-col items-center text-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 h-full justify-center bg-white",
                        isActive ? "border-blue-500 shadow-md ring-4 ring-blue-50 scale-105 z-10" : "border-transparent shadow-sm hover:border-blue-200",
                        !isActive && "border-slate-100"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors",
                        isActive ? "bg-blue-600 text-white" : isCompleted ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
                      )}>
                        {isCompleted ? <CheckCircle className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">STEP 0{step.id}</div>
                      <h3 className={cn("font-bold text-sm mb-1 leading-tight", isActive ? "text-blue-900" : "text-slate-700")}>{step.title}</h3>
                      <p className="text-xs text-slate-500 font-medium">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. EVENT FLOW DIAGRAM */}
          <div className="py-4 md:py-8">
             <div className="bg-white/50 rounded-2xl p-8 border border-slate-200/60 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[900px] relative px-4">
                   {/* Diagram Nodes */}
                   {[
                     'Know Audience', 
                     'Craft Messaging', 
                     'Prepare Product', 
                     'Select Channels', 
                     'Activate & Sell', 
                     'Grow & Repeat'
                   ].map((label, i, arr) => (
                     <React.Fragment key={i}>
                       <div className="flex flex-col items-center gap-3 z-10 relative group">
                          <div className="px-5 py-3 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center text-center min-w-[140px] transition-all group-hover:border-blue-300 group-hover:shadow-md group-hover:-translate-y-1">
                             <span className="text-sm font-semibold text-slate-600 group-hover:text-blue-700">{label}</span>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors"></div>
                       </div>
                       {i < arr.length - 1 && (
                         <div className="flex-grow h-px bg-slate-300 mx-2 relative top-[-14px]">
                            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-[#F6F7FB] p-1 rounded-full">
                               <ArrowRight className="w-4 h-4 text-slate-300" />
                            </div>
                         </div>
                       )}
                     </React.Fragment>
                   ))}
                </div>
             </div>
          </div>

          {/* 5. INTERNAL STRATEGY SECTIONS (EVENT-OS Themed) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Audience Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-lg">Audience & Segments</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Primary Target</div>
                     <div className="font-semibold text-slate-700">Fashion & Tech Innovators</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Key Interests</div>
                     <ul className="text-sm text-slate-600 space-y-2">
                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Sustainable Fashion</li>
                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Digital Showrooms</li>
                        <li className="flex items-start gap-2"><span className="text-blue-400">•</span> Exclusive Brand Drops</li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* Value Messaging Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center"><MessageSquare className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-lg">Core Messaging</h3>
               </div>
               <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">One-Liner</div>
                     <div className="font-semibold text-slate-700 italic">"The future of fashion is immersive and digital."</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                     <div className="text-xs font-bold text-slate-400 uppercase mb-2">Vibe Keywords</div>
                     <div className="flex flex-wrap gap-2">
                        {['Innovative', 'Seamless', 'Global'].map(tag => (
                           <Badge key={tag} variant="secondary" className="bg-white border border-slate-200 text-slate-600 font-normal px-3 py-1">{tag}</Badge>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Channels Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center"><Megaphone className="w-5 h-5" /></div>
                  <h3 className="font-bold text-slate-800 text-lg">Launch Channels</h3>
               </div>
               <div className="space-y-3">
                  {[
                    { channel: 'Instagram & TikTok', status: 'Active', metric: 'Growing Reach' },
                    { channel: 'Fashion PR', status: 'Active', metric: '2 Partnerships' },
                    { channel: 'LinkedIn Outreach', status: 'Planning', metric: 'Targeting Founders' }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg transition-colors">
                       <div>
                          <div className="font-semibold text-slate-700 text-sm">{c.channel}</div>
                          <div className="text-xs text-slate-400">{c.metric}</div>
                       </div>
                       <Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className={cn(
                          "text-[10px] px-2 py-0.5",
                          c.status === 'Active' ? "bg-teal-100 text-teal-700 hover:bg-teal-200 border-teal-200" : "bg-slate-100 text-slate-500"
                       )}>
                          {c.status}
                       </Badge>
                    </div>
                  ))}
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* 6. AI ASSISTANT PANEL (EVENT-OS Data) */}
      <div className="w-full xl:w-[350px] bg-white xl:border-l border-b xl:border-b-0 border-slate-200 flex flex-col flex-shrink-0 z-20 order-1 xl:order-2">
         <div className="p-6 border-b border-slate-100 bg-blue-50/30">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
               </div>
               <h3 className="font-bold text-blue-900">EventOS AI</h3>
            </div>
            <p className="text-sm text-slate-600">Real-time insights for your launch.</p>
         </div>
         
         {/* Assistant Content */}
         <div className="p-6 space-y-6 overflow-y-auto max-h-[400px] xl:max-h-none">
            
            {/* Helpful Insights */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Helpful Insights</h4>
               <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 transition-all hover:shadow-sm">
                  <div className="flex items-start gap-3">
                     <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                     <div>
                        <p className="text-sm text-blue-900 leading-relaxed font-medium mb-2">
                           Your pricing may be low for your target users. Consider VIP or tiered options.
                        </p>
                        <p className="text-sm text-blue-900 leading-relaxed font-medium">
                           Your venue or platform capacity is under forecast; increase promotional reach.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Things to Improve */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Things to Improve</h4>
               <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 transition-all hover:shadow-sm">
                  <div className="flex items-start gap-3">
                     <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                     <div>
                        <p className="text-sm text-amber-900 leading-relaxed font-medium mb-2">
                           Social engagement dropped this week; try boosting key posts.
                        </p>
                        <p className="text-sm text-amber-900 leading-relaxed font-medium">
                           Consider collaborating with creators or micro-influencers.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Suggested Next Steps */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Next Steps</h4>
               <div className="space-y-2">
                  {[
                    "Draft outreach messages for potential partners",
                    "Update your hero visuals to match your theme",
                    "Check your funnel for drop-off points"
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">
                       <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500 bg-white flex-shrink-0"></div>
                       <span className="text-sm text-slate-600 group-hover:text-slate-900 font-medium">{task}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Market Signals */}
            <div className="pt-4 border-t border-slate-100">
               <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Market Signals</h4>
               <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-600">Competition</span>
                     <Badge variant="outline" className="bg-white text-orange-500 border-orange-200">High Activity</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 mb-2 pl-1">
                     High activity in event and creative planning sectors.
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-slate-600">Trends</span>
                     <Badge variant="outline" className="bg-white text-teal-600 border-teal-200">AI Tools (+14%)</Badge>
                  </div>
                   <p className="text-xs text-slate-500 mt-1 pl-1">
                     Rising interest in AI-assisted event tools.
                  </p>
               </div>
            </div>

         </div>
         
         <div className="p-4 border-t border-slate-100 bg-slate-50/30 mt-auto">
            <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 shadow-sm h-10 rounded-xl">
               Ask EventOS AI a Question
            </Button>
         </div>
      </div>

    </div>
  );
};
