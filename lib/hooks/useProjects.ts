'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Project, Collaborator } from '../../types/project';

interface DatabaseProject {
  id: string;
  title: string;
  year: number;
  role: string;
  company: string;
  description?: string;
  lessons?: string;
  image_url?: string;
  order_index?: number;
  category?: string;
  is_unlocked?: boolean;
  created_at?: string;
  updated_at?: string;
  project_type?: string;
  company_url?: string;
  project_url?: string;
  report_url?: string;
  demo_url?: string;
  company_label?: string;
  project_label?: string;
  report_label?: string;
  demo_label?: string;
  company_urls?: unknown;
  project_urls?: unknown;
  report_urls?: unknown;
  demo_urls?: unknown;
  contributions?: unknown;
  key_results?: unknown;
  tags?: unknown;
  metrics?: unknown;
}

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Helper function to fetch collaborators for a project
const fetchCollaboratorsForProject = async (projectId: string): Promise<Collaborator[]> => {
  try {
    if (!supabase) {
      console.error('Supabase client not configured');
      return [];
    }

    const { data, error } = await supabase
      .from('collaborators')
      .select('*')
      .eq('project_id', projectId)
      .order('order_index', { ascending: true });

    if (error) {
      // If table doesn't exist, return empty array instead of throwing
      if (error.code === 'PGRST116' || error.message?.includes('relation "collaborators" does not exist')) {
        console.log('Collaborators table does not exist yet, returning empty array');
        return [];
      }
      console.error('Error fetching collaborators:', error);
      return [];
    }

    return (data || []).map((collaborator: Record<string, any>) => ({
      id: collaborator.id,
      projectId: collaborator.project_id,
      name: collaborator.name,
      linkedinUrl: collaborator.linkedin_url,
      profileImageUrl: collaborator.profile_image_url,
      role: collaborator.role,
      orderIndex: collaborator.order_index,
      createdAt: collaborator.created_at,
      updatedAt: collaborator.updated_at,
    }));
  } catch (err) {
    console.error('Error fetching collaborators:', err);
    return [];
  }
};

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]); // Start with empty array
  const [loading, setLoading] = useState(true); // Start as true since we need to fetch data
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching projects...');

      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log('🔧 Supabase config:', { 
        url: supabaseUrl, 
        hasKey: !!supabaseKey,
        hasSupabase: !!supabase 
      });

      if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project.supabase.co' && supabase) {
        try {
          console.log('📡 Making Supabase request...');
          const { data, error: supabaseError } = await supabase
            .from('projects')
            .select('*')
            .order('year', { ascending: false })
            .order('order_index', { ascending: true });

          if (supabaseError) {
            console.error('❌ Supabase fetch failed:', supabaseError);
            setError(supabaseError.message);
            return;
          }

          console.log('✅ Supabase response:', { dataLength: data?.length, data: data?.slice(0, 2) });

          if (data && data.length > 0) {
            // Transform database fields to match TypeScript interface
            const transformedProjects = await Promise.all(data.map(async (project: DatabaseProject) => {
              // Fetch collaborators for each project
              const collaborators = await fetchCollaboratorsForProject(project.id);
              
              return {
                ...project,
                // Basic field transformations
                imageUrl: project.image_url,
                orderIndex: project.order_index,
                isUnlocked: project.is_unlocked,
                createdAt: project.created_at,
                updatedAt: project.updated_at,
                projectType: project.project_type,
                
                // URL field transformations
                companyUrl: project.company_url,
                projectUrl: project.project_url,
                reportUrl: project.report_url,
                demoUrl: project.demo_url,
                
                // URL label transformations
                companyLabel: project.company_label,
                projectLabel: project.project_label,
                reportLabel: project.report_label,
                demoLabel: project.demo_label,
                
                // Multiple URLs field transformations
                companyUrls: project.company_urls || [],
                projectUrls: project.project_urls || [],
                reportUrls: project.report_urls || [],
                demoUrls: project.demo_urls || [],
                
                // JSONB field transformations
                contributions: project.contributions || [],
                keyResults: project.key_results || [],
                tags: project.tags || [],
                metrics: project.metrics || {},
                
                // Collaborators
                collaborators: collaborators,
              };
            }));
            console.log('🔄 Transformed projects:', transformedProjects.length);
            setProjects(transformedProjects as Project[]);
            return;
          }
        } catch (supabaseErr) {
          console.error('❌ Supabase connection failed:', supabaseErr);
          setError('Failed to connect to database');
        }
      } else {
        console.warn('⚠️ Supabase not configured properly');
        setError('Supabase not configured');
      }

      // No data available
      console.log('📭 No data available, setting empty array');
      setProjects([]);
    } catch (err) {
      console.error('❌ Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
      console.log('✅ Fetch completed, loading set to false');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const refetch = async () => {
    await fetchProjects();
  };

  return { projects, loading, error, refetch };
};
