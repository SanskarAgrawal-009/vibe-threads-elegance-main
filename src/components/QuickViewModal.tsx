import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingBag, Heart, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0] || 'M';
  const currentColor = selectedColor || product.colors[0]?.name || 'Default';
  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: gallery[activeImageIndex] || product.image,
        size: currentSize,
        color: currentColor,
        category: product.category,
        isNewArrival: product.isNewArrival,
        isOnSale: product.isOnSale,
        originalPrice: product.originalPrice
      },
      quantity
    );
    onClose();
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        isNewArrival: product.isNewArrival,
        isOnSale: product.isOnSale,
        originalPrice: product.originalPrice
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-white rounded-none border border-neutral-200 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image & Thumbnails */}
          <div className="p-6 bg-neutral-50 flex flex-col justify-between">
            <div className="aspect-[3/4] overflow-hidden relative mb-3">
              <img
                src={gallery[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.isOnSale && (
                <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider">
                  Sale
                </span>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2 justify-center overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 border overflow-hidden transition-all ${
                      activeImageIndex === idx ? 'border-black' : 'border-neutral-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Form */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span className="uppercase tracking-widest font-medium text-[10px] text-neutral-500">
                  {product.category} &bull; {product.subcategory}
                </span>
                <div className="flex items-center gap-1 text-black text-xs font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="font-syne text-lg font-bold text-black uppercase tracking-wider mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-xl font-semibold text-black">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-xs text-neutral-600 line-clamp-3 mb-5 leading-relaxed font-inter">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-4">
                  <label className="text-[11px] font-semibold text-black uppercase tracking-wider block mb-2">
                    Color: <span className="font-normal text-neutral-600">{currentColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-6 h-6 border p-0.5 flex items-center justify-center transition-all ${
                          currentColor === color.name ? 'border-black' : 'border-neutral-300 hover:border-neutral-500'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {currentColor === color.name && (
                            <Check className={`w-3 h-3 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                          )}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-[11px] font-semibold text-black uppercase tracking-wider">
                      Select Size
                    </label>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider">
                      {product.stock <= 5 ? (
                        <span className="text-neutral-900 font-semibold">Low Stock ({product.stock})</span>
                      ) : (
                        'In Stock'
                      )}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-10 px-3 py-1.5 text-xs font-semibold border rounded-none transition-all uppercase ${
                          currentSize === size
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-neutral-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3 border-t border-neutral-200">
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs py-5 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add to Bag
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={`h-11 w-11 rounded-none border-neutral-300 ${
                    inWishlist ? 'text-black bg-neutral-100' : 'text-black hover:bg-neutral-100'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                </Button>
              </div>

              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="inline-flex items-center justify-center w-full text-[11px] font-medium text-neutral-600 hover:text-black uppercase tracking-wider transition-colors gap-1 pt-1"
              >
                View full garment editorial
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
