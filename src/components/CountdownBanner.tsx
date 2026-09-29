import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

export const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-navy via-[#002b54] to-navy text-ivory border-b border-gold/30 text-xs py-2 px-4 font-inter">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-burgundy text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-xs">
            <Flame className="w-3 h-3 text-gold fill-current" /> Privilege Flash
          </span>
          <span className="text-gray-300 hidden md:inline">
            Complimentary Italian Silk Pocket Square with every Overcoat order today
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-gray-300 text-[11px] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gold" /> Exclusive Allocation Ends In:
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-gold bg-black/30 px-2 py-0.5 rounded border border-gold/20">
            <span>{format(timeLeft.hours)}</span>
            <span className="text-white">:</span>
            <span>{format(timeLeft.minutes)}</span>
            <span className="text-white">:</span>
            <span>{format(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBanner;
