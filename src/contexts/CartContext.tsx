import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  category: string;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  originalPrice?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getShippingFee: () => number;
  couponCode: string | null;
  discountPercentage: number;
  getDiscountAmount: () => number;
  getFinalTotal: () => number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  FREE_SHIPPING_THRESHOLD: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vibe_threads_cart_v1';
const WISHLIST_STORAGE_KEY = 'vibe_threads_wishlist_v1';
const FREE_SHIPPING_THRESHOLD = 6250;
const STANDARD_SHIPPING_FEE = 499;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to storage:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Failed to save wishlist to storage:', e);
    }
  }, [wishlistItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
      );

      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity
        };
        return copy;
      }

      return [...prev, { ...item, quantity }];
    });

    // Auto open cart drawer for immediate user feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCartItems(prev => prev.filter(item => {
      if (size && color) {
        return !(item.id === id && item.size === size && item.color === color);
      }
      return item.id !== id;
    }));
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color);
      return;
    }

    setCartItems(prev =>
      prev.map(item => {
        if (size && color) {
          return (item.id === id && item.size === size && item.color === color)
            ? { ...item, quantity }
            : item;
        }
        return item.id === id ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCouponCode(null);
    setDiscountPercentage(0);
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.find(wishItem => wishItem.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getShippingFee = () => {
    const subtotal = getTotalPrice();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return STANDARD_SHIPPING_FEE;
  };

  const getDiscountAmount = () => {
    const subtotal = getTotalPrice();
    return Math.round((subtotal * discountPercentage) / 100);
  };

  const getFinalTotal = () => {
    const subtotal = getTotalPrice();
    if (subtotal === 0) return 0;
    const discount = getDiscountAmount();
    const shipping = getShippingFee();
    return Math.max(0, subtotal - discount + shipping);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'VIBE10' || cleanCode === 'WELCOME10') {
      setCouponCode(cleanCode);
      setDiscountPercentage(10);
      return { success: true, message: '10% discount coupon applied!' };
    }
    if (cleanCode === 'ELEGANCE20' || cleanCode === 'LUXE20') {
      setCouponCode(cleanCode);
      setDiscountPercentage(20);
      return { success: true, message: '20% luxury discount applied!' };
    }
    if (cleanCode === 'FREESHIP') {
      setCouponCode(cleanCode);
      setDiscountPercentage(5);
      return { success: true, message: 'Free shipping promo code applied with 5% off!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try "VIBE10" or "ELEGANCE20"' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
    setDiscountPercentage(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getTotalItems,
        getTotalPrice,
        getShippingFee,
        couponCode,
        discountPercentage,
        getDiscountAmount,
        getFinalTotal,
        applyCoupon,
        removeCoupon,
        FREE_SHIPPING_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
