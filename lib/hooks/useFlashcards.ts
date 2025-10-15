"use client";

import { useState, useEffect } from 'react';
import { supabase, Flashcard } from '../supabase-client';

export function useFlashcards(category?: string) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('flashcards')
          .select('*')
          .eq('published', true);

        if (category) {
          query = query.eq('category', category);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setFlashcards(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching flashcards:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [category]);

  return { flashcards, loading, error };
}
