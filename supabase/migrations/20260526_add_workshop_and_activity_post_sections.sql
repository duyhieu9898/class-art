-- Add workshop and hoat-dong values to post_section enum if they don't already exist
ALTER TYPE post_section ADD VALUE IF NOT EXISTS 'workshop';
ALTER TYPE post_section ADD VALUE IF NOT EXISTS 'hoat-dong';
