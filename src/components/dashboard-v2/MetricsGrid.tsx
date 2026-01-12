import React from 'react';
import { KPICard } from './KPICard';
import type { KPIMetric } from './types';

interface MetricsGridProps {
  primaryMetrics: KPIMetric[];
  secondaryMetrics: KPIMetric[];
  onMetricClick?: (metricId: string) => void;
}

export function MetricsGrid({ primaryMetrics, secondaryMetrics, onMetricClick }: MetricsGridProps) {
  return (
    <div className="space-y-8">
      {/* Primary KPIs - 2x2 Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryMetrics.map((metric) => (
            <KPICard
              key={metric.id}
              metric={metric}
              onClick={() => onMetricClick?.(metric.id)}
            />
          ))}
        </div>
      </div>

      {/* Secondary Metrics - Horizontal Row */}
      {secondaryMetrics.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {secondaryMetrics.map((metric) => (
              <SecondaryMetricCard
                key={metric.id}
                metric={metric}
                onClick={() => onMetricClick?.(metric.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Secondary Metric Card (Smaller, Compact)
interface SecondaryMetricCardProps {
  metric: KPIMetric;
  onClick?: () => void;
}

function SecondaryMetricCard({ metric, onClick }: SecondaryMetricCardProps) {
  const formatValue = () => {
    if (metric.unit === 'percentage') {
      return `${metric.value}%`;
    } else if (metric.unit === 'currency') {
      return `$${Number(metric.value).toLocaleString()}`;
    }
    return metric.value.toLocaleString();
  };

  const getTrendColor = () => {
    if (metric.trend === 'up') return 'text-green-600';
    if (metric.trend === 'down') return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="text-xs text-gray-500 mb-1 truncate">
        {metric.name}
      </div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold text-gray-900">
          {formatValue()}
        </div>
        {metric.change !== undefined && (
          <div className={`text-xs ${getTrendColor()}`}>
            {metric.change > 0 ? '+' : ''}{metric.change}%
          </div>
        )}
      </div>
    </div>
  );
}

// Loading Skeleton
export function MetricsGridSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-10 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 bg-gray-200 rounded mt-4 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
