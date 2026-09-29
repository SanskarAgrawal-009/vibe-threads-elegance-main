import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 py-28 text-center max-w-md my-auto">
        <span className="text-[10px] tracking-[0.35em] font-semibold text-neutral-400 uppercase block mb-2">
          ERROR 404
        </span>
        <h1 className="font-syne font-black text-5xl sm:text-6xl text-black tracking-[0.15em] uppercase mb-4">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
          The requested page or collection does not exist or may have been relocated.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/">
            <button className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all shadow-xs">
              RETURN TO HOME
            </button>
          </Link>
          <Link to="/new-arrivals">
            <button className="w-full sm:w-auto border border-neutral-300 hover:border-black text-black font-semibold text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-colors">
              NEW ARRIVALS
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
