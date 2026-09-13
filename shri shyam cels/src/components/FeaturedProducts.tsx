import React, { useMemo } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowRight, Package } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onOpenQuickView,
  onAddToCart,
  onViewAllProducts
}) => {
  // Priority: If admin explicitly featured products in store management, display those (up to 8).
  // Fallback: If zero products are featured, maintain existing deterministic Phase 4 selection.
  const featured = useMemo(() => {
    if (!products || products.length === 0) return [];

    const adminFeatured = products.filter((p) => Boolean(p.isFeatured));
    if (adminFeatured.length > 0) {
      return [...adminFeatured]
        .sort((a, b) => {
          if (a.numericPrice > 0 && b.numericPrice <= 0) return -1;
          if (a.numericPrice <= 0 && b.numericPrice > 0) return 1;
          return a.name.localeCompare(b.name);
        })
        .slice(0, 8);
    }

    const party = products.filter((p) => p.mainCategory === 'Birthday & Party Items');
    const cake = products.filter((p) => p.mainCategory === 'Cake Items');
    const disp = products.filter((p) => p.mainCategory === 'Disposable Items');

    // Deterministic balanced pick
    const partyPicks = party.filter((p) => p.numericPrice > 0).slice(0, 3);
    const cakePicks = cake.filter((p) => p.numericPrice > 0).slice(0, 3);
    const dispPicks = disp.filter((p) => p.numericPrice > 0).slice(0, 2);

    const combined = [...partyPicks, ...cakePicks, ...dispPicks];

    // Fallback if priced items are fewer
    if (combined.length < 8) {
      const selectedIds = new Set(combined.map((p) => p.id));
      for (const p of products) {
        if (!selectedIds.has(p.id)) {
          combined.push(p);
          selectedIds.add(p.id);
          if (combined.length >= 8) break;
        }
      }
    }

    return combined.slice(0, 8);
  }, [products]);

  if (featured.length === 0) return null;

  return (
    <section id="featured" className="py-16 sm:py-20 bg-gradient-to-b from-[#071A36] via-[#0B2545]/60 to-[#071A36] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-3.5 py-1.5 rounded-full border border-[#C99A3E]/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span>HANDPICKED SELECTION</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-tight">
              Featured <span className="gold-gradient-text">Products</span>
            </h2>

            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              A preview across our cake accessories, birthday party decor, and disposable partyware. Add items directly to your enquiry cart or enquire on WhatsApp.
            </p>
          </div>

          {/* Header Action Button */}
          <button
            onClick={onViewAllProducts}
            aria-label="View all celebration products in catalog"
            className="self-start md:self-auto inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C99A3E] hover:text-[#E5BA55] bg-[#071A36] hover:bg-[#071A36]/80 px-4 py-2.5 rounded-xl border border-[#C99A3E]/40 transition-colors shrink-0"
          >
            <span>View Full Catalog ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={(prod) => onAddToCart(prod, 1)}
            />
          ))}
        </div>

        {/* Bottom Banner & CTA to Full Catalog */}
        <div className="mt-12 text-center p-6 sm:p-8 rounded-3xl bg-[#0B2545] border border-[#C99A3E]/20 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-serif-display font-bold text-lg sm:text-xl text-white">
              Looking for something specific?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Browse our complete inventory of {products.length} celebration products with search, sorting, and subcategory filters.
            </p>
          </div>

          <button
            onClick={onViewAllProducts}
            aria-label="Browse all products in catalog"
            className="shrink-0 inline-flex items-center gap-2 bg-[#C99A3E] hover:bg-[#E5BA55] text-[#071A36] font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <Package className="w-4 h-4" />
            <span>Explore All {products.length} Products</span>
          </button>
        </div>

      </div>
    </section>
  );
};
