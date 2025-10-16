"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { iconHover, iconTap } from '../../lib/utils/animations';

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
        {/* Enhanced greeting with better typography */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={`text-base font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Hello there! I&apos;m
          </span>
        </motion.div>

        {/* Enhanced main heading with gradient text */}
        <motion.h1 
          className={`text-3xl font-bold mb-4 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <span className={`${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'
          }`}>
            Mukit
          </span>
          <motion.span 
            role="img" 
            aria-label="waving hand"
            className="inline-block origin-[70%_70%] ml-2"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1
            }}
          >👋</motion.span>
        </motion.h1>

        {/* Enhanced subtitle with better styling */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <p className={`text-lg leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Builder & Philomath, learning by doing
          </p>
        </motion.div>

        {/* Enhanced product ethos with better visual treatment - Mobile optimized */}
        <motion.div 
          className={`mb-3 p-2 rounded-lg border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
        >
          <h3 className={`text-xs font-semibold mb-1 uppercase tracking-wider ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Product Ethos
          </h3>
          <p className={`text-xs leading-tight whitespace-nowrap ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <span className={`font-bold bg-gradient-to-r ${
              theme === 'dark' ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
            } bg-clip-text text-transparent`}>Data</span> (analysis) • <span className={`font-bold bg-gradient-to-r ${
              theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'
            } bg-clip-text text-transparent`}>Decision</span> (strategy) • <span className={`font-bold bg-gradient-to-r ${
              theme === 'dark' ? 'from-pink-400 to-cyan-400' : 'from-pink-600 to-cyan-600'
            } bg-clip-text text-transparent`}>Design</span> (service)
          </p>
        </motion.div>
        
        {/* Mobile CTA Buttons - Icons Only */}
        <motion.div 
          className="flex flex-wrap gap-4 lg:gap-6 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="portfolio" 
                label="🎯" 
                href="#"
                theme={theme}
                onClick={onTogglePortfolio}
              />
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="cv" 
                label="📋" 
                href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
                theme={theme}
              />
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="email" 
                label="📧" 
                href="mailto:shazzadhossainmukit@gmail.com"
                theme={theme}
              />
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="linkedin" 
                label="💼" 
                href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
                theme={theme}
              />
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="github" 
                label="⚡" 
                href="https://github.com/shmukit"
                theme={theme}
              />
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
            >
              <AnimatedCTA 
                type="tools" 
                label="🛠️" 
                href="#tools"
                theme={theme}
              />
            </motion.div>
          </Suspense>
        </motion.div>

        {/* Enhanced Footer Section */}
        <motion.div 
          className={`mt-8 pt-6 border-t ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
        >
          <div className="flex flex-col gap-3">
            <div className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Last updated: <span className="font-medium">October 2025</span>
            </div>
            
            <div className={`text-xs flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Vibed while making this site</span>
              <motion.span 
                role="img" 
                aria-label="coffee"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >☕</motion.span>
              <motion.span 
                role="img" 
                aria-label="headphones"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              >🎧</motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
