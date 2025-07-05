
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const orderItems = [
    { name: "Men's Tailored Wool Blazer", price: 299.99, quantity: 1 },
    { name: "Women's Silk Midi Dress", price: 189.99, quantity: 2 }
  ];

  const subtotal = 679.97;
  const shipping = 0;
  const total = 679.97;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Link to="/cart" className="flex items-center text-navy hover:text-gold transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-navy">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form className="space-y-6">
                <div>
                  <h2 className="font-playfair text-xl font-semibold text-navy mb-4">Contact Information</h2>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <h2 className="font-playfair text-xl font-semibold text-navy mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold mt-4"
                  />
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-playfair text-xl font-semibold text-navy mb-4">Payment Method</h2>
                  <div className="p-4 border border-gray-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Secure SSL encrypted payment</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Card number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>
                </div>

                <Link to="/payment">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-4 text-lg">
                    Complete Order
                  </Button>
                </Link>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-ivory p-6 rounded-lg h-fit"
            >
              <h2 className="font-playfair text-xl font-bold text-navy mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-300 mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-gold">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
