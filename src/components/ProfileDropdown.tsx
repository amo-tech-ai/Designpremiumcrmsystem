import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  Settings, 
  CreditCard, 
  LayoutGrid, 
  HelpCircle, 
  LogOut,
  Rocket
} from "lucide-react";
import { cn } from "./ui/utils";

import { LogoutModal } from "./modals/LogoutModal";

interface ProfileDropdownProps {
  className?: string;
  align?: "start" | "end" | "center";
  sideOffset?: number;
  onNavigate?: (view: string) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  className,
  align = "end", 
  sideOffset = 8,
  onNavigate
}) => {
  const [showLogout, setShowLogout] = React.useState(false);

  const handleNavigate = (view: string) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <div className={cn("cursor-pointer transition-opacity hover:opacity-80 outline-none", className)}>
          <Avatar className="h-9 w-9 border border-slate-200 shadow-sm">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex D." />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-[260px] rounded-2xl p-2 shadow-xl border-slate-100 bg-white/95 backdrop-blur-sm dark:bg-slate-900/95 dark:border-slate-800" 
        align={align} 
        sideOffset={sideOffset}
      >
        {/* User Block */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar className="h-10 w-10 border border-slate-100 dark:border-slate-800">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Alex D.</span>
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full w-fit dark:bg-indigo-900/30 dark:text-indigo-400">
              Pro Plan
            </span>
          </div>
        </div>
        
        <DropdownMenuSeparator className="bg-slate-100 my-1 dark:bg-slate-800" />
        
        {/* Menu Items */}
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem onClick={() => handleNavigate('profile')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none data-[highlighted]:bg-slate-50 transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100 dark:data-[highlighted]:bg-slate-800">
            <div className="flex items-center gap-3 w-full relative">
              {/* Active Indicator Bar */}
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-data-[highlighted]:opacity-100" />
              
              <User className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">View Profile</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigate('wizard')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100">
             <div className="flex items-center gap-3 w-full relative">
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-focus:opacity-100" />
              
              <Rocket className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">Startup Profile</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigate('settings-account')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100">
             <div className="flex items-center gap-3 w-full relative">
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-focus:opacity-100" />
              
              <Settings className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">Account Settings</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigate('settings-billing')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100">
             <div className="flex items-center gap-3 w-full relative">
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-focus:opacity-100" />
              
              <CreditCard className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">Plan & Billing</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigate('settings-workspaces')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100">
             <div className="flex items-center gap-3 w-full relative">
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-focus:opacity-100" />
              
              <LayoutGrid className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">Workspaces</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigate('support')} className="rounded-xl cursor-pointer py-2.5 px-3 text-slate-600 focus:text-slate-900 focus:bg-slate-50 focus:outline-none transition-colors group dark:text-slate-400 dark:focus:bg-slate-800 dark:focus:text-slate-100">
             <div className="flex items-center gap-3 w-full relative">
              <div className="absolute -left-3 h-full w-1 rounded-r-full bg-indigo-600 opacity-0 transition-opacity group-focus:opacity-100" />
              
              <HelpCircle className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-colors dark:text-slate-500 dark:group-hover:text-indigo-400" />
              <span className="text-sm font-medium">Help & Support</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator className="bg-slate-100 my-1 dark:bg-slate-800" />
        
        {/* Footer Action */}
        <DropdownMenuItem onClick={() => setShowLogout(true)} className="rounded-xl cursor-pointer py-2.5 px-3 text-red-600 focus:text-red-700 focus:bg-red-50 focus:outline-none transition-colors group mt-1 dark:focus:bg-red-900/20">
          <div className="flex items-center gap-3 w-full">
            <LogOut className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </DropdownMenuItem>
      
      </DropdownMenuContent>
    </DropdownMenu>

    <LogoutModal 
      isOpen={showLogout} 
      onClose={() => setShowLogout(false)} 
      onConfirm={() => {
        setShowLogout(false);
        console.log("Logged out");
      }} 
    />
    </>
  );
};
