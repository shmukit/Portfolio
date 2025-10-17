-- Update Gamification Financial Literacy project to use GIF animation
-- This replaces the static JPG with an animated GIF showing the user journey

UPDATE projects 
SET 
  image_url = '/images/projects/gamification-financial-literacy.gif',
  updated_at = NOW()
WHERE title = 'Gamification: Financial Literacy Course';

-- Verify the update
SELECT 
  id,
  title,
  image_url,
  updated_at
FROM projects 
WHERE title = 'Gamification: Financial Literacy Course';
