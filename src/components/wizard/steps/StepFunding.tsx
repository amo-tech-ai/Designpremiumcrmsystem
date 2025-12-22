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
         <Card className={`transition-all duration-300 rounded-2xl bg-white shadow-sm border ${isRaising ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]/5' : 'border-[#E5E5E5]'}`}>
            <CardHeader className="pb-4 border-b border-[#F7F7F5]">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Fundraising Status</CardTitle>
                    <p className="text-sm text-[#6B7280] font-sans">Are you currently raising capital?</p>
                  </div>
                  <Switch checked={isRaising} onCheckedChange={setIsRaising} className="data-[state=checked]:bg-[#1A1A1A]" />
               </div>
            </CardHeader>
            
            {isRaising && (
              <CardContent className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-300 pt-6">
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <Label className="text-base font-sans font-bold text-[#1A1A1A]">Target Raise Amount</Label>
                        <div className="font-mono text-lg font-bold text-[#1A1A1A]">
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
                     <div className="flex justify-between text-xs text-[#9CA3AF] px-1 font-sans">
                        <span>$0</span>
                        <span>$5M</span>
                        <span>$10M+</span>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <Label className="font-sans font-bold text-[#1A1A1A]">Use of Funds</Label>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-[#6B21A8] hover:text-[#4A0E8F] bg-[#F3E8FF] hover:bg-[#E9D5FF] font-sans font-medium">
                           <Sparkles className="w-3 h-3 mr-1.5" /> AI Suggest
                        </Button>
                     </div>
                     <TagInput placeholder="e.g. Engineering, Sales, Marketing" tags={["Product Development", "GTM"]} />
                     <p className="text-xs text-[#6B7280] font-sans">What will this capital enable you to achieve over the next 18 months?</p>
                  </div>
              </CardContent>
            )}
         </Card>

         {/* Funding History Table */}
         <Card className="border border-[#E5E5E5] bg-white rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#F7F7F5]">
               <div className="space-y-1">
                  <CardTitle className="text-lg font-serif font-medium text-[#1A1A1A]">Capitalization Table</CardTitle>
                  <p className="text-sm text-[#6B7280] font-sans">Previous funding rounds and major investors.</p>
               </div>
               <Button size="sm" variant="outline" className="border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#F7F7F5] font-sans font-medium"><Plus className="w-3 h-3 mr-1" /> Add Round</Button>
            </CardHeader>
            <CardContent className="pt-0">
               <Table>
                  <TableHeader>
                     <TableRow className="border-[#F7F7F5] hover:bg-transparent">
                        <TableHead className="font-sans font-bold text-[#1A1A1A]">Round</TableHead>
                        <TableHead className="font-sans font-bold text-[#1A1A1A]">Date</TableHead>
                        <TableHead className="font-sans font-bold text-[#1A1A1A]">Amount</TableHead>
                        <TableHead className="font-sans font-bold text-[#1A1A1A]">Investors</TableHead>
                     </TableRow>
                  </TableHeader>
                  <TableBody>
                     <TableRow className="border-[#F7F7F5] hover:bg-[#F7F7F5]">
                        <TableCell className="font-medium">
                           <Badge variant="outline" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#1A1A1A] font-sans font-medium">Pre-Seed</Badge>
                        </TableCell>
                        <TableCell className="text-[#6B7280] font-sans">Jan 2023</TableCell>
                        <TableCell className="font-sans font-medium text-[#1A1A1A]">$500,000</TableCell>
                        <TableCell className="text-[#6B7280] font-sans">Angel List, YC</TableCell>
                     </TableRow>
                     <TableRow className="border-0 hover:bg-[#F7F7F5]">
                        <TableCell className="font-medium">
                           <Badge variant="outline" className="bg-[#FFFFFF] border-[#E5E5E5] text-[#1A1A1A] font-sans font-medium">Seed</Badge>
                        </TableCell>
                        <TableCell className="text-[#6B7280] font-sans">Nov 2023</TableCell>
                        <TableCell className="font-sans font-medium text-[#1A1A1A]">$1,200,000</TableCell>
                        <TableCell className="text-[#6B7280] font-sans">Sequoia Arc</TableCell>
                     </TableRow>
                  </TableBody>
               </Table>
            </CardContent>
         </Card>

      </div>

      {/* Right Column: Gemini Valuation Card */}
      <div className="space-y-6">
         <Card className="bg-[#FFFFFF] border-[#E5E5E5] overflow-hidden relative rounded-2xl shadow-sm">
            <div className="absolute top-0 right-0 p-3">
               <Sparkles className="w-5 h-5 text-[#A855F7]" />
            </div>
            <CardHeader className="pb-2">
               <CardTitle className="flex items-center gap-2 text-[#1A1A1A] font-serif font-medium">
                  Gemini Valuation
                  <Badge className="bg-[#F3E8FF] text-[#6B21A8] hover:bg-[#E9D5FF] border-none text-[10px] font-sans font-bold">BETA</Badge>
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-1">
                  <div className="text-sm text-[#6B7280] font-sans font-medium">Estimated Range</div>
                  <div className="text-3xl font-bold text-[#1A1A1A] tracking-tight font-serif">
                     $8M - $12M
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#166534] mt-1 font-sans">
                     <div className="w-2 h-2 rounded-full bg-[#166534]" />
                     High Confidence
                  </div>
               </div>

               <div className="bg-[#F7F7F5] rounded-xl p-4 border border-[#E5E5E5]">
                  <div className="flex gap-3">
                     <Info className="w-5 h-5 text-[#1A1A1A] flex-shrink-0 mt-0.5" />
                     <p className="text-sm text-[#4A4F5B] leading-relaxed font-sans">
                        Based on your <strong>25% MoM growth</strong> and market comparables in the <strong>SaaS</strong> sector, Gemini places you in the top decile of Seed stage startups.
                     </p>
                  </div>
               </div>

               <div className="space-y-2 pt-2 border-t border-[#F7F7F5]">
                  <div className="flex justify-between text-xs text-[#6B7280] font-sans">
                     <span>Comparable Deals</span>
                     <span className="font-bold text-[#1A1A1A]">142 analyzed</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#6B7280] font-sans">
                     <span>Sector Multiplier</span>
                     <span className="font-bold text-[#1A1A1A]">8x - 12x ARR</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <div className="p-5 rounded-2xl bg-[#F7F7F5] border border-[#E5E5E5] text-sm text-[#6B7280] flex gap-4">
            <div className="bg-white p-2 rounded-full border border-[#E5E5E5] h-9 w-9 flex items-center justify-center shadow-sm text-lg">💡</div>
            <div className="pt-0.5">
               <span className="font-bold text-[#1A1A1A] block mb-1 font-sans">Investor Tip</span>
               <span className="font-sans leading-relaxed">Investors will look for a clear plan on how the $2M will get you to $100k MRR within 18 months.</span>
            </div>
         </div>
      </div>

    </div>
  );
};
