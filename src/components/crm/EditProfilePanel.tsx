import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Save, 
  Sparkles, 
  UploadCloud, 
  Image as ImageIcon, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  FileText, 
  PlayCircle, 
  Plus, 
  Trash2, 
  TrendingUp, 
  DollarSign,
  Building2,
  Users,
  MapPin,
  Target,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Briefcase,
  Loader2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../ui/utils";
import { toast } from "sonner@2.0.3";

// --- Mock Data ---

const MOCK_DATA = {
  name: "SkyOffice",
  tagline: "Virtual HQ for async & remote-first teams",
  description: "SkyOffice is a virtual headquarters that unifies communication, standups, and task workflows for distributed teams. We help companies maintain culture and velocity without the meeting fatigue.",
  industry: "SaaS",
  stage: "Seed",
  founded: "2023",
  hq: "San Francisco, CA",
  website: "https://skyoffice.com",
  mission: "To make remote work feel as connected and spontaneous as working in person.",
  valueProp: "Regain 20% of your week lost to meetings.",
  differentiator: "Async-first architecture vs Real-time fatigue.",
  founders: [
    { name: "Alex Johnson", role: "CEO", bio: "ex-Stripe PM, 2x Founder", linkedin: "linkedin.com/in/alex" },
    { name: "Maria Chen", role: "CTO", bio: "ex-Notion Eng Lead", linkedin: "linkedin.com/in/maria" }
  ],
  metrics: { mrr: "$35,000", users: "850", growth: "15%", waitlist: "2,400" },
  isRaising: true,
  raiseAmount: "1,500,000",
  useOfFunds: ["Engineering", "Sales"],
  socials: { twitter: "@skyoffice", linkedin: "company/skyoffice", github: "skyoffice-os", deck: "docsend.com/..." },
  logo: "https://api.dicebear.com/7.x/shapes/svg?seed=SkyOffice&backgroundColor=6366f1"
};

