import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Initialize playback smoothly from 2.0 seconds
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setStartTime = () => {
      try {
        video.currentTime = 2;
        video.play().catch(() => {});
      } catch (e) {
        console.warn('Playback error', e);
      }
    };

    if (video.readyState >= 1) {
      setStartTime();
    } else {
      video.addEventListener('loadedmetadata', setStartTime, { once: true });
    }

    // Loop back to 2 seconds seamlessly
    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.2) {
        video.currentTime = 2;
        video.play().catch(() => {});
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadedmetadata', setStartTime);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full h-screen overflow-hidden select-none bg-black font-inter">
      {/* 1. Fullscreen Cinematic Runway Video (Starts at 2s) */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4#t=2"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105"
      />

      {/* 2. Soft Luxury Vignette (Model's Face Remains Completely Clear) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

      {/* 3. Center-Bottom Hero Content in Massimo Dutti / Zara Editorial Style */}
      <div className="absolute bottom-16 sm:bottom-20 inset-x-0 z-20 px-6 sm:px-12">
        <div className="container mx-auto flex flex-col items-center text-center">
          {/* Subtle Season Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-3"
          >
            <span className="text-[11px] sm:text-xs tracking-[0.4em] font-medium text-neutral-300 uppercase">
              AUTUMN / WINTER 26
            </span>
          </motion.div>

          {/* Couture Typography: NEW COLLECTION in Italiana */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="font-italiana text-5xl sm:text-7xl lg:text-8xl tracking-[0.06em] text-white leading-none font-normal uppercase drop-shadow-md mb-8 sm:mb-10"
          >
            NEW COLLECTION
          </motion.h1>

          {/* Minimalist Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
          >
            <Link to="/women" className="flex-1">
              <button className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-[0.25em] py-4 uppercase transition-all shadow-lg active:scale-95">
                WOMAN
              </button>
            </Link>

            <Link to="/men" className="flex-1">
              <button className="w-full bg-black/40 hover:bg-white hover:text-black backdrop-blur-md text-white font-semibold text-xs tracking-[0.25em] py-4 uppercase border border-white/40 transition-all shadow-lg active:scale-95">
                MAN
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 4. Discreet Floating Sound Control in Bottom Right */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-30">
        <button
          onClick={toggleSound}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all shadow-lg hover:scale-105 active:scale-95"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          title={isMuted ? "Unmute Runway Sound" : "Mute Runway Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 stroke-[1.5] text-neutral-300" />
          ) : (
            <Volume2 className="w-4 h-4 stroke-[1.5] text-white" />
          )}
        </button>
      </div>

      {/* 5. Minimalist Scroll Indicator Centered at Very Bottom Edge */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-neutral-400 hover:text-white transition-colors flex flex-col items-center cursor-pointer group"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-5 h-5 stroke-[1.5] text-neutral-400 group-hover:text-white transition-transform group-hover:translate-y-0.5" />
      </button>
    </section>
  );
};

export default HeroSection;
