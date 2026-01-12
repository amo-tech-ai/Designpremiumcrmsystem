import React, { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, CheckCircle2, Users, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import type { KPIMetric } from './types';

interface KPICardProps {
  metric: KPIMetric;
  onClick?: () => void;
}

export function KPICard({ metric, onClick }: KPICardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    switch (metric.icon) {
      case 'check': return <CheckCircle2 className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'dollar': return <DollarSign className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  const getColorClasses = () => {
    switch (metric.color) {
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'green': return 'text-green-600 bg-green-50';
      case 'purple': return 'text-purple-600 bg-purple-50';
      case 'orange': return 'text-orange-600 bg-orange-50';
      default: return 'text-indigo-600 bg-indigo-50';
    }
  };

  const formatValue = () => {
    if (metric.unit === 'percentage') {
      return `${metric.value}%`;
    } else if (metric.unit === 'currency') {
      return `$${Number(metric.value).toLocaleString()}`;
    } else if (metric.unit === 'days') {
      return `${metric.value} days`;
    }
    return metric.value.toLocaleString();
  };

  const getTrendColor = () => {
    if (metric.trend === 'up') return 'text-green-600';
    if (metric.trend === 'down') return 'text-red-600';
    return 'text-gray-400';
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-xl p-6 transition-all cursor-pointer ${
        isHovered ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${getColorClasses()}`}>
          {getIcon()}
        </div>
        {metric.change !== undefined && (
          <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
            {metric.trend === 'up' ? (
              <ArrowUp className="w-4 h-4" />
            ) : metric.trend === 'down' ? (
              <ArrowDown className="w-4 h-4" />
            ) : null}
            <span>{Math.abs(metric.change)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-3xl font-bold text-gray-900">
          {formatValue()}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {metric.name}
        </div>
      </div>

      {/* Sparkline */}
      {metric.sparklineData && metric.sparklineData.length > 0 && (
        <div className="mt-4 h-12">
          <Sparkline data={metric.sparklineData} color={metric.color} />
        </div>
      )}

      {/* View Details */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-sm text-indigo-600 font-medium"
        >
          View details →
        </motion.div>
      )}
    </motion.div>
  );
}

// Simple Sparkline Component
interface SparklineProps {
  data: number[];
  color?: string;
}

function Sparkline({ data, color = 'blue' }: SparklineProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const getStrokeColor = () => {
    switch (color) {
      case 'green': return '#10B981';
      case 'purple': return '#8B5CF6';
      case 'orange': return '#F59E0B';
      default: return '#3B82F6';
    }
  };

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={getStrokeColor()}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
