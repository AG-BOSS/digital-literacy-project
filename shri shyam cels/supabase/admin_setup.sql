-- ==============================================================================
-- SHRI SHYAM CELEBRATIONS – ADMIN SECURITY & AUTHORIZATION SETUP
-- Run this script in the Supabase SQL Editor.
-- Configures:
-- 1. admin_users authorization table
-- 2. is_admin() SECURITY DEFINER function
-- 3. Strict Admin-Only RLS write policies on products, categories, subcategories
-- 4. Strict Admin-Only Storage policies on the store-images bucket
-- ==============================================================================

-- 1. CREATE ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. SECURITY DEFINER FUNCTION: is_admin()
-- Verifies whether the requesting user is a verified administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE (user_id IS NOT NULL AND user_id = auth.uid())
       OR (LOWER(email) = LOWER(COALESCE(auth.jwt() ->> 'email', '')))
  );
END;
$$;

-- 3. RLS POLICIES ON ADMIN_USERS
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
CREATE POLICY "Admins can view admin_users"
ON public.admin_users FOR SELECT
TO authenticated
USING (public.is_admin() OR LOWER(email) = LOWER(COALESCE(auth.jwt() ->> 'email', '')));

-- 4. UPDATE PRODUCTS RLS: PUBLIC READ, ADMIN-ONLY WRITE
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON public.products;
DROP POLICY IF EXISTS "Allow admins to insert products" ON public.products;
CREATE POLICY "Allow admins to insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to update products" ON public.products;
DROP POLICY IF EXISTS "Allow admins to update products" ON public.products;
CREATE POLICY "Allow admins to update products"
ON public.products FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON public.products;
DROP POLICY IF EXISTS "Allow admins to delete products" ON public.products;
CREATE POLICY "Allow admins to delete products"
ON public.products FOR DELETE
TO authenticated
USING (public.is_admin());

-- 5. UPDATE CATEGORIES RLS: PUBLIC READ, ADMIN-ONLY WRITE
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories"
ON public.categories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admins to insert categories" ON public.categories;
CREATE POLICY "Allow admins to insert categories"
ON public.categories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admins to update categories" ON public.categories;
CREATE POLICY "Allow admins to update categories"
ON public.categories FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to delete categories" ON public.categories;
DROP POLICY IF EXISTS "Allow admins to delete categories" ON public.categories;
CREATE POLICY "Allow admins to delete categories"
ON public.categories FOR DELETE
TO authenticated
USING (public.is_admin());

-- 6. UPDATE SUBCATEGORIES RLS: PUBLIC READ, ADMIN-ONLY WRITE
DROP POLICY IF EXISTS "Allow public read access on subcategories" ON public.subcategories;
CREATE POLICY "Allow public read access on subcategories"
ON public.subcategories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow admins to insert subcategories" ON public.subcategories;
CREATE POLICY "Allow admins to insert subcategories"
ON public.subcategories FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to update subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow admins to update subcategories" ON public.subcategories;
CREATE POLICY "Allow admins to update subcategories"
ON public.subcategories FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Allow authenticated users to delete subcategories" ON public.subcategories;
DROP POLICY IF EXISTS "Allow admins to delete subcategories" ON public.subcategories;
CREATE POLICY "Allow admins to delete subcategories"
ON public.subcategories FOR DELETE
TO authenticated
USING (public.is_admin());

-- 7. STORAGE RLS: PUBLIC READ, ADMIN-ONLY WRITE ON store-images
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Access store-images" ON storage.objects;
CREATE POLICY "Public Access store-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'store-images');

DROP POLICY IF EXISTS "Authenticated users can upload store-images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload store-images" ON storage.objects;
CREATE POLICY "Admins can upload store-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'store-images' AND public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can update store-images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update store-images" ON storage.objects;
CREATE POLICY "Admins can update store-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'store-images' AND public.is_admin())
WITH CHECK (bucket_id = 'store-images' AND public.is_admin());

DROP POLICY IF EXISTS "Authenticated users can delete store-images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete store-images" ON storage.objects;
CREATE POLICY "Admins can delete store-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'store-images' AND public.is_admin());

-- 8. INITIAL ADMIN SEED
-- Replace or add the shop owner's email here:
INSERT INTO public.admin_users (email, role)
VALUES ('admin@shrishyamcelebrations.com', 'admin')
ON CONFLICT (email) DO NOTHING;
