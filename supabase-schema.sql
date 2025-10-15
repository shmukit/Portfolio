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
  year TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  phase TEXT,
  project_type TEXT,
  image_url TEXT,
  dashboard_url TEXT,
  situation TEXT,
  task TEXT,
  result TEXT,
  contributions JSONB DEFAULT '[]'::jsonb,
  metrics JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false
);

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  type TEXT CHECK (type IN ('project', 'flashcard', 'learning')) NOT NULL,
  order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Insert default categories
INSERT INTO categories (name, description, type, "order") VALUES
  ('Product Management', 'Core PM skills and methodologies', 'flashcard', 1),
  ('Data Analysis', 'Analytics, metrics, and data-driven decisions', 'flashcard', 2),
  ('Design Thinking', 'User experience and design principles', 'flashcard', 3),
  ('Technical', 'Development and technical concepts', 'flashcard', 4),
  ('Business Strategy', 'Strategic thinking and business models', 'flashcard', 5),
  ('Projects', 'Portfolio projects and case studies', 'project', 1),
  ('Learning', 'General learning content and resources', 'learning', 1)
ON CONFLICT (name) DO NOTHING;

-- Row Level Security Policies
-- Allow public read access to published content
CREATE POLICY "Public read access to published projects" ON projects
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access to published flashcards" ON flashcards
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access to published categories" ON categories
  FOR SELECT USING (published = true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(published);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_flashcards_published ON flashcards(published);
CREATE INDEX IF NOT EXISTS idx_flashcards_category ON flashcards(category);
CREATE INDEX IF NOT EXISTS idx_flashcards_created_at ON flashcards(created_at DESC);
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

CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
