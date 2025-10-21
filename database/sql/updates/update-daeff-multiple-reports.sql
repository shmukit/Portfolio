-- Update DAEF Project with Enhanced Multiple Reports Support
-- This script updates the Innovision Consulting project to properly support multiple reports
-- with both single URL fields and JSONB arrays for maximum compatibility

-- First, let's check the current state
SELECT 
  id,
  title,
  company,
  year,
  report_url,    -- Single report URL field
  report_label,  -- Single report label
  report_urls    -- JSONB array of multiple report URLs
FROM projects 
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis' 
  AND company = 'Innovision Consulting';

-- Update the project with enhanced multiple reports support
UPDATE projects 
SET 
  -- Single URL fields (for backward compatibility and primary link)
  report_url = 'https://innovision-bd.com/Impact/healthtech-in-bangladesh/',
  report_label = 'Industry Sector Reports',
  
  -- Multiple URLs array (for enhanced frontend display)
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
  ]'::jsonb,
  
  updated_at = NOW()
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis' 
  AND company = 'Innovision Consulting'
  AND year = 2021;

-- Verify the update
SELECT 
  title,
  company,
  year,
  report_url,
  report_label,
  jsonb_array_length(report_urls) as report_count,
  updated_at
FROM projects 
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis' 
  AND company = 'Innovision Consulting';

-- Show the structure of report_urls to confirm it's properly formatted
SELECT 
  title,
  jsonb_pretty(report_urls) as formatted_reports
FROM projects 
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis' 
  AND company = 'Innovision Consulting';

-- Test query to extract individual reports
SELECT 
  title,
  jsonb_array_elements(report_urls) as individual_report
FROM projects 
WHERE title = 'DAEF: Digital Economy & Sectoral Analysis' 
  AND company = 'Innovision Consulting';