interface EditProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfilePanel: React.FC<EditProfilePanelProps> = ({ isOpen, onClose }) => {
  const [data, setData] = useState(MOCK_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [activeAiAction, setActiveAiAction] = useState<string | null>(null);

  const handleAiAction = (action: string) => {
    setActiveAiAction(action);
    toast.info(`AI is working on: ${action}...`);
    setTimeout(() => {
      setActiveAiAction(null);
      toast.success("Generated successfully!");
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile updated successfully");
      onClose();
    }, 1000);
  };

  // --- Components ---

  const SectionHeader = ({ title, icon: Icon }: { title: string; icon?: React.ElementType }) => (
    <div className="flex items-center gap-2 mb-4 text-slate-900 font-semibold text-sm uppercase tracking-wide">
      {Icon && <Icon className="w-4 h-4 text-indigo-600" />}
      {title}
    </div>
  );

  const AiButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-1.5 text-[10px] font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md transition-colors border border-indigo-100"
    >
      {activeAiAction === label ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
      {label}
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40"
          />

          {/* Sliding Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#F7F8FA] z-50 shadow-2xl flex flex-col border-l border-slate-200"
          >
            
            {/* 🔷 Sticky Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8 border border-slate-100">
                  <AvatarImage src={data.logo} />
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-none">{data.name}</h2>
                  <Badge variant="secondary" className="mt-1 text-[10px] px-1.5 py-0 h-4 font-normal bg-slate-100 text-slate-500">
                    Editing Profile
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full hover:bg-slate-100 text-slate-500">
                <X className="w-4 h-4" />
              </Button>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
              
              {/* SECTION 1 — Company Basics */}
              <section>
                <SectionHeader title="Company Basics" icon={Building2} />
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                  {/* Cover Image */}
                  <div className="h-32 bg-slate-100 relative group cursor-pointer border-b border-slate-100 hover:bg-slate-200 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 gap-2">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-xs font-medium">Upload Cover Banner</span>
                    </div>
                  </div>

                  <CardContent className="p-5 space-y-5">
                    <div className="flex gap-4">
                       <div className="shrink-0">
                          <div className="w-20 h-20 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-indigo-300 hover:text-indigo-600 -mt-10 bg-white shadow-sm">
                             <UploadCloud className="w-5 h-5 mb-1" />
                             <span className="text-[10px]">Logo</span>
                          </div>
                       </div>
                       <div className="flex-grow space-y-3 pt-1">
                          <div className="space-y-1.5">
                             <Label className="text-xs text-slate-500">Startup Name</Label>
                             <Input value={data.name} onChange={(e) => setData({...data, name: e.target.value})} className="bg-white h-9" />
                          </div>
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <div className="flex justify-between items-center">
                          <Label className="text-xs text-slate-500">Tagline</Label>
                          <AiButton label="Improve tagline" onClick={() => handleAiAction("Improve tagline")} />
                       </div>
                       <Input value={data.tagline} onChange={(e) => setData({...data, tagline: e.target.value})} className="bg-white h-9" />
                    </div>

                    <div className="space-y-1.5">
                       <div className="flex justify-between items-center">
                          <Label className="text-xs text-slate-500">Description</Label>
                          <AiButton label="Rewrite description" onClick={() => handleAiAction("Rewrite description")} />
                       </div>
                       <Textarea 
                          value={data.description} 
                          onChange={(e) => setData({...data, description: e.target.value})} 
                          className="bg-white min-h-[100px] text-sm leading-relaxed resize-none" 
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500">Industry</Label>
                          <Select value={data.industry} onValueChange={(v) => setData({...data, industry: v})}>
                             <SelectTrigger className="h-9 bg-white"><SelectValue /></SelectTrigger>
                             <SelectContent><SelectItem value="SaaS">SaaS</SelectItem><SelectItem value="Fintech">Fintech</SelectItem></SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500">Stage</Label>
                          <Select value={data.stage} onValueChange={(v) => setData({...data, stage: v})}>
                             <SelectTrigger className="h-9 bg-white"><SelectValue /></SelectTrigger>
                             <SelectContent><SelectItem value="Seed">Seed</SelectItem><SelectItem value="Series A">Series A</SelectItem></SelectContent>
                          </Select>
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500">Founded</Label>
                          <Input value={data.founded} onChange={(e) => setData({...data, founded: e.target.value})} className="h-9 bg-white" />
                       </div>
                       <div className="space-y-1.5">
                          <Label className="text-xs text-slate-500">Headquarters</Label>
                          <Input value={data.hq} onChange={(e) => setData({...data, hq: e.target.value})} className="h-9 bg-white" />
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* SECTION 2 — Brand & Identity */}
              <section>
                <SectionHeader title="Brand & Identity" icon={Target} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 space-y-4">
                      <div className="space-y-1.5">
                         <div className="flex justify-between items-center">
                            <Label className="text-xs text-slate-500">Mission Statement</Label>
                            <AiButton label="Generate mission" onClick={() => handleAiAction("Generate mission")} />
                         </div>
                         <Textarea value={data.mission} onChange={(e) => setData({...data, mission: e.target.value})} className="bg-white min-h-[80px] text-sm" />
                      </div>
                      <div className="space-y-1.5">
                         <div className="flex justify-between items-center">
                            <Label className="text-xs text-slate-500">Value Proposition</Label>
                            <AiButton label="Strengthen value" onClick={() => handleAiAction("Strengthen value")} />
                         </div>
                         <Input value={data.valueProp} onChange={(e) => setData({...data, valueProp: e.target.value})} className="bg-white h-9" />
                      </div>
                      <div className="space-y-1.5">
                         <Label className="text-xs text-slate-500">Differentiator</Label>
                         <Input value={data.differentiator} onChange={(e) => setData({...data, differentiator: e.target.value})} className="bg-white h-9" />
                      </div>
                   </CardContent>
                </Card>
              </section>

              {/* SECTION 3 — Founders & Team */}
              <section>
                <SectionHeader title="Founders & Team" icon={Users} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 space-y-4">
                      <div className="space-y-3">
                         {data.founders.map((founder, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                               <Avatar className="w-10 h-10 border border-white shadow-sm">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${founder.name}`} />
                               </Avatar>
                               <div className="flex-grow min-w-0">
                                  <div className="flex justify-between items-start">
                                     <div>
                                        <div className="text-sm font-bold text-slate-900">{founder.name}</div>
                                        <div className="text-xs text-slate-500">{founder.role}</div>
                                     </div>
                                     <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-6 w-6"><MoreHorizontal className="w-3 h-3" /></Button>
                                        <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
                                     </div>
                                  </div>
                                  <div className="mt-2 flex gap-2">
                                    <Input defaultValue={founder.bio} className="h-7 text-xs bg-white" />
                                    <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0 text-indigo-600 bg-indigo-50" title="AI Rewrite Bio"><Sparkles className="w-3 h-3" /></Button>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full border-dashed text-slate-500 hover:text-slate-700">
                         <Plus className="w-4 h-4 mr-2" /> Add Founder
                      </Button>
                   </CardContent>
                </Card>
              </section>

              {/* SECTION 4 — Traction Metrics */}
              <section>
                <SectionHeader title="Traction Metrics" icon={TrendingUp} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">MRR</Label>
                            <Input value={data.metrics.mrr} onChange={(e) => setData({...data, metrics: {...data.metrics, mrr: e.target.value}})} className="bg-white h-9 font-mono" />
                         </div>
                         <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">Users</Label>
                            <Input value={data.metrics.users} onChange={(e) => setData({...data, metrics: {...data.metrics, users: e.target.value}})} className="bg-white h-9 font-mono" />
                         </div>
                         <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">Growth %</Label>
                            <Input value={data.metrics.growth} onChange={(e) => setData({...data, metrics: {...data.metrics, growth: e.target.value}})} className="bg-white h-9 font-mono" />
                         </div>
                         <div className="space-y-1.5">
                            <Label className="text-xs text-slate-500">Waitlist</Label>
                            <Input value={data.metrics.waitlist} onChange={(e) => setData({...data, metrics: {...data.metrics, waitlist: e.target.value}})} className="bg-white h-9 font-mono" />
                         </div>
                      </div>
                      
                      <div className="pt-2">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-medium text-slate-400">Growth Trend</span>
                            <AiButton label="Analyze traction" onClick={() => handleAiAction("Analyze traction")} />
                         </div>
                         <div className="h-12 flex items-end gap-1">
                            {[20, 35, 45, 50, 65, 75, 80, 95, 100].map((h, i) => (
                               <div key={i} className="flex-1 bg-indigo-100 hover:bg-indigo-500 transition-colors rounded-sm" style={{ height: `${h}%` }} />
                            ))}
                         </div>
                         <p className="text-[10px] text-slate-400 mt-2 text-right italic">Growth updated monthly</p>
                      </div>
                   </CardContent>
                </Card>
              </section>

              {/* SECTION 5 — Funding */}
              <section>
                <SectionHeader title="Funding" icon={DollarSign} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 space-y-5">
                      <div className="flex items-center justify-between">
                         <div>
                            <Label className="text-sm font-bold text-slate-900">Currently raising?</Label>
                            <p className="text-xs text-slate-500">Signal interest to investors</p>
                         </div>
                         <Switch checked={data.isRaising} onCheckedChange={(v) => setData({...data, isRaising: v})} />
                      </div>
                      
                      {data.isRaising && (
                         <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-1.5">
                               <Label className="text-xs text-slate-500">Target Raise Amount</Label>
                               <div className="relative">
                                  <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                                  <Input value={data.raiseAmount} onChange={(e) => setData({...data, raiseAmount: e.target.value})} className="pl-9 bg-white h-9 font-bold text-slate-900" />
                               </div>
                            </div>
                            <div className="space-y-1.5">
                               <div className="flex justify-between items-center">
                                  <Label className="text-xs text-slate-500">Use of Funds</Label>
                                  <AiButton label="Suggest strategy" onClick={() => handleAiAction("Suggest strategy")} />
                               </div>
                               <div className="flex flex-wrap gap-2">
                                  {data.useOfFunds.map(tag => (
                                     <Badge key={tag} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                                        {tag} <X className="w-3 h-3 ml-1 cursor-pointer" />
                                     </Badge>
                                  ))}
                                  <Badge variant="outline" className="border-dashed text-slate-400 hover:text-slate-600 cursor-pointer">+ Add</Badge>
                               </div>
                            </div>
                         </div>
                      )}
                   </CardContent>
                </Card>
              </section>

              {/* SECTION 6 — Social Links */}
              <section>
                <SectionHeader title="Social Links" icon={Globe} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 grid grid-cols-1 gap-3">
                      <div className="relative"><Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 h-9 bg-white" placeholder="Website" value={data.website} onChange={(e) => setData({...data, website: e.target.value})} /></div>
                      <div className="relative"><Linkedin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 h-9 bg-white" placeholder="LinkedIn" value={data.socials.linkedin} onChange={(e) => setData({...data, socials: {...data.socials, linkedin: e.target.value}})} /></div>
                      <div className="relative"><Twitter className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 h-9 bg-white" placeholder="X / Twitter" value={data.socials.twitter} onChange={(e) => setData({...data, socials: {...data.socials, twitter: e.target.value}})} /></div>
                      <div className="relative"><Github className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 h-9 bg-white" placeholder="GitHub" value={data.socials.github} onChange={(e) => setData({...data, socials: {...data.socials, github: e.target.value}})} /></div>
                      <div className="relative"><FileText className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" /><Input className="pl-9 h-9 bg-white" placeholder="Pitch Deck Link" value={data.socials.deck} onChange={(e) => setData({...data, socials: {...data.socials, deck: e.target.value}})} /></div>
                   </CardContent>
                </Card>
              </section>

              {/* SECTION 7 — Media */}
              <section>
                <SectionHeader title="Media" icon={PlayCircle} />
                <Card className="border-slate-200 shadow-sm">
                   <CardContent className="p-5 space-y-4">
                      <div className="grid grid-cols-3 gap-3">
                         <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                         </div>
                         <div className="aspect-video bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                         </div>
                         <div className="aspect-video border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-300 cursor-pointer transition-colors">
                            <Plus className="w-6 h-6 mb-1" />
                            <span className="text-[10px]">Add</span>
                         </div>
                      </div>
                      
                      <div className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-100 text-red-500">
                               <FileText className="w-5 h-5" />
                            </div>
                            <div>
                               <div className="text-xs font-bold text-slate-900">Seed_Deck_v3.pdf</div>
                               <div className="text-[10px] text-slate-500">2.4 MB • Uploaded yesterday</div>
                            </div>
                         </div>
                         <Button size="icon" variant="ghost" className="h-8 w-8"><Trash2 className="w-4 h-4 text-slate-400" /></Button>
                      </div>
                   </CardContent>
                </Card>
              </section>
              
              <div className="h-16" /> {/* Spacer for bottom bar */}
            </div>

            {/* Sticky Footer */}
            <footer className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-10 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2 text-xs text-slate-400">
                  {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3 h-3 text-green-500" />}
                  {isSaving ? "Saving..." : "Saved • 2s ago"}
               </div>
               <div className="flex gap-3">
                  <Button variant="ghost" onClick={onClose} className="text-slate-500 hover:text-slate-900">
                     Discard
                  </Button>
                  <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 min-w-[120px]">
                     Save & Close
                  </Button>
               </div>
            </footer>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
