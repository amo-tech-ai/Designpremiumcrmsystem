import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import type { WizardData } from '../OnboardingWizard';

interface StepFundraisingGoalsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const STAGES = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Not Fundraising'
];

export function StepFundraisingGoals({ data, updateData }: StepFundraisingGoalsProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Funding Goal */}
        <div className="space-y-3">
          <Label htmlFor="fundingGoal" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Target className="w-5 h-5 text-indigo-600" />
            Funding Goal
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="fundingGoal"
              type="number"
              value={data.fundingGoal || ''}
              onChange={(e) => updateData({ fundingGoal: parseFloat(e.target.value) || undefined })}
              placeholder="3,000,000"
              className="text-base pl-7"
            />
          </div>
          <p className="text-sm text-gray-500">How much are you raising?</p>
        </div>

        {/* Stage */}
        <div className="space-y-3">
          <Label htmlFor="stage" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Funding Stage
          </Label>
          <Select value={data.stage} onValueChange={(value) => updateData({ stage: value })}>
            <SelectTrigger className="text-base">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {STAGES.map(stage => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">What stage are you raising?</p>
        </div>

        {/* Timeline */}
        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="timeline" className="flex items-center gap-2 text-base font-semibold text-gray-900">
            <Calendar className="w-5 h-5 text-blue-600" />
            Timeline
          </Label>
          <Input
            id="timeline"
            value={data.timeline || ''}
            onChange={(e) => updateData({ timeline: e.target.value })}
            placeholder="Next 3 months"
            className="text-base max-w-md"
          />
          <p className="text-sm text-gray-500">When do you plan to close this round?</p>
        </div>
      </div>

      {/* Use of Funds */}
      <div className="space-y-3">
        <Label htmlFor="useOfFunds" className="text-base font-semibold text-gray-900">
          Use of Funds
        </Label>
        <Textarea
          id="useOfFunds"
          value={data.useOfFunds || ''}
          onChange={(e) => updateData({ useOfFunds: e.target.value })}
          placeholder="60% Product Development (3 engineers)
30% Sales & Marketing (2 SDRs, ad spend)
10% Operations (legal, accounting)"
          className="min-h-32 text-base resize-none font-mono"
          maxLength={500}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Break down how you'll use the capital</span>
          <span>{(data.useOfFunds || '').length}/500</span>
        </div>
      </div>

      {/* Funding Calculator */}
      {data.fundingGoal && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Funding Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-600 mb-1">Total Raising</div>
              <div className="text-2xl font-bold text-gray-900">
                ${data.fundingGoal.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Target amount</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-1">Estimated Dilution</div>
              <div className="text-2xl font-bold text-indigo-600">
                ~15-25%
              </div>
              <div className="text-xs text-gray-500">For {data.stage || 'this stage'}</div>
            </div>
            
            {data.mrr && (
              <div>
                <div className="text-sm text-gray-600 mb-1">Months of Runway</div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(data.fundingGoal / (data.mrr * 1.5))}
                </div>
                <div className="text-xs text-gray-500">Estimated (1.5x burn)</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Helper Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 mb-2">Typical Round Sizes</h3>
              <ul className="space-y-1 text-sm text-blue-800">
                <li><strong>Pre-Seed:</strong> $250K - $750K</li>
                <li><strong>Seed:</strong> $1M - $3M</li>
                <li><strong>Series A:</strong> $5M - $15M</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900 mb-2">Use of Funds Tips</h3>
              <ul className="space-y-1 text-sm text-green-800">
                <li>• Be specific (2 engineers, not "hiring")</li>
                <li>• Percentages should add to 100%</li>
                <li>• Show 18-24 months of runway</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
