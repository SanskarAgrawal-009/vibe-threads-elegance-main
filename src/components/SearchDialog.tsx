
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { searchProducts } from '@/data/products';

const SearchDialog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const searchResults = searchQuery.length > 2 ? searchProducts(searchQuery) : [];

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-navy hover:text-gold">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          {searchQuery.length > 2 && (
            <div className="max-h-96 overflow-y-auto space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gold font-bold">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleWishlist(product)}
                        className={isInWishlist(product.id) ? 'text-red-500' : 'text-navy'}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-gold hover:bg-gold/90 text-white"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No products found for "{searchQuery}"</p>
              )}
            </div>
          )}
          
          {searchQuery.length > 0 && searchQuery.length <= 2 && (
            <p className="text-center text-gray-500 py-4">Type at least 3 characters to search</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
