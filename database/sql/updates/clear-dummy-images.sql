-- Clear dummy image URLs from the projects table
-- This will set all image_url values to NULL so no broken images are displayed

UPDATE public.projects 
SET image_url = NULL 
WHERE image_url IS NOT NULL 
  AND image_url LIKE '/images/projects/%';
