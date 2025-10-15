import { createClient } from '@supabase/supabase-js';

// Only initialize Supabase if environment variables are available
let supabase: any = null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-project.supabase.co') {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // No authentication needed for public portfolio
      autoRefreshToken: false,
    },
  });
}

export { supabase };

// Database schema for projects table
export const PROJECTS_TABLE = 'projects';

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          year: number;
          role: string;
          company: string;
          description: string | null;
          lessons: string | null;
          image_url: string | null;
          order_index: number | null;
          category: string | null;
          is_unlocked: boolean | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          year: number;
          role: string;
          company: string;
          description?: string | null;
          lessons?: string | null;
          image_url?: string | null;
          order_index?: number | null;
          category?: string | null;
          is_unlocked?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          year?: number;
          role?: string;
          company?: string;
          description?: string | null;
          lessons?: string | null;
          image_url?: string | null;
          order_index?: number | null;
          category?: string | null;
          is_unlocked?: boolean | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
