#!/bin/bash
cd /Users/mukit_10ms/Documents/GitHub/Portfolio/database

cat schema.sql > full_migration_v2.sql

cat << 'INNER_EOF' >> full_migration_v2.sql

-- =====================================================
-- MISSING TABLES (Categories, Resources, Learnings)
-- =====================================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT,
  "order" INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
  slug TEXT PRIMARY KEY,
  resource_type TEXT,
  title TEXT NOT NULL,
  summary TEXT,
  link_label TEXT,
  link_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

create table if not exists public.learnings (
  id uuid not null default gen_random_uuid (),
  title text not null,
  content text not null,
  type text null default 'flashcard'::text,
  difficulty text null default 'medium'::text,
  tags text[] null default '{}'::text[],
  metadata jsonb null default '{}'::jsonb,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  published boolean null default false,
  constraint learnings_pkey primary key (id),
  constraint learnings_difficulty_check check (
    (
      difficulty = any (array['easy'::text, 'medium'::text, 'hard'::text])
    )
  ),
  constraint learnings_type_check check (
    (
      type = any (
        array[
          'flashcard'::text,
          'article'::text,
          'video'::text,
          'quiz'::text,
          'tutorial'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

-- Security / RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE learnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access to published categories" ON categories FOR SELECT USING (published = true);
CREATE POLICY "Public read access to resources" ON resources FOR SELECT USING (true);
CREATE POLICY "Public read access to published learnings" ON learnings FOR SELECT USING (published = true);

-- Triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
create trigger update_learnings_updated_at BEFORE update on learnings for EACH row execute FUNCTION update_updated_at_column();

-- =====================================================
-- DATA INSERTS
-- =====================================================

INNER_EOF

# Append rows
echo "" >> full_migration_v2.sql
cat migrations/categories_rows.sql >> full_migration_v2.sql
echo ";" >> full_migration_v2.sql

echo "" >> full_migration_v2.sql
cat migrations/projects_rows.sql >> full_migration_v2.sql
echo ";" >> full_migration_v2.sql

echo "" >> full_migration_v2.sql
cat migrations/collaborators_rows.sql >> full_migration_v2.sql
echo ";" >> full_migration_v2.sql

echo "" >> full_migration_v2.sql
cat migrations/failures_rows.sql >> full_migration_v2.sql
echo ";" >> full_migration_v2.sql

echo "" >> full_migration_v2.sql
cat migrations/resources_rows.sql >> full_migration_v2.sql
echo ";" >> full_migration_v2.sql

echo "Migration script full_migration_v2.sql created successfully."

