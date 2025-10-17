'use client';

import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, DocumentIcon, PlayIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface UrlItem {
  url: string;
  label?: string;
  description?: string;
}

interface UrlCTAMultipleProps {
  // Single URL fields (for backward compatibility)
  companyUrl?: string;
  projectUrl?: string;
  reportUrl?: string;
  demoUrl?: string;
  companyLabel?: string;
  projectLabel?: string;
  reportLabel?: string;
  demoLabel?: string;
  
  // Multiple URL arrays (for enhanced support)
  companyUrls?: UrlItem[];
  projectUrls?: UrlItem[];
  reportUrls?: UrlItem[];
  demoUrls?: UrlItem[];
  
  theme: 'light' | 'dark';
}

export default function UrlCTAMultiple({ 
  companyUrl, 
  projectUrl, 
  reportUrl, 
  demoUrl, 
  companyLabel = 'Company Website',
  projectLabel = 'Project Link',
  reportLabel = 'Report/Document',
  demoLabel = 'Demo',
  companyUrls,
  projectUrls,
  reportUrls,
  demoUrls,
  theme 
}: UrlCTAMultipleProps) {
  
  // Process URLs - prioritize arrays over single URLs
  const processUrls = (singleUrl?: string, singleLabel?: string, urlArray?: UrlItem[], defaultLabel?: string) => {
    if (urlArray && urlArray.length > 0) {
      // Use multiple URLs from array
      return urlArray.map(item => ({
        url: item.url,
        label: item.label || defaultLabel || 'Link',
        description: item.description
      }));
    } else if (singleUrl && singleUrl.trim() !== '') {
      // Fallback to single URL
      return [{
        url: singleUrl,
        label: singleLabel || defaultLabel || 'Link',
        description: undefined
      }];
    }
    return [];
  };

  const companyLinks = processUrls(companyUrl, companyLabel, companyUrls, 'Company Website');
  const projectLinks = processUrls(projectUrl, projectLabel, projectUrls, 'Project Link');
  const reportLinks = processUrls(reportUrl, reportLabel, reportUrls, 'Report/Document');
  const demoLinks = processUrls(demoUrl, demoLabel, demoUrls, 'Demo');

  // Combine all links with their categories
  const allLinks = [
    ...companyLinks.map(link => ({ ...link, icon: BuildingOfficeIcon, color: 'blue', category: 'company' })),
    ...projectLinks.map(link => ({ ...link, icon: ArrowTopRightOnSquareIcon, color: 'green', category: 'project' })),
    ...reportLinks.map(link => ({ ...link, icon: DocumentIcon, color: 'purple', category: 'report' })),
    ...demoLinks.map(link => ({ ...link, icon: PlayIcon, color: 'orange', category: 'demo' }))
  ];

  if (allLinks.length === 0) return null;

  const getColorClasses = () => {
    const baseClasses = "flex items-center gap-1.5 px-2 py-1.5 rounded text-xs font-normal transition-all duration-200 hover:scale-105";
    
    if (theme === 'dark') {
      return `${baseClasses} bg-gray-800/50 text-gray-300 border border-gray-700 hover:bg-gray-700/50`;
    } else {
      return `${baseClasses} bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200`;
    }
  };

  // Group links by category for better organization
  const groupedLinks = allLinks.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = [];
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, typeof allLinks>);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'company': return 'Company';
      case 'project': return 'Projects';
      case 'report': return 'Reports';
      case 'demo': return 'Demos';
      default: return 'Links';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className={`text-sm font-semibold ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Links & Resources
      </h3>
      
      {Object.entries(groupedLinks).map(([category, links]) => (
        <div key={category} className="space-y-2">
          {links.length > 1 && (
            <h4 className={`text-xs font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {getCategoryTitle(category)} ({links.length})
            </h4>
          )}
          <div className="flex flex-wrap gap-2">
            {links.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={`${category}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={getColorClasses()}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  title={link.description}
                >
                  <IconComponent className="w-3 h-3" />
                  <span>{link.label}</span>
                </motion.a>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}