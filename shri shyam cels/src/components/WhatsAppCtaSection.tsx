import React from 'react';
import { MessageSquare, ArrowRight, ShoppingBag, Sparkles, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const WhatsAppCtaSection: React.FC = () => {
  const { totalItems, openCart } = useCart();

  const handleGeneralWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shri Shyam Celebrations!\n\nI need help choosing celebration and party supplies for an upcoming event. Could you please assist me with recommendations and availability?'
    );
    window.open(`https://wa.me/919800312493?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#071A36] via-[#0B2545] to-[#071A36] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-[#0B2545] border border-[#C99A3E]/30 p-8 sm:p-12 shadow-2xl text-center overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#C99A3E]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            
            <div className="inline-flex items-center gap-2 text-[#25D366] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-4 py-1.5 rounded-full border border-[#25D366]/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#25D366]" />
              <span>DIRECT STORE ASSISTANCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-tight leading-tight">
              Need Help Choosing <br />
              <span className="gold-gradient-text">Something Special?</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Send us your requirement on WhatsApp and we’ll help you find the right balloons, banners, cake toppers, and disposables for your celebration.
            </p>

            {/* Cart Status Notice if items present */}
            {totalItems > 0 && (
              <div className="inline-flex items-center gap-2 bg-[#071A36]/90 border border-[#C99A3E]/40 px-4 py-2 rounded-2xl text-xs sm:text-sm text-[#C99A3E]">
                <ShoppingBag className="w-4 h-4 text-[#C99A3E]" />
                <span>
                  You have <strong className="text-white font-bold">{totalItems} items</strong> in your enquiry cart ready to review.
                </span>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {totalItems > 0 && (
                <button
                  onClick={openCart}
                  aria-label={`Open enquiry cart with ${totalItems} items`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C99A3E] hover:bg-[#E5BA55] text-[#071A36] font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Review Enquiry Cart ({totalItems})</span>
                </button>
              )}

              <button
                onClick={handleGeneralWhatsApp}
                aria-label="Chat directly on WhatsApp with Shri Shyam Celebrations"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (9800312493)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Store Location & Phone footnote */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 border-t border-white/10">
              <span className="flex items-center gap-1 text-[#F8F3E8]/80">
                📍 Opposite Agarwal & Sons Grocery
              </span>
              <span>•</span>
              <a href="tel:9800312493" className="hover:text-[#C99A3E] transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#C99A3E]" /> Call 9800312493
              </a>
              <span>•</span>
              <a href="tel:8927688237" className="hover:text-[#C99A3E] transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#C99A3E]" /> Call 8927688237
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
