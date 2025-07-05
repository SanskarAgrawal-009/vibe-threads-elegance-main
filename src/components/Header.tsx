
import React, { useState } from 'react';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import SearchDialog from './SearchDialog';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems, wishlistItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with promotional message */}
        <div className="bg-navy text-ivory text-center py-2 text-sm">
          Free shipping on orders over ₹6,250 | Hassle-free returns within 15 days
        </div>
        
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-navy" />
            ) : (
              <Menu className="h-6 w-6 text-navy" />
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-1 md:flex-none text-center md:text-left">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-navy">
              TrendVibe Threads
            </h1>
            <p className="text-xs text-gray-600 font-inter">Premium Fashion</p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 flex-1 justify-center">
            <Link to="/men" className="text-navy hover:text-gold transition-colors font-inter font-medium">
              Men
            </Link>
            <Link to="/women" className="text-navy hover:text-gold transition-colors font-inter font-medium">
              Women
            </Link>
            <Link to="/children" className="text-navy hover:text-gold transition-colors font-inter font-medium">
              Children
            </Link>
            <Link to="/new-arrivals" className="text-navy hover:text-gold transition-colors font-inter font-medium">
              New Arrivals
            </Link>
            <Link to="/sale" className="text-navy hover:text-gold transition-colors font-inter font-medium">
              Sale
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <SearchDialog />
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-navy hover:text-gold relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-navy hover:text-gold relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <Link to="/men" className="text-navy hover:text-gold transition-colors font-inter font-medium py-2">
                Men
              </Link>
              <Link to="/women" className="text-navy hover:text-gold transition-colors font-inter font-medium py-2">
                Women
              </Link>
              <Link to="/children" className="text-navy hover:text-gold transition-colors font-inter font-medium py-2">
                Children
              </Link>
              <Link to="/new-arrivals" className="text-navy hover:text-gold transition-colors font-inter font-medium py-2">
                New Arrivals
              </Link>
              <Link to="/sale" className="text-navy hover:text-gold transition-colors font-inter font-medium py-2">
                Sale
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
