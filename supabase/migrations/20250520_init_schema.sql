-- =============================================
-- REF ACADEMY - Database Schema
-- =============================================

-- 1. ENUM
CREATE TYPE post_section AS ENUM ('dao-tao', 'tin-tuc', 'nhan-vat', 'hoc-bong');

-- 2. POSTS
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT,
    section post_section NOT NULL,
    published_at TIMESTAMPTZ DEFAULT now(),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_posts_section ON posts(section, is_published, published_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);

-- 3. REGISTRATIONS
CREATE TABLE registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    campus TEXT,
    need TEXT,
    voucher TEXT,
    form_type TEXT NOT NULL DEFAULT 'consultation',
    source_page TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_registrations_created ON registrations(created_at DESC);

-- 4. COURSES
CREATE TABLE courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PARTNERS
CREATE TABLE partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    "order" INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Public READ for content tables
CREATE POLICY "public_read_posts" ON posts
    FOR SELECT USING (is_published = true);

CREATE POLICY "public_read_courses" ON courses
    FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_partners" ON partners
    FOR SELECT USING (is_active = true);

-- Public INSERT for registrations
CREATE POLICY "public_insert_registrations" ON registrations
    FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated = admin)
CREATE POLICY "admin_all_posts" ON posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_registrations" ON registrations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_courses" ON courses
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin_all_partners" ON partners
    FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKET
-- =============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read on images bucket
CREATE POLICY "public_read_images" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload/update/delete
CREATE POLICY "admin_insert_images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "admin_update_images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "admin_delete_images" ON storage.objects
    FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
    BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER courses_updated_at
    BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
