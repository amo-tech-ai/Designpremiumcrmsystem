import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  BarChart2, 
  Layers, 
  MessageSquare, 
  Cpu, 
  Globe, 
  Shield, 
  CheckCircle, 
  Play,
  TrendingUp,
  Users,
  Search,
  PenTool,
  Rocket
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface LandingPageProps {
  onNavigate?: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-50/50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <Badge className="bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 px-3 py-1 text-sm font-medium rounded-full transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-2 inline-block" />
              AI for High-Growth Founders
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Build your startup <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">at the speed of thought.</span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
              The all-in-one AI workspace designed to help founders craft pitch decks, analyze markets, and execute GTM strategies 10x faster.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="h-14 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-base shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5"
              >
                Start Building Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 text-base">
                <Play className="mr-2 w-5 h-5 fill-slate-700" /> Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 font-medium pt-4">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                 ))}
              </div>
              <p>Trusted by 10,000+ founders</p>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative lg:h-[600px] w-full flex items-center justify-center perspective-1000">
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-6 z-10 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
               {/* Mockup Header */}
               <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400/80" />
                     <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                     <div className="w-3 h-3 rounded-full bg-green-400/80" />
                  </div>
                  <div className="h-2 w-20 bg-slate-100 rounded-full" />
               </div>
               
               {/* Mockup Body */}
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="col-span-2 bg-indigo-50/50 rounded-xl p-4 border border-indigo-100">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Sparkles className="w-4 h-4" /></div>
                        <div className="h-2 w-24 bg-indigo-200 rounded-full" />
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 w-full bg-indigo-100 rounded-full" />
                        <div className="h-2 w-3/4 bg-indigo-100 rounded-full" />
                     </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                     <BarChart2 className="w-8 h-8 text-emerald-500 mb-3" />
                     <div className="h-4 w-12 bg-slate-100 rounded-full mb-1" />
                     <div className="h-2 w-20 bg-slate-50 rounded-full" />
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                     <Users className="w-8 h-8 text-blue-500 mb-3" />
                     <div className="h-4 w-12 bg-slate-100 rounded-full mb-1" />
                     <div className="h-2 w-20 bg-slate-50 rounded-full" />
                  </div>
               </div>
               
               <div className="bg-slate-900 rounded-xl p-4 text-white flex items-center justify-between">
                  <div className="text-xs font-medium">Generating Pitch Deck...</div>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                  </div>
               </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 right-0 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-violet-300/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* 2. CORE FEATURE SUITE */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to launch</h2>
            <p className="text-lg text-slate-600">From idea to Series A, our AI platform covers every aspect of your startup journey.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
             {[
               {
                 icon: PenTool,
                 title: 'Creation Tools',
                 desc: 'Deck Generator, Document Builder, Visual Agent',
                 gradient: 'from-blue-500 to-indigo-500'
               },
               {
                 icon: Cpu,
                 title: 'Intelligence Engine',
                 desc: 'AI Copilot, Market Research, Content Understanding',
                 gradient: 'from-violet-500 to-purple-500'
               },
               {
                 icon: TrendingUp,
                 title: 'Growth & Insights',
                 desc: 'Founder Dashboard, Summaries, Daily Briefings',
                 gradient: 'from-emerald-500 to-teal-500'
               },
               {
                 icon: Zap,
                 title: 'Automation & CRM',
                 desc: 'Lead Enrichment, Predictive Scoring, Outreach',
                 gradient: 'from-amber-500 to-orange-500'
               }
             ].map((feature, i) => (
               <div key={i} className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-6">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br text-white shadow-lg", feature.gradient)}>
                     <feature.icon className="w-7 h-7" />
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                     <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 3. VISUAL DIAGRAM / SYSTEM FLOW */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">How it works</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
             {/* Step 1: Input */}
             <div className="w-full md:w-1/3 flex flex-col items-center text-center z-10">
                <div className="w-20 h-20 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <MessageSquare className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Input Context</h4>
                <p className="text-sm text-slate-500 px-4">Share your idea, notes, or rough draft.</p>
             </div>

             {/* Connector 1 */}
             <div className="hidden md:block w-24 h-0.5 bg-gradient-to-r from-slate-200 to-indigo-200 relative">
                <div className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-indigo-200" />
             </div>

             {/* Step 2: AI Processing */}
             <div className="w-full md:w-1/3 flex flex-col items-center text-center z-10">
                <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200 ring-4 ring-indigo-50">
                   <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-indigo-900">AI Processing</h4>
                <p className="text-sm text-slate-500 px-4">Deep analysis, structuring, and design generation.</p>
             </div>

             {/* Connector 2 */}
             <div className="hidden md:block w-24 h-0.5 bg-gradient-to-r from-indigo-200 to-slate-200 relative">
                <div className="absolute right-0 -top-1.5 w-3 h-3 rounded-full bg-slate-200" />
             </div>

             {/* Step 3: Output */}
             <div className="w-full md:w-1/3 flex flex-col items-center text-center z-10">
                <div className="w-20 h-20 bg-white border-2 border-slate-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                   <Rocket className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="font-bold text-lg mb-2">Production Ready</h4>
                <p className="text-sm text-slate-500 px-4">Export decks, docs, and strategies instantly.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. INTELLIGENT CO-PILOT SECTION */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-6">Your intelligent co-pilot, always on.</h2>
                 <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                    Stop starting from scratch. Our AI partner helps you refine ideas, create assets, and make data-driven decisions 24/7.
                 </p>
                 
                 <div className="space-y-6">
                    {[
                      { title: 'AI Wizard', desc: 'Generate complete decks in minutes.', icon: Sparkles },
                      { title: 'Intelligent Research', desc: 'Real-time market data analysis.', icon: Search },
                      { title: 'Visual Agent', desc: 'Text-to-design for slides and social.', icon: Layers },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                         <div className="mt-1 p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                            <item.icon className="w-5 h-5" />
                         </div>
                         <div>
                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                            <p className="text-slate-400 text-sm">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="relative">
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 rounded-full" />
                 <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                       <div className="w-3 h-3 rounded-full bg-red-500" />
                       <div className="w-3 h-3 rounded-full bg-amber-500" />
                       <div className="w-3 h-3 rounded-full bg-green-500" />
                       <div className="ml-auto text-xs text-slate-500 font-mono">AI_AGENT_V2.0</div>
                    </div>
                    
                    <div className="space-y-4 font-mono text-sm">
                       <div className="flex gap-3">
                          <span className="text-indigo-400">{'>'}</span>
                          <span className="text-slate-300">Analyze competitor pricing for SaaS CRM market...</span>
                       </div>
                       <div className="pl-6 text-slate-500">Processing... [||||||||||] 100%</div>
                       <div className="p-4 bg-white/5 rounded-lg border border-white/5 text-slate-300">
                          <p className="mb-2"><span className="text-emerald-400">✓ Analysis Complete.</span> Key findings:</p>
                          <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
                             <li>Average seat price: $29/mo</li>
                             <li>Freemium adoption: 65%</li>
                             <li>Opportunity: Enterprise tiers underserved</li>
                          </ul>
                       </div>
                       <div className="flex gap-3">
                          <span className="text-indigo-400 animate-pulse">{'>'}</span>
                          <span className="text-white">Draft GTM strategy based on these findings...</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. METRICS / SOCIAL PROOF */}
      <section className="bg-slate-900 py-16 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
               {[
                 { label: 'Faster Creation', value: '10x' },
                 { label: 'Investor Meetings', value: '+45%' },
                 { label: 'Active Founders', value: '10k+' },
                 { label: 'Decks Generated', value: '1.2M' },
               ].map((stat, i) => (
                 <div key={i} className="p-4">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900">Loved by modern founders</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 {
                   name: "Sarah Jenkins",
                   role: "Founder, TechFlow",
                   quote: "I built my entire Series A deck in 2 hours. The AI suggestions were actually useful, not just generic filler."
                 },
                 {
                   name: "David Chen",
                   role: "CEO, DataSync",
                   quote: "The GTM strategy module helped us identify a market segment we completely missed. Incredible value."
                 },
                 {
                   name: "Elena Rodriguez",
                   role: "Founder, GreenScale",
                   quote: "Finally, a tool that understands what investors actually want to see. It's like having a VC in your pocket."
                 }
               ].map((t, i) => (
                 <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex gap-1 text-amber-400 mb-6">
                       {[1,2,3,4,5].map(star => <Sparkles key={star} className="w-4 h-4 fill-current" />)}
                    </div>
                    <p className="text-slate-700 text-lg mb-8 leading-relaxed">"{t.quote}"</p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-200 rounded-full" /> {/* Placeholder for headshot */}
                       <div>
                          <div className="font-bold text-slate-900">{t.name}</div>
                          <div className="text-sm text-slate-500">{t.role}</div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
               <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to build the future?</h2>
               <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                  Join thousands of founders using AI to launch, grow, and scale faster than ever before.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => onNavigate && onNavigate('dashboard')}
                    className="h-14 px-8 rounded-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-base w-full sm:w-auto"
                  >
                     Create Free Profile
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-indigo-400/30 text-white hover:bg-white/10 text-base w-full sm:w-auto">
                     Build a Deck Now
                  </Button>
               </div>
               
               <p className="text-sm text-slate-400 mt-6">No credit card required · Free 14-day trial</p>
            </div>
         </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-white pt-16 pb-12 border-t border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
               <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                     <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                        <Sparkles className="w-5 h-5" />
                     </div>
                     <span className="text-xl font-bold text-slate-900">FounderAI</span>
                  </div>
                  <p className="text-slate-500 text-sm max-w-xs mb-6">
                     The operating system for modern startups. Build, launch, and scale with intelligence.
                  </p>
                  <div className="flex gap-4">
                     {/* Social Icons placeholders */}
                     {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors" />
                     ))}
                  </div>
               </div>
               
               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Product</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="hover:text-indigo-600 cursor-pointer">Pitch Deck</li>
                     <li className="hover:text-indigo-600 cursor-pointer">GTM Strategy</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Market Research</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Pricing</li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="hover:text-indigo-600 cursor-pointer">Blog</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Community</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Help Center</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Templates</li>
                  </ul>
               </div>
               
               <div>
                  <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="hover:text-indigo-600 cursor-pointer">About</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Careers</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Legal</li>
                     <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
                  </ul>
               </div>
            </div>
            
            <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
               <p>© 2024 FounderAI Inc. All rights reserved.</p>
               <div className="flex gap-6">
                  <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
               </div>
            </div>
         </div>
      </footer>
      
    </div>
  );
};
