'use client';

import { memo } from 'react';
import { Project } from '../../types/project';
import UrlCTAMultiple from './UrlCTAMultiple';

// Memoized Project Content Component for better performance
const ProjectContent = memo(({ 
  project, 
  theme 
}: {
  project: Project;
  theme: string;
}) => (
  <div className="flex gap-8 h-full">
    {/* Left Column - Project Details */}
    <div className="flex-1 space-y-6">
      {/* Project Description - Only show if it doesn't contain tag names */}
      {project.description && !project.description.includes('Vide Coding') && !project.description.includes('Feature Suit') && !project.description.includes('Rapid Prototyping') && !project.description.includes('Digital Public Infrastructure') && !project.description.includes('Comprehensive Learning Management System') && (
        <div className={`text-base leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {project.description}
        </div>
      )}

      {/* Main Content Grid - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column - Project Details */}
        <div className="space-y-6">
      
        {/* Situation */}
        {project.situation && (
          <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Situation</h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {project.situation}
              </p>
            </div>
        )}

        {/* Task */}
        {project.task && (
          <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Task</h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {project.task}
              </p>
            </div>
        )}

        {/* Result */}
        {project.result && (
          <div>
                <h3 className={`text-sm font-semibold mb-2 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Result</h3>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {project.result}
              </p>
            </div>
        )}

        {/* My Contributions */}
        {project.contributions && project.contributions.length > 0 && (
              <div>
                <h3 className={`text-sm font-semibold mb-3 ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>My Contribution</h3>
                <ul className={`space-y-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.contributions.map((contribution, index) => (
                    <li key={index} className="text-sm leading-relaxed flex items-start">
                      <span className="text-gray-500 mr-2 mt-1">•</span>
                      <span>{contribution.contribution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

        {/* Right Column - Stats */}
    <div className="space-y-6">
      
          {/* Key Results Card */}
          {project.keyResults && project.keyResults.length > 0 && (
            <div className={`p-4 rounded-lg shadow-sm ${
            theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'
          }`}>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Key Results</h3>
              <div className="space-y-3">
                {project.keyResults.map((keyResult, index) => (
                  <div key={index}>
                    <div className={`text-lg font-bold mb-1 ${
                      theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {keyResult.value}
                    </div>
                    <div className={`text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {keyResult.label}
                    </div>
                    <div className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {keyResult.description}
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}

          {/* Skills & Technologies Card */}
      {project.tags && project.tags.length > 0 && (
            <div className={`p-4 rounded-lg shadow-sm ${
            theme === 'dark'
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-gray-50 border border-gray-200'
          }`}>
              <h3 className={`text-sm font-semibold mb-3 ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
              }`}>Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 6).map((tag, index) => (
                  <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                {tag}
              </span>
            ))}
                {project.tags.length > 6 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-gray-200' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    +{project.tags.length - 6}
                  </span>
                )}
          </div>
        </div>
      )}

      {/* URL CTAs */}
      <UrlCTAMultiple 
        companyUrl={project.companyUrl}
        projectUrl={project.projectUrl}
        reportUrl={project.reportUrl}
        demoUrl={project.demoUrl}
        companyLabel={project.companyLabel}
        projectLabel={project.projectLabel}
        reportLabel={project.reportLabel}
        demoLabel={project.demoLabel}
        companyUrls={project.companyUrls}
        projectUrls={project.projectUrls}
        reportUrls={project.reportUrls}
        demoUrls={project.demoUrls}
        theme={theme as "light" | "dark"}
      />
    </div>
      </div>
    </div>
  </div>
));

ProjectContent.displayName = 'ProjectContent';

export default ProjectContent;
