'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, DocumentIcon, PlayIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface UrlCTAProps {
  companyUrl?: string;
  projectUrl?: string;
  reportUrl?: string;
  demoUrl?: string;
  companyLabel?: string;
  projectLabel?: string;
  reportLabel?: string;
  demoLabel?: string;
  theme: 'light' | 'dark';
}

export default function UrlCTA({ 
  companyUrl, 
  projectUrl, 
  reportUrl, 
  demoUrl, 
  companyLabel = 'Company Website',
  projectLabel = 'Project Link',
  reportLabel = 'Report/Document',
  demoLabel = 'Demo',
  theme 
}: UrlCTAProps) {
  const links = [
    {
      url: companyUrl,
      label: companyLabel,
      icon: BuildingOfficeIcon,
      color: 'blue'
    },
    {
      url: projectUrl,
      label: projectLabel,
      icon: ArrowTopRightOnSquareIcon,
      color: 'green'
    },
    {
      url: reportUrl,
      label: reportLabel,
      icon: DocumentIcon,
      color: 'purple'
    },
    {
      url: demoUrl,
      label: demoLabel,
      icon: PlayIcon,
      color: 'orange'
    }
  ].filter(link => link.url && link.url.trim() !== '');

  if (links.length === 0) return null;

  const getColorClasses = (color: string) => {
    const baseClasses = "flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-normal transition-all duration-200 hover:scale-105";
    
    if (theme === 'dark') {
      return `${baseClasses} bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200`;
    }
  };

  return (
    <div className="space-y-3">
      <h3 className={`text-sm font-semibold ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Links & Resources
      </h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={getColorClasses(link.color)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="w-3 h-3" />
              <span>{link.label}</span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
