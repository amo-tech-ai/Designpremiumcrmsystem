import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext, useFieldArray } from 'react-hook-form@7.55.0';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { supabase } from '../../utils/supabase/client';
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
  Calendar,
  LayoutGrid,
  BarChart3,
  Share2,
  PieChart
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
import { useCompanyProfile } from "../crm/hooks";

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
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/company-profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
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
      const { data: { session } } = await supabase.auth.getSession();
      
      // If no session, warn user
      if (!session) {
        toast.error("Please sign in to save your profile");
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/company-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
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
      <div className="min-h-full w-full bg-[#FAFBFE] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
           <div className="w-10 h-10 border-4 border-[#6F7EBC] border-t-transparent rounded-full animate-spin"></div>
           <span className="text-sm font-medium text-[#7A8191]">Loading company data...</span>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-full w-full bg-[#FAFBFE] relative flex flex-col font-sans">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-[#E3E7EE] px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={() => onNavigate?.('dashboard')} className="-ml-2 text-[#6B7280]">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <span className="font-bold text-[#1A1F2C]">Edit Company</span>
        </div>

        <div className="flex-grow p-4 md:p-8 max-w-[1400px] mx-auto w-full space-y-6 md:space-y-8 pb-32">
          
          {/* Page Header (Desktop) */}
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1A1F2C] tracking-tight">Edit Company Profile</h1>
              <p className="text-[#7A8191] mt-2 font-medium text-lg">Manage your company's public information and business details.</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('dashboard')}
              className="bg-white border-[#E3E7EE] text-[#6B7280] hover:text-[#1A1F2C] hover:bg-[#FAFBFE] shadow-sm rounded-xl font-bold px-6 h-11 transition-all"
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
              <div className="bg-white/90 backdrop-blur-md border border-[#E3E7EE] shadow-lg shadow-[#E3E7EE] rounded-2xl p-3 pl-6 pr-3 flex items-center gap-6 pointer-events-auto max-w-xl w-full mx-4 md:mx-auto">
                <span className="text-sm font-medium text-[#4A4F5B] hidden sm:block">
                  You have unsaved changes to your company profile
                </span>
                <div className="flex items-center gap-3 ml-auto">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => reset()}
                    className="hover:bg-[#FAFBFE] text-[#7A8191] font-bold rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-[#6F7EBC] hover:bg-[#5A69A6] text-white shadow-sm rounded-xl px-6 font-bold"
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] overflow-hidden group hover:shadow-md transition-all duration-300">
      
      {/* Cover Image */}
      <div 
        className="h-40 bg-[#F2F4FF] relative group cursor-pointer border-b border-[#E3E7EE] bg-cover bg-center transition-all"
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
          <Button variant="secondary" size="sm" className="gap-2 pointer-events-none bg-white/90 text-[#4A4F5B] hover:bg-white rounded-xl font-bold shadow-sm">
            <Upload className="w-4 h-4" /> Change Cover
          </Button>
        </div>
      </div>

      <CardContent className="pt-0 relative p-8">
        {/* Logo */}
        <div className="relative -mt-14 mb-8 flex justify-between items-end">
          <div className="relative group cursor-pointer" onClick={() => logoInputRef.current?.click()}>
            <input 
              type="file" 
              ref={logoInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'logo')}
            />
            <div className="w-24 h-24 rounded-2xl bg-white border-[6px] border-white shadow-lg flex items-center justify-center overflow-hidden relative">
              {logoPreview ? (
                <img src={logoPreview} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#E8EEF5] flex items-center justify-center text-[#6F7EBC] font-bold text-3xl">
                  S
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[#4A4F5B] font-bold text-sm">Company Name <span className="text-[#F2B6B6]">*</span></Label>
              <Input 
                {...register("companyName", { required: "Company name is required" })}
                className={cn("h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium", errors.companyName && "border-[#F2B6B6]")}
              />
              {errors.companyName && <span className="text-xs text-[#F2B6B6]">{errors.companyName.message}</span>}
            </div>
            <div className="space-y-2">
              <Label className="text-[#4A4F5B] font-bold text-sm">Founded Year</Label>
              <div className="relative">
                 <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
                 <Input 
                   {...register("foundedYear")}
                   className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium"
                   placeholder="YYYY"
                 />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Tagline</Label>
            <Input 
              {...register("tagline")}
              className="h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium"
              placeholder="e.g. The AI-powered CRM..."
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Short Description</Label>
            <Textarea 
              {...register("description")}
              className="min-h-[100px] rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 resize-none p-4 text-[#1A1F2C] font-medium"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Headquarters</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input 
                {...register("headquarters")}
                className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium"
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] hover:shadow-md transition-all duration-300">
      <CardHeader className="border-b border-[#E3E7EE] pb-4 px-8 pt-6 flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#ECF4FF] flex items-center justify-center border border-[#E3E7EE]">
            <Building2 className="w-6 h-6 text-[#6F7EBC]" strokeWidth={1.5} />
        </div>
        <div>
            <CardTitle className="text-xl font-bold text-[#1A1F2C]">Business Information</CardTitle>
            <CardDescription className="text-sm text-[#7A8191] font-medium mt-0.5">Industry, model, and segmentation</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Industry <span className="text-[#F2B6B6]">*</span></Label>
            <Select onValueChange={(val) => setValue('industry', val, { shouldDirty: true })} defaultValue={watch('industry')}>
              <SelectTrigger className="h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white text-[#1A1F2C] font-medium">
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
            <Label className="text-[#4A4F5B] font-bold text-sm">Business Model</Label>
            <Select onValueChange={(val) => setValue('businessModel', val, { shouldDirty: true })} defaultValue={watch('businessModel')}>
              <SelectTrigger className="h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white text-[#1A1F2C] font-medium">
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

        {/* Tags Sections */}
        <div className="space-y-2">
          <Label className="text-[#4A4F5B] font-bold text-sm">Customer Segments</Label>
          <div className="p-3 bg-[#FAFBFE] border border-[#E3E7EE] rounded-xl min-h-[48px] flex flex-wrap gap-2 items-center">
            {watch('customerSegments').map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-white border border-[#E3E7EE] text-[#4A4F5B] font-bold text-xs hover:bg-[#F2F4FF] pl-2.5 pr-1.5 py-1.5 rounded-lg shadow-sm">
                {tag} <X className="w-3 h-3 ml-1.5 cursor-pointer text-[#7A8191] hover:text-[#F2B6B6]" />
              </Badge>
            ))}
            <button type="button" className="text-xs text-[#6F7EBC] font-bold px-3 py-1.5 hover:bg-[#F2F4FF] rounded-lg flex items-center gap-1.5 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#4A4F5B] font-bold text-sm">Key Features</Label>
          <div className="p-3 bg-[#FAFBFE] border border-[#E3E7EE] rounded-xl min-h-[48px] flex flex-wrap gap-2 items-center">
             {watch('keyFeatures').map((tag, i) => (
              <Badge key={i} variant="secondary" className="bg-white border border-[#E3E7EE] text-[#4A4F5B] font-bold text-xs hover:bg-[#F2F4FF] pl-2.5 pr-1.5 py-1.5 rounded-lg shadow-sm">
                {tag} <X className="w-3 h-3 ml-1.5 cursor-pointer text-[#7A8191] hover:text-[#F2B6B6]" />
              </Badge>
            ))}
             <button type="button" className="text-xs text-[#6F7EBC] font-bold px-3 py-1.5 hover:bg-[#F2F4FF] rounded-lg flex items-center gap-1.5 transition-colors">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[#4A4F5B] font-bold text-sm">Differentiator</Label>
          <Input 
            {...register("differentiator")}
            className="h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium"
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] hover:shadow-md transition-all duration-300">
      <CardHeader className="border-b border-[#E3E7EE] pb-4 px-8 pt-6 flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#E8EEF5] flex items-center justify-center border border-[#E3E7EE]">
            <Share2 className="w-6 h-6 text-[#4A5B78]" strokeWidth={1.5} />
        </div>
        <div>
            <CardTitle className="text-xl font-bold text-[#1A1F2C]">Social Links</CardTitle>
            <CardDescription className="text-sm text-[#7A8191] font-medium mt-0.5">Online presence and communities</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Website</Label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("website")} className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("linkedin")} className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">Twitter / X</Label>
            <div className="relative">
              <Twitter className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("twitter")} className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[#4A4F5B] font-bold text-sm">GitHub</Label>
            <div className="relative">
              <Github className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("github")} className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] focus:ring-1 focus:ring-[#6F7EBC]/20 text-[#1A1F2C] font-medium" />
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between border-b border-[#E3E7EE] pb-4 px-8 pt-6">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-2xl bg-[#ECF4FF] flex items-center justify-center border border-[#E3E7EE]">
               <Users className="w-6 h-6 text-[#6F7EBC]" strokeWidth={1.5} />
           </div>
           <div>
               <CardTitle className="text-xl font-bold text-[#1A1F2C]">Team Highlights</CardTitle>
               <CardDescription className="text-sm text-[#7A8191] font-medium mt-0.5">Key members and roles</CardDescription>
           </div>
        </div>
        <Button variant="ghost" size="sm" onClick={() => append({ name: "", role: "" })} className="text-[#6F7EBC] hover:text-[#5A69A6] hover:bg-[#F2F4FF] font-bold rounded-xl h-10 px-4">
          <Plus className="w-4 h-4 mr-2" /> Add Member
        </Button>
      </CardHeader>
      <CardContent className="pt-6 px-8 pb-8">
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 p-4 bg-[#FAFBFE] rounded-xl border border-[#E3E7EE]">
              <Avatar className="h-10 w-10 border border-[#E3E7EE]">
                <AvatarFallback className="bg-[#C9D7F2] text-[#6F7EBC] font-bold">
                  {field.name.charAt(0) || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow grid grid-cols-2 gap-4">
                 <Input 
                   defaultValue={field.name}
                   className="h-10 bg-white border-[#E3E7EE] text-sm text-[#1A1F2C] rounded-lg font-medium"
                   placeholder="Name"
                 />
                 <Input 
                   defaultValue={field.role}
                   className="h-10 bg-white border-[#E3E7EE] text-sm text-[#1A1F2C] rounded-lg font-medium"
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] hover:shadow-md transition-all duration-300">
      <CardHeader className="border-b border-[#E3E7EE] pb-4 px-8 pt-6 flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#ECFFE9] flex items-center justify-center border border-[#E3E7EE]">
            <BarChart3 className="w-6 h-6 text-[#4CAF73]" strokeWidth={1.5} />
        </div>
        <div>
            <CardTitle className="text-xl font-bold text-[#1A1F2C]">Key Metrics</CardTitle>
            <CardDescription className="text-sm text-[#7A8191] font-medium mt-0.5">Traction and growth numbers</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6 px-8 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="space-y-2">
            <Label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Monthly Revenue</Label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("mrr")} className="pl-10 h-11 bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] text-sm font-bold text-[#1A1F2C] rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Active Users</Label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("users")} className="pl-10 h-11 bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] text-sm font-bold text-[#1A1F2C] rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Growth (MoM)</Label>
            <div className="relative">
              <TrendingUp className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("growth")} className="pl-10 h-11 bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] text-sm font-bold text-[#1A1F2C] rounded-xl" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">Waitlist</Label>
            <div className="relative">
              <Users className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
              <Input {...register("waitlist")} className="pl-10 h-11 bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] text-sm font-bold text-[#1A1F2C] rounded-xl" />
            </div>
          </div>
        </div>
        
        {/* Simple Sparkline Visual */}
        <div className="mt-8 pt-6 border-t border-[#E3E7EE]">
           <div className="flex items-center justify-between mb-4">
             <span className="text-sm font-bold text-[#4A4F5B]">Growth Trajectory</span>
             <Badge variant="outline" className="text-[#4CAF73] bg-[#ECFFE9] border-[#A8E6C1] font-bold rounded-lg px-2">+15% this month</Badge>
           </div>
           <div className="h-20 w-full flex items-end gap-1.5">
             {[30, 45, 40, 55, 65, 60, 75, 85, 80, 95, 100].map((h, i) => (
               <div key={i} className="flex-1 bg-[#C9D7F2] rounded-t-lg hover:bg-[#6F7EBC] transition-colors relative group" style={{ height: `${h}%` }}>
                 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#1A1F2C] text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold shadow-lg">
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
    <Card className="border-[#E3E7EE] shadow-sm bg-white rounded-[20px] hover:shadow-md transition-all duration-300">
      <CardHeader className="border-b border-[#E3E7EE] pb-4 px-8 pt-6 flex flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF9E6] flex items-center justify-center border border-[#E3E7EE]">
            <PieChart className="w-6 h-6 text-[#E0B45A]" strokeWidth={1.5} />
        </div>
        <div>
            <CardTitle className="text-xl font-bold text-[#1A1F2C]">Funding Information</CardTitle>
            <CardDescription className="text-sm text-[#7A8191] font-medium mt-0.5">Investment stage and capital</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <Label className="text-[#4A4F5B] font-bold text-sm">Current Stage</Label>
             <Select onValueChange={(val) => setValue('stage', val, { shouldDirty: true })} defaultValue={watch('stage')}>
                <SelectTrigger className="h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white text-[#1A1F2C] font-medium">
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
             <Label className="text-[#4A4F5B] font-bold text-sm">Raise Amount Target</Label>
             <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
                <Input 
                  {...register("raiseAmount")}
                  className="pl-10 h-11 rounded-xl bg-[#FAFBFE] border-[#E3E7EE] focus:bg-white focus:border-[#6F7EBC] text-[#1A1F2C] font-bold"
                />
             </div>
           </div>
        </div>

        <div className="space-y-2">
           <Label className="text-[#4A4F5B] font-bold text-sm">Use of Funds</Label>
           <div className="p-3 bg-[#FAFBFE] border border-[#E3E7EE] rounded-xl min-h-[48px] flex flex-wrap gap-2 items-center">
              {watch('useOfFunds').map((tag, i) => (
                <Badge key={i} variant="secondary" className="bg-white border border-[#E3E7EE] text-[#4A4F5B] font-bold text-xs hover:bg-[#F2F4FF] pl-2.5 pr-1.5 py-1.5 rounded-lg shadow-sm">
                  {tag} <X className="w-3 h-3 ml-1.5 cursor-pointer text-[#7A8191] hover:text-[#F2B6B6]" />
                </Badge>
              ))}
              <button type="button" className="text-xs text-[#6F7EBC] font-bold px-3 py-1.5 hover:bg-[#F2F4FF] rounded-lg flex items-center gap-1.5 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- AI Panel (Right Column) ---

const CompAIPanel = () => {
  const { watch } = useFormContext<CompanyProfileFormValues>();
  const profile = watch();
  const { analyzeProfile, processing } = useCompanyProfile();
  const [aiResult, setAiResult] = useState<{ strengths: string; risks: string; actions: string[] } | null>(null);

  const handleAnalyze = async () => {
    const res = await analyzeProfile(profile);
    if (res) {
       setAiResult(res);
       toast.success("Profile analyzed");
    }
  };

  return (
    <Card className="border-none shadow-sm shadow-[#C9D7F2] bg-white rounded-[20px] overflow-hidden ring-1 ring-[#E3E7EE] group hover:shadow-md transition-all duration-300">
      <div className="bg-gradient-to-r from-[#C9D7F2] to-[#AFC3F7] p-6 text-[#4A5B78]">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" fill="currentColor" />
          </div>
          <h3 className="font-bold text-lg">AI Profile Insights</h3>
        </div>
        <p className="text-xs text-[#4A5B78] opacity-90 font-bold tracking-wide uppercase mt-1">Real-time Analysis</p>
      </div>
      
      <CardContent className="p-6 space-y-6">
        
        {/* Summary Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#4CAF73]" strokeWidth={2.5} />
            Strengths
          </h4>
          <p className="text-sm text-[#4A4F5B] leading-relaxed bg-[#ECFFE9] p-4 rounded-xl border border-[#A8E6C1]/30 font-medium">
            {aiResult ? aiResult.strengths : "Click Auto-Improve to analyze your profile."}
          </p>
        </div>

        {/* Risks Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#F6DFA9]" strokeWidth={2.5} />
            Risks Identified
          </h4>
          <p className="text-sm text-[#4A4F5B] leading-relaxed bg-[#FFF9E6] p-4 rounded-xl border border-[#F6DFA9]/30 font-medium">
             {aiResult ? aiResult.risks : "..."}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#6F7EBC]" strokeWidth={2.5} />
            Recommended Actions
          </h4>
          <div className="space-y-2.5">
             {aiResult?.actions?.map((action, i) => (
                <div key={i} className="text-xs p-3 bg-[#F2F4FF] text-[#6F7EBC] rounded-xl border border-[#C9D7F2] flex items-center gap-2.5 font-bold">
                  <Plus className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={3} /> {action}
                </div>
             ))}
             {!aiResult && (
               <div className="text-xs text-[#7A8191] italic pl-1 font-medium">No actions generated yet.</div>
             )}
          </div>
        </div>

        <Separator className="bg-[#E3E7EE]" />

        <div className="grid grid-cols-1 gap-3">
          <Button 
             size="sm" 
             onClick={handleAnalyze}
             disabled={processing}
             className="w-full h-11 text-xs bg-[#6F7EBC] hover:bg-[#5A69A6] text-white font-bold rounded-xl shadow-md shadow-[#C9D7F2]/50 transition-all active:scale-[0.98]"
          >
            {processing ? <Sparkles className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {processing ? "Analyzing..." : "Auto-Improve Profile"}
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};