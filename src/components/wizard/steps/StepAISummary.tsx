import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Globe, 
  Search, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  ArrowRight,
  Fingerprint,
  BarChart3,
  Edit2,
  RefreshCw,
  TrendingDown,
  AlertCircle,
  Activity,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';
import { cn } from '../../ui/utils';
import { toast } from 'sonner@2.0.3';

export const StepAISummary = () => {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [showQueries, setShowQueries] = useState(false);
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  // Mock Data
  const [summaryData, setSummaryData] = useState({
    name: "Acme Corp",
    summary: "Acme Corp is a B2B SaaS platform streamlining creative workflows for enterprise marketing teams. By integrating AI-driven asset generation with approval management, it reduces campaign time-to-market by 40%. The platform positions itself as a 'luxury utility' for high-growth brands.",
    category: "Marketing Tech",
    industry: "B2B SaaS",
    badges: ["Search Grounded", "URL Context Extracted"]
  });

  const [founderData, setFounderData] = useState({
    name: "Alex Rivera",
    role: "CEO & Co-Founder",
    headline: "Ex-Adobe Product Lead | Building the future of Creative Ops",
    bio: "Experienced product leader with deep expertise in creative software and enterprise workflows. Led key initiatives at Adobe Creative Cloud and Figma.",
    experience: [
      { role: "Product Lead", company: "Adobe", years: "4 years", detail: "Led Creative Cloud enterprise features" },
      { role: "Senior PM", company: "Figma", years: "2 years", detail: "Collaboration workflows" }
    ],
    education: { school: "Stanford University", degree: "BS Computer Science" },
    signals: [
      { label: "Founder-Market Fit", value: "High", color: "text-emerald-700" },
      { label: "Domain Expertise", value: "Deep", color: "text-emerald-700" }
    ]
  });

  const [websiteInsights, setWebsiteInsights] = useState({
    valueProp: "Design 10x faster with AI-powered creative ops",
    productSummary: "An all-in-one workspace for creative teams to brief, generate, review, and approve assets.",
    features: ["AI Asset Generation", "Visual Feedback", "Version Control", "Brand Guardrails"],
    audience: ["Enterprise Marketing Teams", "Creative Agencies", "Design Operations"],
    pricing: "Freemium + Enterprise Tier",
    phrases: ["Collaborative intelligence", "Brand consistency at scale", "Enterprise-grade security"]
  });

  const [marketData, setMarketData] = useState({
    competitors: [
      { name: "Frame.io", url: "frame.io", positioning: "Video collaboration focus" },
      { name: "Canva Enterprise", url: "canva.com", positioning: "Broad design tool" },
      { name: "Bynder", url: "bynder.com", positioning: "DAM focused" }
    ],
    trends: [
      "Shift towards Generative AI integration in DAMs",
      "Consolidation of creative tools into suites",
      "Increased focus on brand safety in AI generation"
    ],
    labels: ["Creative Operations", "DAM", "Generative AI", "Enterprise Collaboration"]
  });

  const searchData = {
    queries: [
      "Acme Corp competitors",
      "Creative operations software market size 2025",
      "AI in digital asset management trends"
    ],
    sources: ["Website", "LinkedIn", "Crunchbase", "G2 Reviews"],
    extracted: ["3 Competitors", "5 Market Trends", "Pricing Tier Structure"]
  };

  const signals = {
    general: [
      { label: "Industry", value: "Marketing Technology" },
      { label: "Stage", value: "Seed / Series A Ready" },
      { label: "Messaging", value: "Clear & Value-Focused" }
    ],
    product: [
      { label: "Core Problem", value: "Fragmented creative workflows" },
      { label: "Solution Theme", value: "Unified AI-native workspace" },
      { label: "Differentiator", value: "Deep Adobe integration" }
    ],
    market: [
      { label: "Competitor Density", value: "High" },
      { label: "Trend Alignment", value: "Strong (GenAI Wave)" }
    ]
  };

  const handleAIEnhance = (field: string, action: string) => {
    toast.success(`AI ${action} applied to ${field}`, {
      description: "Content has been enhanced by Gemini"
    });
  };

  const EditableField = ({ 
    value, 
    fieldKey, 
    multiline = false,
    className = "",
    placeholder = "Enter value..."
  }: { 
    value: string; 
    fieldKey: string;
    multiline?: boolean;
    className?: string;
    placeholder?: string;
  }) => {
    const isHovered = hoveredField === fieldKey;
    
    return (
      <div 
        className="relative group"
        onMouseEnter={() => setHoveredField(fieldKey)}
        onMouseLeave={() => setHoveredField(null)}
      >
        {multiline ? (
          <Textarea
            value={value}
            onChange={(e) => {
              // Update logic here
            }}
            className={cn(
              "resize-none border-transparent hover:border-emerald-200 focus:border-emerald-600 focus:ring-emerald-600 transition-colors bg-transparent",
              className
            )}
            placeholder={placeholder}
            rows={3}
          />
        ) : (
          <div className={cn(
            "hover:bg-emerald-50/50 rounded px-2 -mx-2 py-1 -my-1 transition-colors cursor-text",
            className
          )}>
            {value}
          </div>
        )}
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-0 top-0 flex gap-1 bg-white border border-emerald-200 rounded-lg shadow-lg p-1 z-10"
            >
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 hover:bg-emerald-50"
                onClick={() => handleAIEnhance(fieldKey, "clarity improvement")}
              >
                <Sparkles className="w-3 h-3 text-emerald-600 mr-1" />
                <span className="text-xs">Improve</span>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 hover:bg-emerald-50"
                onClick={() => handleAIEnhance(fieldKey, "rewrite")}
              >
                <RefreshCw className="w-3 h-3 text-emerald-600 mr-1" />
                <span className="text-xs">Rewrite</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-[#1A1A1A]">
      
      {/* System Badge - Top Left Only */}
      <div className="flex justify-start">
        <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 gap-2 px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">Gemini Grounded · URL Context Active</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN - Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* A. Startup Overview */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl overflow-hidden">
            <div className="p-6 md:p-8">
               <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center text-white shadow-md flex-shrink-0">
                     <Zap className="w-8 h-8" />
                  </div>
                  <div className="flex-grow space-y-4">
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <h2 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">{summaryData.name}</h2>
                           <div className="flex gap-2">
                              {summaryData.badges.map((badge, i) => (
                                 <Badge key={i} variant="secondary" className="bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border-emerald-200 gap-1 text-xs">
                                    <CheckCircle2 className="w-3 h-3" /> {badge}
                                 </Badge>
                              ))}
                           </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                           <Badge variant="outline" className="text-stone-600 border-stone-300">{summaryData.category}</Badge>
                           <Badge variant="outline" className="text-stone-600 border-stone-300">{summaryData.industry}</Badge>
                        </div>
                     </div>
                     
                     <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2 text-xs text-stone-500">
                           <Globe className="w-3.5 h-3.5" />
                           <span>Extracted from website + search grounding</span>
                        </div>
                        <EditableField
                          value={summaryData.summary}
                          fieldKey="summary"
                          multiline
                          className="text-stone-700 leading-relaxed"
                          placeholder="Company description..."
                        />
                     </div>
                  </div>
               </div>
            </div>
          </Card>

          {/* B. Founder Identity & Experience */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
             <CardHeader className="pb-3 border-b border-stone-100">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                   <div className="p-1.5 bg-emerald-50 rounded-md">
                      <Briefcase className="w-5 h-5 text-emerald-700" />
                   </div>
                   Founder Identity & Experience
                </CardTitle>
             </CardHeader>
             <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-400">
                         <Users className="w-6 h-6" />
                      </div>
                      <div className="flex-grow">
                         <EditableField
                           value={founderData.name}
                           fieldKey="founderName"
                           className="font-bold text-[#1A1A1A]"
                         />
                         <div className="text-sm text-emerald-700 font-medium mt-0.5">{founderData.role}</div>
                         <EditableField
                           value={founderData.headline}
                           fieldKey="founderHeadline"
                           className="text-xs text-stone-600 mt-0.5"
                         />
                      </div>
                   </div>
                   
                   <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                         <Award className="w-4 h-4 text-emerald-600" /> Founder Signals
                      </div>
                      <div className="flex gap-2 flex-wrap">
                         {founderData.signals.map((sig, i) => (
                            <div key={i} className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                               <span className="text-stone-600 font-medium">{sig.label}:</span>
                               <span className={cn("font-bold ml-1", sig.color)}>{sig.value}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="pt-2">
                      <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Bio</div>
                      <EditableField
                        value={founderData.bio}
                        fieldKey="founderBio"
                        multiline
                        className="text-sm text-stone-700 leading-relaxed"
                      />
                   </div>
                </div>

                <div className="space-y-4 border-l border-stone-100 pl-0 md:pl-8">
                   <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Experience Summary</h4>
                      <ul className="space-y-3">
                         {founderData.experience.map((exp, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                               <div className="flex-grow">
                                  <div>
                                    <span className="font-bold text-[#1A1A1A]">{exp.role}</span>
                                    <span className="text-stone-600"> @ {exp.company}</span>
                                  </div>
                                  <EditableField
                                    value={exp.detail}
                                    fieldKey={`exp-${i}`}
                                    className="text-xs text-stone-500"
                                  />
                               </div>
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div>
                       <div className="flex items-center gap-2 text-sm text-stone-600">
                          <GraduationCap className="w-4 h-4 text-stone-400" />
                          <span>{founderData.education.school}, {founderData.education.degree}</span>
                       </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* C. Website Context Insights */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
             <CardHeader className="pb-3 border-b border-stone-100">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                   <div className="p-1.5 bg-emerald-50 rounded-md">
                      <Globe className="w-5 h-5 text-emerald-700" />
                   </div>
                   Website Context Insights
                </CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div>
                   <div className="flex items-center justify-between mb-2">
                     <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">Detected Value Proposition</h4>
                     <span className="text-[10px] text-stone-400">Gemini inferred — confirm or refine</span>
                   </div>
                   <EditableField
                     value={websiteInsights.valueProp}
                     fieldKey="valueProp"
                     className="text-lg font-serif font-medium text-[#1A1A1A] italic"
                   />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div>
                         <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Key Features</h4>
                         <div className="flex flex-wrap gap-2">
                            {websiteInsights.features.map((f, i) => (
                               <Badge key={i} variant="secondary" className="bg-stone-50 text-[#1A1A1A] border-stone-200 font-normal hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer">{f}</Badge>
                            ))}
                         </div>
                      </div>
                      <div>
                         <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Target Audience</h4>
                         <ul className="space-y-1">
                            {websiteInsights.audience.map((a, i) => (
                               <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                                  <Target className="w-3.5 h-3.5 text-emerald-600" /> {a}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                   <div className="space-y-4">
                      <div>
                         <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Product Summary</h4>
                         <EditableField
                           value={websiteInsights.productSummary}
                           fieldKey="productSummary"
                           multiline
                           className="text-sm text-stone-600 leading-relaxed"
                         />
                      </div>
                      <div>
                         <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Detected Phrases</h4>
                         <div className="flex flex-wrap gap-2">
                            {websiteInsights.phrases.map((p, i) => (
                               <span key={i} className="text-xs text-stone-600 bg-stone-50 px-2 py-1 rounded border border-stone-200">\"{p}\"</span>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* D. Competitor & Market Intelligence */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
             <CardHeader className="pb-3 border-b border-stone-100">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                   <div className="p-1.5 bg-emerald-50 rounded-md">
                      <Search className="w-5 h-5 text-emerald-700" />
                   </div>
                   Competitor & Market Intelligence
                </CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                   {marketData.competitors.map((comp, i) => (
                      <div key={i} className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:border-emerald-300 hover:bg-emerald-50/50 transition-colors group">
                         <div className="font-bold text-[#1A1A1A] text-sm mb-1">{comp.name}</div>
                         <div className="text-xs text-emerald-700 mb-2">{comp.url}</div>
                         <EditableField
                           value={comp.positioning}
                           fieldKey={`comp-${i}`}
                           className="text-xs text-stone-600"
                         />
                      </div>
                   ))}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                   <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Industry Trends</h4>
                      <ul className="space-y-2">
                         {marketData.trends.map((trend, i) => (
                            <li key={i} className="flex gap-2 text-sm text-stone-600">
                               <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                               <span>{trend}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Market Labels</h4>
                      <div className="flex flex-wrap gap-2">
                         {marketData.labels.map((label, i) => (
                            <Badge key={i} variant="outline" className="border-stone-300 text-stone-600">{label}</Badge>
                         ))}
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* E. Detected Signals */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
             <CardHeader className="pb-3 border-b border-stone-100">
                <CardTitle className="flex items-center justify-between text-lg font-bold text-[#1A1A1A]">
                   <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-stone-100 rounded-md">
                        <BarChart3 className="w-5 h-5 text-stone-600" />
                     </div>
                     Detected Signals
                   </div>
                   <Badge variant="outline" className="text-xs text-stone-500 border-stone-300">Read-only</Badge>
                </CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="divide-y divide-stone-100">
                   <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-sm font-bold text-[#1A1A1A]">General</div>
                      <div className="md:col-span-2 grid grid-cols-2 gap-4">
                         {signals.general.map((s, i) => (
                            <div key={i}>
                               <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">{s.label}</div>
                               <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-sm font-bold text-[#1A1A1A]">Product</div>
                      <div className="md:col-span-2 grid grid-cols-2 gap-4">
                         {signals.product.map((s, i) => (
                            <div key={i}>
                               <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">{s.label}</div>
                               <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-sm font-bold text-[#1A1A1A]">Market</div>
                      <div className="md:col-span-2 grid grid-cols-2 gap-4">
                         {signals.market.map((s, i) => (
                            <div key={i}>
                               <div className="text-xs text-stone-500 uppercase tracking-wider mb-0.5">{s.label}</div>
                               <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </CardContent>
          </Card>
          
          {/* F. Research Queries Used (Collapsible) */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl overflow-hidden">
              <button
                onClick={() => setShowQueries(!showQueries)}
                className="w-full bg-stone-50 p-4 border-b border-stone-200 flex justify-between items-center hover:bg-stone-100 transition-colors"
              >
                  <h3 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                      <Search className="w-4 h-4 text-stone-400" /> Research Queries Used
                  </h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white text-stone-600 text-[10px] uppercase tracking-widest">System Log</Badge>
                    {showQueries ? <ChevronUp className="w-4 h-4 text-stone-400" /> : <ChevronDown className="w-4 h-4 text-stone-400" />}
                  </div>
              </button>
              
              <AnimatePresence>
                {showQueries && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Queries Gemini Executed</h4>
                            <ul className="space-y-2">
                                {searchData.queries.map((q, i) => (
                                    <li key={i} className="flex gap-2 text-sm text-stone-600 italic">
                                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mt-2 flex-shrink-0" />
                                        \"{q}\"
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">Data Sources & Extraction</h4>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {searchData.sources.map((src, i) => (
                                        <Badge key={i} variant="secondary" className="bg-stone-100 text-stone-600 border-stone-200">{src}</Badge>
                                    ))}
                                </div>
                                <div className="text-xs text-stone-500">
                                    Extracted: {searchData.extracted.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
          </Card>

        </div>

        {/* RIGHT COLUMN - Intelligence Rail (4 cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 lg:self-start">
          
          {/* Analysis Confidence Card - Now First in Right Rail */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
            <CardHeader className="pb-3 border-b border-stone-100 px-6 pt-6">
              <CardTitle className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-stone-400" /> Analysis Confidence
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#059669"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-3xl font-bold text-emerald-700">85%</div>
                    <div className="text-xs text-stone-500">High</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Sources Analyzed</span>
                  <span className="font-medium text-[#1A1A1A]">4 URLs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Signals Extracted</span>
                  <span className="font-medium text-[#1A1A1A]">12 Signals</span>
                </div>
                <Separator className="bg-stone-200" />
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Grounding</span>
                  <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Analyst Brief */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-700 to-emerald-900 text-white rounded-xl overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
             <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                   <Sparkles className="w-5 h-5 text-emerald-200" />
                   <h3 className="font-serif font-bold text-xl">AI Analyst Brief</h3>
                </div>
                <p className="text-emerald-50 text-sm leading-relaxed mb-4">
                  Strong founder-market fit with ex-Adobe pedigree. Clear product positioning in growing GenAI creative ops space. Competitive landscape is dense but differentiation via enterprise integrations is defensible.
                </p>
                <Separator className="bg-white/20 my-4" />
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-emerald-200 uppercase tracking-wider mb-1">Primary Strength</div>
                    <div className="text-sm font-medium">Deep domain expertise + proven enterprise execution</div>
                  </div>
                  <div>
                    <div className="text-xs text-emerald-200 uppercase tracking-wider mb-1">Primary Risk</div>
                    <div className="text-sm font-medium">High competitor density in DAM/creative space</div>
                  </div>
                </div>
             </CardContent>
          </Card>

          {/* Recommended Actions */}
          <Card className="border border-stone-200 shadow-sm bg-white rounded-xl">
             <CardHeader className="pb-3 border-b border-stone-100">
                <CardTitle className="text-sm font-bold text-[#1A1A1A] flex items-center gap-2">
                   <Lightbulb className="w-4 h-4 text-emerald-600" /> Recommended Actions
                </CardTitle>
             </CardHeader>
             <CardContent className="p-4">
                <div className="space-y-2">
                   <button className="w-full bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg p-3 transition-colors text-left group">
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 mt-0.5 flex-shrink-0 transition-colors" />
                         <div>
                            <div className="text-sm font-bold text-[#1A1A1A] group-hover:text-emerald-900">Validate Founder Details</div>
                            <div className="text-xs text-stone-500 mt-0.5">Confirm dates & roles from LinkedIn</div>
                         </div>
                      </div>
                   </button>
                   <button className="w-full bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg p-3 transition-colors text-left group">
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 mt-0.5 flex-shrink-0 transition-colors" />
                         <div>
                            <div className="text-sm font-bold text-[#1A1A1A] group-hover:text-emerald-900">Confirm Competitors</div>
                            <div className="text-xs text-stone-500 mt-0.5">Are these the right rivals?</div>
                         </div>
                      </div>
                   </button>
                   <button className="w-full bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 rounded-lg p-3 transition-colors text-left group">
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 mt-0.5 flex-shrink-0 transition-colors" />
                         <div>
                            <div className="text-sm font-bold text-[#1A1A1A] group-hover:text-emerald-900">Review Pricing</div>
                            <div className="text-xs text-stone-500 mt-0.5">Check if freemium is accurate</div>
                         </div>
                      </div>
                   </button>
                </div>
             </CardContent>
          </Card>

          {/* Ready to Proceed */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
              <h4 className="text-sm font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                 <ArrowRight className="w-4 h-4 text-emerald-600" /> Ready to proceed?
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                 Review the insights above. You can edit any field by hovering and clicking the AI enhance icon. All changes are saved automatically.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                 <Sparkles className="w-3.5 h-3.5" />
                 <span>Next: Smart Interview to refine details</span>
              </div>
          </div>

        </div>

      </div>

    </div>
  );
};