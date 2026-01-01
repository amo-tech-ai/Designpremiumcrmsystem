import React from 'react';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import type { WizardData } from '../OnboardingWizard';

interface StepTractionMetricsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function StepTractionMetrics({ data, updateData }: StepTractionMetricsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Users */}
        <div className="space-y-3">
          <Label htmlFor="activeUsers" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Users className="w-5 h-5 text-indigo-600" />
            Active Users
          </Label>
          <Input
            id="activeUsers"
            type="number"
            value={data.activeUsers || ''}
            onChange={(e) => updateData({ activeUsers: parseInt(e.target.value) || undefined })}
            placeholder="847"
            className="text-base"
          />
          <p className="text-sm text-gray-500">Monthly active users (MAU)</p>
        </div>

        {/* MRR */}
        <div className="space-y-3">
          <Label htmlFor="mrr" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <DollarSign className="w-5 h-5 text-green-600" />
            MRR (Monthly Recurring Revenue)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="mrr"
              type="number"
              value={data.mrr || ''}
              onChange={(e) => updateData({ mrr: parseFloat(e.target.value) || undefined })}
              placeholder="12,500"
              className="text-base pl-7"
            />
          </div>
          <p className="text-sm text-gray-500">Current monthly recurring revenue</p>
        </div>

        {/* Customers */}
        <div className="space-y-3">
          <Label htmlFor="customers" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Paying Customers
          </Label>
          <Input
            id="customers"
            type="number"
            value={data.customers || ''}
            onChange={(e) => updateData({ customers: parseInt(e.target.value) || undefined })}
            placeholder="52"
            className="text-base"
          />
          <p className="text-sm text-gray-500">Number of paying customers</p>
        </div>

        {/* Growth Rate */}
        <div className="space-y-3">
          <Label htmlFor="growthRate" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Growth Rate
          </Label>
          <div className="relative">
            <Input
              id="growthRate"
              type="number"
              value={data.growthRate || ''}
              onChange={(e) => updateData({ growthRate: parseFloat(e.target.value) || undefined })}
              placeholder="22"
              className="text-base pr-8"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
          </div>
          <p className="text-sm text-gray-500">Month-over-month growth percentage</p>
        </div>

        {/* Launched Date */}
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="launchedDate" className="text-base font-semibold text-gray-900">
            Launch Date
          </Label>
          <Input
            id="launchedDate"
            type="date"
            value={data.launchedDate || ''}
            onChange={(e) => updateData({ launchedDate: e.target.value })}
            className="text-base max-w-xs"
          />
          <p className="text-sm text-gray-500">When did you launch your product?</p>
        </div>
      </div>

      {/* Calculated Metrics Card */}
      {data.mrr && data.customers && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Calculated Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">ARPU</div>
              <div className="text-2xl font-bold text-gray-900">
                ${((data.mrr / data.customers) || 0).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">Average Revenue Per User</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-1">ARR</div>
              <div className="text-2xl font-bold text-gray-900">
                ${((data.mrr * 12) || 0).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Annual Recurring Revenue</div>
            </div>
            
            {data.growthRate && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Projected MRR (6mo)</div>
                <div className="text-2xl font-bold text-green-600">
                  ${(data.mrr * Math.pow(1 + (data.growthRate / 100), 6)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-gray-500">At current growth rate</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helper Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-2">No Traction Yet?</h3>
            <p className="text-sm text-amber-800">
              That's okay! If you haven't launched yet, you can skip these fields or enter $0. 
              Focus on your vision and market opportunity instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
