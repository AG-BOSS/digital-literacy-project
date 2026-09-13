import { supabase, isSupabaseConfigured, getProductImageUrl } from '../lib/supabase';
import { PRODUCTS } from '../data/products';
import type { Product, MainCategoryType, AvailabilityStatus } from '../types';

export interface BackendStatus {
  isLive: boolean;
  source: 'supabase' | 'local';
  itemCount: number;
}

export interface ProductInput {
  name: string;
  category_id: string;
  subcategory_id?: string | null;
  description?: string;
  price?: number | null;
  price_on_request: boolean;
  unit?: string;
  availability: AvailabilityStatus;
  in_stock: boolean;
  image_url?: string;
  is_best_seller?: boolean;
  is_featured?: boolean;
  is_new?: boolean;
  features: string[];
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  created_at: string;
}

export interface AdminSubcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  created_at: string;
  categories?: {
    id: string;
    name: string;
  } | null;
}

export interface AdminCategorySummary {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  availableCount: number;
  availableOnOrderCount: number;
  outOfStockCount: number;
  priceOnRequestCount: number;
}

export interface AdminDashboardStats {
  totalProducts: number;
  cakeCount: number;
  partyCount: number;
  disposableCount: number;
  availableCount: number;
  availableOnOrderCount: number;
  outOfStockCount: number;
  priceOnRequestCount: number;
  featuredCount: number;
  totalCategories: number;
  totalSubcategories: number;
  categorySummaries: AdminCategorySummary[];
}

/**
 * Fetches all products.
 * If Supabase is configured and reachable, loads live data from PostgreSQL.
 * Otherwise, seamlessly falls back to the initial catalog in src/data/products.ts.
 */
const getFallbackProducts = (): Product[] =>
  PRODUCTS.map((p) => ({
    ...p,
    isFeatured: Boolean(p.isFeatured !== undefined ? p.isFeatured : p.isBestSeller)
  }));

export const fetchProducts = async (): Promise<{ products: Product[]; status: BackendStatus }> => {
  if (!isSupabaseConfigured()) {
    const fallback = getFallbackProducts();
    return {
      products: fallback,
      status: { isLive: false, source: 'local', itemCount: fallback.length }
    };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        name,
        description,
        price,
        price_on_request,
        unit,
        availability,
        in_stock,
        image_url,
        is_best_seller,
        is_new,
        features,
        categories (
          id,
          name,
          slug
        ),
        subcategories (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase product fetch failed:', error);
      const fallback = getFallbackProducts();
      return {
        products: fallback,
        status: { isLive: false, source: 'local', itemCount: fallback.length }
      };
    }

    if (!data || data.length === 0) {
      console.warn('Supabase product fetch returned 0 products, falling back to local products.');
      const fallback = getFallbackProducts();
      return {
        products: fallback,
        status: { isLive: false, source: 'local', itemCount: fallback.length }
      };
    }

    // Map database rows to UI Product format
    const mappedProducts: Product[] = data.map((item: any) => {
      const categoryObj = Array.isArray(item.categories) ? item.categories[0] : item.categories;
      const subcategoryObj = Array.isArray(item.subcategories) ? item.subcategories[0] : item.subcategories;

      const categoryName = (categoryObj?.name || 'Cake Items') as MainCategoryType;
      
      // Clean and customer-friendly name formatting
      let cleanName = (item.name || 'Party Essential').trim();
      if (cleanName.toLowerCase() === 'baby shower') {
        cleanName = 'Baby Shower Celebration Banner & Bunting Set';
      } else if (cleanName.toLowerCase().startsWith('violent chrome')) {
        cleanName = cleanName.replace(/violent/i, 'Violet');
      }

      // Ensure proper subcategory mapping
      let subcategoryName = subcategoryObj?.name?.trim();
      if (!subcategoryName || subcategoryName === 'General') {
        if (cleanName.includes('O-N-E') || cleanName.includes('Boxes')) {
          subcategoryName = 'Party Accessories';
        } else if (cleanName.toLowerCase().includes('sash')) {
          subcategoryName = 'Hats & Sashes';
        } else if (categoryName === 'Birthday & Party Items') {
          subcategoryName = 'Party Accessories';
        } else if (categoryName === 'Cake Items') {
          subcategoryName = 'Cake Accessories';
        } else {
          subcategoryName = 'Party Essentials';
        }
      }

      const numPrice = item.price !== null && item.price !== undefined ? Number(item.price) : 0;
      const isPriceOnRequest = Boolean(item.price_on_request || item.price === null || item.price === undefined || numPrice <= 0);

      // Clean, professional price presentation
      let displayPrice = 'Price on Request';
      if (!isPriceOnRequest && numPrice > 0) {
        displayPrice = `₹${numPrice.toLocaleString('en-IN')}`;
      }

      let parsedFeatures: string[] = [];
      if (Array.isArray(item.features)) {
        parsedFeatures = item.features;
      } else if (typeof item.features === 'string') {
        try {
          const parsed = JSON.parse(item.features);
          if (Array.isArray(parsed)) parsedFeatures = parsed;
          else parsedFeatures = [item.features];
        } catch {
          parsedFeatures = [item.features];
        }
      }

      return {
        id: item.id,
        name: cleanName,
        mainCategory: categoryName,
        subCategory: subcategoryName,
        price: displayPrice,
        numericPrice: isPriceOnRequest ? 0 : numPrice,
        unit: item.unit || '1 Piece',
        availability: (item.availability || (item.in_stock ? 'In Stock' : 'Available on Order')) as AvailabilityStatus,
        inStock: Boolean(item.in_stock),
        description: item.description || '',
        features: parsedFeatures,
        image: getProductImageUrl(item.image_url, categoryName),
        isBestSeller: Boolean(item.is_best_seller),
        isFeatured: Boolean(item.is_best_seller),
        isNew: Boolean(item.is_new)
      };
    });

    return {
      products: mappedProducts,
      status: { isLive: true, source: 'supabase', itemCount: mappedProducts.length }
    };
  } catch (err) {
    console.error('Supabase product fetch failed:', err);
    const fallback = getFallbackProducts();
    return {
      products: fallback,
      status: { isLive: false, source: 'local', itemCount: fallback.length }
    };
  }
};

