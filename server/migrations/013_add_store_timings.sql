-- Add opening_time and closing_time to global_settings
ALTER TABLE global_settings ADD COLUMN IF NOT EXISTS opening_time TEXT DEFAULT '10:00';
ALTER TABLE global_settings ADD COLUMN IF NOT EXISTS closing_time TEXT DEFAULT '22:00';
