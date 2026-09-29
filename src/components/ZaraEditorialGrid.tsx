import React from 'react';
import { Link } from 'react-router-dom';

export const ZaraEditorialGrid = () => {
  const categories = [
    {
      title: 'WOMAN',
      subtitle: 'New Tailored Silhouettes',
      path: '/women',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=900&auto=format&fit=crop&q=80&sat=-100'
    },
    {
      title: 'MAN',
      subtitle: 'Wool Coats & Essentials',
      path: '/men',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=900&auto=format&fit=crop&q=80&sat=-100'
    },
    {
      title: 'KIDS',
      subtitle: 'Comfort Meets Modern Form',
      path: '/children',
      image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=900&auto=format&fit=crop&q=80&sat=-100'
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24 px-6 sm:px-12 select-none font-inter">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="group flex flex-col">
              {/* Image Container with subtle zoom */}
              <Link to={cat.path} className="relative aspect-[3/4] bg-[#F5F5F5] overflow-hidden mb-4 block">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Minimal Text Below Photo */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <h3 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase">
                    {cat.title}
                  </h3>
                  <span className="text-[11px] text-neutral-400 tracking-wide font-normal">
                    {cat.subtitle}
                  </span>
                </div>

                <Link
                  to={cat.path}
                  className="text-[11px] font-semibold tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-neutral-400 hover:border-neutral-400 transition-colors uppercase"
                >
                  DISCOVER
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ZaraEditorialGrid;
