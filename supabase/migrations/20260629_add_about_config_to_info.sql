-- Migration: Add about page config fields to info table
-- Adds hero section, about section fields for the new "gioi-thieu" admin page

ALTER TABLE info
  ADD COLUMN IF NOT EXISTS hero_image_url        TEXT,
  ADD COLUMN IF NOT EXISTS hero_mission          TEXT,
  ADD COLUMN IF NOT EXISTS hero_philosophy       TEXT,
  ADD COLUMN IF NOT EXISTS hero_culture          TEXT,
  ADD COLUMN IF NOT EXISTS about_title           TEXT,
  ADD COLUMN IF NOT EXISTS about_description_1   TEXT,
  ADD COLUMN IF NOT EXISTS about_description_2   TEXT,
  ADD COLUMN IF NOT EXISTS about_image_url       TEXT;

COMMENT ON COLUMN info.hero_image_url        IS 'Background image for the Hero - Sứ mệnh section on gioi-thieu page';
COMMENT ON COLUMN info.hero_mission          IS 'Mission text in the hero sidebar';
COMMENT ON COLUMN info.hero_philosophy       IS 'Philosophy text in the hero sidebar';
COMMENT ON COLUMN info.hero_culture          IS 'Culture text in the hero sidebar (newline-separated)';
COMMENT ON COLUMN info.about_title           IS 'Title for the Về REF ACADEMY section';
COMMENT ON COLUMN info.about_description_1   IS 'First description paragraph for the About section';
COMMENT ON COLUMN info.about_description_2   IS 'Second description paragraph for the About section';
COMMENT ON COLUMN info.about_image_url       IS 'Banner image for the About section';
