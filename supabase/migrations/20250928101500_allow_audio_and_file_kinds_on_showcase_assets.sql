-- Align showcase_assets.kind with app-supported kinds
-- Allows: image, video, audio, file

BEGIN;
ALTER TABLE public.showcase_assets DROP CONSTRAINT IF EXISTS showcase_assets_kind_check;
ALTER TABLE public.showcase_assets
  ADD CONSTRAINT showcase_assets_kind_check CHECK (kind = ANY (ARRAY['image'::text,'video'::text,'audio'::text,'file'::text]));
COMMIT;
