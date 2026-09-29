import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, Check, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Progress } from '@/components/ui/progress';

export const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getShippingFee,
    getDiscountAmount,
    getFinalTotal,
    couponCode,
    applyCoupon,
    removeCoupon,
    FREE_SHIPPING_THRESHOLD
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; error: boolean } | null>(null);
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shippingFee = getShippingFee();
  const discount = getDiscountAmount();
  const finalTotal = getFinalTotal();

  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ text: res.message, error: false });
      setCouponInput('');
    } else {
      setCouponFeedback({ text: res.message, error: true });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
        <Header />
        <main className="container mx-auto px-6 sm:px-12 py-24 text-center max-w-lg my-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase block mb-2">
              BAG
            </span>
            <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase mb-3">
              YOUR BAG IS EMPTY
            </h1>
            <p className="text-xs text-neutral-500 mb-8 leading-relaxed">
              Explore the latest Autumn / Winter 26 runway drops and curated atelier essentials.
            </p>
            <Link to="/new-arrivals">
              <button className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all shadow-xs">
                VIEW COLLECTION
              </button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-10">
        {/* Page Title & Back Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black uppercase transition-colors mb-3"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>CONTINUE SHOPPING</span>
          </Link>
          <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
            <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase">
              SHOPPING BAG
            </h1>
            <span className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">
              ({totalCount} {totalCount === 1 ? 'ITEM' : 'ITEMS'})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Meter */}
            <div className="border border-neutral-200 p-4 bg-neutral-50">
              <div className="flex justify-between items-center text-xs mb-2">
                {amountNeeded > 0 ? (
                  <span className="text-neutral-700 tracking-wide">
                    Add <strong className="text-black font-semibold">₹{amountNeeded.toLocaleString()}</strong> more to enjoy <strong className="text-black font-semibold">COMPLIMENTARY SHIPPING</strong>
                  </span>
                ) : (
                  <span className="text-black font-semibold tracking-wide flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-black" /> You qualify for Complimentary Standard Delivery
                  </span>
                )}
                <span className="text-[11px] font-semibold text-black tracking-wider">
                  {freeShippingProgress}%
                </span>
              </div>
              <Progress value={freeShippingProgress} className="h-1 bg-neutral-200 [&>div]:bg-black" />
            </div>

            {/* Product Items */}
            <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="py-6 flex flex-col sm:flex-row gap-6 justify-between group"
                >
                  <div className="flex gap-5">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-32 object-cover bg-neutral-100 filter contrast-102"
                      />
                    </Link>

                    <div className="flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] tracking-widest text-neutral-400 uppercase font-medium block mb-1">
                          {item.category}
                        </span>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-syne font-black text-sm text-black uppercase tracking-wider hover:text-neutral-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                          <span>SIZE: <strong className="text-black font-semibold">{item.size}</strong></span>
                          <span>&bull;</span>
                          <span>COLOR: <strong className="text-black font-semibold">{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-200 bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                            className="p-1.5 text-neutral-500 hover:text-black"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                            className="p-1.5 text-neutral-500 hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-[10px] text-neutral-400 hover:text-black uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          DELETE
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right flex sm:flex-col justify-between items-end">
                    <span className="font-semibold text-sm text-black tracking-wide">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-neutral-400 uppercase">
                      ₹{item.price.toLocaleString()} EACH
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary Rail (Sticky) */}
          <div className="lg:col-span-4">
            <div className="border border-neutral-200 p-6 sticky top-24 space-y-6 bg-white">
              <h2 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase pb-3 border-b border-neutral-100">
                SUMMARY
              </h2>

              {/* Promo Code Form */}
              {couponCode ? (
                <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs">
                  <span className="text-black font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-black" /> CODE: {couponCode}
                  </span>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-neutral-400 hover:text-black uppercase tracking-wider font-semibold"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="PROMO CODE (ELEGANCE20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-white border border-neutral-200 px-3 py-2 text-xs text-black uppercase tracking-wider focus:outline-none focus:border-black placeholder:text-neutral-400"
                    />
                    <button
                      type="submit"
                      className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-wider px-4 uppercase transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                  {couponFeedback && (
                    <p className={`text-[10px] uppercase tracking-wider ${couponFeedback.error ? 'text-neutral-500' : 'text-black font-semibold'}`}>
                      {couponFeedback.text}
                    </p>
                  )}
                </form>
              )}

              {/* Subtotal List */}
              <div className="space-y-3 text-xs tracking-wider text-neutral-600 border-t border-neutral-100 pt-4 uppercase">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-black font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-black font-semibold">
                    <span>PROMOTIONAL DISCOUNT</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ESTIMATED SHIPPING</span>
                  <span className="text-black font-medium">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-neutral-100 text-black font-bold">
                  <span className="text-sm">TOTAL</span>
                  <span className="text-lg">₹{finalTotal.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-neutral-400 block text-right">
                  INCL. ALL TAXES & DUTIES
                </span>
              </div>

              {/* Primary Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] py-4 uppercase transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <span>CONTINUE TO CHECKOUT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 text-[10px] text-neutral-400 text-center tracking-wider uppercase space-y-1">
                <p>&bull; 30-Day Complimentary Home Exchanges</p>
                <p>&bull; Encrypted Luxury Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
