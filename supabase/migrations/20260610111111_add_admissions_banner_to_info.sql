-- ========================================================
-- Add admissions banner to info table
-- ========================================================

ALTER TABLE info 
ADD COLUMN IF NOT EXISTS admissions_banner_url TEXT;

-- Populate default values for existing site_settings row if not already set
UPDATE info
SET admissions_banner_url = COALESCE(admissions_banner_url, '/images/tuyen-sinh/banner.png')
WHERE id = 'site_settings';
