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
          transition={{ duration: 0.3, ease: "easeOut" }}
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
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
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
            style={{ filter: 'hue-rotate(-30deg) saturate(0.7) brightness(1.1) sepia(0.3)' }}
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
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
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
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
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
          className="flex items-center justify-start gap-3 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex items-center justify-center"
            >
              <button
                onClick={onTogglePortfolio}
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="2"
                    fill="#ef4444"
                  />
                </svg>
              </button>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex items-center justify-center"
            >
              <a
                href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                >
                  <path
                    d="M14 2H6C4.89 2 4 2.89 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V8L14 2Z"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14,2 14,8 20,8"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="10,9 9,9 8,9"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex items-center justify-center"
            >
              <a
                href="mailto:shazzadhossainmukit@gmail.com"
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                >
                  <path
                    d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke={theme === 'dark' ? 'currentColor' : 'currentColor'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex items-center justify-center"
            >
              <a
                href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <img
                  src={theme === 'dark' ? '/InBug-White.png' : '/InBug-Black.png'}
                  alt="LinkedIn"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                />
              </a>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex items-center justify-center"
            >
              <a
                href="https://github.com/shmukit"
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <img
                  src={theme === 'dark' ? '/github-mark-white.svg' : '/github-mark.svg'}
                  alt="GitHub"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                />
              </a>
            </motion.div>
          </Suspense>

          {/* Tools CTA hidden as requested */}
          {/* <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
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
          </Suspense> */}
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
            
            <div className={`text-sm flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <span>Vibed while making this site</span>
              <span className="text-lg">☕</span>
              <span className={`text-lg ${theme === 'dark' ? '' : 'text-gray-700'}`}>🎧</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
