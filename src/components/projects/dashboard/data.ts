import { Project, KPI, Activity, AIRecommendation } from './types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Seed Fundraising Sprint',
    status: 'On Track',
    progress: 45,
    dueDate: '14 days left',
    phase: 'Growth',
    tags: ['Fundraising', 'Finance'],
    members: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80'],
    lastActivity: 'Pitch deck updated 2h ago',
    description: 'Securing seed round investment through targeted outreach and pitch refinement.'
  },
  {
    id: '2',
    title: 'MVP v1 Build',
    status: 'At Risk',
    progress: 62,
    dueDate: '30 days left',
    phase: 'Build',
    tags: ['Product', 'Engineering'],
    members: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&q=80'],
    lastActivity: 'API integration pending',
    description: 'Core feature development for the initial product launch.'
  },
  {
    id: '3',
    title: 'Q1 GTM Launch',
    status: 'On Track',
    progress: 80,
    dueDate: '45 days left',
    phase: 'Launch',
    tags: ['GTM', 'Marketing'],
    members: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80'],
    lastActivity: 'Campaign assets approved',
    description: 'Go-to-market strategy execution for Q1 release.'
  },
  {
    id: '4',
    title: 'Investor Pipeline Expansion',
    status: 'Delayed',
    progress: 25,
    dueDate: '60 days left',
    phase: 'Discovery',
    tags: ['Fundraising', 'Sales'],
    members: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80'],
    lastActivity: 'List building in progress',
    description: 'Identifying and qualifying potential investors for the next round.'
  }
];

export const mockKPIs: KPI[] = [
  {
    title: 'Overall Progress',
    value: '64%',
    trend: 'up',
    trendValue: '+8% vs last week',
    iconName: 'chart'
  },
  {
    title: 'Active Projects',
    value: '6',
    trend: 'neutral',
    trendValue: '2 completed',
    iconName: 'activity'
  },
  {
    title: 'Upcoming Milestones',
    value: '12',
    trend: 'down',
    trendValue: '3 due this week',
    iconName: 'flag'
  },
  {
    title: 'AI Insights',
    value: '5',
    trend: 'neutral',
    trendValue: '2 critical risks',
    iconName: 'alert'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'updated',
    target: 'Seed Deck v2.pdf',
    time: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80'
  },
  {
    id: '2',
    user: 'Alex Morgan',
    action: 'completed',
    target: 'Competitor Analysis',
    time: '4 hours ago',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&q=80'
  },
  {
    id: '3',
    user: 'System',
    action: 'flagged',
    target: 'Budget Overrun Risk',
    time: '1 day ago'
  }
];

export const mockRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'risk',
    title: 'Missing Financials',
    description: 'Your pitch deck is missing a 3-year financial projection slide.',
    actionText: 'Generate Financials'
  },
  {
    id: '2',
    type: 'task',
    title: 'Timeline Risk',
    description: '4 tasks in "Execute" phase are overdue by 3+ days.',
    actionText: 'Review Timeline'
  },
  {
    id: '3',
    type: 'optimization',
    title: 'Investor Follow-up',
    description: 'You haven\'t contacted 3 interested leads in 5 days.',
    actionText: 'Draft Emails'
  }
];
