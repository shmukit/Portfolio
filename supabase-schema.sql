-- Supabase Schema for Portfolio & Learning Content
-- Run this in your Supabase SQL editor

-- Enable Row Level Security
ALTER TABLE IF EXISTS projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  year INTEGER NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  lessons TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  category TEXT,
  is_unlocked BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning content table (can be displayed as flashcards)
CREATE TABLE IF NOT EXISTS learnings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT CHECK (type IN ('flashcard', 'article', 'video', 'quiz', 'tutorial')) DEFAULT 'flashcard',
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  type TEXT CHECK (type IN ('project', 'learning')) NOT NULL,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Insert default categories
INSERT INTO categories (name, description, type, "order") VALUES
  ('Product Management', 'Core PM skills and methodologies', 'learning', 1),
  ('Data Analysis', 'Analytics, metrics, and data-driven decisions', 'learning', 2),
  ('Design Thinking', 'User experience and design principles', 'learning', 3),
  ('Technical', 'Development and technical concepts', 'learning', 4),
  ('Business Strategy', 'Strategic thinking and business models', 'learning', 5),
  ('Projects', 'Portfolio projects and case studies', 'project', 1),
  ('Learning', 'General learning content and resources', 'learning', 6)
ON CONFLICT (name) DO NOTHING;

-- Row Level Security Policies
-- Allow public read access to all projects (portfolio is public)
CREATE POLICY "Public read access to projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access to published learnings" ON learnings
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access to published categories" ON categories
  FOR SELECT USING (published = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_order_index ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_learnings_published ON learnings(published);
CREATE INDEX IF NOT EXISTS idx_learnings_type ON learnings(type);
CREATE INDEX IF NOT EXISTS idx_learnings_difficulty ON learnings(difficulty);
CREATE INDEX IF NOT EXISTS idx_learnings_created_at ON learnings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_categories_order ON categories("order");

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_learnings_updated_at BEFORE UPDATE ON learnings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
