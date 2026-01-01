import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Sparkles, TrendingUp, ChevronDown, ChevronRight, Star, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence } from 'motion/react';

interface EnrichmentModalProps {
  type: 'tam' | 'competitors';
  onClose: () => void;
  onAdd: (data: any) => Promise<void>;
}

interface Source {
  title: string;
  url: string;
  year: number;
  credibility: number; // 1-5 stars
  organization: string;
}

export function EnrichmentModal({ type, onClose, onAdd }: EnrichmentModalProps) {
  const [isCalculating, setIsCalculating] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Mock data
  const tamResults = {
    tam: 28000000000, // $28B
    sam: 3200000000,  // $3.2B
    som: 120000000,   // $120M
    breakdown: {
      tam: {
        calculation: 'Global B2B SaaS market size',
        formula: '14M companies × $2,000 avg spend',
        confidence: 85
      },
      sam: {
        calculation: 'US + EU remote-first companies',
        formula: '1.6M companies × $2,000 avg spend',
        confidence: 80
      },
      som: {
        calculation: 'Realistic 3-year market capture',
        formula: '500K companies × $240 ARPU × 1% market share',
        confidence: 75
      }
    },
    sources: [
      {
        title: 'Gartner Magic Quadrant for Project Management 2024',
        url: 'https://gartner.com/magic-quadrant-2024',
        year: 2024,
        credibility: 5,
        organization: 'Gartner'
      },
      {
        title: 'CB Insights State of AI Report',
        url: 'https://cbinsights.com/state-of-ai-2024',
        year: 2024,
        credibility: 5,
        organization: 'CB Insights'
      },
      {
        title: 'McKinsey B2B Software Market Analysis',
        url: 'https://mckinsey.com/b2b-software-2024',
        year: 2024,
        credibility: 5,
        organization: 'McKinsey'
      },
      {
        title: 'Statista SaaS Market Forecast 2024-2028',
        url: 'https://statista.com/saas-forecast',
        year: 2024,
        credibility: 4,
        organization: 'Statista'
      },
      {
        title: 'Forrester Research Wave: Project Management',
        url: 'https://forrester.com/wave-pm-2024',
        year: 2024,
        credibility: 5,
        organization: 'Forrester'
      },
      {
        title: 'IDC MarketScape: Collaborative Work Management',
        url: 'https://idc.com/marketscape-cwm',
        year: 2023,
        credibility: 4,
        organization: 'IDC'
      },
      {
        title: 'Grand View Research: Project Management Software Market',
        url: 'https://grandviewresearch.com/pm-market',
        year: 2024,
        credibility: 4,
        organization: 'Grand View Research'
      },
      {
        title: 'LinkedIn Workforce Report: Remote Work Trends',
        url: 'https://linkedin.com/workforce-report-2024',
        year: 2024,
        credibility: 4,
        organization: 'LinkedIn'
      },
      {
        title: 'PitchBook B2B SaaS Valuations Report',
        url: 'https://pitchbook.com/b2b-saas-2024',
        year: 2024,
        credibility: 5,
        organization: 'PitchBook'
      },
      {
        title: 'G2 Grid Report: Project Management Software',
        url: 'https://g2.com/categories/project-management',
        year: 2024,
        credibility: 3,
        organization: 'G2'
      }
    ] as Source[]
  };

  const competitorResults = {
    competitors: ['Asana', 'Monday.com', 'Linear', 'Notion', 'ClickUp'],
    analysis: {
      'Asana': { marketShare: '28%', strengths: 'Enterprise focus', weaknesses: 'Complex UI' },
      'Monday.com': { marketShare: '22%', strengths: 'Visual workflows', weaknesses: 'Pricing' },
      'Linear': { marketShare: '12%', strengths: 'Developer UX', weaknesses: 'Limited features' },
      'Notion': { marketShare: '18%', strengths: 'All-in-one', weaknesses: 'Performance' },
      'ClickUp': { marketShare: '15%', strengths: 'Feature-rich', weaknesses: 'Overwhelming' }
    }
  };

  // Simulate calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsCalculating(false), 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  const handleAdd = async () => {
    setIsAdding(true);
    try {
      if (type === 'tam') {
        await onAdd({
          tam: tamResults.tam,
          sam: tamResults.sam,
          som: tamResults.som,
          marketSources: tamResults.sources
        });
      } else {
        await onAdd({
          competitors: competitorResults.competitors
        });
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
            </div>
            {type === 'tam' ? 'AI Market Size Calculator' : 'AI Competitor Analysis'}
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            {type === 'tam'
              ? "We'll calculate your TAM/SAM/SOM based on industry data and market reports"
              : "We'll identify your top competitors and analyze their market position"}
          </p>
        </DialogHeader>

        {isCalculating ? (
          <div className="py-12">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-indigo-100 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Analyzing market data...
              </h3>
              <p className="text-gray-600">
                Searching {type === 'tam' ? '10 market reports' : 'competitor databases'}
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-3 mb-4" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Processing...</span>
                <span>{progress}%</span>
              </div>
            </div>

            <div className="mt-8 max-w-md mx-auto space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  progress > 20 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}>
                  {progress > 20 && <Check className="w-3 h-3 text-green-600" />}
                </div>
                <span className={progress > 20 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                  Searching industry reports
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  progress > 50 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}>
                  {progress > 50 && <Check className="w-3 h-3 text-green-600" />}
                </div>
                <span className={progress > 50 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                  Extracting market data
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                  progress > 80 ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}>
                  {progress > 80 && <Check className="w-3 h-3 text-green-600" />}
                </div>
                <span className={progress > 80 ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                  Validating sources
                </span>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {type === 'tam' ? (
              <>
                {/* TAM/SAM/SOM Results */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <div className="text-sm font-semibold text-blue-700 mb-2">TAM</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(tamResults.tam)}
                    </div>
                    <div className="text-xs text-gray-600">Total Addressable Market</div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <div className="text-xs text-blue-700">
                        <div className="font-medium mb-1">Source:</div>
                        <a href={tamResults.sources[0].url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                          {tamResults.sources[0].organization}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                    <div className="text-sm font-semibold text-purple-700 mb-2">SAM</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatCurrency(tamResults.sam)}
                    </div>
                    <div className="text-xs text-gray-600">Serviceable Addressable Market</div>
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className="text-xs text-purple-700">
                        <div className="font-medium mb-1">Source:</div>
                        <a href={tamResults.sources[1].url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                          {tamResults.sources[1].organization}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <div className="text-sm font-semibold text-green-700 mb-2">SOM</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {formatCurrency(tamResults.som)}
                    </div>
                    <div className="text-xs text-gray-600">Serviceable Obtainable Market</div>
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <div className="text-xs text-green-700">
                        <div className="font-medium mb-1">Calculation:</div>
                        <div>Bottoms-up estimate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* How We Calculated This */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold text-gray-900">How we calculated this</span>
                    </div>
                    {showBreakdown ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {showBreakdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-4 space-y-4 bg-white">
                          {Object.entries(tamResults.breakdown).map(([key, data]) => (
                            <div key={key} className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-gray-900 uppercase text-sm">{key}</h4>
                                <Badge variant="secondary">
                                  {data.confidence}% confidence
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-700 mb-2">{data.calculation}</div>
                              <div className="text-xs font-mono text-gray-600 bg-white px-3 py-2 rounded border border-gray-200">
                                {data.formula}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sources */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sources ({tamResults.sources.length} reports analyzed)
                  </h3>
                  <div className="space-y-2">
                    {tamResults.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-sm transition-all group"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                            {source.title}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span>{source.organization}</span>
                            <span>•</span>
                            <span>{source.year}</span>
                            <span>•</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < source.credibility
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Competitor Results */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top 5 Competitors Identified
                  </h3>
                  <div className="space-y-3">
                    {competitorResults.competitors.map((competitor, index) => {
                      const analysis = competitorResults.analysis[competitor as keyof typeof competitorResults.analysis];
                      return (
                        <div key={competitor} className="p-4 bg-white border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center text-sm font-bold text-indigo-600">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{competitor}</div>
                                <div className="text-sm text-gray-600">Market share: {analysis.marketShare}</div>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-xs font-semibold text-green-700 mb-1">Strengths</div>
                              <div className="text-gray-700">{analysis.strengths}</div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-red-700 mb-1">Weaknesses</div>
                              <div className="text-gray-700">{analysis.weaknesses}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleAdd}
                disabled={isAdding}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Add to Profile
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
