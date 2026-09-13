import React from 'react';
import { ArrowRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';


export const FestiveBanner: React.FC = () => {
  const handleBannerClick = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C99A3E', '#C2185B', '#25D366']
    });

    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#071A36] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B2545] via-[#13325B] to-[#0B2545] border-2 border-[#C99A3E]/40 p-8 sm:p-12 shadow-2xl">
          
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#C99A3E]/10 rounded-br-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#C2185B]/10 rounded-tl-full blur-xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#071A36] text-[#C99A3E] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#C99A3E]/30 uppercase tracking-widest">
                <Gift className="w-3.5 h-3.5 text-[#C99A3E]" />
                <span>LIMITED CELEBRATION PACKAGES AVAILABLE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-extrabold text-white">
                Planning a <span className="gold-gradient-text">Celebration?</span> 🎉
              </h2>

              <p className="text-base sm:text-lg text-gray-300">
                Get all your party essentials in one place – cakes, balloons, decorations, and eco disposables!
              </p>
            </div>

            <div>
              <button
                onClick={handleBannerClick}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#C99A3E] via-[#E5BA55] to-[#C99A3E] text-[#071A36] font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-[#C99A3E]/40 transform hover:scale-105 transition-all group"
              >
                <span>Explore Party Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
