-- Migration 001: collaborators public SELECT only when parent project is published
--
-- Why: The previous policy used USING (true), so anon clients could read every row in
-- `collaborators`, including people tied to unpublished (draft) projects.
--
-- Apply: Supabase Dashboard → SQL Editor → paste → Run (once per project).
-- Prerequisites: tables `projects` and `collaborators` exist; RLS enabled on `collaborators`.

BEGIN;

DROP POLICY IF EXISTS "Public read access to collaborators" ON collaborators;

CREATE POLICY "Public read access to collaborators" ON collaborators
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects p
      WHERE p.id = collaborators.project_id AND p.published = true
    )
  );

COMMIT;
