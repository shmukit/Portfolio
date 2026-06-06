import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, Manrope } from 'next/font/google';
import './globals.css';
import StructuredData from './components/StructuredData';
import PerformanceMonitor from './components/PerformanceMonitor';
import { Analytics } from './components/Analytics';
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
    default: 'Mukit | AI Product Manager & Technical Builder',
    template: '%s | Mukit',
  },
  description: 'Shazzad Hossain Mukit is a technical builder and AI Product Manager. Portfolio showcasing Agentic Workflows, AI automation, product strategy, and full-stack development expertise.',
  keywords: [
    'Shazzad Hossain Mukit',
    'Mukit',
    'AI Product Manager',
    'Technical Builder',
    'Product Consultant',
    'Agentic Workflows',
    'Market Intelligence',
    'EdTech Innovation',
    'Data Analytics',
    'AI Automation',
    'Product Strategy',
    'Full Stack Development'
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
    siteName: 'Mukit | AI Product Manager & Builder',
    title: 'Mukit | AI Product Manager & Technical Builder',
    description: 'Technical builder and AI Product Manager. Portfolio showcasing Agentic Workflows, AI automation, product strategy, and full-stack development expertise.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukit | AI Product Manager & Technical Builder',
    description: 'Technical builder and AI Product Manager. Portfolio showcasing Agentic Workflows, AI automation, product strategy, and full-stack development expertise.',
    creator: '@shmukit',
  },
  alternates: {
    canonical: siteUrl,
  },
};

function supabaseDnsPrefetchOrigin(): string | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || url === 'https://your-project.supabase.co') return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseOrigin = supabaseDnsPrefetchOrigin();
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${manrope.variable}`}>
      <head>
        <StructuredData />
        {googleSiteVerification ? (
          <meta name="google-site-verification" content={googleSiteVerification} />
        ) : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {supabaseOrigin ? <link rel="dns-prefetch" href={supabaseOrigin} /> : null}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased font-manrope" suppressHydrationWarning={true}>
        <Analytics />
        <ThemeProvider>
          <PerformanceMonitor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
