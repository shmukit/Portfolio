import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Collaborator } from '../../types/project';

export interface UseCollaboratorsReturn {
  collaborators: Collaborator[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCollaborators = (projectId?: string): UseCollaboratorsReturn => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollaborators = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!supabase) {
        throw new Error('Supabase client not configured');
      }

      let query = supabase
        .from('collaborators')
        .select('*')
        .order('order_index', { ascending: true });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      const formattedCollaborators: Collaborator[] = (data || []).map((collaborator: any) => ({
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

      setCollaborators(formattedCollaborators);
    } catch (err) {
      // If table doesn't exist, return empty array instead of throwing
      if (err && typeof err === 'object' && 'code' in err && 
          (err.code === 'PGRST116' || (err as any).message?.includes('relation "collaborators" does not exist'))) {
        console.log('Collaborators table does not exist yet, returning empty array');
        setCollaborators([]);
        return;
      }
      console.error('Error fetching collaborators:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch collaborators');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [projectId]);

  return {
    collaborators,
    loading,
    error,
    refetch: fetchCollaborators,
  };
};
