
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { getNewArrivals } from '@/data/products';

const NewArrivals = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const newArrivals = getNewArrivals();

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: 'M',
      color: 'Default',
      category: product.category
    });
  };

  const handleWishlist = (product: any) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-4">New Arrivals</h1>
          <p className="text-gray-600 font-inter">Discover our latest collection of premium fashion</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newArrivals.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-ivory rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded">NEW</span>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleWishlist(product)}
                    className={`bg-white/80 hover:bg-white transition-colors ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-navy'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <span className="text-xs text-gray-500 font-inter uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="font-playfair text-lg font-semibold text-navy mt-1 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-bold text-lg">₹{product.price.toLocaleString()}</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-gold hover:bg-gold/90 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivals;
