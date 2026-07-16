-- Migration: Add pricing and scheduling fields to courses table
-- Required for generating training service contracts/invoices

ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS price             INT,
  ADD COLUMN IF NOT EXISTS duration_lessons  INT,
  ADD COLUMN IF NOT EXISTS lesson_minutes     INT,
  ADD COLUMN IF NOT EXISTS start_date         DATE,
  ADD COLUMN IF NOT EXISTS end_date           DATE;

COMMENT ON COLUMN courses.price             IS 'Original tuition fee of the course';
COMMENT ON COLUMN courses.duration_lessons  IS 'Total number of sessions/lessons in the course';
COMMENT ON COLUMN courses.lesson_minutes     IS 'Duration of each lesson in minutes';
COMMENT ON COLUMN courses.start_date         IS 'Start date of the class';
COMMENT ON COLUMN courses.end_date           IS 'Expected end date of the class';
