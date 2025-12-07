import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Save, 
  X, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  UploadCloud, 
  Plus, 
  Trash2, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Building2, 
  Image as ImageIcon, 
  FileText, 
  PlayCircle,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { toast } from "sonner@2.0.3";

// --- Mock Data & Types ---

const MOCK_METRICS_DATA = [
  { month: 'Jan', revenue: 12000, users: 150 },
  { month: 'Feb', revenue: 15000, users: 220 },
  { month: 'Mar', revenue: 18000, users: 310 },
  { month: 'Apr', revenue: 22000, users: 450 },
  { month: 'May', revenue: 28000, users: 600 },
  { month: 'Jun', revenue: 35000, users: 800 },
];

interface SectionProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({ title, description, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="px-6 pb-8 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="h-px w-full bg-slate-100 mb-6" />
          {children}
        </div>
      )}
    </Card>
  );
};

export const CompanyProfileEditor = ({ onSave, onCancel }: { onSave?: () => void, onCancel?: () => void }) => {
  const [isRaising, setIsRaising] = useState(true);
  
  // --- Render ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
            S
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">SkyOffice Profile</h1>
            <p className="text-xs text-slate-500">Last saved: Just now</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2" onClick={() => { toast.success('Profile saved successfully'); onSave?.(); }}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        {/* A. Company Basics */}
        <CollapsibleSection title="Company Basics" description="Core identity and contact information" icon={Building2}>
          <div className="space-y-6">
            {/* Logo & Cover */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <Label>Logo</Label>
                <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors">
                   <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5" />
                   </div>
                   <span className="text-xs font-medium">Upload</span>
                </div>
              </div>
              <div className="md:col-span-3 space-y-3">
                <Label>Cover Image</Label>
                <div className="h-32 w-full rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-600 cursor-pointer transition-colors">
                   <div className="flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">Upload Cover Banner (1200x400)</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="e.g. SkyOffice" defaultValue="SkyOffice" />
              </div>
              <div className="space-y-2">
                <Label>Year Founded</Label>
                <Input placeholder="2023" defaultValue="2023" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Short description of the company..." className="min-h-[100px]" defaultValue="SkyOffice is a virtual HQ for remote teams to collaborate in real-time." />
              </div>
              <div className="space-y-2">
                 <Label>Industry</Label>
                 <Select defaultValue="SaaS">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                       <SelectItem value="SaaS">SaaS</SelectItem>
                       <SelectItem value="Fintech">Fintech</SelectItem>
                       <SelectItem value="Health">Healthcare</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="space-y-2">
                 <Label>Website</Label>
                 <div className="relative">
                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <Input className="pl-9" defaultValue="https://skyoffice.com" />
                 </div>
              </div>
              <div className="space-y-2">
                 <Label>Contact Email</Label>
                 <Input defaultValue="hello@skyoffice.com" />
              </div>
              <div className="space-y-2">
                 <Label>Phone</Label>
                 <Input placeholder="+1 ..." />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* B. Location */}
        <CollapsibleSection title="Location" description="Headquarters and regional offices" icon={MapPin} defaultOpen={false}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                 <Label>HQ Country</Label>
                 <Select defaultValue="US">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                       <SelectItem value="US">United States</SelectItem>
                       <SelectItem value="UK">United Kingdom</SelectItem>
                       <SelectItem value="CA">Canada</SelectItem>
                    </SelectContent>
                 </Select>
              </div>
              <div className="space-y-2">
                 <Label>HQ City</Label>
                 <Input defaultValue="San Francisco" />
              </div>
           </div>
           
           <div className="border rounded-lg overflow-hidden">
              <Table>
                 <TableHeader className="bg-slate-50">
                    <TableRow>
                       <TableHead>Office Type</TableHead>
                       <TableHead>Location</TableHead>
                       <TableHead className="w-[100px]">Action</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    <TableRow>
                       <TableCell>Engineering Hub</TableCell>
                       <TableCell>Berlin, Germany</TableCell>
                       <TableCell><Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></Button></TableCell>
                    </TableRow>
                    <TableRow>
                       <TableCell className="text-slate-400 italic">Add new...</TableCell>
                       <TableCell className="text-slate-400 italic">--</TableCell>
                       <TableCell><Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button></TableCell>
                    </TableRow>
                 </TableBody>
              </Table>
           </div>
        </CollapsibleSection>

        {/* C. Brand Identity */}
        <CollapsibleSection title="Brand Identity" description="Positioning and mission" icon={CheckCircle2} defaultOpen={false}>
           <div className="space-y-6">
              <div className="space-y-2">
                 <Label>Tagline</Label>
                 <Input defaultValue="The Virtual HQ for remote teams" />
              </div>
              <div className="space-y-2">
                 <Label>Mission Statement</Label>
                 <Textarea defaultValue="To make remote work feel as connected and spontaneous as working in person." className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                 <Label>Category Tags</Label>
                 <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary" className="px-3 py-1">Productivity <X className="w-3 h-3 ml-2 cursor-pointer" /></Badge>
                    <Badge variant="secondary" className="px-3 py-1">Collaboration <X className="w-3 h-3 ml-2 cursor-pointer" /></Badge>
                    <Badge variant="secondary" className="px-3 py-1">Remote Work <X className="w-3 h-3 ml-2 cursor-pointer" /></Badge>
                    <Button variant="outline" size="sm" className="h-7 text-xs border-dashed">+ Add Tag</Button>
                 </div>
              </div>
           </div>
        </CollapsibleSection>

        {/* D. Team */}
        <CollapsibleSection title="Team" description="Founders and key leadership" icon={Users}>
           <div className="space-y-4">
              <div className="flex justify-end">
                 <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Founder</Button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                 <Table>
                    <TableHeader className="bg-slate-50">
                       <TableRow>
                          <TableHead>Founder</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Links</TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableRow>
                          <TableCell className="font-medium flex items-center gap-3">
                             <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" /><AvatarFallback>AJ</AvatarFallback></Avatar>
                             Alex Johnson
                          </TableCell>
                          <TableCell>CEO</TableCell>
                          <TableCell className="flex gap-2 text-slate-400">
                             <Linkedin className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                             <Twitter className="w-4 h-4 hover:text-blue-400 cursor-pointer" />
                          </TableCell>
                          <TableCell><Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-slate-400" /></Button></TableCell>
                       </TableRow>
                       <TableRow>
                          <TableCell className="font-medium flex items-center gap-3">
                             <Avatar className="w-8 h-8"><AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" /><AvatarFallback>MC</AvatarFallback></Avatar>
                             Maria Chen
                          </TableCell>
                          <TableCell>CTO</TableCell>
                          <TableCell className="flex gap-2 text-slate-400">
                             <Linkedin className="w-4 h-4 hover:text-blue-600 cursor-pointer" />
                             <Github className="w-4 h-4 hover:text-slate-900 cursor-pointer" />
                          </TableCell>
                          <TableCell><Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-slate-400" /></Button></TableCell>
                       </TableRow>
                    </TableBody>
                 </Table>
              </div>
           </div>
        </CollapsibleSection>

        {/* E. Traction & Metrics */}
        <CollapsibleSection title="Traction & Metrics" description="Key performance indicators" icon={TrendingUp}>
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white shadow-sm border-slate-200">
                 <CardContent className="p-4">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">MRR</div>
                    <div className="text-2xl font-bold text-slate-900">$35,000</div>
                    <div className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +15% this month</div>
                 </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-slate-200">
                 <CardContent className="p-4">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Total Users</div>
                    <div className="text-2xl font-bold text-slate-900">850</div>
                    <div className="text-xs text-green-600 font-medium mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +120 new</div>
                 </CardContent>
              </Card>
              <Card className="bg-white shadow-sm border-slate-200">
                 <CardContent className="p-4">
                    <div className="text-xs text-slate-500 uppercase font-bold mb-1">Revenue (YTD)</div>
                    <div className="text-2xl font-bold text-slate-900">$128k</div>
                 </CardContent>
              </Card>
           </div>

           <div className="h-[300px] w-full bg-white p-4 rounded-xl border border-slate-100 mb-6">
              <h4 className="text-sm font-bold text-slate-700 mb-4">Revenue & User Growth</h4>
              <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={MOCK_METRICS_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} prefix="$" />
                    <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                    <Tooltip 
                       contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                       itemStyle={{fontSize: '12px'}}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{r: 4, fill: '#6366f1'}} activeDot={{r: 6}} />
                    <Line yAxisId="right" type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
                 </LineChart>
              </ResponsiveContainer>
           </div>
        </CollapsibleSection>

        {/* F. Funding Section */}
        <CollapsibleSection title="Funding" description="Capital history and targets" icon={DollarSign}>
           <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
                 <div>
                    <h4 className="font-bold text-slate-900">Currently Raising?</h4>
                    <p className="text-sm text-slate-500">Signal investors that you are open to funding.</p>
                 </div>
                 <Switch checked={isRaising} onCheckedChange={setIsRaising} />
              </div>

              {isRaising && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                    <div className="space-y-2">
                       <Label>Target Amount</Label>
                       <div className="relative">
                          <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <Input className="pl-9" placeholder="1,000,000" defaultValue="500,000" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label>Use of Funds</Label>
                       <div className="flex flex-wrap gap-2">
                          {['Engineering', 'Marketing', 'Sales'].map(tag => (
                             <Badge key={tag} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 cursor-pointer">{tag}</Badge>
                          ))}
                          <Badge variant="outline" className="border-dashed cursor-pointer hover:bg-slate-50 text-slate-500">+ Add</Badge>
                       </div>
                    </div>
                 </div>
              )}

              <div className="border rounded-lg overflow-hidden">
                 <Table>
                    <TableHeader className="bg-slate-50">
                       <TableRow>
                          <TableHead>Round</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Investors</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableRow>
                          <TableCell className="font-medium">Pre-Seed</TableCell>
                          <TableCell>Feb 2023</TableCell>
                          <TableCell>$125,000</TableCell>
                          <TableCell>YC, Angels</TableCell>
                       </TableRow>
                    </TableBody>
                 </Table>
              </div>
           </div>
        </CollapsibleSection>

        {/* G. Media */}
        <CollapsibleSection title="Media" description="Gallery, decks, and videos" icon={PlayCircle} defaultOpen={false}>
           <div className="space-y-6">
              <div className="space-y-3">
                 <Label>Pitch Deck</Label>
                 <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
                       <FileText className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Upload Pitch Deck</h4>
                    <p className="text-xs text-slate-500 mt-1">PDF or PPTX up to 25MB</p>
                 </div>
              </div>

              <div className="space-y-3">
                 <Label>Gallery</Label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                       <ImageIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                       <ImageIcon className="w-8 h-8 text-slate-300" />
                    </div>
                    <div className="aspect-video border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50 cursor-pointer text-slate-400">
                       <Plus className="w-6 h-6" />
                    </div>
                 </div>
              </div>
           </div>
        </CollapsibleSection>

      </div>
    </div>
  );
};
