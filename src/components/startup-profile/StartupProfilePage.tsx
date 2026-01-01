import React, { useState } from 'react';
import { Edit2, Share2, Download, ChevronDown, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { CompletenessTracker } from './CompletenessTracker';
import { EnrichmentModal } from './EnrichmentModal';
import type { StartupProfile } from './types';

interface StartupProfilePageProps {
  profile: StartupProfile;
  onUpdate: (updates: Partial<StartupProfile>) => Promise<void>;
  onShare?: () => void;
  onExport?: () => void;
}

export function StartupProfilePage({ profile, onUpdate, onShare, onExport }: StartupProfilePageProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['business', 'market', 'team']);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showEnrichmentModal, setShowEnrichmentModal] = useState(false);
  const [enrichmentType, setEnrichmentType] = useState<'tam' | 'competitors' | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFieldSave = async (field: string, value: any) => {
    setIsSaving(true);
    try {
      await onUpdate({ [field]: value });
      setEditingField(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEnrichField = (type: 'tam' | 'competitors') => {
    setEnrichmentType(type);
    setShowEnrichmentModal(true);
  };

  const sections = [
    {
      id: 'business',
      title: 'Business Overview',
      icon: '🎯',
      fields: [
        { key: 'problem', label: 'Problem', value: profile.problem, type: 'textarea', required: true },
        { key: 'solution', label: 'Solution', value: profile.solution, type: 'textarea', required: true },
        { key: 'oneLiner', label: 'One-liner', value: profile.oneLiner, type: 'text', required: true },
        { key: 'uvp', label: 'Unique Value Proposition', value: profile.uvp, type: 'textarea' },
        { key: 'businessModel', label: 'Business Model', value: profile.businessModel, type: 'text' },
      ]
    },
    {
      id: 'market',
      title: 'Market & Traction',
      icon: '📊',
      fields: [
        { key: 'industry', label: 'Industry', value: profile.industry, type: 'text', required: true },
        { key: 'targetCustomer', label: 'Target Customer', value: profile.targetCustomer, type: 'textarea', required: true },
        { key: 'tam', label: 'TAM (Total Addressable Market)', value: profile.tam ? `$${(profile.tam / 1000000000).toFixed(1)}B` : null, type: 'number', canEnrich: true },
        { key: 'sam', label: 'SAM (Serviceable Addressable Market)', value: profile.sam ? `$${(profile.sam / 1000000000).toFixed(1)}B` : null, type: 'number', canEnrich: true },
        { key: 'som', label: 'SOM (Serviceable Obtainable Market)', value: profile.som ? `$${(profile.som / 1000000).toFixed(0)}M` : null, type: 'number', canEnrich: true },
        { key: 'competitors', label: 'Competitors', value: profile.competitors?.join(', '), type: 'text', canEnrich: true },
        { key: 'activeUsers', label: 'Active Users', value: profile.activeUsers?.toLocaleString(), type: 'number' },
        { key: 'mrr', label: 'MRR', value: profile.mrr ? `$${profile.mrr.toLocaleString()}` : null, type: 'number' },
        { key: 'customers', label: 'Paying Customers', value: profile.customers?.toLocaleString(), type: 'number' },
        { key: 'growthRate', label: 'Growth Rate', value: profile.growthRate ? `${profile.growthRate}%` : null, type: 'number' },
      ]
    },
    {
      id: 'team',
      title: 'Team',
      icon: '👥',
      fields: [
        { key: 'foundersCount', label: 'Number of Founders', value: profile.founders?.length || 0, type: 'display' },
        { key: 'teamSize', label: 'Team Size', value: profile.teamSize, type: 'number' },
      ]
    },
    {
      id: 'model',
      title: 'Business Model',
      icon: '💰',
      fields: [
        { key: 'revenueStreams', label: 'Revenue Streams', value: profile.revenueStreams, type: 'textarea' },
        { key: 'pricing', label: 'Pricing', value: profile.pricing, type: 'text' },
        { key: 'arpu', label: 'ARPU', value: profile.arpu ? `$${profile.arpu.toFixed(2)}` : null, type: 'number' },
        { key: 'ltv', label: 'LTV', value: profile.ltv ? `$${profile.ltv.toLocaleString()}` : null, type: 'number' },
        { key: 'cac', label: 'CAC', value: profile.cac ? `$${profile.cac.toLocaleString()}` : null, type: 'number' },
        { key: 'grossMargin', label: 'Gross Margin', value: profile.grossMargin ? `${profile.grossMargin}%` : null, type: 'number' },
      ]
    },
    {
      id: 'fundraising',
      title: 'Fundraising',
      icon: '🚀',
      fields: [
        { key: 'fundingGoal', label: 'Funding Goal', value: profile.fundingGoal ? `$${(profile.fundingGoal / 1000000).toFixed(1)}M` : null, type: 'number' },
        { key: 'stage', label: 'Stage', value: profile.stage, type: 'text' },
        { key: 'timeline', label: 'Timeline', value: profile.timeline, type: 'text' },
        { key: 'useOfFunds', label: 'Use of Funds', value: profile.useOfFunds, type: 'textarea' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-60 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
          <div className="p-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Quick Jump
            </h3>
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <span>{section.icon}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Completeness Widget */}
          <div className="mt-auto p-6 border-t border-gray-200">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
              <div className="text-center mb-2">
                <div className="text-3xl font-bold text-indigo-600">73%</div>
                <div className="text-xs text-gray-600">Complete</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-green-500 h-2 rounded-full transition-all"
                  style={{ width: '73%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-4xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Startup Profile</h1>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={onShare} className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="outline" onClick={onExport} className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                  <Button className="flex items-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Mode
                  </Button>
                </div>
              </div>

              {/* Completeness Tracker */}
              <CompletenessTracker completeness={73} breakdown={{
                business: 100,
                market: 80,
                team: 60,
                model: 70,
                fundraising: 40
              }} />
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {sections.map(section => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{section.icon}</span>
                      <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {/* Section Content */}
                  <AnimatePresence>
                    {expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-gray-200"
                      >
                        <div className="p-6 space-y-6">
                          {section.fields.map(field => (
                            <div key={field.key} className="grid grid-cols-3 gap-4">
                              <div className="text-sm font-semibold text-gray-700 flex items-start gap-1">
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                              </div>
                              
                              <div className="col-span-2">
                                {field.value ? (
                                  <div className="group relative">
                                    <div className="text-sm text-gray-900 pr-8">
                                      {field.value}
                                    </div>
                                    <button
                                      onClick={() => setEditingField(field.key)}
                                      className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Edit2 className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 italic">Not provided</span>
                                    {field.canEnrich && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEnrichField(field.key as 'tam' | 'competitors')}
                                        className="text-orange-600 hover:text-orange-700 flex items-center gap-1 h-7 px-2"
                                      >
                                        <Sparkles className="w-3 h-3" />
                                        AI can help
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Auto-save Indicator */}
            <AnimatePresence>
              {isSaving && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Saving...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Enrichment Modal */}
      {showEnrichmentModal && enrichmentType && (
        <EnrichmentModal
          type={enrichmentType}
          onClose={() => {
            setShowEnrichmentModal(false);
            setEnrichmentType(null);
          }}
          onAdd={async (data) => {
            await onUpdate(data);
            setShowEnrichmentModal(false);
            setEnrichmentType(null);
          }}
        />
      )}
    </div>
  );
}
