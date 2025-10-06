'use client';

import { ErrorBoundary } from './components/ErrorBoundary';
import Image from 'next/image';
import { useProjects } from '../lib/hooks/useProjects';
import { usePanelState } from '../lib/hooks/usePanelState';
import { Project } from '../types/project';

export default function Home() {
  const { projects, loading, error } = useProjects();
  const { selectedProject, openPanel, closePanel } = usePanelState();


  // Get unique years for sidebar
  const years = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => b - a);

  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  // Handle project selection
  const handleProjectSelect = (project: Project) => {
    openPanel(project);
  };

  // Handle panel close
  const handleProjectClose = () => {
    closePanel();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
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
      <div className="min-h-screen bg-white">
        {/* 5-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
          {/* Column 1 - Empty spacer */}
          <div className="hidden lg:block"></div>

          {/* Column 2 - Year/Project Navigator */}
          <div className="fixed lg:static left-4 top-1/2 lg:top-0 transform -translate-y-1/2 lg:transform-none z-10 lg:flex lg:items-center lg:justify-center lg:min-h-screen lg:py-8">
            <div className="space-y-3 lg:space-y-4">
              {years.map((year) => (
                <div key={year} className="relative group">
                  {/* Year Button */}
                  <button
                    className="w-14 h-14 lg:w-16 lg:h-16 bg-gray-900 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 active:bg-gray-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                    onClick={() => {
                      // Toggle project list visibility
                      const projectList = document.getElementById(`projects-${year}`);
                      if (projectList) {
                        projectList.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="text-xs lg:text-sm font-bold">{year}</span>
                  </button>

                  {/* Projects Dropdown for this year */}
                  <div 
                    id={`projects-${year}`}
                    className="hidden lg:group-hover:block absolute left-full ml-3 lg:ml-4 top-0 w-56 lg:w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3 lg:p-4 z-20"
                  >
                    <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">{year}</div>
                    <div className="space-y-1">
                      {projectsByYear[year]?.map((project) => (
                        <button
                          key={project.id}
                          className="w-full text-left text-sm text-gray-700 hover:text-accent cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                          onClick={() => handleProjectSelect(project)}
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columns 3-4 - Central Content Area (Always Visible) */}
          <div className="lg:col-span-2 flex items-center justify-center min-h-screen px-6 lg:px-12 py-16">
            <div className="text-center space-y-6 lg:space-y-8 max-w-2xl">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 lg:mb-5">
                  Your Name
                </h1>
                <p className="text-xl lg:text-2xl text-accent font-medium mb-3">
                  Product Designer & Developer
                </p>
                <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                  Passionate about creating meaningful digital experiences
                </p>
              </div>

              {/* CTA Buttons - Always Visible */}
              <div className="flex flex-wrap gap-3 lg:gap-4 justify-center pt-4">
                <a
                  href="#"
                  className="px-6 lg:px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:shadow-lg text-base"
                >
                  About / CV
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="px-6 lg:px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-base"
                >
                  Email
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 lg:px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-base"
                >
                  LinkedIn
                </a>
              </div>

              {/* Last Update */}
              <div className="text-sm text-gray-500 pt-8">
                Last update: Aug &apos;22
              </div>
            </div>
          </div>

          {/* Column 5 - Empty spacer */}
          <div className="hidden lg:block"></div>
        </div>

        {/* Project Detail Modal - Full screen on mobile, large centered on desktop */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-0 lg:p-8" 
            onClick={handleProjectClose}
          >
            <div 
              className="bg-white w-full h-full lg:w-auto lg:h-auto lg:rounded-3xl shadow-2xl lg:max-w-3xl lg:max-h-[85vh] overflow-y-auto relative" 
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleProjectClose}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 hover:bg-gray-100 rounded-full z-10 bg-white/90 backdrop-blur-sm shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal content - matches reference design */}
              <div className="p-6 lg:p-10">
                {/* Project Image - full width, prominent */}
                {selectedProject.imageUrl && (
                  <div className="w-full aspect-video lg:aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 lg:mb-8">
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      width={1200}
                      height={750}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Project Details */}
                <div className="space-y-6 lg:space-y-8">
                  <div>
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg lg:text-xl text-accent font-medium mb-6">
                      {selectedProject.role} • {selectedProject.company}
                    </p>

                    {selectedProject.description && (
                      <div className="mb-6 lg:mb-8">
                        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                          {selectedProject.description}
                        </p>
                      </div>
                    )}

                    {selectedProject.lessons && (
                      <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                        <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">
                          Key Learnings
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                          {selectedProject.lessons}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
