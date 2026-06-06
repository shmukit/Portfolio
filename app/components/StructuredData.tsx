/**
 * Enhanced Structured Data (JSON-LD) Component for SEO & GenAI
 * Provides rich snippets for search engines and AI systems
 */

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shazzad Hossain Mukit',
    alternateName: 'Mukit',
    jobTitle: 'AI Product Manager & Product Consultant',
    description: 'Technical builder & AI Product Manager driving end-to-end impact through data-driven strategy and system engineering. Specializing in Agentic Workflows, AI automation, and scalable platforms.',
    url: 'https://www.mukit.xyz',
    image: 'https://www.mukit.xyz/og-image.png',
    sameAs: [
      'https://www.linkedin.com/in/shazzad-hossain-mukit/',
      'https://github.com/shmukit',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Moncho',
      url: 'https://www.moncho.ai',
      description: 'AI-driven market intelligence platform'
    },
    knowsAbout: [
      'AI Product Management',
      'Technical Product Management',
      'Market Intelligence',
      'EdTech Innovation',
      'Agentic Workflows',
      'System Architecture',
      'AI Automation',
      'Data-driven Product Strategy',
      'Data Analytics',
      'Machine Learning',
      'Full Stack Development',
      'Rapid Prototyping'
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English'
      },
      {
        '@type': 'Language', 
        name: 'Bengali'
      }
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI Product Manager & Product Consultant',
      skills: 'AI Product Management, Agentic Workflows, System Architecture, Full Stack Development, Data Analytics, Product Strategy',
      description: 'Designing and building AI-driven solutions, automated workflows, and scalable platforms as a technical builder and product consultant.'
    }
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shazzad Hossain Mukit - AI Product Manager & Builder',
    url: 'https://www.mukit.xyz',
    description: 'Portfolio of Shazzad Hossain Mukit showcasing AI product management, agentic workflows, data-driven product strategy, and technical system architecture.',
    author: {
      '@type': 'Person',
      name: 'Shazzad Hossain Mukit',
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'ReadAction',
      target: 'https://www.mukit.xyz',
    },
  };

  const profilePageData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
    mainEntity: {
      '@type': 'Person',
      name: 'Shazzad Hossain Mukit',
      jobTitle: 'AI Product Manager & Product Consultant',
      description: 'Technical builder & AI Product Manager driving end-to-end impact through data-driven strategy and system engineering.',
      url: 'https://www.mukit.xyz',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'AI Product Manager & Product Consultant',
        skills: 'AI Product Management, Agentic Workflows, System Architecture, Full Stack Development, Data Analytics, Product Strategy',
        description: 'Designing and building AI-driven solutions and automated workflows'
      },
    },
  };

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        suppressHydrationWarning
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
        suppressHydrationWarning
      />
      
      {/* ProfilePage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
        suppressHydrationWarning
      />
    </>
  );
}
