import React, { useState } from 'react';
import { 
  User, 
  Linkedin, 
  Globe, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  X, 
  Sparkles, 
  Save, 
  ChevronRight,
  UploadCloud,
  Bot,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---

interface Experience {
  id: string;
  role: string;
  company: string;
  years: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

interface FounderProfile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  linkedin: string;
  website: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
}

const INITIAL_PROFILE: FounderProfile = {
  name: "Alex Johnson",
  title: "Founder & CEO",
  bio: "Product-focused founder with a background in engineering and design. Passionate about building tools that empower creators.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  linkedin: "linkedin.com/in/alexjohnson",
  website: "alex.io",
  skills: ["Product Strategy", "React", "SaaS", "Go-to-Market"],
  experience: [
    { id: '1', role: 'Founder', company: 'SkyOffice', years: '2023 - Present' },
    { id: '2', role: 'Product Manager', company: 'TechCorp', years: '2020 - 2023' }
  ],
  education: [
    { id: '1', school: 'Stanford University', degree: 'BS Computer Science', year: '2019' }
  ]
};

export const FounderProfileEditor = ({ onSave, onCancel }: { onSave?: () => void, onCancel?: () => void }) => {
  const [profile, setProfile] = useState<FounderProfile>(INITIAL_PROFILE);
  const [newSkill, setNewSkill] = useState("");
  const [isAiOpen, setIsAiOpen] = useState(true);
  const [isRewriting, setIsRewriting] = useState(false);
  const [suggestedBio, setSuggestedBio] = useState<string | null>(null);

  // --- Handlers ---

  const updateField = (key: keyof FounderProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      if (!profile.skills.includes(newSkill.trim())) {
        updateField('skills', [...profile.skills, newSkill.trim()]);
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    updateField('skills', profile.skills.filter(s => s !== skill));
  };

  const handleAiRewrite = () => {
    setIsRewriting(true);
    setIsAiOpen(true);
    
    setTimeout(() => {
      setIsRewriting(false);
      setSuggestedBio("Visionary product leader and serial entrepreneur with a proven track record in scaling SaaS platforms. Leveraging a dual background in engineering and design to build intuitive, high-growth tools for the creator economy. Currently leading SkyOffice to redefine remote collaboration.");
      toast.success("Bio suggestion generated!");
    }, 2000);
  };

  const applyBioSuggestion = () => {
    if (suggestedBio) {
      updateField('bio', suggestedBio);
      setSuggestedBio(null);
      toast.success("Bio updated successfully");
    }
  };

  // --- Render ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row overflow-hidden h-screen">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shrink-0">
          <div>
             <h1 className="text-xl font-bold text-slate-900">Edit Profile</h1>
             <p className="text-sm text-slate-500">Manage your founder identity</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={onSave}>
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </header>

        {/* Scrollable Form */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          <div className="max-w-3xl mx-auto space-y-8 pb-24">
            
            {/* Identity Section */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative group cursor-pointer">
                   <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-400 text-2xl">
                         <User className="w-10 h-10" />
                      </AvatarFallback>
                   </Avatar>
                   <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <UploadCloud className="w-8 h-8 text-white" />
                   </div>
                   <div className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-sm border border-slate-100 text-slate-600">
                      <User className="w-4 h-4" />
                   </div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <Label>Full Name</Label>
                         <Input 
                            value={profile.name} 
                            onChange={(e) => updateField('name', e.target.value)}
                            className="bg-white"
                         />
                      </div>
                      <div className="space-y-2">
                         <Label>Role / Title</Label>
                         <Input 
                            value={profile.title} 
                            onChange={(e) => updateField('title', e.target.value)}
                            className="bg-white"
                         />
                      </div>
                   </div>
                   
                   <div className="space-y-2">
                      <div className="flex justify-between items-center">
                         <Label>Bio</Label>
                         <button 
                           onClick={handleAiRewrite}
                           className="text-xs font-medium text-indigo-600 flex items-center gap-1 hover:bg-indigo-50 px-2 py-1 rounded-md transition-colors"
                         >
                            <Sparkles className="w-3 h-3" /> AI Rewrite
                         </button>
                      </div>
                      <Textarea 
                         value={profile.bio} 
                         onChange={(e) => updateField('bio', e.target.value)}
                         className="min-h-[120px] bg-white resize-none"
                         placeholder="Tell your story..."
                      />
                   </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Socials */}
            <section className="space-y-4">
               <h3 className="text-lg font-bold text-slate-900">Social Links</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                     <Linkedin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                     <Input 
                        value={profile.linkedin} 
                        onChange={(e) => updateField('linkedin', e.target.value)}
                        className="pl-9 bg-white"
                        placeholder="LinkedIn URL"
                     />
                  </div>
                  <div className="relative">
                     <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                     <Input 
                        value={profile.website} 
                        onChange={(e) => updateField('website', e.target.value)}
                        className="pl-9 bg-white"
                        placeholder="Personal Website"
                     />
                  </div>
               </div>
            </section>

            {/* Skills */}
            <section className="space-y-4">
               <h3 className="text-lg font-bold text-slate-900">Skills</h3>
               <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-4">
                  <Input 
                     placeholder="Add a skill and press Enter..." 
                     value={newSkill}
                     onChange={(e) => setNewSkill(e.target.value)}
                     onKeyDown={addSkill}
                     className="border-none shadow-none focus-visible:ring-0 p-0 text-base"
                  />
                  <div className="flex flex-wrap gap-2">
                     {profile.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5">
                           {skill}
                           <X className="w-3 h-3 ml-2 cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => removeSkill(skill)} />
                        </Badge>
                     ))}
                  </div>
               </div>
            </section>

            {/* Experience */}
            <section className="space-y-4">
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Experience</h3>
                  <Button size="sm" variant="outline" className="text-xs"><Plus className="w-3 h-3 mr-2" /> Add Role</Button>
               </div>
               <div className="space-y-3">
                  {profile.experience.map((exp) => (
                     <div key={exp.id} className="group flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                              <Briefcase className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-900">{exp.role}</div>
                              <div className="text-sm text-slate-500">{exp.company} • {exp.years}</div>
                           </div>
                        </div>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500">
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  ))}
               </div>
            </section>

            {/* Education */}
            <section className="space-y-4">
               <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900">Education</h3>
                  <Button size="sm" variant="outline" className="text-xs"><Plus className="w-3 h-3 mr-2" /> Add School</Button>
               </div>
               <div className="space-y-3">
                  {profile.education.map((edu) => (
                     <div key={edu.id} className="group flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-200 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
                              <GraduationCap className="w-5 h-5" />
                           </div>
                           <div>
                              <div className="font-bold text-slate-900">{edu.school}</div>
                              <div className="text-sm text-slate-500">{edu.degree}, {edu.year}</div>
                           </div>
                        </div>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500">
                           <Trash2 className="w-4 h-4" />
                        </Button>
                     </div>
                  ))}
               </div>
            </section>

          </div>
        </div>
      </div>

      {/* Right: AI Assistant Panel */}
      <AnimatePresence>
        {isAiOpen && (
          <motion.div 
             initial={{ width: 0, opacity: 0 }}
             animate={{ width: 320, opacity: 1 }}
             exit={{ width: 0, opacity: 0 }}
             className="bg-white border-l border-slate-200 hidden md:flex flex-col h-full shadow-xl shadow-slate-200/50 z-20 relative"
          >
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                   <Bot className="w-4 h-4 text-indigo-600" /> Profile Coach
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsAiOpen(false)}>
                   <X className="w-4 h-4" />
                </Button>
             </div>
             
             <div className="p-4 flex-1 overflow-y-auto space-y-6">
                
                {/* Suggestion Box */}
                {suggestedBio && (
                   <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100 space-y-3 animate-in slide-in-from-right-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-indigo-800 uppercase">
                         <Sparkles className="w-3 h-3" /> Suggested Bio
                      </div>
                      <p className="text-sm text-indigo-900 leading-relaxed">
                         {suggestedBio}
                      </p>
                      <div className="flex gap-2">
                         <Button size="sm" className="w-full bg-indigo-600 text-white h-8 text-xs" onClick={applyBioSuggestion}>Apply</Button>
                         <Button size="sm" variant="ghost" className="w-full h-8 text-xs text-indigo-600 hover:bg-indigo-100" onClick={() => setSuggestedBio(null)}>Dismiss</Button>
                      </div>
                   </div>
                )}

                {/* General Suggestions */}
                <div>
                   <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Optimization Tips</h4>
                   <div className="space-y-3">
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                         <div className="text-sm text-slate-600">Add a profile picture to increase trust by 40%.</div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                         <div className="text-sm text-slate-600">Link your Twitter to show thought leadership.</div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <CheckCircle2 className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                         <div className="text-sm text-slate-600">List at least 3 core skills relevant to your industry.</div>
                      </div>
                   </div>
                </div>

                {isRewriting && (
                   <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" /> Generating...
                   </div>
                )}
             </div>
             
             <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="text-xs text-center text-slate-400">
                   Powered by Gemini 3
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Toggle for AI Panel (if closed) */}
      {!isAiOpen && (
         <div className="absolute top-20 right-0 z-30 hidden md:block">
            <Button 
               variant="outline" 
               className="rounded-l-full border-r-0 shadow-md pr-4 pl-3 bg-white"
               onClick={() => setIsAiOpen(true)}
            >
               <Bot className="w-4 h-4 text-indigo-600" />
            </Button>
         </div>
      )}

    </div>
  );
};
