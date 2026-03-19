-- =====================================================
-- PORTFOLIO DATABASE SCHEMA
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROJECTS TABLE
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Detailed project fields
  phase TEXT,
  project_type TEXT,
  situation TEXT,
  task TEXT,
  result TEXT,
  contributions JSONB,
  key_results JSONB,
  tags TEXT[],
  metrics JSONB,
  
  -- URL fields
  company_url TEXT,
  project_url TEXT,
  report_url TEXT,
  demo_url TEXT,
  company_label TEXT,
  project_label TEXT,
  report_label TEXT,
  demo_label TEXT,
  company_urls JSONB,
  project_urls JSONB,
  report_urls JSONB,
  demo_urls JSONB,
  video_poster TEXT,
  video_fallback TEXT
);

-- COLLABORATORS TABLE
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  linkedin_url TEXT,
  profile_image_url TEXT,
  role TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- FAILURES TABLE (Mirror structure for specific tracking)
CREATE TABLE IF NOT EXISTS failures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  company TEXT,
  role TEXT,
  description TEXT,
  lessons TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  category TEXT,
  is_unlocked BOOLEAN DEFAULT true,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Additional fields
  phase TEXT,
  project_type TEXT,
  situation TEXT,
  task TEXT,
  result TEXT,
  contributions JSONB,
  key_results JSONB,
  tags TEXT[],
  metrics JSONB,
  
  -- URL fields
  company_url TEXT,
  project_url TEXT,
  report_url TEXT,
  demo_url TEXT,
  company_label TEXT,
  project_label TEXT,
  report_label TEXT,
  demo_label TEXT,
  company_urls JSONB,
  project_urls JSONB,
  report_urls JSONB,
  demo_urls JSONB,
  video_poster TEXT,
  video_fallback TEXT
);

-- SECURITY (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE failures ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public read access to published projects" ON projects
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access to collaborators" ON collaborators
  FOR SELECT USING (true);

CREATE POLICY "Public read access to published failures" ON failures
  FOR SELECT USING (published = true);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_collaborators_project_id ON collaborators(project_id);
CREATE INDEX IF NOT EXISTS idx_failures_published ON failures(published);

-- TRIGGERS FOR UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_collaborators_updated_at BEFORE UPDATE ON collaborators
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_failures_updated_at BEFORE UPDATE ON failures
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
