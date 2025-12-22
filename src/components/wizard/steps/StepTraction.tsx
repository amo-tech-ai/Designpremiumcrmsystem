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
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* MRR Card */}
            <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
               <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <Label className="text-[#6B7280] font-sans font-medium">Monthly Revenue (MRR)</Label>
                     <div className="p-1.5 bg-[#DCFCE7] rounded-md text-[#166534]">
                        <TrendingUp className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                     <span className="text-2xl font-serif font-medium text-[#1A1A1A]">$</span>
                     <Input className="text-3xl font-serif font-medium border-none shadow-none p-0 h-auto w-full focus-visible:ring-0 placeholder:text-[#E5E5E5] text-[#1A1A1A]" placeholder="0.00" defaultValue="14,200" />
                  </div>
                  <div className="h-16 -mx-2">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#166534" stopOpacity={0.1}/>
                                 <stop offset="95%" stopColor="#166534" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <Area type="monotone" dataKey="value" stroke="#166534" fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                     </ResponsiveContainer>
                  </div>
               </CardContent>
            </Card>

            {/* Users Card */}
            <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
               <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                     <Label className="text-[#6B7280] font-sans font-medium">Total Users / Waitlist</Label>
                     <div className="p-1.5 bg-[#F7F7F5] rounded-md text-[#1A1A1A]">
                        <Users className="w-4 h-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-1 mb-2">
                     <Input className="text-3xl font-serif font-medium border-none shadow-none p-0 h-auto w-full focus-visible:ring-0 placeholder:text-[#E5E5E5] text-[#1A1A1A]" placeholder="0" type="number" defaultValue="2500" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                     <div className="px-2 py-1 bg-[#DCFCE7] text-[#166534] rounded text-xs font-bold flex items-center font-sans">
                        <TrendingUp className="w-3 h-3 mr-1" /> +15% MoM
                     </div>
                     <Label className="text-xs text-[#9CA3AF] font-sans">Growth Rate</Label>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* Growth Chart Detail */}
         <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
            <CardHeader className="pb-4 border-b border-[#E5E5E5]">
               <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Growth Trajectory</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorBlack" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E5E5', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}
                            itemStyle={{ color: '#1A1A1A', fontFamily: 'Inter' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#1A1A1A" fill="url(#colorBlack)" strokeWidth={2} />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
               
               {/* AI Insight Inline */}
               <div className="mt-6 bg-[#F3E8FF] rounded-xl p-4 border border-[#E9D5FF] flex gap-3 items-start">
                  <Sparkles className="w-5 h-5 text-[#A855F7] flex-shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold text-[#6B21A8] font-sans">Gemini Analysis</p>
                     <p className="text-sm text-[#4A0E8F] mt-1 font-sans">
                        Based on your $14k MRR, traction appears <strong>Early Stage</strong>. Your 15% MoM growth is strong for this stage. AI can help validate your retention metrics in the next step.
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card>

      </div>

      {/* Right Column: Milestones */}
      <div className="space-y-6">
         <Card className="h-full border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
            <CardHeader className="pb-4 border-b border-[#E5E5E5]">
               <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Key Milestones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
               {milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F7F5] transition-colors cursor-pointer border border-transparent hover:border-[#E5E5E5]">
                     <div className={`mt-0.5 ${milestone.checked ? 'text-[#166534]' : 'text-[#D1D5DB]'}`}>
                        {milestone.checked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                     </div>
                     <div>
                        <div className={`font-medium font-sans ${milestone.checked ? 'text-[#1A1A1A]' : 'text-[#6B7280]'}`}>
                           {milestone.label}
                        </div>
                        {milestone.checked && (
                           <div className="text-xs text-[#166534] mt-0.5 font-bold">Completed</div>
                        )}
                     </div>
                  </div>
               ))}
               
               <button className="w-full py-3 text-sm text-[#1A1A1A] font-bold border border-dashed border-[#E5E5E5] rounded-xl hover:bg-[#F7F7F5] hover:border-[#1A1A1A] transition-colors mt-4 font-sans">
                  + Add Custom Milestone
               </button>
            </CardContent>
         </Card>
      </div>

    </div>
  );
};
