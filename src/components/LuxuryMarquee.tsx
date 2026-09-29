import React from 'react';
import { Sparkles, Crown, ShieldCheck, Truck } from 'lucide-react';

export const LuxuryMarquee: React.FC = () => {
  const statements = [
    'HAUTE COUTURE EDITORIAL 2026',
    '100% ITALIAN VIRGIN WOOL',
    'BESPOKE MERINO SUITING',
    'GRADE 6A 22-MOMME MULBERRY SILK',
    'COMPLIMENTARY WHITE-GLOVE EXPRESS OVER ₹6,250',
    '15-DAY COMPLIMENTARY ATELIER RETURNS',
    'HAND-FINISHED PRECISION CUTS'
  ];

  return (
    <div className="bg-navy text-gold py-3 overflow-hidden border-y border-gold/30 select-none">
      <div className="flex whitespace-nowrap animate-marquee font-playfair tracking-widest text-xs font-semibold">
        {[...statements, ...statements, ...statements].map((text, i) => (
          <span key={i} className="inline-flex items-center mx-6 gap-3">
            <span>{text}</span>
            <span className="text-gold/60 text-[10px]">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LuxuryMarquee;
