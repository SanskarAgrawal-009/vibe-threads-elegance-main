import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

export interface FilterOptions {
  subcategory: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  priceRange: 'all' | 'under-5000' | '5000-15000' | 'above-15000';
  inStockOnly: boolean;
}

interface FilterBarProps {
  subcategories: string[];
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  subcategories,
  filters,
  onFilterChange,
  totalCount
}) => {
  const handleReset = () => {
    onFilterChange({
      subcategory: 'All',
      sortBy: 'featured',
      priceRange: 'all',
      inStockOnly: false
    });
  };

  const hasActiveFilters =
    filters.subcategory !== 'All' ||
    filters.sortBy !== 'featured' ||
    filters.priceRange !== 'all' ||
    filters.inStockOnly;

  return (
    <div className="bg-white border-y border-neutral-100 py-3.5 mb-10 font-inter select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Subcategories Horizontal Filter (Zara Underline Style) */}
        <div className="flex items-center gap-6 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => onFilterChange({ ...filters, subcategory: 'All' })}
            className={`text-[11px] tracking-[0.2em] font-medium whitespace-nowrap transition-all uppercase pb-0.5 ${
              filters.subcategory === 'All'
                ? 'text-black border-b-2 border-black font-semibold'
                : 'text-neutral-400 hover:text-black'
            }`}
          >
            ALL
          </button>
          {subcategories.map((subcat) => (
            <button
              key={subcat}
              onClick={() => onFilterChange({ ...filters, subcategory: subcat })}
              className={`text-[11px] tracking-[0.2em] font-medium whitespace-nowrap transition-all uppercase pb-0.5 ${
                filters.subcategory === subcat
                  ? 'text-black border-b-2 border-black font-semibold'
                  : 'text-neutral-400 hover:text-black'
              }`}
            >
              {subcat}
            </button>
          ))}
        </div>

        {/* Filter Controls & Sort Options */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Price Range */}
          <Select
            value={filters.priceRange}
            onValueChange={(val: any) => onFilterChange({ ...filters, priceRange: val })}
          >
            <SelectTrigger className="w-[130px] h-8 text-[11px] tracking-wider uppercase bg-white border-neutral-200 rounded-none focus:ring-0">
              <SelectValue placeholder="PRICE" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[11px] rounded-none">
              <SelectItem value="all">ALL PRICES</SelectItem>
              <SelectItem value="under-5000">UNDER ₹5,000</SelectItem>
              <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
              <SelectItem value="above-15000">ABOVE ₹15,000</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort By */}
          <Select
            value={filters.sortBy}
            onValueChange={(val: any) => onFilterChange({ ...filters, sortBy: val })}
          >
            <SelectTrigger className="w-[150px] h-8 text-[11px] tracking-wider uppercase bg-white border-neutral-200 rounded-none focus:ring-0">
              <SelectValue placeholder="ORDER BY" />
            </SelectTrigger>
            <SelectContent className="bg-white text-[11px] rounded-none">
              <SelectItem value="featured">FEATURED</SelectItem>
              <SelectItem value="price-asc">PRICE: LOW TO HIGH</SelectItem>
              <SelectItem value="price-desc">PRICE: HIGH TO LOW</SelectItem>
              <SelectItem value="rating">TOP RATED</SelectItem>
              <SelectItem value="newest">NEWEST</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-[11px] tracking-wider uppercase text-neutral-500 hover:text-black h-8 px-2 gap-1 rounded-none"
            >
              <RotateCcw className="w-3 h-3" />
              CLEAR
            </Button>
          )}

          <span className="text-[10px] tracking-[0.2em] text-neutral-400 pl-1 uppercase font-medium">
            ({totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'})
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
