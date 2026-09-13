import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import type { Product } from '../types';
import { ProductModal } from './ProductModal';
import { ProductCard } from './ProductCard';
import { Search, Sparkles, Filter, Package, ArrowUpDown, RotateCcw, X, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { BackendStatus } from '../services/productService';

interface ShopSectionProps {
  products?: Product[];
  backendStatus?: BackendStatus;
  onAddToCart: (product: Product, quantity?: number) => void;
  selectedCategoryFilter: string;
  onSelectCategoryFilter: (category: string) => void;
  selectedSubCategoryFilter?: string;
  onSelectSubCategoryFilter?: (subcategory: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading?: boolean;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  products,
  backendStatus,
  onAddToCart,
  selectedCategoryFilter,
  onSelectCategoryFilter,
  selectedSubCategoryFilter = 'All',
  onSelectSubCategoryFilter,
  searchQuery,
  onSearchChange,
  isLoading = false
}) => {
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string>(selectedSubCategoryFilter || 'All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'In Stock' | 'Available on Order'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('featured');

  // Fallback to local PRODUCTS if products prop is empty or loading
  const allProducts = useMemo(() => {
    return products && products.length > 0 ? products : PRODUCTS;
  }, [products]);

  // Main Category Tab metadata with dynamic product count
  const mainCategories = useMemo(() => {
    const counts = {
      All: allProducts.length,
      Cakes: allProducts.filter(p => p.mainCategory === 'Cake Items').length,
      Party: allProducts.filter(p => p.mainCategory === 'Birthday & Party Items').length,
      Disposables: allProducts.filter(p => p.mainCategory === 'Disposable Items').length
    };

    return [
      { label: 'All Products', value: 'All', icon: '✨', count: counts.All },
      { label: 'Cake Items', value: 'Cake Items', icon: '🍰', count: counts.Cakes },
      { label: 'Birthday & Party Items', value: 'Birthday & Party Items', icon: '🎈', count: counts.Party },
      { label: 'Disposable Items', value: 'Disposable Items', icon: '🍽️', count: counts.Disposables }
    ];
  }, [allProducts]);

  // Dynamic Subcategories filtered by selected main category
  const availableSubcategories = useMemo(() => {
    let scoped = allProducts;
    if (selectedCategoryFilter !== 'All') {
      scoped = allProducts.filter((p) => {
        if (!p.mainCategory) return false;
        return (
          p.mainCategory.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
          (selectedCategoryFilter === 'Cakes' && p.mainCategory === 'Cake Items') ||
          (selectedCategoryFilter === 'Balloons' && p.mainCategory === 'Birthday & Party Items') ||
          (selectedCategoryFilter === 'Disposables' && p.mainCategory === 'Disposable Items')
        );
      });
    }

    const uniqueSubs = Array.from(
      new Set(scoped.map((p) => (p.subCategory ? p.subCategory.trim() : '')).filter(Boolean))
    ).sort();

    return ['All', ...uniqueSubs];
  }, [allProducts, selectedCategoryFilter]);

  // Sync subcategory filter if external prop changes
  React.useEffect(() => {
    if (selectedSubCategoryFilter) {
      setActiveSubcategory(selectedSubCategoryFilter);
    }
  }, [selectedSubCategoryFilter]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Main category filter
        const matchesMain =
          selectedCategoryFilter === 'All' ||
          (p.mainCategory && p.mainCategory.toLowerCase() === selectedCategoryFilter.toLowerCase()) ||
          (selectedCategoryFilter === 'Cakes' && p.mainCategory === 'Cake Items') ||
          (selectedCategoryFilter === 'Balloons' && p.mainCategory === 'Birthday & Party Items') ||
          (selectedCategoryFilter === 'Disposables' && p.mainCategory === 'Disposable Items');

        // Subcategory filter
        const matchesSub =
          activeSubcategory === 'All' ||
          (p.subCategory && p.subCategory.toLowerCase() === activeSubcategory.toLowerCase());

        // Availability filter
        const matchesAvail =
          availabilityFilter === 'All' || p.availability === availabilityFilter;

        // Search query across multiple fields
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          (p.name && p.name.toLowerCase().includes(query)) ||
          (p.subCategory && p.subCategory.toLowerCase().includes(query)) ||
          (p.mainCategory && p.mainCategory.toLowerCase().includes(query)) ||
          (p.description && p.description.toLowerCase().includes(query)) ||
          (p.unit && p.unit.toLowerCase().includes(query)) ||
          (Array.isArray(p.features) && p.features.some((f) => f.toLowerCase().includes(query)));

        return matchesMain && matchesSub && matchesAvail && matchesSearch;
      })
      .sort((a, b) => {
        // Sorting: handles Price on Request (null or 0) gracefully
        if (sortBy === 'price-asc') {
          const aHasPrice = a.numericPrice > 0 && a.price !== 'Price on Request';
          const bHasPrice = b.numericPrice > 0 && b.price !== 'Price on Request';
          // Place verified priced items first in ascending order; Price on Request at the bottom
          if (aHasPrice && bHasPrice) return a.numericPrice - b.numericPrice;
          if (aHasPrice && !bHasPrice) return -1;
          if (!aHasPrice && bHasPrice) return 1;
          return a.name.localeCompare(b.name);
        }

        if (sortBy === 'price-desc') {
          const aHasPrice = a.numericPrice > 0 && a.price !== 'Price on Request';
          const bHasPrice = b.numericPrice > 0 && b.price !== 'Price on Request';
          // Place verified priced items first in descending order; Price on Request at the bottom
          if (aHasPrice && bHasPrice) return b.numericPrice - a.numericPrice;
          if (aHasPrice && !bHasPrice) return -1;
          if (!aHasPrice && bHasPrice) return 1;
          return a.name.localeCompare(b.name);
        }

        if (sortBy === 'name-asc') {
          return (a.name || '').localeCompare(b.name || '');
        }

        if (sortBy === 'name-desc') {
          return (b.name || '').localeCompare(a.name || '');
        }

        // 'featured' / recommended default
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      });
  }, [
    allProducts,
    selectedCategoryFilter,
    activeSubcategory,
    availabilityFilter,
    searchQuery,
    sortBy
  ]);

  const handleAddToCartWithConfetti = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#C99A3E', '#C2185B', '#25D366', '#FFFFFF']
    });

    onAddToCart(product);
  };

  const handleResetFilters = () => {
    onSelectCategoryFilter('All');
    setActiveSubcategory('All');
    setAvailabilityFilter('All');
    onSearchChange('');
    setSortBy('featured');
    if (onSelectSubCategoryFilter) onSelectSubCategoryFilter('All');
  };

  return (
    <section id="shop" className="py-16 sm:py-20 bg-gradient-to-b from-[#071A36] via-[#0B2545] to-[#071A36] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* CATALOG HEADER */}
        {/* ======================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#071A36] px-4 py-1.5 rounded-full border border-[#C99A3E]/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>LOCAL CELEBRATION STORE CATALOG</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white tracking-tight">
            Shop Our <span className="gold-gradient-text">Celebration Collection</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Explore balloons, cake accessories, birthday banners, lighting, and disposable party tableware. Tap any item to view details or enquire directly on WhatsApp.
          </p>

          {/* Store Location & Catalog Status Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <div className="inline-flex items-center gap-1.5 bg-[#071A36]/90 border border-[#C99A3E]/30 text-xs text-[#F8F3E8]/90 py-1.5 px-3.5 rounded-full shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-[#C99A3E] shrink-0" />
              <span>Opposite Agarwal & Sons Grocery • In-Store Pickup & Local Delivery</span>
            </div>

            {isLoading ? (
              <div className="inline-flex items-center gap-2 bg-[#0B2545] border border-[#C99A3E]/30 text-[#C99A3E] text-xs font-semibold px-3 py-1 rounded-full shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#C99A3E] animate-ping" />
                <span>Syncing live store catalog...</span>
              </div>
            ) : backendStatus?.isLive ? (
              <div className="inline-flex items-center gap-1.5 bg-[#0B2545] border border-[#25D366]/40 text-[#25D366] text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>Live Catalog ({allProducts.length} Items)</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 1. MAIN DEPARTMENT TABS */}
        {/* ======================================================== */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-6">
          {mainCategories.map((cat) => {
            const isSelected =
              selectedCategoryFilter.toLowerCase() === cat.value.toLowerCase() ||
              (cat.value === 'Cake Items' && selectedCategoryFilter === 'Cakes') ||
              (cat.value === 'Birthday & Party Items' && selectedCategoryFilter === 'Balloons') ||
              (cat.value === 'Disposable Items' && selectedCategoryFilter === 'Disposables');

            return (
              <button
                key={cat.value}
                onClick={() => {
                  onSelectCategoryFilter(cat.value);
                  setActiveSubcategory('All');
                  if (onSelectSubCategoryFilter) onSelectSubCategoryFilter('All');
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 shadow-md ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#C99A3E] via-[#E5BA55] to-[#C99A3E] text-[#071A36] shadow-xl scale-[1.02] border-2 border-[#C99A3E]'
                    : 'bg-[#071A36] text-gray-300 hover:text-white border border-white/10 hover:border-[#C99A3E]/40'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-[#071A36] text-[#C99A3E]' : 'bg-[#0B2545] text-gray-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 2. SUBCATEGORY PILLS (Horizontal Scroll on Mobile) */}
        {/* ======================================================== */}
        <div className="mb-6 bg-[#071A36]/80 p-2.5 sm:p-3 rounded-2xl border border-white/10 max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-semibold text-gray-400 mr-2 flex items-center gap-1 shrink-0 pl-1">
              <Filter className="w-3.5 h-3.5 text-[#C99A3E]" /> Subcategories:
            </span>
            {availableSubcategories.map((sub) => {
              const isSubActive = activeSubcategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  onClick={() => {
                    setActiveSubcategory(sub);
                    if (onSelectSubCategoryFilter) onSelectSubCategoryFilter(sub);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                    isSubActive
                      ? 'bg-[#C2185B] text-white shadow-md border border-[#C2185B]'
                      : 'bg-[#0B2545] text-gray-300 hover:text-white hover:bg-[#0E2F56] border border-white/5'
                  }`}
                >
                  {sub === 'All' && selectedCategoryFilter !== 'All' ? `All ${selectedCategoryFilter}` : sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SEARCH & CONTROLS BAR (SEARCH, AVAILABILITY, SORT) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 mb-6 items-center bg-[#071A36] p-3.5 sm:p-4 rounded-2xl border border-[#C99A3E]/20 shadow-xl">
          
          {/* Search Input (6 Cols on Desktop) */}
          <div className="md:col-span-6 relative">
            <input
              type="text"
              placeholder="Search balloons, banners, candles, plates, stands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search catalog items"
              className="w-full bg-[#0B2545] border border-white/10 text-white placeholder-gray-400 rounded-xl py-2.5 sm:py-3 pl-10 pr-10 focus:outline-none focus:border-[#C99A3E] text-xs sm:text-sm"
            />
            <Search className="w-4 h-4 text-[#C99A3E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Clear search input"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Availability Filter (3 Cols) */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="text-xs text-gray-400 shrink-0">Stock:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              aria-label="Filter by availability"
              className="w-full bg-[#0B2545] border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-[#C99A3E]"
            >
              <option value="All">All Availability</option>
              <option value="In Stock">In Stock Only</option>
              <option value="Available on Order">Available on Order</option>
            </select>
          </div>

          {/* Sorting Dropdown (3 Cols) */}
          <div className="md:col-span-3 flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C99A3E] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort products"
              className="w-full bg-[#0B2545] border border-white/10 text-white rounded-xl py-2.5 px-3 text-xs focus:outline-none focus:border-[#C99A3E]"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Product Name (A–Z)</option>
              <option value="name-desc">Product Name (Z–A)</option>
            </select>
          </div>

        </div>

        {/* Results Counter & Filter Reset Status */}
        <div className="flex flex-wrap items-center justify-between text-xs text-gray-400 mb-6 px-1 gap-2">
          <div>
            Showing <strong className="text-white font-bold">{filteredProducts.length}</strong> of{' '}
            <strong className="text-[#C99A3E] font-bold">{allProducts.length}</strong> products
            {selectedCategoryFilter !== 'All' && (
              <span> in <strong className="text-white">{selectedCategoryFilter}</strong></span>
            )}
            {activeSubcategory !== 'All' && (
              <span> &gt; <strong className="text-white">{activeSubcategory}</strong></span>
            )}
          </div>

          {(selectedCategoryFilter !== 'All' || activeSubcategory !== 'All' || searchQuery || availabilityFilter !== 'All' || sortBy !== 'featured') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-[#C99A3E] hover:text-[#E5BA55] font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* 4. PRODUCT CARDS GRID (OR LOADING SKELETON / EMPTY STATE) */}
        {/* ======================================================== */}
        {isLoading ? (
          /* SKELETON LOADING GRID */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[#071A36] border border-white/5 overflow-hidden p-3.5 space-y-3 animate-pulse"
              >
                <div className="aspect-square w-full bg-[#0B2545] rounded-xl" />
                <div className="h-3 w-16 bg-[#0B2545] rounded" />
                <div className="h-4 w-full bg-[#0B2545] rounded" />
                <div className="h-4 w-2/3 bg-[#0B2545] rounded" />
                <div className="h-8 w-full bg-[#0B2545] rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* PROFESSIONAL EMPTY STATE */
          <div className="text-center py-16 px-4 sm:px-6 bg-[#071A36]/60 rounded-3xl border border-white/10 max-w-md mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#0B2545] border border-[#C99A3E]/30 flex items-center justify-center mx-auto mb-4 text-[#C99A3E]">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif-display font-bold text-white mb-2">No Products Found</h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-6 leading-relaxed">
              We couldn't find any items matching your current filters or search query. Try searching for something else or reset your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-[#C99A3E] hover:bg-[#E5BA55] text-[#071A36] font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        ) : (
          /* RESPONSIVE 2-COL MOBILE, 3-COL TABLET, 4-COL DESKTOP GRID */
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={setSelectedProductModal}
                onAddToCart={handleAddToCartWithConfetti}
              />
            ))}
          </div>
        )}

      </div>

      {/* Quick View Product Modal */}
      <ProductModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
