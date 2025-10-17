-- Fix Broken Images: Update database to use existing image files
-- This script maps projects to the actual image files that exist in /public/images/projects/

-- First, let's see what projects currently have broken image URLs
SELECT 
  id,
  title,
  company,
  year,
  image_url,
  order_index
FROM projects 
WHERE image_url IS NOT NULL 
  AND image_url LIKE '/images/projects/%'
ORDER BY order_index;

-- Update projects to use existing image files
-- Map projects to the actual files we have:

-- 1. Gamification System -> Gamification system.png
UPDATE projects 
SET 
  image_url = '/images/projects/Gamification system.png',
  updated_at = NOW()
WHERE title = 'Gamification System' 
  AND company = '10 Minute School';

-- 2. New Leads Collection Management -> Lead management.png  
UPDATE projects 
SET 
  image_url = '/images/projects/Lead management.png',
  updated_at = NOW()
WHERE title = 'New Leads Collection Management' 
  AND company = '10 Minute School';

-- 3. Teaching at the Right Level (TaRL) -> RCT_tara app.png
UPDATE projects 
SET 
  image_url = '/images/projects/RCT_tara app.png',
  updated_at = NOW()
WHERE title = 'Teaching at the Right Level (TaRL)' 
  AND company = '10 Minute School';

-- 4. Course Rating System -> Rating System.png
UPDATE projects 
SET 
  image_url = '/images/projects/Rating System.png',
  updated_at = NOW()
WHERE title = 'Course Rating System' 
  AND company = '10 Minute School';

-- 5. Quizards – Bangla Edutainment Platform -> quizards.png
UPDATE projects 
SET 
  image_url = '/images/projects/quizards.png',
  updated_at = NOW()
WHERE title = 'Quizards – Bangla Edutainment Platform' 
  AND company = '10 Minute School';

-- 6. Gamification: Financial Literacy Course -> gamification-financial-literacy.gif
UPDATE projects 
SET 
  image_url = '/images/projects/gamification-financial-literacy.gif',
  updated_at = NOW()
WHERE title = 'Gamification: Financial Literacy Course';

-- For projects that don't have corresponding image files, set to NULL
-- This prevents broken image icons from showing on the frontend
UPDATE projects 
SET 
  image_url = NULL,
  updated_at = NOW()
WHERE image_url LIKE '/images/projects/%.jpg' 
  AND image_url NOT IN (
    '/images/projects/Gamification system.png',
    '/images/projects/Lead management.png', 
    '/images/projects/RCT_tara app.png',
    '/images/projects/Rating System.png',
    '/images/projects/quizards.png',
    '/images/projects/gamification-financial-literacy.gif'
  );

-- Verify the fixes
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
