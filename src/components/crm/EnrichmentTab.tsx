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
import { useAIActions } from './hooks';
import { toast } from 'sonner@2.0.3';

interface EnrichmentTabProps {
  lead: any;
}

export const EnrichmentTab: React.FC<EnrichmentTabProps> = ({ lead }) => {
  const { enrichContact, processing } = useAIActions(lead?.id || '');

  // Use real enrichment data if available, otherwise mock or empty
  const enrichmentData = lead?.enrichment || {};
  const accountData = lead?.account || {};

  const handleRunEnrichment = async () => {
    try {
      await enrichContact(lead.linkedin_url || '');
      toast.success('Enrichment started');
    } catch (e) {
      toast.error('Enrichment failed');
    }
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      
      {/* 1. Enrichment Overview Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead?.email || lead?.name}`} />
            <AvatarFallback>{(lead?.first_name?.[0] || lead?.name?.[0])}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold text-slate-800">{lead?.first_name} {lead?.last_name}</h3>
            <div className="text-slate-500 text-sm">{lead?.title || lead?.role} at {accountData.name || lead?.company}</div>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary" className="bg-purple-50 text-purple-600 border-purple-100">
                 {accountData.industry || 'SaaS'}
              </Badge>
            </div>
          </div>
        </div>
        <Button 
          onClick={handleRunEnrichment} 
          disabled={processing}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md gap-2"
        >
          <Sparkles className="w-4 h-4" /> {processing ? 'Enriching...' : 'Run AI Enrichment'}
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
             value={lead?.linkedin_url || ""} 
             onSave={() => {}} 
             icon={<Linkedin className="w-3 h-3" />}
             placeholder="Add LinkedIn URL"
           />
           <EditableInput 
             label="Website" 
             value={accountData.domain || ""} 
             onSave={() => {}} 
             icon={<Globe className="w-3 h-3" />}
             placeholder="company.com"
           />
           <EditableInput 
             label="Email" 
             value={lead?.email || ""} 
             onSave={() => {}} 
             icon={<Mail className="w-3 h-3" />}
           />
           <EditableInput 
             label="Location" 
             value="Unknown" 
             onSave={() => {}} 
             icon={<MapPin className="w-3 h-3" />}
           />
           
           <div className="grid grid-cols-2 gap-4">
             <EditableInput 
               label="Company Size" 
               value="Unknown" 
               onSave={() => {}} 
               icon={<Users className="w-3 h-3" />}
             />
             <EditableInput 
               label="Funding Stage" 
               value={enrichmentData.funding_history?.[0]?.round || "Unknown"} 
               onSave={() => {}} 
               icon={<Briefcase className="w-3 h-3" />}
             />
           </div>

           <div>
             <label className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2 block">Latest News</label>
             {enrichmentData.recent_news && enrichmentData.recent_news.length > 0 ? (
               <div className="flex flex-col gap-2">
                 {enrichmentData.recent_news.map((news: any, i: number) => (
                   <a key={i} href={news.url} target="_blank" rel="noreferrer" className="block bg-slate-50 border border-slate-200 p-2 rounded-md hover:border-blue-300 transition-colors">
                     <p className="text-xs font-medium text-slate-700 line-clamp-1">{news.title}</p>
                     <p className="text-[10px] text-slate-400">{news.date}</p>
                   </a>
                 ))}
               </div>
             ) : (
                <div className="text-xs text-slate-400 italic">No recent news found</div>
             )}
           </div>
        </div>
      </div>

      {/* 3. AI Insights Panel */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-5 rounded-xl border border-purple-100 space-y-3">
         <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h4 className="font-bold text-purple-800">Gemini Summary</h4>
         </div>
         {enrichmentData.gemini_summary ? (
            <p className="text-sm text-slate-700 leading-relaxed">
              {enrichmentData.gemini_summary}
            </p>
         ) : (
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
         )}
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
