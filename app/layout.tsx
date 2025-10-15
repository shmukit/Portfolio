import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Manrope } from 'next/font/google';
import './globals.css';
import StructuredData from './components/StructuredData';
import PerformanceMonitor from './components/PerformanceMonitor';

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
    default: 'Shazzad Hossain Mukit – Product Manager Portfolio | Data-Driven, AI & Learning by Doing',
    template: '%s | Mukit - Product Manager',
  },
  description: 'Portfolio of Shazzad Hossain Mukit – a data-driven Product Manager passionate about learning by doing, building impactful products, and driving growth through analytics, design, and AI. Product work at 10 Minute School (10MS) including World Bank/IFC impact assessment, conversion optimization, and EdTech market research.',
  keywords: [
    // Professional Identity
    'Product Manager Portfolio',
    'AI Product Manager',
    'Growth Product Manager',
    'Product Leader Portfolio',
    'Shazzad Hossain Mukit',
    'Mukit',
    
    // Core PM Skills
    'Data-driven Product Management',
    'Product Strategy',
    'Growth Product Management',
    'Product Analytics',
    'Conversion Rate Optimization',
    'Conversion Optimization',
    'Dashboard Audit',
    'Feature Experimentation',
    'A/B Testing',
    'User Research',
    
    // Mindset & Philosophy
    'Learning by Doing',
    'Philomath',
    'Problem Solving',
    'Continuous Learning',
    'System Thinking',
    
    // Domain & Industry
    'EdTech Product Manager',
    '10 Minute School',
    '10MS',
    'Bangladesh Tech',
    'Digital Learning',
    'AI for Education',
    
    // Tools & Technology
    'Supabase',
    'Next.js',
    'Product Case Studies',
    
    // Specific Achievements
    'World Bank IFC',
    'Market Research',
    'Free to Paid Conversion',
    'Product Portfolio',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Shazzad Hossain Mukit - Product Manager Portfolio',
    title: 'Shazzad Hossain Mukit – Product Manager Portfolio | Data-Driven, AI & Learning by Doing',
    description: 'Portfolio of Shazzad Hossain Mukit – a data-driven Product Manager passionate about learning by doing, building impactful products, and driving growth through analytics, design, and AI.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Shazzad Hossain Mukit - Product Manager Portfolio | Data-Driven, AI & Learning by Doing',
      },
    ],
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
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
