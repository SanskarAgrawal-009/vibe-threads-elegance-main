import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { triggerGoldConfetti } from '@/lib/confetti';

export const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: 'M',
      color: 'Default',
      category: item.category,
      isNewArrival: item.isNewArrival,
      isOnSale: item.isOnSale,
      originalPrice: item.originalPrice
    });
    triggerGoldConfetti();
  };

  return (
    <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-10 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black uppercase transition-colors mb-3"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>RETURN TO COLLECTION</span>
            </Link>
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
              <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase">
                SAVED ITEMS
              </h1>
              <span className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">
                ({wishlistItems.length} {wishlistItems.length === 1 ? 'ITEM' : 'ITEMS'})
              </span>
            </div>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-24 border border-neutral-200 my-8 max-w-md mx-auto">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase block mb-2">
                WISHLIST
              </span>
              <h2 className="font-syne font-bold text-base tracking-[0.15em] text-black uppercase mb-2">
                NO SAVED PIECES
              </h2>
              <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
                Save your favorite runway silhouettes and seasonal tailoring to revisit anytime.
              </p>
              <Link to="/new-arrivals">
                <button className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all shadow-xs">
                  DISCOVER COLLECTION
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {wishlistItems.map((item, index) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-neutral-50 overflow-hidden mb-3">
                    <Link to={`/product/${item.id}`} className="block w-full h-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      />
                    </Link>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-black flex items-center justify-center transition-colors shadow-xs"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Quick Add button on hover */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-white hover:bg-black hover:text-white text-black font-semibold text-[11px] tracking-[0.2em] py-2.5 transition-colors uppercase flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        ADD TO BAG
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-medium block">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.id}`}>
                      <h4 className="text-xs font-medium text-black hover:text-neutral-500 transition-colors tracking-wide truncate uppercase">
                        {item.name}
                      </h4>
                    </Link>
                    <div className="pt-0.5">
                      <span className="text-xs font-semibold text-black tracking-wider">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
