import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Activity, FileText, CheckCircle2, UserPlus, Zap } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      user: { name: 'Alex F.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
      action: 'updated the',
      target: 'Pitch Deck',
      time: '2h ago',
      icon: FileText,
      iconColor: 'bg-[#C9D7F2] text-[#4A5B78]', // Lavender
    },
    {
      user: { name: 'Sarah M.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      action: 'completed task',
      target: 'Competitor Analysis',
      time: '4h ago',
      icon: CheckCircle2,
      iconColor: 'bg-[#A8E6C1] text-[#263344]', // Mint (Darker text for contrast)
    },
    {
      user: { name: 'Mike R.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' },
      action: 'added investor',
      target: 'Sequoia Capital',
      time: '1d ago',
      icon: UserPlus,
      iconColor: 'bg-[#6F7EBC] text-white', // Indigo
    },
    {
      user: { name: 'System', avatar: '' },
      action: 'milestone reached',
      target: 'MVP Alpha Release',
      time: '2d ago',
      icon: Zap,
      iconColor: 'bg-[#F6DFA9] text-[#263344]', // Honey
    },
  ];

  return (
    <Card className="border-[#E1E6EE] shadow-sm h-full bg-white rounded-2xl">
      <CardHeader className="py-5 px-6 border-b border-[#E1E6EE]">
        <CardTitle className="text-sm font-bold text-[#1A1F2C] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#9CA3AF]" /> Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-[#E1E6EE]">
          {activities.map((item, i) => (
            <div key={i} className="p-5 hover:bg-[#F7F9FC] transition-colors flex gap-4 group">
              <div className="relative">
                 {item.user.avatar ? (
                   <Avatar className="w-10 h-10 border border-[#E1E6EE]">
                     <AvatarImage src={item.user.avatar} />
                     <AvatarFallback>{item.user.name.charAt(0)}</AvatarFallback>
                   </Avatar>
                 ) : (
                    <div className="w-10 h-10 rounded-full bg-[#F7F9FC] flex items-center justify-center border border-[#E1E6EE]">
                        <Zap className="w-4 h-4 text-[#9CA3AF]" />
                    </div>
                 )}
                 <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${item.iconColor} shadow-sm`}>
                    <item.icon className="w-3 h-3" />
                 </div>
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm text-[#1A1F2C]">
                  <span className="font-bold">{item.user.name}</span> <span className="text-[#6B7280]">{item.action}</span> <span className="font-bold text-[#4A5B78] hover:text-[#6F7EBC] transition-colors cursor-pointer">{item.target}</span>
                </p>
                <p className="text-xs text-[#9CA3AF] mt-1.5 font-medium">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
