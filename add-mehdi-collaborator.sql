-- Add Mehdi as collaborator for HSEP Florida State University project
-- Project ID: b33013ab-ce46-4757-8653-049c3a892412

-- First, check if the project exists
SELECT id, title, company FROM projects WHERE id = 'b33013ab-ce46-4757-8653-049c3a892412';

-- Add Mehdi as collaborator
INSERT INTO collaborators (project_id, name, linkedin_url, role, order_index) 
VALUES (
  'b33013ab-ce46-4757-8653-049c3a892412',
  'Mehdi',
  'https://www.linkedin.com/in/mehdisophy/',
  'Edtech Consultant',
  1
);

-- Verify the collaborator was added
SELECT 
  c.id,
  c.name,
  c.linkedin_url,
  c.role,
  c.order_index,
  p.title as project_title
FROM collaborators c
JOIN projects p ON c.project_id = p.id
WHERE c.project_id = 'b33013ab-ce46-4757-8653-049c3a892412'
ORDER BY c.order_index;
