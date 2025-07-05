
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedCollections from '@/components/FeaturedCollections';
import BestSellers from '@/components/BestSellers';
import ProductGrid from '@/components/ProductGrid';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCollections />
        <BestSellers />
        <ProductGrid />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
