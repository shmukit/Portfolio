-- Add support for multiple URLs using JSON arrays
-- This allows storing multiple URLs for each type

-- Step 1: Add JSON columns for multiple URLs
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS project_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS report_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS demo_urls JSONB DEFAULT '[]';

-- Add comments
COMMENT ON COLUMN public.projects.company_urls IS 'Array of company website URLs with labels';
COMMENT ON COLUMN public.projects.project_urls IS 'Array of project-specific URLs with labels';
COMMENT ON COLUMN public.projects.report_urls IS 'Array of report/document URLs with labels';
COMMENT ON COLUMN public.projects.demo_urls IS 'Array of demo URLs with labels';

-- Step 2: Example data structure for multiple URLs
-- Each URL object should have: { "url": "https://...", "label": "Display Name" }
UPDATE public.projects 
SET 
  company_urls = '[
    {"url": "https://www.10minuteschool.com", "label": "10 Minute School"},
    {"url": "https://www.sequoiacap.com", "label": "Sequoia Capital"}
  ]',
  project_urls = '[
    {"url": "https://www.10minuteschool.com/courses", "label": "Course Platform"},
    {"url": "https://www.10minuteschool.com/premium", "label": "Premium Features"}
  ]',
  report_urls = '[
    {"url": "https://www.linkedin.com/pulse/making-sense-edtech-bangladesh-shazzad-hossain-mukit/", "label": "LinkedIn Article"},
    {"url": "https://drive.google.com/file/d/example-report.pdf", "label": "Full Report PDF"}
  ]',
  demo_urls = '[
    {"url": "https://demo.10minuteschool.com", "label": "Live Demo"},
    {"url": "https://youtube.com/watch?v=example", "label": "Video Demo"}
  ]'
WHERE title = 'Bangladesh EdTech Market Thesis';

-- Verify the changes
SELECT title, company_urls, project_urls, report_urls, demo_urls 
FROM public.projects 
WHERE company_urls IS NOT NULL;
