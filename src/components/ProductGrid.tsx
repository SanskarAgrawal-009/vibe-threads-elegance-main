import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productService } from '@/services/productService';
import { Product } from '@/data/products';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const load = () => {
      setProducts(productService.getProducts());
    };
    load();
    window.addEventListener('products_updated', load);
    return () => window.removeEventListener('products_updated', load);
  }, []);

  // Display top 8 featured garments
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase font-semibold tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Atelier Collection
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-navy mb-4">
            Signature Masterpieces
          </h2>
          <p className="font-inter text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked collection of premium bespoke clothing, Italian wool coats, and evening couture crafted for distinguished taste.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/new-arrivals">
            <Button
              variant="outline"
              className="border-navy text-navy hover:bg-navy hover:text-white px-8 py-6 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Explore Complete Haute Collection
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
