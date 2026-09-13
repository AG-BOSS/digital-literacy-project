import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface QuickPathsProps {
  onSelectCategoryFilter: (category: string) => void;
  onSelectSubCategoryFilter?: (subcategory: string) => void;
}

export const QuickPaths: React.FC<QuickPathsProps> = ({
  onSelectCategoryFilter,
  onSelectSubCategoryFilter
}) => {
  const quickOptions = [
    {
      id: 'birthday',
      icon: '🎂',
      label: 'Birthday Party',
      sublabel: 'Themes, Banners & Balloons',
      category: 'Birthday & Party Items',
      subcategory: 'All'
    },
    {
      id: 'cake',
      icon: '🍰',
      label: 'Cake Decoration',
      sublabel: 'Toppers, Candles & Stands',
      category: 'Cake Items',
      subcategory: 'All'
    },
    {
      id: 'balloons',
      icon: '🎈',
      label: 'Balloons & Arches',
      sublabel: 'Metallic, Foil & Garland Sets',
      category: 'Birthday & Party Items',
      subcategory: 'Balloons'
    },
    {
      id: 'tableware',
      icon: '🍽️',
      label: 'Disposable Tableware',
      sublabel: 'Plates, Cups & Napkins',
      category: 'Disposable Items',
      subcategory: 'All'
    }
  ];

  const handleQuickClick = (category: string, subcategory: string) => {
    onSelectCategoryFilter(category);
    if (onSelectSubCategoryFilter) {
      onSelectSubCategoryFilter(subcategory);
    }
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-[#071A36] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Heading */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#0B2545] px-3.5 py-1 rounded-full border border-[#C99A3E]/30">
            <Sparkles className="w-3 h-3 text-[#C99A3E]" />
            <span>QUICK DISCOVERY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-display font-bold text-white">
            What are you <span className="gold-gradient-text">celebrating?</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Choose an occasion or department to jump directly into filtered items:
          </p>
        </div>

        {/* 4 Interactive Quick Path Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleQuickClick(opt.category, opt.subcategory)}
              aria-label={`Filter catalog for ${opt.label}`}
              className="group p-4 sm:p-5 rounded-2xl bg-[#0B2545] border border-white/10 hover:border-[#C99A3E]/70 hover:bg-[#0E2C52] transition-all duration-300 text-left flex items-center justify-between shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl sm:text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  {opt.icon}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#C99A3E] transition-colors truncate">
                    {opt.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-400 truncate mt-0.5">
                    {opt.sublabel}
                  </p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#C99A3E] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
