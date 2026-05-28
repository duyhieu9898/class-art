-- No-op: instructors are hardcoded in the frontend and are not part of the schema.

-- Remove unused columns from courses table
ALTER TABLE courses DROP COLUMN IF EXISTS number;
ALTER TABLE courses DROP COLUMN IF EXISTS description;
