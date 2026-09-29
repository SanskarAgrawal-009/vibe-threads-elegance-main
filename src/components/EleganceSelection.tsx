import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { productService } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { triggerGoldConfetti } from '@/lib/confetti';

export const EleganceSelection: React.FC = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const allProducts = productService.getProducts();

  // Curate 4 signature editorial items
  const items = allProducts.slice(0, 4);

  const handleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, prod: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      image: prod.image,
      size: prod.sizes?.[0] || 'M',
      color: prod.colors?.[0]?.name || 'Default',
      category: prod.category,
    });
    triggerGoldConfetti();
  };

  return (
    <section className="bg-white py-16 sm:py-24 px-6 sm:px-12 select-none font-inter">
      <div className="container mx-auto">
        {/* Section Header: Minimalist & Spaced */}
        <div className="flex items-baseline justify-between mb-10 pb-4 border-b border-neutral-100">
          <div>
            <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 block mb-1 uppercase">
              SELECTION
            </span>
            <h3 className="font-syne font-black text-xl sm:text-2xl text-black tracking-[0.15em] uppercase">
              ELEGANCE ESSENTIALS
            </h3>
          </div>
          <Link
            to="/new-arrivals"
            className="text-[11px] font-semibold tracking-[0.2em] text-black border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors uppercase"
          >
            VIEW ALL
          </Link>
        </div>

        {/* 4-Column Product Grid in Zara Minimal Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {items.map((prod) => {
            const inWish = isInWishlist(prod.id);

            return (
              <div key={prod.id} className="group flex flex-col justify-between">
                {/* Full-Bleed Editorial B&W Image */}
                <div className="relative aspect-[3/4] bg-[#F7F7F7] overflow-hidden mb-3">
                  <Link to={`/product/${prod.id}`} className="block w-full h-full">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                  </Link>

                  {/* Heart button */}
                  <button
                    onClick={(e) => handleWishlist(e, prod.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
                      inWish
                        ? 'bg-white text-black shadow-xs'
                        : 'bg-white/80 hover:bg-white text-neutral-800'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${inWish ? 'fill-black text-black' : 'stroke-[1.5]'}`} />
                  </button>

                  {/* Hover Quick Add to Bag */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center z-10">
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      className="w-full bg-white hover:bg-black hover:text-white text-black font-semibold text-[11px] tracking-[0.2em] py-2.5 transition-colors uppercase flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ADD TO BAG
                    </button>
                  </div>
                </div>

                {/* Minimalist Details */}
                <div className="space-y-1">
                  <Link to={`/product/${prod.id}`} className="block">
                    <h4 className="text-xs font-medium text-neutral-900 hover:text-neutral-500 transition-colors tracking-wide truncate uppercase">
                      {prod.name}
                    </h4>
                  </Link>

                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-xs font-semibold text-black tracking-wider">
                      ₹{prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-neutral-400 line-through">
                        ₹{prod.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EleganceSelection;
