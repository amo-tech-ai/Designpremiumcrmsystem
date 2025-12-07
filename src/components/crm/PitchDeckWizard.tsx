import React, { useState, useEffect } from 'react';
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
  Loader2,
  Link as LinkIcon,
  User,
  DollarSign,
  Plus,
  ChevronLeft,
  Wand2,
  Image as ImageIcon,
  Github,
  Linkedin,
  Twitter,
  UploadCloud,
  X,
  PieChart,
  BarChart3,
  AlertCircle
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
import { Progress } from "../ui/progress";
import { Switch } from "../ui/switch";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

// --- Types ---

type StepId = 'context' | 'founder' | 'fundamentals' | 'traction' | 'summary';

interface Step {
  id: StepId;
  label: string;
  icon?: React.ElementType;
}

interface WizardData {
  // Step 1
  description: string;
  website: string;
  coverImageUrl: string;
  industry: string;
  yearFounded: string;
  
  // Step 2
  founderName: string;
  founderRole: string;
  founderBio: string;
  founderAvatarUrl: string;
  founderLinkedin: string;
  founderEmail: string;
  founderWebsite: string;
  
  // Step 3
  businessModel: string;
  pricingModel: string;
  customerSegments: string[];
  competitors: string[];
  keyFeatures: string[];
  differentiator: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
    pitchDeck: string;
  };

  // Step 4
  mrr: string;
  userCount: string;
  growthRate: string;
  waitlistSize: string;
  isRaising: boolean;
  raiseAmount: string;
  useOfFunds: string[];
  
  // Meta
  extractedTags: string[];
}

const INITIAL_DATA: WizardData = {
  description: '',
  website: '',
  coverImageUrl: '',
  industry: '',
  yearFounded: '',
  founderName: '',
  founderRole: 'Founder & CEO',
  founderBio: '',
  founderAvatarUrl: '',
  founderLinkedin: '',
  founderEmail: '',
  founderWebsite: '',
  businessModel: '',
  pricingModel: '',
  customerSegments: [],
  competitors: [],
  keyFeatures: [],
  differentiator: '',
  socialLinks: { twitter: '', github: '', linkedin: '', pitchDeck: '' },
  mrr: '',
  userCount: '',
  growthRate: '',
  waitlistSize: '',
  isRaising: false,
  raiseAmount: '',
  useOfFunds: [],
  extractedTags: []
};

const STEPS: Step[] = [
  { id: 'context', label: 'Context', icon: Sparkles },
  { id: 'founder', label: 'Team', icon: Users },
  { id: 'fundamentals', label: 'Business', icon: Briefcase },
  { id: 'traction', label: 'Traction', icon: TrendingUp },
  { id: 'summary', label: 'Summary', icon: FileText },
];

const FUNDS_TAGS = ['Engineering', 'Marketing', 'Sales', 'Product', 'Operations', 'Legal', 'Infrastructure'];
const MOCK_SPARKLINE_DATA = [
  { val: 10 }, { val: 15 }, { val: 20 }, { val: 35 }, { val: 45 }, { val: 60 }, { val: 75 }, { val: 80 }, { val: 95 }, { val: 110 }
];

interface PitchDeckWizardProps {
  onNavigate?: (view: string) => void;
}

