import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Menu, X, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import SearchDialog from './SearchDialog';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getTotalItems, wishlistItems, setIsCartOpen } = useCart();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Monitor scroll state for transparent-to-solid transition
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Determine if header should be transparent (only on home page when at the top)
  const isTransparent = isHomePage && !isScrolled;

  const navLinks = [
    { label: 'WOMAN', path: '/women' },
    { label: 'MAN', path: '/men' },
    { label: 'KIDS', path: '/children' },
    { label: 'NEW IN', path: '/new-arrivals' },
    { label: 'SPECIAL PRICES', path: '/sale' },
  ];

  return (
    <header
      className={`font-inter select-none transition-all duration-300 ease-in-out ${
        isHomePage ? 'fixed top-0 inset-x-0 z-50' : 'sticky top-0 z-40'
      } ${
        isTransparent
          ? 'bg-gradient-to-b from-black/80 via-black/30 to-transparent text-white border-0 shadow-none'
          : 'bg-white/95 backdrop-blur-md text-black border-b border-neutral-100 shadow-xs'
      }`}
    >
      <div className="px-6 sm:px-12 py-3 transition-colors">
        <div className="container mx-auto flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-1 transition-colors ${
              isTransparent ? 'text-white' : 'text-black'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Left Navigation (Zara Style) */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-medium tracking-[0.2em] transition-colors ${
                    isActive
                      ? isTransparent
                        ? 'text-white border-b border-white pb-0.5'
                        : 'text-black border-b border-black pb-0.5'
                      : isTransparent
                      ? 'text-neutral-200 hover:text-white'
                      : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Mark: ELEGANCE THREADS */}
          <Link to="/" className="text-center group py-0.5">
            <h1
              className={`font-syne font-black text-xl sm:text-2xl tracking-[0.2em] uppercase leading-none transition-colors ${
                isTransparent ? 'text-white drop-shadow-sm' : 'text-black'
              }`}
            >
              ELEGANCE
            </h1>
            <span
              className={`text-[8px] tracking-[0.45em] font-semibold block uppercase mt-0.5 transition-colors ${
                isTransparent ? 'text-neutral-300' : 'text-neutral-400'
              }`}
            >
              THREADS
            </span>
          </Link>

          {/* Right Minimalist Controls */}
          <div
            className={`flex items-center space-x-6 text-[11px] font-medium tracking-[0.2em] transition-colors ${
              isTransparent ? 'text-white' : 'text-black'
            }`}
          >
            {/* Search */}
            <div className="flex items-center hover:opacity-75 transition-opacity cursor-pointer">
              <SearchDialog
                triggerClassName={`p-1 transition-colors ${
                  isTransparent ? 'text-white' : 'text-black'
                }`}
              />
              <span className="hidden lg:inline ml-1 uppercase text-[11px] font-medium">
                SEARCH
              </span>
            </div>

            {/* Login / Customer Account / Admin */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  to={isAdmin ? '/admin' : '/orders'}
                  className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                >
                  <User className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span className="hidden lg:inline text-[11px] uppercase font-semibold">
                    {isAdmin ? 'ADMIN' : user?.name ? user.name.split(' ')[0] : 'ACCOUNT'}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className={`text-[10px] uppercase tracking-wider transition-colors ${
                    isTransparent ? 'text-neutral-300 hover:text-white' : 'text-neutral-400 hover:text-black'
                  }`}
                >
                  LOG OUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              >
                <User className="w-3.5 h-3.5 stroke-[1.5]" />
                <span className="hidden lg:inline text-[11px] uppercase">LOG IN</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity relative"
            >
              <Heart className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden lg:inline text-[11px] uppercase">SAVED</span>
              {wishlistItems.length > 0 && (
                <span
                  className={`text-[10px] font-bold ml-0.5 ${
                    isTransparent ? 'text-white' : 'text-black'
                  }`}
                >
                  ({wishlistItems.length})
                </span>
              )}
            </Link>

            {/* Shopping Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="text-[11px] uppercase font-semibold">
                BAG ({getTotalItems()})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden pt-4 pb-4 border-t mt-3 transition-colors ${
              isTransparent
                ? 'bg-black/90 backdrop-blur-lg border-white/20 text-white'
                : 'bg-white border-neutral-100 text-black'
            }`}
          >
            <nav className="flex flex-col space-y-3 font-medium text-xs tracking-[0.25em] uppercase px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-1 hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-neutral-200/40 flex flex-col space-y-2">
                <Link
                  to={isAuthenticated ? (isAdmin ? '/admin' : '/orders') : '/login'}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-1"
                >
                  {isAuthenticated ? (isAdmin ? 'ADMIN CONSOLE' : 'MY ORDERS & ACCOUNT') : 'LOG IN / REGISTER'}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-1"
                >
                  SAVED ITEMS ({wishlistItems.length})
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
