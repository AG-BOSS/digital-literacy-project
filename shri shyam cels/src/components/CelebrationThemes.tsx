import React from 'react';
import type { Product } from '../types';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

interface CelebrationThemesProps {
  products: Product[];
  onSelectFilter: (mainCategory: string, subCategory: string) => void;
}

export const CelebrationThemes: React.FC<CelebrationThemesProps> = ({
  products,
  onSelectFilter
}) => {
  // Compute dynamic counts from live products for existing subcategories
  const themes = [
    {
      id: 'birthday-themes',
      title: 'Birthday Themes & Kits',
      badge: 'POPULAR THEMES',
      icon: '👑',
      mainCategory: 'Birthday & Party Items',
      subCategory: 'Birthday Themes',
      description: 'Themed celebration sets, cartoon character decor, and milestone celebration packs.',
      count: products.filter((p) => p.subCategory === 'Birthday Themes').length,
      gradient: 'from-[#0B2545] to-[#12315E]',
      borderHover: 'hover:border-[#C99A3E]/70',
      accentColor: '#C99A3E'
    },
    {
      id: 'balloons',
      title: 'Balloons & Foil Arches',
      badge: 'ESSENTIALS',
      icon: '🎈',
      mainCategory: 'Birthday & Party Items',
      subCategory: 'Balloons',
      description: 'Metallic chrome balloons, numeric foils, arch garland kits, and shiny foil sets.',
      count: products.filter((p) => p.subCategory === 'Balloons' || p.subCategory === 'Foil Balloons' || p.subCategory === 'Balloon Arch Kits').length,
      gradient: 'from-[#0B2545] to-[#1E254A]',
      borderHover: 'hover:border-[#C2185B]/70',
      accentColor: '#C2185B'
    },
    {
      id: 'banners',
      title: 'Banners & Backdrops',
      badge: 'DECORATIONS',
      icon: '🎉',
      mainCategory: 'Birthday & Party Items',
      subCategory: 'Banners & Backdrops',
      description: 'Sparkling Happy Birthday banners, celebratory bunting, and metallic photo backdrops.',
      count: products.filter((p) => p.subCategory === 'Banners & Backdrops').length,
      gradient: 'from-[#0B2545] to-[#14324F]',
      borderHover: 'hover:border-[#E5BA55]/70',
      accentColor: '#E5BA55'
    },
    {
      id: 'cake-decor',
      title: 'Cake Toppers & Candles',
      badge: 'CAKE ESSENTIALS',
      icon: '🍰',
      mainCategory: 'Cake Items',
      subCategory: 'Cake Toppers',
      description: 'Acrylic golden toppers, sparkling number candles, and revolving turntable stands.',
      count: products.filter((p) => p.mainCategory === 'Cake Items').length,
      gradient: 'from-[#0B2545] to-[#1B2D4A]',
      borderHover: 'hover:border-[#C99A3E]/70',
      accentColor: '#C99A3E'
    },
    {
      id: 'party-acc',
      title: 'Party Accessories & Favors',
      badge: 'FUN ACCESSORIES',
      icon: '🥳',
      mainCategory: 'Birthday & Party Items',
      subCategory: 'Party Accessories',
      description: 'Party poppers, birthday sashes, celebration hats, event prop stands, and giveaways.',
      count: products.filter((p) => p.subCategory === 'Party Accessories' || p.subCategory === 'Party Favors' || p.subCategory === 'Stands & Props' || p.subCategory === 'Party Confetti').length,
      gradient: 'from-[#0B2545] to-[#1E2B45]',
      borderHover: 'hover:border-[#25D366]/70',
      accentColor: '#25D366'
    },
    {
      id: 'disposables',
      title: 'Disposable Partyware',
      badge: 'CLEAN & STYLISH',
      icon: '🍽️',
      mainCategory: 'Disposable Items',
      subCategory: 'All',
      description: 'Metallic party plates, printed cups, soft paper napkins, cutlery, and table covers.',
      count: products.filter((p) => p.mainCategory === 'Disposable Items').length,
      gradient: 'from-[#0B2545] to-[#0E3535]',
      borderHover: 'hover:border-[#277A45]/70',
      accentColor: '#277A45'
    }
  ];

  const handleThemeClick = (mainCat: string, subCat: string) => {
    onSelectFilter(mainCat, subCat);
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="themes" className="py-16 sm:py-20 bg-[#051329] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-4 py-1.5 rounded-full border border-[#C99A3E]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>DISCOVER BY THEME</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white tracking-tight">
            Celebration <span className="gold-gradient-text">Themes & Decor</span>
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Find the right vibe for your event. Tap any theme collection to explore matching balloons, cake toppers, banners, and accessories.
          </p>
        </div>

        {/* 6 Themed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeClick(theme.mainCategory, theme.subCategory)}
              className={`group p-6 sm:p-7 rounded-3xl bg-gradient-to-br ${theme.gradient} border border-white/10 ${theme.borderHover} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden`}
            >
              {/* Subtle background glow */}
              <div
                className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
                style={{ backgroundColor: theme.accentColor }}
              />

              <div className="space-y-4 relative z-10">
                {/* Header row: Icon & Tag */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#071A36]/80 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {theme.icon}
                  </div>

                  <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md bg-[#071A36]/90 border border-white/10 text-gray-300 uppercase">
                    {theme.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-serif-display font-bold text-white group-hover:text-[#C99A3E] transition-colors">
                    {theme.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Live count and CTA */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Layers className="w-3.5 h-3.5 text-[#C99A3E]" />
                  <span>{theme.count} Products</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-[#C99A3E] group-hover:text-white transition-colors">
                  <span>Browse Theme</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
