import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Presentation, 
  Users, 
  Rocket, 
  Settings,
  LogOut,
  ChevronDown,
  LayoutGrid,
  Sparkles
} from 'lucide-react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { cn } from "../ui/utils";
import { Badge } from "../ui/badge";

import { ProfileDropdown } from "../ProfileDropdown";

interface TopNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  showNavLinks?: boolean;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ currentView, onNavigate, showNavLinks = true }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { id: 'landing-v2', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wizard', label: 'Pitch Decks', icon: Presentation },
    { id: 'event-wizard', label: 'Events', icon: Sparkles },
    { id: 'pipeline', label: 'CRM', icon: Users },
    { id: 'gtm', label: 'GTM', icon: Rocket },
    { id: 'lean-canvas', label: 'Canvas', icon: LayoutGrid, badge: 'AI' },
  ];

  const handleNav = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-[#E8EEF5] border-b border-[#E1E6EE] shadow-sm/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-18">
            
            {/* Left: Logo & Product Name */}
            <div className="flex items-center gap-4 md:gap-8">
              <div 
                className={cn(
                  "flex items-center gap-2.5 cursor-pointer group",
                  !showNavLinks && "md:hidden"
                )}
                onClick={() => handleNav('landing-v2')}
              >
                <div className="w-9 h-9 bg-gradient-to-br from-[#6F7EBC] to-[#4A5B78] rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl tracking-tight text-[#1A1F2C] hidden sm:block">
                  StartupAI
                </span>
              </div>

              {/* Desktop Navigation Links */}
              {showNavLinks && (
                <div className="hidden md:flex items-center gap-1">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 group relative",
                        currentView === link.id 
                          ? "text-[#4A5B78] bg-white shadow-sm" 
                          : "text-[#6B7280] hover:text-[#4A5B78] hover:bg-white/50"
                      )}
                    >
                      {link.label}
                      {link.badge && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-[#C9D7F2] text-[#4A5B78] border-0 font-bold">
                          {link.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 md:gap-4">
              
              {/* Search Bar (Desktop) */}
              <div className="hidden lg:flex relative w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-10 h-10 bg-white border-[#E1E6EE] focus:ring-[#4A5B78]/20 focus:border-[#4A5B78] transition-all text-[#1A1F2C] placeholder:text-[#9CA3AF] rounded-xl shadow-sm" 
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex gap-1">
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border border-[#E1E6EE] bg-[#F7F9FC] px-1.5 font-mono text-[10px] font-medium text-[#9CA3AF] opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </div>
              </div>

              {/* Search Icon (Mobile/Tablet) */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden text-[#6B7280] hover:text-[#4A5B78] hover:bg-white/50 rounded-xl"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="text-[#6B7280] hover:text-[#4A5B78] hover:bg-white/50 rounded-xl relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#D56565] rounded-full border-2 border-[#E8EEF5]" />
              </Button>

              {/* Divider */}
              <div className="h-8 w-px bg-[#E1E6EE] hidden sm:block" />

              {/* User Menu */}
              <div className="hidden sm:flex items-center gap-3 pl-1">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-[#1A1F2C] leading-none">Alex D.</span>
                  <span className="text-[10px] text-[#6B7280] uppercase tracking-wide font-bold mt-0.5">Pro Plan</span>
                </div>
                <ProfileDropdown onNavigate={onNavigate} />
              </div>

              {/* Mobile Hamburger */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-[#1A1F2C] hover:bg-white/50 rounded-xl"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Expand */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-[#E1E6EE] bg-[#E8EEF5] px-4 py-4 overflow-hidden shadow-inner"
            >
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <Input 
                  placeholder="Search..." 
                  className="pl-10 w-full bg-white border-[#E1E6EE] rounded-xl h-10"
                  autoFocus
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Drawer (Slide Over) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#1A1F2C]/50 backdrop-blur-sm z-50 md:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-[300px] bg-white shadow-2xl border-l border-[#E1E6EE] md:hidden flex flex-col"
            >
              <div className="p-5 border-b border-[#E1E6EE] flex items-center justify-between bg-[#E8EEF5]">
                <span className="font-bold text-lg text-[#1A1F2C]">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-white/50 rounded-xl">
                  <X className="w-5 h-5 text-[#6B7280]" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto py-5 px-4 bg-[#F7F9FC]">
                <div className="space-y-1.5">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all",
                        currentView === link.id 
                          ? "bg-white text-[#4A5B78] shadow-sm border border-[#E1E6EE]" 
                          : "text-[#6B7280] hover:bg-white hover:text-[#4A5B78] border border-transparent hover:border-[#E1E6EE]"
                      )}
                    >
                      <link.icon className={cn("w-5 h-5", currentView === link.id ? "text-[#4A5B78]" : "text-[#9CA3AF]")} />
                      {link.label}
                      {link.badge && (
                        <Badge variant="secondary" className="ml-auto h-5 text-[10px] bg-[#C9D7F2] text-[#4A5B78] border-0">
                          {link.badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                <div className="my-6 border-t border-[#E1E6EE]" />

                <div className="space-y-1.5">
                   <button onClick={() => handleNav('settings')} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-[#6B7280] hover:bg-white hover:text-[#4A5B78] border border-transparent hover:border-[#E1E6EE] transition-all">
                      <Settings className="w-5 h-5 text-[#9CA3AF]" />
                      Settings
                   </button>
                   <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-[#D56565] hover:bg-[#D56565]/10 border border-transparent transition-all">
                      <LogOut className="w-5 h-5" />
                      Log Out
                   </button>
                </div>
              </div>

              <div className="p-5 border-t border-[#E1E6EE] bg-white">
                <div className="flex items-center gap-3.5">
                  <Avatar className="h-11 w-11 border border-[#E1E6EE]">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                    <AvatarFallback className="bg-[#E8EEF5] text-[#4A5B78] font-bold">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-bold text-[#1A1F2C]">Alex D.</div>
                    <div className="text-xs text-[#6B7280] font-medium">alex@startup.ai</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
