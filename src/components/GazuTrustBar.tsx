import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock, Package, BadgeCheck } from 'lucide-react';

export const GazuTrustBar = () => {
  const pillars = [
    {
      icon: <Truck className="w-6 h-6 stroke-[1.5] text-black" />,
      title: 'FAST DELIVERY',
      desc: 'Quick & safe delivery'
    },
    {
      icon: <Package className="w-6 h-6 stroke-[1.5] text-black" />,
      title: 'EASY RETURNS',
      desc: 'Within 15 days'
    },
    {
      icon: <BadgeCheck className="w-6 h-6 stroke-[1.5] text-black" />,
      title: 'QUALITY ASSURED',
      desc: 'Best fashion, best quality'
    },
    {
      icon: <Lock className="w-6 h-6 stroke-[1.5] text-black" />,
      title: 'SECURE PAYMENT',
      desc: '100% secure checkout'
    }
  ];

  return (
    <section className="bg-[#ECEAE5] py-10 px-4 sm:px-8 border-b border-[#DFDEDA] select-none font-inter">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3.5 sm:gap-4 justify-start sm:justify-center">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-syne font-black text-xs tracking-[0.14em] text-black uppercase">
                  {item.title}
                </h4>
                <p className="text-[11px] text-neutral-600 font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GazuTrustBar;
