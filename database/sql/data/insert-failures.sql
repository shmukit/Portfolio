-- Insert sample failures data
-- This script adds failed projects to the failures table

-- 1. 10MS Notification System (2023)
INSERT INTO failures (
  title, 
  year, 
  company, 
  role, 
  description, 
  lessons, 
  order_index, 
  category, 
  is_unlocked, 
  published, 
  phase, 
  project_type, 
  situation, 
  task, 
  result
) VALUES (
  '10MS Notification System',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Failed due to moving priorities and tech debt of webengage',
  'Notification systems require careful prioritization and technical debt management. Moving priorities can derail even well-planned features.',
  1,
  'Product Development',
  true,
  true,
  'Discontinued',
  'Notification System',
  'Need for improved user engagement through better notification system, but existing WebEngage integration had significant technical debt.',
  'Design and implement comprehensive notification system to improve user engagement and retention.',
  'Project discontinued due to shifting priorities and technical constraints from existing WebEngage platform.'
);

-- 2. Jobs recommendation by BDJobs (2023)
INSERT INTO failures (
  title, 
  year, 
  company, 
  role, 
  description, 
  lessons, 
  order_index, 
  category, 
  is_unlocked, 
  published, 
  phase, 
  project_type, 
  situation, 
  task, 
  result
) VALUES (
  'Jobs recommendation by BDJobs',
  2023,
  '10 Minute School',
  'Lead Product Manager',
  'Due to lack of quality traffic and meaningful CVR',
  'Partnership success depends on traffic quality, not just volume. Meaningful conversion rates require aligned user intent and value proposition.',
  2,
  'Partnership',
  true,
  true,
  'Discontinued',
  'Job Recommendation',
  'Partnership with BDJobs to provide job recommendations to users, but struggled with traffic quality and conversion rates.',
  'Establish partnership with BDJobs to integrate job recommendations into the platform for user value.',
  'Partnership discontinued due to insufficient traffic quality and low conversion rates that didn''t justify continued investment.'
);
