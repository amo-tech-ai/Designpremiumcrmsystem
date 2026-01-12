export interface KPIMetric {
  id: string;
  name: string;
  value: number | string;
  previousValue?: number;
  change?: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
  sparklineData?: number[];
  unit?: 'percentage' | 'currency' | 'number' | 'days';
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  ctaText: string;
  ctaAction: () => void;
  confidence?: number;
  timestamp: Date;
}

export interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  description: string;
  suggestedFix?: string;
  timestamp: Date;
}

export interface ActivityItem {
  id: string;
  type: 'email' | 'meeting' | 'note' | 'status_change' | 'contact_added';
  description: string;
  timestamp: Date;
  avatar?: string;
  read: boolean;
}

export interface DashboardData {
  profileCompleteness: number;
  activeContacts: number;
  pipelineValue: number;
  nextMilestone: number;
  emailOpenRate: number;
  meetingConversion: number;
  avgDealSize: number;
  winRate: number;
  responseTime: number;
  activeCampaigns: number;
}
