import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Globe, 
  Check, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Target, 
  Briefcase, 
  FileText,
  Edit2,
  Zap,
  Search,
  Loader2,
  RefreshCw,
  Lightbulb,
  Link as LinkIcon,
  User,
  DollarSign,
  ShieldCheck,
  Plus,
  ChevronLeft,
  Wand2,
  Maximize2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";

// --- Types ---

type StepId = 'context' | 'founder' | 'fundamentals' | 'traction' | 'summary';

interface Step {
  id: StepId;
  label: string;
  icon?: React.ElementType;
}

interface WizardData {
  description: string;
  website: string;
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderLinkedin: string;
  founderEmail: string;
  industry: string;
  stage: string;
  businessModel: string;
  pricingModel: string;
  targetRegion: string;
  customerSegments: string[];
  keyFeatures: string[];
  competitors: string[];
  differentiator: string;
  mrr: string;
  userCount: string;
  growthRate: string;
  waitlistSize: string;
  partners: string;
  fundingRaised: string;
  milestones: string[];
  tone: 'Professional' | 'Bold' | 'Friendly' | 'Visionary';
}

const INITIAL_DATA: WizardData = {
  description: '',
  website: '',
  founderName: '',
  founderRole: 'Founder & CEO',
  founderBio: '',
  founderLinkedin: '',
  founderEmail: '',
  industry: '',
  stage: '',
  businessModel: '',
  pricingModel: '',
  targetRegion: 'Global',
  customerSegments: [],
  keyFeatures: [],
  competitors: [],
  differentiator: '',
  mrr: '',
  userCount: '',
  growthRate: '',
  waitlistSize: '',
  partners: '',
  fundingRaised: '',
  milestones: [],
  tone: 'Professional'
};

const STEPS: Step[] = [
  { id: 'context', label: 'Context', icon: Sparkles },
  { id: 'founder', label: 'Founder & Team', icon: Users },
  { id: 'fundamentals', label: 'Fundamentals', icon: Briefcase },
  { id: 'traction', label: 'Traction', icon: TrendingUp },
  { id: 'summary', label: 'AI Summary', icon: FileText },
];

