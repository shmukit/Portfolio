/**
 * Project-Specific Structured Data Component
 * Generates CreativeWork schemas for individual projects
 * Optimized for GenAI understanding and search engines
 */

import { Project } from '../../types/project';

interface ProjectStructuredDataProps {
  projects: Project[];
}

export default function ProjectStructuredData({ projects }: ProjectStructuredDataProps) {
  // Helper to generate consistent slugs
  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  // Generate CreativeWork schemas for each project
  const projectSchemas = projects.map((project) => ({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `https://www.mukit.xyz/project/${generateSlug(project.title)}`,
    name: project.title,
    description: project.description || `${project.role} at ${project.company} - ${project.title}`,
    creator: {
      '@type': 'Person',
      name: 'Shazzad Hossain Mukit',
      jobTitle: 'AI Product Manager & Product Consultant',
      url: 'https://www.mukit.xyz'
    },
    dateCreated: project.createdAt || `${project.year}-01-01T00:00:00+00:00`,
    dateModified: project.updatedAt || `${project.year}-12-31T23:59:59+00:00`,
    about: [
      'Product Management',
      'Data-driven Product Development',
      project.category || 'Product Innovation',
      ...(project.tags || [])
    ],
    keywords: [
      project.title,
      project.role,
      project.company,
      project.category || '',
      ...(project.tags || []),
      'Product Management',
      'Data Analytics',
      'Conversion Optimization',
      'User Research',
      'A/B Testing',
      'Product Strategy'
    ].filter(Boolean),
    genre: 'Product Management Case Study',
    audience: {
      '@type': 'Audience',
      audienceType: 'Product Management Professionals'
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Shazzad Hossain Mukit - AI Product Manager & Builder',
      url: 'https://www.mukit.xyz'
    },
    mainEntity: {
      '@type': 'Thing',
      name: project.situation || `Product challenge at ${project.company}`,
      description: project.situation || `Product management challenge and solution for ${project.title}`
    },
    // Add quantitative results if available
    ...(project.keyResults && project.keyResults.length > 0 && {
      result: project.keyResults.map(kr => ({
        '@type': 'QuantitativeValue',
        value: kr.value,
        name: kr.label,
        description: kr.description
      }))
    }),
    // Add organization information
    publisher: {
      '@type': 'Organization',
      name: project.company,
      ...(project.companyUrl && { url: project.companyUrl })
    },
    // Add work example if it's a software project
    ...(project.projectType === 'Prod Dev' && {
      applicationCategory: 'Product Development',
      operatingSystem: 'Web Platform',
      softwareVersion: '1.0'
    })
  }));

  // Generate Organization schemas for companies
  const companySchemas = projects
    .filter((project, index, self) => 
      index === self.findIndex(p => p.company === project.company)
    )
    .map((project) => ({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `https://www.mukit.xyz/company/${project.company.toLowerCase().replace(/\\s+/g, '-')}`,
      name: project.company,
      ...(project.companyUrl && { url: project.companyUrl }),
      description: `${project.company} - Company where Mukit worked as ${project.role}`,
      industry: project.category === 'EdTech' ? 'Education Technology' : 'Technology',
      employee: {
        '@type': 'Person',
        name: 'Shazzad Hossain Mukit',
        jobTitle: 'AI Product Manager & Product Consultant',
        worksFor: {
          '@type': 'Organization',
          name: project.company
        }
      }
    }));

  // Combine all schemas (Removed Article Schemas to prevent spam)
  const allSchemas = [
    ...projectSchemas,
    ...companySchemas
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={`project-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
