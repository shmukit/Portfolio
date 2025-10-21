import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Failure } from '../../types/project';

export interface UseFailuresReturn {
  failures: Failure[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
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

      const formattedFailures: Failure[] = (data || []).map((failure: Record<string, any>) => ({
        id: failure.id,
        title: failure.title,
        year: failure.year,
        company: failure.company,
        role: failure.role,
        description: failure.description,
        lessons: failure.lessons,
        imageUrl: failure.image_url,
        orderIndex: failure.order_index,
        category: failure.category,
        isUnlocked: failure.is_unlocked,
        published: failure.published,
        createdAt: failure.created_at,
        updatedAt: failure.updated_at,
        phase: failure.phase,
        projectType: failure.project_type,
        situation: failure.situation,
        task: failure.task,
        result: failure.result,
        contributions: failure.contributions,
        keyResults: failure.key_results,
        tags: failure.tags,
        metrics: failure.metrics,
        companyUrl: failure.company_url,
        projectUrl: failure.project_url,
        reportUrl: failure.report_url,
        demoUrl: failure.demo_url,
        companyLabel: failure.company_label,
        projectLabel: failure.project_label,
        reportLabel: failure.report_label,
        demoLabel: failure.demo_label,
        companyUrls: failure.company_urls,
        projectUrls: failure.project_urls,
        reportUrls: failure.report_urls,
        demoUrls: failure.demo_urls,
        videoPoster: failure.video_poster,
        videoFallback: failure.video_fallback,
      }));

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
