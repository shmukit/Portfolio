-- Fix Sumaiya's collaborator record
-- The issue is that the project ID 719045d8-21f8-461f-83c9-f2ac91a271b9 doesn't exist in the projects table

-- First, let's find the correct project ID for "Page Loading Time Optimization"
-- Run this query to find the correct ID:
SELECT id, title FROM projects WHERE title ILIKE '%Page Loading Time%' OR title ILIKE '%Loading Time Optimization%';

-- Once you have the correct project ID, update Sumaiya's record:
-- UPDATE collaborators 
-- SET project_id = 'CORRECT_PROJECT_ID_HERE'
-- WHERE name = 'Sumaiya' AND project_id = '719045d8-21f8-461f-83c9-f2ac91a271b9';

-- Alternative: If the project doesn't exist at all, you may need to:
-- 1. Insert the project first, or
-- 2. Delete Sumaiya's collaborator record and re-insert with correct project ID

-- To check if the project exists:
-- SELECT COUNT(*) FROM projects WHERE id = '719045d8-21f8-461f-83c9-f2ac91a271b9';

-- To see all collaborators for this project ID:
-- SELECT * FROM collaborators WHERE project_id = '719045d8-21f8-461f-83c9-f2ac91a271b9';
