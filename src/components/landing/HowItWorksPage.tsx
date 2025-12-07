import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Layout, 
  Sparkles, 
  Edit3, 
  Share2, 
  BarChart3, 
  Shield, 
  Users, 
  Rocket, 
  Search, 
  PieChart,
  FileCheck,
  ArrowDown
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { Footer } from './Footer';

interface HowItWorksPageProps {
  onNavigate?: (view: string) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-[#F7F7FB]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center lg:text-left"
            >
              <Badge variant="outline" className="mb-6 bg-indigo-50 text-indigo-600 border-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium">
                New: AI Co-Founder Mode
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Stop Wasting Months on <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Fundraising Prep.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                The all-in-one AI platform that helps founders raise funding, close deals, and scale faster. From idea to investor-ready in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <Button size="lg" className="h-14 px-8 rounded-full text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200" onClick={() => onNavigate && onNavigate('dashboard')}>
                  Start Free <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base border-slate-200 text-slate-700 hover:bg-white hover:text-indigo-600">
                  <Play className="mr-2 w-4 h-4 fill-current" /> Watch Demo (2 min)
                </Button>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-200 pt-8">
                <StatItem value="10k+" label="Decks Generated" />
                <StatItem value="60hr+" label="Saved per Founder" />
                <StatItem value="$1.2M" label="Avg. Raise" />
                <StatItem value="4.9/5" label="Founder Rating" />
              </div>
            </motion.div>

            {/* Right Illustration - Premium Abstract UI */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full max-w-[600px] lg:max-w-none"
            >
              <div className="relative aspect-square md:aspect-[4/3] bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 border border-slate-100 p-6 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50" />

                {/* Main Dashboard Card */}
                <div className="relative z-10 bg-white rounded-xl border border-slate-200 shadow-lg p-4 w-full h-full flex flex-col">
                   <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Zap className="w-4 h-4" />
                         </div>
                         <div className="space-y-1">
                            <div className="h-2 w-24 bg-slate-200 rounded-full" />
                            <div className="h-2 w-16 bg-slate-100 rounded-full" />
                         </div>
                      </div>
                      <div className="flex gap-2">
                         <div className="h-8 w-8 rounded-full bg-slate-100" />
                         <div className="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">+3</div>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4 flex-grow">
                      {/* Fake Cards */}
                      <div className="col-span-2 bg-slate-50 rounded-lg border border-slate-100 p-4 space-y-3">
                         <div className="h-3 w-1/2 bg-slate-200 rounded-full mb-4" />
                         <div className="space-y-2">
                            <div className="h-2 w-full bg-slate-200 rounded-full" />
                            <div className="h-2 w-5/6 bg-slate-200 rounded-full" />
                            <div className="h-2 w-4/6 bg-slate-200 rounded-full" />
                         </div>
                         <div className="mt-auto pt-4 flex gap-2">
                            <div className="h-16 w-24 bg-white rounded border border-slate-200 shadow-sm" />
                            <div className="h-16 w-24 bg-white rounded border border-slate-200 shadow-sm" />
                         </div>
                      </div>
                      <div className="col-span-1 space-y-4">
                         <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-3 h-1/3 flex flex-col justify-center items-center text-indigo-600">
                            <PieChart className="w-6 h-6 mb-2" />
                            <div className="h-2 w-12 bg-indigo-200 rounded-full" />
                         </div>
                         <div className="bg-emerald-50 rounded-lg border border-emerald-100 p-3 h-1/3 flex flex-col justify-center items-center text-emerald-600">
                            <TrendingUp className="w-6 h-6 mb-2" />
                            <div className="h-2 w-12 bg-emerald-200 rounded-full" />
                         </div>
                         <div className="bg-purple-50 rounded-lg border border-purple-100 p-3 h-1/3 flex flex-col justify-center items-center text-purple-600">
                            <Users className="w-6 h-6 mb-2" />
                            <div className="h-2 w-12 bg-purple-200 rounded-full" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-10 right-10 z-20 bg-white p-3 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
                >
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-sm font-bold text-slate-900">Pitch Deck</div>
                      <div className="text-xs text-slate-500">Ready for export</div>
                   </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Scroll Story - 3 Steps */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">From Idea to Investor-Ready</h2>
               <p className="text-lg text-slate-600">Three simple steps to generate your entire fundraising stack.</p>
            </div>

            <div className="relative space-y-24 md:space-y-32">
               {/* Vertical Progress Line (Desktop) */}
               <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 hidden lg:block transform -translate-x-1/2" />

               {/* Step 1 */}
               <StoryStep 
                  number="1"
                  title="Tell Us About Your Startup"
                  description="Simply enter your URL or describe your idea. Our AI instantly extracts context, detects your industry, and sets up the perfect structure for your stage."
                  badge="⏱ 5 minutes"
                  align="right"
               >
                  {/* Illustration: Wizard Form */}
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-3 h-3 rounded-full bg-red-400" />
                           <div className="w-3 h-3 rounded-full bg-yellow-400" />
                           <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase">Startup Name</label>
                           <div className="h-10 bg-slate-50 rounded-lg border border-slate-200 w-full flex items-center px-3 text-slate-900 font-medium">Acme Inc.</div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase">Website URL</label>
                           <div className="h-10 bg-slate-50 rounded-lg border border-slate-200 w-full flex items-center px-3 text-blue-600">acme.com</div>
                        </div>
                        <div className="pt-4">
                           <div className="w-full h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-medium shadow-md">
                               Analyze Startup <Sparkles className="w-4 h-4 ml-2" />
                           </div>
                        </div>
                     </div>
                     {/* Auto-fill hint */}
                     <div className="absolute top-1/2 right-8 bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-md shadow-sm animate-pulse">
                        Auto-filled!
                     </div>
                  </div>
               </StoryStep>

               {/* Step 2 */}
               <StoryStep 
                  number="2"
                  title="AI Generates Everything"
                  description="Watch as our Gemini-powered engine generates your Pitch Deck, Financial Model, Market Research, and GTM Strategy simultaneously."
                  badge="⏱ Under 2 minutes"
                  align="left"
               >
                  {/* Illustration: AI Orb & Cards */}
                  <div className="relative h-[300px] flex items-center justify-center">
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 blur-xl opacity-30 animate-pulse" />
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg z-20 relative">
                           <Sparkles className="w-8 h-8" />
                        </div>
                     </div>
                     
                     {/* Flying Cards */}
                     <FloatingCard icon={FileText} title="Pitch Deck" className="top-0 left-10 animate-bounce duration-[3000ms]" />
                     <FloatingCard icon={BarChart3} title="Financials" className="bottom-10 right-10 animate-bounce duration-[4000ms]" />
                     <FloatingCard icon={Rocket} title="GTM Plan" className="top-10 right-0 animate-bounce duration-[3500ms]" />
                     <FloatingCard icon={Search} title="Market Research" className="bottom-0 left-20 animate-bounce duration-[4500ms]" />
                  </div>
               </StoryStep>

               {/* Step 3 */}
               <StoryStep 
                  number="3"
                  title="Edit, Export, and Raise"
                  description="Use our Notion-style editor to refine content, ask AI for rewrites, and export perfectly formatted PDFs or PPTX files ready for investors."
                  badge="⏱ Ready to send"
                  align="right"
               >
                  {/* Illustration: Editor UI */}
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[300px]">
                     <div className="h-10 border-b border-slate-100 bg-slate-50 flex items-center px-4 justify-between">
                        <div className="flex gap-2">
                           <div className="w-20 h-2 bg-slate-300 rounded-full" />
                        </div>
                        <div className="flex gap-2">
                           <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded text-xs font-bold">Export PDF</div>
                        </div>
                     </div>
                     <div className="flex flex-grow">
                        <div className="w-16 border-r border-slate-100 bg-slate-50 hidden sm:block p-2 space-y-2">
                           <div className="w-full aspect-square bg-indigo-100 rounded border border-indigo-200" />
                           <div className="w-full aspect-square bg-white rounded border border-slate-200" />
                           <div className="w-full aspect-square bg-white rounded border border-slate-200" />
                        </div>
                        <div className="flex-grow p-6 relative">
                           <div className="h-4 w-3/4 bg-slate-800 rounded mb-4" />
                           <div className="space-y-2">
                              <div className="h-2 w-full bg-slate-200 rounded" />
                              <div className="h-2 w-full bg-slate-200 rounded" />
                              <div className="h-2 w-5/6 bg-slate-200 rounded" />
                           </div>
                           
                           <div className="absolute bottom-6 right-6 bg-white shadow-lg border border-slate-100 rounded-lg p-3 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                 <Sparkles className="w-4 h-4" />
                              </div>
                              <div className="text-xs">
                                 <div className="font-bold text-slate-900">AI Rewrite</div>
                                 <div className="text-slate-500">Making it punchier...</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </StoryStep>

            </div>
         </div>
      </section>

      {/* 3. Process Flow Diagram */}
      <section className="py-20 bg-[#FAFAFE] border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">
               {/* Connector Line (Desktop) */}
               <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 hidden md:block transform -translate-y-1/2" />

               <ProcessNode icon={Layout} title="Input Details" step="1" />
               <ArrowRight className="hidden md:block text-slate-300 w-6 h-6" />
               <ArrowDown className="md:hidden text-slate-300 w-6 h-6 my-2" />
               
               <ProcessNode icon={Sparkles} title="AI Generation" step="2" active />
               <ArrowRight className="hidden md:block text-slate-300 w-6 h-6" />
               <ArrowDown className="md:hidden text-slate-300 w-6 h-6 my-2" />

               <ProcessNode icon={Edit3} title="Review & Edit" step="3" />
               <ArrowRight className="hidden md:block text-slate-300 w-6 h-6" />
               <ArrowDown className="md:hidden text-slate-300 w-6 h-6 my-2" />

               <ProcessNode icon={Share2} title="Export & Share" step="4" />
               <ArrowRight className="hidden md:block text-slate-300 w-6 h-6" />
               <ArrowDown className="md:hidden text-slate-300 w-6 h-6 my-2" />

               <ProcessNode icon={BarChart3} title="Track in CRM" step="5" />
            </div>
         </div>
      </section>

      {/* 4. Feature Grid */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything Founders Need to Raise & Scale</h2>
               <p className="text-slate-600 max-w-2xl mx-auto">Stop stitching together 10 different tools. StartupAI replaces your entire fundraising stack.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <FeatureCard 
                  icon={PresentationIcon} 
                  title="AI Pitch Deck Generator" 
                  desc="Generate 15-slide investor decks with narrative flow, charts, and branded design in minutes."
                  tag="Deck"
               />
               <FeatureCard 
                  icon={FileCheck} 
                  title="Document Suite" 
                  desc="One-pagers, memos, and whitepapers generated automatically from your core data."
                  tag="Docs"
               />
               <FeatureCard 
                  icon={Users} 
                  title="Founder CRM" 
                  desc="Track investor conversations, manage pipeline, and automate follow-ups."
                  tag="CRM"
               />
               <FeatureCard 
                  icon={TrendingUp} 
                  title="Financial Modeling" 
                  desc="3-year projections, burn rate, and unit economics without the spreadsheet headache."
                  tag="Finance"
               />
               <FeatureCard 
                  icon={Search} 
                  title="Market Intelligence" 
                  desc="Deep dive competitor analysis and market sizing powered by live web search."
                  tag="Research"
               />
               <FeatureCard 
                  icon={Rocket} 
                  title="GTM Strategy Builder" 
                  desc="Actionable launch plans, channel strategies, and growth loops custom to your vertical."
                  tag="Strategy"
               />
               <FeatureCard 
                  icon={CheckCircle2} 
                  title="Task Manager" 
                  desc="Kanban boards and checklists pre-loaded with standard fundraising steps."
                  tag="Productivity"
               />
               <FeatureCard 
                  icon={Shield} 
                  title="Secure Data Room" 
                  desc="Host all your documents in a secure, trackable environment for investors."
                  tag="Security"
               />
               <FeatureCard 
                  icon={Zap} 
                  title="AI Co-Pilot" 
                  desc="Your 24/7 fundraising advisor for rewriting, coaching, and strategy."
                  tag="AI"
               />
            </div>
         </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
         </div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Raise Faster?</h2>
            <p className="text-xl text-slate-300 mb-10">
               Join 10,000+ founders who’ve saved 60+ hours on fundraising prep with StartupAI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Button size="lg" className="h-14 px-8 rounded-full text-base bg-white text-indigo-900 hover:bg-indigo-50 font-bold" onClick={() => onNavigate && onNavigate('dashboard')}>
                  Generate Your Pitch Deck Free <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
               <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600">
                  Book a Demo
               </Button>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-center gap-8 text-slate-400 text-sm">
               <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-day free trial</div>
               <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cancel anytime</div>
            </div>
         </div>
      </section>

      {/* Footer using Shared Component */}
      <Footer onNavigate={onNavigate} />

    </div>
  );
};

// ------------------------------------------------------------------
// Helper Components
// ------------------------------------------------------------------

const StatItem = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center md:text-left">
    <div className="text-2xl md:text-3xl font-bold text-slate-900">{value}</div>
    <div className="text-xs md:text-sm text-slate-500">{label}</div>
  </div>
);

const StoryStep = ({ number, title, description, badge, children, align }: any) => (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">
      {/* Number Badge for Desktop Line */}
      <div className="absolute left-[50%] top-1/2 w-8 h-8 bg-white border-4 border-indigo-600 rounded-full hidden lg:flex items-center justify-center z-10 transform -translate-x-1/2 -translate-y-1/2 font-bold text-xs text-indigo-900 shadow-lg">
         {number}
      </div>

      <div className={cn("order-2 lg:order-1", align === 'left' ? 'lg:order-2' : '')}>
         <div className="relative z-10">
            {children}
         </div>
      </div>

      <div className={cn("order-1 lg:order-2 text-left", align === 'left' ? 'lg:order-1 lg:text-right' : 'lg:pl-10')}>
         <Badge variant="secondary" className="mb-4 bg-indigo-50 text-indigo-700 hover:bg-indigo-100">{badge}</Badge>
         <h3 className="text-3xl font-bold text-slate-900 mb-4">
            <span className="text-indigo-600 mr-2">0{number}.</span>
            {title}
         </h3>
         <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
         <ul className="mt-6 space-y-3 inline-block text-left">
            {number === "1" && [
               "Smart form with auto-fill", "URL context extraction", "Industry detection"
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
               </li>
            ))}
            {number === "2" && [
               "Pitch Deck", "Financial Model", "GTM Strategy", "Market Research"
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
               </li>
            ))}
            {number === "3" && [
               "Collaborative Editor", "AI Rewrites", "One-click Export"
            ].map((item, i) => (
               <li key={i} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500" /> {item}
               </li>
            ))}
         </ul>
      </div>
   </div>
);

const FloatingCard = ({ icon: Icon, title, className }: any) => (
   <div className={cn("absolute bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3 w-40 z-20", className)}>
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600">
         <Icon className="w-4 h-4" />
      </div>
      <div className="text-xs font-bold text-slate-900">{title}</div>
   </div>
);

const ProcessNode = ({ icon: Icon, title, step, active }: any) => (
   <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full md:w-48 relative z-10">
      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all", active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-slate-50 text-slate-500")}>
         <Icon className="w-5 h-5" />
      </div>
      <div className="text-xs font-bold text-slate-400 uppercase mb-1">Step 0{step}</div>
      <div className="font-bold text-slate-900 text-center text-sm">{title}</div>
   </div>
);

const FeatureCard = ({ icon: Icon, title, desc, tag }: any) => (
   <div className="group p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 bg-slate-50 px-3 py-1 rounded-bl-xl text-xs font-bold text-slate-400 uppercase tracking-wider">{tag}</div>
      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
         <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
   </div>
);

// Missing Icon
const PresentationIcon = ({ className }: { className?: string }) => (
   <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h20" /><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" /><path d="m7 21 5-5 5 5" />
   </svg>
);