const AI_TAGS = [
  { id: 'problem', label: 'Problem' },
  { id: 'audience', label: 'Target Audience' },
  { id: 'solution', label: 'Core Solution' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing Model' },
];

// --- Mobile Collapsible Panel Component ---
const CollapsibleSidePanel: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="lg:col-span-5 space-y-4">
      {/* Mobile Toggle */}
      <div className="lg:hidden">
        <Button 
          variant="outline" 
          className="w-full justify-between bg-white border-indigo-200 text-indigo-700 hover:bg-indigo-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> {title}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {/* Content */}
      <div className={cn("space-y-4", !isOpen && "hidden lg:block")}>
        <AnimatePresence>
          {isOpen && (
             <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="space-y-4"
             >
               {children}
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

interface PitchDeckWizardProps {
  onNavigate?: (view: string) => void;
}

export const PitchDeckWizard: React.FC<PitchDeckWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<StepId>('context');
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  
  // AI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);
  const [extractedTags, setExtractedTags] = useState<string[]>([]);
  const [urlStatus, setUrlStatus] = useState<'idle' | 'analyzing' | 'extracted'>('idle');
  const [searchGroundingStatus, setSearchGroundingStatus] = useState<'idle' | 'searching' | 'complete'>('idle');
  const [founderBioRefined, setFounderBioRefined] = useState(false);

  // --- Handlers ---

  const handleNext = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      const nextStep = STEPS[currentIndex + 1].id;
      setCurrentStep(nextStep);
      if (nextStep === 'fundamentals') {
        setSearchGroundingStatus('searching');
        setTimeout(() => setSearchGroundingStatus('complete'), 2500);
      }
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const handleFinish = () => {
    toast.success("Startup profile saved to dashboard!");
    if (onNavigate) {
       setTimeout(() => onNavigate('dashboard'), 1500);
    }
  };

  const updateData = (key: keyof WizardData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const addItem = (key: 'customerSegments' | 'keyFeatures' | 'competitors' | 'milestones', value: string) => {
    if (value && !data[key].includes(value)) {
      updateData(key, [...data[key], value]);
    }
  };

  const removeItem = (key: 'customerSegments' | 'keyFeatures' | 'competitors' | 'milestones', index: number) => {
    updateData(key, data[key].filter((_, i) => i !== index));
  };

  // --- AI Simulations ---

  useEffect(() => {
    if (currentStep === 'context' && data.description.length > 20) {
      setIsAnalyzing(true);
      setAiReasoning("Analyzing semantic patterns to identify problem space and core value proposition...");
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setExtractedTags(['problem', 'solution']);
        if (data.description.length > 50) setExtractedTags(['problem', 'solution', 'audience']);
        if (data.description.length > 100) setExtractedTags(['problem', 'solution', 'audience', 'features']);
        setAiReasoning("Core context extracted. Gemini has identified your key value drivers.");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setExtractedTags([]);
      setAiReasoning(null);
    }
  }, [data.description, currentStep]);

  const handleUrlAnalysis = () => {
    if (!data.website) return;
    setUrlStatus('analyzing');
    setTimeout(() => {
      setUrlStatus('extracted');
      setExtractedTags([...extractedTags, 'pricing']);
      toast.success("Website context extracted successfully");
    }, 2000);
  };

  const handleBioRewrite = () => {
    if (!data.founderBio) return;
    setIsAnalyzing(true);
    setAiReasoning("Optimizing bio for investor credibility...");
    setTimeout(() => {
      setIsAnalyzing(false);
      setFounderBioRefined(true);
      updateData('founderBio', "Visionary leader with 10+ years in SaaS. Previously scaled [Company] to $5M ARR. Expert in product-led growth and enterprise sales.");
      setAiReasoning("Bio rewritten to highlight traction and authority.");
    }, 1500);
  };

  // --- Render Components ---

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto px-4 py-8">
      {STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = STEPS.findIndex(s => s.id === currentStep) > idx;
        return (
          <div key={step.id} className="flex flex-col items-center relative z-10 w-full">
            <div className="flex items-center w-full">
              <div className={cn("h-1 w-full rounded-full transition-colors duration-500", 
                idx === 0 ? "opacity-0" : isCompleted || isActive ? "bg-indigo-600" : "bg-slate-200"
              )} />
              <div 
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 border-4",
                  isActive ? "bg-white border-indigo-600 text-indigo-600 shadow-lg shadow-indigo-100 scale-110" : 
                  isCompleted ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white border-slate-200 text-slate-400"
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
              </div>
              <div className={cn("h-1 w-full rounded-full transition-colors duration-500", 
                 idx === STEPS.length - 1 ? "opacity-0" : isCompleted ? "bg-indigo-600" : "bg-slate-200"
              )} />
            </div>
            <span className={cn(
              "absolute top-12 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 text-center",
              isActive ? "text-indigo-600" : isCompleted ? "text-indigo-900" : "text-slate-400"
            )}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const renderAIReasoning = (customText?: string) => (
    <div className="relative mt-6">
      <div className="absolute -left-3 top-6 w-3 h-3 bg-indigo-50 border-l border-b border-indigo-200 transform rotate-45 lg:block hidden"></div>
      <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="text-sm font-bold text-indigo-900">Gemini 3 Reasoning</span>
        </div>
        <div className="min-h-[40px] flex items-center">
          {isAnalyzing ? (
            <div className="flex items-center gap-2 text-sm text-indigo-700">
              <Loader2 className="w-4 h-4 animate-spin" />
              {aiReasoning || "Processing..."}
            </div>
          ) : (
            <p className="text-sm text-slate-600 leading-relaxed">
              {customText || aiReasoning || "Gemini is observing your inputs to provide context-aware suggestions."}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const Step1Context = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-7 space-y-6">
        <div>
           <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">What are you building?</h2>
           <p className="text-slate-500">Provide a description and website to help Gemini ground its understanding.</p>
        </div>
        <div className="space-y-4">
          <div className="relative group">
            <Textarea 
              placeholder="e.g. Acme is a visual collaboration platform for remote engineering teams..."
              className="min-h-[220px] text-lg p-6 leading-relaxed border-slate-200 focus:border-indigo-500 resize-none rounded-xl shadow-sm transition-all"
              value={data.description}
              onChange={(e) => updateData('description', e.target.value)}
            />
            <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium bg-white px-2 py-1 rounded-md shadow-sm border border-slate-100">
              {data.description.length} chars
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
             {AI_TAGS.map(tag => (
               <Badge key={tag.id} variant="outline" className={cn("px-3 py-1.5 transition-all duration-300 border", extractedTags.includes(tag.id) ? "bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm" : "bg-slate-50 text-slate-400 border-transparent opacity-60")}>
                 {extractedTags.includes(tag.id) ? <Check className="w-3 h-3 mr-1.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2" />}
                 {tag.label}
               </Badge>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
           <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0"><Globe className="w-5 h-5" /></div>
           <div className="flex-grow">
              <Input placeholder="https://yourstartup.com" className="h-9 border-none shadow-none p-0 focus-visible:ring-0" value={data.website} onChange={(e) => updateData('website', e.target.value)} />
           </div>
           <Button size="sm" variant="ghost" onClick={handleUrlAnalysis} disabled={!data.website || urlStatus === 'analyzing'} className={cn("text-xs font-medium px-4 h-8 rounded-lg transition-all", urlStatus === 'extracted' ? "text-green-600 bg-green-50 hover:bg-green-100" : "text-indigo-600 bg-indigo-50 hover:bg-indigo-100")}>
             {urlStatus === 'analyzing' ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : urlStatus === 'extracted' ? <Check className="w-3 h-3 mr-2" /> : <Wand2 className="w-3 h-3 mr-2" />}
             {urlStatus === 'analyzing' ? 'Scanning...' : urlStatus === 'extracted' ? 'Verified' : 'Analyze'}
           </Button>
        </div>
      </div>

      <CollapsibleSidePanel title="AI Context Analysis">
         <AnimatePresence>
           {urlStatus !== 'idle' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase"><LinkIcon className="w-3 h-3" /> URL Context</div>
                   {urlStatus === 'extracted' && <Badge variant="outline" className="bg-white text-green-600 border-green-200 text-[10px] h-5">Active</Badge>}
                </div>
                <div className="p-4 space-y-3">
                   <div className="space-y-1">
                      <div className="text-xs text-slate-400 font-medium">Tagline Detected</div>
                      {urlStatus === 'analyzing' ? <div className="h-4 w-3/4 bg-slate-100 animate-pulse rounded" /> : <div className="text-sm text-slate-800 font-medium">"Visual collaboration for modern teams"</div>}
                   </div>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
         {renderAIReasoning()}
         {data.description.length > 30 && (
           <div className="flex flex-wrap gap-2 pt-2">
             <Button variant="outline" size="sm" className="text-xs h-8 bg-white border-dashed text-slate-600 hover:text-indigo-600 hover:border-indigo-200"><Edit2 className="w-3 h-3 mr-1.5" /> Improve Clarity</Button>
             <Button variant="outline" size="sm" className="text-xs h-8 bg-white border-dashed text-slate-600 hover:text-indigo-600 hover:border-indigo-200"><Zap className="w-3 h-3 mr-1.5" /> Investor Tone</Button>
           </div>
         )}
      </CollapsibleSidePanel>
    </div>
  );

  const Step2Founder = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-7 space-y-6">
        <div><h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Founder & Team</h2><p className="text-slate-500">Investors bet on the jockey, not just the horse. Who is leading this?</p></div>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2"><Label>Full Name</Label><Input placeholder="Jane Doe" value={data.founderName} onChange={(e) => updateData('founderName', e.target.value)} /></div>
           <div className="space-y-2"><Label>Role / Title</Label><Input placeholder="Founder & CEO" value={data.founderRole} onChange={(e) => updateData('founderRole', e.target.value)} /></div>
        </div>
        <div className="space-y-2">
           <div className="flex justify-between items-center"><Label>Short Bio</Label><Button variant="ghost" size="sm" className="h-6 text-xs text-indigo-600 hover:bg-indigo-50 px-2" onClick={handleBioRewrite} disabled={isAnalyzing || !data.founderBio}><Wand2 className="w-3 h-3 mr-1.5" /> AI Rewrite</Button></div>
           <Textarea placeholder="Briefly describe your background..." className={cn("min-h-[120px] resize-none transition-colors duration-500", founderBioRefined ? "bg-indigo-50/30 border-indigo-200" : "")} value={data.founderBio} onChange={(e) => updateData('founderBio', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-2"><Label>LinkedIn URL</Label><div className="relative"><Input placeholder="linkedin.com/in/..." className="pl-9" value={data.founderLinkedin} onChange={(e) => updateData('founderLinkedin', e.target.value)} /><div className="absolute left-3 top-2.5 text-slate-400"><LinkIcon className="w-4 h-4" /></div></div></div>
           <div className="space-y-2"><Label>Email</Label><div className="relative"><Input placeholder="jane@startup.com" className="pl-9" value={data.founderEmail} onChange={(e) => updateData('founderEmail', e.target.value)} /><div className="absolute left-3 top-2.5 text-slate-400"><User className="w-4 h-4" /></div></div></div>
        </div>
        <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 hover:text-slate-700"><Plus className="w-4 h-4 mr-2" /> Add Co-Founder</Button>
      </div>

      <CollapsibleSidePanel title="Founder Persona Analysis">
         <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">{data.founderName ? data.founderName.charAt(0) : <User className="w-5 h-5" />}</div>
                  <div><div className="font-bold text-lg">{data.founderName || "Founder Name"}</div><div className="text-indigo-200 text-sm">{data.founderRole}</div></div>
               </div>
               <p className="text-indigo-100 text-sm leading-relaxed italic opacity-90">"{data.founderBio || "Your bio will appear here. AI can help rewrite it to sound more authoritative for investors."}"</p>
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
         </div>
         {renderAIReasoning(founderBioRefined ? "Bio successfully optimized for investor deck impact." : "Gemini can summarize your background into a punchy one-liner.")}
      </CollapsibleSidePanel>
    </div>
  );

  const Step3Fundamentals = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-7 space-y-6">
        <div><h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Business Fundamentals</h2><p className="text-slate-500">Define the core mechanics of your business model.</p></div>
        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-2"><Label>Industry</Label><Select value={data.industry} onValueChange={(v) => updateData('industry', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="SaaS">SaaS / Software</SelectItem><SelectItem value="Fintech">Fintech</SelectItem><SelectItem value="Health">Healthcare</SelectItem></SelectContent></Select></div>
           <div className="space-y-2"><Label>Stage</Label><Select value={data.stage} onValueChange={(v) => updateData('stage', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Idea">Idea Phase</SelectItem><SelectItem value="Seed">Seed</SelectItem></SelectContent></Select></div>
           <div className="space-y-2"><Label>Pricing Model</Label><Select value={data.pricingModel} onValueChange={(v) => updateData('pricingModel', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Subscription">Subscription</SelectItem><SelectItem value="Freemium">Freemium</SelectItem></SelectContent></Select></div>
           <div className="space-y-2"><Label>Target Region</Label><Select value={data.targetRegion} onValueChange={(v) => updateData('targetRegion', v)}><SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger><SelectContent><SelectItem value="Global">Global</SelectItem><SelectItem value="NA">North America</SelectItem></SelectContent></Select></div>
        </div>
        <div className="space-y-2"><Label>Primary Competitors</Label><Input placeholder="e.g. Asana, Monday.com" onKeyDown={(e) => {if(e.key === 'Enter') {addItem('competitors', e.currentTarget.value); e.currentTarget.value = '';}}} /><div className="flex flex-wrap gap-2 mt-2">{data.competitors.map((comp, i) => (<Badge key={i} variant="secondary" className="pr-1">{comp} <button onClick={() => removeItem('competitors', i)} className="ml-1 hover:text-red-500"><Plus className="w-3 h-3 rotate-45" /></button></Badge>))}</div></div>
        <div className="space-y-2"><Label>Differentiator</Label><Input placeholder="One sentence: Why do you win?" value={data.differentiator} onChange={(e) => updateData('differentiator', e.target.value)} /></div>
      </div>

      <CollapsibleSidePanel title="Market Search Grounding">
         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full max-h-[400px]">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex items-center justify-between">
               <span className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2"><Globe className="w-3 h-3" /> Search Grounding</span>
               {searchGroundingStatus === 'searching' && <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />}
               {searchGroundingStatus === 'complete' && <Badge variant="outline" className="text-[10px] bg-white text-green-600 border-green-200">Live Data</Badge>}
            </div>
            <div className="p-4 space-y-4 overflow-y-auto">
               {searchGroundingStatus === 'idle' ? (<div className="text-center py-8 text-slate-400 text-sm">Complete the industry fields to trigger market search.</div>) : searchGroundingStatus === 'searching' ? (<div className="space-y-3">{[1,2,3].map(i => (<div key={i} className="flex gap-3"><div className="w-8 h-8 bg-slate-100 rounded animate-pulse" /><div className="flex-1 space-y-2"><div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" /><div className="h-2 w-full bg-slate-100 rounded animate-pulse" /></div></div>))}</div>) : (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                     <div className="p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                        <div className="text-xs font-bold text-indigo-900 mb-1">Market Insight</div>
                        <p className="text-xs text-indigo-800 leading-relaxed">The {data.industry || 'SaaS'} market is growing at 18% CAGR. Key consolidation happening in the {data.targetRegion} region.</p>
                     </div>
                     <div>
                        <div className="text-xs font-bold text-slate-500 uppercase mb-2">Similar Companies</div>
                        <div className="space-y-2">{['Linear', 'Notion', 'Airtable'].map(c => (<div key={c} className="flex items-center justify-between text-sm p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group"><span className="font-medium text-slate-700">{c}</span><Plus className="w-3 h-3 text-slate-300 group-hover:text-indigo-600 opacity-0 group-hover:opacity-100" /></div>))}</div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </CollapsibleSidePanel>
    </div>
  );

  const Step4Traction = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
      <div className="lg:col-span-7 space-y-6">
        <div><h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-2">Traction & Metrics</h2><p className="text-slate-500">Validation signals help AI generate stronger investor content.</p></div>
        <div className="grid grid-cols-2 gap-6">
           <div className="space-y-2"><Label>MRR</Label><div className="relative"><Input placeholder="0" className="pl-8" value={data.mrr} onChange={(e) => updateData('mrr', e.target.value)} /><DollarSign className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" /></div></div>
           <div className="space-y-2"><Label>Active Users</Label><div className="relative"><Input placeholder="0" className="pl-8" value={data.userCount} onChange={(e) => updateData('userCount', e.target.value)} /><Users className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" /></div></div>
           <div className="space-y-2"><Label>Growth Rate</Label><div className="relative"><Input placeholder="0%" className="pl-8" value={data.growthRate} onChange={(e) => updateData('growthRate', e.target.value)} /><TrendingUp className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" /></div></div>
           <div className="space-y-2"><Label>Waitlist</Label><Input placeholder="0" value={data.waitlistSize} onChange={(e) => updateData('waitlistSize', e.target.value)} /></div>
        </div>
        <Separator />
        <div className="space-y-4">
           <div className="space-y-2"><Label>Key Partners</Label><Input placeholder="e.g. Stripe, Twilio" value={data.partners} onChange={(e) => updateData('partners', e.target.value)} /></div>
           <div className="space-y-2"><Label>Milestones</Label><Input placeholder="e.g. Beta Launch (Press Enter)" onKeyDown={(e) => {if(e.key === 'Enter') {addItem('milestones', e.currentTarget.value); e.currentTarget.value = '';}}} /><div className="space-y-2 mt-2">{data.milestones.map((m, i) => (<div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100"><Check className="w-4 h-4 text-green-500" />{m}<button onClick={() => removeItem('milestones', i)} className="ml-auto text-slate-400 hover:text-red-500"><Plus className="w-4 h-4 rotate-45" /></button></div>))}</div></div>
        </div>
      </div>

      <CollapsibleSidePanel title="Metrics Analysis">
         <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-indigo-600"><FileText className="w-6 h-6" /></div>
            <div><h4 className="font-semibold text-slate-900">Have a pitch deck?</h4><p className="text-sm text-slate-500 mt-1">Upload your existing deck or financial model and Gemini will auto-fill these metrics.</p></div>
            <Button variant="outline" className="bg-white">Upload File</Button>
         </div>
         {renderAIReasoning("Metrics provide the 'proof' your story needs. Even early waitlist numbers count.")}
      </CollapsibleSidePanel>
    </div>
  );

  const Step5Summary = () => (
    <div className="h-full flex flex-col">
       <div className="mb-6 flex justify-between items-end">
          <div><h2 className="text-2xl font-semibold text-slate-900 tracking-tight flex items-center gap-2"><Sparkles className="w-6 h-6 text-indigo-600" /> Startup Profile Generated</h2><p className="text-slate-500 mt-1">Gemini structured your profile using your inputs, website context, and search grounding.</p></div>
          <div className="flex gap-2"><Button variant="outline" size="sm" onClick={() => toast.info("Regenerating profile...")}><RefreshCw className="w-4 h-4 mr-2" /> Regenerate</Button></div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow overflow-hidden">
          <div className="lg:col-span-8 overflow-y-auto pr-2 space-y-6 pb-20">
             <Card className="border-indigo-100 shadow-md shadow-indigo-50/50">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-white pb-6">
                   <div className="flex justify-between items-start">
                      <div><Badge className="mb-3 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">{data.industry || 'Technology'} • {data.stage || 'Early Stage'}</Badge><CardTitle className="text-2xl mb-2">{data.description.split(' ').slice(0, 4).join(' ')}...</CardTitle><CardDescription className="text-base">{data.differentiator || "The most advanced solution for " + data.industry}</CardDescription></div>
                      <div className="text-right"><div className="text-2xl font-bold text-slate-900">{data.mrr ? `$${data.mrr}` : 'Pre-Rev'}</div><div className="text-xs text-slate-500 uppercase font-bold">MRR</div></div>
                   </div>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-2 gap-6">
                   <div><h4 className="text-sm font-bold text-slate-900 uppercase mb-2 flex items-center gap-2"><Target className="w-4 h-4 text-slate-400" /> Problem</h4><p className="text-sm text-slate-600 leading-relaxed">Legacy solutions in {data.industry} are too complex and expensive, leaving {data.customerSegments[0] || 'customers'} underserved.</p></div>
                   <div><h4 className="text-sm font-bold text-slate-900 uppercase mb-2 flex items-center gap-2"><Zap className="w-4 h-4 text-slate-400" /> Solution</h4><p className="text-sm text-slate-600 leading-relaxed">An AI-first {data.businessModel || 'SaaS'} platform that automates core workflows, reducing time-to-value by 50%.</p></div>
                </CardContent>
             </Card>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card><CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Briefcase className="w-4 h-4 text-indigo-600" /> Business Model</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Model</span><span className="font-medium">{data.businessModel || 'SaaS'}</span></div><div className="flex justify-between py-1 border-b border-slate-100"><span className="text-slate-500">Pricing</span><span className="font-medium">{data.pricingModel || 'Subscription'}</span></div></CardContent></Card>
                <Card><CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Users className="w-4 h-4 text-indigo-600" /> Team</CardTitle></CardHeader><CardContent className="text-sm"><div className="font-medium text-slate-900">{data.founderName || 'Founder'}</div><div className="text-slate-500 text-xs mb-3">{data.founderRole}</div><p className="text-slate-600 line-clamp-3 italic">"{data.founderBio || 'Experienced leader with domain expertise.'}"</p></CardContent></Card>
             </div>
          </div>

          <CollapsibleSidePanel title="Gemini Insight & Tools">
             <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 text-sm">Refinement Tools</h4>
                <div className="space-y-3">
                   <div className="space-y-2">
                      <Label className="text-xs">Tone</Label>
                      <Select value={data.tone} onValueChange={(v: any) => updateData('tone', v)}><SelectTrigger className="bg-white"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Professional">Professional</SelectItem><SelectItem value="Bold">Bold</SelectItem><SelectItem value="Friendly">Friendly</SelectItem><SelectItem value="Visionary">Visionary</SelectItem></SelectContent></Select>
                   </div>
                   <div className="pt-2 grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start bg-white h-9 text-sm font-normal text-slate-600"><Maximize2 className="w-4 h-4 mr-2 text-slate-400" /> Expand Details</Button>
                      <Button variant="outline" className="justify-start bg-white h-9 text-sm font-normal text-slate-600"><Zap className="w-4 h-4 mr-2 text-slate-400" /> Make Concise</Button>
                   </div>
                </div>
             </div>
             <div className="bg-indigo-900 text-white rounded-xl p-5 shadow-lg">
                <h4 className="font-bold mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-indigo-300" /> Gemini Insight</h4>
                <p className="text-sm text-indigo-100 leading-relaxed mb-4">Your profile is strong on technical differentiation but could improve on market sizing data. Consider adding SAM/SOM figures in the metrics section.</p>
                <Button size="sm" className="w-full bg-white text-indigo-900 hover:bg-indigo-50">Auto-Improve</Button>
             </div>
          </CollapsibleSidePanel>
       </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 z-30">
        {renderStepIndicator()}
      </header>
      <main className="flex-grow overflow-y-auto px-6 py-8 container mx-auto max-w-7xl">
        <motion.div key={currentStep} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="h-full">
          {currentStep === 'context' && <Step1Context />}
          {currentStep === 'founder' && <Step2Founder />}
          {currentStep === 'fundamentals' && <Step3Fundamentals />}
          {currentStep === 'traction' && <Step4Traction />}
          {currentStep === 'summary' && <Step5Summary />}
        </motion.div>
      </main>
      <footer className="bg-white border-t border-slate-200 px-8 py-5 flex-shrink-0 z-40">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 'context'} className={cn("text-slate-500 hover:text-slate-800", currentStep === 'context' && "opacity-0 pointer-events-none")}><ChevronLeft className="w-4 h-4 mr-2" /> Back</Button>
          {currentStep !== 'summary' ? (
             <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-indigo-200 transition-transform active:scale-95 font-medium text-base">Continue <ChevronRight className="w-4 h-4 ml-2" /></Button>
          ) : (
             <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8 h-12 shadow-lg shadow-green-200 transition-transform active:scale-95 font-medium text-base">Finish & Save Profile <Check className="w-4 h-4 ml-2" /></Button>
          )}
        </div>
      </footer>
    </div>
  );
};