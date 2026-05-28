-- ========================================================
-- Adjust registrations table schema and migrate data
-- ========================================================

-- 1. Migrate existing registration data to use the new form_type labels
UPDATE registrations
SET form_type = 'Đăng ký khóa học'
WHERE form_type = 'registration';

UPDATE registrations
SET form_type = COALESCE(need, 'Tư vấn khóa học')
WHERE form_type = 'consultation';

-- 2. Drop unused campus and need columns from registrations table
ALTER TABLE registrations DROP COLUMN IF EXISTS campus;
ALTER TABLE registrations DROP COLUMN IF EXISTS need;
