'use client';

import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TimelineProps } from '../../types/ui';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailPanel } from './ProjectDetailPanel';
import { useScrollSpy } from '../../lib/hooks/useScrollSpy';
import { getProjectsByYear, sortProjectsByYear } from '../../lib/sample-data';
import { staggerContainer } from '../../lib/utils/animations';
import { SkeletonCards } from './ui/SkeletonCard';

export const Timeline = ({
  projects,
  loading = false,
  selectedProject,
  onProjectSelect,
  onProjectClose,
  className = ''
}: TimelineProps) => {
  // Group and sort projects by year
  const projectsByYear = useMemo(() => {
    const grouped = getProjectsByYear(projects);
    return sortProjectsByYear(grouped);
  }, [projects]);

  // Get sorted years array for sidebar
  const years = useMemo(() => {
    return Object.keys(projectsByYear).map(Number).sort((a, b) => b - a);
  }, [projectsByYear]);

  // Scroll spy for active year tracking
  const { containerRef } = useScrollSpy(years);

  const setContainerRef = useCallback((node: HTMLElement | null) => {
    if (containerRef.current !== node) {
      containerRef.current = node;
    }
  }, [containerRef]);

  return (
    <>
      <main
        ref={setContainerRef}
        className={`ml-80 min-h-screen bg-gray-50/30 ${className}`}
      >
        <div className="max-w-4xl mx-auto p-8">
          {years.map((year) => {
            const yearProjects = projectsByYear[year];

            return (
              <motion.section
                key={year}
                className="mb-16 scroll-mt-32"
                data-year={year}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Year header - sticky */}
                <motion.div
                  className="sticky top-8 bg-white/80 backdrop-blur-sm py-4 mb-8 z-10 border-b border-gray-100"
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: "easeOut" }
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {year}
                    </h2>
                    <div className="text-sm text-gray-500">
                      {yearProjects.length} project{yearProjects.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </motion.div>

                {/* Projects grid */}
                <motion.div
                  className="grid gap-6"
                  variants={staggerContainer}
                >
                  {yearProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.1,
                            duration: 0.5,
                            ease: "easeOut"
                          }
                        }
                      }}
                    >
                      <ProjectCard
                        project={project}
                        onClick={onProjectSelect}
                        priority={year === Math.max(...years) && index === 0}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.section>
            );
          })}

          {/* Loading state */}
          {loading && (
            <motion.section
              className="mb-16 scroll-mt-32"
              data-year="loading"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="sticky top-8 bg-white/80 backdrop-blur-sm py-4 mb-8 z-10 border-b border-gray-100"
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-gray-200 rounded animate-pulse w-32" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
                </div>
              </motion.div>

              <SkeletonCards count={3} />
            </motion.section>
          )}

          {/* Loading state for when there are no projects */}
          {projects.length === 0 && !loading && (
            <motion.div
              className="flex flex-col items-center justify-center py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-500 text-center max-w-sm">
                Projects will appear here once you connect your Supabase database or add sample data.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      {/* Detail panel */}
      <ProjectDetailPanel
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={onProjectClose}
      />
    </>
  );
};
