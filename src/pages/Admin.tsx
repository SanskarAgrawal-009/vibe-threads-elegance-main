import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '@/contexts/AuthContext';

const Admin = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminDashboard />} />
        <Route path="products/new" element={<AdminDashboard />} />
        <Route path="products/:id/edit" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
