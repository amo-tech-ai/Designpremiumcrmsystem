import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Plus, Rocket, Presentation, Sparkles, Command } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from '../ui/button';

export function QuickActions() {
  const actions = [
    { label: 'New Project', icon: Plus, onClick: () => toast.info('Creating new project...') },
    { label: 'GTM Plan', icon: Rocket, onClick: () => toast.success('Generating GTM Plan...') },
    { label: 'Pitch Deck', icon: Presentation, onClick: () => toast.info('Opening Pitch Deck Wizard...') },
    { label: 'Ask AI', icon: Sparkles, onClick: () => toast.message('AI Copilot activated') },
  ];

  return (
    <Card className="border-[#E1E6EE] shadow-sm bg-white rounded-2xl">
      <CardHeader className="py-5 px-6 border-b border-[#E1E6EE]">
        <CardTitle className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
          <Command className="w-4 h-4 text-[#9CA3AF]" /> Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, i) => (
            <Button
              key={i}
              variant="outline"
              className="h-auto py-5 flex flex-col items-center justify-center gap-3 border-[#E1E6EE] hover:border-[#6F7EBC]/30 hover:bg-[#F7F9FC] transition-all duration-200 text-[#6B7280] hover:text-[#4A5B78] rounded-xl group active:scale-[0.98]"
              onClick={action.onClick}
            >
              <div className="p-2.5 rounded-full bg-[#F7F9FC] group-hover:bg-[#E8EEF5] transition-colors">
                <action.icon className="w-5 h-5 text-[#6B7280] group-hover:text-[#4A5B78]" />
              </div>
              <span className="text-xs font-bold">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
