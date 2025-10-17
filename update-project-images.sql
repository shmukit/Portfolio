-- Update Project Images with Available Files
-- Based on the images found in public/images/projects/

-- Check current projects that need image updates
SELECT 
  id,
  title, 
  company, 
  year,
  image_url,
  order_index
FROM projects 
WHERE title IN (
  'Gamification System',
  'New Leads Collection Management', 
  'Teaching at the Right Level (TaRL)',
  'Course Rating System',
  'Quizards – Bangla Edutainment Platform'
)
ORDER BY order_index;

-- Update Gamification System project
UPDATE projects 
SET 
  image_url = '/images/projects/Gamification system.png',
  updated_at = NOW()
WHERE title = 'Gamification System' 
  AND company = '10 Minute School';

-- Update New Leads Collection Management project  
UPDATE projects 
SET 
  image_url = '/images/projects/Lead management.png',
  updated_at = NOW()
WHERE title = 'New Leads Collection Management' 
  AND company = '10 Minute School';

-- Update Teaching at the Right Level (TaRL) project
UPDATE projects 
SET 
  image_url = '/images/projects/RCT_tara app.png',
  updated_at = NOW()
WHERE title = 'Teaching at the Right Level (TaRL)' 
  AND company = '10 Minute School';

-- Update Course Rating System project
UPDATE projects 
SET 
  image_url = '/images/projects/Rating System.png',
  updated_at = NOW()
WHERE title = 'Course Rating System' 
  AND company = '10 Minute School';

-- Update Quizards – Bangla Edutainment Platform project
UPDATE projects 
SET 
  image_url = '/images/projects/quizards.png',
  updated_at = NOW()
WHERE title = 'Quizards – Bangla Edutainment Platform' 
  AND company = '10 Minute School';

-- Verify the updates
SELECT 
  title,
  company,
  year,
  image_url,
  order_index
FROM projects 
WHERE image_url LIKE '/images/projects/%'
ORDER BY order_index;
