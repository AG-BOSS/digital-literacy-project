import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';

export const AdminLogin: React.FC = () => {
  const { signIn, isAdmin, user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already logged in and verified as admin, redirect to /admin
  useEffect(() => {
    if (user && isAdmin) {
      const origin = (location.state as any)?.from?.pathname || '/admin';
      navigate(origin, { replace: true });
    }
  }, [user, isAdmin, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your admin email and password.');
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
    } else {
      const destination = (location.state as any)?.from?.pathname || '/admin';
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#051329] flex flex-col justify-center items-center p-4 sm:p-6 relative antialiased font-sans selection:bg-[#C99A3E] selection:text-[#071A36]">
      <SeoHead title="Admin Login | Shri Shyam Celebrations" noindex={true} />
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C99A3E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C2185B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to Store link */}
      <div className="w-full max-w-md mb-6 flex justify-start">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-white/60 hover:text-[#C99A3E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Store Catalog</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#071A36] border border-[#C99A3E]/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 relative overflow-hidden">
        {/* Top Gold Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C99A3E] via-[#F8F3E8] to-[#C99A3E]" />

        {/* Card Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C99A3E] to-[#996F1C] flex items-center justify-center text-[#071A36] font-black text-xl mx-auto mb-4 shadow-xl shadow-[#C99A3E]/20">
            SS
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C99A3E]/15 border border-[#C99A3E]/30 text-[#C99A3E] text-xs font-semibold uppercase tracking-widest mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Store Admin Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Shri Shyam Celebrations
          </h1>
          <p className="text-white/60 text-xs mt-1">
            Sign in with authorized administrator credentials
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shrishyamcelebrations.com"
                className="w-full pl-10 pr-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] focus:ring-1 focus:ring-[#C99A3E] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-11 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] focus:ring-1 focus:ring-[#C99A3E] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-[#071A36] bg-gradient-to-r from-[#C99A3E] via-[#D8AD52] to-[#B3832B] hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none transition-all shadow-lg shadow-[#C99A3E]/20 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#071A36]" />
                <span>Verifying Access...</span>
              </>
            ) : (
              <span>Sign In to Admin Console</span>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-[#C99A3E]/15 text-center">
          <p className="text-[11px] text-white/40 leading-relaxed">
            Restricted small-business console. Only verified emails registered in the database <code className="text-[#C99A3E]">admin_users</code> table are granted access.
          </p>
        </div>
      </div>
    </div>
  );
};
