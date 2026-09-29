import React from 'react';
import { Link } from 'react-router-dom';

export const ZaraCampaignBanner: React.FC = () => {
  return (
    <section className="bg-white py-8 sm:py-16 px-6 sm:px-12 select-none font-inter">
      <div className="container mx-auto">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-neutral-900 group">
          {/* Black & White Editorial Campaign Image */}
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80&sat=-100"
            alt="Elegance Threads Campaign"
            className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-102 transition-transform duration-1000 ease-out"
          />

          {/* Minimal Editorial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-14 text-white">
            <span className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-neutral-300 uppercase mb-2">
              AUTUMN / WINTER 26
            </span>
            <h2 className="font-syne font-black text-2xl sm:text-4xl lg:text-5xl tracking-[0.1em] uppercase mb-4 max-w-xl leading-tight">
              MONOCHROME FORM & TAILORING
            </h2>
            <div className="flex items-center gap-6 pt-2">
              <Link to="/new-arrivals">
                <button className="bg-white text-black hover:bg-neutral-200 text-[11px] font-semibold tracking-[0.2em] px-8 py-3 uppercase transition-all shadow-xs">
                  DISCOVER CAMPAIGN
                </button>
              </Link>
              <Link
                to="/women"
                className="text-[11px] font-semibold tracking-[0.2em] text-white hover:text-neutral-300 border-b border-white pb-0.5 uppercase transition-colors"
              >
                VIEW LOOKBOOK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZaraCampaignBanner;
