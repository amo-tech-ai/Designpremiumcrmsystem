import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Linkedin, 
  Globe, 
  CheckCircle, 
  Loader2, 
  User, 
  Building, 
  RefreshCw,
  Zap,
  History,
  ArrowRight
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { toast } from 'sonner@2.0.3';
import { updateContactFull, enrichFromUrl, generateFollowUpActions, regenerateSummary } from './actions';
import { useContactDetail } from './hooks';
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";

interface EditContactSidebarProps {
  contactId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactUpdated?: () => void;
}

export const EditContactSidebar: React.FC<EditContactSidebarProps> = ({ 
  contactId, 
  open, 
  onOpenChange,
  onContactUpdated 
}) => {
  const { contact, loading: loadingDetail, refresh } = useContactDetail(contactId);
  
  const [saving, setSaving] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [generatingActions, setGeneratingActions] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  
  // Local state for AI suggestions
  const [suggestedActions, setSuggestedActions] = useState<string[]>([]);
  const [aiSummary, setAiSummary] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    phone: '',
    companyName: '',
    domain: '',
    linkedinUrl: ''
  });

  // Populate form when contact loads
  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.first_name || '',
        lastName: contact.last_name || '',
        email: contact.email || '',
        title: contact.title || '',
        phone: contact.phone || '',
        companyName: contact.account?.name || '',
        domain: contact.account?.domain || '',
        linkedinUrl: contact.linkedin_url || ''
      });
      
      // Load existing enrichment data
      if (contact.enrichment?.gemini_summary) {
        setAiSummary(contact.enrichment.gemini_summary);
      }
      
      // Load existing suggested actions (from lead score or separate table if it existed)
      if (contact.score?.recommended_next_actions) {
        setSuggestedActions(contact.score.recommended_next_actions);
      }
    }
  }, [contact]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRefreshEnrichment = async () => {
    if (!formData.linkedinUrl) {
      toast.error("Please enter a LinkedIn or Company URL first");
      return;
    }

    setEnriching(true);
    try {
      const data = await enrichFromUrl(formData.linkedinUrl);
      
      // Auto-update form fields with new data
      setFormData(prev => ({
        ...prev,
        firstName: data.first_name || prev.firstName,
        lastName: data.last_name || prev.lastName,
        title: data.title || prev.title,
        companyName: data.company || prev.companyName,
        domain: data.domain || prev.domain
      }));
      
      if (data.summary) setAiSummary(data.summary);

      toast.success("Enrichment refreshed!");
    } catch (err) {
      toast.error("Failed to refresh enrichment.");
    } finally {
      setEnriching(false);
    }
  };

  const handleRegenerateSummary = async () => {
    if (!contactId) return;
    setGeneratingSummary(true);
    try {
      const summary = await regenerateSummary(contactId, `Title: ${formData.title}, Company: ${formData.companyName}`);
      setAiSummary(summary);
      toast.success("Summary regenerated");
    } catch (err) {
      toast.error("Failed to regenerate summary");
    } finally {
      setGeneratingSummary(false);
    }
  };

  const handleSuggestActions = async () => {
    if (!contactId) return;
    setGeneratingActions(true);
    try {
      const actions = await generateFollowUpActions(contactId);
      setSuggestedActions(actions);
      toast.success("Actions generated");
    } catch (err) {
      toast.error("Failed to generate actions");
    } finally {
      setGeneratingActions(false);
    }
  };

  const handleSubmit = async () => {
    if (!contactId) return;
    
    setSaving(true);
    try {
      await updateContactFull(
        contactId,
        contact.account_id,
        {
          contact: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            title: formData.title,
            phone: formData.phone,
            linkedin_url: formData.linkedinUrl
          },
          account: {
            name: formData.companyName,
            domain: formData.domain
          },
          enrichment: {
            gemini_summary: aiSummary
            // Note: In a real app we'd save suggested actions too, perhaps in crm_lead_scores or a tasks table
          }
        }
      );

      toast.success("Contact updated successfully");
      onContactUpdated?.();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md lg:max-w-[600px] p-0 flex flex-col bg-slate-50/50">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-white">
          <SheetTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Edit Contact
            {loadingDetail && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
          </SheetTitle>
          <SheetDescription>
            Update details and manage AI enrichment
          </SheetDescription>
        </div>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          
          <div className="p-6 space-y-6">

             {/* 1. Basic Info Section */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
                <div className="flex items-center justify-between">
                   <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                     <User className="w-4 h-4 text-indigo-500" /> Contact Info
                   </h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">First Name</Label>
                     <Input value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                   </div>
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">Last Name</Label>
                     <Input value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                   </div>
                </div>

                <div className="space-y-1.5">
                   <Label className="text-xs text-slate-500">Email</Label>
                   <Input value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">Title</Label>
                     <Input value={formData.title} onChange={e => handleChange('title', e.target.value)} />
                   </div>
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">Phone</Label>
                     <Input value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                   </div>
                </div>
             </div>

             {/* 2. Company Info Section */}
             <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                   <Building className="w-4 h-4 text-indigo-500" /> Company Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">Company Name</Label>
                     <Input value={formData.companyName} onChange={e => handleChange('companyName', e.target.value)} />
                   </div>
                   <div className="space-y-1.5">
                     <Label className="text-xs text-slate-500">Domain</Label>
                     <Input value={formData.domain} onChange={e => handleChange('domain', e.target.value)} />
                   </div>
                </div>
             </div>

             {/* 3. AI & LinkedIn Enrichment */}
             <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5 space-y-5">
                <div className="flex items-center justify-between">
                   <h3 className="font-semibold text-indigo-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> AI Enrichment
                   </h3>
                   <Button 
                     size="sm" 
                     variant="outline" 
                     className="h-8 bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                     onClick={handleRefreshEnrichment}
                     disabled={enriching}
                   >
                     {enriching ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                     Refresh Data
                   </Button>
                </div>

                <div className="space-y-1.5">
                   <Label className="text-xs text-indigo-800">LinkedIn Profile URL</Label>
                   <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        value={formData.linkedinUrl} 
                        onChange={e => handleChange('linkedinUrl', e.target.value)} 
                        className="pl-9 bg-white border-indigo-200 focus:border-indigo-400"
                        placeholder="https://linkedin.com/in/..."
                      />
                   </div>
                </div>

                {/* Enrichment Preview Card */}
                {(aiSummary || contact?.enrichment?.recent_news) && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-indigo-100 p-4 space-y-3">
                     
                     {/* Summary */}
                     <div className="space-y-2">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gemini Summary</span>
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="h-6 text-[10px] text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-2"
                             onClick={handleRegenerateSummary}
                             disabled={generatingSummary}
                           >
                             {generatingSummary ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                             Regenerate
                           </Button>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                           {aiSummary || "No summary available."}
                        </p>
                     </div>

                     <Separator className="bg-indigo-100" />

                     {/* Recent News (Read-only from contact for now) */}
                     {contact?.enrichment?.recent_news && contact.enrichment.recent_news.length > 0 && (
                       <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Signals</span>
                          <div className="space-y-2">
                             {contact.enrichment.recent_news.slice(0, 2).map((news: any, idx: number) => (
                               <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 bg-white p-2 rounded border border-indigo-50">
                                  <Globe className="w-3 h-3 mt-0.5 text-slate-400 flex-shrink-0" />
                                  <span>{news.title}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                     )}

                  </div>
                )}

                {/* Suggested Actions */}
                <div className="space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-indigo-900">Suggested Follow-up</span>
                      <Button 
                         variant="ghost" 
                         size="sm" 
                         className="h-7 text-xs text-indigo-600 hover:bg-indigo-100/50"
                         onClick={handleSuggestActions}
                         disabled={generatingActions}
                       >
                         {generatingActions ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Zap className="w-3 h-3 mr-1" />}
                         Generate
                       </Button>
                   </div>
                   
                   {suggestedActions.length > 0 ? (
                     <div className="space-y-2">
                       {suggestedActions.map((action, i) => (
                         <div key={i} className="flex items-center gap-2 p-2 bg-white border border-indigo-100 rounded-md shadow-sm">
                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                               <span className="text-[10px] font-bold text-indigo-600">{i + 1}</span>
                            </div>
                            <span className="text-xs text-slate-700">{action}</span>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-xs text-slate-500 italic p-2">
                        Click generate to get AI-powered next steps...
                     </div>
                   )}
                </div>

             </div>

             {/* 4. Recent Activity Preview (Read only) */}
             <div className="space-y-3">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                   <History className="w-4 h-4 text-slate-400" /> Recent Activity
                </h3>
                <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 text-center">
                   <p className="text-sm text-slate-500">No recent activity logged.</p>
                   <Button variant="link" className="text-indigo-600 text-xs mt-1">View all activity log</Button>
                </div>
             </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 bg-white flex items-center justify-end gap-3 sticky bottom-0 z-10">
           <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
           <Button 
             className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 min-w-[140px]"
             onClick={handleSubmit}
             disabled={saving}
           >
             {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
             {saving ? 'Saving...' : 'Save Changes'}
           </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
};
