-- Complete fix for all broken images and add GIF
-- This script addresses all the issues we found

-- 1. Remove broken .jpg references (set to NULL)
UPDATE projects 
SET 
  image_url = NULL,
  updated_at = NOW()
WHERE image_url IN (
  '/images/projects/certificate_sharing_optimization.jpg',
  '/images/projects/course_validity_implementation.jpg',
  '/images/projects/page_loading_optimization.jpg'
);

-- 2. Map existing images to correct projects
UPDATE projects 
SET 
  image_url = '/images/projects/RCT_tara app.png',
  updated_at = NOW()
WHERE title = 'Teaching at the Right Level (TaRL)' 
  AND image_url IS NULL;

UPDATE projects 
SET 
  image_url = '/images/projects/quizards.png',
  updated_at = NOW()
WHERE title = 'Quizards – Bangla Edutainment Platform' 
  AND image_url IS NULL;

-- 3. Add the Gamification GIF using the project ID
UPDATE projects 
SET 
  image_url = '/images/projects/gamification-financial-literacy.gif',
  updated_at = NOW()
WHERE id = '6665081a-dd35-4fe7-ac0a-ec2886cce3b5';

-- 4. Verify all projects with images
SELECT 
  id,
  title,
  company,
  year,
  image_url,
  order_index
FROM projects 
WHERE image_url IS NOT NULL 
ORDER BY order_index;
