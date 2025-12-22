import React from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Share2, 
  AlertTriangle 
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';

export const StepSummary = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Profile Strength */}
      <Card className="bg-[#1A1A1A] text-white border-0 overflow-hidden relative rounded-2xl shadow-lg shadow-black/10">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         
         <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
               <div>
                  <h2 className="text-2xl font-serif font-medium">Profile Strength</h2>
                  <p className="text-[#9CA3AF] font-sans mt-1">Your startup profile is looking great! Add a few more details to reach 100%.</p>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium font-sans">
                     <span className="text-[#DCFCE7]">Excellent</span>
                     <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-white/10" indicatorClassName="bg-white" />
               </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 min-w-[260px] backdrop-blur-sm border border-white/10">
               <h4 className="text-sm font-bold mb-3 flex items-center gap-2 font-sans text-white">
                  <AlertTriangle className="w-4 h-4 text-[#FDE68A]" /> Missing Items
               </h4>
               <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-[#D1D5DB] font-sans">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#FDE68A]" /> Founder bio missing
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#D1D5DB] font-sans">
                     <div className="w-1.5 h-1.5 rounded-full bg-[#FDE68A]" /> No funding rounds
                  </li>
               </ul>
            </div>
         </CardContent>
      </Card>

      {/* AI Summary Review */}
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-medium text-[#1A1A1A]">AI Generated Summary</h3>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="text-[#6B7280] hover:bg-[#F7F7F5] border-[#E5E5E5] font-sans font-medium">
                  Expand Summary
               </Button>
               <Button variant="outline" size="sm" className="text-[#6B7280] hover:bg-[#F7F7F5] border-[#E5E5E5] font-sans font-medium">
                  Regenerate
               </Button>
               <Button variant="outline" size="sm" className="text-[#6B21A8] bg-[#F3E8FF] border-[#E9D5FF] hover:bg-[#E9D5FF] font-sans font-medium">
                  <Sparkles className="w-4 h-4 mr-2" /> Improve with AI
               </Button>
            </div>
         </div>

         <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
            <CardContent className="p-8 space-y-6">
               <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-serif font-medium text-2xl shadow-md">
                     A
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-2xl font-serif font-medium text-[#1A1A1A]">Acme Corp</h2>
                     <p className="text-[#6B7280] text-lg font-sans">Visual collaboration platform for marketing teams.</p>
                     <div className="flex gap-2 pt-2">
                        <Badge variant="secondary" className="bg-[#F7F7F5] text-[#1A1A1A] hover:bg-[#E5E5E5] font-sans">B2B SaaS</Badge>
                        <Badge variant="secondary" className="bg-[#F7F7F5] text-[#1A1A1A] hover:bg-[#E5E5E5] font-sans">Pre-Seed</Badge>
                        <Badge variant="secondary" className="bg-[#F7F7F5] text-[#1A1A1A] hover:bg-[#E5E5E5] font-sans">San Francisco</Badge>
                     </div>
                  </div>
               </div>

               <Separator className="bg-[#E5E5E5]" />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <h4 className="font-bold text-[#1A1A1A] font-sans">Problem & Solution</h4>
                     <p className="text-[#4A4F5B] text-sm leading-relaxed font-sans">
                        Marketing teams struggle with fragmented feedback loops across email and Slack, leading to 30% slower project delivery. Acme provides a centralized canvas for real-time annotation and approval, reducing review time by 5x.
                     </p>
                  </div>
                  <div className="space-y-3">
                     <h4 className="font-bold text-[#1A1A1A] font-sans">Market & Business Model</h4>
                     <p className="text-[#4A4F5B] text-sm leading-relaxed font-sans">
                        Targeting the $15B marketing collaboration market. Freemium model with $29/seat/month pro tier. Currently serving 150+ teams including 3 Fortune 500 pilots.
                     </p>
                  </div>
               </div>

               <Separator className="bg-[#E5E5E5]" />

               <div className="flex justify-between items-center bg-[#F7F7F5] p-5 rounded-xl border border-[#E5E5E5]">
                  <div className="flex gap-10">
                     <div>
                        <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-bold font-sans">MRR</div>
                        <div className="text-xl font-serif font-medium text-[#1A1A1A] mt-1">$12.5k</div>
                     </div>
                     <div>
                        <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-bold font-sans">Growth</div>
                        <div className="text-xl font-serif font-medium text-[#166534] mt-1">+15%</div>
                     </div>
                     <div>
                        <div className="text-xs text-[#9CA3AF] uppercase tracking-wider font-bold font-sans">Team</div>
                        <div className="text-xl font-serif font-medium text-[#1A1A1A] mt-1">3 Ftrs</div>
                     </div>
                  </div>
                  <Button variant="ghost" className="text-[#6B7280] hover:text-[#1A1A1A] font-sans font-medium">Edit Details</Button>
               </div>

            </CardContent>
         </Card>
      </div>

    </div>
  );
};
