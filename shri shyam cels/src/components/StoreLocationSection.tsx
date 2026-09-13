import React from 'react';
import { MapPin, Phone, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export const StoreLocationSection: React.FC = () => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shri Shyam Celebrations!\n\nI would like to enquire about visiting your local store opposite Agarwal & Sons Grocery.'
    );
    window.open(`https://wa.me/919800312493?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-16 sm:py-20 bg-gradient-to-b from-[#071A36] via-[#0B2545] to-[#071A36] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left: Store Image & Location Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#C99A3E]/30 shadow-2xl group bg-[#071A36]">
              <img
                src="/assets/about_store.jpg"
                alt="Shri Shyam Celebrations Store Front"
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 max-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A36] via-transparent to-transparent opacity-70" />
              
              {/* Location Badge Box */}
              <div className="absolute bottom-5 left-5 right-5 bg-[#071A36]/90 backdrop-blur-md border border-[#C99A3E]/40 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C99A3E]/20 border border-[#C99A3E]/40 flex items-center justify-center shrink-0 text-[#C99A3E]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-gray-300 font-semibold uppercase tracking-wider">Store Location</p>
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    Just Opposite Agarwal & Sons Grocery
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text & Action Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-4 py-1.5 rounded-full border border-[#C99A3E]/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span>LOCAL STORE PICKUP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white leading-tight tracking-tight">
              Visit Shri Shyam <br />
              <span className="gold-gradient-text">Celebrations</span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Browse online and enquire with us on WhatsApp, or visit our local store to explore party decorations, balloons, cake toppers, and disposables in person.
            </p>

            {/* Service Highlights */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Store pickup and local event assistance</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#C99A3E] shrink-0" />
                <span>One-stop catalog: cakes, candles, balloons & tableware</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 className="w-4 h-4 text-[#C2185B] shrink-0" />
                <span>Fast enquiry response & stock confirmation on WhatsApp</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsApp}
                aria-label="Enquire with Shri Shyam Celebrations on WhatsApp"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Enquire on WhatsApp</span>
              </button>

              <a
                href="tel:9800312493"
                aria-label="Call Shri Shyam Celebrations"
                className="inline-flex items-center gap-2 bg-[#0B2545] hover:bg-[#12335C] text-white border border-[#C99A3E]/40 font-semibold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-[#C99A3E]" />
                <span>Call: 9800312493</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
