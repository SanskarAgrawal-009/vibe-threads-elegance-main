import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, ExternalLink, LogOut, Package, ShoppingCart, BarChart3 } from 'lucide-react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-inter">
      {/* Top Admin Bar */}
      <nav className="bg-black text-white border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold text-xs">
                ET
              </div>
              <div>
                <span className="font-syne font-black text-xs tracking-[0.2em] uppercase block text-white">
                  ELEGANCE ATELIER
                </span>
                <span className="text-[9px] tracking-widest text-neutral-400 font-mono block">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6 text-[11px] font-medium tracking-[0.15em] uppercase text-neutral-400">
              <Link to="/admin" className="hover:text-white transition-colors flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5" />
                OVERVIEW
              </Link>
              <Link to="/admin/products" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                INVENTORY
              </Link>
              <Link to="/admin/orders" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" />
                ORDERS
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-5 text-[11px] tracking-wider uppercase">
            {/* View Storefront */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
            >
              <span>STOREFRONT</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <span className="text-neutral-600 hidden sm:inline">|</span>

            {/* Admin identity */}
            <span className="text-[10px] text-neutral-400 hidden lg:inline font-mono">
              {user?.email || 'admin@elegance.com'}
            </span>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 px-3 py-1.5 text-[10px] font-medium tracking-widest uppercase transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>EXIT</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6 sm:px-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
