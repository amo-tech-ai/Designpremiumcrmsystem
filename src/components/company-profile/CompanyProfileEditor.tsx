import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext, useFieldArray } from 'react-hook-form@7.55.0';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { 
  Building2, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Lightbulb, 
  CheckCircle2, 
  ArrowLeft,
  Camera,
  Upload,
  X,
  Sparkles,
  Save,
  MapPin,
  Calendar
} from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";

// UI Components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

// --- Types ---

interface CompanyProfileFormValues {
  // Identity
  companyName: string;
  tagline: string;
  description: string;
  foundedYear: string;
  headquarters: string;
  
  // Business Info
  industry: string;
  businessModel: string;
  customerSegments: string[]; // Tags
  keyFeatures: string[]; // Tags
  differentiator: string;

  // Social
  website: string;
  linkedin: string;
  twitter: string;
  github: string;

  // Metrics
  mrr: string;
  users: string;
  growth: string;
  waitlist: string;

  // Funding
  stage: string;
  raiseAmount: string;
  useOfFunds: string[]; // Tags
  
  // Team (Simple list for now)
  team: { name: string; role: string }[];
}

const defaultValues: CompanyProfileFormValues = {
  companyName: "StartupAI",
  tagline: "The AI-powered CRM for modern founders",
  description: "StartupAI helps founders build, fundraise, and grow with an all-in-one intelligent platform.",
  foundedYear: "2024",
  headquarters: "San Francisco, CA",
  industry: "SaaS",
  businessModel: "B2B Subscription",
  customerSegments: ["Early-stage Founders", "Accelerators"],
  keyFeatures: ["Pitch Deck Generator", "Investor CRM"],
  differentiator: "First CRM with native generative AI integration for pitch decks.",
  website: "https://startupai.com",
  linkedin: "linkedin.com/company/startupai",
  twitter: "@startupai",
  github: "github.com/startupai",
  mrr: "$12,500",
  users: "1,200",
  growth: "15%",
  waitlist: "5,000+",
  stage: "Seed",
  raiseAmount: "$2M",
  useOfFunds: ["Engineering", "Marketing"],
  team: [
    { name: "Alex Founder", role: "CEO" },
    { name: "Sam Tech", role: "CTO" }
  ]
};

// --- Main Component ---

interface CompanyProfileEditorProps {
  onNavigate?: (view: string) => void;
}

