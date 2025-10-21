-- =====================================================
-- ADD URLS TO EXISTING PROJECTS - CORRECTED VERSION
-- Updates existing projects with new URLs using correct titles
-- =====================================================

-- Step 1: Add URL columns if they don't exist
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_url TEXT,
ADD COLUMN IF NOT EXISTS project_url TEXT,
ADD COLUMN IF NOT EXISTS report_url TEXT,
ADD COLUMN IF NOT EXISTS demo_url TEXT;

-- Add comments to document the fields
COMMENT ON COLUMN public.projects.company_url IS 'Company website URL';
COMMENT ON COLUMN public.projects.project_url IS 'Project-specific URL or landing page';
COMMENT ON COLUMN public.projects.report_url IS 'Report or document URL (PDF, Google Docs, etc.)';
COMMENT ON COLUMN public.projects.demo_url IS 'Demo or live example URL';

-- Step 2: Add multiple URLs using JSONB columns (if they don't exist)
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS company_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS project_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS report_urls JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS demo_urls JSONB DEFAULT '[]';

-- Add comments for JSONB columns
COMMENT ON COLUMN public.projects.company_urls IS 'Array of company website URLs with labels';
COMMENT ON COLUMN public.projects.project_urls IS 'Array of project-specific URLs with labels';
COMMENT ON COLUMN public.projects.report_urls IS 'Array of report/document URLs with labels';
COMMENT ON COLUMN public.projects.demo_urls IS 'Array of demo URLs with labels';

-- Step 3: Update "Co-authored book on SMEs digital adoption" project
UPDATE public.projects 
SET 
  company_url = 'https://bangladesh.fes.de/',
  project_url = 'https://bangladesh.fes.de/fileadmin/user_upload/pdf-files/Edited_for_Website_Combind-SME-Training-Manual_V4A.pdf',
  report_url = 'http://ijsmed.smef.gov.bd/upload/issues/issues_05/articles/5_are_small_and_medium_enterprises_%28smes%29_in_bangladesh_adapting_ict_in_good_pace_challenges_and_way_forward.pdf',
  demo_url = NULL
WHERE title = 'Co-authored book on SMEs digital adoption';

-- Step 4: Update "DAEF: Digital Economy & Sectoral Analysis" project
UPDATE public.projects 
SET 
  company_url = 'https://innovision-bd.com/',
  project_url = NULL,
  report_url = 'https://innovision-bd.com/Impact/healthtech-in-bangladesh/',
  demo_url = NULL
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis';

-- Step 5: Update ICT Adoption project with multiple report URLs
UPDATE public.projects 
SET 
  report_urls = '[
    {
      "url": "https://bangladesh.fes.de/fileadmin/user_upload/pdf-files/Edited_for_Website_Combind-SME-Training-Manual_V4A.pdf",
      "label": "Co-authored Book: ICT Adoption of SMEs in Bangladesh",
      "description": "Book: ICT Adoption of SMEs in Bangladesh, Dr. Mohammed Shafiul Alam Khan, Shazzad Hossain Mukit, Nabila Nishat Raisa. 2021, Friedrich-Ebert-Stiftung (FES) Bangladesh"
    },
    {
      "url": "http://ijsmed.smef.gov.bd/upload/issues/issues_05/articles/5_are_small_and_medium_enterprises_%28smes%29_in_bangladesh_adapting_ict_in_good_pace_challenges_and_way_forward.pdf",
      "label": "Journal Article: Are Small and Medium Enterprises (SMEs) in Bangladesh Adapting ICT at a Good Pace?",
      "description": "Dr. Mohammed Shafiul Alam Khan, Shazzad Hossain Mukit. International Journal of SME Development, Issue 05, Jun 2022"
    }
  ]'::jsonb
WHERE title = 'Co-authored book on SMEs digital adoption';

-- Step 6: Update DAEF Research Portfolio with multiple report URLs
UPDATE public.projects 
SET 
  report_urls = '[
    {
      "url": "https://innovision-bd.com/Impact/healthtech-in-bangladesh/",
      "label": "HealthTech in Bangladesh Report",
      "description": "Healthtech is the use of technology in healthcare with an aim to improve efficiency, yield, and profitability. Healthtech startups work on services, products, or applications that are derived from healthcare, improving various processes."
    },
    {
      "url": "https://innovision-bd.com/Impact/agritech-in-bangladesh/",
      "label": "Agritech in Bangladesh Report",
      "description": "Bangladesh has a superior competitive advantage of being of the most fertile delta/land on this earth, the country is blessed with superior agricultural industry from ancient times."
    },
    {
      "url": "https://innovision-bd.com/Impact/fintech-in-bangladesh/",
      "label": "Fintech in Bangladesh Report",
      "description": "Bangladesh has all the right ingredients to welcome the second wave of Fintech services. The sector has so many possibilities and can offer so much more than just e-wallets and payment gateways."
    },
    {
      "url": "https://innovision-bd.com/Impact/smetech-in-bangladesh/",
      "label": "SMEtech in Bangladesh Report",
      "description": "Bangladesh''s SME sector serves as a catalyst for progress, bolstering the nation''s workforce by creating 7.8 million jobs. Government initiatives driving digital adoption propel SME-tech startups and facilitate the country''s digital transformation."
    }
  ]'::jsonb
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis';

-- Step 7: Verify the updates
SELECT 
  title, 
  company_url, 
  project_url, 
  report_url, 
  demo_url,
  report_urls
FROM public.projects 
WHERE title IN (
  'Co-authored book on SMEs digital adoption',
  'DAEF: Digital Economy & Sectoral Analysis'
);

-- =====================================================
-- VERIFICATION COMPLETE
-- =====================================================
