-- ==============================================================================
-- SHRI SHYAM CELEBRATIONS – SUPABASE STORAGE SETUP SCRIPT
-- Run this script in the Supabase SQL Editor to configure the "store-images" bucket
-- and enforce strict Row Level Security (RLS) policies.
-- ==============================================================================

-- 1. CREATE THE PUBLIC STORAGE BUCKET
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'store-images',
    'store-images',
    true,
    5242880, -- 5 MB limit per image
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. ENABLE ROW LEVEL SECURITY ON STORAGE OBJECTS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. POLICY: PUBLIC READ ACCESS FOR PRODUCT IMAGES
-- Allows anyone (including anonymous site visitors) to view product images in store-images
DROP POLICY IF EXISTS "Public Access store-images" ON storage.objects;
CREATE POLICY "Public Access store-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'store-images');

-- 4. POLICY: AUTHENTICATED USERS CAN UPLOAD PRODUCT IMAGES
-- Only authenticated admin/staff users can upload to store-images. Anonymous users are blocked.
DROP POLICY IF EXISTS "Authenticated users can upload store-images" ON storage.objects;
CREATE POLICY "Authenticated users can upload store-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'store-images'
);

-- 5. POLICY: AUTHENTICATED USERS CAN UPDATE PRODUCT IMAGES
-- Only authenticated admin/staff users can update existing product images in store-images
DROP POLICY IF EXISTS "Authenticated users can update store-images" ON storage.objects;
CREATE POLICY "Authenticated users can update store-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'store-images')
WITH CHECK (bucket_id = 'store-images');

-- 6. POLICY: AUTHENTICATED USERS CAN DELETE PRODUCT IMAGES
-- Only authenticated admin/staff users can delete images from store-images
DROP POLICY IF EXISTS "Authenticated users can delete store-images" ON storage.objects;
CREATE POLICY "Authenticated users can delete store-images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'store-images');
