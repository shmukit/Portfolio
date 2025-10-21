-- Fix ACTUAL broken images and map existing images to correct projects
-- Based on real database analysis and available image files

-- 1. Fix Certificate Sharing Journey Optimization (remove non-existent .jpg)
UPDATE projects 
SET 
  image_url = NULL,
  updated_at = NOW()
WHERE title = 'Certificate Sharing Journey Optimization' 
  AND image_url = '/images/projects/certificate_sharing_optimization.jpg';

-- 2. Fix Course Validity Date Implementation (remove non-existent .jpg)
UPDATE projects 
SET 
  image_url = NULL,
  updated_at = NOW()
WHERE title = 'Course Validity Date Implementation' 
  AND image_url = '/images/projects/course_validity_implementation.jpg';

-- 3. Fix Page Loading Time Optimization (remove non-existent .jpg)
UPDATE projects 
SET 
  image_url = NULL,
  updated_at = NOW()
WHERE title = 'Page Loading Time Optimization' 
  AND image_url = '/images/projects/page_loading_optimization.jpg';

-- 4. Map RCT Tara App image to Teaching at the Right Level (TaRL)
UPDATE projects 
SET 
  image_url = '/images/projects/RCT_tara app.png',
  updated_at = NOW()
WHERE title = 'Teaching at the Right Level (TaRL)' 
  AND image_url IS NULL;

-- 5. Map Quizards image to Quizards – Bangla Edutainment Platform
UPDATE projects 
SET 
  image_url = '/images/projects/quizards.png',
  updated_at = NOW()
WHERE title = 'Quizards – Bangla Edutainment Platform' 
  AND image_url IS NULL;

-- 6. Add the Gamification GIF to Financial Literacy Course
UPDATE projects 
SET 
  image_url = '/images/projects/gamification-financial-literacy.gif',
  updated_at = NOW()
WHERE title = 'Gamification: Financial Literacy Course' 
  AND image_url IS NULL;

-- Verify the fixes
SELECT 
  title,
  company,
  year,
  image_url,
  order_index
FROM projects 
WHERE image_url IS NOT NULL 
ORDER BY order_index;
