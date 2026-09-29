import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard activeTab="overview" />} />
        <Route path="products" element={<AdminDashboard activeTab="products" />} />
        <Route path="orders" element={<AdminDashboard activeTab="orders" />} />
        <Route path="*" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
