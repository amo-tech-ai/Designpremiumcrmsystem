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
  Mic2,
  CheckCircle2,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

export const GTMStrategy: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  return (
    <div className="flex flex-col xl:flex-row h-full bg-[#FAF9F7] overflow-hidden font-sans text-[#1A1F2C]">
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar order-2 xl:order-1">
        <div className="max-w-[1400px] mx-auto w-full p-8 md:p-12 space-y-12">
          
          {/* 1. HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E3E7EE] pb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                 <h1 className="text-3xl font-bold text-[#1A1F2C] tracking-tight">Go-To-Market Strategy</h1>
                 <Badge variant="secondary" className="bg-[#EAF1FF] text-[#3A4250] border-[#DCE4F4] font-semibold px-2.5 py-0.5 rounded-full text-xs">
                    <Sparkles className="w-3 h-3 mr-1.5 inline text-[#6070A0]" /> AI Powered
                 </Badge>
              </div>
              <p className="text-[#4A4F5B] text-lg max-w-2xl font-medium leading-relaxed">
                A simple step-by-step plan to launch your product, reach customers, attract partners, and grow steadily.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="bg-white hover:bg-[#F3F6FB] gap-2 border-[#E3E7EE] text-[#4A4F5B] rounded-xl shadow-sm font-medium h-11 px-5">
                <LayoutTemplate className="w-4 h-4 text-[#7A8191]" /> View Templates
              </Button>
              <Button className="bg-[#3A4250] hover:bg-[#2C333F] text-white shadow-md shadow-[#3A4250]/20 gap-2 rounded-xl border-0 h-11 px-5 font-medium transition-all">
                <Sparkles className="w-4 h-4 text-[#EAF1FF]" /> Generate Strategy
              </Button>
            </div>
          </div>

          {/* 2. OVERVIEW CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                title: 'Audience & Market', 
                desc: 'Understand your niche, customer segments, and demand.', 
                icon: Users, 
                bg: 'bg-[#EAF1FF]',
                iconColor: 'text-[#3A4250]'
              },
              { 
                title: 'Messaging & Value', 
                desc: 'Explain what makes your product experience unique.', 
                icon: MessageSquare, 
                bg: 'bg-[#F3F6FB]',
                iconColor: 'text-[#6070A0]'
              },
              { 
                title: 'Launch Channels', 
                desc: 'Choose how you’ll reach partners and early customers.', 
                icon: Megaphone, 
                bg: 'bg-[#FFF9E6]',
                iconColor: 'text-[#E0B45A]'
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#E3E7EE] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all group cursor-pointer h-full flex flex-col">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-105", card.bg)}>
                  <card.icon className={cn("w-7 h-7", card.iconColor)} strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-xl text-[#1A1F2C] mb-2">{card.title}</h3>
                <p className="text-[#4A4F5B] text-sm leading-relaxed font-medium">{card.desc}</p>
                <div className="mt-auto pt-4 flex items-center text-xs font-bold text-[#7A8191] group-hover:text-[#3A4250] transition-colors uppercase tracking-wide">
                  View Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            ))}
          </div>

          {/* 3. LAUNCH WORKFLOW (Steps) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xl font-bold text-[#1A1F2C]">Launch Workflow</h2>
              <span className="text-sm font-medium text-[#7A8191]">Step {activeStep} of 6</span>
            </div>

            <div className="relative bg-white p-8 rounded-3xl border border-[#E3E7EE] shadow-sm">
              {/* Connector Line (Desktop) */}
              <div className="hidden lg:block absolute top-[88px] left-12 right-12 h-0.5 bg-[#F3F6FB] -z-0"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 relative z-10">
                {[
                  { id: 1, title: 'Know Audience', desc: 'Needs & Segments', icon: Users },
                  { id: 2, title: 'Messaging', desc: 'Value Prop', icon: MessageSquare },
                  { id: 3, title: 'Product Ready', desc: 'Feature Setup', icon: CheckCircle2 },
                  { id: 4, title: 'Channels', desc: 'PR & Outreach', icon: Megaphone },
                  { id: 5, title: 'Sales', desc: 'Conversion', icon: Ticket },
                  { id: 6, title: 'Scale', desc: 'Growth Loop', icon: TrendingUp }
                ].map((step, idx) => {
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id;
                  
                  return (
                    <div 
                      key={step.id}
                      onClick={() => setActiveStep(step.id)}
                      className="group flex flex-col items-center text-center cursor-pointer"
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300 border-4",
                        isActive 
                          ? "bg-[#3A4250] text-white border-[#EAF1FF] shadow-lg scale-110" 
                          : isCompleted 
                            ? "bg-[#EAF1FF] text-[#3A4250] border-white" 
                            : "bg-[#F3F6FB] text-[#9CA3AF] border-white group-hover:bg-[#E3E7EE]"
                      )}>
                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                      </div>
                      
                      <div className={cn(
                        "flex flex-col items-center transition-opacity",
                        isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                      )}>
                        <h3 className={cn("font-bold text-sm mb-1 leading-tight", isActive ? "text-[#1A1F2C]" : "text-[#7A8191]")}>{step.title}</h3>
                        <p className="text-xs text-[#9CA3AF] font-medium hidden lg:block">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. INTERNAL STRATEGY SECTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Audience Section */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E7EE] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF1FF] text-[#3A4250] flex items-center justify-center border border-[#DCE4F4]">
                    <Users className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1F2C] text-lg">Audience</h3>
                    <p className="text-xs text-[#7A8191] font-medium">Target segments</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E3E7EE]">
                     <div className="text-xs font-bold text-[#7A8191] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                       <Target className="w-3.5 h-3.5" /> Primary Target
                     </div>
                     <div className="font-bold text-[#1A1F2C] text-base">Fashion & Tech Innovators</div>
                  </div>
                  <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E3E7EE]">
                     <div className="text-xs font-bold text-[#7A8191] uppercase tracking-wider mb-3">Key Interests</div>
                     <ul className="text-sm text-[#4A4F5B] space-y-2.5 font-medium">
                        <li className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3A4250]"></div> Sustainable Fashion
                        </li>
                        <li className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3A4250]"></div> Digital Showrooms
                        </li>
                        <li className="flex items-center gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3A4250]"></div> Brand Drops
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* Messaging Section */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E7EE] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F3F6FB] text-[#6070A0] flex items-center justify-center border border-[#E3E7EE]">
                    <MessageSquare className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1F2C] text-lg">Messaging</h3>
                    <p className="text-xs text-[#7A8191] font-medium">Core value prop</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E3E7EE]">
                     <div className="text-xs font-bold text-[#7A8191] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                       <Sparkles className="w-3.5 h-3.5" /> One-Liner
                     </div>
                     <div className="font-medium text-[#1A1F2C] italic leading-relaxed text-base">"The future of fashion is immersive and digital."</div>
                  </div>
                  <div className="p-5 bg-[#FAF9F7] rounded-xl border border-[#E3E7EE]">
                     <div className="text-xs font-bold text-[#7A8191] uppercase tracking-wider mb-3">Keywords</div>
                     <div className="flex flex-wrap gap-2">
                        {['Innovative', 'Seamless', 'Global'].map(tag => (
                           <Badge key={tag} variant="secondary" className="bg-white border border-[#E3E7EE] text-[#4A4F5B] hover:bg-[#F3F6FB] font-medium px-3 py-1.5 rounded-lg text-xs">
                             {tag}
                           </Badge>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Channels Section */}
            <div className="bg-white p-8 rounded-2xl border border-[#E3E7EE] shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF9E6] text-[#E0B45A] flex items-center justify-center border border-[#E3E7EE]">
                    <Megaphone className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1A1F2C] text-lg">Channels</h3>
                    <p className="text-xs text-[#7A8191] font-medium">Launch plan</p>
                  </div>
               </div>
               
               <div className="space-y-1">
                  {[
                    { channel: 'Instagram & TikTok', status: 'Active', metric: 'Growing Reach' },
                    { channel: 'Fashion PR', status: 'Active', metric: '2 Partnerships' },
                    { channel: 'LinkedIn Outreach', status: 'Planning', metric: 'Targeting Founders' }
                  ].map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 border-b border-[#F3F6FB] last:border-0 hover:bg-[#FAF9F7] rounded-xl transition-colors cursor-pointer group">
                       <div>
                          <div className="font-bold text-[#1A1F2C] text-sm group-hover:text-[#3A4250]">{c.channel}</div>
                          <div className="text-xs text-[#7A8191] mt-0.5">{c.metric}</div>
                       </div>
                       <Badge variant={c.status === 'Active' ? 'default' : 'secondary'} className={cn(
                          "text-[10px] px-2.5 py-0.5 font-bold border rounded-lg",
                          c.status === 'Active' 
                            ? "bg-[#ECFFE9] text-[#2F5E3D] border-[#A8E6C1]" 
                            : "bg-[#F3F6FB] text-[#7A8191] border-[#E3E7EE]"
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

      {/* 5. AI ASSISTANT PANEL */}
      <div className="w-full xl:w-[400px] bg-white border-l border-[#E3E7EE] flex flex-col flex-shrink-0 z-20 order-1 xl:order-2 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
         <div className="p-6 border-b border-[#E3E7EE] bg-[#FAF9F7]">
            <div className="flex items-center gap-3 mb-1">
               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EAF1FF] to-[#DCE4F4] text-[#3A4250] flex items-center justify-center shadow-sm border border-[#fff]">
                  <Sparkles className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="font-bold text-[#1A1F2C] text-lg">Strategy AI</h3>
                 <p className="text-xs text-[#7A8191] font-medium">Real-time launch insights</p>
               </div>
            </div>
         </div>
         
         {/* Assistant Content */}
         <div className="p-6 space-y-8 overflow-y-auto max-h-[400px] xl:max-h-none flex-grow custom-scrollbar">
            
            {/* Helpful Insights */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-[#7A8191] uppercase tracking-wider flex items-center gap-2">
                 <Lightbulb className="w-3.5 h-3.5" /> Insights
               </h4>
               <div className="bg-[#EAF1FF]/50 rounded-2xl p-5 border border-[#DCE4F4] hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                     <div className="mt-1 bg-white p-1.5 rounded-lg shadow-sm text-[#3A4250]">
                        <TrendingUp className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-sm text-[#3A4250] leading-relaxed font-medium mb-3">
                           Your pricing may be low for your target users. Consider VIP or tiered options.
                        </p>
                        <p className="text-sm text-[#3A4250] leading-relaxed font-medium">
                           Your platform capacity is under forecast; increase promotional reach.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Things to Improve */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-[#7A8191] uppercase tracking-wider flex items-center gap-2">
                 <AlertCircle className="w-3.5 h-3.5" /> Attention Needed
               </h4>
               <div className="bg-[#FFF9E6]/50 rounded-2xl p-5 border border-[#F6DFA9] hover:shadow-sm transition-all">
                  <div className="flex items-start gap-4">
                     <div className="mt-1 bg-white p-1.5 rounded-lg shadow-sm text-[#E0B45A]">
                        <BarChart3 className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-sm text-[#4A4F5B] leading-relaxed font-medium mb-3">
                           Social engagement dropped this week; try boosting key posts.
                        </p>
                        <p className="text-sm text-[#4A4F5B] leading-relaxed font-medium">
                           Consider collaborating with creators or micro-influencers.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Suggested Next Steps */}
            <div className="space-y-3">
               <h4 className="text-xs font-bold text-[#7A8191] uppercase tracking-wider flex items-center gap-2">
                 <CheckCircle2 className="w-3.5 h-3.5" /> Next Steps
               </h4>
               <div className="space-y-2">
                  {[
                    "Draft outreach messages for partners",
                    "Update your hero visuals",
                    "Check funnel for drop-off points"
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF9F7] border border-[#E3E7EE] hover:bg-white hover:border-[#DCE4F4] hover:shadow-sm transition-all cursor-pointer group">
                       <div className="w-5 h-5 rounded-full border-2 border-[#DCE4F4] group-hover:border-[#3A4250] bg-white flex-shrink-0 transition-colors"></div>
                       <span className="text-sm text-[#4A4F5B] group-hover:text-[#1A1F2C] font-semibold">{task}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Market Signals */}
            <div className="pt-6 border-t border-[#E3E7EE]">
               <h4 className="text-xs font-bold text-[#7A8191] uppercase tracking-wider mb-4 flex items-center gap-2">
                 <Globe className="w-3.5 h-3.5" /> Market Signals
               </h4>
               <div className="bg-[#FAF9F7] rounded-2xl p-5 space-y-4 border border-[#E3E7EE]">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                       <span className="text-[#4A4F5B] font-bold">Competition</span>
                       <Badge variant="outline" className="bg-white text-[#E0B45A] border-[#F6DFA9] text-[10px] px-2 py-0.5 font-bold">High Activity</Badge>
                    </div>
                    <p className="text-xs text-[#7A8191] font-medium leading-relaxed">
                       High activity in event and creative planning sectors.
                    </p>
                  </div>
                  
                  <div className="h-px bg-[#E3E7EE] w-full"></div>

                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                       <span className="text-[#4A4F5B] font-bold">Trends</span>
                       <Badge variant="outline" className="bg-white text-[#4CAF73] border-[#A8E6C1] text-[10px] px-2 py-0.5 font-bold">AI Tools (+14%)</Badge>
                    </div>
                     <p className="text-xs text-[#7A8191] font-medium leading-relaxed">
                       Rising interest in AI-assisted event tools.
                    </p>
                  </div>
               </div>
            </div>

         </div>
         
         <div className="p-6 border-t border-[#E3E7EE] bg-white mt-auto">
            <Button variant="outline" className="w-full bg-white border-[#E3E7EE] text-[#4A4F5B] hover:bg-[#F3F6FB] hover:text-[#3A4250] hover:border-[#DCE4F4] shadow-sm h-11 rounded-xl font-bold transition-all">
               Ask Strategy AI a Question
            </Button>
         </div>
      </div>

    </div>
  );
};
