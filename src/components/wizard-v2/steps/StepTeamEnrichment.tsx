import React, { useState } from 'react';
import { Plus, Linkedin, Sparkles, Check, Edit2, Trash2, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import type { WizardData } from '../OnboardingWizard';

interface StepTeamEnrichmentProps {
  data: WizardData;
  updateData: (updates: Partial<WizardData>) => void;
}

interface EnrichedProfile {
  fullName: string;
  role: string;
  avatarUrl: string;
  bio: string;
  education: string[];
  experience: Array<{ company: string; title: string; duration: string; }>;
}

export function StepTeamEnrichment({ data, updateData }: StepTeamEnrichmentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isEnriching, setIsEnriching] = useState(false);
  const [enrichedProfile, setEnrichedProfile] = useState<EnrichedProfile | null>(null);
  const [manualData, setManualData] = useState({
    fullName: '',
    role: '',
    linkedinUrl: '',
  });

  const handleEnrichProfile = async () => {
    setIsEnriching(true);
    
    // Simulate LinkedIn scraping (2-5 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock enriched data
    const mockProfile: EnrichedProfile = {
      fullName: 'Sarah Chen',
      role: 'CEO & Co-founder',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Former Product Lead at Stripe. 8+ years building B2B SaaS products. Passionate about helping remote teams collaborate better.',
      education: ['Stanford MBA', 'MIT Computer Science'],
      experience: [
        { company: 'Stripe', title: 'Product Lead', duration: '2019-2023' },
        { company: 'Facebook', title: 'PM', duration: '2017-2019' },
      ]
    };
    
    setEnrichedProfile(mockProfile);
    setIsEnriching(false);
  };

  const handleApproveEnrichment = () => {
    if (enrichedProfile) {
      const newFounder = {
        id: crypto.randomUUID(),
        fullName: enrichedProfile.fullName,
        role: enrichedProfile.role,
        linkedinUrl: linkedinUrl,
        avatarUrl: enrichedProfile.avatarUrl,
        bio: enrichedProfile.bio,
        education: enrichedProfile.education,
        experience: enrichedProfile.experience,
      };
      
      updateData({
        founders: [...data.founders, newFounder]
      });
      
      // Reset modal
      setIsModalOpen(false);
      setLinkedinUrl('');
      setEnrichedProfile(null);
    }
  };

  const handleManualAdd = () => {
    const newFounder = {
      id: crypto.randomUUID(),
      fullName: manualData.fullName,
      role: manualData.role,
      linkedinUrl: manualData.linkedinUrl,
    };
    
    updateData({
      founders: [...data.founders, newFounder]
    });
    
    // Reset modal
    setIsModalOpen(false);
    setManualData({ fullName: '', role: '', linkedinUrl: '' });
  };

  const handleRemoveFounder = (id: string) => {
    updateData({
      founders: data.founders.filter(f => f.id !== id)
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <p className="text-sm text-gray-600 mt-1">Add co-founders and key team members</p>
        </div>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Co-founder
        </Button>
      </div>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {data.founders.map((founder) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16 border-2 border-gray-200">
                  {founder.avatarUrl ? (
                    <AvatarImage src={founder.avatarUrl} alt={founder.fullName} />
                  ) : (
                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                      {founder.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 truncate">
                        {founder.fullName}
                      </h4>
                      <p className="text-sm text-gray-600">{founder.role}</p>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFounder(founder.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {founder.bio && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {founder.bio}
                    </p>
                  )}
                  
                  {founder.education && founder.education.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {founder.education.map((edu, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {edu}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {founder.linkedinUrl && (
                    <a
                      href={founder.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {data.founders.length === 0 && (
          <div className="col-span-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members yet</h3>
            <p className="text-gray-600 mb-4">Add your first co-founder to get started</p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Co-founder
            </Button>
          </div>
        )}
      </div>

      {/* Add Founder Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Add Co-founder</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="linkedin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="linkedin">LinkedIn URL</TabsTrigger>
              <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            </TabsList>

            {/* LinkedIn Enrichment Tab */}
            <TabsContent value="linkedin" className="space-y-6 mt-6">
              {!enrichedProfile ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                    <Input
                      id="linkedinUrl"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/sarahchen"
                      className="text-base"
                    />
                    <p className="text-sm text-gray-500">
                      Paste the full LinkedIn URL (e.g., https://linkedin.com/in/username)
                    </p>
                  </div>

                  <Button
                    onClick={handleEnrichProfile}
                    disabled={isEnriching || !linkedinUrl}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    {isEnriching ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Scraping profile...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Enrich Profile
                      </>
                    )}
                  </Button>
                  
                  {isEnriching && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                          <span>Fetching LinkedIn profile...</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-60">
                          <div className="w-4 h-4" />
                          <span>Extracting work experience...</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-40">
                          <div className="w-4 h-4" />
                          <span>Finding education history...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Preview Card */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-8">
                    <div className="flex items-start gap-6 mb-6">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src={enrichedProfile.avatarUrl} alt={enrichedProfile.fullName} />
                        <AvatarFallback className="text-2xl bg-indigo-600 text-white">
                          {enrichedProfile.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {enrichedProfile.fullName}
                        </h3>
                        <p className="text-lg text-gray-600 mb-3">
                          {enrichedProfile.role}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {enrichedProfile.bio}
                        </p>
                      </div>
                    </div>
                    
                    {/* Education */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Education</h4>
                      <div className="flex flex-wrap gap-2">
                        {enrichedProfile.education.map((edu, idx) => (
                          <Badge key={idx} variant="secondary">
                            {edu}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Experience */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Experience</h4>
                      <div className="space-y-2">
                        {enrichedProfile.experience.map((exp, idx) => (
                          <div key={idx} className="flex items-center justify-between text-sm">
                            <div>
                              <span className="font-medium text-gray-900">{exp.title}</span>
                              <span className="text-gray-600"> @ {exp.company}</span>
                            </div>
                            <span className="text-gray-500">{exp.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      onClick={handleApproveEnrichment}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve & Add
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEnrichedProfile(null)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Review the information and click "Approve & Add" to add this team member
                  </p>
                </motion.div>
              )}
            </TabsContent>

            {/* Manual Entry Tab */}
            <TabsContent value="manual" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="manualName">Full Name *</Label>
                <Input
                  id="manualName"
                  value={manualData.fullName}
                  onChange={(e) => setManualData({ ...manualData, fullName: e.target.value })}
                  placeholder="Sarah Chen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manualRole">Role *</Label>
                <Input
                  id="manualRole"
                  value={manualData.role}
                  onChange={(e) => setManualData({ ...manualData, role: e.target.value })}
                  placeholder="CEO & Co-founder"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manualLinkedin">LinkedIn URL (Optional)</Label>
                <Input
                  id="manualLinkedin"
                  value={manualData.linkedinUrl}
                  onChange={(e) => setManualData({ ...manualData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/sarahchen"
                />
              </div>

              <Button
                onClick={handleManualAdd}
                disabled={!manualData.fullName || !manualData.role}
                className="w-full"
              >
                Add Team Member
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Helper Card */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-900 mb-2">LinkedIn Enrichment</h3>
            <p className="text-sm text-purple-800">
              Paste a LinkedIn URL and we'll automatically extract name, title, bio, education, and work experience. 
              This saves you 5-10 minutes per team member!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
