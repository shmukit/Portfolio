import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Failure } from '../../types/project';

export interface UseFailuresReturn {
  failures: Failure[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/** Snake_case row from PostgREST (typed loosely; map to Failure). */
interface FailureDbRow {
  id: string;
  title: string;
  year: number;
  company?: string | null;
  role?: string | null;
  description?: string | null;
  lessons?: string | null;
  image_url?: string | null;
  order_index?: number | null;
  category?: string | null;
  is_unlocked?: boolean | null;
  published?: boolean | null;
  created_at?: string;
  updated_at?: string;
  phase?: string | null;
  project_type?: string | null;
  situation?: string | null;
  task?: string | null;
  result?: string | null;
  contributions?: unknown;
  key_results?: unknown;
  tags?: unknown;
  metrics?: unknown;
  company_url?: string | null;
  project_url?: string | null;
  report_url?: string | null;
  demo_url?: string | null;
  company_label?: string | null;
  project_label?: string | null;
  report_label?: string | null;
  demo_label?: string | null;
  company_urls?: unknown;
  project_urls?: unknown;
  report_urls?: unknown;
  demo_urls?: unknown;
  video_poster?: string | null;
  video_fallback?: string | null;
}

export const useFailures = (): UseFailuresReturn => {
  const [failures, setFailures] = useState<Failure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFailures = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!supabase) {
        throw new Error('Supabase client not configured');
      }

      const { data, error: fetchError } = await supabase
        .from('failures')
        .select('*')
        .eq('published', true)
        .order('order_index', { ascending: true });

      if (fetchError) {
        // If table doesn't exist, return empty array instead of throwing
        if (fetchError.code === 'PGRST116' || fetchError.message?.includes('relation "failures" does not exist')) {
          console.log('Failures table does not exist yet, returning empty array');
          setFailures([]);
          return;
        }
        throw fetchError;
      }

      const formattedFailures: Failure[] = (data || []).map((row) => {
        const failure = row as FailureDbRow;
        return {
        id: failure.id,
        title: failure.title,
        year: failure.year,
        company: failure.company ?? undefined,
        role: failure.role ?? undefined,
        description: failure.description ?? undefined,
        lessons: failure.lessons ?? undefined,
        imageUrl: failure.image_url ?? undefined,
        orderIndex: failure.order_index ?? undefined,
        category: failure.category ?? undefined,
        isUnlocked: failure.is_unlocked ?? undefined,
        published: failure.published ?? undefined,
        createdAt: failure.created_at,
        updatedAt: failure.updated_at,
        phase: failure.phase ?? undefined,
        projectType: failure.project_type ?? undefined,
        situation: failure.situation ?? undefined,
        task: failure.task ?? undefined,
        result: failure.result ?? undefined,
        contributions: failure.contributions as Failure['contributions'],
        keyResults: failure.key_results as Failure['keyResults'],
        tags: failure.tags as Failure['tags'],
        metrics: failure.metrics as Failure['metrics'],
        companyUrl: failure.company_url ?? undefined,
        projectUrl: failure.project_url ?? undefined,
        reportUrl: failure.report_url ?? undefined,
        demoUrl: failure.demo_url ?? undefined,
        companyLabel: failure.company_label ?? undefined,
        projectLabel: failure.project_label ?? undefined,
        reportLabel: failure.report_label ?? undefined,
        demoLabel: failure.demo_label ?? undefined,
        companyUrls: failure.company_urls as Failure['companyUrls'],
        projectUrls: failure.project_urls as Failure['projectUrls'],
        reportUrls: failure.report_urls as Failure['reportUrls'],
        demoUrls: failure.demo_urls as Failure['demoUrls'],
        videoPoster: failure.video_poster ?? undefined,
        videoFallback: failure.video_fallback ?? undefined,
        };
      });

      setFailures(formattedFailures);
    } catch (err) {
      console.error('Error fetching failures:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch failures');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFailures();
  }, []);

  return {
    failures,
    loading,
    error,
    refetch: fetchFailures,
  };
};
