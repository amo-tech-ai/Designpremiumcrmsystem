import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form@7.55.0';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Camera, 
  Settings, 
  LogOut, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Sparkles,
  ChevronLeft,
  Mail,
  Briefcase,
  Building2,
  Save,
  X
} from 'lucide-react';
import { toast } from "sonner@2.0.3";
import { cn } from "../ui/utils";
import { supabase } from "../../utils/supabase/client";
import { projectId } from "../../utils/supabase/info";

// UI Components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

// Types
interface UserProfileFormValues {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  timezone: string;
  theme: 'light' | 'dark' | 'system';
  aiCopilot: boolean;
  language: string;
  avatar_path?: string;
  avatarUrl?: string;
}

const defaultValues: UserProfileFormValues = {
  firstName: "",
  lastName: "",
  bio: "",
  email: "",
  timezone: "utc-8",
  theme: "light",
  aiCopilot: true,
  language: "en",
  avatar_path: ""
};

interface UserProfileProps {
  onNavigate?: (view: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const methods = useForm<UserProfileFormValues>({
    defaultValues,
    mode: "onChange"
  });

  const { formState, reset, handleSubmit, setValue } = methods;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setValue('email', session.user.email || "");

        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/user-profile`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data).length > 0) {
            reset({ ...defaultValues, ...data, email: session.user.email || "" });
          } else {
             // If no profile exists, keep defaults but set email
             reset({ ...defaultValues, email: session.user.email || "" });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [reset, setValue]);

  const onSubmit = async (data: UserProfileFormValues) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in to save changes");
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/user-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      toast.success("Profile updated successfully");
      reset(data); // Reset dirty state with new values
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    if (onNavigate) onNavigate('auth');
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center p-8">Loading profile...</div>;
  }

  if (!isAuthenticated) {
    // Development mode: Allow viewing without auth
    /*
    return (
      <div className="flex h-full flex-col items-center justify-center p-8 space-y-4">
        <h2 className="text-xl font-semibold">Please Log In</h2>
        <p className="text-slate-500">You need to be logged in to view your profile.</p>
        <Button onClick={() => onNavigate?.('auth') || (window.location.href = '/')}>
          Go to Login
        </Button>
      </div>
    );
    */
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="min-h-full w-full bg-[#F7F8FA] relative flex flex-col">
        
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-20">
          <Button variant="ghost" size="icon" onClick={() => onNavigate?.('dashboard')} className="-ml-2">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </Button>
          <span className="font-semibold text-slate-900">My Profile</span>
        </div>

        <div className="flex-grow p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6 md:space-y-8 pb-32">
          
          {/* Page Header (Desktop) */}
          <div className="hidden md:flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
              <p className="text-slate-500 mt-1">Manage your personal information and account settings</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('dashboard')}
              className="text-slate-600"
            >
              Back to Dashboard
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            
            {/* LEFT COLUMN: Profile Card */}
            <div className="md:col-span-4 lg:col-span-3 space-y-6">
              <ProfileCard />
              
              {/* Account Actions (Desktop only - strictly separating layout) */}
              <div className="hidden md:block">
                 <AccountActions onLogout={handleLogout} />
              </div>
            </div>

            {/* RIGHT COLUMN: Forms */}
            <div className="md:col-span-8 lg:col-span-9 space-y-6">
              <PersonalInfoCard />
              <PreferencesCard />
              
              {/* Account Actions (Mobile only) */}
              <div className="md:hidden">
                 <AccountActions onLogout={handleLogout} />
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
                  You have unsaved changes
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
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-200 rounded-xl px-6"
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

// --- Sub-Components ---

const ProfileCard = () => {
  const { watch, setValue } = useFormContext<UserProfileFormValues>();
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const avatarUrl = watch('avatarUrl');
  const fullName = `${firstName} ${lastName}`.trim() || "User";
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("No session");

      // 1. Get Signed Upload URL
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/storage/upload-url`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename: file.name, contentType: file.type })
      });
      
      if (!res.ok) throw new Error("Failed to get upload URL");
      const { uploadUrl, path, token } = await res.json();

      // 2. Upload File to Supabase Storage directly via signed URL
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
          'Authorization': `Bearer ${token}` 
        },
        body: file
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      // 3. Update Form State
      setValue('avatar_path', path, { shouldDirty: true });
      
      // Optimistically update the display URL (using local object URL for immediate feedback)
      setValue('avatarUrl', URL.createObjectURL(file));
      
      toast.success("Avatar uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white overflow-hidden rounded-[20px]">
      <div className="h-24 bg-gradient-to-r from-emerald-50 to-green-50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>
      <CardContent className="pt-0 relative flex flex-col items-center pb-8">
        <div className="relative -mt-12 mb-4 group cursor-pointer">
          <Avatar className="w-32 h-32 border-[6px] border-white shadow-xl bg-white">
            <AvatarImage src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`} className="object-cover" />
            <AvatarFallback className="text-2xl">{initials || "U"}</AvatarFallback>
          </Avatar>
          <label className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-[2px] cursor-pointer">
            <Camera className="w-8 h-8 text-white drop-shadow-md" />
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          </label>
          <label className="absolute bottom-0 right-0 rounded-full h-8 w-8 border-2 border-white bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center cursor-pointer transition-colors">
            {uploading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Camera className="w-4 h-4" />}
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
          </label>
        </div>
        
        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl font-bold text-slate-900">{fullName}</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CEO & Founder</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Building2 className="w-3.5 h-3.5" />
            <span>Product Department</span>
          </div>
        </div>

        <label className="w-full">
           <div className={cn(
             "w-full rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 h-10 flex items-center justify-center font-medium text-sm transition-colors cursor-pointer",
             uploading && "opacity-50 cursor-not-allowed"
           )}>
             {uploading ? "Uploading..." : "Change Avatar"}
           </div>
           <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      </CardContent>
    </Card>
  );
};

const PersonalInfoCard = () => {
  const { register, watch, setValue, getValues, formState: { errors } } = useFormContext<UserProfileFormValues>();
  const bio = watch('bio');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleRewriteBio = async () => {
    const currentBio = getValues('bio');
    if (!currentBio || currentBio.length < 10) {
      toast.error("Please enter a bio first to rewrite");
      return;
    }

    setIsAiLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("You must be logged in");
        return;
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6522a742/ai-action`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'rewrite',
          prompt: currentBio,
          context: { field: 'User Bio', role: 'Startup Founder' }
        })
      });

      if (!response.ok) throw new Error('AI request failed');

      const data = await response.json();
      if (data.result) {
        setValue('bio', data.result, { shouldDirty: true });
        toast.success("Bio rewritten with AI");
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to rewrite bio");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Personal Information</CardTitle>
        <CardDescription>Manage your public profile details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
            <Input 
              id="firstName" 
              {...register('firstName', { required: "First name is required" })}
              className={cn("h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors", errors.firstName && "border-red-500")}
              placeholder="e.g. Alex"
            />
            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              {...register('lastName')}
              className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors"
              placeholder="e.g. Founder"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="bio">Bio</Label>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={handleRewriteBio}
              disabled={isAiLoading}
              className="h-7 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              {isAiLoading ? (
                <span className="flex items-center gap-1.5">
                  <span className="animate-spin text-xs">✨</span> Rewriting...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Rewrite with AI
                </span>
              )}
            </Button>
          </div>
          <Textarea 
            id="bio" 
            {...register('bio', { maxLength: 250 })}
            className="min-h-[120px] rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors resize-none p-4"
            placeholder="Tell us a little about yourself..."
          />
          <div className="flex justify-end">
            <span className={cn("text-xs", (bio?.length || 0) > 250 ? "text-red-500" : "text-slate-400")}>
              {bio?.length || 0}/250 characters
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
              <Input 
                id="email" 
                {...register('email')}
                disabled
                className="pl-9 h-11 rounded-xl bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed"
              />
              <Badge variant="secondary" className="absolute right-2 top-2.5 h-6 bg-green-100 text-green-700 hover:bg-green-100 border-none">Verified</Badge>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Timezone <span className="text-red-500">*</span></Label>
            <TimezoneSelect />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TimezoneSelect = () => {
  const { setValue, watch } = useFormContext<UserProfileFormValues>();
  const value = watch('timezone');

  return (
    <Select value={value} onValueChange={(val) => setValue('timezone', val, { shouldDirty: true })}>
      <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors">
        <SelectValue placeholder="Select timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="utc-8">Pacific Time (US & Canada)</SelectItem>
        <SelectItem value="utc-5">Eastern Time (US & Canada)</SelectItem>
        <SelectItem value="utc+0">GMT (London)</SelectItem>
        <SelectItem value="utc+1">CET (Paris)</SelectItem>
        <SelectItem value="utc+8">CST (Beijing)</SelectItem>
        <SelectItem value="utc+9">JST (Tokyo)</SelectItem>
      </SelectContent>
    </Select>
  );
};

