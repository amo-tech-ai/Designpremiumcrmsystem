import React from 'react';
import { TrendingUp, Users, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', value: 1000 },
  { name: 'Feb', value: 2500 },
  { name: 'Mar', value: 4200 },
  { name: 'Apr', value: 5800 },
  { name: 'May', value: 9500 },
  { name: 'Jun', value: 14200 },
];

const milestones = [
  { id: 1, label: 'MVP Launched', checked: true },
  { id: 2, label: 'First Paying Customer', checked: true },
  { id: 3, label: 'Product-Market Fit', checked: false },
  { id: 4, label: 'Break-even Revenue', checked: false },
  { id: 5, label: 'Series A Funding', checked: false },
];

export const StepTraction = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Column: Metrics */}
      <div className="lg:col-span-2 space-y-6">
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MRR Card */}
            <Card>
               <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <Label className="text-slate-500 font-medium">Monthly Revenue (MRR)</Label>
                     <div className="p-1.5 bg-emerald-100 rounded text-emerald-700">
                        <TrendingUp className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                     <span className="text-2xl font-bold text-slate-900">$</span>
                     <Input className="text-3xl font-bold border-none shadow-none p-0 h-auto w-full focus-visible:ring-0 placeholder:text-slate-300" placeholder="0.00" defaultValue="14,200" />
                  </div>
                  <div className="h-16 -mx-2">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            {/* Users Card */}
            <Card>
               <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <Label className="text-slate-500 font-medium">Total Users / Waitlist</Label>
                     <div className="p-1.5 bg-blue-100 rounded text-blue-700">
                        <Users className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                     <Input className="text-3xl font-bold border-none shadow-none p-0 h-auto w-full focus-visible:ring-0 placeholder:text-slate-300" placeholder="0" type="number" defaultValue="2500" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-medium flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" /> +15% MoM
                     </div>
                     <Label className="text-xs text-slate-400">Growth Rate</Label>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Growth Chart Detail */}
         <Card>
            <CardHeader>
               <CardTitle className="text-lg">Growth Trajectory</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorIndigo" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#6366f1" fill="url(#colorIndigo)" strokeWidth={3} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               
               {/* AI Insight Inline */}
               <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100 flex gap-3 items-start">
                  <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-medium text-indigo-900">Gemini Analysis</p>
                     <p className="text-sm text-indigo-700 mt-1">
                        Based on your $14k MRR, traction appears <strong>Early Stage</strong>. Your 15% MoM growth is strong for this stage. AI can help validate your retention metrics in the next step.
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

      </div>

      {/* Right Column: Milestones */}
      <div className="space-y-6">
         <Card className="h-full">
            <CardHeader>
               <CardTitle className="text-lg">Key Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100">
                     <div className={`mt-0.5 ${milestone.checked ? 'text-emerald-500' : 'text-slate-300'}`}>
                        {milestone.checked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                     </div>
                     <div>
                        <div className={`font-medium ${milestone.checked ? 'text-slate-900' : 'text-slate-500'}`}>
                           {milestone.label}
                        </div>
                        {milestone.checked && (
                           <div className="text-xs text-emerald-600 mt-0.5">Completed</div>
                        )}
                     </div>
                  </div>
               ))}
               
               <button className="w-full py-3 text-sm text-indigo-600 font-medium border border-dashed border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors mt-4">
                  + Add Custom Milestone
               </button>
            </CardContent>
         </Card>
      </div>

    </div>
  );
};
