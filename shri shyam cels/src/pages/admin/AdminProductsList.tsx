import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  Edit3,
  Trash2,
  AlertTriangle,
  RefreshCw,
  X,
  Star,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import {
  fetchProducts,
  updateProductStock,
  updateProductAvailability,
  updateProductFeatured,
  deleteProduct,
  fetchCategories,
  fetchSubcategories,
  type AdminCategory,
  type AdminSubcategory
} from '../../services/productService';
import type { Product, AvailabilityStatus } from '../../types';

export const AdminProductsList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State initialized from URL query params if present
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || 'All');
  const [selectedAvailability, setSelectedAvailability] = useState(searchParams.get('availability') || 'All');
  const [selectedPrice, setSelectedPrice] = useState(searchParams.get('price') || 'All');
  const [selectedFeatured, setSelectedFeatured] = useState(searchParams.get('featured') || 'All');
  const [sortBy, setSortBy] = useState<string>('default');

  // Deletion Modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick Action Pending IDs
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [featuringId, setFeaturingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [{ products: loadedProducts }, loadedCats, loadedSubs] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchSubcategories()
    ]);
    setProducts(loadedProducts);
    setCategories(loadedCats);
    setSubcategories(loadedSubs);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync category param from URL if it changes
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    }
    const availParam = searchParams.get('availability');
    if (availParam) {
      setSelectedAvailability(availParam);
    }
    const priceParam = searchParams.get('price');
    if (priceParam) {
      setSelectedPrice(priceParam);
    }
  }, [searchParams]);

  // When selectedCategory changes, reset subcategory if it belongs to another category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'All') {
      return Array.from(new Set(products.map((p) => p.subCategory).filter(Boolean))).sort();
    }
    const matchingCat = categories.find((c) => c.name === selectedCategory);
    if (matchingCat) {
      const subsFromDb = subcategories
        .filter((s) => s.category_id === matchingCat.id)
        .map((s) => s.name);
      const subsFromProds = products
        .filter((p) => p.mainCategory === selectedCategory)
        .map((p) => p.subCategory);
      return Array.from(new Set([...subsFromDb, ...subsFromProds])).sort();
    }
    return Array.from(
      new Set(products.filter((p) => p.mainCategory === selectedCategory).map((p) => p.subCategory))
    ).sort();
  }, [selectedCategory, categories, subcategories, products]);

  const handleStockToggle = async (product: Product) => {
    const newStock = !product.inStock;
    const newAvail: AvailabilityStatus = newStock ? 'In Stock' : 'Out of Stock';
    setTogglingId(product.id);
    const success = await updateProductStock(product.id, newStock, newAvail);
    setTogglingId(null);

    if (success) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                inStock: newStock,
                availability: newAvail
              }
            : p
        )
      );
    }
  };

  const handleAvailabilityChange = async (product: Product, newAvail: AvailabilityStatus) => {
    const newInStock = newAvail === 'In Stock';
    setTogglingId(product.id);
    const success = await updateProductAvailability(product.id, newAvail);
    setTogglingId(null);

    if (success) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                availability: newAvail,
                inStock: newInStock
              }
            : p
        )
      );
    }
  };

  const handleFeaturedToggle = async (product: Product) => {
    const newFeatured = !product.isFeatured;
    setFeaturingId(product.id);
    const success = await updateProductFeatured(product.id, newFeatured);
    setFeaturingId(null);

    if (success) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isFeatured: newFeatured, isBestSeller: newFeatured } : p
        )
      );
      setFeedbackMessage({
        type: 'success',
        text: `"${product.name}" ${newFeatured ? 'marked as Featured' : 'removed from Featured'}.`
      });
      setTimeout(() => setFeedbackMessage(null), 3000);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    const result = await deleteProduct(productToDelete.id);
    setIsDeleting(false);

    if (result.success) {
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setFeedbackMessage({
        type: 'success',
        text: `"${productToDelete.name}" was permanently deleted.`
      });
      setProductToDelete(null);
    } else {
      setFeedbackMessage({
        type: 'error',
        text: result.error || 'Failed to delete product from database.'
      });
    }

    setTimeout(() => {
      setFeedbackMessage(null), 4000;
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedAvailability('All');
    setSelectedPrice('All');
    setSelectedFeatured('All');
    setSortBy('default');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedSubcategory !== 'All' ||
    selectedAvailability !== 'All' ||
    selectedPrice !== 'All' ||
    selectedFeatured !== 'All' ||
    sortBy !== 'default';

  // Multi-facet Filter & Sort
  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesCat = item.mainCategory.toLowerCase().includes(query);
        const matchesSub = item.subCategory.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesSub && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && item.mainCategory !== selectedCategory) {
        return false;
      }

      // 3. Subcategory Filter
      if (selectedSubcategory !== 'All' && item.subCategory !== selectedSubcategory) {
        return false;
      }

      // 4. Availability Filter
      if (selectedAvailability !== 'All') {
        if (selectedAvailability === 'Available' && item.availability !== 'In Stock') {
          return false;
        }
        if (selectedAvailability === 'Available on Order' && item.availability !== 'Available on Order') {
          return false;
        }
        if (selectedAvailability === 'Out of Stock' && item.availability !== 'Out of Stock') {
          return false;
        }
      }

      // 5. Price Filter
      if (selectedPrice !== 'All') {
        const isPriceOnReq = !item.numericPrice || item.numericPrice <= 0;
        if (selectedPrice === 'Price Available' && isPriceOnReq) {
          return false;
        }
        if (selectedPrice === 'Price on Request' && !isPriceOnReq) {
          return false;
        }
      }

      // 6. Featured Filter
      if (selectedFeatured !== 'All') {
        if (selectedFeatured === 'Featured' && !item.isFeatured) {
          return false;
        }
        if (selectedFeatured === 'Not Featured' && item.isFeatured) {
          return false;
        }
      }

      return true;
    });

    // 7. Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      // Never treat null as ₹0, put nulls/Price on Request last
      result.sort((a, b) => {
        const aVal = a.numericPrice > 0 ? a.numericPrice : Infinity;
        const bVal = b.numericPrice > 0 ? b.numericPrice : Infinity;
        return aVal - bVal;
      });
    } else if (sortBy === 'price-desc') {
      // Put nulls/Price on Request last
      result.sort((a, b) => {
        const aVal = a.numericPrice > 0 ? a.numericPrice : -Infinity;
        const bVal = b.numericPrice > 0 ? b.numericPrice : -Infinity;
        return bVal - aVal;
      });
    } else if (sortBy === 'newest') {
      // Reverse default array order
      result = [...result].reverse();
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedAvailability,
    selectedPrice,
    selectedFeatured,
    sortBy
  ]);

  return (
    <div className="space-y-6">
      {/* Top Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C99A3E]/15 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C99A3E]">
              Inventory Management
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/50">{products.length} Total Products in Supabase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Store Products Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/30 text-white/80 hover:text-white hover:border-[#C99A3E] transition-all disabled:opacity-50"
            title="Refresh product list"
            aria-label="Refresh product list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C99A3E]' : ''}`} />
          </button>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] shadow-lg shadow-[#C99A3E]/20 hover:brightness-105 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Notification Toast */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-[#277A45]/20 border-[#277A45]/40 text-[#4ade80]'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
          }`}
        >
          <span>{feedbackMessage.text}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name, category, or subcategory..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-xs sm:text-sm placeholder-white/40 focus:outline-none focus:border-[#C99A3E] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white rounded-lg"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Multi-Facet Filter Controls Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* 1. Category */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('All');
              }}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Subcategory */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Subcategory
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="All">All Subcategories</option>
              {availableSubcategories.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Availability */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Availability
            </label>
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available (In Stock)</option>
              <option value="Available on Order">Available on Order</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* 4. Price */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Price Status
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="All">All Prices</option>
              <option value="Price Available">Price Available</option>
              <option value="Price on Request">Price on Request</option>
            </select>
          </div>

          {/* 5. Featured */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Featured Status
            </label>
            <select
              value={selectedFeatured}
              onChange={(e) => setSelectedFeatured(e.target.value)}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="All">All</option>
              <option value="Featured">⭐ Featured Only</option>
              <option value="Not Featured">Not Featured</option>
            </select>
          </div>

          {/* 6. Sorting */}
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider text-white/50 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-2.5 py-2 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white focus:outline-none focus:border-[#C99A3E] transition-all"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
              <option value="price-asc">Price Low → High</option>
              <option value="price-desc">Price High → Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Filters Active indicator & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
          <div className="text-white/60">
            Showing <strong className="text-[#C99A3E]">{filteredProducts.length}</strong> of{' '}
            <strong>{products.length}</strong> products
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-colors text-xs font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#C99A3E]" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Management Container */}
      <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-4 sm:p-6 shadow-xl shadow-black/30 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-white/40 text-sm flex flex-col items-center justify-center">
            <RefreshCw className="w-6 h-6 text-[#C99A3E] animate-spin mb-3" />
            <span>Loading product inventory...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">No products found</h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                No catalog items match your active search or filter combination.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#C99A3E] text-[#071A36] text-xs font-bold shadow-md hover:brightness-105 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table Layout (hidden on mobile, visible md+) */}
            <div className="hidden md:block overflow-x-auto -mx-4 sm:mx-0">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#C99A3E]/15 text-white/50 text-[11px] uppercase tracking-wider">
                    <th className="pb-3 px-3">Product</th>
                    <th className="pb-3 px-3">Category</th>
                    <th className="pb-3 px-3">Subcategory</th>
                    <th className="pb-3 px-3">Price</th>
                    <th className="pb-3 px-3 text-center">Featured</th>
                    <th className="pb-3 px-3">Availability</th>
                    <th className="pb-3 px-3 text-center">Stock</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C99A3E]/10">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-[#0A2540]/60 transition-colors">
                      {/* 1. Image + Name */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-xl object-cover bg-black/40 border border-[#C99A3E]/20 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                          <div className="max-w-[180px] lg:max-w-xs">
                            <p className="font-bold text-white truncate" title={product.name}>
                              {product.name}
                            </p>
                            <span className="text-[11px] text-white/40 block truncate">
                              Unit: {product.unit}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Category */}
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0A2540] border border-[#C99A3E]/20 text-[#F8F3E8]">
                          {product.mainCategory}
                        </span>
                      </td>

                      {/* 3. Subcategory */}
                      <td className="py-3.5 px-3">
                        <span className="text-xs text-white/70">{product.subCategory}</span>
                      </td>

                      {/* 4. Price */}
                      <td className="py-3.5 px-3 font-semibold text-[#C99A3E]">
                        {product.price}
                      </td>

                      {/* 5. Featured Toggle */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleFeaturedToggle(product)}
                          disabled={featuringId === product.id}
                          className={`p-2 rounded-xl transition-all ${
                            product.isFeatured
                              ? 'bg-[#C99A3E]/20 text-[#C99A3E] hover:bg-[#C99A3E]/30'
                              : 'bg-white/5 text-white/30 hover:text-white/70 hover:bg-white/10'
                          }`}
                          title={
                            product.isFeatured
                              ? '⭐ Featured on Homepage (Click to unfeature)'
                              : 'Click to feature on Homepage'
                          }
                          aria-label={product.isFeatured ? 'Unfeature product' : 'Feature product'}
                        >
                          <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-[#C99A3E]' : ''}`} />
                        </button>
                      </td>

                      {/* 6. Availability Selector */}
                      <td className="py-3.5 px-3">
                        <select
                          value={product.availability}
                          disabled={togglingId === product.id}
                          onChange={(e) =>
                            handleAvailabilityChange(product, e.target.value as AvailabilityStatus)
                          }
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            product.availability === 'In Stock'
                              ? 'bg-[#277A45]/20 text-[#4ade80] border-[#277A45]/40'
                              : product.availability === 'Available on Order'
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          }`}
                        >
                          <option value="In Stock" className="bg-[#071A36] text-white">
                            Available (In Stock)
                          </option>
                          <option value="Available on Order" className="bg-[#071A36] text-white">
                            Available on Order
                          </option>
                          <option value="Out of Stock" className="bg-[#071A36] text-white">
                            Out of Stock
                          </option>
                        </select>
                      </td>

                      {/* 7. Stock Quick Toggle */}
                      <td className="py-3.5 px-3 text-center">
                        <button
                          onClick={() => handleStockToggle(product)}
                          disabled={togglingId === product.id}
                          className={`w-7 h-7 rounded-full inline-flex items-center justify-center transition-all ${
                            product.inStock
                              ? 'bg-[#277A45]/30 text-[#4ade80] hover:bg-[#277A45]/50'
                              : 'bg-rose-500/30 text-rose-300 hover:bg-rose-500/50'
                          }`}
                          title={`Toggle quick stock: currently ${product.inStock ? 'In Stock' : 'Out of Stock'}`}
                          aria-label={`Toggle quick stock: currently ${product.inStock ? 'In Stock' : 'Out of Stock'}`}
                        >
                          {product.inStock ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* 8. Actions (Edit, Delete) */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-[#C99A3E] text-white/80 hover:text-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E] transition-all"
                            title="Edit product"
                            aria-label="Edit product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => setProductToDelete(product)}
                            className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-rose-500 text-white/70 hover:text-white border border-transparent hover:border-rose-500 transition-all"
                            title="Delete product"
                            aria-label="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card Layout (visible on screens < md, prevents horizontal overflow) */}
            <div className="md:hidden space-y-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-[#0A2540]/60 border border-[#C99A3E]/20 space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-black/40 border border-[#C99A3E]/20 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-sm leading-snug line-clamp-2">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => handleFeaturedToggle(product)}
                          disabled={featuringId === product.id}
                          className={`p-1.5 rounded-lg shrink-0 ${
                            product.isFeatured
                              ? 'text-[#C99A3E] bg-[#C99A3E]/20'
                              : 'text-white/30 hover:text-white/70 bg-white/5'
                          }`}
                          aria-label="Toggle Featured"
                        >
                          <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-[#C99A3E]' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs text-[#C99A3E] font-bold mt-1">{product.price}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#071A36] text-white/70 border border-white/10">
                          {product.mainCategory}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#071A36] text-white/50 border border-white/10">
                          {product.subCategory}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Status & Actions row */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <select
                      value={product.availability}
                      disabled={togglingId === product.id}
                      onChange={(e) =>
                        handleAvailabilityChange(product, e.target.value as AvailabilityStatus)
                      }
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
                        product.availability === 'In Stock'
                          ? 'bg-[#277A45]/20 text-[#4ade80] border-[#277A45]/40'
                          : product.availability === 'Available on Order'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <option value="In Stock" className="bg-[#071A36] text-white">
                        In Stock
                      </option>
                      <option value="Available on Order" className="bg-[#071A36] text-white">
                        On Order
                      </option>
                      <option value="Out of Stock" className="bg-[#071A36] text-white">
                        Out of Stock
                      </option>
                    </select>

                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#071A36] border border-[#C99A3E]/30 text-white text-xs font-semibold hover:border-[#C99A3E]"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C99A3E]" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => setProductToDelete(product)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        title="Delete product"
                        aria-label="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Safe Delete Confirmation Modal (Section 15) */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#071A36] border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-black/80 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-white">Delete Product?</h3>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  Are you sure you want to permanently delete this product from the database?
                </p>
              </div>
            </div>

            {/* Product Card Highlight */}
            <div className="p-3.5 rounded-2xl bg-[#0A2540] border border-white/10 flex items-center gap-3">
              <img
                src={productToDelete.image}
                alt={productToDelete.name}
                className="w-12 h-12 rounded-xl object-cover bg-black/40 border border-[#C99A3E]/20 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{productToDelete.name}</p>
                <span className="text-[11px] text-[#C99A3E] font-medium block">
                  {productToDelete.mainCategory} • {productToDelete.price}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-rose-300/80 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
              ⚠️ Warning: This action is destructive and immediately removes the product from customer searches and the live store.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
