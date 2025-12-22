import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Sparkles, AlertTriangle, FileText, UserPlus, ArrowRight, X } from 'lucide-react';
import { Badge } from '../ui/badge';

export function AIInsightsPanel() {
  const suggestions = [
    {
      id: 1,
      type: 'risk',
      title: 'Timeline Risk Detected',
      desc: '4 tasks in "MVP Build" are overdue. Consider extending the sprint by 1 week.',
      icon: AlertTriangle,
      color: 'text-[#E0B45A]',
      bg: 'bg-[#F6DFA9]/30', // Honey Pastel
    },
    {
      id: 2,
      type: 'doc',
      title: 'Missing Financials',
      desc: 'Your Pitch Deck is missing a "Financial Projections" slide.',
      icon: FileText,
      color: 'text-[#6F7EBC]',
      bg: 'bg-[#C9D7F2]/30', // Lavender Mist
    },
    {
      id: 3,
      type: 'action',
      title: 'Investor Follow-up',
      desc: '3 investors haven\'t replied in 7 days.',
      icon: UserPlus,
      color: 'text-[#4CAF73]',
      bg: 'bg-[#A8E6C1]/30', // Mint Pastel
    },
  ];

  return (
    <Card className="border-[#E1E6EE] shadow-sm overflow-hidden bg-white rounded-2xl">
      <CardHeader className="p-0 border-b border-[#E1E6EE]">
        {/* Pastel Gradient Header */}
        <div className="bg-gradient-to-r from-[#C9D7F2] to-[#AFC3F7] p-5 flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-bold text-[#4A5B78]">
            <Sparkles className="w-4 h-4 text-[#4A5B78]" /> AI Coach
            </CardTitle>
            <Badge className="bg-white/40 text-[#4A5B78] border-0 text-[10px] px-2.5 h-6 font-bold hover:bg-white/50 backdrop-blur-sm shadow-sm">
                3 New
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E1E6EE]">
          {suggestions.map((item) => (
            <div key={item.id} className="p-5 hover:bg-[#F7F9FC] transition-colors group relative cursor-pointer">
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${item.bg} ${item.color}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[#1A1F2C] mb-1.5 flex items-center gap-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] leading-relaxed pr-6 font-medium">{item.desc}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-[#9CA3AF] absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#4A5B78] hover:bg-[#E8EEF5]">
                    <X className="w-3 h-3" />
                </Button>
              </div>
              <div className="mt-4 pl-14 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-200">
                  <Button size="sm" variant="outline" className="h-8 text-xs bg-white text-[#4A5B78] border-[#E1E6EE] hover:bg-[#E8EEF5] hover:border-[#4A5B78]/30 font-medium rounded-lg">
                    View Details
                  </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 bg-[#F7F9FC] border-t border-[#E1E6EE]">
           <Button variant="ghost" className="w-full text-xs text-[#6B7280] hover:text-[#4A5B78] hover:bg-[#E8EEF5] h-9 font-bold rounded-lg">
             View All Insights <ArrowRight className="w-3 h-3 ml-1" />
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}
