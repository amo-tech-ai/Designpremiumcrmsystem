import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { MetricsGrid, MetricsGridSkeleton } from './MetricsGrid';
import { AIInsightsPanel } from './AIInsightsPanel';
import type { KPIMetric, Recommendation, Alert, ActivityItem, DashboardData } from './types';

interface DashboardHomeProps {
  onNavigate?: (view: string) => void;
}

export function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    setDashboardData({
      profileCompleteness: 73,
      activeContacts: 45,
      pipelineValue: 2400000,
      nextMilestone: 14,
      emailOpenRate: 42,
      meetingConversion: 18,
      avgDealSize: 150000,
      winRate: 28,
      responseTime: 4.2,
      activeCampaigns: 3,
    });

    setRecommendations([
      {
        id: '1',
        priority: 'high',
        title: 'Complete your profile',
        description: 'You\'re 73% done. Complete remaining fields to unlock AI features.',
        ctaText: 'Complete now',
        ctaAction: () => onNavigate?.('startup-profile'),
        confidence: 95,
        timestamp: new Date(),
      },
      {
        id: '2',
        priority: 'medium',
        title: 'Reach out to 3 warm leads',
        description: 'Sarah Chen, Mike Rodriguez, and Alex Kim haven\'t been contacted in 7 days.',
        ctaText: 'View contacts',
        ctaAction: () => onNavigate?.('contacts'),
        confidence: 82,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: '3',
        priority: 'low',
        title: 'Update your TAM data',
        description: 'Market size data is 6 months old. Refresh for accurate insights.',
        ctaText: 'Update now',
        ctaAction: () => onNavigate?.('startup-profile'),
        confidence: 68,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      },
    ]);

    setAlerts([
      {
        id: '1',
        type: 'warning',
        title: 'Pipeline stalled',
        description: '2 deals have been inactive for 30+ days',
        suggestedFix: 'Review pipeline',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: '2',
        type: 'info',
        title: 'Missing LinkedIn profiles',
        description: '3 team members need to connect their LinkedIn',
        suggestedFix: 'Send reminder',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
    ]);

    setActivities([
      {
        id: '1',
        type: 'email',
        description: 'Email sent to Sarah Chen',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
      },
      {
        id: '2',
        type: 'meeting',
        description: 'Meeting scheduled with Mike Rodriguez',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: '3',
        type: 'contact_added',
        description: 'New contact added: Alex Kim',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
      },
    ]);

    setIsLoading(false);
  };

  const handleDismiss = (id: string, type: 'recommendation' | 'alert') => {
    if (type === 'recommendation') {
      setRecommendations(prev => prev.filter(r => r.id !== id));
    } else {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }
  };

  // Generate primary metrics
  const primaryMetrics: KPIMetric[] = dashboardData ? [
    {
      id: 'completeness',
      name: 'Profile Completeness',
      value: dashboardData.profileCompleteness,
      change: 5,
      trend: 'up',
      icon: 'check',
      color: 'green',
      unit: 'percentage',
      sparklineData: [65, 68, 70, 71, 69, 72, 73],
    },
    {
      id: 'contacts',
      name: 'Active Contacts',
      value: dashboardData.activeContacts,
      change: 12,
      trend: 'up',
      icon: 'users',
      color: 'blue',
      unit: 'number',
      sparklineData: [38, 40, 41, 43, 42, 44, 45],
    },
    {
      id: 'pipeline',
      name: 'Pipeline Value',
      value: dashboardData.pipelineValue,
      change: 8,
      trend: 'up',
      icon: 'dollar',
      color: 'purple',
      unit: 'currency',
      sparklineData: [2100000, 2150000, 2200000, 2250000, 2300000, 2350000, 2400000],
    },
    {
      id: 'milestone',
      name: 'Next Milestone',
      value: dashboardData.nextMilestone,
      change: -3,
      trend: 'down',
      icon: 'calendar',
      color: 'orange',
      unit: 'days',
      sparklineData: [20, 19, 18, 17, 16, 15, 14],
    },
  ] : [];

  // Generate secondary metrics
  const secondaryMetrics: KPIMetric[] = dashboardData ? [
    {
      id: 'email_open',
      name: 'Email Open Rate',
      value: dashboardData.emailOpenRate,
      change: 3,
      trend: 'up',
      icon: 'check',
      unit: 'percentage',
    },
    {
      id: 'meeting_conv',
      name: 'Meeting Conv.',
      value: dashboardData.meetingConversion,
      change: -2,
      trend: 'down',
      icon: 'check',
      unit: 'percentage',
    },
    {
      id: 'avg_deal',
      name: 'Avg Deal Size',
      value: dashboardData.avgDealSize,
      change: 5,
      trend: 'up',
      icon: 'dollar',
      unit: 'currency',
    },
    {
      id: 'win_rate',
      name: 'Win Rate',
      value: dashboardData.winRate,
      change: 1,
      trend: 'up',
      icon: 'check',
      unit: 'percentage',
    },
    {
      id: 'response_time',
      name: 'Response Time',
      value: dashboardData.responseTime,
      change: -10,
      trend: 'down',
      icon: 'check',
      unit: 'number',
    },
    {
      id: 'campaigns',
      name: 'Campaigns',
      value: dashboardData.activeCampaigns,
      change: 0,
      trend: 'neutral',
      icon: 'check',
      unit: 'number',
    },
  ] : [];

  // Next Best Action
  const nextBestAction = recommendations[0];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Next Best Action Banner */}
          {nextBestAction && !isLoading && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1 opacity-90">Next Best Action</div>
                    <h2 className="text-xl font-bold mb-1">{nextBestAction.title}</h2>
                    <p className="text-sm opacity-90">{nextBestAction.description}</p>
                  </div>
                </div>
                <Button
                  onClick={() => nextBestAction.ctaAction()}
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                >
                  {nextBestAction.ctaText}
                </Button>
              </div>
            </div>
          )}

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts, deals, or insights..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Last 7 days
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button
              variant="outline"
              onClick={loadDashboardData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Metrics Grid */}
          {isLoading ? (
            <MetricsGridSkeleton />
          ) : (
            <MetricsGrid
              primaryMetrics={primaryMetrics}
              secondaryMetrics={secondaryMetrics}
              onMetricClick={(id) => console.log('Metric clicked:', id)}
            />
          )}

          {/* Profile Completeness Widget (if under 80%) */}
          {dashboardData && dashboardData.profileCompleteness < 80 && (
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Complete your profile to unlock all features
                  </h3>
                  <p className="text-sm text-blue-700">
                    You're {dashboardData.profileCompleteness}% done. Just a few more fields!
                  </p>
                </div>
                <Button
                  onClick={() => onNavigate?.('startup-profile')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Complete now
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Insights Panel - Right Side */}
      <AIInsightsPanel
        recommendations={recommendations}
        alerts={alerts}
        activities={activities}
        onRefresh={loadDashboardData}
        onDismiss={handleDismiss}
        onActionClick={(action) => action()}
      />
    </div>
  );
}
