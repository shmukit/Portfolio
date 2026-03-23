'use client';

import { Project } from '../../../types/project';

export default function ProjectMetaBadges({
  project,
  theme,
  compact
}: {
  project: Project;
  theme: string;
  compact: boolean;
}) {
  return (
    <div className={`flex ${compact ? 'gap-2 flex-wrap' : 'gap-3'} mb-4`}>
      {project.category && (
        <div className={`${compact ? 'px-2 py-1 text-[9px]' : 'px-3 py-1 text-xs'} rounded-full font-medium ${
          theme === 'dark'
            ? 'bg-gray-700 text-gray-200'
            : 'bg-gray-200 text-gray-700'
        }`}>
          {project.category}
        </div>
      )}
      {project.phase && (
        <div className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white ${compact ? 'px-2 py-1 text-[9px]' : 'px-3 py-1 text-xs'} rounded-full font-semibold`}>
          {project.phase}
        </div>
      )}
      {project.projectType && (
        <div className={`${compact ? 'px-2 py-1 text-[9px]' : 'px-3 py-1 text-xs'} rounded-full font-medium border ${
          theme === 'dark'
            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
            : 'bg-blue-50 text-blue-700 border-blue-200'
        }`}>
          {project.projectType}
        </div>
      )}
      <div className={`${compact ? 'px-2 py-1 text-[9px]' : 'px-3 py-1 text-xs'} rounded-full font-medium ${
        theme === 'dark'
          ? 'bg-gray-700 text-gray-300'
          : 'bg-gray-100 text-gray-700'
      }`}>
        {project.year}
      </div>
    </div>
  );
}
