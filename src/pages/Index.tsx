import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ZaraEditorialGrid from '@/components/ZaraEditorialGrid';
import ZaraCampaignBanner from '@/components/ZaraCampaignBanner';
import EleganceSelection from '@/components/EleganceSelection';
import ZaraTrustStrip from '@/components/ZaraTrustStrip';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header with Thin Black Shipping Strip & ELEGANCE THREADS */}
      <Header />

      <main>
        {/* 2. Zara Architectural Hero: Giant ELEGANCE Watermark + User's B&W Walking Cutout Model */}
        <HeroSection />

        {/* 3. Zara Editorial 3-Column Gallery: WOMAN, MAN, KIDS */}
        <ZaraEditorialGrid />

        {/* 4. Full-Width Black & White Autumn/Winter Campaign Banner */}
        <ZaraCampaignBanner />

        {/* 5. Minimalist Curated Essentials Product Grid */}
        <EleganceSelection />

        {/* 6. Clean Whitespace Trust Strip */}
        <ZaraTrustStrip />
      </main>

      {/* 7. Zara Monochrome Footer with Minimal Newsletter */}
      <Footer />
    </div>
  );
};

export default Index;
