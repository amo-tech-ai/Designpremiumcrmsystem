import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Github, 
  Linkedin, 
  History,
  LogOut,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export const AccountSettings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Security</h1>
        <p className="text-slate-500 mt-1">Manage your login methods and security preferences.</p>
      </div>

      {/* Password & 2FA */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" /> Login & Security
          </CardTitle>
          <CardDescription>Protect your account with a strong password and 2FA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Password Change */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Change Password</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input type="password" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">Update Password</Button>
            </div>
          </div>

          <Separator />

          {/* 2FA */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
               <div className="flex items-center gap-2">
                 <h3 className="text-sm font-semibold text-slate-900">Two-Factor Authentication</h3>
                 <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Enabled</Badge>
               </div>
               <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-indigo-600" /> Connected Accounts
          </CardTitle>
          <CardDescription>Log in easily with your social accounts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          
          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </div>
              <div>
                <div className="font-medium text-sm">Google</div>
                <div className="text-xs text-slate-500">alex@startup.ai</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">GitHub</div>
                <div className="text-xs text-slate-500">Not connected</div>
              </div>
            </div>
            <Button variant="secondary" size="sm">Connect</Button>
          </div>

          <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0077b5] text-white rounded-full flex items-center justify-center">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-medium text-sm">LinkedIn</div>
                <div className="text-xs text-slate-500">Connected as Alex D.</div>
              </div>
            </div>
            <Button variant="outline" size="sm">Disconnect</Button>
          </div>

        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
           <CardTitle>API Keys</CardTitle>
           <CardDescription>Manage API access for external integrations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-xs text-slate-600 overflow-x-auto">
              <span className="flex-grow">sk_live_51Mz...Xy9z</span>
              <Badge variant="secondary">Active</Badge>
              <Button variant="ghost" size="sm" className="h-6 text-slate-400 hover:text-red-500"><AlertTriangle className="w-3 h-3" /></Button>
           </div>
           <Button className="w-full border-dashed" variant="outline">
              <Key className="w-4 h-4 mr-2" /> Generate New Key
           </Button>
        </CardContent>
      </Card>

      {/* Activity Log */}
      <Card>
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <History className="w-5 h-5 text-indigo-600" /> Recent Activity
            </CardTitle>
         </CardHeader>
         <CardContent>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Action</TableHead>
                     <TableHead>Device</TableHead>
                     <TableHead>Location</TableHead>
                     <TableHead className="text-right">Time</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  <TableRow>
                     <TableCell className="font-medium">Login Success</TableCell>
                     <TableCell className="text-slate-500 flex items-center gap-2"><Smartphone className="w-3 h-3" /> iPhone 14</TableCell>
                     <TableCell>San Francisco, US</TableCell>
                     <TableCell className="text-right text-slate-500">Just now</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-medium">Password Changed</TableCell>
                     <TableCell className="text-slate-500">Chrome on Mac</TableCell>
                     <TableCell>San Francisco, US</TableCell>
                     <TableCell className="text-right text-slate-500">2 days ago</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </CardContent>
      </Card>

    </div>
  );
};
