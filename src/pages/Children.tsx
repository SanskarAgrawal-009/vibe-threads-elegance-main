import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Children = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const products = [
    {
      id: 301,
      name: "Organic Cotton Set",
      price: 4979, // Converted from $59.99
      originalPrice: 6639, // Converted from $79.99
      image: "https://images.unsplash.com/photo-1622290291011-1aa8fab01c14?w=400&h=500&fit=crop",
      category: "Children"
    },
    {
      id: 302,
      name: "Kids Denim Jacket",
      price: 5809, // Converted from $69.99
      image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=500&fit=crop",
      category: "Children"
    },
    {
      id: 303,
      name: "Cozy Winter Sweater",
      price: 4149, // Converted from $49.99
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a5?w=400&h=500&fit=crop",
      category: "Children"
    },
    {
      id: 304,
      name: "Comfortable Play Outfit",
      price: 3319, // Converted from $39.99
      image: "https://images.unsplash.com/photo-1622290291011-1aa8fab01c14?w=400&h=500&fit=crop",
      category: "Children"
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
            Children's Collection
          </h1>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Stylish, comfortable, and durable clothing for every adventure.
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

export default Children;
