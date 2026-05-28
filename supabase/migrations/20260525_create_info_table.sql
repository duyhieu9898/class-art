-- =============================================
-- REF ACADEMY - Create Info Table Migration
-- =============================================

CREATE TABLE IF NOT EXISTS info (
    id TEXT PRIMARY KEY DEFAULT 'site_settings',
    phone TEXT,
    email TEXT,
    address TEXT, -- Trụ sở chính / Địa chỉ chính
    facebook_url TEXT,
    youtube_url TEXT,
    tiktok_url TEXT,
    instagram_url TEXT,
    copyright_text TEXT,
    footer_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT singleton_row CHECK (id = 'site_settings')
);

-- Row Level Security
ALTER TABLE info ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "public_read_info" ON info;
DROP POLICY IF EXISTS "admin_all_info" ON info;

-- Public SELECT access
CREATE POLICY "public_read_info" ON info
    FOR SELECT USING (true);

-- Admin full access
CREATE POLICY "admin_all_info" ON info
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default row
INSERT INTO info (id, phone, email, address, facebook_url, youtube_url, tiktok_url, instagram_url, copyright_text, footer_description)
VALUES (
    'site_settings',
    '090 123 4567',
    'contact@refacademy.vn',
    '123 Đường Lê Lợi, Quận Hải Châu, Đà Nẵng',
    'https://facebook.com',
    'https://youtube.com',
    'https://tiktok.com',
    'https://instagram.com',
    '© 2026 REF Academy. All Rights Reserved.',
    'REF Academy - Trung tâm đào tạo Thiết kế đồ họa, Hoạt hình 3D, VFX hàng đầu.'
)
ON CONFLICT (id) DO NOTHING;
