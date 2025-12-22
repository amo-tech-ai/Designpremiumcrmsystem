export type ProjectStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Completed';
export type ProjectPhase = 'Discovery' | 'Build' | 'Launch' | 'Growth';

export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  phase: ProjectPhase;
  tags: string[];
  members: string[];
  lastActivity: string;
  description?: string;
}

export interface KPI {
  title: string;
  value: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  iconName: 'chart' | 'activity' | 'flag' | 'alert';
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  avatar?: string;
}

export interface AIRecommendation {
  id: string;
  type: 'risk' | 'optimization' | 'task';
  title: string;
  description: string;
  actionText: string;
}
