import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, ShieldCheck, Truck, CreditCard, QrCode, Building2, Banknote, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { orderService } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';

export const Checkout: React.FC = () => {
  const {
    cartItems,
    getTotalPrice,
    getShippingFee,
    getDiscountAmount,
    getFinalTotal,
    clearCart
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Sonia',
    lastName: user?.name && user.name.split(' ').length > 1 ? user.name.split(' ')[1] : 'Verma',
    email: user?.email || 'client@elegance.com',
    phone: user?.phone || '+91 98765 43210',
    address: 'Flat 402, Elegance Boulevard, MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    zipCode: '560001',
    country: 'India'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit Card' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotalPrice();
  const baseShipping = getShippingFee();
  const shipping = shippingMethod === 'priority' ? baseShipping + 999 : baseShipping;
  const discount = getDiscountAmount();
  const total = Math.max(0, subtotal - discount + shipping);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setIsSubmitting(true);

    try {
      const order = orderService.createOrder({
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size,
          color: item.color
        })),
        subtotal,
        discount,
        shipping,
        total,
        paymentMethod,
        status: 'Processing',
        shippingAddress: { ...formData },
        estimatedDelivery: shippingMethod === 'priority' ? 'Next-Day Express Dispatch' : '2-3 business days'
      });

      clearCart();
      navigate(`/payment?orderId=${encodeURIComponent(order.id)}`);
    } catch (err) {
      console.error('Failed to submit order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
        <Header />
        <main className="container mx-auto px-6 py-24 text-center max-w-md my-auto">
          <h2 className="font-syne font-black text-2xl uppercase tracking-[0.15em] mb-3">
            BAG IS EMPTY
          </h2>
          <p className="text-xs text-neutral-500 mb-8">
            Please add items to your shopping bag before proceeding to checkout.
          </p>
          <Link to="/">
            <button className="bg-black text-white hover:bg-neutral-800 text-[11px] font-medium tracking-[0.2em] px-8 py-3.5 uppercase transition-all">
              DISCOVER RUNWAY
            </button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-10 max-w-6xl">
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] text-neutral-400 hover:text-black uppercase transition-colors mb-3"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>RETURN TO BAG</span>
          </Link>
          <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase border-b border-neutral-100 pb-3">
            CHECKOUT
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left 8 Cols: Delivery, Shipping, Payment */}
            <div className="lg:col-span-8 space-y-10">
              {/* Step 1: Shipping Address */}
              <section className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <h2 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase">
                    1. SHIPPING ADDRESS
                  </h2>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    STEP 1 OF 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      LAST NAME *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      TELEPHONE NUMBER *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      DELIVERY ADDRESS *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-wider text-neutral-500 uppercase block mb-1">
                      POSTAL / ZIP CODE *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-white border border-neutral-200 p-3 text-xs tracking-wider text-black uppercase focus:outline-none focus:border-black"
                    />
                  </div>
                </div>
              </section>

              {/* Step 2: Delivery Method */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <h2 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase">
                    2. DELIVERY METHOD
                  </h2>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    STEP 2 OF 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`border p-4 cursor-pointer transition-all flex justify-between items-start ${
                      shippingMethod === 'standard'
                        ? 'border-black bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs tracking-wider text-black uppercase">
                          STANDARD COMPLIMENTARY
                        </span>
                        {shippingMethod === 'standard' && (
                          <Check className="w-3.5 h-3.5 text-black" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500">2-3 Business Days Delivery</p>
                    </div>
                    <span className="text-xs font-semibold text-black uppercase">
                      {baseShipping === 0 ? 'FREE' : `₹${baseShipping}`}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('priority')}
                    className={`border p-4 cursor-pointer transition-all flex justify-between items-start ${
                      shippingMethod === 'priority'
                        ? 'border-black bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-xs tracking-wider text-black uppercase">
                          ATELIER NEXT-DAY EXPRESS
                        </span>
                        {shippingMethod === 'priority' && (
                          <Check className="w-3.5 h-3.5 text-black" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500">Priority Same-Day Dispatch</p>
                    </div>
                    <span className="text-xs font-semibold text-black uppercase">
                      +₹999
                    </span>
                  </div>
                </div>
              </section>

              {/* Step 3: Payment Method */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <h2 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase">
                    3. PAYMENT METHOD
                  </h2>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-widest">
                    STEP 3 OF 3
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                    { id: 'Credit Card', label: 'CARD', icon: <CreditCard className="w-4 h-4" /> },
                    { id: 'Net Banking', label: 'NET BANKING', icon: <Building2 className="w-4 h-4" /> },
                    { id: 'Cash on Delivery', label: 'PAY ON ARRIVAL', icon: <Banknote className="w-4 h-4" /> }
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`border p-3 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === m.id
                          ? 'border-black bg-neutral-50 text-black'
                          : 'border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-black'
                      }`}
                    >
                      {m.icon}
                      <span className="text-[10px] font-semibold tracking-wider uppercase">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right 4 Cols: Order Summary & Action */}
            <div className="lg:col-span-4">
              <div className="border border-neutral-200 p-6 sticky top-24 space-y-6 bg-white">
                <h3 className="font-syne font-black text-sm tracking-[0.2em] text-black uppercase pb-3 border-b border-neutral-100">
                  ORDER SUMMARY ({cartItems.length})
                </h3>

                {/* Mini Item List */}
                <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-neutral-100 scrollbar-none">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-12 object-cover bg-neutral-100"
                        />
                        <div>
                          <h4 className="font-semibold text-black uppercase truncate max-w-[140px]">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-neutral-400 uppercase">
                            QTY: {item.quantity} &bull; {item.size}
                          </span>
                        </div>
                      </div>
                      <span className="font-semibold text-black">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotal List */}
                <div className="space-y-2 text-xs tracking-wider text-neutral-600 border-t border-neutral-100 pt-4 uppercase">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="text-black font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-black font-semibold">
                      <span>DISCOUNT</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>DELIVERY</span>
                    <span className="text-black font-medium">
                      {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-neutral-100 text-black font-bold">
                    <span className="text-sm">FINAL TOTAL</span>
                    <span className="text-lg">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] py-4 uppercase transition-all shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? 'AUTHORIZING ORDER...' : `PAY ₹${total.toLocaleString()} & PLACE ORDER`}
                </button>

                <div className="text-[10px] text-neutral-400 text-center uppercase tracking-wider space-y-1 pt-2">
                  <p>&bull; 256-Bit SSL Encrypted Payment</p>
                  <p>&bull; Official Elegance Threads Guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
