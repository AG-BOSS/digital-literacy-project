import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Star,
  FileCheck
} from 'lucide-react';
import {
  fetchCategories,
  fetchSubcategories,
  getProductById,
  createProduct,
  updateProduct,
  type AdminCategory,
  type AdminSubcategory,
  type ProductInput
} from '../../services/productService';
import { uploadProductImage, getProductImageUrl } from '../../lib/supabase';
import type { AvailabilityStatus } from '../../types';

interface AdminProductFormProps {
  mode: 'create' | 'edit';
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Reference Data
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [subcategories, setSubcategories] = useState<AdminSubcategory[]>([]);

  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<string>('');
  const [priceOnRequest, setPriceOnRequest] = useState(false);
  const [unit, setUnit] = useState('1 Piece');
  const [availability, setAvailability] = useState<AvailabilityStatus>('In Stock');
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [features, setFeatures] = useState<string[]>(['']);

  // Loading & Feedback
  const [loadingInitial, setLoadingInitial] = useState(mode === 'edit');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Load Categories & Initial Product Data
  useEffect(() => {
    const init = async () => {
      const [cats, subs] = await Promise.all([
        fetchCategories(),
        fetchSubcategories()
      ]);
      setCategories(cats);
      setSubcategories(subs);

      if (mode === 'create' && cats.length > 0) {
        setCategoryId(cats[0].id);
      }

      if (mode === 'edit' && id) {
        setLoadingInitial(true);
        const prod = await getProductById(id);
        if (prod) {
          setName(prod.name || '');
          setCategoryId(prod.category_id || (cats[0]?.id ?? ''));
          setSubcategoryId(prod.subcategory_id || '');
          setDescription(prod.description || '');

          const hasNumericPrice = prod.price !== null && prod.price !== undefined && Number(prod.price) > 0;
          setPrice(hasNumericPrice ? String(prod.price) : '');
          setPriceOnRequest(Boolean(prod.price_on_request || !hasNumericPrice));

          setUnit(prod.unit || '1 Piece');
          setAvailability(prod.availability || (prod.in_stock ? 'In Stock' : 'Available on Order'));
          setInStock(Boolean(prod.in_stock));
          setImageUrl(prod.image_url || '');
          setIsFeatured(Boolean(prod.is_best_seller));
          setIsNew(Boolean(prod.is_new));

          let parsedFeats: string[] = [''];
          if (Array.isArray(prod.features) && prod.features.length > 0) {
            parsedFeats = prod.features;
          } else if (typeof prod.features === 'string') {
            try {
              const arr = JSON.parse(prod.features);
              if (Array.isArray(arr) && arr.length > 0) parsedFeats = arr;
            } catch {
              parsedFeats = [prod.features];
            }
          }
          setFeatures(parsedFeats);
        }
        setLoadingInitial(false);
      }
    };

    init();
  }, [mode, id]);

  // Filter subcategories for the selected category
  const filteredSubcategories = subcategories.filter(
    (s) => !categoryId || s.category_id === categoryId
  );

