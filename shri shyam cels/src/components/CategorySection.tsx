import React from 'react';
import type { Product } from '../types';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

interface CategorySectionProps {
  products: Product[];
  onSelectCategoryFilter: (category: string) => void;
  onSelectSubCategoryFilter?: (subcategory: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  products,
  onSelectCategoryFilter,
  onSelectSubCategoryFilter
}) => {
  // Compute dynamic live counts from products prop
  const cakeCount = products.filter((p) => p.mainCategory === 'Cake Items').length;
  const partyCount = products.filter((p) => p.mainCategory === 'Birthday & Party Items').length;
  const disposableCount = products.filter((p) => p.mainCategory === 'Disposable Items').length;

  const categories = [
    {
      id: 'cat-cake',
      title: 'Cake Items',
      mainCategory: 'Cake Items',
      count: cakeCount,
      icon: '🍰',
      description: 'Acrylic cake toppers, metallic candles, rotating turntable stands, and pastry decorating tools.',
      image: '/assets/category_cakes.jpg',
      badgeColor: 'from-[#C99A3E] to-[#E5BA55]',
      borderGlow: 'hover:border-[#C99A3E]/60',
      subcategories: ['Cake Toppers', 'Candles', 'Cake Accessories']
    },
    {
      id: 'cat-party',
      title: 'Birthday & Party Items',
      mainCategory: 'Birthday & Party Items',
      count: partyCount,
      icon: '🎈',
      description: 'Foil balloon sets, milestone arches, sparkling banners, theme party kits, and celebratory accessories.',
      image: '/assets/category_balloons.jpg',
      badgeColor: 'from-[#C2185B] to-[#E91E63]',
      borderGlow: 'hover:border-[#C2185B]/60',
      subcategories: ['Birthday Themes', 'Balloons', 'Banners & Backdrops', 'Party Confetti', 'Party Accessories']
    },
    {
      id: 'cat-disp',
      title: 'Disposable Items',
      mainCategory: 'Disposable Items',
      count: disposableCount,
      icon: '🍽️',
      description: 'Eco-friendly metallic party plates, printed paper cups, designer napkins, cutlery, and table covers.',
      image: '/assets/category_disposables.jpg',
      badgeColor: 'from-[#277A45] to-[#25D366]',
      borderGlow: 'hover:border-[#25D366]/60',
      subcategories: ['Plates & Bowls', 'Cups & Drinkware', 'Napkins & Tissues', 'Table Covers']
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    onSelectCategoryFilter(categoryName);
    if (onSelectSubCategoryFilter) onSelectSubCategoryFilter('All');
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubCategoryClick = (categoryName: string, subName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectCategoryFilter(categoryName);
    if (onSelectSubCategoryFilter) onSelectSubCategoryFilter(subName);
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16 sm:py-20 bg-[#071A36] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#0B2545] px-4 py-1.5 rounded-full border border-[#C99A3E]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>SHOP BY DEPARTMENT</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white tracking-tight">
            Everything for <span className="gold-gradient-text">Your Celebration</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Browse our store catalog across the 3 core departments: cake decorating, party balloons & themes, and disposable tableware.
          </p>
        </div>

        {/* Categories 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.mainCategory)}
              className={`group relative rounded-3xl bg-[#0B2545] border border-[#C99A3E]/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${cat.borderGlow}`}
            >
              
              {/* Category Image Header */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-[#051329]">
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545] via-[#0B2545]/40 to-transparent" />
                
                {/* Department Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#071A36]/90 backdrop-blur-md border border-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.title}</span>
                  </span>
                </div>

                {/* Dynamic Live Count Badge */}
                <div className="absolute top-4 right-4 bg-[#C99A3E] text-[#071A36] font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  <span>{cat.count} Items</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-white group-hover:text-[#C99A3E] transition-colors">
                      {cat.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Subcategories Pills */}
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-[11px] font-semibold text-[#C99A3E] uppercase tracking-wider mb-2">
                      Popular Categories:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={(e) => handleSubCategoryClick(cat.mainCategory, sub, e)}
                          aria-label={`View ${sub} in catalog`}
                          className="bg-[#071A36] hover:bg-[#C99A3E] text-gray-200 hover:text-[#071A36] text-[11px] font-medium px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Explore Collection Button */}
                <button
                  onClick={() => handleCategoryClick(cat.mainCategory)}
                  aria-label={`Explore ${cat.title} in catalog`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#071A36] group-hover:bg-[#C99A3E] text-white group-hover:text-[#071A36] border border-[#C99A3E]/40 font-bold text-xs sm:text-sm py-3 px-5 rounded-xl transition-all duration-300 shadow-md"
                >
                  <span>Explore {cat.title} ({cat.count})</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
