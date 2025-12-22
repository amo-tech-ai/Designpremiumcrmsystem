import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Palette, Type, Layout, Smartphone, Monitor } from 'lucide-react';
import { cn } from '../ui/utils';

// --- Types ---
interface StyleGuideProps {
  onNavigate: (view: string) => void;
}

// --- Components ---

const ColorSwatch = ({ name, hex, usage, className }: { name: string; hex: string; usage: string; className?: string }) => (
  <div className="flex flex-col gap-3">
    <div 
      className={cn("h-32 w-full rounded-2xl shadow-sm border border-gray-100 flex items-end p-4 transition-transform hover:scale-105", className)}
      style={{ backgroundColor: hex }}
    >
    </div>
    <div className="flex flex-col">
      <div className="flex justify-between items-baseline">
        <span className="font-bold text-[#111827] text-lg">{name}</span>
        <span className="font-mono text-xs text-gray-400 uppercase">{hex}</span>
      </div>
      <span className="text-sm text-gray-500">{usage}</span>
    </div>
  </div>
);

const TypeSpec = ({ role, font, size, weight, sample }: { role: string; font: string; size: string; weight: string; sample: string }) => (
  <div className="border-b border-gray-100 py-8 first:pt-0 last:border-0">
    <div className="flex flex-col md:flex-row gap-8 items-baseline">
      <div className="w-full md:w-1/4 flex flex-col gap-1">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{role}</span>
        <span className="text-sm text-gray-500 font-mono">{font} • {weight} • {size}</span>
      </div>
      <div className="w-full md:w-3/4">
        <p className={cn("text-[#111827]", size, weight, font === 'Mono' ? 'font-mono' : 'font-sans')}>{sample}</p>
      </div>
    </div>
  </div>
);

const ScreenLink = ({ title, icon: Icon, onClick, description }: { title: string; icon: any; onClick: () => void; description: string }) => (
  <div 
    onClick={onClick}
    className="group flex items-start gap-4 p-6 rounded-2xl border border-gray-200 bg-white hover:border-[#FF6A3D] hover:shadow-md transition-all cursor-pointer"
  >
    <div className="p-3 rounded-xl bg-gray-50 text-gray-600 group-hover:bg-[#FF6A3D]/10 group-hover:text-[#FF6A3D] transition-colors">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="font-bold text-[#111827] mb-1 flex items-center gap-2">
        {title} 
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6A3D]" />
      </h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export const StyleGuidePage: React.FC<StyleGuideProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-[#111827]">
      {/* Navigation Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 text-gray-500 hover:text-[#FF6A3D] cursor-pointer transition-colors"
            onClick={() => onNavigate('landing-v2')}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </div>
          <div className="text-sm font-medium text-gray-400">Style Guide v2.0</div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A3D]/10 text-[#FF6A3D] text-xs font-bold tracking-wider uppercase mb-6">
            Style Guide v2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#111827] mb-6 tracking-tight">
            StartupAI Design System
          </h1>
          <p className="text-xl text-gray-500 max-w-3xl leading-relaxed">
            A premium, intelligent design language for high-end AI interfaces. Focused on clarity, subtle interactions, and deep luxury aesthetics.
            Inspired by the "Firecrawl" visual identity.
          </p>
        </motion.div>

        {/* 1. Color Palette */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-4">
            <Palette className="w-6 h-6 text-[#FF6A3D]" />
            <h2 className="text-2xl font-bold text-[#111827]">Color Palette</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ColorSwatch 
              name="Obsidian" 
              hex="#111827" 
              usage="Primary Brand / Headings" 
              className="text-white ring-1 ring-black/5"
            />
            <ColorSwatch 
              name="Brand Orange" 
              hex="#FF6A3D" 
              usage="Primary Accent / CTAs" 
              className="text-white"
            />
            <ColorSwatch 
              name="Surface Gray" 
              hex="#F9FAFB" 
              usage="Light Mode Background" 
              className="text-[#111827]"
            />
            <ColorSwatch 
              name="Canvas White" 
              hex="#FFFFFF" 
              usage="Card Surface / Inputs" 
              className="text-[#111827] border-gray-200"
            />
          </div>
        </section>

        {/* 2. Typography */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-4">
            <Type className="w-6 h-6 text-[#FF6A3D]" />
            <h2 className="text-2xl font-bold text-[#111827]">Typography</h2>
          </div>

          <div className="space-y-4">
            <TypeSpec 
              role="Display Heading" 
              font="Inter" 
              weight="Bold (700)" 
              size="text-5xl md:text-7xl" 
              sample="AI Systems. Designed to Convert."
            />
            <TypeSpec 
              role="Section Heading" 
              font="Inter" 
              weight="Bold (700)" 
              size="text-3xl md:text-4xl" 
              sample="Intelligent Workflow Automation"
            />
            <TypeSpec 
              role="Body Text" 
              font="Inter" 
              weight="Regular (400)" 
              size="text-lg" 
              sample="StartupAI doesn't just guess next words. It understands business logic, market dynamics, and investor expectations to generate assets that actually work."
            />
            <TypeSpec 
              role="Monospace / Code" 
              font="Mono" 
              weight="Medium (500)" 
              size="text-sm" 
              sample='{ "market_opportunity": { "tam": "14.5B", "growth": "12.4%" } }'
            />
          </div>
        </section>

        {/* 3. Screens & Components */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-b border-gray-100 pb-4">
            <Layout className="w-6 h-6 text-[#FF6A3D]" />
            <h2 className="text-2xl font-bold text-[#111827]">Screens & Components</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScreenLink 
              title="Landing Page V2" 
              description="Main marketing entry point. Firecrawl aesthetic."
              icon={Monitor}
              onClick={() => onNavigate('landing-v2')}
            />
            <ScreenLink 
              title="Founder Dashboard" 
              description="Main application shell and metric overview."
              icon={Layout}
              onClick={() => onNavigate('dashboard')}
            />
            <ScreenLink 
              title="Mobile Navigation" 
              description="Responsive menu and mobile-optimized layouts."
              icon={Smartphone}
              onClick={() => onNavigate('landing-v2')} // Just links to landing for now as it's responsive
            />
            <ScreenLink 
              title="Pitch Deck Wizard" 
              description="Step-by-step form interface with complex state."
              icon={Layout}
              onClick={() => onNavigate('wizard')}
            />
            <ScreenLink 
              title="Pricing Page" 
              description="Subscription tiers and feature comparison."
              icon={Layout}
              onClick={() => onNavigate('pricing')}
            />
             <ScreenLink 
              title="About Page" 
              description="Standard text content page layout."
              icon={Layout}
              onClick={() => onNavigate('about')}
            />
          </div>
        </section>

        {/* Footer Link */}
        <div className="text-center pt-20 border-t border-gray-100">
           <p className="text-gray-400 mb-4">StartupAI Design System • V2.0.0</p>
           <button 
             onClick={() => onNavigate('landing-v2')}
             className="text-[#FF6A3D] font-medium hover:text-[#E55A2D] transition-colors"
           >
             Return to Main Application
           </button>
        </div>

      </main>
    </div>
  );
};
