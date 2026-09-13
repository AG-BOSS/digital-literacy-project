import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('your-project-id') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

// Create a safe client; if not configured, pass fallback placeholder so app compiles and functions without crashing
export const supabase = createClient<Database>(
  supabaseUrl && supabaseUrl.startsWith('https://') ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

/**
 * Returns a publicly accessible URL for product images.
 * Supports:
 * - Supabase storage paths (e.g. "store-images/cakes/xyz.jpg" or "cakes/xyz.jpg")
 * - Direct HTTP/HTTPS URLs
 * - Local fallback assets (e.g. "/assets/category_cakes.jpg")
 */
export const getProductImageUrl = (imagePath: string | null | undefined, category?: string): string => {
  if (!imagePath || imagePath.trim().length === 0) {
    if (category === 'Disposable Items') return '/assets/category_disposables.jpg';
    if (category === 'Birthday & Party Items') return '/assets/category_balloons.jpg';
    return '/assets/category_cakes.jpg';
  }

  // Already a full URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // Local assets path
  if (imagePath.startsWith('/assets/') || imagePath.startsWith('./') || imagePath.startsWith('/')) {
    return imagePath;
  }

  // If it's a Supabase storage path
  if (isSupabaseConfigured()) {
    const cleanPath = imagePath.replace(/^store-images\//, '');
    const { data } = supabase.storage.from('store-images').getPublicUrl(cleanPath);
    return data.publicUrl;
  }

  // Fallback
  return `/${imagePath}`;
};

/**
 * Upload an image to the store-images Supabase Storage bucket
 * Organized by category folder: cakes, balloons, party, disposables
 */
export const uploadProductImage = async (
  file: File,
  folder: 'cakes' | 'balloons' | 'party' | 'disposables'
): Promise<string | null> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase is not configured. Cannot upload image.');
    return null;
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('store-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from('store-images').getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.error('Failed to upload product image:', err);
    return null;
  }
};
