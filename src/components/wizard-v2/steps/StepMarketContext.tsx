import React, { useState } from 'react';
import { Sparkles, ExternalLink, TrendingUp } from 'lucide-react';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Badge } from '../../ui/badge';
import type { WizardData } from '../OnboardingWizard';

interface StepMarketContextProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

const INDUSTRIES = [
  'B2B SaaS',
  'FinTech',
  'HealthTech',
  'EdTech',
  'Consumer Social',
  'E-commerce',
  'AI/ML Infrastructure',
  'Developer Tools',
  'Cybersecurity',
  'Climate Tech',
  'Other'
];

export function StepMarketContext({ data, updateData }: StepMarketContextProps) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleCalculateTAM = async () => {
    setIsCalculating(true);
    
    // Simulate AI calculation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results
    updateData({
      tam: 28000000000, // $28B
      sam: 3200000000,  // $3.2B
      som: 120000000,   // $120M
      marketSources: [
        { title: 'Gartner Magic Quadrant 2024', url: 'https://gartner.com' },
        { title: 'CB Insights State of AI Report', url: 'https://cbinsights.com' },
        { title: 'McKinsey B2B Software Analysis', url: 'https://mckinsey.com' },
        { title: 'Statista Market Forecast', url: 'https://statista.com' },
        { title: 'Forrester Research Wave', url: 'https://forrester.com' },
      ]
    });
    
    setIsCalculating(false);
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Industry */}
      <div className="space-y-3">
        <Label htmlFor="industry" className="text-base font-semibold text-gray-900">
          Industry *
        </Label>
        <Select value={data.industry} onValueChange={(value) => updateData({ industry: value })}>
          <SelectTrigger className="text-base">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map(industry => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Target Customer */}
      <div className="space-y-3">
        <Label htmlFor="targetCustomer" className="text-base font-semibold text-gray-900">
          Target Customer *
        </Label>
        <Textarea
          id="targetCustomer"
          value={data.targetCustomer}
          onChange={(e) => updateData({ targetCustomer: e.target.value })}
          placeholder="Remote-first startups with 10-50 employees in the US, primarily B2B SaaS companies..."
          className="min-h-24 text-base resize-none"
          maxLength={300}
        />
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Be specific about your ICP</span>
          <span>{data.targetCustomer.length}/300</span>
        </div>
      </div>

      {/* Competitors */}
      <div className="space-y-3">
        <Label htmlFor="competitors" className="text-base font-semibold text-gray-900">
          Competitors
        </Label>
        <Input
          id="competitors"
          value={data.competitors.join(', ')}
          onChange={(e) => updateData({ competitors: e.target.value.split(',').map(c => c.trim()).filter(Boolean) })}
          placeholder="Asana, Monday.com, Linear, Notion"
          className="text-base"
        />
        <p className="text-sm text-gray-500">Separate multiple competitors with commas</p>
      </div>

      {/* AI Market Size Calculator */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-8 mt-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI Market Size Calculator
            </h3>
            <p className="text-gray-600">
              Let AI calculate your TAM, SAM, and SOM based on industry data and market reports
            </p>
          </div>
        </div>

        {!showResults ? (
          <Button
            onClick={handleCalculateTAM}
            disabled={isCalculating || !data.industry || !data.targetCustomer}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
          >
            {isCalculating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Analyzing market data...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Calculate Market Size
              </>
            )}
          </Button>
        ) : (
          <div className="space-y-6">
            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-sm font-semibold text-gray-500 mb-2">TAM</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {data.tam && formatCurrency(data.tam)}
                </div>
                <div className="text-xs text-gray-500">Total Addressable Market</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-sm font-semibold text-gray-500 mb-2">SAM</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {data.sam && formatCurrency(data.sam)}
                </div>
                <div className="text-xs text-gray-500">Serviceable Addressable Market</div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-sm font-semibold text-gray-500 mb-2">SOM</div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  {data.som && formatCurrency(data.som)}
                </div>
                <div className="text-xs text-gray-500">Serviceable Obtainable Market</div>
              </div>
            </div>

            {/* Sources */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Sources Used</h4>
              <div className="space-y-2">
                {data.marketSources?.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors">
                      {source.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowResults(false)}
              className="w-full"
            >
              Recalculate
            </Button>
          </div>
        )}
      </div>

      {/* Helper Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 mb-2">Market Size Definitions</h3>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li><strong>TAM:</strong> Total market size for your entire industry</li>
              <li><strong>SAM:</strong> Portion of TAM you can serve with your product</li>
              <li><strong>SOM:</strong> Realistic market share you can capture in 3 years</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
