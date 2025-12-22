import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5 text-slate-600" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 hidden sm:inline-block">
                StartupAI
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                type="text"
                placeholder="Search projects, tasks, or documents..."
                className="w-full pl-9 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-2 pr-1 h-10 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-7 h-7">
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-slate-700 hidden sm:inline-block">Sarah Chen</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-rose-600">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="mt-4 hidden md:flex items-center gap-2 text-sm text-slate-500">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">Dashboard</span>
          <span className="text-slate-300">/</span>
          <span className="font-medium text-slate-900">Projects</span>
        </div>
      </div>
    </header>
  );
}
