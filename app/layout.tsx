import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Designer & Developer',
  description: 'A minimalist portfolio showcasing design and development projects with a vertical timeline layout.',
  keywords: ['portfolio', 'designer', 'developer', 'ux', 'ui', 'product design'],
  authors: [{ name: 'Your Name' }],
  viewport: 'width=device-width, initial-scale=1',
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
