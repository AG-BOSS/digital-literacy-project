import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Layers,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Store,
  Sparkles
} from 'lucide-react';
import { SeoHead } from '../SeoHead';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'All Products', icon: Package, end: true },
    { to: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
    { to: '/admin/categories', label: 'Categories', icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-[#051329] text-[#F8F3E8] flex flex-col md:flex-row antialiased font-sans">
      <SeoHead title="Store Management | Shri Shyam Celebrations" noindex={true} />
      {/* Mobile Topbar */}
      <header className="md:hidden bg-[#071A36] border-b border-[#C99A3E]/20 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C99A3E] to-[#B3832B] flex items-center justify-center text-[#071A36] font-bold text-sm shadow">
            SS
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider text-white uppercase">Shri Shyam</h1>
            <p className="text-[10px] text-[#C99A3E] font-medium tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-[#0A2540] border border-[#C99A3E]/30 text-[#C99A3E]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-40 w-64 bg-[#071A36] border-r border-[#C99A3E]/20 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#C99A3E]/15">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C99A3E] to-[#A27221] flex items-center justify-center text-[#071A36] font-extrabold text-base shadow-lg shadow-[#C99A3E]/20">
              SS
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-wider text-white uppercase leading-tight">
                Shri Shyam
              </h2>
              <span className="text-[11px] font-semibold text-[#C99A3E] tracking-widest uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 inline" /> Party Store
              </span>
            </div>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#277A45]/20 border border-[#277A45]/40 text-[#4ade80] text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Verified</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] shadow-md shadow-[#C99A3E]/20 font-bold'
                      : 'text-white/70 hover:text-white hover:bg-[#0A2540] border border-transparent hover:border-[#C99A3E]/20'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-4 border-t border-[#C99A3E]/15">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-[#0A2540] border border-transparent hover:border-[#C99A3E]/20 transition-all"
            >
              <div className="flex items-center gap-3">
                <Store className="w-4 h-4 text-[#C99A3E]" />
                <span>View Store</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-white/40" />
            </Link>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#C99A3E]/15 bg-[#06162D]">
          <div className="mb-3 px-2">
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Logged in as</p>
            <p className="text-xs text-[#F8F3E8] font-medium truncate mt-0.5" title={user?.email || ''}>
              {user?.email || 'admin'}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-60px)] md:min-h-screen flex flex-col">
        <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
