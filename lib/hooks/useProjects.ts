'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Project } from '../../types/project';

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

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
            const transformedProjects = data.map((project: any) => ({
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
            }));
            console.log('🔄 Transformed projects:', transformedProjects.slice(0, 2));
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
