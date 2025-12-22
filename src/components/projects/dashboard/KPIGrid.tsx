import { KPICard } from './KPICard';
import { KPI } from './types';
import { TrendingUp, Activity, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';

interface KPIGridProps {
  kpis: KPI[];
}

export function KPIGrid({ kpis }: KPIGridProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case 'chart': return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'activity': return <Activity className="w-5 h-5 text-blue-600" />;
      case 'flag': return <Flag className="w-5 h-5 text-purple-600" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-amber-600" />;
      default: return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (name: string) => {
    switch (name) {
      case 'chart': return 'bg-emerald-50';
      case 'activity': return 'bg-blue-50';
      case 'flag': return 'bg-purple-50';
      case 'alert': return 'bg-amber-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, index) => (
        <KPICard
          key={index}
          title={kpi.title}
          value={kpi.value}
          trend={kpi.trend}
          trendValue={kpi.trendValue}
          icon={getIcon(kpi.iconName)}
          iconBg={getBgColor(kpi.iconName)}
        />
      ))}
    </div>
  );
}
