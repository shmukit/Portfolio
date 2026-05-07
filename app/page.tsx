import { ErrorBoundary } from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import ProjectStructuredData from './components/ProjectStructuredData';
import ClientLayout from './components/ClientLayout';
import LoadRecovery from './components/LoadRecovery';
import { getProjects } from '../lib/getProjects';
import { Project } from '../types/project';

// Enable static generation with revalidation
export const revalidate = 86400; // 24 hours

// This is now a Server Component
export default async function Home() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch (err) {
    console.error('Failed to fetch projects:', err);
    error = err instanceof Error ? err.message : 'Failed to load projects';
  }

  if (error) {
    return <LoadRecovery message={error} />;
  }

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <ProjectStructuredData projects={projects} />
      <ClientLayout projects={projects} />
    </ErrorBoundary>
  );
}

