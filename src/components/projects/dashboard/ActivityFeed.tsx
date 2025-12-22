import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Activity } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4 border-l border-slate-100 space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-300 ring-4 ring-slate-50" />
              
              <div className="flex items-start gap-3">
                {activity.avatar ? (
                  <Avatar className="w-6 h-6 mt-0.5">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-slate-500">{activity.user[0]}</span>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-slate-500"> {activity.action} </span>
                    <span className="font-medium text-slate-900">{activity.target}</span>
                  </p>
                  <span className="text-xs text-slate-400 block mt-0.5">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
