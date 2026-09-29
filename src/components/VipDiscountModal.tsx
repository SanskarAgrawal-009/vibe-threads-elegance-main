import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles, Gift, Copy, Check, Crown, Flame, ArrowRight } from 'lucide-react';
import { triggerGoldConfetti } from '@/lib/confetti';
import { useCart } from '@/contexts/CartContext';

export const VipDiscountModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { applyCoupon, setIsCartOpen } = useCart();

  const VIP_CODE = 'ELEGANCE20';

  const handleReveal = () => {
    setIsRevealed(true);
    triggerGoldConfetti();
  };

  const handleApplyAndShop = () => {
    applyCoupon(VIP_CODE);
    setCopied(true);
    triggerGoldConfetti();
    setTimeout(() => {
      setIsOpen(false);
      setIsCartOpen(true);
    }, 600);
  };

  return (
    <>
      {/* Floating Gold VIP Trigger Button on Bottom-Right */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-navy via-[#1a365d] to-navy text-white px-4 py-3 rounded-full shadow-2xl border-2 border-gold/70 flex items-center gap-2.5 group cursor-pointer"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
        </span>
        <Crown className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
        <span className="font-playfair text-xs font-bold tracking-wider text-ivory">
          VIP Secret Privilege
        </span>
        <span className="bg-gold text-navy text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">
          20% OFF
        </span>
      </motion.button>

      {/* Modal Vault Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden bg-white rounded-2xl border-2 border-gold/40 shadow-2xl">
          <div className="relative bg-gradient-to-br from-navy via-[#0B132B] to-navy p-8 text-center text-white overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-burgundy/20 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 border border-gold/50 text-gold mb-3 mx-auto shadow-inner">
              <Crown className="w-7 h-7" />
            </div>

            <DialogTitle className="font-playfair text-2xl font-bold text-ivory mb-1">
              Atelier Private Access
            </DialogTitle>
            <p className="text-xs text-gray-300 font-inter max-w-xs mx-auto">
              You have been granted an exclusive invitation to unlock a reserved 20% discount on today's bespoke wardrobe orders.
            </p>

            {/* Interactive Reveal Container */}
            <div className="my-6">
              {!isRevealed ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReveal}
                  className="bg-ivory/10 hover:bg-ivory/15 border-2 border-dashed border-gold/60 rounded-xl p-6 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-8 h-8 text-gold animate-bounce" />
                  <span className="font-playfair font-bold text-gold text-lg group-hover:text-white transition-colors">
                    Click to Reveal Your Privilege Code
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Complimentary VIP gift for today's visitors
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="bg-white text-navy rounded-xl p-5 shadow-xl border border-gold"
                >
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Your Personal Atelier Code
                  </span>
                  <div className="font-playfair text-3xl font-extrabold text-navy tracking-widest my-1 text-gold">
                    {VIP_CODE}
                  </div>
                  <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2.5 py-0.5 rounded-full mb-3">
                    20% Discount Guaranteed Across All Items
                  </span>

                  <Button
                    onClick={handleApplyAndShop}
                    className="w-full bg-gold hover:bg-gold/90 text-white font-bold py-5 text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        Code Applied to Your Bag!
                      </>
                    ) : (
                      <>
                        <Gift className="w-4 h-4" />
                        Apply Code & Open Shopping Bag
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>

            <p className="text-[10px] text-gray-400 font-inter">
              *Valid on all runway overcoats, evening gowns, tailoring, and children's collections.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VipDiscountModal;
