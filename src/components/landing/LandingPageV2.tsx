import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  LayoutTemplate, 
  FileText, 
  Users, 
  Zap, 
  CheckCircle2, 
  BarChart3, 
  Layers, 
  Wand2, 
  Search, 
  Code2, 
  Menu,
  X,
  ChevronRight,
  Globe,
  Shield,
  Bot,
  Map as MapIcon,
  Github
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';
import { WorkflowDiagram } from '../workflow/WorkflowDiagram';

// --- Types ---

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

// --- Components ---

const Navbar = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Products', href: '#product' },
    { label: 'Playground', href: '#playground' },
    { label: 'Docs', href: '#docs' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "sticky top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-gray-200 py-3" 
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('landing-v2')}
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-[#FF6A3D] fill-current" />
          </div>
          <span className="font-sans font-bold text-xl text-[#111827] tracking-tight group-hover:text-[#FF6A3D] transition-colors">
            StartupAI
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-[#111827] transition-colors flex items-center gap-1"
            >
              {link.label}
              {link.label === 'Products' && <ChevronRight className="w-3 h-3 rotate-90 opacity-50" />}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 hover:text-[#111827] cursor-pointer transition-colors text-sm font-medium">
            <Github className="w-5 h-5" />
            <span>12.4k</span>
          </div>
          <Button 
            onClick={() => onNavigate('dashboard')}
            className="bg-[#111827] hover:bg-[#FF6A3D] text-white rounded-lg px-5 font-medium transition-all shadow-md hover:shadow-lg"
          >
            Sign up
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-6 lg:hidden flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href}
              className="text-base font-medium text-gray-800 py-2 border-b border-gray-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button onClick={() => onNavigate('dashboard')} className="w-full mt-4 bg-[#FF6A3D]">
            Sign up
          </Button>
        </div>
      )}
    </motion.nav>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const [url, setUrl] = useState('');
  const [activeAction, setActiveAction] = useState('Analyze');

  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-[#FAFAFA]">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Fine Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        {/* Large Grid Markers (+) */}
        <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.3
        }}></div>
        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-60"></div>
      </div>
      
      {/* Decorative Plus Signs */}
      <div className="absolute top-1/4 left-1/4 text-[#FF6A3D]/30 hidden md:block"><Sparkles className="w-8 h-8" /></div>
      <div className="absolute top-1/4 right-1/4 text-[#FF6A3D]/30 hidden md:block"><Sparkles className="w-8 h-8" /></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 shadow-sm text-sm font-medium text-gray-600 mb-8 cursor-pointer hover:border-[#FF6A3D] transition-colors group">
            <span className="group-hover:text-[#FF6A3D] transition-colors">2 Months Free — Annually</span>
            <ChevronRight className="w-4 h-4 bg-gray-100 rounded-full p-0.5 group-hover:bg-[#FF6A3D]/10 group-hover:text-[#FF6A3D] transition-colors" />
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-[#111827] tracking-tight leading-[1.1] mb-6 max-w-4xl font-sans">
            Turn startup ideas into <br />
            <span className="text-[#FF6A3D]">investor-ready assets</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto mb-12 leading-relaxed">
            Power your AI apps with clean web data from any website. <br className="hidden md:block"/>
            It's also open source.
          </p>
        </motion.div>

        {/* Floating Input Interface */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-2xl"
        >
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-200 p-3 relative group">
             {/* Input Area */}
             <div className="flex items-center gap-3 px-4 py-3 bg-[#FAFAFA] border border-gray-100 rounded-xl mb-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FF6A3D]/10 focus-within:border-[#FF6A3D]/20 transition-all">
                <Globe className="w-5 h-5 text-gray-400" />
                <Input 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com" 
                  className="border-none shadow-none focus-visible:ring-0 px-0 text-base md:text-lg h-auto placeholder:text-gray-400 flex-1 bg-transparent"
                />
             </div>

             {/* Actions Row */}
             <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
                <div className="flex items-center p-1 bg-[#F5F5F5] rounded-lg w-full sm:w-auto overflow-x-auto no-scrollbar">
                  {['Analyze', 'Deck', 'Docs', 'CRM'].map((action) => (
                    <button
                      key={action}
                      onClick={() => setActiveAction(action)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap",
                        activeAction === action 
                          ? "bg-white text-[#111827] shadow-sm" 
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                      )}
                    >
                      {action === 'Analyze' && <Search className="w-3 h-3 inline-block mr-1.5" />}
                      {action === 'Deck' && <LayoutTemplate className="w-3 h-3 inline-block mr-1.5" />}
                      {action === 'Docs' && <FileText className="w-3 h-3 inline-block mr-1.5" />}
                      {action === 'CRM' && <Users className="w-3 h-3 inline-block mr-1.5" />}
                      {action}
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full sm:w-auto bg-[#FF6A3D] hover:bg-[#E55A2D] text-white rounded-lg h-10 px-6 font-medium shadow-md flex items-center justify-center gap-2"
                >
                  Generate <ArrowRight className="w-4 h-4" />
                </Button>
             </div>
          </div>
          
          {/* Subtle Code Hint Background */}
          <div className="absolute -z-10 top-full left-1/2 -translate-x-1/2 w-[90%] h-32 bg-white/50 border border-gray-100 rounded-b-xl opacity-50 blur-[1px] transform -translate-y-2 pointer-events-none flex flex-col p-4 overflow-hidden">
             <div className="flex gap-2 mb-2">
               <div className="w-12 h-2 bg-gray-100 rounded-full" />
               <div className="w-24 h-2 bg-gray-100 rounded-full" />
             </div>
             <div className="space-y-2">
               <div className="w-full h-2 bg-gray-50 rounded-full" />
               <div className="w-2/3 h-2 bg-gray-50 rounded-full" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Globe className="w-6 h-6 text-[#FF6A3D]" />,
      title: "Add Context",
      desc: "Enter your website URL, upload files, or paste raw text notes."
    },
    {
      icon: <Bot className="w-6 h-6 text-[#FF6A3D]" />,
      title: "AI Reasoning",
      desc: "Gemini 3 Pro analyzes your market, competitors, and unique value."
    },
    {
      icon: <FileText className="w-6 h-6 text-[#FF6A3D]" />,
      title: "Edit & Export",
      desc: "Get fully editable artifacts (PDF, PPTX, Docs) ready for investors."
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">How it works</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            From chaos to clarity in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[#E5E7EB] via-[#FF6A3D] to-[#E5E7EB] -z-0 opacity-20" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#FF6A3D] transition-all duration-300">
                <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">{step.title}</h3>
              <p className="text-[#6B7280] leading-relaxed max-w-xs">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductModules = () => {
  const modules = [
    {
      icon: <LayoutTemplate className="w-6 h-6" />,
      title: "Pitch Deck Engine",
      desc: "Generate 12-slide investor decks with compelling narrative arcs.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Document Factory",
      desc: "Create one-pagers, memos, and legal docs in seconds.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Visual CRM",
      desc: "Track investors and leads with an AI-enriched pipeline.",
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Startup Wizard",
      desc: "Guided step-by-step builder for your entire business plan.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Automations",
      desc: "Connect your workflow to Email, Slack, and Notion.",
    }
  ];

  return (
    <section id="product" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
           <div>
             <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">Product Modules</h2>
             <p className="text-[#6B7280] max-w-xl">
               A complete suite of tools designed to help you raise capital and grow faster.
             </p>
           </div>
           <Button variant="ghost" className="text-[#FF6A3D] hover:text-[#E55A2D] hover:bg-[#FF6A3D]/5">
             View all features <ArrowRight className="ml-2 w-4 h-4" />
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#FF6A3D]/30 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm bg-gray-50 group-hover:bg-[#FF6A3D]/10 text-[#111827] group-hover:text-[#FF6A3D] transition-colors">
                {mod.icon}
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">{mod.title}</h3>
              <p className="text-[#6B7280] mb-6 min-h-[48px]">{mod.desc}</p>
              <div className="flex items-center text-sm font-medium text-[#111827] group-hover:text-[#FF6A3D] transition-colors">
                Open module <ChevronRight className="ml-1 w-4 h-4" />
              </div>
            </motion.div>
          ))}
          
          {/* Coming Soon Card */}
          <div className="bg-[#F5F5F5] p-8 rounded-2xl border border-dashed border-gray-300 flex flex-col justify-center items-center text-center opacity-70">
            <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center mb-6">
              <Layers className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-500 mb-2">More coming soon</h3>
            <p className="text-sm text-gray-400">Financial modeling & Cap table management</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const AICapabilities = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge className="bg-[#FFF7ED] text-[#FF6A3D] hover:bg-[#FFF7ED] border border-[#FFEDD5]">
              Powered by Google Gemini
            </Badge>
            <h2 className="text-4xl font-bold text-[#111827]">
              Reasoning, <br /> not just autocomplete.
            </h2>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              StartupAI doesn't just guess next words. It understands business logic, market dynamics, and investor expectations.
            </p>
            
            <div className="space-y-4">
              {[
                { label: "Structured JSON Outputs", desc: "Clean data ready for any frontend" },
                { label: "Search Grounding", desc: "Real-time market data verification" },
                { label: "Thinking Mode", desc: "Multi-step reasoning chains for complex tasks" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6A3D]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{item.label}</h4>
                    <p className="text-sm text-[#6B7280]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Preview */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6A3D] to-[#FF4D4D] rounded-3xl opacity-10 blur-2xl"></div>
            <div className="relative bg-[#0F172A] rounded-2xl border border-gray-800 shadow-2xl overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-[#020617]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <span className="text-gray-500 ml-2">market_analysis.json</span>
              </div>
              <div className="p-6 text-gray-300 overflow-x-auto">
                <pre>
{`{
  "market_opportunity": {
    "tam": "14.5B",
    "cagr": "12.4%",
    "key_drivers": [
      "Remote work adoption",
      "AI integration demand"
    ]
  },
  "competitors": [
    {
      "name": "LegacyCorp",
      "weakness": "Slow innovation cycle",
      "opportunity": "UX modernization"
    }
  ],
  "reasoning_trace": {
    "confidence": 0.94,
    "sources": ["Bloomberg", "TechCrunch"]
  }
}`}
                </pre>
              </div>
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 bg-[#FF6A3D] text-white px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-2 shadow-lg">
                <Sparkles className="w-3 h-3" />
                Thinking Process Complete
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">Simple pricing for serious founders</h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-[#111827]" : "text-[#6B7280]")}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-[#E5E7EB] rounded-full p-1 transition-colors hover:bg-gray-300 focus:outline-none"
            >
              <div 
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow-sm transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-0"
                )} 
              />
            </button>
            <span className={cn("text-sm font-medium", isAnnual ? "text-[#111827]" : "text-[#6B7280]")}>
              Annual <span className="text-[#FF6A3D] text-xs ml-1 font-bold">-20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {[
            {
              name: "Starter",
              price: isAnnual ? "0" : "0",
              desc: "Perfect for exploring ideas",
              features: ["3 AI generations / month", "Basic deck export", "Community support"],
              cta: "Get Started",
              primary: false
            },
            {
              name: "Pro",
              price: isAnnual ? "29" : "39",
              desc: "For founders raising capital",
              features: ["Unlimited generations", "Full export suite (PPTX, PDF)", "Search Grounding", "Priority support"],
              cta: "Start Free Trial",
              primary: true
            },
            {
              name: "Teams",
              price: isAnnual ? "79" : "99",
              desc: "For accelerators & studios",
              features: ["5 Team members", "Shared workspace", "Custom templates", "API Access"],
              cta: "Contact Sales",
              primary: false
            }
          ].map((plan, i) => (
            <div 
              key={i} 
              className={cn(
                "relative p-8 rounded-2xl bg-white border transition-all",
                plan.primary 
                  ? "border-[#FF6A3D] shadow-[0_0_40px_rgba(255,106,61,0.1)] scale-105 z-10" 
                  : "border-[#E5E7EB] shadow-sm hover:shadow-md"
              )}
            >
              {plan.primary && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-[#111827]">{plan.name}</h3>
              <p className="text-[#6B7280] text-sm mt-1 mb-6">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[#111827]">${plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-[#374151]">
                    <CheckCircle2 className={cn("w-4 h-4", plan.primary ? "text-[#FF6A3D]" : "text-[#10B981]")} />
                    {f}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={cn(
                  "w-full h-11 rounded-xl font-medium transition-colors",
                  plan.primary 
                    ? "bg-[#FF6A3D] hover:bg-[#E55A2D] text-white" 
                    : "bg-white border border-[#E5E7EB] text-[#111827] hover:bg-gray-50"
                )}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  return (
    <footer className="bg-white border-t border-[#E5E7EB] pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-[#111827] rounded-md flex items-center justify-center text-white">
                <Sparkles className="w-3 h-3 text-[#FF6A3D]" />
              </div>
              <span className="font-bold text-lg text-[#111827]">StartupAI</span>
            </div>
            <p className="text-[#6B7280] text-sm max-w-xs leading-relaxed mb-6">
              The AI-native operating system for startups. Build decks, documents, and workflows with the power of Gemini 3 Pro.
            </p>
            <div className="flex gap-4 text-gray-400">
               {/* Social placeholders */}
               <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"><Globe className="w-4 h-4" /></div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><a href="#" className="hover:text-[#FF6A3D]">Pitch Deck</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Visual CRM</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Document Gen</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><a href="#" className="hover:text-[#FF6A3D]">About</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Contact</a></li>
              <li>
                <button 
                  onClick={() => onNavigate('style-guide')} 
                  className="hover:text-[#FF6A3D] text-left transition-colors"
                >
                  Style Guide
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#111827] mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li><a href="#" className="hover:text-[#FF6A3D]">Privacy</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Terms</a></li>
              <li><a href="#" className="hover:text-[#FF6A3D]">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#E5E7EB] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9CA3AF]">
          <p>© 2025 StartupAI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main Page Component ---

export const LandingPageV2: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#111827]">
      <Navbar onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <HowItWorks />
      <WorkflowDiagram />
      <ProductModules />
      <AICapabilities />
      <Pricing />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
