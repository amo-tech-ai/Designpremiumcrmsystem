import React from 'react';
import { 
  LayoutGrid, 
  Plus, 
  Settings, 
  Users, 
  MoreHorizontal,
  LogOut,
  ShieldAlert
} from 'lucide-react';
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const WorkspaceSettings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
      <div className="flex justify-between items-start">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Workspaces</h1>
           <p className="text-slate-500 mt-1">Manage your team environments and permissions.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
           <Plus className="w-4 h-4 mr-2" /> Create Workspace
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Active Workspace */}
        <Card className="border-indigo-100 shadow-md">
           <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-sm">
                       S
                    </div>
                    <div>
                       <CardTitle className="text-lg">StartupAI HQ</CardTitle>
                       <CardDescription>Current Workspace • 12 Members</CardDescription>
                    </div>
                 </div>
                 <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0">Owner</Badge>
              </div>
           </CardHeader>
           <CardContent className="pt-6 space-y-6">
              
              {/* Invite Section */}
              <div className="flex gap-3 items-end">
                 <div className="flex-grow space-y-2">
                    <Label>Invite New Member</Label>
                    <Input placeholder="colleague@company.com" />
                 </div>
                 <div className="w-[140px] space-y-2">
                    <Label>Role</Label>
                    <Select defaultValue="member">
                       <SelectTrigger>
                          <SelectValue />
                       </SelectTrigger>
                       <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                       </SelectContent>
                    </Select>
                 </div>
                 <Button>Invite</Button>
              </div>

              {/* Members List */}
              <div className="space-y-4">
                 <h3 className="text-sm font-semibold text-slate-900">Team Members</h3>
                 <div className="space-y-2">
                    {[
                       { name: "Alex D.", email: "alex@startup.ai", role: "Owner", avatar: "Alex" },
                       { name: "Maria C.", email: "maria@startup.ai", role: "Admin", avatar: "Maria" },
                       { name: "James L.", email: "james@startup.ai", role: "Member", avatar: "James" },
                    ].map((member, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 group">
                          <div className="flex items-center gap-3">
                             <Avatar className="h-9 w-9 border border-slate-200">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.avatar}`} />
                                <AvatarFallback>{member.name[0]}</AvatarFallback>
                             </Avatar>
                             <div>
                                <div className="text-sm font-medium text-slate-900">{member.name}</div>
                                <div className="text-xs text-slate-500">{member.email}</div>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <Badge variant="outline" className="text-slate-500">{member.role}</Badge>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 group-hover:text-slate-600">
                                      <MoreHorizontal className="w-4 h-4" />
                                   </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                   <DropdownMenuItem>Change Role</DropdownMenuItem>
                                   <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

           </CardContent>
        </Card>

        {/* Other Workspaces */}
        <div className="space-y-4">
           <h3 className="text-lg font-bold text-slate-900">Other Workspaces</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:border-indigo-200 transition-colors cursor-pointer group">
                 <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          P
                       </div>
                       <div>
                          <div className="font-bold text-slate-700 group-hover:text-indigo-700">Personal Projects</div>
                          <div className="text-xs text-slate-500">1 Member • Free Plan</div>
                       </div>
                    </div>
                    <Button variant="ghost" size="sm">Switch</Button>
                 </CardContent>
              </Card>

              <Card className="border-dashed flex items-center justify-center hover:bg-slate-50 cursor-pointer transition-colors p-6">
                 <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-indigo-600">
                    <Plus className="w-6 h-6" />
                    <span className="text-sm font-medium">Create New Workspace</span>
                 </div>
              </Card>
           </div>
        </div>

      </div>
    </div>
  );
};
