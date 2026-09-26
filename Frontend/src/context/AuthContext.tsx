import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api } from '@/lib/api';

type AuthContextType = {
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('gs_events_token'));
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { token } = await api.login(email, password);
      localStorage.setItem('gs_events_token', token);
      setIsAdmin(true);
      return { error: null };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'Unable to sign in' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('gs_events_token');
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
