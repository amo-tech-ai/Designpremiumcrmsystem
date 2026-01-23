import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
  currentView?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, currentView }) => {
  
  const handleNav = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  const linkClass = (view: string) => `hover:text-[#1A1A1A] cursor-pointer transition-colors ${currentView === view ? 'text-[#1A1A1A] font-medium' : ''}`;

  return (
    <footer className="bg-white pt-16 pb-12 border-t border-[#E5E5E5] font-sans">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif text-[#1A1A1A]">Startup AI</span>
            </div>
            <p className="text-[#6B7280] text-sm max-w-xs mb-6 font-sans">
              The operating system for modern startups. Build, launch, and scale with intelligence.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E5E5] cursor-pointer transition-colors" />
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1A1A] mb-4 font-serif">Product</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li className={linkClass('event-wizard')} onClick={() => handleNav('event-wizard')}>Event Wizard</li>
              <li className={linkClass('wizard')} onClick={() => handleNav('wizard')}>Pitch Deck Wizard</li>
              <li className={linkClass('startup-profile')} onClick={() => handleNav('startup-profile')}>Startup Profile Wizard</li>
              <li className={linkClass('profile')} onClick={() => handleNav('profile')}>Account Settings</li>
              <li className={linkClass('gtm')} onClick={() => handleNav('gtm')}>GTM Strategy</li>
              <li className={linkClass('insights')} onClick={() => handleNav('insights')}>Market Research</li>
              <li className={linkClass('pricing')} onClick={() => handleNav('pricing')}>Pricing</li>
              <li className={linkClass('landing-v2')} onClick={() => handleNav('landing-v2')}>Home v2 (New)</li>
              <li className={linkClass('landing-v5')} onClick={() => handleNav('landing-v5')}>Home v5 ✓</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1A1A] mb-4 font-serif">Resources</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li className={linkClass('blog')} onClick={() => handleNav('blog')}>Blog</li>
              <li className={linkClass('community')} onClick={() => handleNav('community')}>Community</li>
              <li className={linkClass('help')} onClick={() => handleNav('help')}>Help Center</li>
              <li className={linkClass('templates')} onClick={() => handleNav('templates')}>Templates</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1A1A1A] mb-4 font-serif">Company</h4>
            <ul className="space-y-3 text-sm text-[#6B7280]">
              <li className={linkClass('about')} onClick={() => handleNav('about')}>About</li>
              <li className={linkClass('how-it-works')} onClick={() => handleNav('how-it-works')}>How it Works</li>
              <li className={linkClass('business-model')} onClick={() => handleNav('business-model')}>Business Model</li>
              <li className={linkClass('careers')} onClick={() => handleNav('careers')}>Careers</li>
              <li className={linkClass('legal')} onClick={() => handleNav('legal')}>Legal</li>
              <li className={linkClass('contact')} onClick={() => handleNav('contact')}>Contact</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#9CA3AF]">
          <p>© 2024 Startup AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className={linkClass('legal')} onClick={() => handleNav('legal')}>Privacy Policy</span>
            <span className={linkClass('legal')} onClick={() => handleNav('legal')}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};