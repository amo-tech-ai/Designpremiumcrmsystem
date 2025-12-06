import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  BarChart2, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Users, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  ArrowUpRight,
  FileText,
  MessageSquare,
  PieChart,
  ShieldCheck
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

interface LandingPageV2Props {
  onNavigate?: (view: string) => void;
}

export const LandingPageV2: React.FC<LandingPageV2Props> = ({ onNavigate }) => {
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. HERO SECTION (Cinematic, Illustrated) */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 -z-20" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 -z-10" />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Messaging */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="space-y-8 relative z-10"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-white/80 backdrop-blur-sm text-indigo-700 border-indigo-100 shadow-sm px-4 py-1.5 text-sm font-medium rounded-full transition-all hover:bg-white hover:shadow-md cursor-default">
                <Sparkles className="w-3.5 h-3.5 mr-2 inline-block text-indigo-500" />
                New: StartupAI Founder Edition
              </Badge>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Scale your vision <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600">
                with intelligent design.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
              The premium operating system for modern founders. Generate decks, analyze markets, and execute strategies with an AI partner that understands your business.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                onClick={() => onNavigate && onNavigate('dashboard')}
                className="h-14 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-base font-semibold shadow-xl shadow-slate-900/10 transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                Start Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 bg-white/50 backdrop-blur-sm text-slate-700 hover:bg-white text-base font-medium transition-all">
                <Play className="mr-2 w-5 h-5 fill-slate-700" /> Watch Demo (2m)
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 border-t border-slate-200/60 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>14-day free trial</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium Illustration (Layered Parallax) */}
          <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
            {/* Main Dashboard Card - Center */}
            <motion.div 
              initial={{ opacity: 0, rotateX: 10, rotateY: -10, y: 50 }}
              animate={{ opacity: 1, rotateX: 5, rotateY: -5, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-10 left-10 right-10 bottom-10 bg-white rounded-2xl shadow-2xl border border-slate-100/80 z-10 overflow-hidden flex flex-col"
            >
               {/* Window Header */}
               <div className="h-10 bg-slate-50/50 border-b border-slate-100 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400/80" />
                 <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                 <div className="w-3 h-3 rounded-full bg-green-400/80" />
               </div>
               {/* Content Mockup */}
               <div className="p-6 flex-grow bg-gradient-to-br from-slate-50/50 to-white grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                     <div className="h-32 bg-indigo-50/30 rounded-xl border border-indigo-100/50 p-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                           <div className="h-2 w-20 bg-indigo-200/50 rounded-full" />
                           <Sparkles className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="space-y-2">
                           <div className="h-2 w-full bg-indigo-100/50 rounded-full" />
                           <div className="h-2 w-3/4 bg-indigo-100/50 rounded-full" />
                           <div className="h-2 w-1/2 bg-indigo-100/50 rounded-full" />
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm" />
                        <div className="h-24 bg-white rounded-xl border border-slate-100 shadow-sm" />
                     </div>
                  </div>
                  <div className="col-span-1 bg-slate-50 rounded-xl border border-slate-100/50" />
               </div>
            </motion.div>

            {/* Floating Elements - Parallax/Motion */}
            
            {/* Top Right: AI Node */}
            <motion.div 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-4 top-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 w-48"
            >
               <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600"><Cpu className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-slate-700">AI Analysis</span>
               </div>
               <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] text-slate-500">
                     <span>Market Fit</span>
                     <span className="text-emerald-500 font-bold">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                     <div className="h-full w-[94%] bg-emerald-400 rounded-full" />
                  </div>
               </div>
            </motion.div>

            {/* Bottom Left: Chart */}
            <motion.div 
               animate={{ y: [0, 15, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -left-8 bottom-32 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 w-56"
            >
               <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">Growth Projection</span>
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
               </div>
               <div className="flex items-end justify-between gap-1 h-16">
                  {[40, 65, 45, 80, 95].map((h, i) => (
                     <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                        className="w-full bg-indigo-500/20 rounded-t-sm hover:bg-indigo-500 transition-colors" 
                     />
                  ))}
               </div>
            </motion.div>

            {/* Decorative Blur Blobs */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10 animate-pulse" />
          </div>
        </div>
      </section>

      {/* 2. FEATURE OVERVIEW (2x2 Premium Grid) */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
             initial="hidden"
             whileInView="show"
             viewport={{ once: true, margin: "-100px" }}
             variants={containerVariants}
             className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
             {[
               {
                 icon: Layers,
                 title: 'Creation Tools',
                 desc: 'Build pitch decks, one-pagers, and memos with drag-and-drop simplicity.',
                 color: 'text-blue-600',
                 bg: 'bg-blue-50'
               },
               {
                 icon: Cpu,
                 title: 'Intelligence Engine',
                 desc: 'Deep market research and competitor analysis powered by real-time data.',
                 color: 'text-purple-600',
                 bg: 'bg-purple-50'
               },
               {
                 icon: BarChart2,
                 title: 'Insights & Analytics',
                 desc: 'Track investor engagement, view times, and identify warm leads instantly.',
                 color: 'text-emerald-600',
                 bg: 'bg-emerald-50'
               },
               {
                 icon: Zap,
                 title: 'Automation & CRM',
                 desc: 'Automate follow-ups, enrich contact data, and never miss a deal.',
                 color: 'text-amber-600',
                 bg: 'bg-amber-50'
               }
             ].map((feature, i) => (
               <motion.div 
                 key={i}
                 variants={itemVariants}
                 className="group p-10 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
               >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors", feature.bg, feature.color)}>
                     <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">{feature.desc}</p>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* 3. WORKFLOW / PROCESS DIAGRAM */}
      <section className="py-32 bg-slate-50/50 border-y border-slate-200/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From idea to execution in seconds</h2>
             <p className="text-lg text-slate-600">A complete workflow designed for speed and precision.</p>
          </div>

          <div className="relative">
             {/* Connecting Line Background */}
             <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 hidden md:block z-0" />
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { title: 'Input Context', icon: MessageSquare, sub: 'Raw ideas, notes, URLs' },
                  { title: 'AI Processing', icon: Cpu, sub: 'Structuring & Design', active: true },
                  { title: 'Smart Output', icon: FileText, sub: 'Decks, Docs, Memos' },
                  { title: 'CRM Tracking', icon: PieChart, sub: 'Analytics & Follow-up' },
                ].map((step, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className="flex flex-col items-center text-center"
                   >
                      <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-lg relative transition-all duration-500",
                        step.active ? "bg-indigo-600 text-white scale-110 ring-8 ring-indigo-50" : "bg-white text-slate-500 border border-slate-200"
                      )}>
                         <step.icon className={cn("w-10 h-10", step.active && "animate-pulse")} />
                         
                         {/* Connector Arrow for Mobile */}
                         {i < 3 && (
                            <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 text-slate-300">
                               ↓
                            </div>
                         )}
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-slate-500">{step.sub}</p>
                   </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. AI CAPABILITIES SECTION */}
      <section className="py-32 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { title: 'AI Wizard', icon: Sparkles, desc: 'Answer 5 questions, get a 15-slide pitch deck tailored to your industry.' },
                 { title: 'Intelligent Copilot', icon: Search, desc: 'Ask complex questions about your market, competitors, or financial models.' },
                 { title: 'Visual Agent', icon: Layers, desc: 'Describe a concept and generate professional diagrams and charts instantly.' },
               ].map((card, i) => (
                  <motion.div 
                     key={i}
                     whileHover={{ y: -10 }}
                     className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-300 group"
                  >
                     <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <card.icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                     <p className="text-slate-600 leading-relaxed mb-6">{card.desc}</p>
                     <div className="flex items-center text-indigo-600 font-medium text-sm cursor-pointer group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. KPI / SOCIAL PROOF BAND */}
      <section className="py-20 bg-[#0F172A] text-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
               {[
                 { value: '75%', label: 'Faster Creation Time', color: 'text-emerald-400' },
                 { value: '50%', label: 'More Investor Meetings', color: 'text-indigo-400' },
                 { value: '90%', label: 'Founder Satisfaction', color: 'text-purple-400' },
               ].map((kpi, i) => (
                  <div key={i} className="py-4 md:py-0 px-4">
                     <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", bounce: 0.5, delay: i * 0.2 }}
                        className={cn("text-6xl font-bold mb-4", kpi.color)}
                     >
                        {kpi.value}
                     </motion.div>
                     <div className="text-lg text-slate-300 font-medium">{kpi.label}</div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-32 bg-slate-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <Badge variant="outline" className="mb-4 border-slate-300 text-slate-500">Community Love</Badge>
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Trusted by modern builders</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                 { 
                   quote: "The intelligence engine surfaced competitors I didn't even know existed. It saved us months of wasted effort.",
                   author: "Michael Ross",
                   role: "Founder, FinStack",
                   initial: "MR"
                 },
                 { 
                   quote: "I used to spend weeks on decks. With the Visual Agent, I built a Series A ready presentation in an afternoon.",
                   author: "Sarah Jenkins",
                   role: "CEO, CloudScale",
                   initial: "SJ"
                 },
                 { 
                   quote: "It's not just a deck builder. It's a strategic partner that helps you refine your entire business model.",
                   author: "David Kim",
                   role: "Co-Founder, AI Flow",
                   initial: "DK"
                 },
               ].map((t, i) => (
                  <motion.div 
                     key={i}
                     whileInView={{ opacity: 1, y: 0 }}
                     initial={{ opacity: 0, y: 20 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.2 }}
                     className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 relative"
                  >
                     <div className="absolute top-8 right-8 text-indigo-100">
                        <MessageSquare className="w-8 h-8" />
                     </div>
                     <p className="text-lg text-slate-700 leading-relaxed mb-8 relative z-10">"{t.quote}"</p>
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                           {t.initial}
                        </div>
                        <div>
                           <div className="font-bold text-slate-900">{t.author}</div>
                           <div className="text-sm text-slate-500">{t.role}</div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
         <div className="max-w-5xl mx-auto relative z-10 text-center space-y-10">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-12 md:p-24 relative overflow-hidden"
            >
               {/* Background Accents */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
               <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl -z-10" />
               <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-50 rounded-full blur-3xl -z-10" />

               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Ready to build faster?</h2>
               <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                  Join the platform that's powering the next generation of unicorns. Start your free trial today.
               </p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => onNavigate && onNavigate('dashboard')}
                    className="h-14 px-10 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1"
                  >
                     Create Your Profile
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 text-lg">
                     Build a Deck
                  </Button>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-20 border-t border-slate-800">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
               <div className="flex items-center gap-2 text-white font-bold text-2xl mb-6">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  StartupAI
               </div>
               <p className="text-slate-400 mb-6">
                  The intelligent operating system for high-growth founders. Build, analyze, and scale with AI.
               </p>
               <div className="flex gap-4">
                  {[1,2,3].map(i => (
                     <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors cursor-pointer">
                        <div className="w-4 h-4 bg-slate-400 rounded-sm" />
                     </div>
                  ))}
               </div>
            </div>
            
            <div>
               <h4 className="text-white font-bold mb-6">Platform</h4>
               <ul className="space-y-4">
                  <li><button onClick={() => onNavigate && onNavigate('dashboard')} className="hover:text-indigo-400 transition-colors text-left">Dashboard</button></li>
                  <li><button onClick={() => onNavigate && onNavigate('wizard')} className="hover:text-indigo-400 transition-colors text-left">Pitch Deck Wizard</button></li>
                  <li><button onClick={() => onNavigate && onNavigate('gtm')} className="hover:text-indigo-400 transition-colors text-left">Startup Wizard</button></li>
                  <li><button onClick={() => onNavigate && onNavigate('insights')} className="hover:text-indigo-400 transition-colors text-left">AI Insights</button></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-6">Company</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Press</a></li>
               </ul>
            </div>

            <div>
               <h4 className="text-white font-bold mb-6">Legal</h4>
               <ul className="space-y-4">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>© 2025 StartupAI Inc. All rights reserved.</div>
            <div className="flex gap-8">
               <span>Designed for Founders</span>
            </div>
         </div>
      </footer>
      
    </div>
  );
};
