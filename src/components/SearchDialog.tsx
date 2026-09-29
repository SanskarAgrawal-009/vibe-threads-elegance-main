import React, { useState, useMemo } from 'react';
import { Search, Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { productService } from '@/services/productService';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '@/data/products';

interface SearchDialogProps {
  triggerClassName?: string;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ triggerClassName }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();

  const allProducts = productService.getProducts();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() && selectedCat === 'All') return [];

    return allProducts.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesText =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.subcategory.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);

      const matchesCat = selectedCat === 'All' || product.category === selectedCat;

      return matchesText && matchesCat;
    });
  }, [allProducts, searchQuery, selectedCat]);

  const handleSelectProduct = (id: number) => {
    setIsOpen(false);
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[0]?.name || 'Default',
      category: product.category,
      isNewArrival: product.isNewArrival,
      isOnSale: product.isOnSale,
      originalPrice: product.originalPrice
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className={triggerClassName || "text-inherit hover:opacity-70 transition-opacity p-1"}
          aria-label="Search"
        >
          <Search className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] p-0 overflow-hidden bg-white rounded-none border border-neutral-200 font-inter">
        <DialogHeader className="p-6 pb-4 border-b border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase">
              CATALOGUE SEARCH
            </span>
            <DialogTitle className="sr-only">Search</DialogTitle>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="SEARCH COATS, BLAZERS, SILK DRESSES, TROUSERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 text-xs tracking-wider text-black focus:outline-none focus:border-black uppercase placeholder:text-neutral-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Categories Filter */}
          <div className="flex gap-2 pt-3 overflow-x-auto scrollbar-none">
            {['All', 'Women', 'Men', 'Children'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-[10px] font-semibold tracking-[0.2em] px-3 py-1 uppercase transition-colors ${
                  selectedCat === cat
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* Results List */}
        <div className="p-6 overflow-y-auto max-h-[55vh] space-y-3">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="flex items-center justify-between p-2.5 hover:bg-neutral-50 cursor-pointer transition-colors group border-b border-neutral-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-16 object-cover bg-neutral-100 filter contrast-102"
                  />
                  <div>
                    <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-medium block">
                      {product.category} &bull; {product.subcategory}
                    </span>
                    <h4 className="text-xs font-semibold text-black uppercase group-hover:text-neutral-600 transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold text-black mt-0.5 block">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="text-[10px] font-semibold tracking-wider uppercase border border-black px-3 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    ADD
                  </button>
                  <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                </div>
              </div>
            ))
          ) : searchQuery.trim() ? (
            <div className="py-12 text-center text-neutral-400 text-xs tracking-wider uppercase">
              No pieces found matching "{searchQuery}"
            </div>
          ) : (
            <div className="py-8 text-center text-neutral-400 text-xs tracking-wider uppercase">
              Type keywords above to explore current runway pieces
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
