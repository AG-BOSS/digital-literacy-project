import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ShoppingBag } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#071A36] text-[#F8F3E8] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <SeoHead title="Page Not Found | Shri Shyam Celebrations" noindex={true} />

      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#C99A3E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#C2185B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="inline-flex items-center gap-2 bg-[#0B2545] border border-[#C99A3E]/40 px-3.5 py-1.5 rounded-full shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
          <span className="text-xs font-bold tracking-wider text-[#C99A3E] uppercase">
            Shri Shyam Celebrations
          </span>
        </div>

        {/* 404 Visual Heading */}
        <div className="space-y-2">
          <h1 className="text-7xl sm:text-8xl font-serif-display font-extrabold gold-gradient-text tracking-tight">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-sm mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved. Explore our celebration catalog to find party items.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] text-xs sm:text-sm font-bold shadow-lg shadow-[#C99A3E]/20 hover:brightness-105 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Store Home</span>
          </Link>
          <Link
            to="/#shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0B2545] hover:bg-[#103058] border border-[#C99A3E]/30 text-white text-xs sm:text-sm font-semibold transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-[#C99A3E]" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
