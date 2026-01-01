import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

interface CompletenessTrackerProps {
  completeness: number;
  breakdown: {
    business: number;
    market: number;
    team: number;
    model: number;
    fundraising: number;
  };
  onCompleteNow?: () => void;
}

export function CompletenessTracker({ completeness, breakdown, onCompleteNow }: CompletenessTrackerProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Trigger confetti at 100%
  React.useEffect(() => {
    if (completeness === 100 && !showConfetti) {
      setShowConfetti(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 200);
    }
  }, [completeness, showConfetti]);

  // Determine gradient color based on completeness
  const getGradientColors = () => {
    if (completeness < 30) return 'from-red-500 to-red-600';
    if (completeness < 60) return 'from-orange-500 to-yellow-500';
    if (completeness < 80) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-emerald-500';
  };

  const getStatusMessage = () => {
    if (completeness >= 80) {
      return {
        icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
        text: 'Great! Your profile is complete enough for AI features.',
        variant: 'success' as const
      };
    }
    if (completeness >= 60) {
      return {
        icon: <Info className="w-5 h-5 text-blue-600" />,
        text: 'Almost there! A few more fields to unlock all features.',
        variant: 'info' as const
      };
    }
    return {
      icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
      text: 'Complete your profile for better AI recommendations.',
      variant: 'warning' as const
    };
  };

  const status = getStatusMessage();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">Profile Completeness</h3>
          
          {/* Info Popover with Breakdown */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Info className="w-4 h-4 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Breakdown by Section</h4>
                {Object.entries(breakdown).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 capitalize">
                        {key === 'business' ? 'Business Overview' :
                         key === 'market' ? 'Market & Traction' :
                         key === 'team' ? 'Team' :
                         key === 'model' ? 'Business Model' :
                         'Fundraising'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{value}%</span>
                        {value === 100 && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          value === 100 ? 'bg-green-500' :
                          value >= 60 ? 'bg-yellow-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {completeness}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>

          {completeness < 80 && onCompleteNow && (
            <Button onClick={onCompleteNow} size="sm" className="flex items-center gap-2">
              Complete Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completeness}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-4 rounded-full bg-gradient-to-r ${getGradientColors()}`}
          />
        </div>
        
        {/* Percentage Label on Bar */}
        <div 
          className="absolute top-0 left-0 h-4 flex items-center justify-center text-xs font-bold text-white transition-all"
          style={{ width: `${completeness}%`, minWidth: '60px' }}
        >
          {completeness}%
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`mt-4 flex items-center gap-3 p-3 rounded-lg ${
          status.variant === 'success' ? 'bg-green-50 border border-green-200' :
          status.variant === 'info' ? 'bg-blue-50 border border-blue-200' :
          'bg-orange-50 border border-orange-200'
        }`}
      >
        {status.icon}
        <span className={`text-sm font-medium ${
          status.variant === 'success' ? 'text-green-800' :
          status.variant === 'info' ? 'text-blue-800' :
          'text-orange-800'
        }`}>
          {status.text}
        </span>
      </motion.div>

      {/* 100% Celebration */}
      {completeness === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
        >
          <div className="text-2xl mb-2">🎉</div>
          <div className="font-semibold text-green-900 mb-1">Profile 100% Complete!</div>
          <div className="text-sm text-green-700">
            You've unlocked all AI features and recommendations
          </div>
        </motion.div>
      )}
    </div>
  );
}
