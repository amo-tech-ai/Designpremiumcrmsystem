import React from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Link as LinkIcon 
} from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { cn } from '../ui/utils';
import { format } from 'date-fns';
import { EventWizardData } from './types';

interface EventWizardStep1Props {
  data: EventWizardData;
  updateData: (updates: Partial<EventWizardData>) => void;
}

export const EventWizardStep1: React.FC<EventWizardStep1Props> = ({ data, updateData }) => {
  const [dateOpen, setDateOpen] = React.useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
      
      {/* Main Form Column - Centered visually relative to the layout */}
      <div className="lg:col-span-8 flex flex-col items-center lg:items-start w-full">
        <Card className="w-full max-w-[720px] bg-white border border-[#E5E5E5] shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-white border-b border-[#F7F7F5] px-8 py-6">
             <CardTitle className="font-serif text-2xl text-[#1A1A1A]">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            
            {/* 1) Event Basics */}
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#6B21A8]">1</span>
                Event Basics
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[#1A1A1A] font-medium">Event Name</Label>
                  <Input 
                    placeholder="e.g. AI Founders Summit 2025" 
                    value={data.eventName}
                    onChange={(e) => updateData({ eventName: e.target.value })}
                    className="h-12 border-[#E5E5E5] focus-visible:ring-[#6B21A8] text-lg rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1A1A1A] font-medium">Description</Label>
                  <Textarea 
                     placeholder="Describe the vibe, theme, and main activities of the event..."
                     className="min-h-[100px] border-[#E5E5E5] rounded-xl resize-none text-base"
                     value={data.eventDescription}
                     onChange={(e) => updateData({ eventDescription: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="space-y-2">
                      <Label className="text-[#1A1A1A] font-medium">Event Type</Label>
                      <Select 
                        value={data.eventType} 
                        onValueChange={(val) => updateData({ eventType: val })}
                      >
                        <SelectTrigger className="h-12 border-[#E5E5E5] rounded-xl">
                          <SelectValue placeholder="Select type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="meetup">Meetup / Networking</SelectItem>
                          <SelectItem value="fashion_show">Fashion Show</SelectItem>
                          <SelectItem value="launch">Product Launch</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="hackathon">Hackathon</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                   
                   <div className="space-y-2">
                      <Label className="text-[#1A1A1A] font-medium">Primary Goal</Label>
                      <Select 
                        value={data.primaryGoal} 
                        onValueChange={(val) => updateData({ primaryGoal: val })}
                      >
                        <SelectTrigger className="h-12 border-[#E5E5E5] rounded-xl">
                          <SelectValue placeholder="What's success look like?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                          <SelectItem value="lead_gen">Lead Generation</SelectItem>
                          <SelectItem value="networking">Community Building</SelectItem>
                          <SelectItem value="sales">Direct Sales</SelectItem>
                          <SelectItem value="education">Education / Training</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>
                </div>
              </div>
            </section>

            <div className="h-px bg-[#F3F4F6]" />

            {/* 2) Audience & Location */}
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#6B21A8]">2</span>
                Audience & Location
              </h3>
              
              <div className="space-y-4">
                 <div className="space-y-2">
                    <Label className="text-[#1A1A1A] font-medium">Audience Persona</Label>
                    <Input 
                       placeholder="e.g. Early-stage founders and VCs"
                       value={data.audiencePersona}
                       onChange={(e) => updateData({ audiencePersona: e.target.value })}
                       className="h-12 border-[#E5E5E5] rounded-xl"
                    />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                       <Label className="text-[#1A1A1A] font-medium">Expected Attendees</Label>
                       <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input 
                            type="number"
                            placeholder="100" 
                            className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                            value={data.expectedAttendees}
                            onChange={(e) => updateData({ expectedAttendees: e.target.value })}
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-[#1A1A1A] font-medium">City / Venue</Label>
                       <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input 
                             placeholder="San Francisco, CA" 
                             className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                             value={data.cityOrVenue}
                             onChange={(e) => updateData({ cityOrVenue: e.target.value })}
                          />
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            <div className="h-px bg-[#F3F4F6]" />

            {/* 3) Date & Budget */}
            <section className="space-y-5">
              <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#6B21A8]">3</span>
                Date & Budget
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                 <div className="space-y-2 md:col-span-1">
                    <Label className="text-[#1A1A1A] font-medium">Event Date</Label>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-12 justify-start text-left font-normal border-[#E5E5E5] rounded-xl",
                            !data.eventDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data.eventDate ? format(data.eventDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={data.eventDate}
                          onSelect={(d) => {
                             updateData({ eventDate: d });
                             setDateOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[#1A1A1A] font-medium">Duration (Hours)</Label>
                    <div className="relative">
                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input 
                         type="number"
                         placeholder="4" 
                         className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                         value={data.durationHours}
                         onChange={(e) => updateData({ durationHours: e.target.value })}
                       />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <Label className="text-[#1A1A1A] font-medium">Budget</Label>
                    <div className="relative">
                       <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <Input 
                         type="number"
                         placeholder="5000" 
                         className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                         value={data.budgetAmount}
                         onChange={(e) => updateData({ budgetAmount: e.target.value })}
                       />
                    </div>
                 </div>
              </div>
            </section>

            <div className="h-px bg-[#F3F4F6]" />

            {/* 4) URLs for AI Context */}
            <section className="space-y-5">
               <div className="flex justify-between items-end">
                  <h3 className="text-sm font-bold text-[#6B21A8] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#6B21A8]">4</span>
                    AI Context & Links
                  </h3>
                  <span className="text-xs text-[#6B7280] bg-[#F7F7F5] px-2 py-1 rounded">
                     Gemini will analyze these automatically
                  </span>
               </div>
               
               <div className="space-y-4">
                  <div className="space-y-2">
                     <Label className="text-[#1A1A1A] font-medium">Venue URL</Label>
                     <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                           placeholder="https://venue-website.com" 
                           className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                           value={data.venueUrl}
                           onChange={(e) => updateData({ venueUrl: e.target.value })}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-[#1A1A1A] font-medium">Inspiration / Sponsor URLs</Label>
                     <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Textarea 
                           placeholder="Paste links to similar events, sponsor pages, or mood boards..."
                           className="pl-10 min-h-[80px] border-[#E5E5E5] rounded-xl resize-none pt-3"
                           value={data.inspirationUrls.join('\n')}
                           onChange={(e) => updateData({ inspirationUrls: e.target.value.split('\n') })}
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-[#1A1A1A] font-medium">Additional Search Terms</Label>
                     <div className="relative">
                        <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                           placeholder="e.g. sustainable catering san francisco, tech event photographers" 
                           className="pl-10 h-12 border-[#E5E5E5] rounded-xl"
                           value={data.searchTerms}
                           onChange={(e) => updateData({ searchTerms: e.target.value })}
                        />
                        <p className="mt-2 text-xs text-[#6B7280]">
                           Keywords for Gemini to use when researching vendors and ideas.
                        </p>
                     </div>
                  </div>
               </div>
            </section>

          </CardContent>
        </Card>
      </div>

      {/* Right Side - Sticky Helper Card */}
      <div className="lg:col-span-4 relative">
         <div className="sticky top-0 space-y-6">
            <Card className="bg-[#1A1A1A] text-white border-0 shadow-lg rounded-2xl overflow-hidden relative">
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#6B21A8] to-[#9C7AFE] opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               
               <CardContent className="p-6 relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                        <Sparkles className="w-5 h-5 text-white" />
                     </div>
                     <div>
                        <h3 className="font-serif text-lg font-medium leading-tight">What AI Will Generate</h3>
                        <p className="text-xs text-white/60">Powered by Gemini 3 Pro</p>
                     </div>
                  </div>

                  <div className="space-y-4">
                     {[
                        "Full event plan & logistics",
                        "Detailed timeline & task list",
                        "Marketing landing page copy",
                        "Budget breakdown & risk detection",
                        "Sponsor outreach emails"
                     ].map((item, i) => (
                        <div key={i} className="flex gap-3 items-start">
                           <div className="mt-1">
                              <CheckCircle2 className="w-4 h-4 text-[#A855F7]" />
                           </div>
                           <span className="text-sm text-white/90 font-light">{item}</span>
                        </div>
                     ))}
                  </div>

                  <div className="pt-6 border-t border-white/10">
                     <p className="text-xs text-white/50 leading-relaxed italic">
                        "Gemini will cross-reference your budget with local venue data to ensure feasibility."
                     </p>
                  </div>
               </CardContent>
            </Card>

            {/* Optional tip card below */}
            <div className="bg-[#F3E8FF] rounded-xl p-4 border border-[#E9D5FF]">
               <p className="text-xs text-[#6B21A8] font-medium leading-relaxed">
                  💡 Tip: Adding specific URLs helps the AI match the vibe and logistics of your venue.
               </p>
            </div>
         </div>
      </div>

    </div>
  );
};
