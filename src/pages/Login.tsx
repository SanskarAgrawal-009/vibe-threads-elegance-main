import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DEMO_USER_CREDENTIALS } from '@/constants/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Shield, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);

  const { loginCustomer, registerCustomer, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination
  const from = (location.state as any)?.from || '/';

  // Handle Customer Login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please enter both your email address and password.'
      });
      return;
    }

    const res = await loginCustomer(loginEmail, loginPassword);
    if (res.success) {
      toast({
        title: 'Welcome to Elegance Threads',
        description: res.message
      });
      navigate(from, { replace: true });
    } else {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: res.message
      });
    }
  };

  // Handle Customer Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        variant: 'destructive',
        title: 'Required fields missing',
        description: 'Please provide your full name, email, and password.'
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        variant: 'destructive',
        title: 'Terms Acceptance Required',
        description: 'Please accept the terms of service and privacy policy to continue.'
      });
      return;
    }

    const res = await registerCustomer(registerName, registerEmail, registerPassword, registerPhone);
    if (res.success) {
      toast({
        title: 'Account Created',
        description: res.message
      });
      navigate(from, { replace: true });
    } else {
      toast({
        variant: 'destructive',
        title: 'Registration Unsuccessful',
        description: res.message
      });
    }
  };

  // Quick Demo Client Autofill
  const handleQuickDemo = () => {
    setLoginEmail(DEMO_USER_CREDENTIALS.email);
    setLoginPassword(DEMO_USER_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-white font-inter select-none flex flex-col justify-between">
      <Header />

      <main className="container mx-auto px-6 sm:px-12 py-12 md:py-16 max-w-4xl flex-1">
        {/* Zara Minimalist Title */}
        <div className="text-center mb-10">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-neutral-400 block mb-2 uppercase">
            ELEGANCE IDENTIFICATION
          </span>
          <h1 className="font-syne font-black text-2xl sm:text-3xl text-black tracking-[0.15em] uppercase">
            MY ACCOUNT
          </h1>
        </div>

        {/* Tab Switcher (Zara Underline Style) */}
        <div className="flex border-b border-neutral-200 mb-10 justify-center">
          <button
            onClick={() => setActiveTab('login')}
            className={`pb-3 px-8 text-xs font-semibold tracking-[0.2em] uppercase transition-all relative ${
              activeTab === 'login' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black'
            }`}
          >
            LOG IN
            {activeTab === 'login' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-black"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`pb-3 px-8 text-xs font-semibold tracking-[0.2em] uppercase transition-all relative ${
              activeTab === 'register' ? 'text-black font-bold' : 'text-neutral-400 hover:text-black'
            }`}
          >
            CREATE ACCOUNT
            {activeTab === 'register' && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-black"
              />
            )}
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              /* TAB 1: LOG IN */
              <motion.div
                key="login-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <form onSubmit={handleLoginSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="ENTER YOUR EMAIL"
                      disabled={isLoading}
                      required
                      className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black uppercase placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase">
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-[10px] text-neutral-400 hover:text-black tracking-widest uppercase transition-colors"
                      >
                        {showPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="ENTER YOUR PASSWORD"
                        disabled={isLoading}
                        required
                        className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-3.5 h-3.5 rounded-none accent-black cursor-pointer"
                      />
                      <span className="text-neutral-600 tracking-wide">REMEMBER ME</span>
                    </label>
                    <span className="text-neutral-400 hover:text-black cursor-pointer tracking-wide transition-colors">
                      FORGOT PASSWORD?
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] py-4 uppercase transition-all shadow-xs disabled:opacity-50"
                  >
                    {isLoading ? 'VERIFYING...' : 'LOG IN'}
                  </button>

                  {/* One-Click Quick Fill Helper */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleQuickDemo}
                      className="text-[10px] tracking-[0.2em] text-neutral-500 hover:text-black border-b border-neutral-300 pb-0.5 uppercase transition-colors"
                    >
                      FILL DEMO CLIENT DETAILS ({DEMO_USER_CREDENTIALS.email})
                    </button>
                  </div>
                </form>

                {/* Switch to Register callout */}
                <div className="pt-8 border-t border-neutral-100 text-center">
                  <span className="text-xs text-neutral-500 block mb-2">DO NOT HAVE AN ACCOUNT?</span>
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-[11px] font-semibold text-black tracking-[0.2em] uppercase border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
                  >
                    CREATE AN ACCOUNT
                  </button>
                </div>
              </motion.div>
            ) : (
              /* TAB 2: CREATE ACCOUNT (SIGN UP) */
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      placeholder="e.g. AARAV MEHTA"
                      disabled={isLoading}
                      required
                      className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black uppercase placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="name@domain.com"
                      disabled={isLoading}
                      required
                      className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black uppercase placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                      PASSWORD (MIN 6 CHARACTERS) *
                    </label>
                    <input
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="CREATE A SECURE PASSWORD"
                      disabled={isLoading}
                      required
                      minLength={6}
                      className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black placeholder:text-neutral-400"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                      TELEPHONE (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                      disabled={isLoading}
                      className="w-full bg-white border border-neutral-300 p-3 text-xs tracking-wider text-black focus:outline-none focus:border-black uppercase placeholder:text-neutral-400"
                    />
                  </div>

                  {/* Consents */}
                  <div className="space-y-2.5 pt-2 text-[11px] text-neutral-600">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newsletterOptIn}
                        onChange={(e) => setNewsletterOptIn(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 rounded-none accent-black cursor-pointer"
                      />
                      <span>I wish to receive exclusive notifications, runway invitations, and news by email.</span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 rounded-none accent-black cursor-pointer"
                        required
                      />
                      <span>I have read and understand the Privacy and Cookies Policy and accept the Purchase Conditions.</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-black hover:bg-neutral-800 text-white font-medium text-[11px] tracking-[0.2em] py-4 uppercase transition-all shadow-xs disabled:opacity-50 mt-4"
                  >
                    {isLoading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                  </button>
                </form>

                {/* Switch to Login callout */}
                <div className="pt-6 border-t border-neutral-100 text-center">
                  <span className="text-xs text-neutral-500 block mb-2">ALREADY REGISTERED?</span>
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-[11px] font-semibold text-black tracking-[0.2em] uppercase border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
                  >
                    LOG IN WITH YOUR ACCOUNT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Discreet Atelier Admin Gateway Link */}
          <div className="mt-14 pt-6 border-t border-neutral-100 text-center">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-neutral-400 hover:text-black uppercase transition-colors"
            >
              <Shield className="w-3 h-3" />
              <span>STORE ADMINISTRATOR? ACCESS ATELIER PORTAL &rarr;</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
