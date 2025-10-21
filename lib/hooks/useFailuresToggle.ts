'use client';

import { useState, useCallback } from 'react';

interface UseFailuresToggleReturn {
  showFailures: boolean;
  toggleFailures: () => void;
}

export const useFailuresToggle = (): UseFailuresToggleReturn => {
  const [showFailures, setShowFailures] = useState(false);

  const toggleFailures = useCallback(() => {
    setShowFailures(prev => !prev);
  }, []);

  return {
    showFailures,
    toggleFailures,
  };
};