export const PitchDeckWizard: React.FC<PitchDeckWizardProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState<StepId>('context');
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState<string | null>(null);

  // --- Handlers ---

  const handleNext = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const updateData = (key: keyof WizardData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const updateSocialLink = (key: keyof WizardData['socialLinks'], value: string) => {
    setData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }));
  };

  const toggleArrayItem = (key: 'useOfFunds' | 'keyFeatures' | 'customerSegments' | 'competitors', value: string) => {
    if (!value) return;
    setData(prev => {
      const list = prev[key];
      return list.includes(value) 
        ? { ...prev, [key]: list.filter(i => i !== value) }
        : { ...prev, [key]: [...list, value] };
    });
  };

  const addArrayItem = (key: 'keyFeatures' | 'customerSegments' | 'competitors', value: string) => {
     if(!value) return;
     if(!data[key].includes(value)) {
       updateData(key, [...data[key], value]);
     }
  };

  const calculateProfileStrength = () => {
    let score = 0;
    if (data.description.length > 20) score += 10;
    if (data.website) score += 5;
    if (data.founderName) score += 10;
    if (data.founderBio) score += 10;
    if (data.industry) score += 5;
    if (data.businessModel) score += 5;
    if (data.competitors.length > 0) score += 10;
    if (data.mrr || data.userCount) score += 15;
    if (data.isRaising && data.raiseAmount) score += 10;
    if (data.differentiator) score += 10;
    if (data.keyFeatures.length > 0) score += 10;
    return Math.min(100, score);
  };

  // --- AI Simulations ---

  const handleSmartAutofill = () => {
    if (!data.website) {
       toast.error("Please enter a website URL first.");
       return;
    }
    setIsAnalyzing(true);
    setAiReasoning("Scanning website for semantic signals...");
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setAiReasoning("Context extracted successfully.");
      updateData('extractedTags', ['Problem', 'Audience', 'Solution', 'Features']);
      updateData('industry', 'SaaS');
      updateData('businessModel', 'B2B');
      toast.success("Autofill complete! Review the extracted tags.");
    }, 2000);
  };

  const handleRewriteBio = () => {
    if (!data.founderBio) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      updateData('founderBio', "Visionary leader with 10+ years in SaaS. Previously scaled [Company] to $5M ARR. Expert in product-led growth and enterprise sales.");
      toast.success("Bio rewritten for investor impact.");
    }, 1500);
  };

  // --- Step Components ---

  const Step1Context = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Main Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base font-semibold text-slate-900">Describe your startup</Label>
              <Badge variant="outline" className="text-slate-400 font-normal">
                {data.description.length} chars
              </Badge>
            </div>
            <Textarea 
              placeholder="e.g. Acme is a visual collaboration platform for remote engineering teams..."
              className="min-h-[140px] text-base leading-relaxed border-slate-200 resize-none focus-visible:ring-indigo-500"
              value={data.description}
              onChange={(e) => updateData('description', e.target.value)}
            />
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
              <Label className="text-sm font-medium text-slate-700">Website URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="https://yourstartup.com" 
                    className="pl-9 bg-white"
                    value={data.website}
                    onChange={(e) => updateData('website', e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSmartAutofill}
                  disabled={isAnalyzing}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200"
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Smart Autofill
                </Button>
              </div>

              {/* AI Extraction Panel */}
              <AnimatePresence>
                {data.extractedTags.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2 border-t border-slate-200 mt-2"
                  >
                    <div className="text-xs font-bold text-indigo-900 uppercase mb-2 flex items-center gap-2">
                      <BotIcon className="w-3 h-3" /> AI Detected Context
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.extractedTags.map(tag => (
                        <Badge key={tag} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-transparent px-3">
                          <Check className="w-3 h-3 mr-1" /> {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={data.industry} onValueChange={(v) => updateData('industry', v)}>
                <SelectTrigger className="bg-white"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="SaaS">SaaS / Software</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="Health">Healthcare</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="AI">Artificial Intelligence</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year Founded</Label>
              <Input 
                placeholder="2023" 
                className="bg-white"
                value={data.yearFounded} 
                onChange={(e) => updateData('yearFounded', e.target.value)} 
              />
            </div>
          </div>
        </div>

        {/* Right Column: Upload */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
             <Label className="text-base font-semibold text-slate-900 mb-4">Cover Image</Label>
             <div className="border-2 border-dashed border-slate-200 rounded-xl flex-grow flex flex-col items-center justify-center p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer group bg-slate-50/50">
                {data.coverImageUrl ? (
                   <div className="relative w-full h-full min-h-[160px]">
                      <img src={data.coverImageUrl} alt="Cover" className="w-full h-full object-cover rounded-lg" />
                      <Button size="icon" variant="destructive" className="absolute top-2 right-2 h-6 w-6" onClick={(e) => { e.stopPropagation(); updateData('coverImageUrl', ''); }}>
                        <X className="w-3 h-3" />
                      </Button>
                   </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">Click to upload banner</p>
                    <p className="text-xs text-slate-400 mt-1">1200 x 600 recommended</p>
                  </>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Step2Team = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-start mb-6">
           <div>
             <h3 className="text-lg font-bold text-slate-900">Founder Profile</h3>
             <p className="text-slate-500 text-sm">Investors invest in people. Make your bio shine.</p>
           </div>
           <Button variant="outline" size="sm"><Plus className="w-4 h-4 mr-2" /> Add Co-Founder</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Avatar Section */}
           <div className="lg:col-span-3 flex flex-col items-center space-y-3">
              <div className="w-32 h-32 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                 {data.founderAvatarUrl ? (
                   <img src={data.founderAvatarUrl} alt="Founder" className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-12 h-12 text-slate-300" />
                 )}
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <UploadCloud className="w-6 h-6 text-white" />
                 </div>
              </div>
              <p className="text-xs text-slate-400 font-medium">Upload Photo</p>
           </div>

           {/* Form Section */}
           <div className="lg:col-span-9 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Jane Doe" value={data.founderName} onChange={(e) => updateData('founderName', e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Founder & CEO" value={data.founderRole} onChange={(e) => updateData('founderRole', e.target.value)} />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between">
                    <Label>Short Bio</Label>
                    <span 
                      className="text-xs text-indigo-600 font-medium cursor-pointer flex items-center hover:text-indigo-700"
                      onClick={handleRewriteBio}
                    >
                      <Sparkles className="w-3 h-3 mr-1" /> AI Rewrite Bio
                    </span>
                 </div>
                 <Textarea 
                   placeholder="Briefly describe your background..." 
                   className="min-h-[100px] resize-none"
                   value={data.founderBio}
                   onChange={(e) => updateData('founderBio', e.target.value)}
                 />
              </div>

              <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2 relative">
                    <Label>LinkedIn</Label>
                    <div className="relative"><Linkedin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9" placeholder="linkedin.com/in/..." value={data.founderLinkedin} onChange={(e) => updateData('founderLinkedin', e.target.value)} /></div>
                 </div>
                 <div className="space-y-2 relative">
                    <Label>Email</Label>
                    <div className="relative"><LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9" placeholder="jane@startup.com" value={data.founderEmail} onChange={(e) => updateData('founderEmail', e.target.value)} /></div>
                 </div>
                 <div className="space-y-2 relative">
                    <Label>Website</Label>
                    <div className="relative"><Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9" placeholder="personal.com" value={data.founderWebsite} onChange={(e) => updateData('founderWebsite', e.target.value)} /></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
      
      {/* AI Helper Card */}
      <Card className="bg-indigo-50 border-indigo-100">
         <CardContent className="p-4 flex gap-4 items-start">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><BotIcon className="w-5 h-5" /></div>
            <div>
               <h4 className="text-sm font-bold text-indigo-900">Why this matters</h4>
               <p className="text-xs text-indigo-700 mt-1 leading-relaxed">Investors back founders with unique insights. Ensure your bio highlights your "Founder-Market Fit" and previous execution experience.</p>
            </div>
         </CardContent>
      </Card>
    </div>
  );

  const Step3Fundamentals = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
             <h3 className="text-lg font-bold text-slate-900">Core Model</h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label>Industry</Label>
                   <Select value={data.industry} onValueChange={(v) => updateData('industry', v)}>
                      <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                      <SelectContent><SelectItem value="SaaS">SaaS</SelectItem><SelectItem value="Fintech">Fintech</SelectItem></SelectContent>
                   </Select>
                </div>
                <div className="space-y-2">
                   <Label>Business Model</Label>
                   <Input placeholder="e.g. B2B SaaS" value={data.businessModel} onChange={(e) => updateData('businessModel', e.target.value)} />
                </div>
                <div className="space-y-2">
                   <Label>Pricing Model</Label>
                   <Input placeholder="e.g. Subscription" value={data.pricingModel} onChange={(e) => updateData('pricingModel', e.target.value)} />
                </div>
                <div className="space-y-2">
                   <Label>Differentiator</Label>
                   <Input placeholder="Why you win" value={data.differentiator} onChange={(e) => updateData('differentiator', e.target.value)} />
                </div>
             </div>
             
             <div className="space-y-2">
                <Label>Customer Segments</Label>
                <Input 
                   placeholder="Type & Enter (e.g. SMBs)" 
                   onKeyDown={(e) => {
                      if(e.key === 'Enter') {
                         addArrayItem('customerSegments', e.currentTarget.value);
                         e.currentTarget.value = '';
                      }
                   }}
                />
                <div className="flex flex-wrap gap-2">
                   {data.customerSegments.map((item, i) => (
                      <Badge key={i} variant="secondary" className="pr-1">{item} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => updateData('customerSegments', data.customerSegments.filter((_, idx) => idx !== i))} /></Badge>
                   ))}
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Market Position</h3>
                <div className="space-y-2">
                   <Label>Competitors</Label>
                   <Input 
                      placeholder="Add competitor..." 
                      onKeyDown={(e) => {
                         if(e.key === 'Enter') {
                            addArrayItem('competitors', e.currentTarget.value);
                            e.currentTarget.value = '';
                         }
                      }}
                   />
                   <div className="flex flex-wrap gap-2">
                      {data.competitors.map((item, i) => (
                         <Badge key={i} variant="outline" className="pr-1 border-slate-200">{item} <X className="w-3 h-3 ml-1 cursor-pointer text-slate-400 hover:text-red-500" onClick={() => updateData('competitors', data.competitors.filter((_, idx) => idx !== i))} /></Badge>
                      ))}
                   </div>
                </div>
                
                <div className="space-y-2">
                   <Label>Key Features</Label>
                   <Input 
                      placeholder="Add feature..." 
                      onKeyDown={(e) => {
                         if(e.key === 'Enter') {
                            addArrayItem('keyFeatures', e.currentTarget.value);
                            e.currentTarget.value = '';
                         }
                      }}
                   />
                   <div className="flex flex-wrap gap-2">
                      {data.keyFeatures.map((item, i) => (
                         <Badge key={i} className="bg-slate-100 text-slate-700 hover:bg-slate-200 pr-1">{item} <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => updateData('keyFeatures', data.keyFeatures.filter((_, idx) => idx !== i))} /></Badge>
                      ))}
                   </div>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Social Links</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="relative"><Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 text-sm" placeholder="Website" value={data.website} disabled /></div>
                   <div className="relative"><Twitter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 text-sm" placeholder="X / Twitter" value={data.socialLinks.twitter} onChange={(e) => updateSocialLink('twitter', e.target.value)} /></div>
                   <div className="relative"><Github className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 text-sm" placeholder="GitHub" value={data.socialLinks.github} onChange={(e) => updateSocialLink('github', e.target.value)} /></div>
                   <div className="relative"><Linkedin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 text-sm" placeholder="LinkedIn" value={data.socialLinks.linkedin} onChange={(e) => updateSocialLink('linkedin', e.target.value)} /></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const Step4Traction = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-bold text-slate-900">Metrics & Growth</h3>
                   <div className="flex items-center gap-2">
                     <span className="text-xs text-slate-500">Live Trend</span>
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                   </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                   <div className="space-y-2">
                      <Label>MRR</Label>
                      <div className="relative"><DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 font-mono" placeholder="0" value={data.mrr} onChange={(e) => updateData('mrr', e.target.value)} /></div>
                   </div>
                   <div className="space-y-2">
                      <Label>Users</Label>
                      <div className="relative"><Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 font-mono" placeholder="0" value={data.userCount} onChange={(e) => updateData('userCount', e.target.value)} /></div>
                   </div>
                   <div className="space-y-2">
                      <Label>Growth %</Label>
                      <div className="relative"><TrendingUp className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 font-mono" placeholder="0%" value={data.growthRate} onChange={(e) => updateData('growthRate', e.target.value)} /></div>
                   </div>
                   <div className="space-y-2">
                      <Label>Waitlist</Label>
                      <Input className="font-mono" placeholder="0" value={data.waitlistSize} onChange={(e) => updateData('waitlistSize', e.target.value)} />
                   </div>
                </div>

                <div className="h-[200px] w-full">
                   <Label className="mb-4 block">Growth Trajectory (Last 12 Months)</Label>
                   <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={MOCK_SPARKLINE_DATA}>
                         <Line type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: "#6366f1" }} />
                      </LineChart>
                   </ResponsiveContainer>
                </div>
             </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-bold text-slate-900">Fundraising</h3>
                   <Switch checked={data.isRaising} onCheckedChange={(v) => updateData('isRaising', v)} />
                </div>
                
                {data.isRaising ? (
                   <div className="space-y-6 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                         <Label>Target Raise Amount</Label>
                         <div className="relative"><DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 text-lg font-bold text-slate-900" placeholder="1,000,000" value={data.raiseAmount} onChange={(e) => updateData('raiseAmount', e.target.value)} /></div>
                      </div>
                      
                      <div className="space-y-3">
                         <Label>Use of Funds</Label>
                         <div className="flex flex-wrap gap-2">
                            {FUNDS_TAGS.map(tag => (
                               <Badge 
                                 key={tag} 
                                 variant={data.useOfFunds.includes(tag) ? "default" : "outline"}
                                 className={cn("cursor-pointer transition-all", data.useOfFunds.includes(tag) ? "bg-indigo-600 hover:bg-indigo-700" : "hover:border-indigo-300 text-slate-600")}
                                 onClick={() => toggleArrayItem('useOfFunds', tag)}
                               >
                                 {tag}
                               </Badge>
                            ))}
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="flex-grow flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center"><PieChart className="w-6 h-6" /></div>
                      <p className="text-sm">Enable fundraising to set targets and allocation.</p>
                   </div>
                )}
             </div>
          </div>
       </div>
    </div>
  );

  const Step5Summary = () => {
     const strength = calculateProfileStrength();
     
     return (
       <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             {/* Left: Summary */}
             <div className="lg:col-span-8">
                <Card className="bg-white border-slate-200 overflow-hidden">
                   <div className="h-32 bg-slate-100 bg-cover bg-center" style={{ backgroundImage: `url(${data.coverImageUrl})` }} />
                   <CardContent className="p-8 -mt-10">
                      <div className="flex justify-between items-end mb-6">
                         <div className="flex items-end gap-4">
                            <div className="w-20 h-20 bg-white rounded-xl shadow-md p-1">
                               {data.founderAvatarUrl ? <img src={data.founderAvatarUrl} className="w-full h-full rounded-lg object-cover" /> : <div className="w-full h-full bg-indigo-50 rounded-lg flex items-center justify-center"><Sparkles className="text-indigo-300" /></div>}
                            </div>
                            <div>
                               <h1 className="text-2xl font-bold text-slate-900">{data.description.split(' ').slice(0, 2).join(' ') || 'Startup Name'}</h1>
                               <p className="text-slate-500">{data.industry} • {data.yearFounded}</p>
                            </div>
                         </div>
                         <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.success("AI is improving the description...")}><Wand2 className="w-3 h-3 mr-2" /> Improve</Button>
                            <Button variant="outline" size="sm" onClick={() => toast.success("AI generated a longer version.")}><FileText className="w-3 h-3 mr-2" /> Expand</Button>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">AI Generated Summary</h4>
                            <p className="text-slate-700 leading-relaxed">
                               {data.description || "No description provided."} An innovative {data.industry} solution leveraging {data.keyFeatures[0] || "proprietary tech"} to solve key pain points for {data.customerSegments[0] || "customers"}. 
                               With a {data.businessModel} model, the company has demonstrated early traction with {data.userCount || "0"} users.
                            </p>
                         </div>

                         <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 border rounded-lg"><div className="text-sm font-bold text-slate-900">{data.businessModel || "-"}</div><div className="text-xs text-slate-500">Model</div></div>
                            <div className="p-3 border rounded-lg"><div className="text-sm font-bold text-slate-900">{data.pricingModel || "-"}</div><div className="text-xs text-slate-500">Pricing</div></div>
                            <div className="p-3 border rounded-lg"><div className="text-sm font-bold text-slate-900">{data.mrr || "-"}</div><div className="text-xs text-slate-500">MRR</div></div>
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>

             {/* Right: Score & Checklist */}
             <div className="lg:col-span-4 space-y-6">
                <Card className="border-indigo-100 bg-indigo-50/50">
                   <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                         <h3 className="font-bold text-indigo-900">Profile Strength</h3>
                         <span className="font-bold text-indigo-600">{strength}%</span>
                      </div>
                      <Progress value={strength} className="h-2 bg-indigo-100" />
                      
                      <div className="space-y-2 mt-4">
                         <h4 className="text-xs font-bold text-slate-500 uppercase">Missing Fields</h4>
                         {!data.website && <div className="flex items-center gap-2 text-sm text-red-500"><AlertCircle className="w-4 h-4" /> Add Website</div>}
                         {!data.coverImageUrl && <div className="flex items-center gap-2 text-sm text-amber-600"><AlertCircle className="w-4 h-4" /> Add Cover Image</div>}
                         {!data.founderBio && <div className="flex items-center gap-2 text-sm text-amber-600"><AlertCircle className="w-4 h-4" /> Add Founder Bio</div>}
                         {!data.isRaising && <div className="flex items-center gap-2 text-sm text-slate-500"><Check className="w-4 h-4" /> Fundraising Status (Optional)</div>}
                         {strength === 100 && <div className="flex items-center gap-2 text-sm text-green-600"><Check className="w-4 h-4" /> All sets complete!</div>}
                      </div>

                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-4" onClick={() => onNavigate && onNavigate('dashboard')}>
                         Finish & Save Profile
                      </Button>
                   </CardContent>
                </Card>
             </div>
          </div>
       </div>
     );
  };

  // --- Main Render ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 flex flex-col items-center">
       <div className="w-full max-w-5xl mx-auto mb-8">
          <div className="flex items-center gap-4 mb-8">
             <Button variant="ghost" size="icon" onClick={() => onNavigate && onNavigate('dashboard')}><ChevronLeft className="w-5 h-5" /></Button>
             <div>
                <h1 className="text-2xl font-bold text-slate-900">Startup Profile</h1>
                <p className="text-slate-500">Let's build your AI-powered data room.</p>
             </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between relative mb-12 px-4">
             <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-200 -z-10" />
             {STEPS.map((step, idx) => {
                const isCurrent = step.id === currentStep;
                const isCompleted = STEPS.findIndex(s => s.id === currentStep) > idx;
                
                return (
                   <div key={step.id} className="bg-[#F8FAFC] px-2">
                      <div 
                        className={cn(
                           "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300",
                           isCurrent ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200" :
                           isCompleted ? "bg-white border-indigo-200 text-indigo-600" :
                           "bg-white border-slate-200 text-slate-400"
                        )}
                      >
                         {isCompleted ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                         <span className="text-sm font-medium hidden md:inline">{step.label}</span>
                      </div>
                   </div>
                );
             })}
          </div>

          {/* Step Content */}
          <div className="min-h-[600px]">
             {currentStep === 'context' && <Step1Context />}
             {currentStep === 'founder' && <Step2Team />}
             {currentStep === 'fundamentals' && <Step3Fundamentals />}
             {currentStep === 'traction' && <Step4Traction />}
             {currentStep === 'summary' && <Step5Summary />}
          </div>

          {/* Footer Nav */}
          {currentStep !== 'summary' && (
             <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
                <Button variant="ghost" onClick={handleBack} disabled={currentStep === 'context'} className="text-slate-500 hover:text-slate-900">
                   Back
                </Button>
                <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8">
                   Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
             </div>
          )}
       </div>
    </div>
  );
};

// Helper for AI detected context
const BotIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12 6C9.79 6 8 7.79 8 10V14C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14V10C16 7.79 14.21 6 12 6ZM10 10C10 9.45 10.45 9 11 9C11.55 9 12 9.45 12 10V14C12 14.55 11.55 15 11 15C10.45 15 10 14.55 10 14V10ZM13 10C13 9.45 13.45 9 14 9C14.55 9 15 9.45 15 10V14C15 14.55 14.55 15 14 15C13.45 15 13 14.55 13 14V10Z" fill="currentColor"/>
  </svg>
);
