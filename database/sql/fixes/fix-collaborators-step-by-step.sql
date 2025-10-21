-- Fix Collaborators Issue: IDRC and GenAI projects
-- Run these queries step by step in Supabase SQL Editor

-- ========================================
-- STEP 1: Find the correct project IDs
-- ========================================
SELECT id, title, year, company 
FROM projects 
WHERE title ILIKE '%GenAI%' 
   OR title ILIKE '%ElTen%' 
   OR title ILIKE '%IDRC%' 
   OR title ILIKE '%EdTech Policy%'
ORDER BY year DESC, title;

-- Expected output:
-- IDRC: EdTech Policy Platform for SEA => should be 2ac37748-ee57-45ea-87c4-9daf580e0c58
-- GenAI/ElTen project => you'll see the correct UUID here

-- ========================================
-- STEP 2: Check current collaborators
-- ========================================
SELECT c.id, c.project_id, p.title as project_title, c.name, c.role, c.order_index
FROM collaborators c
LEFT JOIN projects p ON c.project_id = p.id
WHERE c.name IN ('Jawad', 'Uttam', 'Mridul', 'Shipu', 'Moshiur', 'Raied')
ORDER BY c.project_id, c.order_index;

-- ========================================
-- STEP 3: Delete wrong/duplicate collaborators
-- ========================================
-- Delete collaborators linked to wrong project ID (4d1d38e4-5fe8-4b8f-9b05-46049011ea76)
DELETE FROM collaborators 
WHERE project_id = '4d1d38e4-5fe8-4b8f-9b05-46049011ea76';

-- ========================================
-- STEP 4: Add correct collaborators for IDRC
-- ========================================
-- IDRC: EdTech Policy Platform for SEA
-- Only add if not already exist
INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT '2ac37748-ee57-45ea-87c4-9daf580e0c58', 'Jawad', 'https://www.linkedin.com/in/jawad-ahmed-5a01b7367/', 1
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = '2ac37748-ee57-45ea-87c4-9daf580e0c58' 
  AND name = 'Jawad'
);

INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT '2ac37748-ee57-45ea-87c4-9daf580e0c58', 'Mridul', 'https://www.linkedin.com/in/mridulch/', 2
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = '2ac37748-ee57-45ea-87c4-9daf580e0c58' 
  AND name = 'Mridul'
);

-- ========================================
-- STEP 5: Add correct collaborators for GenAI
-- ========================================
-- First, find the GenAI project ID from STEP 1 output
-- Then replace 'GENAI_PROJECT_ID_FROM_STEP1' with the actual UUID

-- Example (UNCOMMENT and replace with actual ID):
/*
INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT 'GENAI_PROJECT_ID_FROM_STEP1', 'Uttam', 'https://www.linkedin.com/in/uttam-deb/', 1
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = 'GENAI_PROJECT_ID_FROM_STEP1' 
  AND name = 'Uttam'
);

INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT 'GENAI_PROJECT_ID_FROM_STEP1', 'Shipu', 'https://www.linkedin.com/in/toshipu/', 2
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = 'GENAI_PROJECT_ID_FROM_STEP1' 
  AND name = 'Shipu'
);

INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT 'GENAI_PROJECT_ID_FROM_STEP1', 'Moshiur', 'https://www.linkedin.com/in/moshiurhridoy/', 3
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = 'GENAI_PROJECT_ID_FROM_STEP1' 
  AND name = 'Moshiur'
);

INSERT INTO collaborators (project_id, name, linkedin_url, order_index)
SELECT 'GENAI_PROJECT_ID_FROM_STEP1', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 4
WHERE NOT EXISTS (
  SELECT 1 FROM collaborators 
  WHERE project_id = 'GENAI_PROJECT_ID_FROM_STEP1' 
  AND name = 'Raied'
);
*/

-- ========================================
-- STEP 6: Verify the fix
-- ========================================
SELECT p.title, p.year, c.name, c.linkedin_url, c.order_index
FROM projects p
LEFT JOIN collaborators c ON p.id = c.project_id
WHERE p.title ILIKE '%GenAI%' 
   OR p.title ILIKE '%ElTen%' 
   OR p.title ILIKE '%IDRC%' 
   OR p.title ILIKE '%EdTech Policy%'
ORDER BY p.year DESC, p.title, c.order_index;

