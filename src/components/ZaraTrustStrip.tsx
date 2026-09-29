import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Lock } from 'lucide-react';

export const ZaraTrustStrip: React.FC = () => {
  const items = [
    {
      icon: <Truck className="w-5 h-5 stroke-[1.5]" />,
      title: 'FREE DELIVERY',
      desc: 'On orders over ₹999'
    },
    {
      icon: <RotateCcw className="w-5 h-5 stroke-[1.5]" />,
      title: 'EASY RETURNS',
      desc: 'Complimentary within 30 days'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 stroke-[1.5]" />,
      title: 'ATELIER QUALITY',
      desc: 'Italian fabric craftsmanship'
    },
    {
      icon: <Lock className="w-5 h-5 stroke-[1.5]" />,
      title: 'SECURE CHECKOUT',
      desc: 'Encrypted payment gateways'
    }
  ];

  return (
    <section className="bg-white py-14 px-6 sm:px-12 border-t border-b border-neutral-100 select-none font-inter">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-2">
              <div className="text-black mb-1">
                {item.icon}
              </div>
              <h4 className="font-syne font-black text-xs tracking-[0.2em] text-black uppercase">
                {item.title}
              </h4>
              <p className="text-[11px] text-neutral-500 font-normal tracking-wide">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZaraTrustStrip;
