'use client';

import { Collaborator } from '../../types/project';

interface CollaboratorsSectionProps {
  collaborators: Collaborator[];
  theme: string;
}

export default function CollaboratorsSection({ collaborators, theme }: CollaboratorsSectionProps) {
  if (!collaborators || collaborators.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className={`text-sm font-semibold mb-3 ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Collaborators
      </h3>
      <div className="flex flex-wrap gap-2">
        {collaborators.map((collaborator, index) => (
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
            {index < collaborators.length - 1 && (
              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>, </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
