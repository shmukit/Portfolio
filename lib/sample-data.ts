import { Project } from '../types/project';

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Free to Paid Conversion',
    year: 2024,
    role: 'Product Manager',
    company: '10MS',
    description: 'Conducted comprehensive audits on 50+ dashboards for non-academic product vertical. Identified significant differences between Free courses & Paid courses CVR that went unnoticed, leading to the initiation of a strategic free to paid conversion project.',
    situation: 'Observed gap in measuring product feature impact among PMs at 10MS due to lack of auditing 50+ dashboards. Efforts initiated to understand metrics and dashboards for business and learner issues.',
    task: 'Conducted audits to gain insights, make adjustments for user engagement, improve learner experience, optimize lead management, and increase conversion rates.',
    result: 'Found that Free courses CVR is 30%+ and Paid course CVR is way low. This led to the initiation of a "free to paid conversion" strategy. The analysis revealed significant opportunities for improvement in the conversion funnel, leading to strategic initiatives to bridge the gap between free and paid course experiences.',
    contributions: [
      'Analysis/dashboard audit',
      'Initiated the Free to paid conversion drive'
    ],
    metrics: [
      { label: 'Free Courses CVR', value: '30%+', description: 'Conversion rate for free courses' },
      { label: 'Paid Courses CVR', value: 'Significantly Lower', description: 'Much lower than free courses' }
    ],
    phase: '1 to n',
    projectType: 'Analysis',
    category: 'Product Analytics',
    isUnlocked: true,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    orderIndex: 1,
    tags: ['Product Analytics', 'Dashboard Audit', 'Conversion Optimization'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'WB/IFC Impact Assessment',
    year: 2024,
    role: 'Research Lead',
    company: '10MS',
    description: 'Led World Bank IFC Survey on 4.7K students to measure the impact of 10MS on delivering quality education. Conducted comprehensive impact assessment study commissioned by World Bank IFC to evaluate influence on K-12 students across various regions in Bangladesh.',
    situation: 'Impact assessment study commissioned by World Bank IFC to evaluate influence of 10MS on K-12 students across various regions in Bangladesh, including both paid and free course offerings. Purpose was to inform potential World Bank/IFC investment in 10MS.',
    task: 'I was the research lead for the project, responsible for comprehensive data collection and analysis across multiple regions.',
    result: 'Survey findings indicated that 10MS is more widely adopted in rural and suburban areas compared to metropolitan cities. This trend suggests that students in rural/suburban regions face greater challenges in accessing quality teachers and educational content.',
    contributions: [
      'Research design & planning',
      'Data cleaning & result analysis using tableau',
      'Report preparation'
    ],
    metrics: [
      { label: 'Total Surveyed', value: '4,781', description: 'Students across Bangladesh' },
      { label: 'Rural/Semi-urban Users', value: '66%', description: 'From villages and district cities' },
      { label: 'Female Users', value: '32.5%', description: 'Gender distribution' },
      { label: 'High Performers (80-100)', value: '50%', description: 'Academic score distribution' },
      { label: 'NPS Score', value: '39', description: 'Student satisfaction rating' },
      { label: 'Positive Impact', value: '78%', description: 'Agreed 10MS has positive impact (45% Strongly, 33% Agree)' }
    ],
    phase: '0 to 1',
    projectType: 'Research',
    category: 'Impact Research',
    isUnlocked: true,
    imageUrl: '/images/project-worldbank.jpg',
    orderIndex: 2,
    tags: ['Research', 'Data Analysis', 'Tableau', 'Impact Assessment', 'World Bank'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Investment Due Diligence',
    year: 2023,
    role: 'Research Lead',
    company: '10MS',
    description: 'Most Comprehensive Marketing Sizing Report in Bangladesh for Seed & Series A due diligence. Pioneered the first comprehensive market landscaping of the Edtech sector in Bangladesh and conducted due diligence for funding rounds.',
    situation: 'The commercial edtech industry in Bangladesh was nascent, lacking comprehensive market sizing reports. 10MS emerged as a key player, but there was no detailed analysis of the market landscape for potential investors.',
    task: 'Pioneered the first comprehensive market landscaping of the Edtech sector in Bangladesh and conducted due diligence for funding rounds. Referenced LinkedIn article as a key source for market insights.',
    result: 'Produced a detailed market sizing report for investor due diligence, with a breakdown of segments including K-12, test prep, upskilling, hiring, kids, and more. Total market size identified at $11.11 Bn.',
    contributions: [
      'Research (Lit review, data collection, analysis)',
      'Report preparation. [Upon request I can walkthrough]'
    ],
    metrics: [
      { label: 'Total Market Size', value: '$11.11 Bn', description: 'Education Market in 2022 (B2B-B2C)' },
      { label: 'K-12 After School', value: '$6.1 Bn', description: 'Largest market segment' },
      { label: 'Upskilling + Hiring', value: '$1.98 Bn', description: 'Professional development' },
      { label: 'Test Prep', value: '$1.82 Bn', description: 'Exam preparation services' },
      { label: 'Pre-primary', value: '$0.15 Bn', description: 'Early childhood education' }
    ],
    phase: '0 to 1',
    projectType: 'Research',
    category: 'Market Research',
    isUnlocked: true,
    imageUrl: '/images/project-market-sizing.jpg',
    orderIndex: 1,
    tags: ['Market Research', 'Due Diligence', 'EdTech', 'Bangladesh', 'Investment'],
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2023-06-15T00:00:00Z'
  },
  {
    id: '4',
    title: 'Healthcare Portal Design',
    year: 2023,
    role: 'Design Systems Lead',
    company: 'MedTech Solutions',
    description: 'Built a comprehensive design system for a healthcare portal used by 100+ hospitals. Created accessibility-first components that met WCAG 2.1 AA standards while maintaining a modern, professional aesthetic.',
    lessons: 'Healthcare UX requires extra attention to accessibility, privacy, and trust. Users in high-stress situations need interfaces that are immediately understandable. Design systems in healthcare must balance compliance with user needs.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    orderIndex: 2,
    category: 'Healthcare Design',
    isUnlocked: false,
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2023-09-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Sustainable Fashion Marketplace',
    year: 2022,
    role: 'Creative Director',
    company: 'EcoWear',
    description: 'Directed the visual design and user experience for a sustainable fashion marketplace. Created a brand identity that emphasized transparency and sustainability while maintaining luxury appeal.',
    lessons: 'Sustainable design extends beyond environmental impact to include ethical considerations and long-term user relationships. Brand storytelling through design can be as powerful as traditional marketing.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    orderIndex: 1,
    category: 'Brand Design',
    isUnlocked: false,
    createdAt: '2022-03-15T00:00:00Z',
    updatedAt: '2022-03-15T00:00:00Z'
  },
  {
    id: '6',
    title: 'AI-Powered Analytics Tool',
    year: 2022,
    role: 'Product Designer',
    company: 'DataMind',
    description: 'Designed an AI-powered analytics dashboard that made complex data accessible to non-technical users. Used progressive disclosure to guide users from simple overviews to detailed insights.',
    lessons: 'AI interfaces need thoughtful design to build user trust and prevent over-reliance on automation. Progressive disclosure helps users build mental models gradually rather than overwhelming them with complexity.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    orderIndex: 2,
    category: 'AI/ML Design',
    isUnlocked: false,
    createdAt: '2022-08-01T00:00:00Z',
    updatedAt: '2022-08-01T00:00:00Z'
  },
  {
    id: '7',
    title: 'Remote Work Collaboration Platform',
    year: 2021,
    role: 'Senior UX Designer',
    company: 'TeamSync',
    description: 'Designed a remote collaboration platform that bridged the gap between distributed teams. Created features for asynchronous communication and real-time collaboration that felt natural and unobtrusive.',
    lessons: 'Remote work tools must account for different time zones, communication styles, and work patterns. The best remote tools fade into the background, becoming invisible aids rather than attention-grabbing distractions.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    orderIndex: 1,
    category: 'Collaboration Tools',
    isUnlocked: false,
    createdAt: '2021-11-15T00:00:00Z',
    updatedAt: '2021-11-15T00:00:00Z'
  },
  {
    id: '8',
    title: 'Educational Gaming Platform',
    year: 2021,
    role: 'Game Designer & UX Lead',
    company: 'EduPlay',
    description: 'Combined gaming mechanics with educational content to create an engaging learning platform for K-12 students. Gamified progression systems increased daily active users by 80%.',
    lessons: 'Educational gaming succeeds when learning feels like play, not work. Game mechanics should reinforce learning objectives rather than distract from them. User testing with actual students revealed completely different behaviors than adult assumptions.',
    imageUrl: '/images/project-gaming.jpg',
    orderIndex: 2,
    category: 'EdTech',
    isUnlocked: false,
    createdAt: '2021-05-01T00:00:00Z',
    updatedAt: '2021-05-01T00:00:00Z'
  },
  {
    id: '9',
    title: 'Cryptocurrency Trading Interface',
    year: 2020,
    role: 'Senior Product Designer',
    company: 'CryptoTrade',
    description: 'Designed a professional trading interface for cryptocurrency that balanced complex functionality with user-friendly design. Implemented advanced charting tools and real-time data visualization.',
    lessons: 'Financial interfaces require exceptional attention to detail and error prevention. Every decimal point matters, and user trust is paramount. Complex functionality must be discoverable but not overwhelming for new users.',
    imageUrl: '/images/project-crypto.jpg',
    orderIndex: 1,
    category: 'Fintech',
    isUnlocked: false,
    createdAt: '2020-12-01T00:00:00Z',
    updatedAt: '2020-12-01T00:00:00Z'
  },
  {
    id: '10',
    title: 'Smart Home IoT Dashboard',
    year: 2020,
    role: 'UX Designer',
    company: 'HomeConnect',
    description: 'Created a unified dashboard for managing multiple IoT devices in smart homes. Designed intuitive controls for everything from lighting to security systems with consideration for different user types.',
    lessons: 'IoT interfaces must account for varying levels of technical expertise within households. Physical device states should always be reflected in the digital interface. Setup and onboarding are critical moments that determine long-term adoption.',
    imageUrl: '/images/project-iot.jpg',
    orderIndex: 2,
    category: 'IoT Design',
    isUnlocked: false,
    createdAt: '2020-07-15T00:00:00Z',
    updatedAt: '2020-07-15T00:00:00Z'
  },
  {
    id: '11',
    title: 'Social Media Campaign Tool',
    year: 2019,
    role: 'Product Designer',
    company: 'SocialHub',
    description: 'Designed a comprehensive tool for managing multi-platform social media campaigns. Created scheduling, analytics, and content management features that streamlined social media workflows.',
    lessons: 'Social media tools need to adapt to rapidly changing platform requirements. Real-time feedback is crucial for content creators. Multi-platform consistency is challenging but essential.',
    imageUrl: '/images/project-social.jpg',
    orderIndex: 1,
    category: 'Social Media',
    isUnlocked: false,
    createdAt: '2019-10-15T00:00:00Z',
    updatedAt: '2019-10-15T00:00:00Z'
  },
  {
    id: '12',
    title: 'Travel Booking Platform',
    year: 2019,
    role: 'UX Designer',
    company: 'TravelEase',
    description: 'Designed an intuitive travel booking platform that simplified complex itinerary planning. Integrated flight, hotel, and activity bookings into a seamless user experience.',
    lessons: 'Travel UX requires handling uncertainty and helping users make confident decisions. Price transparency builds trust. Mobile optimization is critical for travel apps.',
    imageUrl: '/images/project-travel.jpg',
    orderIndex: 2,
    category: 'Travel Tech',
    isUnlocked: false,
    createdAt: '2019-04-20T00:00:00Z',
    updatedAt: '2019-04-20T00:00:00Z'
  },
  {
    id: '13',
    title: 'E-learning Management System',
    year: 2018,
    role: 'UI/UX Designer',
    company: 'LearnTech',
    description: 'Designed a learning management system for corporate training programs. Created course authoring tools and student dashboards that improved engagement by 45%.',
    lessons: 'Learning platforms must cater to diverse learning styles. Progress tracking motivates completion. Admin tools are as important as student-facing interfaces.',
    imageUrl: '/images/project-learning.jpg',
    orderIndex: 1,
    category: 'EdTech',
    isUnlocked: false,
    createdAt: '2018-09-10T00:00:00Z',
    updatedAt: '2018-09-10T00:00:00Z'
  },
  {
    id: '14',
    title: 'Restaurant Management App',
    year: 2018,
    role: 'Product Designer',
    company: 'FoodTech',
    description: 'Created a restaurant management system covering reservations, table management, and kitchen operations. Designed interfaces for both front-of-house and back-of-house staff.',
    lessons: 'Restaurant UX must work in high-pressure, fast-paced environments. Different user roles require tailored interfaces. Offline functionality is essential for food service.',
    imageUrl: '/images/project-restaurant.jpg',
    orderIndex: 2,
    category: 'Hospitality Tech',
    isUnlocked: false,
    createdAt: '2018-03-15T00:00:00Z',
    updatedAt: '2018-03-15T00:00:00Z'
  },
  {
    id: '15',
    title: 'Fitness Tracking App',
    year: 2017,
    role: 'Mobile Designer',
    company: 'FitLife',
    description: 'Designed a comprehensive fitness tracking app with workout logging, nutrition tracking, and progress visualization. Created motivational features that increased user retention.',
    lessons: 'Fitness apps must balance data collection with simplicity. Visual progress indicators drive motivation. Social features enhance commitment but must be optional.',
    imageUrl: '/images/project-fitness.jpg',
    orderIndex: 1,
    category: 'Health & Fitness',
    isUnlocked: false,
    createdAt: '2017-11-20T00:00:00Z',
    updatedAt: '2017-11-20T00:00:00Z'
  },
  {
    id: '16',
    title: 'Real Estate Listing Platform',
    year: 2017,
    role: 'UX Designer',
    company: 'PropertyHub',
    description: 'Designed a property listing platform with advanced search filters and virtual tour integration. Created tools for both buyers and real estate agents.',
    lessons: 'Real estate UX requires powerful search with intuitive filters. High-quality imagery is crucial. Map integration enhances location-based decision making.',
    imageUrl: '/images/project-realestate.jpg',
    orderIndex: 2,
    category: 'Real Estate Tech',
    isUnlocked: false,
    createdAt: '2017-06-05T00:00:00Z',
    updatedAt: '2017-06-05T00:00:00Z'
  },
  {
    id: '17',
    title: 'Project Management Suite',
    year: 2016,
    role: 'Senior Designer',
    company: 'TaskFlow',
    description: 'Led the design of a comprehensive project management suite with Gantt charts, kanban boards, and resource allocation tools. Focused on team collaboration and visibility.',
    lessons: 'Project management tools must adapt to different methodologies. Clear hierarchy and status indicators prevent confusion. Collaboration features should enhance, not interrupt, workflow.',
    imageUrl: '/images/project-pm.jpg',
    orderIndex: 1,
    category: 'Productivity',
    isUnlocked: false,
    createdAt: '2016-10-12T00:00:00Z',
    updatedAt: '2016-10-12T00:00:00Z'
  },
  {
    id: '18',
    title: 'Music Streaming Interface',
    year: 2016,
    role: 'UI Designer',
    company: 'SoundWave',
    description: 'Designed an elegant music streaming interface with personalized recommendations and social sharing features. Created player controls optimized for both desktop and mobile.',
    lessons: 'Music apps require excellent audio controls and quick navigation. Personalization algorithms need transparent user controls. Cross-device continuity is essential for media apps.',
    imageUrl: '/images/project-music.jpg',
    orderIndex: 2,
    category: 'Entertainment',
    isUnlocked: false,
    createdAt: '2016-04-18T00:00:00Z',
    updatedAt: '2016-04-18T00:00:00Z'
  },
  {
    id: '19',
    title: 'Event Management Platform',
    year: 2015,
    role: 'Product Designer',
    company: 'EventPro',
    description: 'Designed an end-to-end event management platform covering ticketing, attendee management, and event analytics. Created mobile check-in experiences for event staff.',
    lessons: 'Event platforms must handle time-sensitive operations gracefully. Multiple user roles require careful permission management. Mobile optimization is critical for on-site operations.',
    imageUrl: '/images/project-events.jpg',
    orderIndex: 1,
    category: 'Events Tech',
    isUnlocked: false,
    createdAt: '2015-08-25T00:00:00Z',
    updatedAt: '2015-08-25T00:00:00Z'
  },
  {
    id: '20',
    title: 'Customer Support Portal',
    year: 2015,
    role: 'UX Designer',
    company: 'SupportDesk',
    description: 'Designed a customer support portal with ticketing, knowledge base, and live chat features. Created self-service tools that reduced support ticket volume by 35%.',
    lessons: 'Support interfaces must balance automation with human touch. Self-service features empower users but escalation paths must be clear. Context preservation across channels is crucial.',
    imageUrl: '/images/project-support.jpg',
    orderIndex: 2,
    category: 'Customer Service',
    isUnlocked: false,
    createdAt: '2015-02-10T00:00:00Z',
    updatedAt: '2015-02-10T00:00:00Z'
  },
  {
    id: '21',
    title: 'News Aggregation App',
    year: 2014,
    role: 'Mobile Designer',
    company: 'NewsHub',
    description: 'Designed a personalized news aggregation app with customizable feeds and offline reading. Created reading experiences optimized for different content types.',
    lessons: 'News apps must balance personalization with diverse perspectives. Reading experience affects content consumption. Offline functionality extends engagement beyond connectivity.',
    imageUrl: '/images/project-news.jpg',
    orderIndex: 1,
    category: 'Media',
    isUnlocked: false,
    createdAt: '2014-11-05T00:00:00Z',
    updatedAt: '2014-11-05T00:00:00Z'
  },
  {
    id: '22',
    title: 'Photography Portfolio Builder',
    year: 2014,
    role: 'UI/UX Designer',
    company: 'PhotoShow',
    description: 'Designed a portfolio builder specifically for photographers with drag-and-drop gallery creation and customizable themes. Focused on showcasing visual work beautifully.',
    lessons: 'Portfolio tools must get out of the way and let work shine. Template-based design needs meaningful customization options. Performance optimization is critical for image-heavy sites.',
    imageUrl: '/images/project-photo.jpg',
    orderIndex: 2,
    category: 'Creative Tools',
    isUnlocked: false,
    createdAt: '2014-05-15T00:00:00Z',
    updatedAt: '2014-05-15T00:00:00Z'
  }
];

export const SAMPLE_YEARS = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014];

// Utility function to get projects by year
export const getProjectsByYear = (projects: Project[]): Record<number, Project[]> => {
  return projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);
};

// Utility function to sort projects within each year
export const sortProjectsByYear = (projectsByYear: Record<number, Project[]>): Record<number, Project[]> => {
  const sorted: Record<number, Project[]> = {};

  Object.keys(projectsByYear)
    .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years descending
    .forEach(year => {
      sorted[parseInt(year)] = [...projectsByYear[parseInt(year)]]
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
    });

  return sorted;
};
