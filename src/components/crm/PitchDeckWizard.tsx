import React, { useState } from 'react';
import { 
  ChevronRight, 
  Globe, 
  Check, 
  Sparkles, 
  Layout, 
  Type, 
  Users, 
  TrendingUp, 
  Target, 
  Briefcase, 
  FileText,
  Edit2,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";

// Types
type Step = 'context' | 'aesthetic' | 'details' | 'summary';
type Theme = 'classic' | 'enterprise' | 'minimal' | 'dark' | 'vibrant' | 'creative';

interface WizardData {
  description: string;
  website: string;
  theme: Theme;
  businessTypes: string[];
  stage: string;
  focus: string[];
  teamSize: string;
  traction: string;
}

const INITIAL_DATA: WizardData = {
  description: '',
  website: '',
  theme: 'minimal',
  businessTypes: [],
  stage: '',
  focus: [],
  teamSize: '',
  traction: ''
};

export const PitchDeckWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('context');
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isAiEnabled, setIsAiEnabled] = useState(true);

  const steps: { id: Step; label: string }[] = [
    { id: 'context', label: 'Context' },
    { id: 'aesthetic', label: 'Aesthetic' },
    { id: 'details', label: 'Details' },
    { id: 'summary', label: 'Final Summary' }
  ];

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const updateData = (key: keyof WizardData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleSelection = (key: keyof WizardData, value: string, multi: boolean = false) => {
    if (multi) {
      const current = data[key] as string[];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      updateData(key, updated);
    } else {
      updateData(key, value);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F7FB] overflow-hidden font-sans text-slate-800">
      
      {/* 1. PAGE HEADER */}
      <header className="bg-white border-b border-slate-200 px-8 py-6 flex-shrink-0 z-20">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          
          {/* Navigation & Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Pitch Deck Wizard</h1>
              <p className="text-slate-500 text-sm mt-1">Let's build a compelling story for your investors.</p>
            </div>
            
            <div className="bg-slate-100 p-1 rounded-lg inline-flex">
              <button className="px-4 py-1.5 bg-white shadow-sm text-slate-800 rounded-md text-sm font-medium transition-all">Investor Pitch</button>
              <button className="px-4 py-1.5 text-slate-500 hover:text-slate-700 rounded-md text-sm font-medium transition-all">Sales Deck</button>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2">
            {steps.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isCompleted = steps.findIndex(s => s.id === currentStep) > idx;
              
              return (
                <React.Fragment key={step.id}>
                  <div 
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all",
                      isActive ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200" : isCompleted ? "text-indigo-600" : "text-slate-400"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px]",
                      isActive ? "bg-indigo-600 text-white" : isCompleted ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"
                    )}>
                      {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    {step.label}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={cn("w-8 h-0.5", isCompleted ? "bg-indigo-200" : "bg-slate-200")} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-5xl mx-auto w-full pb-20">
          
          {/* STEP 1: BUSINESS CONTEXT */}
          {currentStep === 'context' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Main Input */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Describe your business</h3>
                      <p className="text-slate-500 text-sm">I'll use this to structure your narrative, financials, and market slides.</p>
                    </div>
                  </div>
                  <Textarea 
                    placeholder="e.g. We are building an AI-powered CRM for freelance designers that automates invoicing and lead generation..."
                    className="min-h-[240px] text-base p-4 border-slate-200 focus:border-indigo-500 resize-none rounded-xl"
                    value={data.description}
                    onChange={(e) => updateData('description', e.target.value)}
                  />
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-slate-400">{data.description.length} characters</span>
                  </div>
                </div>

                {/* Website Input */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">Have a website?</h3>
                    <p className="text-slate-500 text-xs mb-3">URL helps the AI extract features, pricing, and positioning.</p>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://example.com" 
                        className="h-10 border-slate-200"
                        value={data.website}
                        onChange={(e) => updateData('website', e.target.value)}
                      />
                      <Button variant="outline" className="text-slate-600">Add</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Sidebar */}
              <div className="space-y-4">
                 <div className="bg-indigo-50/50 border border-indigo-100 p-6 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 text-indigo-700">
                       <Sparkles className="w-4 h-4" />
                       <span className="font-bold text-sm">AI Assistant</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                       As you type, I'm analyzing your text to identify:
                    </p>
                    <ul className="space-y-2">
                       {['Problem Statement', 'Target Audience', 'Core Solution'].map((item, i) => (
                         <li key={i} className="flex items-center gap-2 text-xs font-medium text-indigo-900 bg-white/60 p-2 rounded-lg">
                            <Check className="w-3 h-3 text-indigo-500" /> {item}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
            </div>
          )}

          {/* STEP 2: AESTHETIC SELECTION */}
          {currentStep === 'aesthetic' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center max-w-2xl mx-auto mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose your visual style</h2>
                  <p className="text-slate-500">Select a theme that matches your brand personality.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { id: 'classic', name: 'Classic Clean', bg: 'bg-slate-50', font: 'font-serif' },
                    { id: 'enterprise', name: 'Enterprise Pro', bg: 'bg-blue-50', font: 'font-sans' },
                    { id: 'minimal', name: 'Modern Minimal', bg: 'bg-white', font: 'font-mono' },
                    { id: 'dark', name: 'Dark Mode', bg: 'bg-slate-900 text-white', font: 'font-sans' },
                    { id: 'vibrant', name: 'Vibrant Bold', bg: 'bg-orange-50', font: 'font-sans' },
                    { id: 'creative', name: 'Creative', bg: 'bg-purple-50', font: 'font-serif' },
                  ].map((theme) => (
                    <div 
                      key={theme.id}
                      onClick={() => updateData('theme', theme.id)}
                      className={cn(
                        "relative h-48 rounded-2xl border-2 cursor-pointer transition-all group overflow-hidden p-6 flex flex-col justify-end",
                        data.theme === theme.id ? "border-indigo-600 shadow-lg ring-4 ring-indigo-50" : "border-transparent hover:border-slate-200 shadow-sm",
                        theme.bg
                      )}
                    >
                       <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                             <Check className="w-3 h-3" />
                          </div>
                       </div>
                       <h3 className={cn("text-2xl font-bold mb-1", theme.id === 'dark' ? 'text-white' : 'text-slate-900', theme.font)}>Abc</h3>
                       <p className={cn("text-sm font-medium", theme.id === 'dark' ? 'text-slate-400' : 'text-slate-500')}>{theme.name}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* STEP 3: BUSINESS DETAILS */}
          {currentStep === 'details' && (
             <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-8">
                   
                   {/* Business Type */}
                   <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Briefcase className="w-4 h-4 text-indigo-500" /> Business Type
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {['SaaS', 'Marketplace', 'Fintech', 'Consumer App', 'Hardware', 'DTC', 'Agency', 'Creator Economy'].map(type => (
                           <button
                             key={type}
                             onClick={() => toggleSelection('businessTypes', type, true)}
                             className={cn(
                               "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                               data.businessTypes.includes(type) 
                                 ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                             )}
                           >
                              {type}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="h-px bg-slate-100 w-full" />

                   {/* Stage */}
                   <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <TrendingUp className="w-4 h-4 text-emerald-500" /> Current Stage
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                         {['Idea Phase', 'MVP / Beta', 'Pre-Seed', 'Seed Stage', 'Series A', 'Growth'].map(stage => (
                           <button
                             key={stage}
                             onClick={() => updateData('stage', stage)}
                             className={cn(
                               "px-4 py-2.5 rounded-xl text-sm font-medium transition-all border text-left",
                               data.stage === stage 
                                 ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm" 
                                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                             )}
                           >
                              {stage}
                           </button>
                         ))}
                      </div>
                   </div>

                   <div className="h-px bg-slate-100 w-full" />

                   {/* Team Size */}
                   <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                         <Users className="w-4 h-4 text-orange-500" /> Team Size
                      </h3>
                      <div className="flex gap-3">
                         {['Solo Founder', '2-5 People', '6-15 People', '16+ People'].map(size => (
                           <button
                             key={size}
                             onClick={() => updateData('teamSize', size)}
                             className={cn(
                               "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                               data.teamSize === size 
                                 ? "bg-orange-50 text-orange-700 border-orange-200" 
                                 : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                             )}
                           >
                              {size}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          )}

          {/* STEP 4: FINAL SUMMARY */}
          {currentStep === 'summary' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Left: Main Summary Card */}
              <div className="lg:col-span-2">
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                       <h2 className="font-bold text-lg text-slate-800">Review Project Details</h2>
                       <Button variant="ghost" size="sm" onClick={() => setCurrentStep('context')} className="text-slate-500 gap-2">
                          <Edit2 className="w-3 h-3" /> Edit
                       </Button>
                    </div>
                    
                    <div className="p-8 space-y-8">
                       
                       {/* Context Section */}
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Description</div>
                             <p className="text-slate-700 text-sm leading-relaxed">
                                {data.description || "No description provided."}
                             </p>
                          </div>
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Website</div>
                             <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                                <Globe className="w-3 h-3" /> {data.website || "Pending"}
                             </div>
                          </div>
                       </div>

                       <div className="h-px bg-slate-100 w-full" />

                       {/* Details Grid */}
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Type</div>
                             <div className="flex flex-wrap gap-1">
                                {data.businessTypes.length > 0 ? data.businessTypes.map(t => (
                                   <Badge key={t} variant="secondary" className="text-xs bg-slate-100 text-slate-600 font-normal">{t}</Badge>
                                )) : <span className="text-slate-400 text-sm">-</span>}
                             </div>
                          </div>
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stage</div>
                             <p className="text-slate-700 text-sm font-medium">{data.stage || "-"}</p>
                          </div>
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Team</div>
                             <p className="text-slate-700 text-sm font-medium">{data.teamSize || "-"}</p>
                          </div>
                          <div>
                             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Aesthetic</div>
                             <p className="text-slate-700 text-sm font-medium capitalize">{data.theme}</p>
                          </div>
                       </div>

                       <div className="h-px bg-slate-100 w-full" />

                       {/* Assets / Additional */}
                       <div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Additional Assets</div>
                          <div className="flex gap-3">
                             <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center text-slate-300">
                                <Layout className="w-6 h-6" />
                             </div>
                             <div className="flex-col flex justify-center">
                                <span className="text-sm text-slate-600 font-medium">Logo_Final.svg</span>
                                <span className="text-xs text-slate-400">24 KB</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right: Review Panel */}
              <div className="space-y-6">
                 <div className="bg-white rounded-2xl shadow-lg shadow-indigo-900/5 border border-indigo-100 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Ready to Generate</h3>
                    
                    <div className="space-y-3 mb-6">
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Deck Type</span>
                          <span className="font-medium text-slate-900">Investor Pitch</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Estimated Slides</span>
                          <span className="font-medium text-slate-900">10-12 Slides</span>
                       </div>
                       <div className="flex justify-between text-sm">
                          <span className="text-slate-500">AI Model</span>
                          <span className="font-medium text-indigo-600">Gemini 1.5 Pro</span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-6">
                       <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-slate-700">Deep Reasoning</span>
                       </div>
                       <div 
                         className={cn("w-10 h-6 rounded-full relative transition-colors cursor-pointer", isAiEnabled ? "bg-indigo-600" : "bg-slate-300")}
                         onClick={() => setIsAiEnabled(!isAiEnabled)}
                       >
                          <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all", isAiEnabled ? "left-5" : "left-1")} />
                       </div>
                    </div>

                    <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-900/20 text-base font-medium rounded-xl">
                       Generate Deck <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <p className="text-xs text-center text-slate-400 mt-3">
                       Generates editable slides in ~30 seconds
                    </p>
                 </div>

                 <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex gap-3">
                       <div className="w-8 h-8 rounded-lg bg-white text-blue-600 flex items-center justify-center shadow-sm flex-shrink-0">
                          <Sparkles className="w-4 h-4" />
                       </div>
                       <div>
                          <h4 className="font-bold text-blue-900 text-sm mb-1">AI Insight</h4>
                          <p className="text-xs text-blue-800/80 leading-relaxed">
                             Your description emphasizes "Community" which aligns well with the "Vibrant Bold" theme. Great choice!
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-slate-200 p-6 flex-shrink-0 z-20">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <Button 
             variant="ghost" 
             onClick={handleBack}
             disabled={currentStep === 'context'}
             className={cn("text-slate-500", currentStep === 'context' && "invisible")}
          >
             Back
          </Button>
          
          {currentStep !== 'summary' && (
             <Button onClick={handleNext} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 h-12">
                Continue <ChevronRight className="w-4 h-4 ml-2" />
             </Button>
          )}
        </div>
      </footer>

    </div>
  );
};
