import React from 'react';
import { Sparkles, Link as LinkIcon, Github, Globe, Twitter, Linkedin } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { TagInput } from '../common/TagInput';

export const StepBusiness = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Left: Business Model */}
      <div className="space-y-6">
        <Card className="h-full">
           <CardHeader>
              <CardTitle className="text-lg">Business Fundamentals</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Business Model</Label>
                    <Select>
                       <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="b2b">B2B</SelectItem>
                          <SelectItem value="b2c">B2C</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                          <SelectItem value="b2b2c">B2B2C</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label>Pricing Model</Label>
                    <Select>
                       <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="saas">SaaS Subscription</SelectItem>
                          <SelectItem value="transactional">Transactional</SelectItem>
                          <SelectItem value="usage">Usage Based</SelectItem>
                          <SelectItem value="freemium">Freemium</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
              </div>

              <div className="space-y-2">
                 <Label>Customer Segments</Label>
                 <TagInput placeholder="e.g. SMBs, Enterprise, Developers" tags={["Marketing Agencies"]} />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label>Key Features</Label>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-indigo-600 hover:text-indigo-700">
                       <Sparkles className="w-3 h-3 mr-1" /> Generate List
                    </Button>
                 </div>
                 <TagInput placeholder="Add feature..." tags={["Real-time collab", "Asset Management"]} />
              </div>

              <div className="space-y-2">
                 <Label>Competitors</Label>
                 <TagInput placeholder="Add competitor..." />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label>Core Differentiator</Label>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-indigo-600 hover:text-indigo-700">
                       <Sparkles className="w-3 h-3 mr-1" /> Suggest
                    </Button>
                 </div>
                 <Textarea placeholder="What makes you unique?" className="min-h-[80px]" />
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 flex gap-3">
                 <Sparkles className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <p className="text-xs font-semibold text-indigo-900">Gemini Insight</p>
                    <p className="text-xs text-indigo-700 leading-relaxed">
                       Strong differentiators usually focus on <strong>proprietary technology</strong> or <strong>network effects</strong> rather than just "better UX".
                    </p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Right: Social & Links */}
      <div className="space-y-6">
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Social Presence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label>Website URL</Label>
                  <div className="relative">
                     <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <Input className="pl-10" placeholder="https://..." />
                  </div>
               </div>
               
               <div className="space-y-2">
                  <Label>LinkedIn Company Page</Label>
                  <div className="relative">
                     <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <Input className="pl-10" placeholder="linkedin.com/company/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label>X / Twitter</Label>
                  <div className="relative">
                     <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <Input className="pl-10" placeholder="twitter.com/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label>GitHub Organization</Label>
                  <div className="relative">
                     <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <Input className="pl-10" placeholder="github.com/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label>Pitch Deck Link</Label>
                  <div className="relative">
                     <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                     <Input className="pl-10" placeholder="DocSend or Slides link..." />
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="bg-indigo-900 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
               <h4 className="font-bold text-lg mb-2">Need a Pitch Deck?</h4>
               <p className="text-indigo-200 text-sm mb-4">Use our AI editor to generate a investor-ready deck based on your profile.</p>
               <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50">Launch Deck Editor</Button>
            </div>
         </div>
      </div>

    </div>
  );
};