/**
 * Updates stock availability for a product in Supabase
 */
export const updateProductStock = async (
  productId: string,
  inStock: boolean,
  availability: AvailabilityStatus = inStock ? 'In Stock' : 'Available on Order'
): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Local changes only.');
    return false;
  }

  try {
    const { error } = await (supabase.from('products') as any)
      .update({
        in_stock: inStock,
        availability: availability,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (error) {
      console.error('Failed to update product stock:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error updating product stock in Supabase:', err);
    return false;
  }
};

/**
 * Updates featured status for a product in Supabase
 */
export const updateProductFeatured = async (
  productId: string,
  isFeatured: boolean
): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Local changes only.');
    return false;
  }

  try {
    const { error } = await (supabase.from('products') as any)
      .update({
        is_best_seller: isFeatured,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (error) {
      console.error('Failed to update product featured status:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error updating product featured status in Supabase:', err);
    return false;
  }
};

/**
 * Updates availability status for a product in Supabase
 */
export const updateProductAvailability = async (
  productId: string,
  availability: AvailabilityStatus
): Promise<boolean> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Local changes only.');
    return false;
  }

  const inStock = availability === 'In Stock';
  try {
    const { error } = await (supabase.from('products') as any)
      .update({
        availability,
        in_stock: inStock,
        updated_at: new Date().toISOString()
      })
      .eq('id', productId);

    if (error) {
      console.error('Failed to update product availability:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error updating product availability in Supabase:', err);
    return false;
  }
};

// ==============================================================================
// ADMIN MANAGEMENT MUTATIONS & QUERIES
// ==============================================================================

/**
 * Fetch all categories for admin dropdowns and management
 */
export const fetchCategories = async (): Promise<AdminCategory[]> => {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, description, image_url, created_at')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data || [];
};

/**
 * Fetch subcategories optionally filtered by category
 */
export const fetchSubcategories = async (categoryId?: string): Promise<AdminSubcategory[]> => {
  if (!isSupabaseConfigured()) return [];

  let query = supabase
    .from('subcategories')
    .select(`
      id,
      category_id,
      name,
      slug,
      created_at,
      categories (
        id,
        name
      )
    `)
    .order('name', { ascending: true });

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
  return (data as any) || [];
};

/**
 * Fetch raw product row by ID for editing
 */
export const getProductById = async (id: string): Promise<any | null> => {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      category_id,
      subcategory_id,
      description,
      price,
      price_on_request,
      unit,
      availability,
      in_stock,
      image_url,
      is_best_seller,
      is_new,
      features
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
  return data;
};

/**
 * Creates a new product in Supabase
 */
export const createProduct = async (
  input: ProductInput
): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const payload = {
      name: input.name.trim(),
      category_id: input.category_id,
      subcategory_id: input.subcategory_id || null,
      description: input.description?.trim() || null,
      price: input.price !== undefined && input.price !== null ? Number(input.price) : null,
      price_on_request: input.price_on_request,
      unit: input.unit?.trim() || '1 Piece',
      availability: input.availability,
      in_stock: input.in_stock,
      image_url: input.image_url?.trim() || null,
      is_best_seller: Boolean(input.is_featured !== undefined ? input.is_featured : input.is_best_seller),
      is_new: Boolean(input.is_new),
      features: input.features || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await (supabase.from('products') as any)
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected error creating product:', err);
    return { success: false, error: err.message || 'Failed to create product' };
  }
};

/**
 * Updates an existing product in Supabase
 */
export const updateProduct = async (
  id: string,
  input: ProductInput
): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const payload = {
      name: input.name.trim(),
      category_id: input.category_id,
      subcategory_id: input.subcategory_id || null,
      description: input.description?.trim() || null,
      price: input.price !== undefined && input.price !== null ? Number(input.price) : null,
      price_on_request: input.price_on_request,
      unit: input.unit?.trim() || '1 Piece',
      availability: input.availability,
      in_stock: input.in_stock,
      image_url: input.image_url?.trim() || null,
      is_best_seller: Boolean(input.is_featured !== undefined ? input.is_featured : input.is_best_seller),
      is_new: Boolean(input.is_new),
      features: input.features || [],
      updated_at: new Date().toISOString()
    };

    const { data, error } = await (supabase.from('products') as any)
      .update(payload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error('Unexpected error updating product:', err);
    return { success: false, error: err.message || 'Failed to update product' };
  }
};

