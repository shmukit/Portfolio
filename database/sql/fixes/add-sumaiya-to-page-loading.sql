-- Add Sumaiya as collaborator to Page Loading Time Optimization project
-- Project ID: 719045d8-21f8-461f-83c9-f2ac91a271b9

-- First, check if Sumaiya already exists for this project
-- SELECT * FROM collaborators WHERE project_id = '719045d8-21f8-461f-83c9-f2ac91a271b9' AND name = 'Sumaiya';

-- Delete existing Sumaiya record if it exists (to avoid duplicates)
DELETE FROM collaborators 
WHERE project_id = '719045d8-21f8-461f-83c9-f2ac91a271b9' 
AND name = 'Sumaiya';

-- Insert Sumaiya's record
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) 
VALUES (
  '719045d8-21f8-461f-83c9-f2ac91a271b9',
  'Sumaiya',
  'https://www.linkedin.com/in/sumaiyatzakaria/',
  'Senior Product Manager',
  2
);

-- Verify the insertion
-- SELECT * FROM collaborators WHERE project_id = '719045d8-21f8-461f-83c9-f2ac91a271b9' ORDER BY order_index;
