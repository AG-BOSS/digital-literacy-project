import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AdminAuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  checkAdminStatus: (currentUser: User | null) => Promise<boolean>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkAdminStatus = async (currentUser: User | null): Promise<boolean> => {
    if (!currentUser || !isSupabaseConfigured()) {
      setIsAdmin(false);
      return false;
    }

    try {
      // Query admin_users table for user_id or email
      const userEmail = currentUser.email?.toLowerCase();
      const { data, error: queryError } = await (supabase.from('admin_users') as any)
        .select('role')
        .or(`user_id.eq.${currentUser.id},email.eq.${userEmail}`)
        .maybeSingle();

      if (queryError) {
        console.warn('Admin check warning:', queryError.message);
        setIsAdmin(false);
        return false;
      }

      const verified = Boolean(data && data.role === 'admin');
      setIsAdmin(verified);
      return verified;
    } catch (err) {
      console.error('Failed to verify admin status:', err);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    let mounted = true;

    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Check current session
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      if (!mounted) return;
      setSession(currentSession);
      const currentUser = currentSession?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser);
      }
      setLoading(false);
    });

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      const currentUser = newSession?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await checkAdminStatus(currentUser);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured()) {
      const msg = 'Supabase credentials are not configured in .env';
      setError(msg);
      return { success: false, error: msg };
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: pass
      });

      if (authError || !data.user) {
        const msg = authError?.message || 'Invalid email or password.';
        setError(msg);
        return { success: false, error: msg };
      }

      // Verify whether this user is an admin
      const hasAdminRole = await checkAdminStatus(data.user);
      if (!hasAdminRole) {
        // User is authenticated in Supabase but not listed as admin
        await supabase.auth.signOut();
        const msg = 'Access Denied: This account is not registered as an authorized store administrator.';
        setError(msg);
        return { success: false, error: msg };
      }

      setUser(data.user);
      setSession(data.session);
      setIsAdmin(true);
      return { success: true };
    } catch (err: any) {
      const msg = err.message || 'An unexpected error occurred during login.';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured()) {
        await supabase.auth.signOut();
      }
    } finally {
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setError(null);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        loading,
        error,
        signIn,
        signOut,
        checkAdminStatus
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
