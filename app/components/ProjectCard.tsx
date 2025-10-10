'use client';

import { Project } from '../../types/project';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const getPhaseColor = (phase?: string) => {
    switch (phase) {
      case '0 to 1': return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case '1 to n': return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default: return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getProjectTypeColor = (type?: string) => {
    switch (type) {
      case 'Research': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Prod Dev': return 'bg-green-50 text-green-700 border-green-200';
      case 'Analysis': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
        
        {/* Header with Phase and Project Type */}
        <div className="relative">
          {project.imageUrl && (
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={400}
                height={192}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          )}
          
          {/* Phase and Project Type Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {project.phase && (
              <div className={`${getPhaseColor(project.phase)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                {project.phase}
              </div>
            )}
            {project.projectType && (
              <div className={`${getProjectTypeColor(project.projectType)} px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-white/90`}>
                {project.projectType}
              </div>
            )}
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Role */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {project.role} • {project.company}
            </p>
          </div>

          {/* Description */}
          {project.description && (
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>
          )}

          {/* Key Metrics */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                {project.metrics.slice(0, 2).map((metric, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                    <div className="text-xs text-gray-600">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Result Preview */}
          {project.result && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2 font-medium">Key Result:</p>
              <p className="text-sm text-gray-700 line-clamp-2">
                {project.result}
              </p>
            </div>
          )}

          {/* Hover Indicator */}
          <div className="flex items-center justify-end mt-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-sm font-medium">View Details</span>
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}