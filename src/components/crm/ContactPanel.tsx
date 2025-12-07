import React, { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  CheckSquare, 
  MoreHorizontal,
  Clock,
  User,
  Building,
  Target,
  Plus,
  Linkedin,
  ThumbsUp,
  MessageCircle,
  Reply,
  X,
  Pencil,
  Loader2
} from 'lucide-react';
import { Separator } from "../ui/separator";
import { EditableInput, EditableTextarea, EditableTags, EditableSelect } from './EditableFields';
import { EnrichmentTab } from './EnrichmentTab';
import { ScoringTab } from './ScoringTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useContactDetail, useAIActions } from './hooks';
import { EditContactSidebar } from './EditContactSidebar';
import { toast } from "sonner@2.0.3";

interface ContactPanelProps {
  lead: any;
  onClose?: () => void;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({ lead: initialLead, onClose }) => {
  const { contact: fullContact, activities, loading, updateContact, refresh } = useContactDetail(initialLead?.id);
  const { summarizeContact, enrichContact, suggestNextSteps, processing } = useAIActions(initialLead?.id || '');
  
  // Local state for immediate feedback while loading or if update fails
  const [localLead, setLocalLead] = useState(initialLead);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (fullContact) {
      setLocalLead(fullContact);
    } else {
      setLocalLead(initialLead);
    }
  }, [fullContact, initialLead]);

  if (!localLead) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 text-slate-400 border-l border-slate-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 opacity-20" />
          </div>
          <h3 className="font-medium text-slate-600 mb-1">No Contact Selected</h3>
          <p className="text-sm max-w-[200px] mx-auto">Select a contact to view details and history.</p>
        </div>
      </div>
    );
  }

  const isInvestor = localLead.type === 'investor' || localLead.tags?.includes('Investor');
  const isLinkedin = localLead.linkedin_url || localLead.type === 'linkedin';

  const handleUpdate = async (field: string, value: any) => {
    // Optimistic update
    setLocalLead({ ...localLead, [field]: value });
    
    // Map UI field names to DB field names if necessary
    const dbField = field === 'role' ? 'title' : field === 'name' ? 'first_name' : field; 
    // Note: 'name' split logic would be needed for first_name/last_name if updating 'name' directly
    
    await updateContact({ [dbField]: value });
  };

  const handleAIAction = async (action: 'summarize' | 'enrich' | 'suggest') => {
    try {
      if (action === 'summarize') await summarizeContact();
      if (action === 'enrich') await enrichContact(localLead.linkedin_url || '');
      if (action === 'suggest') await suggestNextSteps();
      
      toast.success(`AI ${action} completed`);
      refresh();
    } catch (e) {
      toast.error(`Failed to run AI ${action}`);
    }
  };

  return (
    <div className="bg-white h-full border-l border-slate-200 shadow-xl flex flex-col overflow-hidden relative">
      {/* Close Button */}
      <div className="absolute top-3 right-3 z-30 flex gap-2">
         <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 bg-white/80 hover:bg-slate-100 rounded-full shadow-sm" 
            title="Edit Contact"
            onClick={() => setIsEditOpen(true)}
         >
            <Pencil className="h-4 w-4 text-slate-500" />
         </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <EditContactSidebar 
        contactId={localLead.id}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onContactUpdated={() => {
          refresh();
          // Also force local refresh if needed
        }}
      />

      <Tabs defaultValue="overview" className="flex flex-col h-full">
        
        {/* Tab Navigation */}
        <div className="px-6 pt-4 border-b border-slate-100 flex-shrink-0 bg-white z-20 pb-2">
           <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="enrichment">Enrichment</TabsTrigger>
              <TabsTrigger value="scoring">Scoring</TabsTrigger>
           </TabsList>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-hidden">
          
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="h-full overflow-y-auto custom-scrollbar m-0 pb-10">
             {loading && (
               <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                 <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
               </div>
             )}
             
             {/* Header Profile */}
             <div className="p-6 pb-4 text-center border-b border-slate-50 bg-gradient-to-b from-slate-50 to-white flex-shrink-0 pt-8">
                <div className="relative inline-block group cursor-pointer">
                  <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-white shadow-lg transition-transform group-hover:scale-105">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localLead.email || localLead.name}`} />
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{localLead.first_name?.[0] || localLead.name?.[0]}</AvatarFallback>
                  </Avatar>
                  {/* Score Indicator */}
                  {localLead.overall_score !== undefined && (
                     <div className={
                        `absolute bottom-2 right-0 w-6 h-6 border-4 border-white rounded-full ${localLead.overall_score > 80 ? 'bg-green-500' : 'bg-amber-500'}`
                     } title={`Score: ${localLead.overall_score}`}></div>
                  )}
                </div>
                
                {/* Basic Info */}
                <div className="max-w-[240px] mx-auto mb-2">
                   <h2 className="text-center font-bold text-xl text-slate-800 mb-1">
                     {localLead.first_name ? `${localLead.first_name} ${localLead.last_name}` : localLead.name}
                   </h2>
                   <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
                     <Building className="w-3 h-3" />
                     <span>{localLead.account_name || localLead.company}</span>
                   </div>
                   <div className="text-xs text-slate-400 mt-1">{localLead.title || localLead.role}</div>
                </div>
                
                {/* Editable Tags */}
                <div className="flex justify-center mb-6 relative">
                  <EditableTags 
                    tags={localLead.tags || []} 
                    onSave={(tags) => handleUpdate('tags', tags)} 
                  />
                  {isLinkedin && (
                     <div className="absolute -top-12 right-0 bg-[#0A66C2] text-white p-1 rounded-full shadow-sm" title="LinkedIn Contact">
                       <Linkedin className="w-3 h-3" />
                     </div>
                  )}
                </div>

                {/* Primary Actions Grid */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <Button variant="outline" size="icon" className="rounded-full w-full h-10 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-full h-10 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-full h-10 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-full h-10 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* AI Actions */}
                <div className="flex flex-col gap-2">
                   <Button 
                      className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 text-xs font-medium gap-2 justify-center"
                      onClick={() => handleAIAction('suggest')}
                      disabled={processing}
                   >
                      {processing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                      Generate Next Steps
                   </Button>
                   <div className="flex gap-2">
                     <Button 
                        variant="outline" 
                        className="flex-1 h-8 text-xs gap-1 border-purple-100 bg-purple-50 text-purple-700 hover:bg-purple-100"
                        onClick={() => handleAIAction('enrich')}
                        disabled={processing}
                      >
                        <Sparkles className="w-3 h-3" /> Enrich
                     </Button>
                     <Button 
                        variant="outline" 
                        className="flex-1 h-8 text-xs gap-1 border-slate-200"
                        onClick={() => handleAIAction('summarize')}
                        disabled={processing}
                      >
                        <MessageSquare className="w-3 h-3" /> Summarize
                     </Button>
                   </div>
                </div>
             </div>

             {/* Scrollable Body */}
             <div className="p-6 space-y-8">
                
                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h3>
                  <EditableInput 
                     label="Email Address"
                     value={localLead.email}
                     onSave={(val) => handleUpdate('email', val)}
                     icon={<Mail className="w-4 h-4" />}
                     placeholder="name@company.com"
                  />
                  <EditableInput 
                     label="Phone Number"
                     value={localLead.phone || ''}
                     onSave={(val) => handleUpdate('phone', val)}
                     icon={<Phone className="w-4 h-4" />}
                     placeholder="+1 (555) 000-0000"
                  />
                </div>

                <Separator />

                {/* Notes */}
                <div className="space-y-2">
                  <EditableTextarea 
                    label="Latest Notes"
                    value={localLead.notes || ''}
                    onSave={(val) => handleUpdate('notes', val)}
                    placeholder="Add a note..."
                  />
                </div>

                <Separator />

                {/* Upcoming Tasks - Visual only for now */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Actions</h3>
                  </div>
                  
                  {localLead.score?.recommended_next_actions?.map((action: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-lg border border-indigo-100 cursor-pointer hover:bg-indigo-50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-slate-700">{action}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-400" /> AI Suggested
                        </p>
                      </div>
                      <Button size="xs" variant="ghost" className="h-6 w-6"><Plus className="w-4 h-4" /></Button>
                    </div>
                  ))}
                  
                  {(!localLead.score?.recommended_next_actions || localLead.score.recommended_next_actions.length === 0) && (
                     <div className="text-sm text-slate-400 italic text-center py-2">No pending actions</div>
                  )}
                </div>

                <Separator />

                {/* Activity History */}
                <div className="space-y-4">
                   <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Activity History</h3>
                   {activities && activities.length > 0 ? (
                      <div className="relative border-l border-slate-200 ml-2 space-y-6 pb-2">
                        {activities.map((act: any) => (
                           <div key={act.id} className="relative pl-6">
                              <div className={cn(
                                "absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-white ring-1 ring-slate-100",
                                act.type === 'meeting' ? "bg-purple-400" :
                                act.type === 'email' ? "bg-blue-400" :
                                "bg-slate-300"
                              )}></div>
                              <div className="flex flex-col gap-0.5">
                                <p className="text-sm font-medium text-slate-800">{act.content || 'Interaction'}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                   <span className="capitalize">{act.type}</span>
                                   <span>•</span>
                                   <span>{new Date(act.occurred_at).toLocaleDateString()}</span>
                                </div>
                              </div>
                           </div>
                        ))}
                      </div>
                   ) : (
                      <div className="text-sm text-slate-400 text-center py-4 bg-slate-50 rounded-lg border border-slate-100 border-dashed">
                         No activity recorded yet
                      </div>
                   )}
                </div>
             </div>
          </TabsContent>

          {/* ENRICHMENT TAB */}
          <TabsContent value="enrichment" className="h-full overflow-y-auto custom-scrollbar m-0 p-6 pt-8">
             <EnrichmentTab lead={localLead} />
          </TabsContent>

          {/* SCORING TAB */}
          <TabsContent value="scoring" className="h-full overflow-y-auto custom-scrollbar m-0 p-6 pt-8">
             <ScoringTab lead={localLead} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
