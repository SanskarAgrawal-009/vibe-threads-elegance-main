import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const BestSellers = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const products = [
    {
      id: 1,
      name: "Men's Tailored Wool Blazer",
      price: 24817, // Converted from $299
      originalPrice: 33117, // Converted from $399
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop",
      category: "Men",
      isNew: false,
      isOnSale: true,
    },
    {
      id: 2,
      name: "Women's Silk Midi Dress",
      price: 16517, // Converted from $199
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      category: "Women",
      isNew: true,
      isOnSale: false,
    },
    {
      id: 3,
      name: "Premium Cotton Shirt",
      price: 7387, // Converted from $89
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      category: "Men",
      isNew: false,
      isOnSale: false,
    },
    {
      id: 4,
      name: "Children's Organic Cotton Set",
      price: 4897, // Converted from $59
      originalPrice: 6557, // Converted from $79
      image: "https://images.unsplash.com/photo-1622290291011-1aa8fab01c14?w=400&h=500&fit=crop",
      category: "Children",
      isNew: false,
      isOnSale: true,
    },
    {
      id: 5,
      name: "Women's Cashmere Sweater",
      price: 20667, // Converted from $249
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "Women",
      isNew: true,
      isOnSale: false,
    },
    {
      id: 6,
      name: "Men's Leather Dress Shoes",
      price: 15687, // Converted from $189
      originalPrice: 19007, // Converted from $229
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      category: "Men",
      isNew: false,
      isOnSale: true,
    },
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-navy mb-4">
            Bestsellers
          </h3>
          <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pieces, carefully selected by our community of fashion enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-gold text-white px-3 py-1 rounded-full text-xs font-inter font-semibold">
                      New
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-burgundy text-white px-3 py-1 rounded-full text-xs font-inter font-semibold">
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleWishlist(product)}
                  className={`absolute top-3 right-3 bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100 ${
                    isInWishlist(product.id) ? 'text-red-500' : 'text-navy'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>

                {/* Quick add to cart overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                  <Button 
                    className="w-full bg-gold hover:bg-gold/90 text-white font-inter font-semibold"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-inter font-medium text-gray-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                <h4 className="font-inter text-lg font-semibold text-navy mb-3 line-clamp-2">
                  {product.name}
                </h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-inter text-xl font-bold text-navy">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-inter text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.isOnSale && product.originalPrice && (
                    <span className="text-xs font-inter font-semibold text-burgundy">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-navy text-navy hover:bg-navy hover:text-white font-inter font-semibold px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
