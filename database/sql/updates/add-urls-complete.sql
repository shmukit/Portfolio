-- URL setup script for Sequoia Investment project
-- Adds URL fields to projects table and populates with Sequoia Investment data

-- Step 1: Add URL columns to the projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_url TEXT,
ADD COLUMN IF NOT EXISTS project_url TEXT,
ADD COLUMN IF NOT EXISTS report_url TEXT,
ADD COLUMN IF NOT EXISTS demo_url TEXT;

-- Add comments to document the new fields
COMMENT ON COLUMN public.projects.company_url IS 'Company website URL';
COMMENT ON COLUMN public.projects.project_url IS 'Project-specific URL or landing page';
COMMENT ON COLUMN public.projects.report_url IS 'Report or document URL (PDF, Google Docs, etc.)';
COMMENT ON COLUMN public.projects.demo_url IS 'Demo or live example URL';

-- Step 2: Add URLs for Bangladesh EdTech Market Thesis project
UPDATE public.projects 
SET 
  company_url = 'https://www.10minuteschool.com',
  project_url = 'https://www.10minuteschool.com',
  report_url = 'https://www.linkedin.com/pulse/making-sense-edtech-bangladesh-shazzad-hossain-mukit/',
  demo_url = NULL
WHERE title = 'Bangladesh EdTech Market Thesis';

-- Verify the changes
SELECT title, company, company_url, project_url, report_url, demo_url 
FROM public.projects 
WHERE company_url IS NOT NULL;