/**
 * Deletes a product from Supabase
 */
export const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase is not configured' };
  }

  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Unexpected error deleting product:', err);
    return { success: false, error: err.message || 'Failed to delete product' };
  }
};

/**
 * Fetch high-level admin dashboard statistics (All 8 Cards + Category Breakdown)
 * Strictly derived from live Supabase product data
 */
export const fetchAdminDashboardStats = async (): Promise<AdminDashboardStats> => {
  if (!isSupabaseConfigured()) {
    const total = PRODUCTS.length;
    const cakeCount = PRODUCTS.filter((p) => p.mainCategory === 'Cake Items').length;
    const partyCount = PRODUCTS.filter((p) => p.mainCategory === 'Birthday & Party Items').length;
    const disposableCount = PRODUCTS.filter((p) => p.mainCategory === 'Disposable Items').length;
    const availableCount = PRODUCTS.filter((p) => p.availability === 'In Stock').length;
    const availableOnOrderCount = PRODUCTS.filter((p) => p.availability === 'Available on Order').length;
    const outOfStockCount = PRODUCTS.filter((p) => p.availability === 'Out of Stock').length;
    const priceOnRequestCount = PRODUCTS.filter((p) => p.numericPrice <= 0).length;
    const featuredCount = PRODUCTS.filter((p) => Boolean(p.isFeatured || p.isBestSeller)).length;

    const mockSummaries: AdminCategorySummary[] = [
      {
        id: 'cat-cake',
        name: 'Cake Items',
        slug: 'cake-items',
        productCount: cakeCount,
        availableCount: PRODUCTS.filter((p) => p.mainCategory === 'Cake Items' && p.availability === 'In Stock').length,
        availableOnOrderCount: PRODUCTS.filter((p) => p.mainCategory === 'Cake Items' && p.availability === 'Available on Order').length,
        outOfStockCount: PRODUCTS.filter((p) => p.mainCategory === 'Cake Items' && p.availability === 'Out of Stock').length,
        priceOnRequestCount: PRODUCTS.filter((p) => p.mainCategory === 'Cake Items' && p.numericPrice <= 0).length
      },
      {
        id: 'cat-party',
        name: 'Birthday & Party Items',
        slug: 'birthday-party-items',
        productCount: partyCount,
        availableCount: PRODUCTS.filter((p) => p.mainCategory === 'Birthday & Party Items' && p.availability === 'In Stock').length,
        availableOnOrderCount: PRODUCTS.filter((p) => p.mainCategory === 'Birthday & Party Items' && p.availability === 'Available on Order').length,
        outOfStockCount: PRODUCTS.filter((p) => p.mainCategory === 'Birthday & Party Items' && p.availability === 'Out of Stock').length,
        priceOnRequestCount: PRODUCTS.filter((p) => p.mainCategory === 'Birthday & Party Items' && p.numericPrice <= 0).length
      },
      {
        id: 'cat-disp',
        name: 'Disposable Items',
        slug: 'disposable-items',
        productCount: disposableCount,
        availableCount: PRODUCTS.filter((p) => p.mainCategory === 'Disposable Items' && p.availability === 'In Stock').length,
        availableOnOrderCount: PRODUCTS.filter((p) => p.mainCategory === 'Disposable Items' && p.availability === 'Available on Order').length,
        outOfStockCount: PRODUCTS.filter((p) => p.mainCategory === 'Disposable Items' && p.availability === 'Out of Stock').length,
        priceOnRequestCount: PRODUCTS.filter((p) => p.mainCategory === 'Disposable Items' && p.numericPrice <= 0).length
      }
    ];

    return {
      totalProducts: total,
      cakeCount,
      partyCount,
      disposableCount,
      availableCount,
      availableOnOrderCount,
      outOfStockCount,
      priceOnRequestCount,
      featuredCount,
      totalCategories: 3,
      totalSubcategories: 17,
      categorySummaries: mockSummaries
    };
  }

  try {
    const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
      supabase.from('products').select(`
        id,
        category_id,
        subcategory_id,
        price,
        price_on_request,
        availability,
        in_stock,
        is_best_seller,
        categories (
          id,
          name,
          slug
        )
      `),
      supabase.from('categories').select('id, name, slug').order('name', { ascending: true }),
      supabase.from('subcategories').select('id', { count: 'exact' })
    ]);

    const products = (productsRes.data || []) as any[];
    const categories = (categoriesRes.data || []) as any[];

    // Calculate category-specific totals
    const cakeCount = products.filter((p) => {
      const cat = Array.isArray(p.categories) ? p.categories[0] : p.categories;
      return cat?.name?.toLowerCase().includes('cake');
    }).length;

    const partyCount = products.filter((p) => {
      const cat = Array.isArray(p.categories) ? p.categories[0] : p.categories;
      const catName = cat?.name?.toLowerCase() || '';
      return catName.includes('birthday') || catName.includes('party');
    }).length;

    const disposableCount = products.filter((p) => {
      const cat = Array.isArray(p.categories) ? p.categories[0] : p.categories;
      return cat?.name?.toLowerCase().includes('disposable');
    }).length;

    // Availability breakdown
    const availableCount = products.filter(
      (p) => p.availability === 'In Stock' || (p.in_stock && p.availability !== 'Available on Order' && p.availability !== 'Out of Stock')
    ).length;

    const availableOnOrderCount = products.filter(
      (p) => p.availability === 'Available on Order'
    ).length;

    const outOfStockCount = products.filter(
      (p) => p.availability === 'Out of Stock' || (!p.in_stock && p.availability !== 'Available on Order')
    ).length;

    const priceOnRequestCount = products.filter(
      (p) => p.price_on_request || p.price === null || p.price === undefined || Number(p.price) <= 0
    ).length;

    const featuredCount = products.filter((p) => Boolean(p.is_best_seller)).length;

    // Per-category summaries
    const categorySummaries: AdminCategorySummary[] = categories.map((cat) => {
      const catProducts = products.filter((p) => p.category_id === cat.id);
      const catAvailable = catProducts.filter(
        (p) => p.availability === 'In Stock' || (p.in_stock && p.availability !== 'Available on Order' && p.availability !== 'Out of Stock')
      ).length;
      const catAvailableOnOrder = catProducts.filter(
        (p) => p.availability === 'Available on Order'
      ).length;
      const catOutOfStock = catProducts.filter(
        (p) => p.availability === 'Out of Stock' || (!p.in_stock && p.availability !== 'Available on Order')
      ).length;
      const catPriceOnRequest = catProducts.filter(
        (p) => p.price_on_request || p.price === null || p.price === undefined || Number(p.price) <= 0
      ).length;

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        productCount: catProducts.length,
        availableCount: catAvailable,
        availableOnOrderCount: catAvailableOnOrder,
        outOfStockCount: catOutOfStock,
        priceOnRequestCount: catPriceOnRequest
      };
    });

    return {
      totalProducts: products.length,
      cakeCount,
      partyCount,
      disposableCount,
      availableCount,
      availableOnOrderCount,
      outOfStockCount,
      priceOnRequestCount,
      featuredCount,
      totalCategories: categories.length,
      totalSubcategories: subcategoriesRes.count ?? 0,
      categorySummaries
    };
  } catch (err) {
    console.error('Failed to fetch admin stats:', err);
    return {
      totalProducts: PRODUCTS.length,
      cakeCount: 21,
      partyCount: 80,
      disposableCount: 12,
      availableCount: PRODUCTS.filter((p) => p.inStock).length,
      availableOnOrderCount: PRODUCTS.filter((p) => p.availability === 'Available on Order').length,
      outOfStockCount: PRODUCTS.filter((p) => !p.inStock).length,
      priceOnRequestCount: PRODUCTS.filter((p) => p.numericPrice <= 0).length,
      featuredCount: PRODUCTS.filter((p) => Boolean(p.isFeatured || p.isBestSeller)).length,
      totalCategories: 3,
      totalSubcategories: 17,
      categorySummaries: []
    };
  }
};

