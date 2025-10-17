"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

// Lazy load heavy components
const AnimatedCTA = lazy(() => import('./AnimatedCTA'));

// Enhanced skeleton component
const SkeletonButton = ({ theme }: { theme: 'light' | 'dark' }) => (
  <motion.div 
    className={`w-20 h-10 rounded-lg ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
    }`}
    animate={{
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.02, 1]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

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
    <motion.div 
      className="flex flex-wrap gap-2 lg:gap-3 pt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
    >
      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="portfolio" 
          label="Portfolio" 
          href="#"
          theme={theme}
          onClick={onTogglePortfolio}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="cv" 
          label="CV" 
          href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="email" 
          label="Email" 
          href="mailto:shazzadhossainmukit@gmail.com"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="linkedin" 
          label="LinkedIn" 
          href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
          theme={theme}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="github" 
          label="GitHub" 
          href="https://github.com/shmukit"
          theme={theme}
        />
      </Suspense>

      {/* Tools CTA hidden as requested */}
      {/* <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="tools" 
          label="Tools" 
          href="#tools"
          theme={theme}
        />
      </Suspense> */}
    </motion.div>
  );
}
