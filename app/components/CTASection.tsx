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
  onToggleFailures?: () => void;
  onOpenInvitations?: () => void;
  onOpenDeepDives?: () => void;
  isMobile?: boolean;
  hasAnimated?: boolean;
}

export default function CTASection({ theme, onTogglePortfolio, onToggleFailures, onOpenInvitations, onOpenDeepDives, isMobile = false, hasAnimated = false }: CTASectionProps) {
  if (isMobile) {
    // Mobile CTAs are handled in MobileHeader component
    return null;
  }

  return (
    <motion.div 
      className="flex flex-wrap gap-2 lg:gap-3 pt-8"
      initial={hasAnimated ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: hasAnimated ? 0 : 0.4 }}
    >
      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="portfolio" 
          label="Portfolio" 
          href="#"
          theme={theme}
          onClick={onTogglePortfolio}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="cv" 
          label="CV" 
          href="https://drive.google.com/file/d/1c845mjNezP856-Tu57qJjesFghtJHi5a/view?usp=sharing"
          theme={theme}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="email" 
          label="Email" 
          href="#"
          theme={theme}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="linkedin" 
          label="LinkedIn" 
          href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
          theme={theme}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA 
          type="github" 
          label="GitHub" 
          href="https://github.com/shmukit"
          theme={theme}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA
          type="invitations"
          label="Invitations"
          href="#"
          theme={theme}
          onClick={onOpenInvitations}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      <Suspense fallback={<SkeletonButton theme={theme} />}>
        <AnimatedCTA
          type="deepdives"
          label="Deep Dives"
          href="#"
          theme={theme}
          onClick={onOpenDeepDives}
          hasAnimated={hasAnimated}
        />
      </Suspense>

      {/* Failures CTA - HIDDEN FOR NOW */}
      {false && onToggleFailures && (
        <Suspense fallback={<SkeletonButton theme={theme} />}>
          <AnimatedCTA 
            type="failures" 
            label="Failures" 
            href="#"
            theme={theme}
            onClick={onToggleFailures}
            hasAnimated={hasAnimated}
          />
        </Suspense>
      )}

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
