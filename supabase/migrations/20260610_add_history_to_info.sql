-- ========================================================
-- Add history fields to info table
-- ========================================================

ALTER TABLE info 
ADD COLUMN IF NOT EXISTS history_image_url TEXT,
ADD COLUMN IF NOT EXISTS history_milestones JSONB DEFAULT '[]'::jsonb;

-- Populate default values for existing site_settings row if not already set
UPDATE info
SET 
    history_image_url = COALESCE(history_image_url, '/images/about/history-banner.png'),
    history_milestones = COALESCE(history_milestones, '[{"year": "7/2004", "desc": "Thành lập REF ACADEMY"}, {"year": "2009", "desc": "Hi4 Coffee"}, {"year": "2011", "desc": "193 Nguyễn Văn Linh, TP. Đà Nẵng"}, {"year": "2019", "desc": "35 Nại Nam, TP. Đà Nẵng"}]'::jsonb)
WHERE id = 'site_settings';