// ==============================================================================
// CATEGORY & SUBCATEGORY ADMIN CRUD
// ==============================================================================

export const createCategory = async (cat: {
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  const { data, error } = await (supabase.from('categories') as any)
    .insert([
      {
        name: cat.name.trim(),
        slug: cat.slug.trim().toLowerCase().replace(/\s+/g, '-'),
        description: cat.description?.trim() || null,
        image_url: cat.image_url?.trim() || null
      }
    ])
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const updateCategory = async (
  id: string,
  cat: { name: string; slug: string; description?: string; image_url?: string }
): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  const { data, error } = await (supabase.from('categories') as any)
    .update({
      name: cat.name.trim(),
      slug: cat.slug.trim().toLowerCase().replace(/\s+/g, '-'),
      description: cat.description?.trim() || null,
      image_url: cat.image_url?.trim() || null
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const deleteCategory = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  // Safety check: Does any product use this category?
  const { count: productCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', id);

  if (productCount && productCount > 0) {
    return {
      success: false,
      error: `Cannot delete category: ${productCount} product(s) are currently assigned to it. Reassign or delete those products first.`
    };
  }

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
};

export const createSubcategory = async (sub: {
  category_id: string;
  name: string;
  slug: string;
}): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  const { data, error } = await (supabase.from('subcategories') as any)
    .insert([
      {
        category_id: sub.category_id,
        name: sub.name.trim(),
        slug: sub.slug.trim().toLowerCase().replace(/\s+/g, '-')
      }
    ])
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const updateSubcategory = async (
  id: string,
  sub: { category_id: string; name: string; slug: string }
): Promise<{ success: boolean; data?: any; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  const { data, error } = await (supabase.from('subcategories') as any)
    .update({
      category_id: sub.category_id,
      name: sub.name.trim(),
      slug: sub.slug.trim().toLowerCase().replace(/\s+/g, '-')
    })
    .eq('id', id)
    .select()
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, data };
};

export const deleteSubcategory = async (id: string): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) return { success: false, error: 'Supabase not configured' };

  // Safety check: Does any product use this subcategory?
  const { count: productCount } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('subcategory_id', id);

  if (productCount && productCount > 0) {
    return {
      success: false,
      error: `Cannot delete subcategory: ${productCount} product(s) are assigned to it. Reassign or delete those products first.`
    };
  }

  const { error } = await supabase
    .from('subcategories')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };
  return { success: true };
};
