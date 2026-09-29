import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { orderService, Order } from '@/services/orderService';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const load = () => {
      setOrders(orderService.getOrders());
    };
    load();
    window.addEventListener('orders_updated', load);
    return () => window.removeEventListener('orders_updated', load);
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-10 max-w-5xl flex-1">
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
              <span>RETURN TO SHOPPING</span>
            </Link>
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
              <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase">
                MY PURCHASES
              </h1>
              <span className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase font-medium">
                ({orders.length} {orders.length === 1 ? 'ORDER' : 'ORDERS'})
              </span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-24 border border-neutral-200 my-8">
              <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 uppercase block mb-2">
                PURCHASES
              </span>
              <h3 className="font-syne font-bold text-base tracking-[0.15em] text-black uppercase mb-2">
                NO ORDERS REGISTERED
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                When you make a purchase, your tracking details and receipts will appear here.
              </p>
              <Link to="/new-arrivals">
                <button className="bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] px-8 py-3.5 uppercase transition-all shadow-xs">
                  DISCOVER COLLECTION
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-neutral-200 bg-white hover:border-black transition-colors"
                >
                  {/* Order Top Bar */}
                  <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-wider">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-neutral-400 block text-[9px]">ORDER DATE</span>
                        <span className="font-semibold text-black">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block text-[9px]">TOTAL</span>
                        <span className="font-semibold text-black">₹{order.total.toLocaleString()}</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-neutral-400 block text-[9px]">REFERENCE</span>
                        <span className="font-mono text-black">{order.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 uppercase bg-black text-white tracking-widest">
                        {order.status}
                      </span>
                      <Link to={`/payment?orderId=${encodeURIComponent(order.id)}`}>
                        <button className="border border-neutral-300 hover:border-black text-black px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-colors flex items-center gap-1">
                          TRACK
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Items in this order */}
                  <div className="p-6 divide-y divide-neutral-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
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
                            <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-0.5">
                              SIZE: {item.size} &bull; QTY: {item.quantity}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-black tracking-wider">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
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

export default Orders;
