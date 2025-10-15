-- URL setup script with custom labels
-- Adds URL fields and label fields to projects table

-- Step 1: Add URL columns to the projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_url TEXT,
ADD COLUMN IF NOT EXISTS project_url TEXT,
ADD COLUMN IF NOT EXISTS report_url TEXT,
ADD COLUMN IF NOT EXISTS demo_url TEXT;

-- Step 2: Add label columns for custom naming
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_label TEXT,
ADD COLUMN IF NOT EXISTS project_label TEXT,
ADD COLUMN IF NOT EXISTS report_label TEXT,
ADD COLUMN IF NOT EXISTS demo_label TEXT;

-- Add comments to document the new fields
COMMENT ON COLUMN public.projects.company_url IS 'Company website URL';
COMMENT ON COLUMN public.projects.project_url IS 'Project-specific URL or landing page';
COMMENT ON COLUMN public.projects.report_url IS 'Report or document URL (PDF, Google Docs, etc.)';
COMMENT ON COLUMN public.projects.demo_url IS 'Demo or live example URL';
COMMENT ON COLUMN public.projects.company_label IS 'Custom label for company URL';
COMMENT ON COLUMN public.projects.project_label IS 'Custom label for project URL';
COMMENT ON COLUMN public.projects.report_label IS 'Custom label for report URL';
COMMENT ON COLUMN public.projects.demo_label IS 'Custom label for demo URL';

-- Step 3: Add URLs with custom labels for Bangladesh EdTech Market Thesis project
UPDATE public.projects 
SET 
  company_url = 'https://www.10minuteschool.com',
  project_url = 'https://www.10minuteschool.com',
  report_url = 'https://www.linkedin.com/pulse/making-sense-edtech-bangladesh-shazzad-hossain-mukit/',
  demo_url = NULL,
  company_label = '10 Minute School',
  project_label = '10MS Platform',
  report_label = 'EdTech Analysis Article',
  demo_label = NULL
WHERE title = 'Bangladesh EdTech Market Thesis';

-- Verify the changes
SELECT title, company, company_url, company_label, project_url, project_label, report_url, report_label, demo_url, demo_label
FROM public.projects 
WHERE company_url IS NOT NULL;
