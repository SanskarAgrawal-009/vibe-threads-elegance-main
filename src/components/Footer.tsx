import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-white text-black font-inter select-none pt-20 pb-12 border-t border-neutral-100">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Top: Minimalist Newsletter Subscription (Pure Zara Style) */}
        <div className="max-w-xl mb-20">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 block mb-2 uppercase">
            NEWSLETTER
          </span>
          <h3 className="font-syne font-black text-xl sm:text-2xl tracking-[0.1em] uppercase mb-3">
            JOIN ELEGANCE THREADS
          </h3>
          <p className="text-xs text-neutral-500 font-normal leading-relaxed mb-6">
            Subscribe to receive private sale invitations, editorial lookbooks, and early access to new drops.
          </p>

          <form onSubmit={handleSubmit} className="flex items-end gap-4 border-b border-black pb-2">
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRESS"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-xs tracking-wider placeholder:text-neutral-400 focus:outline-none uppercase font-medium py-1"
              required
            />
            <button
              type="submit"
              className="text-[11px] font-bold tracking-[0.2em] uppercase hover:text-neutral-500 transition-colors whitespace-nowrap"
            >
              {subscribed ? 'JOINED' : 'SUBSCRIBE'}
            </button>
          </form>
          {subscribed && (
            <p className="text-[11px] text-black font-medium tracking-wide mt-2">
              Thank you for subscribing to Elegance Threads.
            </p>
          )}
        </div>

        {/* 4 Clean Navigation Columns with Maximum Whitespace */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-20 text-[11px]">
          <div>
            <h4 className="font-syne font-black tracking-[0.2em] uppercase mb-4 text-black">
              HELP
            </h4>
            <ul className="space-y-2.5 text-neutral-600 font-normal tracking-wide">
              <li><Link to="/orders" className="hover:text-black transition-colors uppercase">MY ACCOUNT</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors uppercase">ITEMS & SIZES</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors uppercase">SHIPPING & DELIVERY</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors uppercase">PAYMENT & INVOICES</Link></li>
              <li><Link to="/orders" className="hover:text-black transition-colors uppercase">EXCHANGES & RETURNS</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-black tracking-[0.2em] uppercase mb-4 text-black">
              FOLLOW US
            </h4>
            <ul className="space-y-2.5 text-neutral-600 font-normal tracking-wide">
              <li><a href="#" className="hover:text-black transition-colors uppercase">INSTAGRAM</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">TIKTOK</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">PINTEREST</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">YOUTUBE</a></li>
              <li><a href="#" className="hover:text-black transition-colors uppercase">SPOTIFY</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-black tracking-[0.2em] uppercase mb-4 text-black">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-neutral-600 font-normal tracking-wide">
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">ABOUT ELEGANCE</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">JOIN LIFE</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">OFFICES</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">STORES</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">WORK WITH US</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-syne font-black tracking-[0.2em] uppercase mb-4 text-black">
              POLICIES
            </h4>
            <ul className="space-y-2.5 text-neutral-600 font-normal tracking-wide">
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">PRIVACY POLICY</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">PURCHASE CONDITIONS</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">GIFT CARD CONDITIONS</span></li>
              <li><span className="cursor-pointer hover:text-black transition-colors uppercase">COOKIES SETTINGS</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Brand Watermark, Region & Legal */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row items-baseline justify-between gap-4 text-[10px] tracking-[0.2em] text-neutral-400">
          <div className="flex items-center gap-6">
            <span className="text-black font-semibold">INDIA</span>
            <span>ENGLISH</span>
          </div>

          <div>
            &copy; 2026 ELEGANCE THREADS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
