import React from 'react';
import { Phone, MapPin, Sparkles, MessageSquare, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onSelectCategoryFilter?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategoryFilter }) => {
  const { openCart, totalItems } = useCart();

  const handleCategoryNav = (cat: string) => {
    if (onSelectCategoryFilter) {
      onSelectCategoryFilter(cat);
    }
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#040E1E] border-t border-[#C99A3E]/30 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo_banner.jpg"
                alt="Shri Shyam Celebrations Logo"
                className="w-12 h-12 rounded-full border-2 border-[#C99A3E] object-cover"
              />
              <div>
                <h3 className="font-serif-display font-bold text-xl text-white tracking-wide">
                  SHRI SHYAM CELEBRATIONS
                </h3>
                <p className="text-xs font-semibold text-[#C99A3E] uppercase tracking-widest">
                  THE PARTY STORE 🎉
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Your one-stop local celebration destination for birthday decoration items, cake toppers, balloons, and disposable tableware.
            </p>

            <div className="inline-flex items-center gap-2 bg-[#0B2545] border border-[#C99A3E]/30 px-3.5 py-1.5 rounded-full text-xs text-[#C99A3E] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Every Celebration Made Special</span>
            </div>
          </div>

          {/* Quick Links (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-display font-bold text-base text-[#C99A3E] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#hero" className="hover:text-[#C99A3E] transition-colors">Home</a></li>
              <li><a href="#shop" className="hover:text-[#C99A3E] transition-colors">Shop Catalog</a></li>
              <li>
                <button
                  onClick={openCart}
                  aria-label="Open enquiry cart"
                  className="hover:text-[#C99A3E] transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C99A3E]" />
                  <span>Enquiry Cart ({totalItems})</span>
                </button>
              </li>
              <li><a href="#categories" className="hover:text-[#C99A3E] transition-colors">Departments</a></li>
              <li><a href="#themes" className="hover:text-[#C99A3E] transition-colors">Party Themes</a></li>
              <li><a href="#location" className="hover:text-[#C99A3E] transition-colors">Store Location</a></li>
            </ul>
          </div>

          {/* Product Categories (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-display font-bold text-base text-[#C99A3E] uppercase tracking-wider">
              Departments
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button
                  onClick={() => handleCategoryNav('Cake Items')}
                  className="hover:text-[#C99A3E] transition-colors text-left"
                >
                  🍰 Cake Items & Candles
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Birthday & Party Items')}
                  className="hover:text-[#C99A3E] transition-colors text-left"
                >
                  🎈 Birthday & Party Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryNav('Disposable Items')}
                  className="hover:text-[#C99A3E] transition-colors text-left"
                >
                  🍽️ Disposable Partyware
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 Columns) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-display font-bold text-base text-[#C99A3E] uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C99A3E] shrink-0 mt-1" />
                <span>Just Opposite Agarwal & Sons Grocery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C99A3E] shrink-0" />
                <div className="flex gap-2">
                  <a href="tel:9800312493" className="hover:text-[#C99A3E]">9800312493</a>
                  <span>/</span>
                  <a href="tel:8927688237" className="hover:text-[#C99A3E]">8927688237</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919800312493"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#25D366] hover:underline font-semibold"
                >
                  WhatsApp Support (9800312493)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>© 2026 Shri Shyam Celebrations. Every Celebration Made Special.</p>
          <p className="flex items-center justify-center gap-1 text-gray-400">
            Crafted for <Heart className="w-3.5 h-3.5 text-[#C2185B] fill-[#C2185B]" /> Local Party Celebrations
          </p>
        </div>

      </div>
    </footer>
  );
};
