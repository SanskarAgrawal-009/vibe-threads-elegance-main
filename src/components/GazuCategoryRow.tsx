import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const GazuCategoryRow = () => {
  const categories = [
    {
      title: 'MEN',
      desc: 'Elevated everyday essentials.',
      cta: 'SHOP MEN →',
      path: '/men',
      image: '/images/gazu/cat_men.png'
    },
    {
      title: 'WOMEN',
      desc: 'Effortless style for every you.',
      cta: 'SHOP WOMEN →',
      path: '/women',
      image: '/images/gazu/cat_women.png'
    },
    {
      title: 'KIDS',
      desc: 'Comfort meets cool everyday.',
      cta: 'SHOP KIDS →',
      path: '/children',
      image: '/images/gazu/cat_kids.png'
    }
  ];

  return (
    <section className="bg-[#0A0A0A] text-white py-10 px-4 sm:px-8 border-b border-neutral-900 select-none font-inter">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-5 group">
              {/* Thumbnail */}
              <Link to={cat.path} className="flex-shrink-0 overflow-hidden rounded bg-neutral-900">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-16 h-20 sm:w-18 sm:h-22 object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Text Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-syne font-black text-sm tracking-[0.2em] text-white uppercase mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-400 font-normal mb-2 leading-relaxed">
                  {cat.desc}
                </p>
                <Link
                  to={cat.path}
                  className="text-[11px] font-bold tracking-[0.18em] text-white border-b border-white pb-0.5 hover:text-neutral-300 hover:border-neutral-300 transition-colors uppercase inline-block"
                >
                  {cat.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GazuCategoryRow;
