-- Add image_url column to all product tables
ALTER TABLE credit_cards
ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE loans
ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE deposits
ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE shariah_cards
ADD COLUMN IF NOT EXISTS image_url TEXT;
-- Create the storage bucket for product images (if it doesn't exist)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product_images', 'product_images', true) ON CONFLICT (id) DO NOTHING;
-- Set up security policies for the bucket
-- Allow public read access to the bucket
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'product_images');
-- Allow authenticated users to insert files
CREATE POLICY "Auth Insert" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'product_images'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to update files
CREATE POLICY "Auth Update" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'product_images'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete files
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE USING (
    bucket_id = 'product_images'
    AND auth.role() = 'authenticated'
);