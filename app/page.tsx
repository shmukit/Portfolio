import { ErrorBoundary } from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';
import ProjectStructuredData from './components/ProjectStructuredData';
import ClientLayout from './components/ClientLayout';
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

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <PerformanceMonitor />
      <ProjectStructuredData projects={projects} />
      <ClientLayout projects={projects} />
    </ErrorBoundary>
  );
}

