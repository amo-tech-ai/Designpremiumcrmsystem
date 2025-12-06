import React from 'react';
import { 
  Linkedin, 
  Globe, 
  Mail, 
  MapPin, 
  Briefcase, 
  Users, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Search,
  Sparkles,
  Building
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { EditableInput } from './EditableFields';

interface EnrichmentTabProps {
  lead: any;
}

export const EnrichmentTab: React.FC<EnrichmentTabProps> = ({ lead }) => {
  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      
      {/* 1. Enrichment Overview Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead?.avatarSeed || lead?.name}`} />
            <AvatarFallback>{lead?.name?.substring(0,2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{lead?.name}</h3>
            <div className="text-slate-500 text-sm">{lead?.role} at {lead?.company}</div>
            <Badge variant="secondary" className="mt-1 bg-purple-50 text-purple-600 border-purple-100">
               {lead?.type || 'Lead'}
            </Badge>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md gap-2">
          <Sparkles className="w-4 h-4" /> Run AI Enrichment
        </Button>
      </div>

      {/* 2. Enrichment Details Panel */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" /> Enriched Data
        </h4>
        
        <div className="grid grid-cols-1 gap-4">
           <EditableInput 
             label="LinkedIn Profile" 
             value="linkedin.com/in/sarahconnor" 
             onSave={() => {}} 
             icon={<Linkedin className="w-3 h-3" />}
           />
           <EditableInput 
             label="Website" 
             value={lead?.company ? `www.${lead.company.toLowerCase().replace(/\s/g,'')}.com` : "www.skynet.ai"} 
             onSave={() => {}} 
             icon={<Globe className="w-3 h-3" />}
           />
           <EditableInput 
             label="Email" 
             value={lead?.email || "sarah@skynet.ai"} 
             onSave={() => {}} 
             icon={<Mail className="w-3 h-3" />}
           />
           <EditableInput 
             label="Location" 
             value="Los Angeles, CA" 
             onSave={() => {}} 
             icon={<MapPin className="w-3 h-3" />}
           />
           
           <div className="grid grid-cols-2 gap-4">
             <EditableInput 
               label="Company Size" 
               value="50–100" 
               onSave={() => {}} 
               icon={<Users className="w-3 h-3" />}
             />
             <EditableInput 
               label="Funding Stage" 
               value="Seed" 
               onSave={() => {}} 
               icon={<Briefcase className="w-3 h-3" />}
             />
           </div>

           <div>
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Skills / Keywords</label>
             <div className="flex flex-wrap gap-2">
               {['AI', 'Ops', 'Automation', 'SaaS'].map(tag => (
                 <Badge key={tag} variant="outline" className="bg-slate-50 border-slate-200 text-slate-600">
                   {tag}
                 </Badge>
               ))}
               <Badge variant="outline" className="border-dashed border-slate-300 text-slate-400">+ Add</Badge>
             </div>
           </div>
        </div>
      </div>

      {/* 3. AI Insights Panel */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-100 space-y-3">
         <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-purple-800">Gemini Insights</h4>
         </div>
         <div className="space-y-2">
           {[
             { text: "High engagement in last 7 days", icon: Zap },
             { text: "Matches ICP: AI-based B2B SaaS HQ in US", icon: CheckCircle },
             { text: "Likely evaluator: Head of Ops", icon: Users },
             { text: "Suggested: Send demo link or short Loom walkthrough", icon: ArrowRight, bold: true }
           ].map((insight, i) => (
             <div key={i} className="flex items-start gap-3 bg-white/60 p-2 rounded-lg">
               <insight.icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", insight.bold ? "text-blue-600" : "text-slate-400")} />
               <span className={cn("text-sm text-slate-700", insight.bold && "font-bold text-blue-700")}>
                 {insight.text}
               </span>
             </div>
           ))}
         </div>
      </div>

      {/* 4. Workflow Logic (Visual) */}
      <div className="pt-4 pb-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Enrichment Flow</div>
        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
           <div className="flex flex-col items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200"><Users className="w-4 h-4" /></div>
             <span>Contact</span>
           </div>
           <ArrowRight className="w-4 h-4 text-slate-300" />
           <div className="flex flex-col items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200 text-purple-600"><Search className="w-4 h-4" /></div>
             <span>Enrichment</span>
           </div>
           <ArrowRight className="w-4 h-4 text-slate-300" />
           <div className="flex flex-col items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200 text-blue-600"><Sparkles className="w-4 h-4" /></div>
             <span>AI Insights</span>
           </div>
           <ArrowRight className="w-4 h-4 text-slate-300" />
           <div className="flex flex-col items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center border border-green-200 text-green-600"><CheckCircle className="w-4 h-4" /></div>
             <span>Update CRM</span>
           </div>
        </div>
      </div>

    </div>
  );
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
