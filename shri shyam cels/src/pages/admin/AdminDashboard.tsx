import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Edit3,
  Star,
  Clock,
  XCircle,
  HelpCircle,
  ShoppingBag
} from 'lucide-react';
import {
  fetchAdminDashboardStats,
  fetchProducts,
  updateProductStock,
  updateProductFeatured,
  type AdminDashboardStats
} from '../../services/productService';
import type { Product } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats>({
    totalProducts: 0,
    cakeCount: 0,
    partyCount: 0,
    disposableCount: 0,
    availableCount: 0,
    availableOnOrderCount: 0,
    outOfStockCount: 0,
    priceOnRequestCount: 0,
    featuredCount: 0,
    totalCategories: 0,
    totalSubcategories: 0,
    categorySummaries: []
  });
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [featuringId, setFeaturingId] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    const [statsData, { products }] = await Promise.all([
      fetchAdminDashboardStats(),
      fetchProducts()
    ]);
    setStats(statsData);
    setRecentProducts(products.slice(0, 8));
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStockToggle = async (product: Product) => {
    const newStock = !product.inStock;
    setTogglingId(product.id);
    const success = await updateProductStock(
      product.id,
      newStock,
      newStock ? 'In Stock' : 'Out of Stock'
    );
    setTogglingId(null);

    if (success) {
      setRecentProducts((prev) =>
        prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                inStock: newStock,
                availability: newStock ? 'In Stock' : 'Out of Stock'
              }
            : p
        )
      );
      // Reload live stats to keep counts 100% synchronized
      fetchAdminDashboardStats().then(setStats);
    }
  };

  const handleFeaturedToggle = async (product: Product) => {
    const newFeatured = !product.isFeatured;
    setFeaturingId(product.id);
    const success = await updateProductFeatured(product.id, newFeatured);
    setFeaturingId(null);

    if (success) {
      setRecentProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isFeatured: newFeatured, isBestSeller: newFeatured } : p
        )
      );
      fetchAdminDashboardStats().then(setStats);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C99A3E]/15 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C99A3E]">
              Shri Shyam Celebrations
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/50">Store Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Store Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/30 text-white/80 hover:text-white hover:border-[#C99A3E] transition-all disabled:opacity-50"
            title="Refresh statistics"
            aria-label="Refresh statistics"
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

      {/* 8 Live Statistics Metric Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white/70">
            Catalog Overview (Live Data)
          </h2>
          <span className="text-xs text-[#C99A3E] font-medium">
            {stats.featuredCount} Featured Items
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 1. Total Products */}
          <Link
            to="/admin/products"
            className="bg-[#071A36] border border-[#C99A3E]/30 hover:border-[#C99A3E] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Total Products
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E]/20 flex items-center justify-center text-[#C99A3E] transition-colors">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {loading ? '...' : stats.totalProducts}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Live active catalog</span>
          </Link>

          {/* 2. Cake Items */}
          <Link
            to="/admin/products?category=Cake+Items"
            className="bg-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Cake Items
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center text-amber-400 transition-colors">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {loading ? '...' : stats.cakeCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Bakery & cake decor</span>
          </Link>

          {/* 3. Birthday & Party Items */}
          <Link
            to="/admin/products?category=Birthday+%26+Party+Items"
            className="bg-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Birthday & Party
              </span>
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 flex items-center justify-center text-pink-400 transition-colors">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {loading ? '...' : stats.partyCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Balloons & accessories</span>
          </Link>

          {/* 4. Disposable Items */}
          <Link
            to="/admin/products?category=Disposable+Items"
            className="bg-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                Disposable Items
              </span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 flex items-center justify-center text-blue-400 transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {loading ? '...' : stats.disposableCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Eco-friendly tableware</span>
          </Link>

          {/* 5. Available */}
          <Link
            to="/admin/products?availability=Available"
            className="bg-[#071A36] border border-[#277A45]/30 hover:border-[#277A45] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#4ade80] uppercase tracking-wider">
                Available
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#277A45]/20 flex items-center justify-center text-[#4ade80]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#4ade80]">
              {loading ? '...' : stats.availableCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Ready in store</span>
          </Link>

          {/* 6. Available on Order */}
          <Link
            to="/admin/products?availability=Available+on+Order"
            className="bg-[#071A36] border border-amber-500/30 hover:border-amber-500 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                Available on Order
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">
              {loading ? '...' : stats.availableOnOrderCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Pre-order fulfillment</span>
          </Link>

          {/* 7. Out of Stock */}
          <Link
            to="/admin/products?availability=Out+of+Stock"
            className="bg-[#071A36] border border-rose-500/30 hover:border-rose-500 rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Out of Stock
              </span>
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400">
                <XCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-300">
              {loading ? '...' : stats.outOfStockCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Temporarily unavailable</span>
          </Link>

          {/* 8. Price on Request */}
          <Link
            to="/admin/products?price=Price+on+Request"
            className="bg-[#071A36] border border-[#C99A3E]/30 hover:border-[#C99A3E] rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/20 flex flex-col justify-between transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#F8F3E8]/80 uppercase tracking-wider">
                Price on Request
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E]/20 flex items-center justify-center text-[#C99A3E] transition-colors">
                <HelpCircle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#F8F3E8]">
              {loading ? '...' : stats.priceOnRequestCount}
            </div>
            <span className="text-[11px] text-white/40 mt-1">Custom / dynamic pricing</span>
          </Link>
        </div>
      </div>

      {/* Category Summary Section (Section 2) */}
      <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/20 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#C99A3E]" />
              <span>Category Breakdown</span>
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Live inventory distribution across store departments
            </p>
          </div>
          <Link
            to="/admin/categories"
            className="text-xs font-bold text-[#C99A3E] hover:underline inline-flex items-center gap-1"
          >
            <span>Manage Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto -mx-5 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#C99A3E]/15 text-white/50 text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-3">Department</th>
                <th className="pb-3 px-3 text-center">Total Products</th>
                <th className="pb-3 px-3 text-center">Available</th>
                <th className="pb-3 px-3 text-center">On Order</th>
                <th className="pb-3 px-3 text-center">Out of Stock</th>
                <th className="pb-3 px-3 text-center">Price on Request</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C99A3E]/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white/40">
                    Loading category summaries...
                  </td>
                </tr>
              ) : stats.categorySummaries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-white/40">
                    No categories found.
                  </td>
                </tr>
              ) : (
                stats.categorySummaries.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#0A2540]/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      <Link
                        to={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                        className="hover:text-[#C99A3E] transition-colors"
                      >
                        {cat.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-white">
                      {cat.productCount}
                    </td>
                    <td className="py-3 px-3 text-center text-[#4ade80] font-medium">
                      {cat.availableCount}
                    </td>
                    <td className="py-3 px-3 text-center text-amber-300 font-medium">
                      {cat.availableOnOrderCount}
                    </td>
                    <td className="py-3 px-3 text-center text-rose-300 font-medium">
                      {cat.outOfStockCount}
                    </td>
                    <td className="py-3 px-3 text-center text-white/60 font-medium">
                      {cat.priceOnRequestCount}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                        className="inline-flex items-center gap-1 text-xs text-[#C99A3E] hover:text-[#d8ad52] font-semibold transition-colors"
                      >
                        <span>Filter</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dashboard Quick Actions (Section 29) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Quick Action 1: Add New Product */}
        <Link
          to="/admin/products/new"
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#071A36] to-[#0A2540] border border-[#C99A3E]/30 hover:border-[#C99A3E] transition-all shadow-md flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#C99A3E] transition-colors">
              Add New Product
            </h3>
            <p className="text-xs text-white/60 mt-1">Upload images, set pricing & features</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E] group-hover:text-[#071A36] flex items-center justify-center text-[#C99A3E] transition-all shrink-0 ml-3">
            <PlusCircle className="w-5 h-5" />
          </div>
        </Link>

        {/* Quick Action 2: Manage Products */}
        <Link
          to="/admin/products"
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#071A36] to-[#0A2540] border border-[#C99A3E]/30 hover:border-[#C99A3E] transition-all shadow-md flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#C99A3E] transition-colors">
              Manage Products
            </h3>
            <p className="text-xs text-white/60 mt-1">Search, multi-filter and sort inventory</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E] group-hover:text-[#071A36] flex items-center justify-center text-[#C99A3E] transition-all shrink-0 ml-3">
            <Package className="w-5 h-5" />
          </div>
        </Link>

        {/* Quick Action 3: Manage Categories */}
        <Link
          to="/admin/categories"
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#071A36] to-[#0A2540] border border-[#C99A3E]/30 hover:border-[#C99A3E] transition-all shadow-md flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#C99A3E] transition-colors">
              Manage Categories
            </h3>
            <p className="text-xs text-white/60 mt-1">Departments and subcategories</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E] group-hover:text-[#071A36] flex items-center justify-center text-[#C99A3E] transition-all shrink-0 ml-3">
            <Layers className="w-5 h-5" />
          </div>
        </Link>

        {/* Quick Action 4: View Store */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group p-5 rounded-2xl bg-gradient-to-br from-[#071A36] to-[#0A2540] border border-[#C99A3E]/30 hover:border-[#C99A3E] transition-all shadow-md flex items-center justify-between"
        >
          <div>
            <h3 className="font-bold text-white text-base group-hover:text-[#C99A3E] transition-colors">
              View Store
            </h3>
            <p className="text-xs text-white/60 mt-1">Preview customer website</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#C99A3E]/10 group-hover:bg-[#C99A3E] group-hover:text-[#071A36] flex items-center justify-center text-[#C99A3E] transition-all shrink-0 ml-3">
            <ExternalLink className="w-5 h-5" />
          </div>
        </Link>
      </div>

      {/* Recent Products Overview Table */}
      <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/30">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Catalog Products</h2>
            <p className="text-xs text-white/50 mt-0.5">
              Quick stock and featured toggle with instant edit access
            </p>
          </div>
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C99A3E] hover:text-[#d8ad52] transition-colors"
          >
            <span>View All ({stats.totalProducts})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-white/40 text-sm">Loading product catalog...</div>
        ) : recentProducts.length === 0 ? (
          <div className="py-12 text-center text-white/40 text-sm">No products found in the database.</div>
        ) : (
          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#C99A3E]/15 text-white/50 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 px-3">Product</th>
                  <th className="pb-3 px-3">Category</th>
                  <th className="pb-3 px-3">Price</th>
                  <th className="pb-3 px-3 text-center">Featured</th>
                  <th className="pb-3 px-3">Availability</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C99A3E]/10">
                {recentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-[#0A2540]/60 transition-colors">
                    {/* Product Name & Image */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-black/40 border border-[#C99A3E]/20 shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="max-w-[180px] sm:max-w-xs">
                          <p className="font-semibold text-white truncate" title={product.name}>
                            {product.name}
                          </p>
                          <span className="text-[11px] text-white/40">{product.subCategory}</span>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-3 px-3">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0A2540] border border-[#C99A3E]/20 text-[#F8F3E8]">
                        {product.mainCategory}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-3 font-medium text-[#C99A3E]">
                      {product.price}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleFeaturedToggle(product)}
                        disabled={featuringId === product.id}
                        className={`p-1.5 rounded-lg transition-all ${
                          product.isFeatured
                            ? 'bg-[#C99A3E]/20 text-[#C99A3E] hover:bg-[#C99A3E]/30'
                            : 'bg-white/5 text-white/30 hover:text-white/70 hover:bg-white/10'
                        }`}
                        title={product.isFeatured ? 'Featured on Homepage (Click to unfeature)' : 'Click to feature on Homepage'}
                        aria-label={product.isFeatured ? 'Unfeature product' : 'Feature product'}
                      >
                        <Star className={`w-4 h-4 ${product.isFeatured ? 'fill-[#C99A3E]' : ''}`} />
                      </button>
                    </td>

                    {/* Stock / Availability Toggle Button */}
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleStockToggle(product)}
                        disabled={togglingId === product.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                          product.inStock
                            ? 'bg-[#277A45]/20 text-[#4ade80] border border-[#277A45]/40 hover:bg-[#277A45]/30'
                            : product.availability === 'Available on Order'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle availability"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.inStock
                              ? 'bg-[#4ade80]'
                              : product.availability === 'Available on Order'
                              ? 'bg-amber-400'
                              : 'bg-rose-400'
                          }`}
                        />
                        <span>{product.availability || (product.inStock ? 'In Stock' : 'Out of Stock')}</span>
                      </button>
                    </td>

                    {/* Edit Button */}
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-[#C99A3E] text-white/80 hover:text-[#071A36] border border-[#C99A3E]/20 hover:border-[#C99A3E] transition-all inline-flex items-center gap-1 text-xs"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
