-- Add is_blocked column to users table (Soft Delete)
-- 0 = active, 1 = blocked
ALTER TABLE users ADD COLUMN is_blocked TINYINT(1) NOT NULL DEFAULT 0;
