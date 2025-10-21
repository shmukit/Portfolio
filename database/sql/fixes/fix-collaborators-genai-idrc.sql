-- Fix: Remove wrong collaborators and add correct ones
-- First, let's see what project IDs we have

-- Check current project IDs:
-- SELECT id, title FROM projects WHERE title ILIKE '%GenAI%' OR title ILIKE '%IDRC%' OR title ILIKE '%EdTech Policy%';

-- Expected results:
-- IDRC: EdTech Policy Platform for SEA => id: 2ac37748-ee57-45ea-87c4-9daf580e0c58
-- ElTen (GenAI English Speaking App) => Need to find this ID

-- Step 1: DELETE all collaborators for the wrong project_id (4d1d38e4-5fe8-4b8f-9b05-46049011ea76)
-- This ID doesn't match either project
DELETE FROM collaborators WHERE project_id = '4d1d38e4-5fe8-4b8f-9b05-46049011ea76';

-- Step 2: Add correct collaborators for IDRC: EdTech Policy Platform for SEA
-- ID: 2ac37748-ee57-45ea-87c4-9daf580e0c58
INSERT INTO collaborators (project_id, name, linkedin_url, order_index) VALUES
('2ac37748-ee57-45ea-87c4-9daf580e0c58', 'Jawad', 'https://www.linkedin.com/in/jawad-ahmed-5a01b7367/', 1),
('2ac37748-ee57-45ea-87c4-9daf580e0c58', 'Mridul', 'https://www.linkedin.com/in/mridulch/', 2);

-- Step 3: Find GenAI project ID and add collaborators
-- Run this query in Supabase to find the GenAI project ID:
-- SELECT id FROM projects WHERE title ILIKE '%GenAI%' OR title ILIKE '%ElTen%';

-- Once you have the GenAI project ID, replace 'GENAI_PROJECT_ID_HERE' below:
-- INSERT INTO collaborators (project_id, name, linkedin_url, order_index) VALUES
-- ('GENAI_PROJECT_ID_HERE', 'Uttam', 'https://www.linkedin.com/in/uttam-deb/', 1),
-- ('GENAI_PROJECT_ID_HERE', 'Shipu', 'https://www.linkedin.com/in/toshipu/', 2),
-- ('GENAI_PROJECT_ID_HERE', 'Moshiur', 'https://www.linkedin.com/in/moshiurhridoy/', 3),
-- ('GENAI_PROJECT_ID_HERE', 'Raied', 'https://www.linkedin.com/in/abyadraied94/', 4);

