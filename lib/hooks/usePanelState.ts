'use client';

import { useState, useCallback, useEffect } from 'react';
import { Project } from '../../types/project';
import { PanelStateHookReturn } from '../../types/ui';

export const usePanelState = (): PanelStateHookReturn => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = useCallback((project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);

    // Prevent body scroll when panel is open
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);

    // Restore body scroll after animation completes
    setTimeout(() => {
      setSelectedProject(null);
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    }, 300); // Match animation duration
  }, []);

  // Close panel on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closePanel();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, closePanel]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        closePanel();
      }
    };

    if (isOpen) {
      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, [isOpen, closePanel]);

  return {
    selectedProject,
    isOpen,
    openPanel,
    closePanel
  };
};
