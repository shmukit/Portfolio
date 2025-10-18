import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Manrope } from 'next/font/google';
import './globals.css';
import StructuredData from './components/StructuredData';
import PerformanceMonitor from './components/PerformanceMonitor';
import { ThemeProvider } from '../lib/hooks/useTheme';

// Optimize font loading
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const siteUrl = 'https://www.mukit.xyz';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#a855f7',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Shazzad Hossain Mukit – Product Manager Portfolio | Data, Design & Decision.',
    template: '%s | Mukit - Product Manager',
  },
  description: 'Shazzad Hossain Mukit is a data-driven Product Manager, his product ethos are: Data (analysis), Decision (strategy) and Design (service). Portfolio showcasing growth product management, product strategy, conversion optimization, distribution strategy, user research, and data analytics expertise with a "learning by doing" philosophy.',
  keywords: [
    // Professional Identity
    'Shazzad Hossain Mukit',
    'Mukit',
    'Product Manager Portfolio',
    'AI Product Manager',
    'Growth Product Manager',
    'Product Leader Portfolio',
    'Senior Product Manager',
    'Product Strategy Lead',
    
    // Core PM Skills & Expertise
    'Data-driven Product Management',
    'Product Strategy',
    'Growth Product Management',
    'Product Analytics',
    'Conversion Rate Optimization',
    'Forward Deployed Engineer',
    'Dashboard Audit',
    'Feature Experimentation',
    'Market Research',
    'User Research',
    'Product Development',
    'Product Roadmap',
    'Product Metrics',
    'Product KPIs',
    'Rapid Prototyping',
    'Product Gamification',
    
    // AI & Technology
    'AI Product Management',
    'Vibe Coding',
    'AI for Education',
    'EdTech AI Solutions',
    'Data Analytics',
    'Business Intelligence',
    'Evals & Observability',
    'Workflow Automation',
    'AI-powered Learning',
    
    // Mindset & Philosophy
    'Learning by Doing',
    'Philomath',
    'Problem Solving',
    'Continuous Learning',
    'System Thinking',
    'Data-driven Decision Making',
    'User-centered Design',
    'Evidence-based Product Management',
    'Prototyping & MVP',
    'Product-Led Growth',
    'Product-Led Sales',
    'Service Design',
  
    
    // Domain & Industry
    'EdTech Product Manager',
    'Education Technology',
    'Digital Learning',
    'Online Education',
    'Learning Management System',
    'Educational Platform',
    'Student Engagement',
    'Learning Analytics',
    
    // Company & Location
    '10 Minute School',
    '10MS',
    'Bangladesh Tech',
    'Bangladesh Product Manager',
    'South Asia Tech',
    'Emerging Markets Tech',
    
    // Tools & Technology
    'Supabase',
    'Cursor',
    'Figma Make',
    'Product Specs',
    'Product Case Studies',
    'Product Documentation',
    'Product Management Tools',
    'Analytics Tools',
    'User Research Tools',
    
    // Specific Achievements & Recognition
    'World Bank IFC',
    'Market Research',
    'Free to Paid Conversion',
    'Product Portfolio',
    'Product Innovation',
    'Product Impact',
    'Product Success Stories',
    'Product Case Studies',
    
    // Professional Development
    'Product Management Career',
    'Product Manager Resume',
    'Product Management Skills',
    'Product Management Experience',
    'Product Management Best Practices',
    'Product Management Methodology',
    'Agile Product Management',
    'Scrum Master',
    
    // Industry Keywords
    'Tech Industry',
    'Startup Experience',
    'Scale-up Experience',
    'Product-led Growth',
    'Growth Hacking',
    'User Acquisition',
    'Retention Strategies',
    'Product Monetization'
  ],
  authors: [{ name: 'Shazzad Hossain Mukit', url: siteUrl }],
  creator: 'Mukit',
  publisher: 'Mukit',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shazzad Hossain Mukit - Product Manager Portfolio',
    title: 'Shazzad Hossain Mukit – Product Manager Portfolio | Product Ethos: Data, Decision & Design.',
    description: 'Shazzad Hossain Mukit is a data-driven Product Manager, his product ethos are: Data (analysis), Decision (strategy) and Design (service). Portfolio showcasing growth product management, product strategy, conversion optimization, distribution strategy, user research, and data analytics expertise with a "learning by doing" philosophy.',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${manrope.variable}`}>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased font-manrope" suppressHydrationWarning={true}>
        <ThemeProvider>
          <PerformanceMonitor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
