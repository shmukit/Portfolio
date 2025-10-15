-- =====================================================
-- SUPABASE SCHEMA CORRECTION - STEP BY STEP
-- =====================================================

-- STEP 1: Drop only the projects table to start fresh
DROP TABLE IF EXISTS projects CASCADE;

-- STEP 2: Create basic projects table structure
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  lessons TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  category TEXT,
  is_unlocked BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 3: Add the detailed project fields
ALTER TABLE projects ADD COLUMN IF NOT EXISTS phase TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_type TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS situation TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS task TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS result TEXT;

-- STEP 4: Add contributions with value chain positioning
-- This will store structured data about contributions with their position in the value chain
ALTER TABLE projects ADD COLUMN IF NOT EXISTS contributions JSONB;

-- STEP 5: Add key results with detailed metrics
-- This will store structured data for key results with values, descriptions, and sub-descriptions
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_results JSONB;

-- STEP 6: Add tags for skills and technologies
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT[];

-- STEP 7: Add additional metrics if needed
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metrics JSONB;

-- STEP 8: Enable Row Level Security for projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- STEP 9: Create RLS policy for public read access to published projects
CREATE POLICY "Public read access to published projects" ON projects
  FOR SELECT USING (published = true);

-- STEP 10: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON projects(order_index ASC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- STEP 11: Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- STEP 12: Add updated_at trigger to projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DATA STRUCTURE EXAMPLES
-- =====================================================

-- STEP 13: Example data structures for JSONB fields

-- Example for 'contributions' field (with value chain positioning):
-- [
--   {
--     "contribution": "Research (Lit review, data collection, analysis)",
--     "value_chain_position": "upstream",
--     "type": "Data Analysis"
--   },
--   {
--     "contribution": "Report preparation and stakeholder presentation",
--     "value_chain_position": "downstream", 
--     "type": "Decision Strategy"
--   }
-- ]

-- Example for 'key_results' field (structured metrics):
-- [
--   {
--     "value": "$11.11 Bn",
--     "label": "Total Market Size",
--     "description": "Education Market in 2022 (B2B-B2C)",
--     "category": "Market Sizing"
--   },
--   {
--     "value": "$6.1 Bn", 
--     "label": "K-12 After School",
--     "description": "Largest market segment",
--     "category": "Market Segmentation"
--   }
-- ]

-- Example for 'metrics' field (additional structured data):
-- [
--   {
--     "metric": "User Growth",
--     "value": "150%",
--     "period": "Q1-Q2 2023",
--     "description": "Monthly active users increase"
--   }
-- ]

-- Example for 'tags' field (TEXT array):
-- ['Market Research', 'Due Diligence', 'EdTech', 'Bangladesh', 'Investment']

-- =====================================================
-- SCHEMA COMPLETE
-- =====================================================
