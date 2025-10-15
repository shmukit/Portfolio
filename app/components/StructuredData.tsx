/**
 * Structured Data (JSON-LD) Component for SEO
 * Provides rich snippets for search engines
 */

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Shazzad Hossain Mukit',
    alternateName: 'Mukit',
    jobTitle: 'Product Manager',
    description: 'Data-driven Product Manager passionate about learning by doing, building impactful products, and driving growth through analytics, design, and AI. Specializing in product strategy, conversion optimization, and EdTech innovation.',
    url: 'https://www.mukit.xyz',
    image: 'https://www.mukit.xyz/og-image.png',
    sameAs: [
      'https://www.linkedin.com/in/shazzad-hossain-mukit/',
      'https://github.com/shmukit',
    ],
    worksFor: {
      '@type': 'Organization',
      name: '10 Minute School',
      alternateName: '10MS',
      url: 'https://10minuteschool.com',
    },
    knowsAbout: [
      'Product Management',
      'AI Product Management',
      'Growth Product Management',
      'Data-driven Product Management',
      'Product Strategy',
      'Product Analytics',
      'Conversion Rate Optimization',
      'Dashboard Audit',
      'User Research',
      'Feature Experimentation',
      'A/B Testing',
      'Market Research',
      'EdTech',
      'Digital Learning',
      'Learning by Doing',
      'Problem Solving',
      'System Thinking',
    ],
    knowsLanguage: ['English', 'Bengali'],
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shazzad Hossain Mukit - Product Manager Portfolio',
    url: 'https://www.mukit.xyz',
    description: 'Portfolio of Shazzad Hossain Mukit showcasing data-driven product management work, case studies, conversion optimization, product strategy, and learning by doing approach to building impactful products.',
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
    dateModified: '2024-10-01T00:00:00+00:00',
    mainEntity: {
      '@type': 'Person',
      name: 'Shazzad Hossain Mukit',
      jobTitle: 'Product Manager',
      description: 'Data-driven Product Manager passionate about learning by doing, AI, and building impactful products',
      url: 'https://www.mukit.xyz',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Product Manager',
        occupationLocation: {
          '@type': 'Country',
          name: 'Bangladesh',
        },
        skills: 'Product Strategy, Data Analytics, Conversion Optimization, AI Product Management, Growth Product Management',
      },
    },
  };

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      
      {/* ProfilePage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
      />
    </>
  );
}

