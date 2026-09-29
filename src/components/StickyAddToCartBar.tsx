import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { triggerGoldConfetti } from '@/lib/confetti';

interface StickyAddToCartBarProps {
  product: Product;
  selectedSize: string;
  onSizeChange: (size: string) => void;
  selectedColor: string;
}

export const StickyAddToCartBar: React.FC<StickyAddToCartBarProps> = ({
  product,
  selectedSize,
  onSizeChange,
  selectedColor
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 550) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || product.sizes?.[0] || 'M',
      color: selectedColor || product.colors?.[0]?.name || 'Default',
      category: product.category,
      isNewArrival: product.isNewArrival,
      isOnSale: product.isOnSale,
      originalPrice: product.originalPrice
    });
    setIsAdded(true);
    triggerGoldConfetti();
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-3 px-6 font-inter select-none"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 max-w-6xl">
            {/* Left: Product Thumbnail & Title */}
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-12 object-cover bg-neutral-100 flex-shrink-0 filter grayscale contrast-105"
              />
              <div className="min-w-0">
                <h4 className="font-syne font-black text-xs text-black uppercase tracking-wider truncate">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="font-semibold text-xs text-black">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-neutral-400 line-through text-[11px]">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Size Selection & Clean Zara ADD Button */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {product.sizes && product.sizes.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => onSizeChange(size)}
                      className={`min-w-8 h-8 px-2 text-[11px] font-semibold border transition-all uppercase ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={handleAdd}
                className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3 transition-all uppercase flex items-center gap-2"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    ADDED TO BAG
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    ADD TO BAG
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyAddToCartBar;
