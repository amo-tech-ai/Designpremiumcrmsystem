import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Plus, Zap, FileText, Bot } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { label: 'New Project', icon: Plus, color: 'text-indigo-600', bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100' },
    { label: 'GTM Plan', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50', hover: 'hover:bg-amber-100' },
    { label: 'Pitch Deck', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'hover:bg-blue-100' },
    { label: 'Copilot', icon: Bot, color: 'text-purple-600', bg: 'bg-purple-50', hover: 'hover:bg-purple-100' },
  ];

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${action.bg} ${action.hover} border border-transparent hover:border-slate-200`}
            >
              <action.icon className={`w-6 h-6 mb-2 ${action.color}`} />
              <span className="text-xs font-medium text-slate-700">{action.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
