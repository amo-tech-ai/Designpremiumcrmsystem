import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { cn } from '../ui/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon: React.ReactNode;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}

function KPICard({ title, value, trend, trendValue, icon, status = 'neutral' }: KPICardProps) {
  // Pastel Status Colors
  // Success: Mint Pastel (#A8E6C1)
  // Warning: Honey Pastel (#F6DFA9)
  // Danger: Rose Pastel (#F2B6B6)
  // Neutral: Pastel Indigo (#6F7EBC)
  
  const statusColors = {
    success: 'text-[#4CAF73] bg-[#A8E6C1]/20', // Mint Pastel Background
    warning: 'text-[#E0B45A] bg-[#F6DFA9]/20', // Honey Pastel Background
    danger: 'text-[#D56565] bg-[#F2B6B6]/20',  // Rose Pastel Background
    neutral: 'text-[#6F7EBC] bg-[#6F7EBC]/10', // Indigo Background
  };

  const trendColors = {
    up: 'text-[#4CAF73] bg-[#A8E6C1]/20',
    down: 'text-[#D56565] bg-[#F2B6B6]/20',
    neutral: 'text-[#6B7280] bg-[#F7F9FC]',
  };

  return (
    <Card className="border-[#E1E6EE] shadow-sm hover:shadow-md transition-all duration-300 bg-white rounded-2xl group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-bold text-[#6B7280] group-hover:text-[#4A5B78] transition-colors">{title}</span>
          <div className={cn("p-2.5 rounded-xl transition-colors", statusColors[status])}>
            {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
          </div>
        </div>
        
        <div className="flex items-end justify-between">
           <h3 className="text-3xl font-bold text-[#1A1F2C] tracking-tight">{value}</h3>
           {trend && trendValue && (
            <div className={cn("flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full", 
                trend === 'up' ? trendColors.up : 
                trend === 'down' ? trendColors.down : trendColors.neutral
            )}>
              {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trendValue}</span>
            </div>
           )}
        </div>
      </CardContent>
    </Card>
  );
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Overall Completion"
        value="64%"
        trend="up"
        trendValue="+8%"
        icon={<Activity />}
        status="neutral"
      />
      <KPICard
        title="Active Projects"
        value="6"
        trend="neutral"
        trendValue="On track"
        icon={<Clock />}
        status="neutral"
      />
      <KPICard
        title="Milestones Risk"
        value="3"
        trend="down"
        trendValue="+2 this week"
        icon={<AlertCircle />}
        status="danger"
      />
      <KPICard
        title="Tasks Completed"
        value="128"
        trend="up"
        trendValue="+12%"
        icon={<CheckCircle2 />}
        status="success"
      />
    </div>
  );
}
