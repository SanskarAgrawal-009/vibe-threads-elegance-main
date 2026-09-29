import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import CartDrawer from "@/components/CartDrawer";

const Index = lazy(() => import("./pages/Index"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Men = lazy(() => import("./pages/Men"));
const Women = lazy(() => import("./pages/Women"));
const Children = lazy(() => import("./pages/Children"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NewArrivals = lazy(() => import("./pages/NewArrivals"));
const Sale = lazy(() => import("./pages/Sale"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Orders = lazy(() => import("./pages/Orders"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartDrawer />
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="font-syne font-black text-xs text-black tracking-[0.25em] uppercase">ELEGANCE THREADS</span>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/men" element={<Men />} />
                <Route path="/women" element={<Women />} />
                <Route path="/children" element={<Children />} />
                <Route path="/new-arrivals" element={<NewArrivals />} />
                <Route path="/sale" element={<Sale />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute 
                      element={<Admin />}
                    />
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
