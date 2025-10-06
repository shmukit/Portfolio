'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ProjectCardProps } from '../../types/ui';
import { fadeInUp, cardHover } from '../../lib/utils/animations';

export const ProjectCard = ({ project, onClick, priority = false, className = '' }: ProjectCardProps) => {
  return (
    <motion.article
      className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer group ${className}`}
      whileHover={cardHover}
      whileTap={{ scale: 0.98 }}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      <div className="flex gap-4">
        {/* Thumbnail */}
        {project.imageUrl && (
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={project.imageUrl}
                alt={`${project.title} thumbnail`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="64px"
                priority={priority}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-accent transition-colors duration-200 line-clamp-1">
              {project.title}
            </h3>
            {project.isUnlocked === false && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                Locked
              </span>
            )}
          </div>

          <p className="text-accent font-medium mb-2 text-sm">
            {project.role} • {project.company}
          </p>

          {project.description && (
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
              {project.year}
            </span>

            {project.category && (
              <span className="text-xs text-gray-500">
                {project.category}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover indicator */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
    </motion.article>
  );
};
