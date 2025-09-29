-- Add tag column to showcases and broaden asset kind to free text
-- This migration supports filtering by tags and handling more asset types (audio, file)

BEGIN;

-- Add tag to showcases
ALTER TABLE public.showcases
  ADD COLUMN IF NOT EXISTS tag text;

-- Backfill existing rows to a sensible default
UPDATE public.showcases SET tag = COALESCE(tag, 'Images');

-- Make tag required going forward
ALTER TABLE public.showcases
  ALTER COLUMN tag SET NOT NULL;

-- Broaden showcase_assets.kind to text (if it was a narrower type)
DO $$
BEGIN
  -- Attempt to alter column type; if it's already text this will be a no-op
  BEGIN
    ALTER TABLE public.showcase_assets ALTER COLUMN kind TYPE text USING kind::text;
  EXCEPTION WHEN others THEN
    -- Ignore errors if the column is already text-compatible
    NULL;
  END;
END $$;

COMMIT;
