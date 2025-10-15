"use client";

import { Suspense, lazy } from "react";

// Lazy load heavy components
const AnimatedCTA = lazy(() => import('./AnimatedCTA'));

interface CTASectionProps {
  theme: 'light' | 'dark';
  onTogglePortfolio: () => void;
  isMobile?: boolean;
}

export default function CTASection({ theme, onTogglePortfolio, isMobile = false }: CTASectionProps) {
  if (isMobile) {
    // Mobile CTAs are handled in MobileHeader component
    return null;
  }

  return (
    <div className="flex flex-wrap gap-6 lg:gap-8 pt-4">
      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="cv" 
          label="CV" 
          href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="email" 
          label="Email" 
          href="mailto:shazzadhossainmukit@gmail.com"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="linkedin" 
          label="LinkedIn" 
          href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="github" 
          label="GitHub" 
          href="https://github.com/shmukit"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="portfolio" 
          label="Portfolio" 
          href="#"
          theme={theme}
          onClick={onTogglePortfolio}
        />
      </Suspense>

      <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
        <AnimatedCTA 
          type="tools" 
          label="Tools" 
          href="#tools"
          theme={theme}
        />
      </Suspense>
    </div>
  );
}
