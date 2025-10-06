import { Project } from '../types/project';

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    year: 2024,
    role: 'Senior Product Designer',
    company: 'TechCorp',
    description: 'Led the complete redesign of a B2B e-commerce platform serving 50,000+ users. Focused on improving conversion rates by 40% through user research, prototyping, and iterative design improvements. Implemented a new design system that reduced development time by 60%.',
    lessons: 'The key to successful product design is understanding user pain points before jumping into solutions. Cross-functional collaboration between design, engineering, and product teams is crucial for implementation success. Data-driven design decisions lead to measurable business outcomes.',
    imageUrl: '/images/project-ecommerce.jpg',
    orderIndex: 1,
    category: 'Product Design',
    isUnlocked: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Mobile Banking App',
    year: 2024,
    role: 'UX Design Lead',
    company: 'FinanceFlow',
    description: 'Designed a mobile-first banking application that simplified complex financial operations for everyday users. Created an intuitive onboarding flow that increased user activation by 35% and reduced support tickets by 50%.',
    lessons: 'Security and trust are paramount in fintech design. Every interaction must feel secure while remaining frictionless. User testing with real financial scenarios revealed insights that polished mockups could never capture.',
    imageUrl: '/images/project-banking.jpg',
    orderIndex: 2,
    category: 'Mobile Design',
    isUnlocked: true,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'SaaS Dashboard Overhaul',
    year: 2023,
    role: 'Principal Designer',
    company: 'CloudSync',
    description: 'Transformed a cluttered SaaS dashboard into a clean, efficient workspace that helped teams increase productivity by 25%. Introduced modular components and contextual help systems that reduced learning curve from 2 weeks to 2 days.',
    lessons: 'Information architecture is the foundation of great UX. When users can\'t find what they need quickly, even the most beautiful interface fails. Sometimes the best design decision is removing features rather than adding more.',
    imageUrl: '/images/project-dashboard.jpg',
    orderIndex: 1,
    category: 'Dashboard Design',
    isUnlocked: true,
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
    imageUrl: '/images/project-healthcare.jpg',
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
    imageUrl: '/images/project-fashion.jpg',
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
    imageUrl: '/images/project-analytics.jpg',
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
    imageUrl: '/images/project-collaboration.jpg',
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
