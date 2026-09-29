import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '@/services/productService';

interface SaleEvent {
  customer: string;
  city: string;
  productId: number;
  timeAgo: string;
}

const SAMPLE_EVENTS: SaleEvent[] = [
  { customer: 'Devendra M.', city: 'Mumbai', productId: 1, timeAgo: '2 minutes ago' },
  { customer: 'Ananya S.', city: 'Bengaluru', productId: 6, timeAgo: 'Just now' },
  { customer: 'Vikramaditya R.', city: 'New Delhi', productId: 2, timeAgo: '5 minutes ago' },
  { customer: 'Kavita J.', city: 'Kolkata', productId: 8, timeAgo: '8 minutes ago' },
  { customer: 'Aditya K.', city: 'Hyderabad', productId: 3, timeAgo: '12 minutes ago' },
  { customer: 'Meera P.', city: 'Pune', productId: 9, timeAgo: '4 minutes ago' }
];

export const LiveSalesNotification: React.FC = () => {
  const [currentEvent, setCurrentEvent] = useState<SaleEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dismissed) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % SAMPLE_EVENTS.length;
        setCurrentEvent(SAMPLE_EVENTS[currentIndex]);
        setIsVisible(true);
      }, 1000);
    }, 11000);

    // Initial popup after 3 seconds
    const initialTimer = setTimeout(() => {
      setCurrentEvent(SAMPLE_EVENTS[0]);
      setIsVisible(true);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [dismissed]);

  if (!currentEvent || dismissed) return null;

  const product = productService.getProductById(currentEvent.productId);
  if (!product) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm pointer-events-none font-inter">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            onClick={() => {
              navigate(`/product/${product.id}`);
            }}
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-gold/30 rounded-xl p-3.5 shadow-2xl hover:shadow-gold/10 hover:border-gold transition-all cursor-pointer flex items-center gap-3.5 group relative overflow-hidden"
          >
            {/* Shimmer gradient line on top */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

            <div className="relative flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-16 object-cover rounded-md bg-ivory group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span className="font-semibold text-navy">Recently Reserved</span>
                <span>&bull;</span>
                <span>{currentEvent.timeAgo}</span>
              </div>

              <h5 className="font-playfair text-xs font-bold text-navy truncate group-hover:text-gold transition-colors">
                {product.name}
              </h5>

              <p className="text-[11px] text-gray-600 truncate mt-0.5">
                Purchased by <strong className="text-gray-900">{currentEvent.customer}</strong> in {currentEvent.city}
              </p>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-gold">₹{product.price.toLocaleString()}</span>
                <span className="text-[10px] text-gray-400 group-hover:underline flex items-center gap-0.5">
                  View piece &rarr;
                </span>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsVisible(false);
                setDismissed(true);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-navy p-1 transition-colors"
              title="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveSalesNotification;
