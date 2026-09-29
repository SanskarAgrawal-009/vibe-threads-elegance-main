import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { productService } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { triggerGoldConfetti } from '@/lib/confetti';

export const BestOfSanskar = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const allProducts = productService.getProducts();

  // Pick top 4 products for the signature row
  const items = allProducts.slice(0, 4);

  // Fallback image array matching the GAZU product tones
  const gazuImages = [
    '/images/gazu/prod1.png',
    '/images/gazu/prod2.png',
    '/images/gazu/prod3.png',
    '/images/gazu/prod4.png',
  ];

  const handleWishlist = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const product = allProducts.find(p => p.id === id);
    if (!product) return;
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M',
      color: 'Default',
      category: product.category
    });
    triggerGoldConfetti();
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-8 select-none font-inter border-b border-gray-100">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-gray-200">
          <h3 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-tight uppercase">
            BEST OF SANSKAR
          </h3>
          <Link
            to="/new-arrivals"
            className="text-xs font-bold tracking-[0.16em] text-black border-b-2 border-black pb-0.5 hover:opacity-75 transition-opacity uppercase"
          >
            VIEW ALL
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((prod, idx) => {
            const displayImage = gazuImages[idx] || prod.image;
            const inWish = isInWishlist(prod.id);

            return (
              <div key={prod.id} className="group flex flex-col justify-between">
                {/* Image Container with Wishlist Icon */}
                <div className="relative aspect-[3/4] bg-[#ECEAE5] overflow-hidden rounded-sm mb-3">
                  <Link to={`/product/${prod.id}`}>
                    <img
                      src={displayImage}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-102"
                    />
                  </Link>

                  {/* Heart button */}
                  <button
                    onClick={(e) => handleWishlist(e, prod.id)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      inWish ? 'bg-white text-red-500 shadow-sm' : 'bg-white/70 hover:bg-white text-black'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWish ? 'fill-current' : 'stroke-[1.75]'}`} />
                  </button>

                  {/* Quick Add Button on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={(e) => handleAddToCart(e, prod)}
                      className="w-full bg-black hover:bg-neutral-800 text-white font-bold text-[11px] tracking-wider py-2.5 uppercase flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold block mb-0.5">
                    {prod.category}
                  </span>
                  <Link to={`/product/${prod.id}`}>
                    <h4 className="font-semibold text-xs text-black group-hover:text-gold transition-colors truncate">
                      {prod.name}
                    </h4>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-bold text-xs text-black">
                      ₹{prod.price.toLocaleString()}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-gray-400 line-through">
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

export default BestOfSanskar;
