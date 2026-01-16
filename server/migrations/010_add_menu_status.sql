-- Migration: Add status column to menu_items to control visibility
-- Default status is 'DRAFT' for new items
-- Existing items should be set to 'LIVE' to maintain visibility

-- Check if column exists logic is not standard in basic SQL but IF NOT EXISTS works in some PG versions or we just run ALTER.
-- However, standard Supabase/PG migration:

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'menu_items' AND column_name = 'status') THEN
        ALTER TABLE menu_items ADD COLUMN status TEXT DEFAULT 'DRAFT';
    END IF;
END $$;

-- Update all existing items (which were previously treated as live) to LIVE
UPDATE menu_items SET status = 'LIVE' WHERE status IS NULL OR status = 'DRAFT';
