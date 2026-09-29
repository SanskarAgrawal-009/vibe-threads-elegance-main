import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import FilterBar, { FilterOptions } from '@/components/FilterBar';
import { productService } from '@/services/productService';
import { Product } from '@/data/products';

const Women = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    subcategory: 'All',
    sortBy: 'featured',
    priceRange: 'all',
    inStockOnly: false
  });

  useEffect(() => {
    const load = () => {
      const items = productService.getProducts().filter((p) => p.category === 'Women');
      setAllProducts(items);
    };

    load();
    window.addEventListener('products_updated', load);
    return () => window.removeEventListener('products_updated', load);
  }, []);

  const subcategories = useMemo(() => {
    const subs = new Set<string>();
    allProducts.forEach((p) => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return Array.from(subs);
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (filters.subcategory !== 'All') {
      result = result.filter((p) => p.subcategory === filters.subcategory);
    }

    if (filters.priceRange === 'under-5000') {
      result = result.filter((p) => p.price < 5000);
    } else if (filters.priceRange === '5000-15000') {
      result = result.filter((p) => p.price >= 5000 && p.price <= 15000);
    } else if (filters.priceRange === 'above-15000') {
      result = result.filter((p) => p.price > 15000);
    }

    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return result;
  }, [allProducts, filters]);

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-10">
        {/* Minimal Zara Page Header */}
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 block mb-1 uppercase">
            COLLECTION
          </span>
          <h1 className="font-syne font-black text-2xl sm:text-3xl tracking-[0.2em] text-black uppercase">
            WOMAN
          </h1>
        </div>

        {/* Dynamic Filter & Sorting Bar */}
        <FilterBar
          subcategories={subcategories}
          filters={filters}
          onFilterChange={setFilters}
          totalCount={filteredProducts.length}
        />

        {/* Product Grid: 2 columns mobile, 4 columns desktop */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-neutral-100 my-8">
            <h3 className="font-syne font-bold text-sm tracking-[0.15em] text-black uppercase mb-2">
              NO PIECES MATCH CURRENT CRITERIA
            </h3>
            <button
              onClick={() => setFilters({ subcategory: 'All', sortBy: 'featured', priceRange: 'all', inStockOnly: false })}
              className="text-[11px] font-semibold text-black underline tracking-widest uppercase"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Women;
