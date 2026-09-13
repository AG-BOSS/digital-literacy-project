import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, MessageSquare, Sparkles } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSearchChange,
  searchQuery
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Categories', href: '#categories' },
    { name: 'Featured', href: '#featured' },
    { name: 'Themes', href: '#themes' },
    { name: 'Shop', href: '#shop' },
    { name: 'Location', href: '#location' },
  ];

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Hello Shri Shyam Celebrations! I would like to enquire about party supplies for an upcoming celebration.');
    window.open(`https://wa.me/919800312493?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#071A36]/90 backdrop-blur-md border-b border-[#C99A3E]/30 transition-all duration-300">
      {/* Top Banner Announcement */}
      <div className="bg-gradient-to-r from-[#071A36] via-[#C99A3E]/20 to-[#071A36] text-[#F8F3E8] text-xs py-1.5 px-4 text-center border-b border-[#C99A3E]/20 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#C99A3E] font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#C99A3E] animate-pulse" />
          <span>EVERY CELEBRATION MADE SPECIAL</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#F8F3E8]/80">
          <span>📍 Just Opposite Agarwal & Sons Grocery</span>
          <a href="tel:9800312493" className="hover:text-[#C99A3E] transition-colors flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#C99A3E]" /> 9800312493
          </a>
          <a href="tel:8927688237" className="hover:text-[#C99A3E] transition-colors flex items-center gap-1">
            <Phone className="w-3 h-3 text-[#C99A3E]" /> 8927688237
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Brand Logo & Title */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#C99A3E] via-[#C2185B] to-[#C99A3E] shadow-md group-hover:scale-105 transition-transform">
              <img 
                src="/assets/logo_banner.jpg" 
                alt="Shri Shyam Celebrations Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif-display text-lg sm:text-xl font-bold tracking-wide text-white group-hover:text-[#C99A3E] transition-colors">
                SHRI SHYAM CELEBRATIONS
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#C99A3E] uppercase flex items-center gap-1">
                THE PARTY STORE <span className="text-[#C2185B]">🎉</span>
              </span>
            </div>
          </a>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#F8F3E8]/90 hover:text-[#C99A3E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#C99A3E] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Controls: Search, WhatsApp, Cart & Mobile Menu */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Inline Search Bar or Icon */}
            {showSearchInput ? (
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search party items..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="bg-[#0B2545] border border-[#C99A3E]/40 text-xs sm:text-sm text-white rounded-full py-1.5 pl-9 pr-8 focus:outline-none focus:border-[#C99A3E] w-36 sm:w-48 transition-all"
                  autoFocus
                />
                <Search className="w-4 h-4 text-[#C99A3E] absolute left-3" />
                <button
                  onClick={() => {
                    setShowSearchInput(false);
                    onSearchChange('');
                  }}
                  className="absolute right-2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                className="p-2 text-[#F8F3E8] hover:text-[#C99A3E] hover:bg-[#0B2545] rounded-full transition-colors"
                title="Search party items"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* WhatsApp Quick Direct Button */}
            <button
              onClick={handleWhatsAppDirect}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0e7569] text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              aria-label={`Open enquiry cart (${cartCount} items)`}
              className="relative flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 text-[#F8F3E8] bg-[#0B2545] hover:bg-[#C99A3E]/20 border border-[#C99A3E]/40 rounded-full transition-all group focus:outline-none focus:ring-2 focus:ring-[#C99A3E]"
              title="Enquiry Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-[#C99A3E] group-hover:scale-105 transition-transform" />
              <span className="text-xs font-bold text-white group-hover:text-[#C99A3E] transition-colors">
                {cartCount}
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2185B] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C2185B]"></span>
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F8F3E8] hover:text-[#C99A3E] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071A36] border-b border-[#C99A3E]/30 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-white hover:text-[#C99A3E] py-2 border-b border-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleWhatsAppDirect();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-2.5 rounded-lg text-sm shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Ordering: 9800312493</span>
            </button>
            <div className="text-xs text-center text-gray-300 flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span>Call: 9800312493 / 8927688237</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
