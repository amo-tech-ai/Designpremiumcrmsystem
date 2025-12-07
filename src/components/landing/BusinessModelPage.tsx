import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Globe, 
  Zap, 
  BarChart3, 
  PieChart, 
  Users, 
  Layers, 
  Shield, 
  Rocket, 
  ArrowUpRight,
  Network,
  Coins,
  CreditCard,
  Building2,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

import { Footer } from './Footer';

interface BusinessModelPageProps {
  onNavigate?: (view: string) => void;
}

export const BusinessModelPage: React.FC<BusinessModelPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
                Business Logic v2.0
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                A Scalable SaaS Model <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x">
                  Engineered for Success.
                </span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-light">
                We've redesigned the traditional SaaS revenue engine to prioritize founder sustainability, rapid scaling, and long-term ecosystem value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                 <Button className="h-12 px-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-indigo-500/10">
                    Explore the Model <ArrowRight className="ml-2 w-4 h-4" />
                 </Button>
                 <Button variant="ghost" className="h-12 px-8 rounded-full text-slate-600 hover:bg-slate-50">
                    View Methodology
                 </Button>
              </div>
            </motion.div>

            {/* Right Illustration - 3D Dashboard */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative perspective-1000"
            >
              <div className="relative w-full aspect-square md:aspect-[4/3] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl shadow-indigo-500/20 p-8 transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-700">
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 z-20 max-w-[200px]"
                  >
                     <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp className="w-5 h-5" /></div>
                        <div>
                           <div className="text-xs text-slate-500 font-bold uppercase">Growth</div>
                           <div className="text-lg font-bold text-slate-900">+127%</div>
                        </div>
                     </div>
                     <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                     </div>
                  </motion.div>

                  <motion.div 
                     animate={{ y: [0, 15, 0] }}
                     transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                     className="absolute -bottom-5 -left-5 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-700 z-20 text-white flex items-center gap-4"
                  >
                     <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <div className="font-bold">AI Optimized</div>
                        <div className="text-xs text-slate-400">Revenue streams active</div>
                     </div>
                  </motion.div>

                  {/* Main Dashboard UI */}
                  <div className="w-full h-full bg-white rounded-xl shadow-inner border border-slate-200 overflow-hidden flex flex-col">
                     <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50">
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                        <div className="w-3 h-3 rounded-full bg-slate-200" />
                     </div>
                     <div className="p-6 grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-32 bg-indigo-50/50 rounded-lg border border-indigo-100 p-4 relative overflow-hidden">
                           <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-indigo-100/50 to-transparent" />
                           <svg className="w-full h-full text-indigo-500 opacity-20" viewBox="0 0 100 40" preserveAspectRatio="none">
                              <path d="M0 40 Q 25 35 50 20 T 100 10 V 40 H 0 Z" fill="currentColor" />
                              <path d="M0 40 Q 25 35 50 20 T 100 10" stroke="currentColor" strokeWidth="2" fill="none" />
                           </svg>
                        </div>
                        <div className="h-24 bg-slate-50 rounded-lg border border-slate-100" />
                        <div className="h-24 bg-slate-50 rounded-lg border border-slate-100" />
                     </div>
                  </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Explore</div>
             <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* 2. ANIMATED REVENUE MODEL */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Diversified Revenue Streams</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">Our model is built on three robust pillars, ensuring stability and upside.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <RevenueCard 
                 title="Subscription Plans" 
                 desc="Tiered SaaS pricing for early-stage to growth-stage startups."
                 icon={CreditCard}
                 color="indigo"
                 delay={0}
              >
                 <div className="h-32 w-full mt-6 bg-slate-50 rounded-lg relative overflow-hidden flex items-end px-4 pb-4">
                    <div className="w-1/4 h-[40%] bg-indigo-200 rounded-t mx-1" />
                    <div className="w-1/4 h-[60%] bg-indigo-300 rounded-t mx-1" />
                    <div className="w-1/4 h-[80%] bg-indigo-400 rounded-t mx-1" />
                    <div className="w-1/4 h-[95%] bg-indigo-500 rounded-t mx-1 shadow-lg shadow-indigo-200" />
                 </div>
              </RevenueCard>

              {/* Card 2 */}
              <RevenueCard 
                 title="Accelerator Partnerships" 
                 desc="B2B2C distribution through top global accelerators and VC firms."
                 icon={Building2}
                 color="purple"
                 delay={0.2}
              >
                 <div className="h-32 w-full mt-6 flex items-center justify-center relative">
                    <div className="absolute w-24 h-24 bg-purple-100 rounded-full animate-pulse opacity-50" />
                    <Network className="w-12 h-12 text-purple-500 relative z-10" />
                    <div className="absolute top-4 right-10 w-2 h-2 bg-purple-400 rounded-full" />
                    <div className="absolute bottom-6 left-10 w-2 h-2 bg-purple-400 rounded-full" />
                 </div>
              </RevenueCard>

              {/* Card 3 */}
              <RevenueCard 
                 title="Marketplace Commissions" 
                 desc="Transaction fees from expert reviews, design services, and legal generation."
                 icon={Coins}
                 color="emerald"
                 delay={0.4}
              >
                 <div className="h-32 w-full mt-6 flex items-center justify-center gap-4">
                    <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
                       <Users className="w-6 h-6 text-slate-400" />
                    </div>
                    <ArrowRight className="text-emerald-400 w-4 h-4" />
                    <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-lg shadow-sm text-emerald-600">
                       <Zap className="w-6 h-6" />
                    </div>
                 </div>
              </RevenueCard>
           </div>
        </div>
      </section>

      {/* 3. GROWTH ENGINE FUNNEL */}
      <section className="py-24 bg-slate-50">
         <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Hybrid Growth Engine</h2>
            
            <div className="space-y-4">
               <FunnelStage 
                  step="01" 
                  title="Awareness" 
                  desc="Content marketing, SEO, and social proof drive organic traffic."
                  width="100%"
                  color="from-blue-500 to-indigo-500"
               />
               <FunnelStage 
                  step="02" 
                  title="Signups (Freemium)" 
                  desc="Low friction entry with free deck generation tools."
                  width="85%"
                  color="from-indigo-500 to-violet-500"
               />
               <FunnelStage 
                  step="03" 
                  title="Activation" 
                  desc="'Magic Moment': First investor-ready deck created in < 5 mins."
                  width="70%"
                  color="from-violet-500 to-purple-500"
               />
               <FunnelStage 
                  step="04" 
                  title="Conversion" 
                  desc="Upgrade to export, remove watermarks, and access premium AI models."
                  width="55%"
                  color="from-purple-500 to-fuchsia-500"
               />
               <FunnelStage 
                  step="05" 
                  title="Referral" 
                  desc="Founders invite co-founders and advisors, creating viral loops."
                  width="40%"
                  color="from-fuchsia-500 to-pink-500"
               />
            </div>
         </div>
      </section>

      {/* 4. KPI METRICS BAND */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900" />
         
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-800">
               <MetricPanel value="$250K+" label="Annual Recurring Revenue" trend="+15% MoM" />
               <MetricPanel value="8:1" label="LTV / CAC Ratio" trend="Top 5% Industry" />
               <MetricPanel value="< $10" label="Cust. Acquisition Cost" trend="Organic Driven" />
            </div>
         </div>
      </section>

      {/* 5. ECOSYSTEM VALUE ILLUSTRATION */}
      <section className="py-32 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Ecosystem Flywheel</h2>
            <p className="text-slate-600 mb-20 max-w-2xl mx-auto">How our platform creates compounding value for all stakeholders.</p>
            
            <div className="relative w-full max-w-3xl mx-auto aspect-square md:aspect-[16/9] flex items-center justify-center">
               {/* Center Node */}
               <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center z-20 shadow-2xl relative"
               >
                  <div className="text-white font-bold text-xl">StartupAI</div>
                  <div className="absolute -inset-4 border border-slate-200 rounded-full animate-ping opacity-20" />
               </motion.div>

               {/* Orbital Ring 1 */}
               <div className="absolute w-[300px] h-[300px] border border-slate-200 rounded-full z-10" />
               
               {/* Orbital Nodes */}
               <OrbitNode angle={0} label="Founders" icon={Users} delay={0.2} />
               <OrbitNode angle={90} label="Investors" icon={PieChart} delay={0.4} />
               <OrbitNode angle={180} label="Partners" icon={Building2} delay={0.6} />
               <OrbitNode angle={270} label="Advisors" icon={Shield} delay={0.8} />
               
               {/* Connecting Lines (Decorative) */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                  <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="currentColor" strokeDasharray="4" />
                  <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="currentColor" strokeDasharray="4" />
                  <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="currentColor" strokeDasharray="4" />
                  <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeDasharray="4" />
               </svg>
            </div>
         </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-24 px-6 bg-slate-50">
         <div className="max-w-5xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Built for Sustainable Growth & Ecosystem Value.</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
               Join the platform that is redefining how startups are built, funded, and scaled.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
               <Button size="lg" className="h-14 px-10 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 font-medium text-lg" onClick={() => onNavigate && onNavigate('dashboard')}>
                  Get Started Now
               </Button>
               <Button size="lg" variant="ghost" className="h-14 px-10 rounded-full text-slate-600 hover:bg-white hover:shadow-sm text-lg">
                  Read Investment Memo
               </Button>
            </div>
         </div>
      </section>

      {/* 7. FOOTER */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

// ------------------------------------------------------------------
// HELPER COMPONENTS
// ------------------------------------------------------------------

const RevenueCard = ({ title, desc, icon: Icon, color, delay, children }: any) => {
   const colorClasses: Record<string, string> = {
      indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
   };

   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay }}
         viewport={{ once: true }}
         className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
      >
         <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300", colorClasses[color])}>
            <Icon className="w-7 h-7" />
         </div>
         <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
         <p className="text-slate-600 leading-relaxed text-sm h-12">{desc}</p>
         {children}
      </motion.div>
   );
};

const FunnelStage = ({ step, title, desc, width, color }: any) => (
   <motion.div 
      initial={{ width: "30%", opacity: 0 }}
      whileInView={{ width: width, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn("mx-auto rounded-xl p-6 text-white shadow-lg relative overflow-hidden group bg-gradient-to-r", color)}
   >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <ArrowUpRight className="w-12 h-12" />
      </div>
      <div className="flex items-center gap-4 relative z-10">
         <div className="text-2xl font-bold opacity-50">{step}</div>
         <div>
            <div className="font-bold text-lg">{title}</div>
            <div className="text-sm opacity-90 font-light">{desc}</div>
         </div>
      </div>
   </motion.div>
);

const MetricPanel = ({ value, label, trend }: any) => (
   <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="p-8 text-center"
   >
      <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4 tracking-tight">
         {value}
      </div>
      <div className="text-slate-400 font-medium uppercase tracking-widest text-sm mb-2">{label}</div>
      <div className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
         <TrendingUp className="w-3 h-3" /> {trend}
      </div>
   </motion.div>
);

const OrbitNode = ({ angle, label, icon: Icon, delay }: any) => {
   // Calculate position on a circle
   // angle in degrees, radius approx 150px
   // This is a static position for simplicity, but could be animated to rotate
   const rad = (angle * Math.PI) / 180;
   const radius = 150; // px
   // We need to adjust for the center of the container (assuming 300x300 container approx, center is 0,0 relative)
   // Actually simpler to use CSS transforms
   
   return (
      <motion.div 
         initial={{ opacity: 0, scale: 0 }}
         whileInView={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5, delay }}
         className="absolute w-20 h-20 bg-white border border-slate-200 shadow-lg rounded-full flex flex-col items-center justify-center z-20"
         style={{
            top: `50%`,
            left: `50%`,
            marginTop: -40, // half height
            marginLeft: -40, // half width
            transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)`
         }}
      >
         <Icon className="w-6 h-6 text-indigo-600 mb-1" />
         <span className="text-xs font-bold text-slate-700">{label}</span>
      </motion.div>
   );
};
