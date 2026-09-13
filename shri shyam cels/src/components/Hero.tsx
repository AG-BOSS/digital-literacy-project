import React from 'react';
import { Sparkles, MessageSquare, ArrowRight, CheckCircle2, Gift, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Shri Shyam Celebrations! I would like to enquire about party and celebration supplies from your website.'
    );
    window.open(`https://wa.me/919800312493?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleShopProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    onExploreClick();
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-14 md:pt-14 md:pb-20 bg-gradient-to-b from-[#071A36] via-[#0B2545] to-[#071A36]">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#C99A3E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C2185B]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Floating Balloon/Confetti Accents */}
      <div className="absolute top-12 left-6 text-3xl animate-float opacity-75 hidden sm:block pointer-events-none">🎈</div>
      <div className="absolute top-1/3 left-1/4 text-2xl animate-float-reverse opacity-60 hidden md:block pointer-events-none">✨</div>
      <div className="absolute bottom-16 left-12 text-3xl animate-float opacity-70 hidden sm:block pointer-events-none">🎉</div>
      <div className="absolute top-20 right-12 text-3xl animate-float-reverse opacity-75 hidden lg:block pointer-events-none">🎈</div>
      <div className="absolute bottom-20 right-1/4 text-2xl animate-float opacity-60 hidden md:block pointer-events-none">🍰</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            {/* Store Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0B2545] border border-[#C99A3E]/40 px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span className="text-xs font-bold tracking-wider text-[#C99A3E] uppercase">
                SHRI SHYAM CELEBRATIONS • THE PARTY STORE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-display font-extrabold text-white leading-tight tracking-tight">
              Make Every <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Celebration Special</span> 🎉
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base lg:text-lg text-[#F8F3E8]/85 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Your local celebration store for birthday decoration items, cake decorating accessories, metallic balloons, party supplies, and disposable partyware. Browse online and enquire directly on WhatsApp.
            </p>

            {/* Key Feature Quick Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 text-xs text-gray-300 pt-1">
              <span className="flex items-center gap-1.5 bg-[#071A36]/80 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" /> Cake Decor & Toppers
              </span>
              <span className="flex items-center gap-1.5 bg-[#071A36]/80 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A3E]" /> Foil Balloons & Arches
              </span>
              <span className="flex items-center gap-1.5 bg-[#071A36]/80 px-3 py-1.5 rounded-full border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#277A45]" /> Disposable Tableware
              </span>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={handleShopProducts}
                aria-label="Shop products in catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C99A3E] via-[#E5BA55] to-[#C99A3E] text-[#071A36] font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl hover:shadow-[#C99A3E]/30 transform hover:-translate-y-0.5 transition-all group active:scale-95"
              >
                <span>Shop Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsApp}
                aria-label="Enquire on WhatsApp"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0B2545] hover:bg-[#12335C] text-white border border-[#25D366]/50 hover:border-[#25D366] font-semibold text-sm sm:text-base px-7 py-4 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Enquire on WhatsApp</span>
              </button>
            </div>

            {/* Local Store Location Banner */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-[#F8F3E8]/80">
              <MapPin className="w-3.5 h-3.5 text-[#C99A3E] shrink-0" />
              <span className="text-[#C99A3E] font-bold">Store Location:</span>
              <span className="underline decoration-[#C99A3E]">Just Opposite Agarwal & Sons Grocery</span>
            </div>

          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C99A3E] via-[#C2185B] to-[#277A45] rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse-glow" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#C99A3E]/30 bg-[#071A36]">
                <img
                  src="/assets/hero_celebration.jpg"
                  alt="Shri Shyam Celebrations Party Setup"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 max-h-[440px]"
                />

                {/* Floating overlay badge 1 */}
                <div className="absolute top-4 right-4 bg-[#071A36]/90 backdrop-blur-md border border-[#C99A3E]/50 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#C2185B]/20 flex items-center justify-center text-[#C2185B]">
                    <Gift className="w-3.5 h-3.5 text-[#C2185B]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-300 uppercase font-semibold tracking-wider">Party Supplies</p>
                    <p className="text-xs font-bold text-[#C99A3E]">All-in-One Store</p>
                  </div>
                </div>

                {/* Floating overlay badge 2 */}
                <div className="absolute bottom-4 left-4 bg-[#071A36]/90 backdrop-blur-md border border-[#25D366]/50 px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                    <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-300 uppercase font-semibold">Easy Ordering</p>
                    <p className="text-xs font-bold text-white">Direct WhatsApp</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
