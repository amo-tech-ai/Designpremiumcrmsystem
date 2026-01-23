import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const HomepageV2: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />
      
      {/* How It Works - Diagram Section */}
      <HowItWorks />
      
      {/* System Architecture - Process Diagram */}
      <SystemArchitecture />
      
      {/* Features - Box Diagrams */}
      <Features />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-8 pt-32 pb-24">
      <div className="max-w-[720px]">
        <h1 className="text-[56px] leading-[1.1] font-serif font-medium text-[#1A1A1A] mb-6">
          The AI-Native Operating System for Startups
        </h1>
        <p className="text-xl text-[#57534E] leading-relaxed mb-12 font-light">
          StartupAI unifies your sales pipeline, fundraising workflow, and strategic planning into one intelligent platform. Built for founders who need clarity, not complexity.
        </p>
        <button className="bg-[#57534E] text-white px-8 py-4 text-base font-medium hover:bg-[#44403C] transition-colors">
          Start Building →
        </button>
      </div>
    </section>
  );
};

const HowItWorks: React.FC = () => {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reveal steps sequentially
            [0, 1, 2].forEach((index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...new Set([...prev, index])]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    { label: 'Input', description: 'Connect your LinkedIn, pitch deck, or website' },
    { label: 'Process', description: 'AI analyzes and structures your data' },
    { label: 'Output', description: 'Get actionable insights and next steps' },
  ];

  return (
    <section ref={sectionRef} className="max-w-[1200px] mx-auto px-8 py-32 border-t border-[#E7E5E4]">
      <h2 className="text-4xl font-serif font-medium text-[#1A1A1A] mb-16">How It Works</h2>
      
      {/* Flow Diagram */}
      <div className="flex items-center gap-8 mb-24">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex-1 transition-opacity duration-500 ${
                visibleSteps.includes(index) ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="border-2 border-[#D6D3D1] rounded-lg p-8 min-h-[140px] flex flex-col justify-center">
                <div className="text-sm text-[#A8A29E] uppercase tracking-wider mb-2 font-medium">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-xl font-medium text-[#1A1A1A] mb-2">{step.label}</div>
                <div className="text-sm text-[#57534E] leading-relaxed">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`transition-opacity duration-500 ${
                  visibleSteps.includes(index + 1) ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <ArrowRight className="w-8 h-8 text-[#A8A29E]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Explanation */}
      <div className="max-w-[720px]">
        <p className="text-lg text-[#57534E] leading-relaxed">
          No manual data entry. No scattered spreadsheets. StartupAI automatically extracts, enriches, and organizes your startup data into a unified operating system.
        </p>
      </div>
    </section>
  );
};

const SystemArchitecture: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#FAFAF9] py-32">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2 className="text-4xl font-serif font-medium text-[#1A1A1A] mb-16">
          One System, Eight Dashboards
        </h2>

        {/* System Diagram */}
        <div
          className={`transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="grid grid-cols-3 gap-6 mb-12">
            {/* Core */}
            <div className="col-span-3 flex justify-center mb-6">
              <div className="border-2 border-[#57534E] rounded-lg p-6 bg-white max-w-[300px] text-center">
                <div className="text-sm text-[#A8A29E] uppercase tracking-wider mb-1">Core</div>
                <div className="font-medium text-[#1A1A1A]">AI Engine</div>
              </div>
            </div>

            {/* Left Column - Sales */}
            <div className="space-y-4">
              <div className="text-sm text-[#A8A29E] uppercase tracking-wider mb-3">Sales</div>
              {['Contacts', 'Sales Pipeline', 'Lead Intelligence'].map((item) => (
                <div key={item} className="border border-[#D6D3D1] rounded-lg p-4 bg-white">
                  <div className="text-sm text-[#1A1A1A]">{item}</div>
                </div>
              ))}
            </div>

            {/* Middle Column - Strategy */}
            <div className="space-y-4">
              <div className="text-sm text-[#A8A29E] uppercase tracking-wider mb-3">Strategy</div>
              {['Dashboard Home', 'GTM Strategy', 'Projects'].map((item) => (
                <div key={item} className="border border-[#D6D3D1] rounded-lg p-4 bg-white">
                  <div className="text-sm text-[#1A1A1A]">{item}</div>
                </div>
              ))}
            </div>

            {/* Right Column - Fundraising */}
            <div className="space-y-4">
              <div className="text-sm text-[#A8A29E] uppercase tracking-wider mb-3">Fundraising</div>
              {['Investor Pipeline', 'Pitch Deck'].map((item) => (
                <div key={item} className="border border-[#D6D3D1] rounded-lg p-4 bg-white">
                  <div className="text-sm text-[#1A1A1A]">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[720px]">
          <p className="text-lg text-[#57534E] leading-relaxed">
            All dashboards share the same AI foundation. Update your company profile once, and every tool adapts automatically.
          </p>
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      title: 'Sales CRM',
      process: ['Lead Capture', 'AI Enrichment', 'Auto-Scoring', 'Next Steps'],
    },
    {
      title: 'Investor Relations',
      process: ['Pipeline Setup', 'Deal Tracking', 'Update Distribution', 'Close Tracking'],
    },
    {
      title: 'Pitch Generation',
      process: ['Template Select', 'AI Draft', 'Review & Edit', 'Export Deck'],
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-8 py-32 border-t border-[#E7E5E4]">
      <h2 className="text-4xl font-serif font-medium text-[#1A1A1A] mb-16">
        Built for Every Stage
      </h2>

      <div className="grid grid-cols-3 gap-12">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ title: string; process: string[] }> = ({ title, process }) => {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <h3 className="text-xl font-medium text-[#1A1A1A] mb-8">{title}</h3>
      <div className="space-y-3">
        {process.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full border-2 border-[#D6D3D1] flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="text-xs text-[#A8A29E]">{index + 1}</div>
            </div>
            <div className="text-sm text-[#57534E] leading-relaxed">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CTASection: React.FC = () => {
  return (
    <section className="bg-[#292524] py-24">
      <div className="max-w-[1200px] mx-auto px-8 text-center">
        <h2 className="text-4xl font-serif font-medium text-white mb-6">
          Ready to Build Smarter?
        </h2>
        <p className="text-lg text-[#D6D3D1] mb-10 max-w-[600px] mx-auto">
          Join founders using StartupAI to run sales, fundraising, and strategy from one platform.
        </p>
        <button className="bg-white text-[#1A1A1A] px-8 py-4 text-base font-medium hover:bg-[#F5F5F4] transition-colors">
          Get Started
        </button>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const routes = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Business Model', path: '/business-model' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Login', path: '/auth' },
  ];

  const currentPath = window.location.pathname;

  return (
    <footer className="border-t border-[#E7E5E4] py-12">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-xl font-serif font-medium text-[#1A1A1A]">StartupAI</div>
          <nav className="flex gap-8">
            {routes.map((route) => (
              <a
                key={route.path}
                href={route.path}
                className={`text-sm transition-colors ${
                  currentPath === route.path
                    ? 'text-[#1A1A1A] font-medium'
                    : 'text-[#78716C] hover:text-[#1A1A1A]'
                }`}
              >
                {route.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="text-sm text-[#A8A29E]">
          © 2026 StartupAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default HomepageV2;
