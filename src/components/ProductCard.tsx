import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';
import { Link } from 'react-router-dom';
import { triggerGoldConfetti } from '@/lib/confetti';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        isNewArrival: product.isNewArrival,
        isOnSale: product.isOnSale,
        originalPrice: product.originalPrice
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
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
    triggerGoldConfetti();
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between select-none font-inter"
    >
      {/* 1. Full-Bleed Editorial B&W Image Container */}
      <div className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden mb-3">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Minimal Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNewArrival && (
            <span className="bg-black text-white text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 uppercase">
              NEW
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-neutral-800 text-white text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 uppercase">
              SPECIAL PRICE
            </span>
          )}
        </div>

        {/* Minimal Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            inWishlist
              ? 'bg-white text-black shadow-sm'
              : 'bg-white/80 hover:bg-white text-neutral-800'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-black text-black' : 'stroke-[1.5]'}`} />
        </button>

        {/* Zara-Style Minimal Hover Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center z-10">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white hover:bg-black hover:text-white text-black font-semibold text-[11px] tracking-[0.2em] py-2.5 transition-colors uppercase flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            ADD TO BAG
          </button>
        </div>
      </div>

      {/* 2. Minimalist Product Info (Clean, spaced, no visual noise) */}
      <div className="space-y-1">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-xs font-medium text-neutral-900 hover:text-neutral-500 transition-colors tracking-wide truncate uppercase">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-xs font-semibold text-black tracking-wider">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
