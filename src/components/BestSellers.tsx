import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productService } from '@/services/productService';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Award } from 'lucide-react';

const BestSellers = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => {
      const items = productService.getProducts().filter((p) => p.isBestSeller || p.rating >= 4.8);
      setProducts(items.slice(0, 4));
    };
    load();
    window.addEventListener('products_updated', load);
    return () => window.removeEventListener('products_updated', load);
  }, []);

  return (
    <section className="py-20 bg-ivory/40 border-y border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-navy text-xs uppercase font-bold tracking-widest mb-2 bg-gold/20 px-3 py-1 rounded-full">
            <Award className="w-3.5 h-3.5 text-gold" />
            Most Coveted by Clientele
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-navy mb-4">
            Bestsellers
          </h2>
          <p className="font-inter text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Our most sought-after sartorial investments, acclaimed for exceptional drape, premium materials, and timeless appeal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
