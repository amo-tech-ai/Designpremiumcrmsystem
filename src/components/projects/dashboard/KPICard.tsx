import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';

interface KPICardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  iconBg: string;
}

export function KPICard({ title, value, trend, trendValue, icon, iconBg }: KPICardProps) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 rounded-lg ${iconBg} transition-colors`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
              trend === 'up' ? 'bg-green-50 text-green-700' :
              trend === 'down' ? 'bg-red-50 text-red-700' :
              'bg-slate-50 text-slate-700'
            }`}>
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-900">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
