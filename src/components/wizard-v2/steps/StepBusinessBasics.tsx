import React from 'react';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import type { WizardData } from '../OnboardingWizard';

interface StepBusinessBasicsProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

export function StepBusinessBasics({ data, updateData }: StepBusinessBasicsProps) {
  return (
    <div className="space-y-8">
      {/* Problem */}
      <div className="space-y-3">
        <Label htmlFor="problem" className="text-base font-semibold text-gray-900">
          What problem are you solving? *
        </Label>
        <Textarea
          id="problem"
          value={data.problem}
          onChange={(e) => updateData({ problem: e.target.value })}
          placeholder="Remote teams waste 10+ hours per week switching between tools and tracking progress manually..."
          className="min-h-32 text-base resize-none"
          maxLength={500}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Be specific about the pain point</span>
          <span>{data.problem.length}/500</span>
        </div>
      </div>

      {/* Solution */}
      <div className="space-y-3">
        <Label htmlFor="solution" className="text-base font-semibold text-gray-900">
          What's your solution? *
        </Label>
        <Textarea
          id="solution"
          value={data.solution}
          onChange={(e) => updateData({ solution: e.target.value })}
          placeholder="An AI-powered project management platform that automatically tracks progress, generates updates, and predicts delays..."
          className="min-h-32 text-base resize-none"
          maxLength={500}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Explain how you solve it uniquely</span>
          <span>{data.solution.length}/500</span>
        </div>
      </div>

      {/* One-liner */}
      <div className="space-y-3">
        <Label htmlFor="oneLiner" className="text-base font-semibold text-gray-900">
          One-liner (Elevator Pitch) *
        </Label>
        <Input
          id="oneLiner"
          value={data.oneLiner}
          onChange={(e) => updateData({ oneLiner: e.target.value })}
          placeholder="AI-powered project management that predicts delays before they happen"
          className="text-base"
          maxLength={150}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Your elevator pitch in one sentence</span>
          <span>{data.oneLiner.length}/150</span>
        </div>
      </div>

      {/* Helper Card */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mt-8">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-indigo-900 mb-2">Pro Tips</h3>
            <ul className="space-y-1.5 text-sm text-indigo-800">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">•</span>
                <span>Focus on the <strong>specific pain point</strong>, not general market trends</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">•</span>
                <span>Quantify the problem when possible (e.g., "10+ hours wasted per week")</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-0.5">•</span>
                <span>Your one-liner should be memorable and easy to repeat</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
