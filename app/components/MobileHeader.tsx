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
        <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Hi, <motion.span 
            role="img" 
            aria-label="waving hand"
            className="inline-block origin-[70%_70%]"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          >👋🏼</motion.span> I am Mukit
        </h1>
        <p className={`text-sm leading-relaxed mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Entrepreneur & Philomath, learning by doing.
        </p>
        <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Product Ethos: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Data</span> (analysis), <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Decision</span> (strategy) & (service) <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Design</span>.
        </p>
        
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

        {/* Last Update and Vibed lines - Always visible */}
        <div className="pt-6">
          {/* Last Update */}
          <div className={`text-xs ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Last update: Oct &apos;25
          </div>

          {/* Vibed while making this site */}
          <div className={`text-xs pt-2 text-center ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>Vibed while making this site. </span>
            <span role="img" aria-label="coffee">☕</span>
            <span role="img" aria-label="headphones">🎧</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
