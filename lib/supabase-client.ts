import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  company: string;
  role: string;
  phase?: string;
  project_type?: string;
  image_url?: string;
  dashboard_url?: string;
  situation?: string;
  task?: string;
  result?: string;
  contributions?: string[];
  metrics?: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  tags?: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface Flashcard {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags?: string[];
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  type: 'project' | 'flashcard' | 'learning';
  order: number;
  created_at: string;
  updated_at: string;
  published: boolean;
}
