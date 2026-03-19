-- =====================================================
-- DATABASE RLS AND SECURITY FIXES (FINAL SAFE VERSION)
-- =====================================================

-- [WARNING] DO NOT re-run the original 'supabase-schema-corrected.sql' 
-- as it contains 'DROP TABLE ... CASCADE' which will wipe your data.
-- Use this script instead to apply security fixes safely.

-- 1. Enable Row Level Security (RLS) on portfolio tables
ALTER TABLE "public"."categories" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."learnings" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."resources" ENABLE ROW LEVEL SECURITY;

-- 2. Ensure Public Read Access (Maintenance of UX/Flow)
-- These commands ensure that your portfolio remains visible to the public.
-- They only allow reading; they do NOT allow adding or deleting data.

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'categories' AND policyname = 'Public read access to published categories') THEN
        CREATE POLICY "Public read access to published categories" ON "public"."categories" FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'learnings' AND policyname = 'Public read access to published learnings') THEN
        CREATE POLICY "Public read access to published learnings" ON "public"."learnings" FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'resources' AND policyname = 'Public read access to published resources') THEN
        CREATE POLICY "Public read access to published resources" ON "public"."resources" FOR SELECT USING (true);
    END IF;
END $$;

-- 3. Fix Function Search Path Security (Portfolio Function)
-- This secures your portfolio function and clears the linter warning.
ALTER FUNCTION "public"."update_updated_at_column"() SET search_path = 'public';

-- 4. Remove Unused Indexes (Performance Cleanup)
DROP INDEX IF EXISTS "public"."idx_resources_type";
DROP INDEX IF EXISTS "public"."idx_resources_order";
DROP INDEX IF EXISTS "public"."idx_learnings_published";
DROP INDEX IF EXISTS "public"."idx_learnings_type";
DROP INDEX IF EXISTS "public"."idx_learnings_difficulty";
DROP INDEX IF EXISTS "public"."idx_learnings_created_at";
DROP INDEX IF EXISTS "public"."idx_categories_type";
DROP INDEX IF EXISTS "public"."idx_categories_order";
DROP INDEX IF EXISTS "public"."idx_collaborators_order_index";
DROP INDEX IF EXISTS "public"."idx_failures_published";
DROP INDEX IF EXISTS "public"."idx_failures_year";
DROP INDEX IF EXISTS "public"."idx_failures_category";

-- 5. HS-related functions
-- NOTE: If you get a "function does not exist" error, it's because these 
-- were leftovers from a different project and have already been removed.
-- You can safely ignore them or keep the errors silenced.

-- Only fixing those that definitely exist according to your current DB state.
DROP FUNCTION IF EXISTS "public"."get_hs_code_stats"();
