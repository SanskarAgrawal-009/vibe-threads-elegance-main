import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Men = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const products = [
    {
      id: 101,
      name: "Classic Wool Blazer",
      price: 24899,  // Converted from $299.99
      originalPrice: 33199, // Converted from $399.99
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
      category: "Men"
    },
    {
      id: 102,
      name: "Premium Cotton Shirt",
      price: 7469, // Converted from $89.99
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
      category: "Men"
    },
    {
      id: 103,
      name: "Leather Dress Shoes",
      price: 15769, // Converted from $189.99
      originalPrice: 19089, // Converted from $229.99
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Men"
    },
    {
      id: 104,
      name: "Casual Denim Jacket",
      price: 10789, // Converted from $129.99
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Men"
    }
  ];

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
          className="text-center mb-12"
        >
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-4">
            Men's Collection
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium selection of men's clothing, from tailored suits to casual wear.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
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
                <h3 className="font-playfair text-lg font-semibold text-navy mt-1 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-gold font-bold text-lg">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
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

export default Men;
