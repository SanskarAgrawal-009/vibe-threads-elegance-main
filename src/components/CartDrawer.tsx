import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
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

  const handleNavigate = (path: string) => {
    setIsCartOpen(false);
    navigate(path);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0 bg-white border-l border-neutral-200">
        <SheetHeader className="p-6 border-b border-neutral-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-syne text-xs font-bold text-black uppercase tracking-widest flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-black" />
              SHOPPING BAG
              <span className="text-xs font-normal text-neutral-400">
                ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
            </SheetTitle>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="mt-4 pt-3 border-t border-neutral-200 text-left">
            <div className="flex items-center justify-between text-[11px] mb-1.5 font-inter uppercase tracking-wider">
              {amountNeeded > 0 ? (
                <span className="text-neutral-600">
                  Add <strong className="text-black font-semibold">₹{amountNeeded.toLocaleString()}</strong> for complimentary shipping
                </span>
              ) : (
                <span className="text-black font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Complimentary standard delivery unlocked
                </span>
              )}
              <span className="font-mono text-neutral-500">{freeShippingProgress}%</span>
            </div>
            <Progress value={freeShippingProgress} className="h-1 bg-neutral-100 rounded-none [&>div]:bg-black [&>div]:rounded-none" />
          </div>
        </SheetHeader>

        {/* Cart Item Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center text-black mb-4">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              </div>
              <h3 className="font-syne text-sm font-semibold text-black uppercase tracking-widest mb-2">Your Bag is Empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mb-6 uppercase tracking-wider">
                Discover our curated runway collection, tailoring, and everyday couture.
              </p>
              <Button
                onClick={() => handleNavigate('/new-arrivals')}
                className="bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs px-6 py-3"
              >
                Explore Collection
              </Button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-neutral-100">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 pt-4 first:pt-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-neutral-100 flex-shrink-0 cursor-pointer"
                    onClick={() => handleNavigate(`/product/${item.id}`)}
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => handleNavigate(`/product/${item.id}`)}
                          className="font-medium text-xs text-black hover:text-neutral-500 transition-colors line-clamp-1 uppercase tracking-wider cursor-pointer"
                        >
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          className="text-neutral-400 hover:text-black transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1 uppercase tracking-wider">
                        Size: <span className="text-black font-medium">{item.size}</span> | Color: <span className="text-black font-medium">{item.color}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                          className="px-2 py-1 text-neutral-600 hover:text-black transition-colors text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                          className="px-2 py-1 text-neutral-600 hover:text-black transition-colors text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-black text-xs">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-neutral-200 bg-white flex-shrink-0 space-y-4">
            {/* Promo Code Form */}
            {couponCode ? (
              <div className="flex items-center justify-between bg-neutral-50 border border-neutral-200 px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 text-black font-medium uppercase tracking-wider text-[11px]">
                  <Check className="w-3.5 h-3.5" /> Code <strong className="font-bold">{couponCode}</strong> applied
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-neutral-500 hover:text-black underline uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <Input
                      placeholder="Promo code (e.g. ELEGANCE10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="pl-8 text-xs h-9 bg-white rounded-none border-neutral-300 uppercase tracking-wider"
                    />
                  </div>
                  <Button type="submit" variant="outline" size="sm" className="h-9 px-3 text-xs uppercase tracking-wider rounded-none border-neutral-300">
                    Apply
                  </Button>
                </div>
                {couponFeedback && (
                  <p className={`text-[11px] uppercase tracking-wider ${couponFeedback.error ? 'text-red-600' : 'text-green-600'}`}>
                    {couponFeedback.text}
                  </p>
                )}
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 font-inter border-t border-neutral-200 pt-3">
              <div className="flex justify-between uppercase tracking-wider text-[11px]">
                <span>Subtotal</span>
                <span className="font-medium text-black">₹{subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-black uppercase tracking-wider text-[11px]">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between uppercase tracking-wider text-[11px]">
                <span>Delivery</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="font-medium text-black">COMPLIMENTARY</span>
                  ) : (
                    `₹${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-xs font-bold text-black pt-2 border-t border-neutral-200 uppercase tracking-widest">
                <span>Total Amount</span>
                <span className="text-sm">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                onClick={() => handleNavigate('/checkout')}
                className="w-full bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs py-5 transition-all flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => handleNavigate('/cart')}
                className="w-full border-neutral-200 text-black hover:bg-neutral-50 rounded-none uppercase tracking-widest text-[11px] h-9"
              >
                VIEW SHOPPING BAG
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
