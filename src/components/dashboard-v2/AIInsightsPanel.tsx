import React, { useState } from 'react';
import { Sparkles, AlertTriangle, Activity, RefreshCw, X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Recommendation, Alert as AlertType, ActivityItem } from './types';

interface AIInsightsPanelProps {
  recommendations: Recommendation[];
  alerts: AlertType[];
  activities: ActivityItem[];
  onRefresh?: () => void;
  onDismiss?: (id: string, type: 'recommendation' | 'alert') => void;
  onActionClick?: (action: () => void) => void;
}

type TabType = 'recommendations' | 'alerts' | 'activity';

export function AIInsightsPanel({
  recommendations,
  alerts,
  activities,
  onRefresh,
  onDismiss,
  onActionClick,
}: AIInsightsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('recommendations');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const unreadAlertsCount = alerts.length;

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="font-semibold text-gray-900">AI Insights</h2>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-gray-600 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
          <TabButton
            active={activeTab === 'recommendations'}
            onClick={() => setActiveTab('recommendations')}
            icon={<TrendingUp className="w-4 h-4" />}
            label="Tips"
          />
          <TabButton
            active={activeTab === 'alerts'}
            onClick={() => setActiveTab('alerts')}
            icon={<AlertTriangle className="w-4 h-4" />}
            label="Alerts"
            badge={unreadAlertsCount > 0 ? unreadAlertsCount : undefined}
          />
          <TabButton
            active={activeTab === 'activity'}
            onClick={() => setActiveTab('activity')}
            icon={<Activity className="w-4 h-4" />}
            label="Activity"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        <AnimatePresence mode="wait">
          {activeTab === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {recommendations.length === 0 ? (
                <EmptyState
                  icon={<TrendingUp className="w-8 h-8 text-gray-400" />}
                  message="No recommendations at the moment"
                />
              ) : (
                recommendations.slice(0, 5).map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    recommendation={rec}
                    onDismiss={() => onDismiss?.(rec.id, 'recommendation')}
                    onActionClick={() => onActionClick?.(rec.ctaAction)}
                  />
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div
              key="alerts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {alerts.length === 0 ? (
                <EmptyState
                  icon={<AlertTriangle className="w-8 h-8 text-gray-400" />}
                  message="No alerts – everything looks good!"
                />
              ) : (
                alerts.slice(0, 5).map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onDismiss={() => onDismiss?.(alert.id, 'alert')}
                  />
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {activities.length === 0 ? (
                <EmptyState
                  icon={<Activity className="w-8 h-8 text-gray-400" />}
                  message="No recent activity"
                />
              ) : (
                activities.slice(0, 5).map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Load More */}
      {((activeTab === 'recommendations' && recommendations.length > 5) ||
        (activeTab === 'alerts' && alerts.length > 5) ||
        (activeTab === 'activity' && activities.length > 5)) && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <Button variant="ghost" className="w-full">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

// Tab Button Component
interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

function TabButton({ active, onClick, icon, label, badge }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
        active
          ? 'bg-white text-indigo-600 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

// Recommendation Card
interface RecommendationCardProps {
  recommendation: Recommendation;
  onDismiss: () => void;
  onActionClick: () => void;
}

function RecommendationCard({ recommendation, onDismiss, onActionClick }: RecommendationCardProps) {
  const getPriorityColor = () => {
    switch (recommendation.priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white border border-gray-200 rounded-lg p-4 relative group"
    >
      {/* Dismiss Button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 rounded"
      >
        <X className="w-3 h-3 text-gray-400" />
      </button>

      {/* Priority Badge */}
      <Badge className={`text-xs mb-2 ${getPriorityColor()}`}>
        {recommendation.priority.toUpperCase()}
      </Badge>

      {/* Content */}
      <h3 className="font-semibold text-gray-900 text-sm mb-1 pr-6">
        {recommendation.title}
      </h3>
      <p className="text-xs text-gray-600 mb-3">
        {recommendation.description}
      </p>

      {/* CTA */}
      <Button
        size="sm"
        onClick={onActionClick}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
      >
        {recommendation.ctaText}
      </Button>

      {/* Confidence Score */}
      {recommendation.confidence && (
        <div className="mt-2 text-xs text-gray-500">
          Confidence: {recommendation.confidence}%
        </div>
      )}
    </motion.div>
  );
}

// Alert Card
interface AlertCardProps {
  alert: AlertType;
  onDismiss: () => void;
}

function AlertCard({ alert, onDismiss }: AlertCardProps) {
  const getAlertColor = () => {
    switch (alert.type) {
      case 'error': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-orange-200 bg-orange-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = () => {
    switch (alert.type) {
      case 'error': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`border rounded-lg p-4 relative group ${getAlertColor()}`}
    >
      {/* Dismiss Button */}
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/50 rounded"
      >
        <X className="w-3 h-3 text-gray-600" />
      </button>

      {/* Icon & Title */}
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle className={`w-4 h-4 mt-0.5 ${getIconColor()}`} />
        <div className="flex-1 pr-4">
          <h3 className="font-semibold text-gray-900 text-sm">
            {alert.title}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-700 mb-3 ml-6">
        {alert.description}
      </p>

      {/* Suggested Fix */}
      {alert.suggestedFix && (
        <div className="ml-6">
          <Button size="sm" variant="outline" className="w-full text-xs">
            {alert.suggestedFix}
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// Activity Card
interface ActivityCardProps {
  activity: ActivityItem;
}

function ActivityCard({ activity }: ActivityCardProps) {
  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 ${!activity.read ? 'border-l-4 border-l-indigo-500' : ''}`}>
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
          {activity.avatar ? (
            <img src={activity.avatar} alt="" className="w-8 h-8 rounded-full" />
          ) : (
            <Activity className="w-4 h-4 text-gray-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900">
            {activity.description}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {getRelativeTime(activity.timestamp)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Empty State
interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-3">
        {icon}
      </div>
      <p className="text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}
