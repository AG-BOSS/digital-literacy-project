import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071A36] text-[#F8F3E8] flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C99A3E]/20 to-[#0A2540] border border-[#C99A3E]/30 flex items-center justify-center mb-6 shadow-xl shadow-black/40">
          <Loader2 className="w-8 h-8 text-[#C99A3E] animate-spin" />
        </div>
        <h2 className="text-xl font-bold tracking-wide text-white">Verifying Admin Access</h2>
        <p className="text-white/60 text-sm mt-2">Checking Shri Shyam Celebrations credentials...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
