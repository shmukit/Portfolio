'use client';

import { Project } from '../../../types/project';
import UrlCTAMultiple from '../UrlCTAMultiple';
import ProjectMetaBadges from './ProjectMetaBadges';
import ProjectMedia from './ProjectMedia';

const renderParagraphOrBullets = (text: string, theme: string) => {
  const normalizedText = text
    .replace(/\r\n/g, '\n')
    .replace(/[•–—−]/g, '-')
    .replace(/^\s*-\s+/gm, '- ')
    .replace(/\s+-\s+/g, '\n- ')
    .trim();
  const lines = normalizedText.split('\n').map((line) => line.trim()).filter(Boolean);
  const bulletItems = lines
    .filter((line) => line.startsWith('-'))
    .map((line) => line.replace(/^-+\s*/, '').trim())
    .filter(Boolean);

  const shouldRenderBullets = lines.length > 1 && bulletItems.length === lines.length;

  if (shouldRenderBullets) {
    return (
      <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        {bulletItems.map((item, index) => (
          <li key={`${item}-${index}`} className="text-sm leading-relaxed flex items-start">
            <span className="text-gray-500 mr-2 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
      {text}
    </p>
  );
};

export default function MobileProjectModalBody({
  project,
  theme
}: {
  project: Project;
  theme: string;
}) {
  const visibleTags = (project.tags || []).filter((tag) => !/^\+\d+$/.test(tag.trim()));

  return (
    <div className="p-4 pt-2">
      <div className="mb-6">
        <ProjectMetaBadges project={project} theme={theme} compact={true} />

        <h2 className={`text-2xl font-bold mb-3 leading-tight ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {project.title}
        </h2>
        <p className="text-sm text-accent font-medium mb-4">
          {project.role} • {project.company}
        </p>
      </div>

      <ProjectMedia project={project} isMobile={true} />

      <div className="space-y-4">
        {project.description && !project.description.includes('Digital Public Infrastructure') && !project.description.includes('Feature Suit') && !project.description.includes('Comprehensive Learning Management System') && (
          <div className={`text-sm leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {project.description}
          </div>
        )}

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

        {project.task && (
          <div>
            <h3 className={`text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>Task</h3>
            {renderParagraphOrBullets(project.task, theme)}
          </div>
        )}

        {project.result && (
          <div>
            <h3 className={`text-sm font-semibold mb-2 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>Result</h3>
            {renderParagraphOrBullets(project.result, theme)}
          </div>
        )}

        {project.contributions && project.contributions.length > 0 && (
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>My Contribution</h3>
            <ul className={`space-y-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {project.contributions.slice(0, 3).map((contribution, index) => (
                <li key={index} className="text-sm leading-relaxed flex items-start">
                  <span className="text-gray-500 mr-2 mt-1">•</span>
                  <span>{contribution.contribution}</span>
                </li>
              ))}
              {project.contributions.length > 3 && (
                <li className="text-sm text-gray-500">
                  +{project.contributions.length - 3} more contributions
                </li>
              )}
            </ul>
          </div>
        )}

        {project.collaborators && project.collaborators.length > 0 && (
          <div>
            <h3 className={`text-sm font-semibold mb-3 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>Collaborators</h3>
            <div className="flex flex-wrap gap-2">
              {project.collaborators.map((collaborator, index) => (
                <span key={collaborator.id}>
                  {collaborator.linkedinUrl ? (
                    <a
                      href={collaborator.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-gray-300 hover:text-gray-200' : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {collaborator.name}
                    </a>
                  ) : (
                    <span className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {collaborator.name}
                    </span>
                  )}
                  {project.collaborators && index < project.collaborators.length - 1 && (
                    <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>, </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {visibleTags.length > 0 && (
          <div className={`p-4 rounded-lg shadow-sm ${
            theme === 'dark'
              ? 'bg-gray-800/50 border border-gray-700'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <h3 className={`text-sm font-semibold mb-3 ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map((tag, index) => (
                <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

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
          theme={theme as 'light' | 'dark'}
        />
      </div>
    </div>
  );
}
