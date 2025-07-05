import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/admin" className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/admin/products" className="text-gray-600 hover:text-gray-900">
                Products
              </Link>
              <Link to="/admin/orders" className="text-gray-600 hover:text-gray-900">
                Orders
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
