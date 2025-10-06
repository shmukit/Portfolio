import { Project } from './project';

export interface SidebarProps {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
  className?: string;
}

export interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  priority?: boolean;
  className?: string;
}

export interface ProjectDetailPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface TimelineProps {
  projects: Project[];
  loading?: boolean;
  selectedProject: Project | null;
  onProjectSelect: (project: Project) => void;
  onProjectClose: () => void;
  className?: string;
}

export interface ScrollSpyHookReturn {
  activeYear: number | null;
  containerRef: React.RefObject<HTMLElement | null>;
}

export interface PanelStateHookReturn {
  selectedProject: Project | null;
  isOpen: boolean;
  openPanel: (project: Project) => void;
  closePanel: () => void;
}

export interface LoadingStateProps {
  isLoading: boolean;
  error?: string | null;
  children: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
