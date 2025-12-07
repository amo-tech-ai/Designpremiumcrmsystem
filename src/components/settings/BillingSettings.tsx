import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Zap, 
  Users, 
  HardDrive, 
  Download,
  ArrowUpRight
} from 'lucide-react';
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Progress } from "../ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export const BillingSettings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Plan & Billing</h1>
        <p className="text-slate-500 mt-1">Manage your subscription, usage, and invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left: Current Plan & Usage */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-indigo-900 to-violet-900 text-white border-0 shadow-lg">
             <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                   <div>
                      <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Current Plan</p>
                      <h2 className="text-3xl font-bold mt-1">Pro Plan</h2>
                   </div>
                   <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">$49/mo</Badge>
                </div>
             </CardHeader>
             <CardContent className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="text-indigo-100 flex items-center gap-2"><Zap className="w-4 h-4" /> AI Credits</span>
                      <span className="font-bold">4,200 / 5,000</span>
                   </div>
                   <Progress value={84} className="h-2 bg-indigo-950/50" />
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="text-indigo-100 flex items-center gap-2"><Users className="w-4 h-4" /> Seats</span>
                      <span className="font-bold">3 / 5</span>
                   </div>
                   <Progress value={60} className="h-2 bg-indigo-950/50" />
                </div>
             </CardContent>
             <CardFooter className="flex gap-3 pt-2">
                <Button className="bg-white text-indigo-900 hover:bg-indigo-50 font-semibold border-0">Upgrade Plan</Button>
                <Button variant="outline" className="border-indigo-400 text-indigo-100 hover:bg-indigo-800 hover:text-white bg-transparent">Manage Seats</Button>
             </CardFooter>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Invoice History</CardTitle>
             </CardHeader>
             <CardContent>
                <Table>
                   <TableHeader>
                      <TableRow>
                         <TableHead>Date</TableHead>
                         <TableHead>Amount</TableHead>
                         <TableHead>Status</TableHead>
                         <TableHead className="text-right">Invoice</TableHead>
                      </TableRow>
                   </TableHeader>
                   <TableBody>
                      {[1, 2, 3].map((i) => (
                         <TableRow key={i}>
                            <TableCell className="text-slate-500">Oct {24 - i}, 2023</TableCell>
                            <TableCell className="font-medium">$49.00</TableCell>
                            <TableCell><Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-100">Paid</Badge></TableCell>
                            <TableCell className="text-right">
                               <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Download className="w-4 h-4 text-slate-400" /></Button>
                            </TableCell>
                         </TableRow>
                      ))}
                   </TableBody>
                </Table>
             </CardContent>
          </Card>
        </div>

        {/* Right: Payment Method & Feature List */}
        <div className="space-y-6">
           <Card>
              <CardHeader>
                 <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg bg-slate-50">
                    <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                    <div className="flex-grow">
                       <div className="text-sm font-medium">•••• 4242</div>
                       <div className="text-xs text-slate-500">Exp 12/24</div>
                    </div>
                 </div>
                 <Button variant="outline" className="w-full text-xs h-8">Update Card</Button>
              </CardContent>
           </Card>

           <Card className="bg-slate-50 border-dashed">
              <CardHeader>
                 <CardTitle className="text-base">Included in Pro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                 {[
                    "Unlimited Projects", 
                    "Advanced AI Models (GPT-4)", 
                    "Priority Support", 
                    "Custom Branding", 
                    "API Access"
                 ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                       {feature}
                    </div>
                 ))}
              </CardContent>
              <CardFooter>
                 <a href="#" className="text-xs text-indigo-600 hover:underline flex items-center gap-1">
                    Compare Plans <ArrowUpRight className="w-3 h-3" />
                 </a>
              </CardFooter>
           </Card>
        </div>

      </div>
    </div>
  );
};
