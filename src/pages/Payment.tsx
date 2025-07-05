
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Payment = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-8"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 font-inter text-lg mb-8"
          >
            Thank you for your purchase. Your order has been successfully placed and will be processed shortly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-ivory p-6 rounded-lg mb-8"
          >
            <h2 className="font-playfair text-xl font-semibold text-navy mb-4">Order Details</h2>
            <div className="text-left space-y-2">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-semibold">#TVT-2024-001</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-semibold text-gold">$679.97</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span className="font-semibold">3-5 business days</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <Package className="w-8 h-8 text-gold" />
              <div className="text-left">
                <h3 className="font-semibold text-navy">Processing</h3>
                <p className="text-sm text-gray-600">Your order is being prepared</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
              <Truck className="w-8 h-8 text-gray-400" />
              <div className="text-left">
                <h3 className="font-semibold text-gray-400">Shipping</h3>
                <p className="text-sm text-gray-400">Will be shipped soon</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-4"
          >
            <Link to="/">
              <Button className="bg-gold hover:bg-gold/90 text-white font-semibold px-8 py-3 mr-4">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/orders">
              <Button variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-3">
                Track Order
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
