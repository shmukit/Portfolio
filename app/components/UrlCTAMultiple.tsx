'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, DocumentIcon, PlayIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { UrlWithLabel } from '../../types/project';

interface UrlCTAMultipleProps {
  companyUrls?: UrlWithLabel[];
  projectUrls?: UrlWithLabel[];
  reportUrls?: UrlWithLabel[];
  demoUrls?: UrlWithLabel[];
  theme: 'light' | 'dark';
}

export default function UrlCTAMultiple({ 
  companyUrls, 
  projectUrls, 
  reportUrls, 
  demoUrls, 
  theme 
}: UrlCTAMultipleProps) {
  const linkGroups = [
    {
      urls: companyUrls,
      label: 'Company Websites',
      icon: BuildingOfficeIcon,
      color: 'blue'
    },
    {
      urls: projectUrls,
      label: 'Project Links',
      icon: ArrowTopRightOnSquareIcon,
      color: 'green'
    },
    {
      urls: reportUrls,
      label: 'Reports & Documents',
      icon: DocumentIcon,
      color: 'purple'
    },
    {
      urls: demoUrls,
      label: 'Demos',
      icon: PlayIcon,
      color: 'orange'
    }
  ].filter(group => group.urls && group.urls.length > 0);

  if (linkGroups.length === 0) return null;

  const getColorClasses = (color: string) => {
    const baseClasses = "flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-normal transition-all duration-200 hover:scale-105";
    
    if (theme === 'dark') {
      return `${baseClasses} bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200`;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-sm font-semibold ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Links & Resources
      </h3>
      
      {linkGroups.map((group, groupIndex) => {
        const IconComponent = group.icon;
        return (
          <div key={groupIndex} className="space-y-2">
            <h4 className={`text-[10px] font-medium ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {group.label}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.urls.map((urlItem, index) => (
                <motion.a
                  key={index}
                  href={urlItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getColorClasses(group.color)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{urlItem.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