export const CompanyProfileEditor: React.FC<CompanyProfileEditorProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const methods = useForm<CompanyProfileFormValues>({
    defaultValues,
    mode: "onChange"
  });

  const { formState, reset, handleSubmit } = methods;
  const { isDirty, isSubmitting } = formState;

  // Fetch data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/company-profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Only reset if we got actual data, otherwise keep defaultValues
          if (data && Object.keys(data).length > 0) {
            reset(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch company profile:", error);
        toast.error("Failed to load company profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data: CompanyProfileFormValues) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/company-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error("Failed to save");

      toast.success("Company profile updated successfully");
      reset(data); // Reset dirty state
      
      // Return to dashboard logic
      if (onNavigate) {
         onNavigate('dashboard');
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save changes");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-full w-full bg-[#F7F8FA] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
           <Sparkles className="w-6 h-6 text-indigo-600 animate-spin" />
           <span className="text-sm text-slate-500">Loading company data...</span>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-full w-full bg-[#F7F8FA] relative flex flex-col">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={() => onNavigate?.('dashboard')} className="-ml-2">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <span className="font-semibold text-slate-900">Edit Company</span>
        </div>

        <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 md:space-y-8 pb-32">
          
          {/* Page Header (Desktop) */}
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Company Profile</h1>
              <p className="text-slate-500 mt-1">Manage your company's public information and business details.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('dashboard')}
              className="text-slate-600"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Main Edit Sections */}
            <div className="lg:col-span-8 space-y-8">
              <CompIdentityCard />
              <CompBusinessInfoCard />
              <CompSocialLinksCard />
              <CompTeamHighlightsCard />
              <CompMetricsCard />
              <CompFundingCard />
            </div>

            {/* RIGHT COLUMN: AI Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-8 space-y-6">
                <CompAIPanel />
                {/* Additional Sidebar Widgets could go here */}
              </div>
            </div>

          </div>
        </div>

        {/* Sticky Save Bar */}
        <AnimatePresence>
          {isDirty && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 z-40 p-4 md:pb-6 pointer-events-none flex justify-center"
            >
              <div className="bg-white/90 backdrop-blur-md border border-slate-200/60 shadow-2xl shadow-slate-200/50 rounded-2xl p-2 pl-6 pr-2 flex items-center gap-6 pointer-events-auto max-w-xl w-full mx-4 md:mx-auto">
                <span className="text-sm font-medium text-slate-600 hidden sm:block">
                  You have unsaved changes to your company profile
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => reset()}
                    className="hover:bg-slate-100 text-slate-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 rounded-xl px-6"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </form>
    </FormProvider>
  );
};

// --- Sub-Components (COMP_COMPANYPROFILE_...) ---

const CompIdentityCard = () => {
  const { register, formState: { errors } } = useFormContext<CompanyProfileFormValues>();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const coverInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
       const url = URL.createObjectURL(file);
       if (type === 'logo') setLogoPreview(url);
       else setCoverPreview(url);
       toast.success(`${type === 'logo' ? 'Logo' : 'Cover image'} updated (preview only)`);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px] overflow-hidden">
      
      {/* Cover Image */}
      <div 
        className="h-32 bg-slate-100 relative group cursor-pointer border-b border-slate-100 bg-cover bg-center transition-all"
        style={coverPreview ? { backgroundImage: `url(${coverPreview})` } : {}}
        onClick={() => coverInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'cover')}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="sm" className="gap-2 pointer-events-none">
            <Upload className="w-4 h-4" /> Change Cover
          </Button>
        </div>
      </div>

      <CardContent className="pt-0 relative">
        {/* Logo */}
        <div className="relative -mt-10 mb-6 flex justify-between items-end">
          <div className="relative group cursor-pointer" onClick={() => logoInputRef.current?.click()}>
            <input 
              type="file" 
              ref={logoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
            />
            <div className="w-20 h-20 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden relative">
              {logoPreview ? (
                <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-2xl">
                  S
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Company Name <span className="text-red-500">*</span></Label>
              <Input 
                {...register("companyName", { required: "Company name is required" })}
                className={cn("h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white", errors.companyName && "border-red-500")}
              />
              {errors.companyName && <span className="text-xs text-red-500">{errors.companyName.message}</span>}
            </div>
            <div className="space-y-2">
              <Label>Founded Year</Label>
              <div className="relative">
                 <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                 <Input 
                   {...register("foundedYear")}
                   className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                   placeholder="YYYY"
                 />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tagline</Label>
            <Input 
              {...register("tagline")}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              placeholder="e.g. The AI-powered CRM..."
            />
          </div>

          <div className="space-y-2">
            <Label>Short Description</Label>
            <Textarea 
              {...register("description")}
              className="min-h-[100px] rounded-xl bg-slate-50 border-slate-200 focus:bg-white resize-none p-3"
            />
          </div>

          <div className="space-y-2">
            <Label>Headquarters</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input 
                {...register("headquarters")}
                className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
                placeholder="City, Country"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CompBusinessInfoCard = () => {
  const { register, setValue, watch } = useFormContext<CompanyProfileFormValues>();
  
  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg">Business Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Industry <span className="text-red-500">*</span></Label>
            <Select onValueChange={(val) => setValue('industry', val, { shouldDirty: true })} defaultValue={watch('industry')}>
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SaaS">SaaS</SelectItem>
                <SelectItem value="Fintech">Fintech</SelectItem>
                <SelectItem value="Healthtech">Healthtech</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
                <SelectItem value="AI/ML">AI / ML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Business Model</Label>
            <Select onValueChange={(val) => setValue('businessModel', val, { shouldDirty: true })} defaultValue={watch('businessModel')}>
              <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B2B Subscription">B2B Subscription</SelectItem>
                <SelectItem value="B2C Subscription">B2C Subscription</SelectItem>
                <SelectItem value="Marketplace">Marketplace</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags Sections - Using a simplified implementation for now */}
        <div className="space-y-2">
          <Label>Customer Segments</Label>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[44px] flex flex-wrap gap-2">
            {watch('customerSegments').map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-white border border-slate-200 text-slate-700 font-normal hover:bg-slate-100 pl-2 pr-1 py-1">
                {tag} <X className="w-3 h-3 ml-1 cursor-pointer text-slate-400 hover:text-red-500" />
              </Badge>
            ))}
            <button type="button" className="text-xs text-indigo-600 font-medium px-2 py-1 hover:bg-indigo-50 rounded flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Key Features</Label>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[44px] flex flex-wrap gap-2">
             {watch('keyFeatures').map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-white border border-slate-200 text-slate-700 font-normal hover:bg-slate-100 pl-2 pr-1 py-1">
                {tag} <X className="w-3 h-3 ml-1 cursor-pointer text-slate-400 hover:text-red-500" />
              </Badge>
            ))}
             <button type="button" className="text-xs text-indigo-600 font-medium px-2 py-1 hover:bg-indigo-50 rounded flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Differentiator</Label>
          <Input 
            {...register("differentiator")}
            className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
            placeholder="What makes you unique?"
          />
        </div>
      </CardContent>
    </Card>
  );
};

