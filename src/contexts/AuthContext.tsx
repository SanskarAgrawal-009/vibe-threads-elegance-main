import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS, DEMO_USER_CREDENTIALS } from '@/constants/auth';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
  phone?: string;
  createdAt?: string;
}

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone?: string;
  role: 'user';
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (userData: any) => Promise<void>;
  loginCustomer: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  registerCustomer: (name: string, email: string, password: string, phone?: string) => Promise<{ success: boolean; message: string }>;
  loginAdmin: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'elegance_registered_users';
const CURRENT_USER_KEY = 'elegance_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY) || localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize demo user in registered users list if empty
  useEffect(() => {
    try {
      const existing = localStorage.getItem(USERS_STORAGE_KEY);
      if (!existing) {
        const initialUsers: StoredAccount[] = [
          {
            id: 'usr_demo_1',
            name: DEMO_USER_CREDENTIALS.name,
            email: DEMO_USER_CREDENTIALS.email.toLowerCase(),
            passwordHash: DEMO_USER_CREDENTIALS.password,
            phone: '+91 98765 43210',
            role: 'user',
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
      }
    } catch (e) {
      console.error('Error initializing demo accounts', e);
    }
  }, []);

  const persistUser = (userData: AuthUser | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData)); // backward compatibility
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
      localStorage.removeItem('user');
    }
  };

  // 1. Customer Registration
  const registerCustomer = async (name: string, email: string, password: string, phone?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const accountsJson = localStorage.getItem(USERS_STORAGE_KEY);
      const accounts: StoredAccount[] = accountsJson ? JSON.parse(accountsJson) : [];

      // Check if email already exists
      const existing = accounts.find((a) => a.email.toLowerCase() === cleanEmail);
      if (existing) {
        setIsLoading(false);
        return { success: false, message: 'An account with this email address already exists. Please log in.' };
      }

      const newAccount: StoredAccount = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: cleanEmail,
        passwordHash: password,
        phone: phone?.trim(),
        role: 'user',
        createdAt: new Date().toISOString()
      };

      accounts.push(newAccount);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(accounts));

      const authUser: AuthUser = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        role: 'user',
        isAuthenticated: true,
        phone: newAccount.phone,
        createdAt: newAccount.createdAt
      };

      persistUser(authUser);
      setIsLoading(false);
      return { success: true, message: `Account created successfully. Welcome, ${name}!` };
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Registration failed');
      return { success: false, message: 'Unable to create account. Please try again.' };
    }
  };

  // 2. Customer Login
  const loginCustomer = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const accountsJson = localStorage.getItem(USERS_STORAGE_KEY);
      const accounts: StoredAccount[] = accountsJson ? JSON.parse(accountsJson) : [];

      const found = accounts.find((a) => a.email.toLowerCase() === cleanEmail && a.passwordHash === password);

      if (found) {
        const authUser: AuthUser = {
          id: found.id,
          name: found.name,
          email: found.email,
          role: 'user',
          isAuthenticated: true,
          phone: found.phone,
          createdAt: found.createdAt
        };

        persistUser(authUser);
        setIsLoading(false);
        return { success: true, message: `Welcome back, ${found.name}!` };
      }

      // Check if it's the demo account
      if (cleanEmail === DEMO_USER_CREDENTIALS.email.toLowerCase() && password === DEMO_USER_CREDENTIALS.password) {
        const authUser: AuthUser = {
          id: 'usr_demo_1',
          name: DEMO_USER_CREDENTIALS.name,
          email: DEMO_USER_CREDENTIALS.email,
          role: 'user',
          isAuthenticated: true,
          phone: '+91 98765 43210'
        };

        persistUser(authUser);
        setIsLoading(false);
        return { success: true, message: `Welcome back, ${DEMO_USER_CREDENTIALS.name}!` };
      }

      setIsLoading(false);
      return { success: false, message: 'Invalid email address or password. Please verify your credentials.' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: 'Authentication error. Please try again.' };
    }
  };

  // 3. Admin Login (Separate System)
  const loginAdmin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();

      // Check against admin credentials
      if (
        (cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() && password === ADMIN_CREDENTIALS.password) ||
        (cleanEmail === 'trendvibes@tvibes.com' && password === 'admin1234') // legacy support
      ) {
        const adminUser: AuthUser = {
          id: 'adm_master',
          name: 'Atelier Director',
          email: cleanEmail,
          role: 'admin',
          isAuthenticated: true
        };

        persistUser(adminUser);
        setIsLoading(false);
        return { success: true, message: 'Atelier Administrator authenticated.' };
      }

      setIsLoading(false);
      return { success: false, message: 'Access Denied: Invalid Atelier security credentials.' };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: 'Administrative authentication failed.' };
    }
  };

  // Backward compatible login
  const login = async (userData: any) => {
    persistUser({
      id: userData.id || 'usr_' + Date.now(),
      name: userData.name || userData.email.split('@')[0],
      email: userData.email,
      role: userData.role || 'user',
      isAuthenticated: true
    });
  };

  const logout = () => {
    persistUser(null);
  };

  const isAuthenticated = Boolean(user && user.isAuthenticated);
  const isAdmin = Boolean(user && user.isAuthenticated && user.role === 'admin');

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isLoading,
        error,
        login,
        loginCustomer,
        registerCustomer,
        loginAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
