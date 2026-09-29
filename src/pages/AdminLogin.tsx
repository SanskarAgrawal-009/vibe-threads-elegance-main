import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_CREDENTIALS } from '@/constants/auth';
import { toast } from '@/components/ui/use-toast';
import { Shield, Lock, Key, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showKey, setShowKey] = useState(false);

  const { loginAdmin, isLoading, isAdmin, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from || '/admin';

  // If already logged in as admin, redirect to /admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Credentials Required',
        description: 'Please provide administrator email and security key.'
      });
      return;
    }

    const res = await loginAdmin(email, password);
    if (res.success) {
      toast({
        title: 'Access Granted',
        description: 'Authenticated as Atelier Director. Opening console...'
      });
      navigate(from, { replace: true });
    } else {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: res.message
      });
    }
  };

  const handleFillAdminCredentials = () => {
    setEmail(ADMIN_CREDENTIALS.email);
    setPassword(ADMIN_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] text-white font-inter select-none flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar: Return to store */}
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] text-neutral-400 hover:text-white uppercase transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO STORE</span>
        </Link>

        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>

      {/* Main Admin Console Card */}
      <div className="w-full max-w-md mx-auto my-auto py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black border border-neutral-800 p-8 sm:p-10 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center mx-auto mb-4 text-white">
              <Shield className="w-6 h-6 stroke-[1.5]" />
            </div>

            <span className="text-[9px] tracking-[0.35em] text-neutral-400 font-semibold block mb-1 uppercase font-mono">
              RESTRICTED GATEWAY &bull; LEVEL 1
            </span>
            <h1 className="font-syne font-black text-2xl tracking-[0.15em] text-white uppercase">
              ATELIER CONSOLE
            </h1>
            <p className="text-xs text-neutral-400 mt-2 font-normal">
              Internal management system for inventory, orders, and catalogue operations.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase block mb-1.5 font-mono">
                ADMINISTRATIVE ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elegance.com"
                  disabled={isLoading}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 p-3 text-xs tracking-wider text-white focus:outline-none focus:border-white uppercase placeholder:text-neutral-600"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase font-mono">
                  SECURITY KEY / PASSCODE
                </label>
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="text-[10px] text-neutral-400 hover:text-white uppercase tracking-wider transition-colors"
                >
                  {showKey ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  disabled={isLoading}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 p-3 text-xs tracking-wider text-white focus:outline-none focus:border-white placeholder:text-neutral-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white hover:bg-neutral-200 text-black font-semibold text-[11px] tracking-[0.2em] py-4 uppercase transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              <Lock className="w-3.5 h-3.5" />
              {isLoading ? 'AUTHENTICATING...' : 'ACCESS ATELIER CONSOLE'}
            </button>

            {/* Quick Fill Credentials Helper */}
            <div className="pt-4 border-t border-neutral-800 text-center">
              <button
                type="button"
                onClick={handleFillAdminCredentials}
                className="text-[10px] font-mono tracking-wider text-neutral-400 hover:text-white border-b border-neutral-700 pb-0.5 uppercase transition-colors"
              >
                FILL ATELIER CREDENTIALS ({ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password})
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-mono">
        ELEGANCE THREADS &bull; ARCHITECTURAL ATELIER SYSTEM &bull; CONFIDENTIAL
      </div>
    </div>
  );
};

export default AdminLogin;
