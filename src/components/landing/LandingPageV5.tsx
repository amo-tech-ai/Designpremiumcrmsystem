import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Mail,
  Link2,
  Play,
  CheckCircle,
  Package,
  FileText,
  Eye,
  Lightbulb,
  Zap,
  BarChart2
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import { Footer } from './Footer';

interface LandingPageV5Props {
  onNavigate?: (view: string) => void;
}

export const LandingPageV5: React.FC<LandingPageV5Props> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      
      {/* HEADER */}
      <header className="border-b border-stone-200">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stone-900 rounded flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-bold text-stone-900">StartupAI</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm text-stone-600">
              <a href="#product" className="hover:text-stone-900 transition-colors">Product</a>
              <a href="#features" className="hover:text-stone-900 transition-colors">Features</a>
              <a href="#how" className="hover:text-stone-900 transition-colors">How</a>
              <a href="#pricing" className="hover:text-stone-900 transition-colors">Pricing</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-sm text-stone-600 hover:text-stone-900"
            >
              Log In
            </Button>
            <Button 
              onClick={() => onNavigate && onNavigate('dashboard')}
              className="bg-stone-900 text-white hover:bg-stone-800 text-sm font-medium px-6"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-stone-200 text-xs font-medium text-stone-600 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            PRODUCT UPDATE
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-stone-900 leading-[0.95] mb-6">
            Turn startup ideas into<br />
            <span className="text-rose-600">investor-ready assets</span>
          </h1>
          
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Elevate your AI-agent with legal-grade RAG that cuts time cost and hallucinations.
          </p>

          {/* INPUT CARD */}
          <div className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="pl-10 bg-white border-stone-200"
                  />
                </div>
              </div>
              
              <div className="md:col-span-1">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">
                  URL
                </label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input 
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="startup.com"
                    className="pl-10 bg-white border-stone-200"
                  />
                </div>
              </div>

              <div className="md:col-span-1 flex items-end">
                <Button 
                  onClick={() => onNavigate && onNavigate('dashboard')}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase text-xs tracking-[0.3em]"
                >
                  Generate
                </Button>
              </div>
            </div>
            
            <p className="text-xs text-stone-400 text-center">
              Drop any startup website or pitch deck to get started
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">How it works</h2>
            <p className="text-lg text-stone-600">Three simple steps to investor-ready materials</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Add Context',
                desc: 'Upload your pitch deck, business plan, or share your startup URL. Our AI analyzes your materials.'
              },
              {
                icon: Zap,
                title: 'AI Reasoning',
                desc: 'Our ML models understand your business model, market fit, and competitive landscape automatically.'
              },
              {
                icon: Eye,
                title: 'Edit & Export',
                desc: 'Review AI-generated insights, refine your pitch, and export investor-grade materials in minutes.'
              }
            ].map((step, i) => (
              <div key={i} className="bg-white border border-stone-200 p-8">
                <div className="w-12 h-12 border border-stone-900 flex items-center justify-center mb-6">
                  <step.icon className="w-6 h-6 text-stone-900" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW AUTOMATION */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-stone-900 mb-4">
              Use StartupAI with<br />
              <span className="text-rose-600">Workflow Automation</span>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl">
              StartupAI integrates with your favorite tools to streamline your startup operations and investor relations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {['Notion', 'Airtable', 'HubSpot', 'Slack', 'Google Drive', 'Calendly', 'Stripe', '...2000+ Apps'].map((app, i) => (
              <div 
                key={i} 
                className="px-4 py-2 bg-stone-100 border border-stone-200 text-sm font-medium text-stone-700"
              >
                {app}
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 border border-stone-900"
            >
              Explore Triggers
            </Button>
            <Button className="bg-stone-900 text-white text-xs font-bold uppercase tracking-[0.2em]">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* PRODUCT MODULES */}
      <section id="product" className="py-24 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Product Modules</h2>
            <p className="text-lg text-stone-600">Everything you need to launch and scale your startup</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Pitch Deck Engine',
                desc: 'Auto-generate investor-grade pitch decks with data-driven insights and compelling narratives.'
              },
              {
                icon: FileText,
                title: 'Document Factory',
                desc: 'Create business plans, one-pagers, and executive summaries in seconds, not days.'
              },
              {
                icon: Eye,
                title: 'Visual CRM',
                desc: 'Track investors, manage relationships, and automate outreach with AI-powered intelligence.'
              },
              {
                icon: Lightbulb,
                title: 'Startup Wizard',
                desc: 'Step-by-step guidance through validation, product-market fit, and go-to-market strategy.'
              },
              {
                icon: Zap,
                title: 'Automation',
                desc: 'Connect to 2000+ apps and automate your entire founder workflow from one dashboard.'
              },
              {
                icon: BarChart2,
                title: 'Metrics Scoring & AI',
                desc: 'Real-time analytics on pitch effectiveness, investor sentiment, and fundraising readiness.'
              }
            ].map((module, i) => (
              <div key={i} className="bg-white border border-stone-200 p-8 hover:border-stone-900 transition-colors">
                <div className="w-12 h-12 border border-stone-200 flex items-center justify-center mb-6">
                  <module.icon className="w-6 h-6 text-stone-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900 mb-3">{module.title}</h3>
                <p className="text-stone-600 leading-relaxed mb-6">{module.desc}</p>
                <button className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 hover:text-stone-600 transition-colors">
                  Learn more →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REASONING SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
                Reasoning,<br />
                not just autocomplete.
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                StartupAI doesn't just fill in templates. Our advanced reasoning engine understands your business model, competitive landscape, and investor expectations to generate truly strategic materials.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  'Understand total context',
                  'Source & cite correctly',
                  'Verify legal statements',
                  'Reduce hallucinations'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="text-stone-900">{item}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-[0.3em]">
                Try Reasoning Mode
              </Button>
            </div>

            <div className="bg-stone-900 text-white p-8 rounded font-mono text-sm">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stone-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="ml-auto text-xs text-stone-500">reasoning.json</span>
              </div>

              <pre className="text-xs leading-relaxed overflow-x-auto">
{`{
  "business_model": {
    "type": "B2B SaaS",
    "target_market": "Early-stage founders",
    "revenue_streams": [
      "Subscription: $29-79/mo",
      "Enterprise: Custom pricing"
    ]
  },
  "market_opportunity": {
    "tam": "$12.4B",
    "serviceable": "$2.1B",
    "reasoning": "2M+ startups founded yearly,\n                  15% seek funding"
  },
  "competitive_advantage": [
    "AI reasoning engine (not templates)",
    "2000+ integrations",
    "Investor-grade output quality"
  ],
  "confidence_score": 0.94
}`}
              </pre>
              
              <div className="mt-6 pt-6 border-t border-stone-700 flex items-center justify-between">
                <span className="text-xs text-stone-400">Generated in 2.4s</span>
                <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs">
                  Export Analysis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-stone-50 border-y border-stone-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              Simple pricing for serious founders
            </h2>
            <p className="text-lg text-stone-600">Choose the plan that fits your stage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: 'Free forever',
                features: [
                  'AI pitch deck builder',
                  '3 decks per month',
                  'Basic templates',
                  'Community support'
                ],
                cta: 'Get Started',
                highlighted: false
              },
              {
                name: 'Pro',
                price: '$29',
                period: 'per month',
                features: [
                  'Unlimited pitch decks',
                  'All premium templates',
                  'AI reasoning engine',
                  'CRM & automation',
                  'Priority support'
                ],
                cta: 'Start Free Trial',
                highlighted: true
              },
              {
                name: 'Teams',
                price: '$79',
                period: 'per month',
                features: [
                  'Everything in Pro',
                  'Unlimited team members',
                  'Custom branding',
                  'API access',
                  'Dedicated support'
                ],
                cta: 'Contact Sales',
                highlighted: false
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "bg-white border p-8",
                  plan.highlighted ? "border-rose-600" : "border-stone-200"
                )}
              >
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 bg-rose-600 text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">
                    Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-serif font-bold text-stone-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-serif font-bold text-stone-900">{plan.price}</span>
                  <span className="text-stone-600 ml-2">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-stone-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => onNavigate && onNavigate('dashboard')}
                  className={cn(
                    "w-full font-bold uppercase text-xs tracking-[0.3em]",
                    plan.highlighted 
                      ? "bg-rose-600 hover:bg-rose-700 text-white" 
                      : "bg-white border border-stone-900 text-stone-900 hover:bg-stone-50"
                  )}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} currentView="landing-v5" />
      
    </div>
  );
};