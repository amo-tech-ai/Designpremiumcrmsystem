import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Camera, 
  Save, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner@2.0.3";

export const ProfileSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Profile updated successfully");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Basics */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative group cursor-pointer">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 font-bold text-lg text-slate-900">Alex D.</h3>
              <p className="text-sm text-slate-500">Product Manager</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                Change Avatar
              </Button>
            </CardContent>
          </Card>

          <Card>
             <CardHeader className="pb-3">
               <CardTitle className="text-base">Role</CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <Label>Job Title</Label>
                 <Input defaultValue="Product Manager" />
               </div>
               <div className="space-y-2">
                 <Label>Department</Label>
                 <Input defaultValue="Product" />
               </div>
             </CardContent>
          </Card>
        </div>

        {/* Right Column: Details & Preferences */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your public profile details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input defaultValue="D." />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea 
                  className="min-h-[100px]" 
                  defaultValue="Building the future of AI-powered startups. Passionate about product design and user experience." 
                />
                <p className="text-xs text-slate-400 text-right">120/250 characters</p>
              </div>

              <div className="space-y-2">
                 <Label>Timezone</Label>
                 <Select defaultValue="utc-8">
                    <SelectTrigger>
                       <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                       <SelectItem value="utc-8">Pacific Time (US & Canada)</SelectItem>
                       <SelectItem value="utc-5">Eastern Time (US & Canada)</SelectItem>
                       <SelectItem value="utc+0">GMT (London)</SelectItem>
                       <SelectItem value="utc+1">CET (Paris)</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle>Preferences</CardTitle>
               <CardDescription>Customize your workspace experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               
               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-base">Theme</Label>
                     <p className="text-xs text-slate-500">Select your interface color theme.</p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
                     <button 
                        onClick={() => setTheme('light')}
                        className={`p-2 rounded-md transition-all ${theme === 'light' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                        <Sun className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => setTheme('dark')}
                        className={`p-2 rounded-md transition-all ${theme === 'dark' ? 'bg-slate-800 shadow-sm text-white' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                        <Moon className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => setTheme('system')}
                        className={`p-2 rounded-md transition-all ${theme === 'system' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                     >
                        <Smartphone className="w-4 h-4" />
                     </button>
                  </div>
               </div>

               <Separator />

               <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                     <Label className="text-base">AI Copilot Mode</Label>
                     <p className="text-xs text-slate-500">Enable proactive AI suggestions.</p>
                  </div>
                  <Switch defaultChecked />
               </div>

               <Separator />

               <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                     <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="en">English (United States)</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
             <Button onClick={handleSave} disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700 min-w-[140px]">
                {isLoading ? <span className="flex items-center gap-2"><Zap className="w-4 h-4 animate-spin" /> Saving...</span> : "Save Changes"}
             </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
