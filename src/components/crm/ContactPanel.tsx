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
  X
} from 'lucide-react';
import { Separator } from "../ui/separator";
import { EditableInput, EditableTextarea, EditableTags, EditableSelect } from './EditableFields';
import { EnrichmentTab } from './EnrichmentTab';
import { ScoringTab } from './ScoringTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ContactPanelProps {
  lead: any;
  onClose?: () => void;
}

export const ContactPanel: React.FC<ContactPanelProps> = ({ lead: initialLead, onClose }) => {
  const [lead, setLead] = useState(initialLead);

  // Sync state if prop changes (e.g. clicking different lead in pipeline)
  useEffect(() => {
    setLead(initialLead);
  }, [initialLead]);

  if (!lead) {
    return (
      <div className="h-full flex items-center justify-center bg-slate-50 text-slate-400 border-l border-slate-200">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 opacity-20" />
          </div>
          <h3 className="font-medium text-slate-600 mb-1">No Contact Selected</h3>
          <p className="text-sm max-w-[200px] mx-auto">Select a deal from the pipeline to view details and history.</p>
        </div>
      </div>
    );
  }

  const isInvestor = lead.fundingGoal !== undefined;
  const isLinkedin = lead.type === 'linkedin';

  const handleUpdate = (field: string, value: any) => {
    setLead({ ...lead, [field]: value });
    console.log(`Updated ${field}:`, value);
  };

  return (
    <div className="bg-white h-full border-l border-slate-200 shadow-xl flex flex-col overflow-hidden relative">
      {/* Close Button - Absolute to be always on top */}
      <div className="absolute top-3 right-3 z-30">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

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
          
          {/* OVERVIEW TAB (Original Content) */}
          <TabsContent value="overview" className="h-full overflow-y-auto custom-scrollbar m-0 pb-10">
             {/* Header Profile */}
             <div className="p-6 pb-4 text-center border-b border-slate-50 bg-gradient-to-b from-slate-50 to-white flex-shrink-0 pt-8">
                <div className="relative inline-block group cursor-pointer">
                  <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-white shadow-lg transition-transform group-hover:scale-105">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${lead.name}`} />
                    <AvatarFallback className="text-xl bg-blue-100 text-blue-600">{lead.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {/* Health Score Indicator */}
                  <div className={
                     `absolute bottom-2 right-0 w-6 h-6 border-4 border-white rounded-full ${lead.healthScore > 80 ? 'bg-green-500' : 'bg-amber-500'}`
                  }></div>
                </div>
                
                {/* Editable Name & Company */}
                <div className="max-w-[240px] mx-auto mb-2">
                   <EditableInput 
                     value={lead.name} 
                     onSave={(val) => handleUpdate('name', val)}
                     className="text-center font-bold text-xl text-slate-800 mb-1 justify-center"
                     placeholder="Contact Name"
                   />
                   <EditableInput 
                     value={lead.company} 
                     onSave={(val) => handleUpdate('company', val)}
                     className="text-center text-sm text-slate-500 justify-center"
                     placeholder="Company Name"
                     icon={<Building className="w-3 h-3" />}
                   />
                </div>
                
                {/* Editable Tags */}
                <div className="flex justify-center mb-6 relative">
                  <EditableTags 
                    tags={lead.tags || []} 
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

                {/* New Task / Action Buttons */}
                <div className="flex flex-col gap-2">
                   <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white h-9 text-xs font-medium gap-2 justify-center">
                      <CheckSquare className="w-3 h-3" /> Create Follow-up Task
                   </Button>
                   <div className="flex gap-2">
                     <Button variant="outline" className="flex-1 h-8 text-xs gap-1 border-slate-200">
                        <Calendar className="w-3 h-3" /> Schedule Meeting
                     </Button>
                     <Button variant="outline" className="flex-1 h-8 text-xs gap-1 border-purple-100 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800">
                        <Sparkles className="w-3 h-3" /> AI Suggest
                     </Button>
                   </div>
                </div>
             </div>

             {/* Scrollable Body */}
             <div className="p-6 space-y-8">
                
                {/* Stage & Pipeline Status */}
                <div className="space-y-4">
                   <EditableSelect 
                     label="Pipeline Stage"
                     value={lead.stage || (isInvestor ? 'Research' : 'Qualification')} 
                     onSave={(val) => handleUpdate('stage', val)}
                     options={[
                       { label: 'Research / Discovery', value: 'Research', color: 'bg-indigo-100 text-indigo-700' },
                       { label: 'Outreach / Qualification', value: 'Outreach', color: 'bg-blue-100 text-blue-700' },
                       { label: 'Meeting / Proposal', value: 'Meeting', color: 'bg-cyan-100 text-cyan-700' },
                       { label: 'Negotiation / Due Diligence', value: 'Negotiation', color: 'bg-teal-100 text-teal-700' },
                       { label: 'Closed', value: 'Closed', color: 'bg-green-100 text-green-700' }
                     ]}
                   />
                </div>

                {/* Investor Specifics */}
                {isInvestor && (
                   <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 space-y-3">
                      <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">Investment Profile</h3>
                      <div className="grid grid-cols-2 gap-4">
                         <EditableInput 
                           label="Funding Goal"
                           value={lead.fundingGoal}
                           onSave={(val) => handleUpdate('fundingGoal', val)}
                           icon={<Target className="w-3 h-3" />}
                         />
                         <EditableInput 
                            label="Interest"
                            value={lead.targetInvestors?.[0] || 'General'}
                            onSave={(val) => handleUpdate('interest', val)}
                            icon={<User className="w-3 h-3" />}
                         />
                      </div>
                   </div>
                )}

                {/* LinkedIn Specifics */}
                {isLinkedin && (
                   <div className="p-4 bg-[#0A66C2]/5 rounded-xl border border-[#0A66C2]/10 space-y-4">
                      <div className="flex justify-between items-center">
                         <h3 className="text-xs font-bold text-[#0A66C2] uppercase tracking-wider flex items-center gap-2">
                           <Linkedin className="w-3 h-3" /> LinkedIn Profile
                         </h3>
                         <Badge className="bg-[#0A66C2] text-white border-0 px-2 py-0.5 text-[10px]">
                            {lead.connectionLevel || '1st'} Connection
                         </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 text-sm">
                         <div className="flex items-center gap-2 text-slate-700">
                            <span className="font-medium">{lead.connectionStatus || 'Connected'}</span>
                            <span className="text-slate-400 text-xs">• {lead.lastActivity?.split('LinkedIn')[1] || 'Recently'}</span>
                         </div>
                         <Button variant="ghost" size="sm" className="h-6 text-xs text-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 px-2">
                           View Profile
                         </Button>
                      </div>

                      {/* Activity Stats */}
                      {lead.linkedinActivity && (
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white p-2 rounded-lg border border-slate-100 text-center shadow-sm">
                            <div className="text-slate-400 mb-1 flex justify-center"><ThumbsUp className="w-3 h-3" /></div>
                            <div className="font-bold text-slate-700">{lead.linkedinActivity.likes}</div>
                            <div className="text-[9px] text-slate-400 uppercase">Likes</div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100 text-center shadow-sm">
                             <div className="text-slate-400 mb-1 flex justify-center"><MessageCircle className="w-3 h-3" /></div>
                             <div className="font-bold text-slate-700">{lead.linkedinActivity.comments}</div>
                             <div className="text-[9px] text-slate-400 uppercase">Comments</div>
                          </div>
                          <div className="bg-white p-2 rounded-lg border border-slate-100 text-center shadow-sm">
                             <div className="text-slate-400 mb-1 flex justify-center"><Reply className="w-3 h-3" /></div>
                             <div className="font-bold text-slate-700">{lead.linkedinActivity.replies}</div>
                             <div className="text-[9px] text-slate-400 uppercase">Replies</div>
                          </div>
                        </div>
                      )}
                   </div>
                )}

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Information</h3>
                  <EditableInput 
                     label="Email Address"
                     value={lead.email}
                     onSave={(val) => handleUpdate('email', val)}
                     icon={<Mail className="w-4 h-4" />}
                     placeholder="name@company.com"
                  />
                  <EditableInput 
                     label="Phone Number"
                     value={lead.phone || ''}
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
                    value={lead.notes || "Client is very interested in the enterprise plan but needs approval from the CTO. Schedule a follow-up next Tuesday."}
                    onSave={(val) => handleUpdate('notes', val)}
                    placeholder="Add a note..."
                  />
                </div>

                <Separator />

                {/* Upcoming Tasks */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Upcoming Tasks</h3>
                     <Button variant="ghost" size="xs" className="h-6 w-6 p-0"><Plus className="w-4 h-4" /></Button>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-slate-700">Send Contract Draft</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Tomorrow, 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
             </div>
          </TabsContent>

          {/* ENRICHMENT TAB */}
          <TabsContent value="enrichment" className="h-full overflow-y-auto custom-scrollbar m-0 p-6 pt-8">
             <EnrichmentTab lead={lead} />
          </TabsContent>

          {/* SCORING TAB */}
          <TabsContent value="scoring" className="h-full overflow-y-auto custom-scrollbar m-0 p-6 pt-8">
             <ScoringTab lead={lead} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
