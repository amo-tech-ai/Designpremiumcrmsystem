import React from 'react';
import { 
  Search, 
  Book, 
  MessageCircle, 
  LifeBuoy, 
  FileText,
  Video,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

export const HelpCenter = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
      
      {/* Hero Search */}
      <div className="text-center space-y-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900">How can we help you?</h1>
        <p className="text-slate-500 max-w-lg mx-auto">Search our knowledge base for answers to common questions and tutorials.</p>
        <div className="max-w-lg mx-auto relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
           <Input className="pl-10 h-12 text-base shadow-sm" placeholder="Search for help..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
         {/* Support Options */}
         <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
               <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-2">
                  <Book className="w-5 h-5" />
               </div>
               <CardTitle className="text-lg">Documentation</CardTitle>
               <CardDescription>Detailed guides on how to use every feature.</CardDescription>
            </CardHeader>
            <CardFooter>
               <span className="text-sm text-indigo-600 font-medium flex items-center gap-1">Browse Docs <ExternalLink className="w-3 h-3" /></span>
            </CardFooter>
         </Card>

         <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
               <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mb-2">
                  <Video className="w-5 h-5" />
               </div>
               <CardTitle className="text-lg">Video Tutorials</CardTitle>
               <CardDescription>Step-by-step video guides for quick learning.</CardDescription>
            </CardHeader>
            <CardFooter>
               <span className="text-sm text-purple-600 font-medium flex items-center gap-1">Watch Videos <ExternalLink className="w-3 h-3" /></span>
            </CardFooter>
         </Card>

         <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
               <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5" />
               </div>
               <CardTitle className="text-lg">Chat Support</CardTitle>
               <CardDescription>Talk to our support team directly.</CardDescription>
            </CardHeader>
            <CardFooter>
               <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">Start Chat <ExternalLink className="w-3 h-3" /></span>
            </CardFooter>
         </Card>
      </div>

      {/* Common Questions */}
      <div className="space-y-4">
         <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
               "How do I upgrade my plan?",
               "Can I invite guests to my workspace?",
               "How do I export my data?",
               "Where can I find my API keys?",
               "How does the AI credits system work?",
               "Is my data secure?"
            ].map((q, i) => (
               <div key={i} className="p-4 bg-white border border-slate-200 rounded-lg hover:border-indigo-200 cursor-pointer transition-colors flex justify-between items-center group">
                  <span className="text-slate-700 font-medium group-hover:text-indigo-700">{q}</span>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-indigo-300" />
               </div>
            ))}
         </div>
      </div>

      {/* System Status */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="relative">
               <div className="w-3 h-3 bg-green-500 rounded-full" />
               <div className="w-3 h-3 bg-green-500 rounded-full absolute inset-0 animate-ping opacity-75" />
            </div>
            <div>
               <div className="text-sm font-bold text-slate-900">All Systems Operational</div>
               <div className="text-xs text-slate-500">Last updated: Just now</div>
            </div>
         </div>
         <Button variant="outline" size="sm">View Status Page</Button>
      </div>

    </div>
  );
};
