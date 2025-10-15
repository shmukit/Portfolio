"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

// Lazy load heavy components
const AnimatedCTA = lazy(() => import('./AnimatedCTA'));

interface MobileHeaderProps {
  theme: 'light' | 'dark';
  showPortfolio: boolean;
  onTogglePortfolio: () => void;
}

export default function MobileHeader({ theme, showPortfolio, onTogglePortfolio }: MobileHeaderProps) {
  return (
    <div className={`lg:hidden bg-transparent p-6 relative z-10 ${!showPortfolio ? 'min-h-screen flex items-center justify-center' : ''}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left"
      >
        
        {/* Mobile CTA Buttons - Icons Only */}
        <div className="flex flex-wrap gap-6 lg:gap-8 pt-2">
          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="cv" 
              label="📄" 
              href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
              theme={theme}
            />
          </Suspense>

          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="email" 
              label="✉️" 
              href="mailto:shazzadhossainmukit@gmail.com"
              theme={theme}
            />
          </Suspense>

          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="linkedin" 
              label="💼" 
              href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
              theme={theme}
            />
          </Suspense>

          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="github" 
              label="⚡" 
              href="https://github.com/shmukit"
              theme={theme}
            />
          </Suspense>

          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="portfolio" 
              label="🎯" 
              href="#"
              theme={theme}
              onClick={onTogglePortfolio}
            />
          </Suspense>

          <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
            <AnimatedCTA 
              type="tools" 
              label="🛠️" 
              href="#tools"
              theme={theme}
            />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
