import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Plus,
  Edit3,
  Trash2,
  AlertTriangle,
  RefreshCw,
  FolderTree,
  X,
  Package,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import {
  fetchCategories,
  fetchSubcategories,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  fetchProducts,
  type AdminCategory,
  type AdminSubcategory
} from '../../services/productService';
import type { Product } from '../../types';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Category Modal state
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImageUrl, setCatImageUrl] = useState('');

  // Subcategory Modal state
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<AdminSubcategory | null>(null);
  const [subCategoryId, setSubCategoryId] = useState('');
  const [subName, setSubName] = useState('');
  const [subSlug, setSubSlug] = useState('');

  // Deletion Modal state
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'category' | 'subcategory';
    id: string;
    name: string;
    productCount: number;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [cats, subs, { products: prods }] = await Promise.all([
      fetchCategories(),
      fetchSubcategories(),
      fetchProducts()
    ]);
    setCategories(cats);
    setSubcategories(subs);
    setProducts(prods);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute product counts dynamically from live products
  const categoryProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      counts[cat.id] = products.filter((p) => p.mainCategory === cat.name).length;
    }
    return counts;
  }, [categories, products]);

  const subcategoryProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sub of subcategories) {
      counts[sub.id] = products.filter((p) => p.subCategory === sub.name).length;
    }
    return counts;
  }, [subcategories, products]);

  const openCategoryModal = (cat?: AdminCategory) => {
    if (cat) {
      setEditingCategory(cat);
      setCatName(cat.name);
      setCatSlug(cat.slug);
      setCatDescription(cat.description || '');
      setCatImageUrl(cat.image_url || '');
    } else {
      setEditingCategory(null);
      setCatName('');
      setCatSlug('');
      setCatDescription('');
      setCatImageUrl('');
    }
    setCatModalOpen(true);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    // Prevent duplicate category names
    const isDuplicate = categories.some(
      (c) =>
        c.name.toLowerCase().trim() === catName.toLowerCase().trim() &&
        (!editingCategory || c.id !== editingCategory.id)
    );
    if (isDuplicate) {
      setFeedback({ type: 'error', text: `A department named "${catName.trim()}" already exists.` });
      return;
    }

    const slug = catSlug.trim() || catName.trim().toLowerCase().replace(/\s+/g, '-');

    let res;
    if (editingCategory) {
      res = await updateCategory(editingCategory.id, {
        name: catName,
        slug,
        description: catDescription,
        image_url: catImageUrl
      });
    } else {
      res = await createCategory({
        name: catName,
        slug,
        description: catDescription,
        image_url: catImageUrl
      });
    }

    if (res.success) {
      setFeedback({ type: 'success', text: `Department "${catName}" successfully saved.` });
      setCatModalOpen(false);
      loadData();
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save category.' });
    }
  };

  const openSubcategoryModal = (sub?: AdminSubcategory, presetCatId?: string) => {
    if (sub) {
      setEditingSubcategory(sub);
      setSubCategoryId(sub.category_id);
      setSubName(sub.name);
      setSubSlug(sub.slug);
    } else {
      setEditingSubcategory(null);
      setSubCategoryId(presetCatId || categories[0]?.id || '');
      setSubName('');
      setSubSlug('');
    }
    setSubModalOpen(true);
  };

  const handleSubcategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subCategoryId) return;

    // Prevent duplicate subcategory names within same parent category
    const isDuplicate = subcategories.some(
      (s) =>
        s.category_id === subCategoryId &&
        s.name.toLowerCase().trim() === subName.toLowerCase().trim() &&
        (!editingSubcategory || s.id !== editingSubcategory.id)
    );
    if (isDuplicate) {
      setFeedback({
        type: 'error',
        text: `A subcategory named "${subName.trim()}" already exists in this department.`
      });
      return;
    }

    const slug = subSlug.trim() || subName.trim().toLowerCase().replace(/\s+/g, '-');

    let res;
    if (editingSubcategory) {
      res = await updateSubcategory(editingSubcategory.id, {
        category_id: subCategoryId,
        name: subName,
        slug
      });
    } else {
      res = await createSubcategory({
        category_id: subCategoryId,
        name: subName,
        slug
      });
    }

    if (res.success) {
      setFeedback({ type: 'success', text: `Subcategory "${subName}" successfully saved.` });
      setSubModalOpen(false);
      loadData();
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to save subcategory.' });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    // Block deletion if products are assigned
    if (deleteTarget.productCount > 0) {
      setFeedback({
        type: 'error',
        text: `Cannot delete "${deleteTarget.name}": ${deleteTarget.productCount} product(s) are currently assigned to it. Reassign or remove the products first.`
      });
      setDeleteTarget(null);
      return;
    }

    setIsDeleting(true);
    let res;
    if (deleteTarget.type === 'category') {
      res = await deleteCategory(deleteTarget.id);
    } else {
      res = await deleteSubcategory(deleteTarget.id);
    }
    setIsDeleting(false);

    if (res.success) {
      setFeedback({ type: 'success', text: `"${deleteTarget.name}" was successfully deleted.` });
      setDeleteTarget(null);
      loadData();
    } else {
      setFeedback({ type: 'error', text: res.error || 'Failed to delete.' });
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C99A3E]/15 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C99A3E]">
              Store Organization
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/50">
              {categories.length} Departments, {subcategories.length} Subcategories
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Categories & Subcategories
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/30 text-white/80 hover:text-white hover:border-[#C99A3E] transition-all disabled:opacity-50"
            title="Refresh"
            aria-label="Refresh categories"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C99A3E]' : ''}`} />
          </button>
          <button
            onClick={() => openSubcategoryModal()}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#0A2540] border border-[#C99A3E]/30 hover:border-[#C99A3E] text-white transition-all"
          >
            <Plus className="w-4 h-4 text-[#C99A3E]" />
            <span>Add Subcategory</span>
          </button>
          <button
            onClick={() => openCategoryModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] shadow-lg shadow-[#C99A3E]/20 hover:brightness-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-[#277A45]/20 border-[#277A45]/40 text-[#4ade80]'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
          }`}
        >
          <span>{feedback.text}</span>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 hover:bg-white/10 rounded-lg"
            aria-label="Dismiss feedback"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Categories Grid (Section 17: Category → Subcategories → Product Count) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#C99A3E]" />
            <span>Core Departments ({categories.length})</span>
          </h2>
          <span className="text-xs text-white/40">Includes live product distribution</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const childSubs = subcategories.filter((s) => s.category_id === cat.id);
            const prodCount = categoryProductCounts[cat.id] ?? 0;

            return (
              <div
                key={cat.id}
                className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 shadow-xl shadow-black/20 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#C99A3E]/15 text-[#C99A3E] border border-[#C99A3E]/30 uppercase tracking-widest font-mono">
                      {cat.slug}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openCategoryModal(cat)}
                        className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-[#C99A3E] text-white/70 hover:text-[#071A36] transition-all"
                        title="Edit department"
                        aria-label="Edit department"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            type: 'category',
                            id: cat.id,
                            name: cat.name,
                            productCount: prodCount
                          })
                        }
                        className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-rose-500 text-white/70 hover:text-white transition-all"
                        title="Delete department"
                        aria-label="Delete department"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-white/50 mt-1.5 leading-relaxed line-clamp-2">
                    {cat.description || 'Core celebration department in catalog.'}
                  </p>

                  {/* Live Statistics Badge */}
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-[#0A2540] border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase block">Products</span>
                      <Link
                        to={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                        className="text-base font-extrabold text-[#C99A3E] hover:underline"
                      >
                        {prodCount}
                      </Link>
                    </div>
                    <div className="p-2 rounded-xl bg-[#0A2540] border border-white/5">
                      <span className="text-[10px] text-white/40 uppercase block">Subcategories</span>
                      <span className="text-base font-extrabold text-white">
                        {childSubs.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <Link
                    to={`/admin/products?category=${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-1 text-[#C99A3E] hover:underline font-semibold"
                  >
                    <span>View Products</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <button
                    onClick={() => openSubcategoryModal(undefined, cat.id)}
                    className="text-white/60 hover:text-white text-xs font-semibold"
                  >
                    + Add sub
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subcategories Table Card (Section 17: Category → Subcategories → Product Count) */}
      <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-6 shadow-xl shadow-black/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#C99A3E]" />
              <span>Store Subcategories ({subcategories.length})</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              Organized by parent department with live product counts
            </p>
          </div>
          <button
            onClick={() => openSubcategoryModal()}
            className="text-xs text-[#C99A3E] font-bold hover:underline"
          >
            + Add New
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-white/40 text-sm">Loading subcategories...</div>
        ) : (
          <div className="overflow-x-auto -mx-5 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#C99A3E]/15 text-white/50 text-[11px] uppercase tracking-wider">
                  <th className="pb-3 px-3">Subcategory Name</th>
                  <th className="pb-3 px-3">Parent Department</th>
                  <th className="pb-3 px-3">Slug Identifier</th>
                  <th className="pb-3 px-3 text-center">Assigned Products</th>
                  <th className="pb-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C99A3E]/10">
                {subcategories.map((sub) => {
                  const parent = categories.find((c) => c.id === sub.category_id);
                  const pCount = subcategoryProductCounts[sub.id] ?? 0;

                  return (
                    <tr key={sub.id} className="hover:bg-[#0A2540]/60 transition-colors">
                      <td className="py-3 px-3 font-semibold text-white">
                        {sub.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#0A2540] border border-[#C99A3E]/20 text-[#F8F3E8]">
                          {parent?.name || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-white/50">
                        {sub.slug}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <Link
                          to={`/admin/products?category=${encodeURIComponent(
                            parent?.name || ''
                          )}&subcategory=${encodeURIComponent(sub.name)}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A2540] border border-[#C99A3E]/20 text-xs font-bold text-[#C99A3E] hover:border-[#C99A3E] transition-all"
                        >
                          <Package className="w-3 h-3" />
                          <span>{pCount}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openSubcategoryModal(sub)}
                            className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-[#C99A3E] text-white/70 hover:text-[#071A36] transition-all"
                            title="Edit subcategory"
                            aria-label="Edit subcategory"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteTarget({
                                type: 'subcategory',
                                id: sub.id,
                                name: sub.name,
                                productCount: pCount
                              })
                            }
                            className="p-1.5 rounded-lg bg-[#0A2540] hover:bg-rose-500 text-white/70 hover:text-white transition-all"
                            title="Delete subcategory"
                            aria-label="Delete subcategory"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Category Create/Edit Modal */}
      {catModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#071A36] border border-[#C99A3E]/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl shadow-black/80 space-y-4">
            <div className="flex items-center justify-between border-b border-[#C99A3E]/20 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingCategory ? `Edit Department "${editingCategory.name}"` : 'Add New Department'}
              </h3>
              <button
                onClick={() => setCatModalOpen(false)}
                className="p-1 text-white/40 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Cake Items, Disposable Items"
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Slug (URL Identifier)
                </label>
                <input
                  type="text"
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value)}
                  placeholder="cake-items"
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="Short department overview..."
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={catImageUrl}
                  onChange={(e) => setCatImageUrl(e.target.value)}
                  placeholder="/assets/category_cakes.jpg"
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCatModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] text-xs font-bold shadow-md hover:brightness-105"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subcategory Create/Edit Modal */}
      {subModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#071A36] border border-[#C99A3E]/30 rounded-3xl p-6 max-w-lg w-full shadow-2xl shadow-black/80 space-y-4">
            <div className="flex items-center justify-between border-b border-[#C99A3E]/20 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingSubcategory ? `Edit Subcategory "${editingSubcategory.name}"` : 'Add Subcategory'}
              </h3>
              <button
                onClick={() => setSubModalOpen(false)}
                className="p-1 text-white/40 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubcategorySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Parent Department *
                </label>
                <select
                  required
                  value={subCategoryId}
                  onChange={(e) => setSubCategoryId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Subcategory Name *
                </label>
                <input
                  type="text"
                  required
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  placeholder="e.g. Stands & Props, Foil Balloons"
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                  Slug (URL Identifier)
                </label>
                <input
                  type="text"
                  value={subSlug}
                  onChange={(e) => setSubSlug(e.target.value)}
                  placeholder="stands-and-props"
                  className="w-full px-3.5 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#C99A3E]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] text-xs font-bold shadow-md hover:brightness-105"
                >
                  Save Subcategory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deletion Safety Modal (Section 18) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#071A36] border border-rose-500/40 rounded-3xl p-6 max-w-md w-full shadow-2xl shadow-black/80 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">
                  Delete {deleteTarget.type === 'category' ? 'Department' : 'Subcategory'}?
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Target: <strong className="text-white font-semibold">"{deleteTarget.name}"</strong>
                </p>
              </div>
            </div>

            {/* If products are assigned, explicitly disallow deletion and explain safe action */}
            {deleteTarget.productCount > 0 ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 text-xs text-amber-200">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Deletion Blocked: Products Assigned</span>
                </div>
                <p className="leading-relaxed text-[11px]">
                  Cannot delete this {deleteTarget.type} while{' '}
                  <strong className="text-white font-bold">{deleteTarget.productCount}</strong> products are currently assigned to it. Move or reassign those products first to prevent orphan data.
                </p>
                <div className="pt-1">
                  <Link
                    to={`/admin/products?${deleteTarget.type}=${encodeURIComponent(deleteTarget.name)}`}
                    onClick={() => setDeleteTarget(null)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#C99A3E] hover:underline"
                  >
                    <span>View assigned products →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-xs text-white/70 leading-relaxed">
                This {deleteTarget.type} has 0 assigned products and can be safely removed. Are you sure you want to delete it permanently?
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                {deleteTarget.productCount > 0 ? 'Close' : 'Cancel'}
              </button>
              {deleteTarget.productCount === 0 && (
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
