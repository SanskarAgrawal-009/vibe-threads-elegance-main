import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Truck, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { orderService } from '@/services/orderService';

export const Payment: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const order = useMemo(() => {
    if (orderId) {
      const found = orderService.getOrderById(orderId);
      if (found) return found;
    }
    const all = orderService.getOrders();
    return all.length > 0 ? all[0] : null;
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
        <Header />
        <main className="container mx-auto px-6 py-24 text-center max-w-md my-auto">
          <h2 className="font-syne font-black text-2xl uppercase tracking-[0.15em] mb-3">
            NO ORDER RECORDED
          </h2>
          <p className="text-xs text-neutral-500 mb-8">
            You currently have no active order reference to track.
          </p>
          <Link to="/">
            <button className="bg-black text-white hover:bg-neutral-800 text-[11px] font-medium tracking-[0.2em] px-8 py-3.5 uppercase transition-all">
              EXPLORE COLLECTION
            </button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const steps = [
    { title: 'ORDER CONFIRMED', desc: 'Authorized & registered', done: true, current: false },
    { title: 'ATELIER PREP', desc: 'Quality inspection', done: order.status !== 'Pending', current: order.status === 'Processing' },
    { title: 'DISPATCHED', desc: 'Handed to express courier', done: order.status === 'Shipped' || order.status === 'Delivered', current: order.status === 'Shipped' },
    { title: 'DELIVERED', desc: 'Delivered to address', done: order.status === 'Delivered', current: false }
  ];

  return (
    <div className="min-h-screen bg-white font-inter select-none">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Status */}
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase block mb-1">
              PURCHASE CONFIRMATION
            </span>
            <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase mb-2">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              REFERENCE: <span className="text-black font-bold font-mono">{order.id}</span>
            </p>
          </div>

          {/* Fulfillment Pipeline */}
          <div className="border border-neutral-200 p-6 sm:p-8 mb-10 bg-neutral-50">
            <h3 className="font-syne font-black text-xs tracking-[0.2em] text-black uppercase mb-6 pb-2 border-b border-neutral-200">
              DISPATCH & FULFILLMENT STATUS &bull; {order.status.toUpperCase()}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start">
                  <div
                    className={`w-7 h-7 flex items-center justify-center font-bold text-[11px] mb-2 ${
                      step.done
                        ? 'bg-black text-white'
                        : step.current
                        ? 'border-2 border-black text-black'
                        : 'border border-neutral-300 text-neutral-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <h4 className="font-syne font-bold text-xs tracking-wider uppercase text-black mb-0.5">
                    {step.title}
                  </h4>
                  <span className="text-[10px] text-neutral-500 tracking-wide font-normal">
                    {step.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchased Pieces Summary */}
          <div className="border border-neutral-200 p-6 sm:p-8 mb-10 space-y-6">
            <h3 className="font-syne font-black text-xs tracking-[0.2em] text-black uppercase pb-2 border-b border-neutral-200">
              ORDER ITEMS ({order.items.length})
            </h3>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-18 object-cover bg-neutral-100"
                    />
                    <div>
                      <h4 className="font-syne font-bold text-xs text-black uppercase tracking-wider">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">
                        SIZE: {item.size} &bull; QTY: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-xs text-black tracking-wider">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Total and Shipping Info */}
            <div className="border-t border-neutral-200 pt-4 flex flex-col sm:flex-row justify-between gap-6 text-xs uppercase tracking-wider">
              <div>
                <span className="text-neutral-400 block text-[10px]">DELIVERY ADDRESS</span>
                <p className="text-black font-medium mt-1">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
              </div>

              <div className="sm:text-right space-y-1">
                <div className="flex justify-between sm:justify-end gap-6">
                  <span className="text-neutral-500">PAYMENT</span>
                  <span className="font-semibold text-black">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-6 text-sm font-bold text-black pt-1">
                  <span>FINAL TOTAL</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/" className="w-full sm:w-auto">
              <button className="w-full bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all">
                CONTINUE SHOPPING
              </button>
            </Link>
            <Link to="/orders" className="w-full sm:w-auto">
              <button className="w-full border border-neutral-300 hover:border-black text-black font-semibold text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-colors">
                VIEW ORDER HISTORY
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
