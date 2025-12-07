import React, { useState } from 'react';
import { DollarSign, Sparkles, Plus, Info } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Switch } from '../../ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { TagInput } from '../common/TagInput';
import { Slider } from '../../ui/slider';
import { Badge } from '../../ui/badge';

export const StepFunding = () => {
  const [isRaising, setIsRaising] = useState(true);
  const [raiseAmount, setRaiseAmount] = useState([2000000]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Left Column: Funding Inputs */}
      <div className="lg:col-span-2 space-y-6">
         
         {/* Fundraising Status */}
         <Card className={`transition-all duration-300 ${isRaising ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-slate-200'}`}>
            <CardHeader className="pb-4">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Fundraising Status</CardTitle>
                    <p className="text-sm text-slate-500">Are you currently raising capital?</p>
                  </div>
                  <Switch checked={isRaising} onCheckedChange={setIsRaising} />
               </div>
            </CardHeader>
            
            {isRaising && (
              <CardContent className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300 pt-0">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <Label className="text-base">Target Raise Amount</Label>
                        <div className="font-mono text-lg font-bold text-indigo-600">
                           ${(raiseAmount[0]).toLocaleString()}
                        </div>
                     </div>
                     <Slider 
                        defaultValue={[2000000]} 
                        max={10000000} 
                        step={100000} 
                        value={raiseAmount}
                        onValueChange={setRaiseAmount}
                        className="py-4"
                     />
                     <div className="flex justify-between text-xs text-slate-400 px-1">
                        <span>$0</span>
                        <span>$5M</span>
                        <span>$10M+</span>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <Label>Use of Funds</Label>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-indigo-600 hover:text-indigo-700 bg-indigo-50/50">
                           <Sparkles className="w-3 h-3 mr-1" /> AI Suggest
                        </Button>
                     </div>
                     <TagInput placeholder="e.g. Engineering, Sales, Marketing" tags={["Product Development", "GTM"]} />
                     <p className="text-xs text-slate-500">What will this capital enable you to achieve over the next 18 months?</p>
                  </div>
              </CardContent>
            )}
         </Card>

         {/* Funding History Table */}
         <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
               <div className="space-y-1">
                  <CardTitle className="text-lg">Capitalization Table</CardTitle>
                  <p className="text-sm text-slate-500">Previous funding rounds and major investors.</p>
               </div>
               <Button size="sm" variant="outline"><Plus className="w-3 h-3 mr-1" /> Add Round</Button>
            </CardHeader>
            <CardContent>
               <Table>
                  <TableHeader>
                     <TableRow>
                        <TableHead>Round</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Investors</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     <TableRow>
                        <TableCell className="font-medium">
                           <Badge variant="outline" className="bg-slate-50 font-normal">Pre-Seed</Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">Jan 2023</TableCell>
                        <TableCell>$500,000</TableCell>
                        <TableCell className="text-slate-500">Angel List, YC</TableCell>
                     </TableRow>
                     <TableRow>
                        <TableCell className="font-medium">
                           <Badge variant="outline" className="bg-slate-50 font-normal">Seed</Badge>
                        </TableCell>
                        <TableCell className="text-slate-500">Nov 2023</TableCell>
                        <TableCell>$1,200,000</TableCell>
                        <TableCell className="text-slate-500">Sequoia Arc</TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

      </div>

      {/* Right Column: Gemini Valuation Card */}
      <div className="space-y-6">
         <Card className="bg-gradient-to-br from-white to-indigo-50/30 border-indigo-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-3">
               <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <CardHeader>
               <CardTitle className="flex items-center gap-2 text-indigo-900">
                  Gemini Valuation
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none text-[10px]">BETA</Badge>
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-1">
                  <div className="text-sm text-slate-500">Estimated Range</div>
                  <div className="text-3xl font-bold text-slate-900 tracking-tight">
                     $8M - $12M
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 mt-1">
                     <div className="w-2 h-2 rounded-full bg-emerald-500" />
                     High Confidence
                  </div>
               </div>

               <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-indigo-100/50">
                  <div className="flex gap-3">
                     <Info className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-slate-600 leading-relaxed">
                        Based on your <strong>25% MoM growth</strong> and market comparables in the <strong>SaaS</strong> sector, Gemini places you in the top decile of Seed stage startups.
                     </p>
                  </div>
               </div>

               <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs text-slate-500">
                     <span>Comparable Deals</span>
                     <span className="font-medium text-slate-900">142 analyzed</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                     <span>Sector Multiplier</span>
                     <span className="font-medium text-slate-900">8x - 12x ARR</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-500 flex gap-3">
            <div className="bg-white p-2 rounded-full border border-slate-200 h-8 w-8 flex items-center justify-center shadow-sm">💡</div>
            <div className="pt-1">
               <span className="font-medium text-slate-900 block mb-1">Investor Tip</span>
               Investors will look for a clear plan on how the $2M will get you to $100k MRR within 18 months.
            </div>
         </div>
      </div>

    </div>
  );
};
