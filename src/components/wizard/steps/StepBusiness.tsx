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
        <Card className="h-full border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
           <CardHeader className="pb-4 border-b border-[#E5E5E5]">
              <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Business Fundamentals</CardTitle>
           </CardHeader>
           <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Business Model</Label>
                    <Select>
                       <SelectTrigger className="h-10 border-[#E5E5E5] rounded-lg font-sans">
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
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Pricing Model</Label>
                    <Select>
                       <SelectTrigger className="h-10 border-[#E5E5E5] rounded-lg font-sans">
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
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Customer Segments</Label>
                 <TagInput placeholder="e.g. SMBs, Enterprise, Developers" tags={["Marketing Agencies"]} />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Key Features</Label>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-[#6B21A8] hover:text-[#4A0E8F] hover:bg-[#F3E8FF] font-sans font-medium">
                       <Sparkles className="w-3 h-3 mr-1.5" /> Generate List
                    </Button>
                 </div>
                 <TagInput placeholder="Add feature..." tags={["Real-time collab", "Asset Management"]} />
              </div>

              <div className="space-y-2">
                 <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Competitors</Label>
                 <TagInput placeholder="Add competitor..." />
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Core Differentiator</Label>
                    <Button variant="ghost" size="sm" className="h-6 text-xs text-[#6B21A8] hover:text-[#4A0E8F] hover:bg-[#F3E8FF] font-sans font-medium">
                       <Sparkles className="w-3 h-3 mr-1.5" /> Suggest
                    </Button>
                 </div>
                 <Textarea placeholder="What makes you unique?" className="min-h-[80px] border-[#E5E5E5] rounded-xl font-sans resize-none" />
              </div>

              <div className="bg-[#F3E8FF] border border-[#E9D5FF] rounded-xl p-4 flex gap-3">
                 <Sparkles className="w-4 h-4 text-[#A855F7] flex-shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <p className="text-xs font-bold text-[#6B21A8] font-sans uppercase tracking-wider">Gemini Insight</p>
                    <p className="text-xs text-[#4A0E8F] leading-relaxed font-sans font-medium">
                       Strong differentiators usually focus on <strong>proprietary technology</strong> or <strong>network effects</strong> rather than just "better UX".
                    </p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Right: Social & Links */}
      <div className="space-y-6">
         <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
            <CardHeader className="pb-4 border-b border-[#E5E5E5]">
               <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Social Presence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Website URL</Label>
                  <div className="relative">
                     <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                     <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="https://..." />
                  </div>
               </div>
               
               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">LinkedIn Company Page</Label>
                  <div className="relative">
                     <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                     <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="linkedin.com/company/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">X / Twitter</Label>
                  <div className="relative">
                     <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                     <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="twitter.com/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">GitHub Organization</Label>
                  <div className="relative">
                     <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                     <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="github.com/..." />
                  </div>
               </div>

               <div className="space-y-2">
                  <Label className="text-sm font-bold text-[#1A1A1A] font-sans">Pitch Deck Link</Label>
                  <div className="relative">
                     <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                     <Input className="pl-10 h-10 border-[#E5E5E5] rounded-lg font-sans" placeholder="DocSend or Slides link..." />
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="bg-[#1A1A1A] rounded-2xl p-8 text-white relative overflow-hidden shadow-lg shadow-black/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
               <h4 className="font-serif font-medium text-xl mb-2">Need a Pitch Deck?</h4>
               <p className="text-white/70 text-sm mb-6 font-sans">Use our AI editor to generate a investor-ready deck based on your profile.</p>
               <Button className="w-full bg-white text-[#1A1A1A] hover:bg-[#F7F7F5] font-sans font-bold h-11 rounded-xl border-0">Launch Deck Editor</Button>
            </div>
         </div>
      </div>

    </div>
  );
};
