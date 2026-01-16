-- ============================================
-- KMP HORREN - SUPABASE STORAGE POLICIES
-- ============================================
-- BELANGRIJK: Maak eerst de bucket aan via het Supabase Dashboard:
-- 1. Ga naar Storage in je Supabase project
-- 2. Klik op "New bucket"
-- 3. Naam: product-images
-- 4. Vink "Public bucket" aan
-- 5. Klik "Create bucket"
--
-- Voer daarna deze SQL uit in de SQL Editor:
-- https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new
-- ============================================

-- ============================================
-- STORAGE POLICIES VOOR product-images BUCKET
-- ============================================

-- Policy 1: Iedereen kan afbeeldingen bekijken (publieke leestoegang)
DROP POLICY IF EXISTS "Public read access for product images" ON storage.objects;
CREATE POLICY "Public read access for product images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'product-images');

-- Policy 2: Alleen admins kunnen afbeeldingen uploaden
DROP POLICY IF EXISTS "Admin upload access for product images" ON storage.objects;
CREATE POLICY "Admin upload access for product images" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy 3: Alleen admins kunnen afbeeldingen bijwerken
DROP POLICY IF EXISTS "Admin update access for product images" ON storage.objects;
CREATE POLICY "Admin update access for product images" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy 4: Alleen admins kunnen afbeeldingen verwijderen
DROP POLICY IF EXISTS "Admin delete access for product images" ON storage.objects;
CREATE POLICY "Admin delete access for product images" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'product-images'
    AND EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Storage policies voor product-images bucket aangemaakt!';
  RAISE NOTICE '📷 Publieke leestoegang: Aan';
  RAISE NOTICE '🔒 Upload/Update/Delete: Alleen admins';
END $$;
