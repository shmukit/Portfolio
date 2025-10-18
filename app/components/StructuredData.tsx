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
    jobTitle: 'Product Manager',
    description: 'Data-driven Product Manager passionate about learning by doing, building impactful products, and driving growth through analytics, design, and AI. Specializing in product strategy, conversion optimization, and EdTech innovation at 10 Minute School.',
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
      description: 'Leading EdTech platform in Bangladesh providing digital learning solutions',
      industry: 'Education Technology',
      location: {
        '@type': 'Place',
        name: 'Bangladesh'
      }
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
      'Machine Learning',
      'Data Analysis',
      'User Experience Design',
      'Business Intelligence',
      'Product Development',
      'Agile Methodology',
      'Scrum',
      'Project Management'
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
      name: 'Product Manager',
      occupationLocation: {
        '@type': 'Country',
        name: 'Bangladesh'
      },
      skills: 'Product Strategy, Data Analytics, Conversion Optimization, AI Product Management, Growth Product Management, User Research, A/B Testing, Market Research, EdTech Innovation',
      description: 'Leading product initiatives at 10 Minute School, focusing on data-driven decision making, conversion optimization, and AI-powered learning solutions'
    },
    award: [
      {
        '@type': 'Award',
        name: 'World Bank IFC Recognition',
        description: 'Recognition for innovative product development and market research initiatives'
      }
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Educational Background'
    }
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
    dateModified: '2024-12-01T00:00:00+00:00',
    mainEntity: {
      '@type': 'Person',
      name: 'Shazzad Hossain Mukit',
      jobTitle: 'Product Manager',
      description: 'Data-driven Product Manager passionate about learning by doing, AI, and building impactful products at 10 Minute School',
      url: 'https://www.mukit.xyz',
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Product Manager',
        occupationLocation: {
          '@type': 'Country',
          name: 'Bangladesh',
        },
        skills: 'Product Strategy, Data Analytics, Conversion Optimization, AI Product Management, Growth Product Management, User Research, A/B Testing, EdTech Innovation',
        description: 'Leading product initiatives with focus on data-driven decision making and AI-powered learning solutions'
      },
    },
  };

  // FAQ Schema for better AI understanding
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Shazzad Hossain Mukit\'s professional background?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Shazzad Hossain Mukit is a Data-driven Product Manager at 10 Minute School, specializing in product strategy, conversion optimization, and AI-powered learning solutions. He has extensive experience in growth product management, user research, and data analytics.'
        }
      },
      {
        '@type': 'Question',
        name: 'What are Mukit\'s key skills and expertise areas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mukit specializes in Product Strategy, Data Analytics, Conversion Rate Optimization, AI Product Management, Growth Product Management, User Research, A/B Testing, Market Research, and EdTech Innovation. He follows a "learning by doing" philosophy and focuses on data-driven decision making.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is Mukit\'s approach to product management?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mukit follows a data-driven approach to product management with the ethos: Data (analysis), Decision (strategy) & (service) Design. He believes in learning by doing and building impactful products through systematic analysis, strategic decision making, and user-centered design.'
        }
      },
      {
        '@type': 'Question',
        name: 'What notable achievements has Mukit accomplished?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mukit has received recognition from World Bank IFC for innovative product development and market research initiatives. He has successfully led conversion optimization projects, implemented AI-powered learning solutions, and contributed to the growth of 10 Minute School\'s digital learning platform.'
        }
      }
    ]
  };

  // HowTo Schema for process documentation
  const howToData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Build Data-Driven Products',
    description: 'Mukit\'s approach to building impactful products through data analysis, strategic decision making, and user-centered design',
    image: 'https://www.mukit.xyz/og-image.png',
    totalTime: 'P3M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Data Analytics Tools'
      },
      {
        '@type': 'HowToSupply', 
        name: 'User Research Methods'
      },
      {
        '@type': 'HowToSupply',
        name: 'A/B Testing Framework'
      }
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Analytics Dashboard'
      },
      {
        '@type': 'HowToTool',
        name: 'User Research Tools'
      },
      {
        '@type': 'HowToTool',
        name: 'Conversion Optimization Platform'
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        name: 'Data Analysis',
        text: 'Analyze user behavior data, conversion funnels, and product metrics to identify opportunities and pain points',
        url: 'https://www.mukit.xyz#data-analysis'
      },
      {
        '@type': 'HowToStep',
        name: 'Strategic Decision Making',
        text: 'Develop product strategy based on data insights, market research, and user feedback',
        url: 'https://www.mukit.xyz#strategy'
      },
      {
        '@type': 'HowToStep',
        name: 'Service Design',
        text: 'Design user-centered solutions that address identified problems and create value for users',
        url: 'https://www.mukit.xyz#design'
      }
    ]
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
      
      {/* FAQ Schema for AI Understanding */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        suppressHydrationWarning
      />
      
      {/* HowTo Schema for Process Documentation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }}
        suppressHydrationWarning
      />
    </>
  );
}

