import React from 'react';
import { MapPin, Phone, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#071A36] via-[#0B2545] to-[#071A36] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Store Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#C99A3E]/30 shadow-2xl group">
              <img
                src="/assets/about_store.jpg"
                alt="Shri Shyam Celebrations Local Store"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A36] via-transparent to-transparent opacity-60" />
              
              {/* Location Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#071A36]/90 backdrop-blur-md border border-[#C99A3E]/40 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C99A3E]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#C99A3E]" />
                </div>
                <div>
                  <p className="text-xs text-gray-300 font-semibold uppercase tracking-wider">Store Location</p>
                  <p className="text-sm font-bold text-white">Just Opposite Agarwal & Sons Grocery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-4 py-1.5 rounded-full border border-[#C99A3E]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span>ABOUT OUR SHOP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white leading-tight">
              Your Local <br />
              <span className="gold-gradient-text">Celebration Store</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Shri Shyam Celebrations – The Party Store is your destination for celebration essentials, party decorations and disposable party supplies. From birthdays to special occasions, we help you find the little details that make every celebration memorable.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                <span>One-stop shop for cakes, candles, balloons & party decor</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#C99A3E] shrink-0" />
                <span>Complete eco-friendly disposable tableware sets</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-[#C2185B] shrink-0" />
                <span>Friendly local service with instant WhatsApp assistance</span>
              </div>
            </div>

            {/* Contact Quick Action */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="tel:9800312493"
                className="inline-flex items-center gap-2 bg-[#0B2545] hover:bg-[#13325B] text-white border border-[#C99A3E]/40 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4 text-[#C99A3E]" />
                <span>Call 9800312493</span>
              </a>

              <a
                href="https://wa.me/918927688237"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp 8927688237</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
