'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { ProjectDetailPanelProps } from '../../types/ui';
import { slideInRight, backdropFade } from '../../lib/utils/animations';

export const ProjectDetailPanel = ({
  project,
  isOpen,
  onClose,
  className = ''
}: ProjectDetailPanelProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={`fixed inset-0 bg-black/50 z-40 ${className}`}
            variants={backdropFade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full md:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0.1}
            onDragEnd={(event, info) => {
              if (info.offset.x > 100) {
                onClose();
              }
            }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close project details"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </motion.button>

            {/* Content */}
            <div className="p-4 md:p-8 pt-16">
              <div className="max-w-2xl mx-auto">
                {/* Hero image */}
                {project.imageUrl && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  </motion.div>
                )}

                {/* Title and meta */}
                <motion.header
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h1>
                  <p className="text-accent text-lg font-medium">
                    {project.role} • {project.company}
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
                      {project.year}
                    </span>
                    {project.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                        {project.category}
                      </span>
                    )}
                  </div>
                </motion.header>

                {/* Description */}
                {project.description && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      About this project
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </motion.div>
                )}

                {/* Key Learnings */}
                {project.lessons && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Key learnings & insights
                    </h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">
                        {project.lessons}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Project status */}
                {project.isUnlocked === false && (
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-800">
                            Project Locked
                          </h3>
                          <div className="mt-2 text-sm text-amber-700">
                            <p>
                              This project is part of the gamification system. View more projects to unlock additional details and insights.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <button className="flex-1 btn btn-primary">
                    View Case Study
                  </button>
                  <button className="flex-1 btn btn-secondary">
                    View on GitHub
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