const PreferencesCard = () => {
  const { setValue, watch } = useFormContext<UserProfileFormValues>();
  const theme = watch('theme');
  const aiCopilot = watch('aiCopilot');
  const language = watch('language');

  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardHeader>
        <CardTitle className="text-lg text-slate-900">Preferences</CardTitle>
        <CardDescription>Customize your workspace experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Theme Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Label className="text-base font-medium">Appearance</Label>
            <p className="text-sm text-slate-500">Select your interface color theme.</p>
          </div>
          <div className="flex p-1 bg-slate-100 rounded-xl">
             <button 
                type="button"
                onClick={() => setValue('theme', 'light', { shouldDirty: true })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  theme === 'light' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
             >
                <Sun className="w-4 h-4" />
                Light
             </button>
             <button 
                type="button"
                onClick={() => setValue('theme', 'dark', { shouldDirty: true })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  theme === 'dark' ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
             >
                <Moon className="w-4 h-4" />
                Dark
             </button>
             <button 
                type="button"
                onClick={() => setValue('theme', 'system', { shouldDirty: true })}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  theme === 'system' ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
             >
                <Smartphone className="w-4 h-4" />
                Auto
             </button>
          </div>
        </div>

        <Separator />

        {/* AI Copilot Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-1 flex-grow">
            <div className="flex items-center gap-2">
               <Label className="text-base font-medium">AI Copilot Mode</Label>
               <Badge className="bg-emerald-100 text-emerald-700 border-none px-2 h-5 text-[10px] hover:bg-emerald-100">BETA</Badge>
            </div>
            <p className="text-sm text-slate-500 max-w-md">Enable proactive suggestions and automated insights across your workflow.</p>
          </div>
          <Switch 
            checked={aiCopilot} 
            onCheckedChange={(val) => setValue('aiCopilot', val, { shouldDirty: true })}
            className="data-[state=checked]:bg-emerald-600"
          />
        </div>

        <Separator />

        {/* Language Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
           <div className="space-y-1">
              <Label className="text-base font-medium">Language</Label>
              <p className="text-sm text-slate-500">Choose your preferred language.</p>
           </div>
           <Select value={language} onValueChange={(val) => setValue('language', val, { shouldDirty: true })}>
             <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors">
               <SelectValue placeholder="Select language" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="en">English (United States)</SelectItem>
               <SelectItem value="fr">Français</SelectItem>
               <SelectItem value="de">Deutsch</SelectItem>
               <SelectItem value="es">Español</SelectItem>
               <SelectItem value="pt">Português</SelectItem>
             </SelectContent>
           </Select>
        </div>

      </CardContent>
    </Card>
  );
};

interface AccountActionsProps {
  onLogout?: () => void;
}

const AccountActions: React.FC<AccountActionsProps> = ({ onLogout }) => {
  return (
    <Card className="border-none shadow-sm bg-white rounded-[20px]">
      <CardContent className="pt-6">
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start h-11 rounded-xl text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-50">
            <Settings className="w-4 h-4 mr-2" />
            Manage Account Settings
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start h-11 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};