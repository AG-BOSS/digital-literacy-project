import React, { useState } from 'react';
import type { CelebrationType, ThemeColor, PackageTier, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { Sparkles, Check, Gift, MessageSquare, ShoppingBag, Palette, Calendar, Users } from 'lucide-react';
import confetti from 'canvas-confetti';


interface PartyBuilderProps {
  onAddMultipleToCart: (products: Product[]) => void;
}

export const PartyBuilder: React.FC<PartyBuilderProps> = ({ onAddMultipleToCart }) => {
  const [celebration, setCelebration] = useState<CelebrationType>('Birthday');
  const [theme, setTheme] = useState<ThemeColor>('Elegant Gold');
  const [packageTier, setPackageTier] = useState<PackageTier>('Deluxe Celebration Box');
  const [guestCount, setGuestCount] = useState<number>(25);

  const celebrations: CelebrationType[] = ['Birthday', 'Anniversary', 'Baby Shower', 'Engagement', 'Wedding', 'Other'];
  const themes: ThemeColor[] = ['Elegant Gold', 'Vibrant Magenta', 'Royal Blue', 'Pastel Rainbow', 'Classic White', 'Custom Theme'];
  const packages: PackageTier[] = ['Essential Party Pack', 'Deluxe Celebration Box', 'Grand VIP Setup'];

  // Recommended items dynamic calculation based on selections
  const getRecommendedProducts = (): Product[] => {
    if (packageTier === 'Essential Party Pack') {
      return PRODUCTS.filter((p) =>
        ['cake-topper-1', 'cake-candle-1', 'balloon-foil-1', 'banner-1', 'disp-plate-1', 'disp-cup-1'].includes(p.id)
      );
    } else if (packageTier === 'Deluxe Celebration Box') {
      return PRODUCTS.filter((p) =>
        [
          'cake-topper-1',
          'cake-candle-1',
          'cake-candle-3',
          'balloon-arch-1',
          'balloon-foil-1',
          'banner-1',
          'party-popper-1',
          'disp-plate-1',
          'disp-cup-1',
          'disp-napkin-1'
        ].includes(p.id)
      );
    } else {
      // Grand VIP Setup
      return PRODUCTS.filter((p) =>
        [
          'cake-topper-1',
          'cake-topper-2',
          'cake-candle-1',
          'cake-candle-3',
          'balloon-arch-1',
          'balloon-foil-1',
          'balloon-foil-2',
          'banner-1',
          'banner-2',
          'party-popper-1',
          'sash-1',
          'disp-plate-1',
          'disp-plate-2',
          'disp-cup-1',
          'disp-napkin-1',
          'disp-cutlery-1',
          'disp-table-1'
        ].includes(p.id)
      );
    }
  };


  const recommendedProducts = getRecommendedProducts();

  const handleCreatePartySet = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#C99A3E', '#C2185B', '#25D366', '#E5BA55']
    });
  };

  const handleOrderWhatsApp = () => {
    const itemNames = recommendedProducts.map((p) => `• ${p.name}`).join('\n');
    const message = `Hello Shri Shyam Celebrations! I created a customized party bundle on your website:

🎉 *Occasion:* ${celebration}
🎨 *Theme:* ${theme}
📦 *Package:* ${packageTier}
👥 *Estimated Guests:* ${guestCount}

*Included Items:*
${itemNames}

Please share the estimated price package and availability!`;

    window.open(`https://wa.me/919800312493?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="party-builder" className="py-20 bg-[#071A36] relative border-t border-[#C99A3E]/30">
      
      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#C2185B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#C99A3E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#0B2545] px-4 py-1.5 rounded-full border border-[#C99A3E]/40">
            <Gift className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>INTERACTIVE CUSTOMIZER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white">
            Build Your <span className="gold-gradient-text">Perfect Party</span> 🎈
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Design a custom celebration package in 3 quick steps! Choose your occasion, theme, and package tier to view instant recommended party items.
          </p>
        </div>

        {/* Interactive Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Controls Steps (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0B2545] border border-[#C99A3E]/30 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Step 1: Choose Celebration */}
            <div>
              <div className="flex items-center gap-2 text-[#C99A3E] font-bold text-sm uppercase tracking-wider mb-4">
                <Calendar className="w-4 h-4 text-[#C99A3E]" />
                <span>Step 1: Choose Your Celebration</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {celebrations.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCelebration(c)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border ${
                      celebration === c
                        ? 'bg-[#C99A3E] text-[#071A36] border-[#C99A3E] font-bold shadow-md scale-102'
                        : 'bg-[#071A36] text-gray-300 border-white/10 hover:border-[#C99A3E]/50'
                    }`}
                  >
                    <span>{c}</span>
                    {celebration === c && <Check className="w-4 h-4 text-[#071A36]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Theme */}
            <div>
              <div className="flex items-center gap-2 text-[#C99A3E] font-bold text-sm uppercase tracking-wider mb-4">
                <Palette className="w-4 h-4 text-[#C99A3E]" />
                <span>Step 2: Choose Your Theme</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between border ${
                      theme === t
                        ? 'bg-gradient-to-r from-[#C2185B] to-[#D81B60] text-white border-[#C2185B] font-bold shadow-md scale-102'
                        : 'bg-[#071A36] text-gray-300 border-white/10 hover:border-[#C2185B]/50'
                    }`}
                  >
                    <span>{t}</span>
                    {theme === t && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Package & Guest Count */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#C99A3E] font-bold text-sm uppercase tracking-wider">
                <Users className="w-4 h-4 text-[#C99A3E]" />
                <span>Step 3: Select Package Tier</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setPackageTier(pkg)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      packageTier === pkg
                        ? 'bg-[#071A36] border-[#C99A3E] text-white ring-2 ring-[#C99A3E]'
                        : 'bg-[#071A36]/60 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    <p className="font-bold text-sm text-[#C99A3E] mb-1">{pkg}</p>
                    <p className="text-[11px] text-gray-300">
                      {pkg === 'Essential Party Pack' ? 'Basic cake + balloon decor' : pkg === 'Deluxe Celebration Box' ? 'Complete banner, cake & table set' : 'Full venue VIP party kit'}
                    </p>
                  </button>
                ))}
              </div>

              {/* Guest Count Slider */}
              <div className="bg-[#071A36] p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center text-xs text-gray-300 mb-2">
                  <span>Estimated Guest Count:</span>
                  <span className="font-bold text-[#C99A3E] text-sm">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#C99A3E] cursor-pointer"
                />
              </div>

            </div>

            <button
              onClick={handleCreatePartySet}
              className="w-full bg-gradient-to-r from-[#C99A3E] via-[#E5BA55] to-[#C99A3E] text-[#071A36] font-extrabold py-4 px-6 rounded-2xl shadow-xl hover:shadow-[#C99A3E]/30 transition-all flex items-center justify-center gap-2 text-base"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create My Party Set</span>
            </button>

          </div>

          {/* Right Live Preview Summary (5 Columns) */}
          <div className="lg:col-span-5 bg-[#071A36] border-2 border-[#C99A3E]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-[#C99A3E] text-[#071A36] text-[10px] font-extrabold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
              Live Package Recommendation
            </div>

            <div>
              <h3 className="text-2xl font-serif-display font-bold text-white mb-2">
                Your Custom {celebration} Bundle
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-[#0B2545] text-[#C99A3E] px-3 py-1 rounded-full border border-[#C99A3E]/30">
                  Theme: {theme}
                </span>
                <span className="bg-[#0B2545] text-[#C2185B] px-3 py-1 rounded-full border border-[#C2185B]/30">
                  {packageTier}
                </span>
                <span className="bg-[#0B2545] text-[#25D366] px-3 py-1 rounded-full border border-[#25D366]/30">
                  {guestCount} Guests
                </span>
              </div>
            </div>

            {/* Included Recommended Products List */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Recommended Supplies ({recommendedProducts.length} Items):
              </p>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between bg-[#0B2545] p-3 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">{prod.name}</p>
                        <p className="text-[11px] text-[#C99A3E]">{prod.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <button
                onClick={handleOrderWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg text-sm"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Order Complete Theme Bundle on WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  onAddMultipleToCart(recommendedProducts);
                  confetti({ particleCount: 50, spread: 70, origin: { y: 0.8 } });
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#0B2545] hover:bg-[#C99A3E] text-[#C99A3E] hover:text-[#071A36] border border-[#C99A3E]/40 font-bold py-3 px-6 rounded-xl transition-all text-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add All ({recommendedProducts.length}) Items to Cart</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
