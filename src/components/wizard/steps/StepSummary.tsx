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
      <Card className="bg-slate-900 text-white border-0 overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
         
         <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 space-y-4">
               <div>
                  <h2 className="text-2xl font-bold">Profile Strength</h2>
                  <p className="text-slate-400">Your startup profile is looking great! Add a few more details to reach 100%.</p>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                     <span className="text-emerald-400">Excellent</span>
                     <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-slate-700" indicatorClassName="bg-emerald-500" />
               </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 min-w-[260px] backdrop-blur-sm border border-white/10">
               <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Missing Items
               </h4>
               <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Founder bio missing
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-300">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> No funding rounds
                  </li>
               </ul>
            </div>
         </CardContent>
      </Card>

      {/* AI Summary Review */}
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">AI Generated Summary</h3>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="text-slate-600 hover:bg-slate-50">
                  Expand Summary
               </Button>
               <Button variant="outline" size="sm" className="text-slate-600 hover:bg-slate-50">
                  Regenerate
               </Button>
               <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                  <Sparkles className="w-4 h-4 mr-2" /> Improve with AI
               </Button>
            </div>
         </div>

         <Card>
            <CardContent className="p-8 space-y-6">
               <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 text-indigo-700 font-bold text-xl">
                     A
                  </div>
                  <div className="space-y-1">
                     <h2 className="text-2xl font-bold text-slate-900">Acme Corp</h2>
                     <p className="text-slate-500 text-lg">Visual collaboration platform for marketing teams.</p>
                     <div className="flex gap-2 pt-1">
                        <Badge variant="secondary">B2B SaaS</Badge>
                        <Badge variant="secondary">Pre-Seed</Badge>
                        <Badge variant="secondary">San Francisco</Badge>
                     </div>
                  </div>
               </div>

               <Separator />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <h4 className="font-semibold text-slate-900">Problem & Solution</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Marketing teams struggle with fragmented feedback loops across email and Slack, leading to 30% slower project delivery. Acme provides a centralized canvas for real-time annotation and approval, reducing review time by 5x.
                     </p>
                  </div>
                  <div className="space-y-3">
                     <h4 className="font-semibold text-slate-900">Market & Business Model</h4>
                     <p className="text-slate-600 text-sm leading-relaxed">
                        Targeting the $15B marketing collaboration market. Freemium model with $29/seat/month pro tier. Currently serving 150+ teams including 3 Fortune 500 pilots.
                     </p>
                  </div>
               </div>

               <Separator />

               <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="flex gap-8">
                     <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">MRR</div>
                        <div className="text-xl font-bold text-slate-900">$12.5k</div>
                     </div>
                     <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Growth</div>
                        <div className="text-xl font-bold text-green-600">+15%</div>
                     </div>
                     <div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Team</div>
                        <div className="text-xl font-bold text-slate-900">3 Ftrs</div>
                     </div>
                  </div>
                  <Button variant="ghost" className="text-slate-400">Edit Details</Button>
               </div>

            </CardContent>
         </Card>
      </div>

    </div>
  );
};
