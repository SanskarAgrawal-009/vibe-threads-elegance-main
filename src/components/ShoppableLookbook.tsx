import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { triggerGoldConfetti } from '@/lib/confetti';

interface Hotspot {
  id: number;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  price: number;
  image: string;
  category: string;
  size: string;
  color: string;
}

const RUNWAY_HOTSPOTS: Hotspot[] = [
  {
    id: 1,
    x: 48,
    y: 35,
    title: 'Classic Wool Overcoat in Camel',
    price: 24999,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&fit=crop',
    category: 'Men',
    size: 'L',
    color: 'Camel'
  },
  {
    id: 3,
    x: 52,
    y: 52,
    title: 'Supima Cotton Oxford Shirt',
    price: 6599,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&fit=crop',
    category: 'Men',
    size: 'M',
    color: 'Crisp White'
  },
  {
    id: 4,
    x: 46,
    y: 75,
    title: 'Pleated Tapered Formal Trousers',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&fit=crop',
    category: 'Men',
    size: '32',
    color: 'Olive Taupe'
  }
];

export const ShoppableLookbook: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(RUNWAY_HOTSPOTS[0]);
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const handleAddHotspotToCart = (hotspot: Hotspot) => {
    addToCart({
      id: hotspot.id,
      name: hotspot.title,
      price: hotspot.price,
      image: hotspot.image,
      size: hotspot.size,
      color: hotspot.color,
      category: hotspot.category
    });
    setAddedId(hotspot.id);
    triggerGoldConfetti();
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section className="py-20 bg-navy text-white overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-burgundy/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-gold px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Atelier Experience
          </div>
          <h2 className="font-playfair text-3xl md:text-5xl font-bold text-ivory mb-4">
            Shop The Runway Editorial
          </h2>
          <p className="font-inter text-sm text-gray-300">
            Hover over the highlighted atelier pins to shop the bespoke layered ensemble directly from our Milan runway showcase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Interactive Model Stage with Hotspot Pins */}
          <div className="lg:col-span-7 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80"
              alt="Runway Lookbook"
              className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-102 transition-transform duration-700"
            />

            {/* Glowing Hotspot Pins */}
            {RUNWAY_HOTSPOTS.map((spot) => (
              <div
                key={spot.id}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                onClick={() => setActiveHotspot(spot)}
                onMouseEnter={() => setActiveHotspot(spot)}
              >
                <div className="relative flex items-center justify-center">
                  <span className={`animate-ping absolute inline-flex h-8 w-8 rounded-full ${
                    activeHotspot?.id === spot.id ? 'bg-gold opacity-90' : 'bg-white opacity-40'
                  }`} />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-[10px] shadow-lg transition-all ${
                      activeHotspot?.id === spot.id
                        ? 'bg-gold border-white text-navy scale-125 ring-4 ring-gold/40'
                        : 'bg-white/90 border-navy text-navy hover:scale-110'
                    }`}
                  >
                    +
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Hotspot Garment Spotlight Card */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-xl border border-gold/40 rounded-2xl p-6 shadow-2xl space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={activeHotspot.image}
                      alt={activeHotspot.title}
                      className="w-24 h-32 object-cover rounded-xl bg-ivory shadow-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-gold block mb-1">
                          Runway Piece #{activeHotspot.id}
                        </span>
                        <h4 className="font-playfair text-lg font-bold text-ivory leading-snug line-clamp-2">
                          {activeHotspot.title}
                        </h4>
                        <div className="text-xs text-gray-300 mt-1">
                          Size: <span className="text-white font-semibold">{activeHotspot.size}</span> &bull; Color: <span className="text-white font-semibold">{activeHotspot.color}</span>
                        </div>
                      </div>

                      <div className="font-playfair text-2xl font-bold text-gold">
                        ₹{activeHotspot.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => handleAddHotspotToCart(activeHotspot)}
                      className="flex-1 bg-gold hover:bg-gold/90 text-navy font-bold text-xs py-5 shadow-lg flex items-center justify-center gap-2"
                    >
                      {addedId === activeHotspot.id ? (
                        <>
                          <Check className="w-4 h-4 text-navy" />
                          Added to Shopping Bag!
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-navy" />
                          Add Runway Piece to Bag
                        </>
                      )}
                    </Button>

                    <Link to={`/product/${activeHotspot.id}`} className="flex-shrink-0">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-xs py-5 px-4"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick ensemble total buy button */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between">
              <div>
                <span className="text-gray-400 block text-[11px]">Complete 3-Piece Ensemble Total</span>
                <span className="text-gold font-bold text-base">₹40,597</span>
              </div>
              <Button
                onClick={() => {
                  RUNWAY_HOTSPOTS.forEach(spot => handleAddHotspotToCart(spot));
                }}
                variant="outline"
                className="border-gold text-gold hover:bg-gold hover:text-navy text-xs font-bold"
              >
                Add Full Look (3 Pieces)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppableLookbook;
