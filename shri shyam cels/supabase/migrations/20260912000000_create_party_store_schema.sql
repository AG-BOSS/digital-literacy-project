-- ==============================================================================
-- SHRI SHYAM CELEBRATIONS – THE PARTY STORE
-- Supabase PostgreSQL Schema Migration (Idempotent & Safe)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SUBCATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL,
    description TEXT,
    price NUMERIC(10, 2) DEFAULT NULL,
    price_on_request BOOLEAN NOT NULL DEFAULT TRUE,
    unit TEXT,
    availability TEXT NOT NULL DEFAULT 'In Stock',
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT,
    is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    is_new BOOLEAN NOT NULL DEFAULT FALSE,
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure all columns exist even if tables existed previously
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS in_stock BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_on_request BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS unit TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS availability TEXT NOT NULL DEFAULT 'In Stock';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_best_seller BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_new BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features JSONB NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory_id UUID REFERENCES public.subcategories(id) ON DELETE SET NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price NUMERIC(10, 2) DEFAULT NULL;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;

-- Deduplicate any pre-existing products by name before creating unique index
DELETE FROM public.products a USING public.products b
WHERE a.ctid < b.ctid AND a.name = b.name;

-- Unique index on product name for safe upserting
CREATE UNIQUE INDEX IF NOT EXISTS idx_products_name_unique ON public.products (name);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON public.products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON public.products(in_stock);
CREATE INDEX IF NOT EXISTS idx_subcategories_category_id ON public.subcategories(category_id);

-- Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Idempotent)
-- ==============================================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories policies
DROP POLICY IF EXISTS "Allow public read access on categories" ON public.categories;
CREATE POLICY "Allow public read access on categories"
ON public.categories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert categories" ON public.categories;
CREATE POLICY "Allow authenticated users to insert categories"
ON public.categories FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update categories" ON public.categories;
CREATE POLICY "Allow authenticated users to update categories"
ON public.categories FOR UPDATE
TO authenticated
USING (true);

-- Subcategories policies
DROP POLICY IF EXISTS "Allow public read access on subcategories" ON public.subcategories;
CREATE POLICY "Allow public read access on subcategories"
ON public.subcategories FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert subcategories" ON public.subcategories;
CREATE POLICY "Allow authenticated users to insert subcategories"
ON public.subcategories FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update subcategories" ON public.subcategories;
CREATE POLICY "Allow authenticated users to update subcategories"
ON public.subcategories FOR UPDATE
TO authenticated
USING (true);

-- Products policies
DROP POLICY IF EXISTS "Allow public read access on products" ON public.products;
CREATE POLICY "Allow public read access on products"
ON public.products FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert products" ON public.products;
CREATE POLICY "Allow authenticated users to insert products"
ON public.products FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update products" ON public.products;
CREATE POLICY "Allow authenticated users to update products"
ON public.products FOR UPDATE
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to delete products" ON public.products;
CREATE POLICY "Allow authenticated users to delete products"
ON public.products FOR DELETE
TO authenticated
USING (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION (store-images)
-- Uses safe dynamic execution so it won't fail if permissions are restricted in SQL Editor
-- ==============================================================================
DO $$
BEGIN
    EXECUTE 'INSERT INTO storage.buckets (id, name, public) VALUES (''store-images'', ''store-images'', true) ON CONFLICT (id) DO NOTHING';
EXCEPTION
    WHEN OTHERS THEN
        NULL;
END $$;
