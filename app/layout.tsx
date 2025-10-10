import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mukit - Product Builder',
  description: 'Entrepreneur & Philomath, learning by doing. Product Ethos: Data (analysis), Decision (strategy) & (service) Design.',
  keywords: ['portfolio', 'product builder', 'entrepreneur', 'data analysis', 'product strategy', 'service design'],
  authors: [{ name: 'Mukit' }],
  viewport: 'width=device-width, initial-scale=1',
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
  themeColor: '#a855f7',
  openGraph: {
    title: 'Mukit - Product Builder',
    description: 'Entrepreneur & Philomath, learning by doing. Product Ethos: Data (analysis), Decision (strategy) & (service) Design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mukit - Product Builder',
    description: 'Entrepreneur & Philomath, learning by doing. Product Ethos: Data (analysis), Decision (strategy) & (service) Design.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
