import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Linkedin, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Briefcase, 
  Building,
  User,
  ArrowRight
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { toast } from 'sonner@2.0.3';
import { addContact, enrichFromUrl } from './actions';
import { cn } from "../ui/utils";
import { motion, AnimatePresence } from 'motion/react';

interface AddContactSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactAdded?: () => void;
}

export const AddContactSidebar: React.FC<AddContactSidebarProps> = ({ 
  open, 
  onOpenChange,
  onContactAdded 
}) => {
  const [loading, setLoading] = useState(false);
  const [enriching, setEnriching] = useState(false);
  const [enrichmentData, setEnrichmentData] = useState<any>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    phone: '',
    companyName: '',
    domain: '',
    segment: '',
    linkedinUrl: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEnrichment = async () => {
    if (!formData.linkedinUrl) {
      toast.error("Please enter a LinkedIn or Company URL first");
      return;
    }

    setEnriching(true);
    try {
      const data = await enrichFromUrl(formData.linkedinUrl);
      
      setEnrichmentData(data);
      
      // Auto-fill fields
      setFormData(prev => ({
        ...prev,
        firstName: data.first_name || prev.firstName,
        lastName: data.last_name || prev.lastName,
        title: data.title || prev.title,
        companyName: data.company || prev.companyName,
        domain: data.domain || prev.domain,
        segment: data.segment || prev.segment
      }));

      toast.success("Enrichment complete!");
    } catch (err) {
      toast.error("Failed to enrich data. Please try manually.");
    } finally {
      setEnriching(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Name and Email are required");
      return;
    }

    setLoading(true);
    try {
      await addContact(
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          title: formData.title,
          phone: formData.phone,
          linkedin_url: formData.linkedinUrl,
          tags: formData.segment ? [formData.segment] : []
        },
        {
          name: formData.companyName,
          domain: formData.domain,
          segment: formData.segment
        },
        enrichmentData ? {
          recent_news: enrichmentData.recent_news,
          gemini_summary: enrichmentData.summary,
          funding_history: enrichmentData.funding ? [{ round: enrichmentData.funding, amount: 'Unknown', date: new Date().toISOString() }] : []
        } : null,
        enrichmentData ? {
          overall_score: 85, // Mock score for enriched contacts
          match_reason: "High relevance based on AI analysis of profile and company fit.",
          recommended_next_actions: ["Send connection request", "Review recent news"]
        } : null
      );

      toast.success("Contact added successfully");
      onContactAdded?.();
      onOpenChange(false);
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        phone: '',
        companyName: '',
        domain: '',
        segment: '',
        linkedinUrl: ''
      });
      setEnrichmentData(null);

    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save contact");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md lg:max-w-[480px] p-0 flex flex-col bg-white overflow-hidden sm:rounded-l-xl border-l border-slate-200 shadow-2xl">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div className="flex items-center justify-between mb-1">
             <SheetTitle className="text-xl font-bold text-slate-900">Add New Contact</SheetTitle>
             <SheetClose asChild>
               {/* Close button handled by Sheet automatically usually, but we can custom style if needed */}
             </SheetClose>
          </div>
          <SheetDescription className="text-slate-500">
            Create a new contact and auto-enrich with AI
          </SheetDescription>
        </div>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto px-6 py-6 space-y-8 bg-slate-50/30 custom-scrollbar">
          
          {/* 1. LinkedIn / AI Section */}
          <div className="space-y-3">
             <Label htmlFor="linkedin" className="text-slate-700 font-semibold">LinkedIn Profile or Company URL</Label>
             <div className="flex gap-2">
               <div className="relative flex-grow">
                 <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                 <Input 
                   id="linkedin" 
                   placeholder="https://linkedin.com/in/..." 
                   className="pl-9 bg-white border-slate-200 focus:border-emerald-300 focus:ring-emerald-100"
                   value={formData.linkedinUrl}
                   onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                 />
               </div>
               <Button 
                 onClick={handleEnrichment}
                 disabled={enriching || !formData.linkedinUrl}
                 className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-sm whitespace-nowrap"
               >
                 {enriching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                 {enriching ? 'Enriching...' : 'Run AI Enrichment'}
               </Button>
             </div>

             {/* Enrichment Result Card */}
             <AnimatePresence>
               {enrichmentData && (
                 <motion.div 
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, height: 0 }}
                   className="mt-4 bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden"
                 >
                   <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2">
                     <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                     <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Gemini Analysis</span>
                   </div>
                   <div className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                         <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500 font-bold text-sm">
                           {enrichmentData.first_name?.[0]}{enrichmentData.last_name?.[0]}
                         </div>
                         <div>
                            <div className="font-bold text-slate-800">{enrichmentData.first_name} {enrichmentData.last_name}</div>
                            <div className="text-xs text-slate-500">{enrichmentData.title} at {enrichmentData.company}</div>
                         </div>
                      </div>
                      
                      {enrichmentData.summary && (
                        <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                           {enrichmentData.summary}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                         {enrichmentData.recent_news?.map((news: any, i: number) => (
                           <Badge key={i} variant="secondary" className="bg-white border border-slate-200 text-slate-600 font-normal">
                             <Globe className="w-3 h-3 mr-1 text-slate-400" /> {news.title}
                           </Badge>
                         ))}
                      </div>
                   </div>
                   <div className="bg-emerald-50/50 p-2 text-center border-t border-emerald-100">
                     <Button variant="ghost" size="sm" className="h-auto py-1 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-transparent">
                       Generate Suggested Tasks <ArrowRight className="w-3 h-3 ml-1" />
                     </Button>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          <div className="h-px bg-slate-200" />

          {/* 2. Contact Info Form */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-500" /> Contact Details
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="firstName" 
                  placeholder="Jane" 
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
               <Input 
                 id="email" 
                 type="email" 
                 placeholder="jane@company.com" 
                 value={formData.email}
                 onChange={(e) => handleChange('email', e.target.value)}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title / Role</Label>
                <Input 
                  id="title" 
                  placeholder="CEO, Founder..." 
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input 
                  id="phone" 
                  placeholder="+1 (555)..." 
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-200" />

          {/* 3. Company Info Form */}
          <div className="space-y-4">
             <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
               <Building className="w-4 h-4 text-slate-500" /> Company Information
             </h4>

             <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input 
                  id="company" 
                  placeholder="Acme Inc." 
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                   <Label htmlFor="domain">Domain</Label>
                   <div className="relative">
                     <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                     <Input 
                       id="domain" 
                       placeholder="acme.com" 
                       className="pl-9"
                       value={formData.domain}
                       onChange={(e) => handleChange('domain', e.target.value)}
                     />
                   </div>
                </div>
                <div className="space-y-2">
                   <Label htmlFor="segment">Segment</Label>
                   <Select 
                     value={formData.segment} 
                     onValueChange={(val) => handleChange('segment', val)}
                   >
                     <SelectTrigger id="segment" className="bg-white">
                       <SelectValue placeholder="Select..." />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="Lead">Lead</SelectItem>
                       <SelectItem value="Investor">Investor</SelectItem>
                       <SelectItem value="Partner">Partner</SelectItem>
                       <SelectItem value="Advisor">Advisor</SelectItem>
                       <SelectItem value="Customer">Customer</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 z-10">
           <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
           <Button 
             className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 min-w-[120px]"
             onClick={handleSubmit}
             disabled={loading}
           >
             {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
             {loading ? 'Saving...' : 'Save Contact'}
           </Button>
        </div>

      </SheetContent>
    </Sheet>
  );
};