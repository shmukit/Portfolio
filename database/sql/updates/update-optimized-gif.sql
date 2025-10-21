-- Update Gamification project with optimized GIF
-- File size reduced from 7.8MB to 651KB (92% reduction!)

UPDATE projects 
SET 
  image_url = '/images/projects/gamification-financial-literacy.gif',
  updated_at = NOW()
WHERE id = '6665081a-dd35-4fe7-ac0a-ec2886cce3b5';

-- Verify the update
SELECT 
  id,
  title,
  company,
  year,
  image_url,
  updated_at
FROM projects 
WHERE id = '6665081a-dd35-4fe7-ac0a-ec2886cce3b5';