  // Handle Feature item updates
  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    if (features.length <= 1) {
      setFeatures(['']);
      return;
    }
    setFeatures(features.filter((_, i) => i !== index));
  };

  // Image Upload handler with client-side format and size validation
  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation: Accept JPG, PNG, WEBP
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setFeedback({
        type: 'error',
        text: 'Unsupported image format. Please select a JPG, PNG, or WEBP file.'
      });
      return;
    }

    // Client-side validation: Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      setFeedback({
        type: 'error',
        text: 'Image file is too large. Please select an image under 10 MB.'
      });
      return;
    }

    setSelectedFileName(file.name);

    // Determine target folder based on category name
    const currentCat = categories.find((c) => c.id === categoryId)?.name || '';
    let targetFolder: 'cakes' | 'balloons' | 'party' | 'disposables' = 'party';

    if (currentCat.toLowerCase().includes('cake')) {
      targetFolder = 'cakes';
    } else if (currentCat.toLowerCase().includes('disposable')) {
      targetFolder = 'disposables';
    } else if (
      currentCat.toLowerCase().includes('party') ||
      currentCat.toLowerCase().includes('birthday')
    ) {
      targetFolder = 'balloons';
    }

    setIsUploadingImage(true);
    setFeedback(null);
    try {
      const publicUrl = await uploadProductImage(file, targetFolder);
      if (publicUrl) {
        setImageUrl(publicUrl);
        setFeedback({
          type: 'success',
          text: `Image "${file.name}" successfully uploaded to store-images bucket!`
        });
      } else {
        setFeedback({
          type: 'error',
          text: 'Upload failed: Please check Supabase Storage "store-images" bucket permissions.'
        });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Image upload failed.' });
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim()) {
      setFeedback({ type: 'error', text: 'Product title is required.' });
      return;
    }

    if (!categoryId) {
      setFeedback({ type: 'error', text: 'Please select a primary department.' });
      return;
    }

    setIsSubmitting(true);

    const cleanedFeatures = features.map((f) => f.trim()).filter(Boolean);

    // Price handling: If price is empty or priceOnRequest is checked, store strictly as NULL
    const isExplicitlyPriceOnRequest = priceOnRequest || !price.trim();
    const finalNumericPrice =
      !isExplicitlyPriceOnRequest && price.trim() && Number(price) > 0
        ? Number(price)
        : null;

    const payload: ProductInput = {
      name: name.trim(),
      category_id: categoryId,
      subcategory_id: subcategoryId || null,
      description: description.trim() || undefined,
      price: finalNumericPrice,
      price_on_request: isExplicitlyPriceOnRequest,
      unit: unit.trim() || '1 Piece',
      availability,
      in_stock: inStock,
      image_url: imageUrl.trim() || undefined,
      is_best_seller: isFeatured,
      is_featured: isFeatured,
      is_new: isNew,
      features: cleanedFeatures
    };

    let result;
    if (mode === 'create') {
      result = await createProduct(payload);
    } else if (id) {
      result = await updateProduct(id, payload);
    }

    setIsSubmitting(false);

    if (result?.success) {
      setFeedback({
        type: 'success',
        text: `Product was successfully ${mode === 'create' ? 'published' : 'saved'}!`
      });
      setTimeout(() => {
        navigate('/admin/products');
      }, 1000);
    } else {
      setFeedback({
        type: 'error',
        text: result?.error || `Failed to ${mode} product.`
      });
    }
  };

  if (loadingInitial) {
    return (
      <div className="py-24 text-center text-white/50 text-sm flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C99A3E] animate-spin mb-3" />
        <span>Loading product details...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between border-b border-[#C99A3E]/15 pb-4">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70 hover:text-[#C99A3E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#C99A3E]/15 text-[#C99A3E] border border-[#C99A3E]/30 uppercase tracking-wider">
          {mode === 'create' ? 'New Product' : 'Edit Product'}
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {mode === 'create' ? 'Add New Celebration Product' : `Edit "${name || 'Product'}"`}
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-1">
          {mode === 'create'
            ? 'Publish a new item to the Shri Shyam Celebrations catalog and Supabase database'
            : 'Update product pricing, availability, units, features, or images'}
        </p>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            feedback.type === 'success'
              ? 'bg-[#277A45]/20 border-[#277A45]/40 text-[#4ade80]'
              : 'bg-rose-500/20 border-rose-500/40 text-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <span className="leading-relaxed">{feedback.text}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Info */}
        <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-7 shadow-xl shadow-black/20 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <span>1. Product Overview</span>
          </h2>

          {/* Product Title */}
          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Metallic Gold DIY Balloon Garland Arch Kit (70 Pcs)"
              className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all"
            />
          </div>

          {/* Category & Subcategory Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Department / Category *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setSubcategoryId(''); // reset subcategory on category change
                }}
                className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E] transition-all"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Subcategory Section
              </label>
              <select
                value={subcategoryId}
                onChange={(e) => setSubcategoryId(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E] transition-all"
              >
                <option value="">-- General / No Subcategory --</option>
                {filteredSubcategories.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description highlighting celebration usage, dimensions and quality..."
              className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all"
            />
          </div>
        </div>

        {/* Section 2: Pricing, Units & Availability */}
        <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-7 shadow-xl shadow-black/20 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <span>2. Pricing & Availability Controls</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                  Numeric Price (₹)
                </label>
                {priceOnRequest && (
                  <span className="text-[10px] text-[#C99A3E] font-bold">Stored as NULL</span>
                )}
              </div>
              <input
                type="number"
                min="0"
                step="1"
                disabled={priceOnRequest}
                value={priceOnRequest ? '' : price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={priceOnRequest ? 'Price on Request' : 'e.g. 149'}
                className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all disabled:opacity-50 disabled:bg-[#071629]"
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Unit / Specification
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="1 Piece, Pack of 12, Set of 25..."
                className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all"
              />
            </div>

            {/* Availability Status */}
            <div>
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                Availability Status
              </label>
              <select
                value={availability}
                onChange={(e) => {
                  const val = e.target.value as AvailabilityStatus;
                  setAvailability(val);
                  setInStock(val === 'In Stock');
                }}
                className="w-full px-4 py-3 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm focus:outline-none focus:border-[#C99A3E] transition-all"
              >
                <option value="In Stock">Available (In Stock)</option>
                <option value="Available on Order">Available on Order</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Toggles Row */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Price on Request Toggle */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/20 cursor-pointer hover:border-[#C99A3E]/40 transition-all">
              <input
                type="checkbox"
                checked={priceOnRequest}
                onChange={(e) => {
                  setPriceOnRequest(e.target.checked);
                  if (e.target.checked) {
                    setPrice('');
                  }
                }}
                className="w-4 h-4 rounded text-[#C99A3E] focus:ring-0 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-white block">Price on Request</span>
                <span className="text-[11px] text-white/50 block mt-0.5">
                  Leaves numeric price empty (NULL) and prompts for WhatsApp rate
                </span>
              </div>
            </label>

            {/* Featured Product Toggle (Section 8) */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/20 cursor-pointer hover:border-[#C99A3E]/40 transition-all">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-[#C99A3E] focus:ring-0 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#C99A3E] fill-current" />
                  <span>Featured Product</span>
                </span>
                <span className="text-[11px] text-white/50 block mt-0.5">
                  Display in Featured Products section on Homepage
                </span>
              </div>
            </label>

            {/* New Product Tag */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0A2540] border border-[#C99A3E]/20 cursor-pointer hover:border-[#C99A3E]/40 transition-all">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-4 h-4 rounded text-[#C99A3E] focus:ring-0 mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>New Arrival Badge</span>
                </span>
                <span className="text-[11px] text-white/50 block mt-0.5">
                  Highlight as a recent arrival in store
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Section 3: Image Upload & Storage Bucket (Sections 12 & 13) */}
        <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-7 shadow-xl shadow-black/20 space-y-5">
          <h2 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <span>3. Product Image & Storage Bucket</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Image Preview */}
            <div className="w-36 h-36 rounded-2xl bg-[#0A2540] border border-[#C99A3E]/30 overflow-hidden flex items-center justify-center shrink-0 relative group">
              {imageUrl ? (
                <img
                  src={getProductImageUrl(imageUrl)}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3">
                  <ImageIcon className="w-8 h-8 text-white/30 mx-auto mb-1" />
                  <span className="text-[11px] text-white/40">No image</span>
                </div>
              )}
            </div>

            {/* Upload Controls */}
            <div className="flex-1 space-y-3 w-full">
              <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                Upload to Supabase Storage (<code className="text-[#C99A3E]">store-images</code>)
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A2540] hover:bg-[#C99A3E] text-white hover:text-[#071A36] border border-[#C99A3E]/30 hover:border-[#C99A3E] text-xs font-bold transition-all shadow">
                  <Upload className="w-4 h-4" />
                  <span>{isUploadingImage ? 'Uploading Image...' : imageUrl ? 'Replace Image' : 'Select & Upload Image'}</span>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                    onChange={handleImageFileSelect}
                    disabled={isUploadingImage}
                    className="hidden"
                  />
                </label>

                {selectedFileName && (
                  <span className="inline-flex items-center gap-1 text-xs text-white/70 bg-white/5 px-2.5 py-1.5 rounded-lg">
                    <FileCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                    <span className="truncate max-w-[200px]">{selectedFileName}</span>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-white/50 leading-relaxed">
                Accepted formats: <strong className="text-white/80">JPG, PNG, WEBP</strong> (Max: 10 MB).
                Uploaded files are saved to the secure Supabase Storage bucket and publicly served with CDN caching.
              </p>

              {/* Direct URL input fallback */}
              <div>
                <label className="block text-[11px] text-white/40 uppercase tracking-wider mb-1">
                  Or Image Path / Storage URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/assets/category_balloons.jpg or Supabase public URL"
                  className="w-full px-3 py-2 bg-[#0A2540] border border-[#C99A3E]/20 rounded-xl text-white text-xs placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Specifications & Highlights */}
        <div className="bg-[#071A36] border border-[#C99A3E]/20 rounded-3xl p-5 sm:p-7 shadow-xl shadow-black/20 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-base font-bold text-white">4. Key Features & Highlights</h2>
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C99A3E] hover:underline"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Highlight Point</span>
            </button>
          </div>

          <div className="space-y-3">
            {features.map((feat, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feat}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature bullet #${index + 1} (e.g. "Durable latex, helium supported")`}
                  className="flex-1 px-4 py-2.5 bg-[#0A2540] border border-[#C99A3E]/25 rounded-xl text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#C99A3E] transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all"
                  title="Remove bullet point"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Form Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/admin/products"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || isUploadingImage}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-[#C99A3E] to-[#B3832B] text-[#071A36] text-sm font-bold shadow-lg shadow-[#C99A3E]/25 hover:brightness-105 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Product...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{mode === 'create' ? 'Publish Product' : 'Save Changes'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
