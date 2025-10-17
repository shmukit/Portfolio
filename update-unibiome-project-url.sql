-- Update Unibiome Project with Media URL
-- Adding the MOLD article URL about Unibiome's approach to tackling malnutrition

-- First, let's check the current project data
SELECT 
  id,
  title, 
  company, 
  year,
  project_urls,
  company_urls,
  demo_urls,
  report_urls
FROM projects 
WHERE title = 'Unibiome (France)' 
  AND company = 'Unibiome SAS';

-- Update the project with the media URL
UPDATE projects 
SET 
  project_urls = '[
    {
      "url": "https://thisismold.com/process/cook/unibiome-biotech-startup-is-tackling-malnutrition-with-engineered-probiotics",
      "label": "MOLD Article - Unibiome BioTech Startup",
      "description": "How This BioTech Startup is Tackling Malnutrition with Engineered Probiotics"
    }
  ]'::jsonb,
  updated_at = NOW()
WHERE title = 'Unibiome (France)' 
  AND company = 'Unibiome SAS'
  AND year = 2016;

-- Verify the update
SELECT 
  title,
  company,
  year,
  project_urls,
  updated_at
FROM projects 
WHERE title = 'Unibiome (France)' 
  AND company = 'Unibiome SAS';
