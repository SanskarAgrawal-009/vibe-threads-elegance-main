import React from 'react';
import { Link } from 'react-router-dom';

export const NewVibesBanner = () => {
  return (
    <section className="bg-[#DFDDD7] border-b border-[#D0CECB] select-none font-inter overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[420px] lg:min-h-[480px]">
          {/* Left Text Column */}
          <div className="md:col-span-6 px-6 sm:px-12 py-12 md:py-16 flex flex-col justify-center items-start">
            <span className="text-[11px] font-black tracking-[0.25em] text-neutral-700 uppercase mb-3 block">
              NEW SEASON
            </span>

            <h2 className="font-syne font-black text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight leading-[0.95] uppercase mb-4">
              <div>NEW</div>
              <div>VIBES</div>
            </h2>

            <p className="text-sm text-neutral-700 font-medium mb-8 max-w-sm leading-relaxed">
              Discover everything new and now.
            </p>

            <Link to="/new-arrivals">
              <button className="bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-[0.2em] px-8 py-4 transition-all shadow-md active:scale-95 uppercase">
                EXPLORE COLLECTION
              </button>
            </Link>
          </div>

          {/* Right Model Portrait Column */}
          <div className="md:col-span-6 h-full flex items-end justify-center md:justify-end overflow-hidden">
            <img
              src="/images/gazu/new_vibes_model.png"
              alt="New Season New Vibes"
              className="w-full max-h-[380px] sm:max-h-[460px] object-cover object-left-top filter contrast-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewVibesBanner;
