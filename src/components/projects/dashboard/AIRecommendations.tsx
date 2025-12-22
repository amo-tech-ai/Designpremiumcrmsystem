import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { AIRecommendation } from './types';
import { Sparkles, ArrowRight, AlertTriangle, Lightbulb } from 'lucide-react';
import { Button } from '../../ui/button';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
}

export function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  return (
    <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white overflow-hidden">
      <CardHeader className="pb-3 border-b border-indigo-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-100 rounded-md">
            <Sparkles className="w-4 h-4 text-indigo-600" />
          </div>
          <CardTitle className="text-base font-semibold text-slate-900">AI Recommendations</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-indigo-50">
          {recommendations.map((rec) => (
            <div key={rec.id} className="p-4 hover:bg-indigo-50/30 transition-colors group">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5">
                  {rec.type === 'risk' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  {rec.type === 'optimization' && <Sparkles className="w-4 h-4 text-indigo-500" />}
                  {rec.type === 'task' && <Lightbulb className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium text-slate-900">{rec.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rec.description}
                  </p>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 text-indigo-600 text-xs font-medium mt-2 group-hover:underline flex items-center gap-1"
                  >
                    {rec.actionText}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
