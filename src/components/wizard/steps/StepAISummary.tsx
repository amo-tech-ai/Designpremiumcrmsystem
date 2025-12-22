import React from 'react';
import { 
  CheckCircle2, 
  Globe, 
  Search, 
  Target, 
  Zap, 
  DollarSign, 
  Users, 
  TrendingUp,
  ShieldCheck,
  Link as LinkIcon,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Lightbulb,
  ArrowRight,
  Fingerprint,
  BarChart3,
  Layers,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { cn } from '../../ui/utils';

export const StepAISummary = () => {
  // Mock Data
  const summaryData = {
    name: "Acme Corp",
    summary: "Acme Corp is a B2B SaaS platform streamlining creative workflows for enterprise marketing teams. By integrating AI-driven asset generation with approval management, it reduces campaign time-to-market by 40%. The platform positions itself as a 'luxury utility' for high-growth brands.",
    category: "Marketing Tech",
    industry: "B2B SaaS",
    badges: ["Search Grounded", "URL Context Extracted"]
  };

  const founderData = {
    name: "Alex Rivera",
    role: "CEO & Co-Founder",
    headline: "Ex-Adobe Product Lead | Building the future of Creative Ops",
    experience: [
      { role: "Product Lead", company: "Adobe", years: "4 years", detail: "Led Creative Cloud enterprise features" },
      { role: "Senior PM", company: "Figma", years: "2 years", detail: "Collaboration workflows" }
    ],
    education: { school: "Stanford University", degree: "BS Computer Science" },
    signals: [
      { label: "Founder-Market Fit", value: "High", color: "text-green-600" },
      { label: "Domain Expertise", value: "Deep", color: "text-purple-600" }
    ]
  };

  const websiteInsights = {
    valueProp: "Design 10x faster with AI-powered creative ops",
    productSummary: "An all-in-one workspace for creative teams to brief, generate, review, and approve assets.",
    features: ["AI Asset Generation", "Visual Feedback", "Version Control", "Brand Guardrails"],
    audience: ["Enterprise Marketing Teams", "Creative Agencies", "Design Operations"],
    pricing: "Freemium + Enterprise Tier",
    phrases: ["Collaborative intelligence", "Brand consistency at scale", "Enterprise-grade security"]
  };

  const marketData = {
    competitors: [
      { name: "Frame.io", url: "frame.io", positioning: "Video collaboration focus" },
      { name: "Canva Enterprise", url: "canva.com", positioning: "Broad design tool" },
      { name: "Bynder", url: "bynder.com", positioning: "DAM focused" }
    ],
    trends: [
      "Shift towards Generative AI integration in DAMs",
      "Consolidation of creative tools into suites",
      "Increased focus on brand safety in AI generation"
    ],
    labels: ["Creative Operations", "DAM", "Generative AI", "Enterprise Collaboration"]
  };

  const searchData = {
    queries: [
      "Acme Corp competitors",
      "Creative operations software market size 2025",
      "AI in digital asset management trends"
    ],
    sources: ["Website", "LinkedIn", "Crunchbase", "G2 Reviews"],
    extracted: ["3 Competitors", "5 Market Trends", "Pricing Tier Structure"]
  };

  const signals = {
    general: [
      { label: "Industry", value: "Marketing Technology" },
      { label: "Stage", value: "Seed / Series A Ready" },
      { label: "Messaging", value: "Clear & Value-Focused" }
    ],
    product: [
      { label: "Core Problem", value: "Fragmented creative workflows" },
      { label: "Solution Theme", value: "Unified AI-native workspace" },
      { label: "Differentiator", value: "Deep Adobe integration" }
    ],
    market: [
      { label: "Competitor Density", value: "High" },
      { label: "Trend Alignment", value: "Strong (GenAI Wave)" }
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-sans text-[#1A1A1A]">
      
      {/* 2. Top Summary Card */}
      <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
           <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#6A4DFE] to-[#9C7AFE] flex items-center justify-center text-white shadow-md flex-shrink-0">
              <Zap className="w-8 h-8" />
           </div>
           <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <div>
                    <h2 className="text-2xl font-serif font-bold text-[#1A1A1A]">{summaryData.name}</h2>
                    <div className="flex gap-2 mt-2">
                       {summaryData.badges.map((badge, i) => (
                          <Badge key={i} variant="secondary" className="bg-[#F3E8FF] text-[#6B21A8] hover:bg-[#E9D5FF] border-[#E9D5FF] gap-1">
                             <Sparkles className="w-3 h-3" /> {badge}
                          </Badge>
                       ))}
                    </div>
                 </div>
                 <div className="flex gap-2">
                    <Badge variant="outline" className="text-[#6B7280] border-[#E5E5E5]">{summaryData.category}</Badge>
                    <Badge variant="outline" className="text-[#6B7280] border-[#E5E5E5]">{summaryData.industry}</Badge>
                 </div>
              </div>
              <p className="text-[#4B5563] leading-relaxed max-w-4xl">
                 {summaryData.summary}
              </p>
           </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column - 8 cols */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* 3. Founder / LinkedIn Identity Extraction */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl">
              <CardHeader className="pb-3 border-b border-[#F3F4F6]">
                 <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                    <div className="p-1.5 bg-[#0077B5]/10 rounded-md">
                       <Briefcase className="w-5 h-5 text-[#0077B5]" />
                    </div>
                    Founder Identity & Experience
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-[#F3F4F6] border border-[#E5E5E5] flex items-center justify-center text-[#9CA3AF]">
                          <Users className="w-6 h-6" />
                       </div>
                       <div>
                          <h3 className="font-bold text-[#1A1A1A]">{founderData.name}</h3>
                          <div className="text-sm text-[#6B21A8] font-medium">{founderData.role}</div>
                          <div className="text-xs text-[#6B7280] mt-0.5">{founderData.headline}</div>
                       </div>
                    </div>
                    
                    <div className="space-y-3 pt-2">
                       <div className="flex items-center gap-2 text-sm font-bold text-[#1A1A1A]">
                          <Award className="w-4 h-4 text-[#6A4DFE]" /> Founder Signals
                       </div>
                       <div className="flex gap-2 flex-wrap">
                          {founderData.signals.map((sig, i) => (
                             <div key={i} className="px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E5E5] rounded-lg text-xs">
                                <span className="text-[#6B7280] font-medium">{sig.label}:</span> <span className={cn("font-bold ml-1", sig.color)}>{sig.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="space-y-4 border-l border-[#F3F4F6] pl-0 md:pl-8">
                    <div>
                       <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Experience Summary</h4>
                       <ul className="space-y-3">
                          {founderData.experience.map((exp, i) => (
                             <li key={i} className="flex gap-3 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#6A4DFE] mt-1.5 flex-shrink-0" />
                                <div>
                                   <span className="font-bold text-[#1A1A1A]">{exp.role}</span>
                                   <span className="text-[#6B7280]"> @ {exp.company}</span>
                                   <div className="text-xs text-[#9CA3AF] mt-0.5">{exp.detail}</div>
                                </div>
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                           <GraduationCap className="w-4 h-4 text-[#9CA3AF]" />
                           <span>{founderData.education.school}, {founderData.education.degree}</span>
                        </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* 4. Startup Website Insights */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl">
              <CardHeader className="pb-3 border-b border-[#F3F4F6]">
                 <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                    <div className="p-1.5 bg-[#F3E8FF] rounded-md">
                       <Globe className="w-5 h-5 text-[#6B21A8]" />
                    </div>
                    Website Context Insights
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div>
                    <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Detected Value Proposition</h4>
                    <p className="text-lg font-serif font-medium text-[#1A1A1A] italic">"{websiteInsights.valueProp}"</p>
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div>
                          <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Key Features</h4>
                          <div className="flex flex-wrap gap-2">
                             {websiteInsights.features.map((f, i) => (
                                <Badge key={i} variant="secondary" className="bg-[#F7F7F5] text-[#1A1A1A] border-[#E5E5E5] font-normal">{f}</Badge>
                             ))}
                          </div>
                       </div>
                       <div>
                          <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Target Audience</h4>
                          <ul className="space-y-1">
                             {websiteInsights.audience.map((a, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-[#4B5563]">
                                   <Target className="w-3.5 h-3.5 text-[#9CA3AF]" /> {a}
                                </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div>
                          <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Product Summary</h4>
                          <p className="text-sm text-[#4B5563] leading-relaxed">{websiteInsights.productSummary}</p>
                       </div>
                       <div>
                          <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">Detected Phrases</h4>
                          <div className="flex flex-wrap gap-2">
                             {websiteInsights.phrases.map((p, i) => (
                                <span key={i} className="text-xs text-[#6B7280] bg-[#F9FAFB] px-2 py-1 rounded border border-[#F3F4F6]">"{p}"</span>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* 5. Competitor & Market Intelligence */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl">
              <CardHeader className="pb-3 border-b border-[#F3F4F6]">
                 <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                    <div className="p-1.5 bg-[#DCFCE7] rounded-md">
                       <Search className="w-5 h-5 text-[#166534]" />
                    </div>
                    Competitor & Market Intelligence
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="grid md:grid-cols-3 gap-4">
                    {marketData.competitors.map((comp, i) => (
                       <div key={i} className="p-4 rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] hover:border-[#D1D5DB] transition-colors">
                          <div className="font-bold text-[#1A1A1A] text-sm mb-1">{comp.name}</div>
                          <div className="text-xs text-[#6A4DFE] mb-2">{comp.url}</div>
                          <div className="text-xs text-[#6B7280]">{comp.positioning}</div>
                       </div>
                    ))}
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                       <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Industry Trends</h4>
                       <ul className="space-y-2">
                          {marketData.trends.map((trend, i) => (
                             <li key={i} className="flex gap-2 text-sm text-[#4B5563]">
                                <TrendingUp className="w-4 h-4 text-[#6A4DFE] flex-shrink-0" />
                                <span>{trend}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                       <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Market Labels</h4>
                       <div className="flex flex-wrap gap-2">
                          {marketData.labels.map((label, i) => (
                             <Badge key={i} variant="outline" className="border-[#E5E5E5] text-[#6B7280]">{label}</Badge>
                          ))}
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* 7. Detected Signals (Expanded) */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl">
              <CardHeader className="pb-3 border-b border-[#F3F4F6]">
                 <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1A1A1A]">
                    <div className="p-1.5 bg-[#F3F4F6] rounded-md">
                       <BarChart3 className="w-5 h-5 text-[#4B5563]" />
                    </div>
                    Detected Signals
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="divide-y divide-[#F3F4F6]">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="text-sm font-bold text-[#1A1A1A]">General Signals</div>
                       <div className="md:col-span-2 grid grid-cols-2 gap-4">
                          {signals.general.map((s, i) => (
                             <div key={i}>
                                <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-0.5">{s.label}</div>
                                <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="text-sm font-bold text-[#1A1A1A]">Product Signals</div>
                       <div className="md:col-span-2 grid grid-cols-2 gap-4">
                          {signals.product.map((s, i) => (
                             <div key={i}>
                                <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-0.5">{s.label}</div>
                                <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                       <div className="text-sm font-bold text-[#1A1A1A]">Market Signals</div>
                       <div className="md:col-span-2 grid grid-cols-2 gap-4">
                          {signals.market.map((s, i) => (
                             <div key={i}>
                                <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-0.5">{s.label}</div>
                                <div className="text-sm font-medium text-[#1A1A1A]">{s.value}</div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
           
           {/* 6. Detailed Search Breakdown */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl overflow-hidden">
               <div className="bg-[#FAFAFA] p-4 border-b border-[#E5E5E5] flex justify-between items-center">
                   <h3 className="font-bold text-[#1A1A1A] text-sm flex items-center gap-2">
                       <Search className="w-4 h-4 text-[#9CA3AF]" /> Research Queries Used
                   </h3>
                   <Badge variant="outline" className="bg-white text-[#6B7280] text-[10px] uppercase tracking-widest">System Log</Badge>
               </div>
               <div className="p-6 grid md:grid-cols-2 gap-8">
                   <div>
                       <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Queries Gemini Executed</h4>
                       <ul className="space-y-2">
                           {searchData.queries.map((q, i) => (
                               <li key={i} className="flex gap-2 text-sm text-[#4B5563] italic">
                                   <div className="w-1.5 h-1.5 rounded-full bg-[#E5E5E5] mt-2 flex-shrink-0" />
                                   "{q}"
                               </li>
                           ))}
                       </ul>
                   </div>
                   <div>
                       <h4 className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Data Sources & Extraction</h4>
                       <div className="space-y-4">
                           <div className="flex flex-wrap gap-2">
                               {searchData.sources.map((src, i) => (
                                   <Badge key={i} variant="secondary" className="bg-[#F3F4F6] text-[#6B7280] border-[#E5E5E5]">{src}</Badge>
                               ))}
                           </div>
                           <div className="text-xs text-[#9CA3AF]">
                               Extracted: {searchData.extracted.join(', ')}
                           </div>
                       </div>
                   </div>
               </div>
           </Card>

        </div>

        {/* Right Column - 4 cols */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* 8. Recommended Actions */}
           <Card className="border-0 shadow-md bg-gradient-to-br from-[#6A4DFE] to-[#9C7AFE] text-white rounded-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-6 relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-white" />
                    <h3 className="font-bold text-lg">Recommended Actions</h3>
                 </div>
                 <div className="space-y-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                       <div className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-[#A5F3FC] mt-0.5 flex-shrink-0" />
                          <div>
                             <div className="text-sm font-bold">Validate Founder Details</div>
                             <div className="text-xs text-white/80 mt-0.5">Confirm dates & roles from LinkedIn</div>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                       <div className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-[#A5F3FC] mt-0.5 flex-shrink-0" />
                          <div>
                             <div className="text-sm font-bold">Confirm Competitors</div>
                             <div className="text-xs text-white/80 mt-0.5">Are these the right rivals?</div>
                          </div>
                       </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                       <div className="flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-[#A5F3FC] mt-0.5 flex-shrink-0" />
                          <div>
                             <div className="text-sm font-bold">Review Pricing</div>
                             <div className="text-xs text-white/80 mt-0.5">Check if freemium is accurate</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* 9. Analysis Metadata */}
           <Card className="border border-[#E5E5E5] shadow-sm bg-white rounded-xl">
              <CardHeader className="pb-3 border-b border-[#F3F4F6] px-6 pt-6">
                 <CardTitle className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-[#9CA3AF]" /> Analysis Metadata
                 </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#6B7280]">Sources Analyzed</span>
                       <span className="font-medium text-[#1A1A1A]">4 URLs</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#6B7280]">Search Queries</span>
                       <span className="font-medium text-[#1A1A1A]">3 Queries</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#6B7280]">Signals Extracted</span>
                       <span className="font-medium text-[#1A1A1A]">12 Signals</span>
                    </div>
                    <Separator className="bg-[#F3F4F6]" />
                    <div className="flex justify-between items-center text-sm">
                       <span className="text-[#6B7280]">Grounding</span>
                       <Badge variant="outline" className="text-[#166534] bg-[#DCFCE7] border-[#DCFCE7] gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active
                       </Badge>
                    </div>
                 </div>
              </CardContent>
           </Card>

           {/* Ready to proceed section */}
           <div className="bg-[#F7F7F5] border border-[#E5E5E5] rounded-xl p-6">
               <h4 className="text-sm font-bold text-[#1A1A1A] mb-2 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-[#6B7280]" /> Ready to proceed?
               </h4>
               <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                  Review the insights above. In the next step, you'll be able to edit and confirm your team members.
               </p>
               <div className="flex items-center gap-2 text-xs font-medium text-[#6B21A8]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI has drafted your profiles</span>
               </div>
           </div>

        </div>

      </div>

    </div>
  );
};