const CompSocialLinksCard = () => {
  const { register } = useFormContext<CompanyProfileFormValues>();

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg">Social Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Website</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input {...register("website")} className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input {...register("linkedin")} className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Twitter / X</Label>
            <div className="relative">
              <Twitter className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input {...register("twitter")} className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>GitHub</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input {...register("github")} className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CompTeamHighlightsCard = () => {
  const { control } = useFormContext<CompanyProfileFormValues>();
  const { fields, append } = useFieldArray({
    control,
    name: "team"
  });

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Team Highlights</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => append({ name: "", role: "" })} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
          <Plus className="w-4 h-4 mr-1" /> Add Member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-indigo-100 text-indigo-700">
                  {field.name.charAt(0) || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow grid grid-cols-2 gap-3">
                 <Input 
                   defaultValue={field.name}
                   className="h-9 bg-white border-slate-200 text-sm"
                   placeholder="Name"
                 />
                 <Input 
                   defaultValue={field.role}
                   className="h-9 bg-white border-slate-200 text-sm"
                   placeholder="Role"
                 />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CompMetricsCard = () => {
  const { register } = useFormContext<CompanyProfileFormValues>();

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg">Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-slate-500 uppercase">Monthly Revenue</Label>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <Input {...register("mrr")} className="pl-8 h-9 bg-slate-50 border-slate-200 focus:bg-white text-sm font-medium" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500 uppercase">Active Users</Label>
            <div className="relative">
              <Users className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <Input {...register("users")} className="pl-8 h-9 bg-slate-50 border-slate-200 focus:bg-white text-sm font-medium" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500 uppercase">Growth (MoM)</Label>
            <div className="relative">
              <TrendingUp className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <Input {...register("growth")} className="pl-8 h-9 bg-slate-50 border-slate-200 focus:bg-white text-sm font-medium" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-slate-500 uppercase">Waitlist</Label>
            <div className="relative">
              <Users className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
              <Input {...register("waitlist")} className="pl-8 h-9 bg-slate-50 border-slate-200 focus:bg-white text-sm font-medium" />
            </div>
          </div>
        </div>
        
        {/* Simple Sparkline Visual */}
        <div className="mt-6 pt-4 border-t border-slate-100">
           <div className="flex items-center justify-between mb-2">
             <span className="text-sm font-medium text-slate-600">Growth Trajectory</span>
             <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">+15% this month</Badge>
           </div>
           <div className="h-16 w-full flex items-end gap-1">
             {[30, 45, 40, 55, 65, 60, 75, 85, 80, 95, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-indigo-100 rounded-t-sm hover:bg-indigo-200 transition-colors relative group" style={{ height: `${h}%` }}>
                 <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                   Data Point {i+1}
                 </div>
               </div>
             ))}
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CompFundingCard = () => {
  const { register, setValue, watch } = useFormContext<CompanyProfileFormValues>();

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg">Funding Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <Label>Current Stage</Label>
             <Select onValueChange={(val) => setValue('stage', val, { shouldDirty: true })} defaultValue={watch('stage')}>
                <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pre-Seed">Pre-Seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B+">Series B+</SelectItem>
                </SelectContent>
             </Select>
           </div>
           <div className="space-y-2">
             <Label>Raise Amount Target</Label>
             <Input 
               {...register("raiseAmount")}
               className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
             />
           </div>
        </div>

        <div className="space-y-2">
           <Label>Use of Funds</Label>
           <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl min-h-[44px] flex flex-wrap gap-2">
              {watch('useOfFunds').map((tag, i) => (
                <Badge key={i} variant="secondary" className="bg-white border border-slate-200 text-slate-700 font-normal hover:bg-slate-100 pl-2 pr-1 py-1">
                  {tag} <X className="w-3 h-3 ml-1 cursor-pointer text-slate-400 hover:text-red-500" />
                </Badge>
              ))}
              <button type="button" className="text-xs text-indigo-600 font-medium px-2 py-1 hover:bg-indigo-50 rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add
              </button>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- AI Panel (Right Column) ---

const CompAIPanel = () => {
  return (
    <Card className="border-none shadow-lg shadow-indigo-100 bg-white rounded-[20px] overflow-hidden ring-1 ring-indigo-50">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-indigo-100" />
          <h3 className="font-semibold">AI Profile Insights</h3>
        </div>
        <p className="text-xs text-indigo-100 opacity-90">Real-time analysis of your company data.</p>
      </div>
      
      <CardContent className="p-5 space-y-6">
        
        {/* Summary Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Strengths
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
            Strong clear value proposition in the "Differentiator" field. Good traction signals with waitlist numbers.
          </p>
        </div>

        {/* Risks Section */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Risks Identified
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed bg-amber-50 p-3 rounded-lg border border-amber-100">
            "Business Model" is generic. Consider specifying pricing tiers or contract types to attract investors.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-500" />
            Recommended Actions
          </h4>
          <div className="space-y-2">
             <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border-slate-200">
               <Plus className="w-3 h-3 mr-2" /> Add 2 more team members
             </Button>
             <Button variant="outline" className="w-full justify-start text-xs h-9 bg-white hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 border-slate-200">
               <Plus className="w-3 h-3 mr-2" /> Elaborate on "AI/ML" tech stack
             </Button>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-3">
          <Button size="sm" variant="secondary" className="w-full text-xs">
            Refresh
          </Button>
          <Button size="sm" className="w-full text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
            Auto-Improve
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};
