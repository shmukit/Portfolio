'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Project } from '../../types/project';
import { SAMPLE_PROJECTS } from '../sample-data';

export interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if Supabase is properly configured
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey && supabaseUrl !== 'https://your-project.supabase.co') {
        try {
          const { data, error: supabaseError } = await supabase
            .from('projects')
            .select('*')
            .order('year', { ascending: false })
            .order('order_index', { ascending: true });

          if (supabaseError) {
            console.warn('Supabase fetch failed, using sample data:', supabaseError);
            setProjects(SAMPLE_PROJECTS);
            return;
          }

          if (data && data.length > 0) {
            setProjects(data as Project[]);
            return;
          }
        } catch (supabaseErr) {
          console.warn('Supabase connection failed, using sample data:', supabaseErr);
        }
      }

      // Use sample data if no Supabase or no data
      setProjects(SAMPLE_PROJECTS);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      // Fall back to sample data even on error
      setProjects(SAMPLE_PROJECTS);
    } finally {
      setLoading(false);
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
