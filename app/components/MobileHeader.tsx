"use client";

import { motion } from "framer-motion";
import { Suspense } from "react";
import Image from "next/image";
import { iconHover, iconTap } from '../../lib/utils/animations';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../lib/hooks/useTheme';

// Removed unused AnimatedCTA import

interface MobileHeaderProps {
  theme: 'light' | 'dark';
  showPortfolio: boolean;
  onTogglePortfolio: () => void;
  onOpenInvitations: () => void;
  onOpenDeepDives: () => void;
}

export default function MobileHeader({ theme, showPortfolio, onTogglePortfolio, onOpenInvitations, onOpenDeepDives }: MobileHeaderProps) {
  const { toggleTheme } = useTheme();
  return (
    <div className={`lg:hidden bg-transparent p-6 relative z-10 ${!showPortfolio ? 'min-h-screen flex items-center justify-center' : ''}`}>
      {/* Pin toggle to header's top-right, not viewport */}
      <div className="absolute top-4 right-4 z-40">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-left"
      >
        {/* Enhanced greeting with better typography */}
        <div className="mb-4">
          <span className={`text-base font-medium ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Hello there! I&apos;m
          </span>
        </div>

        {/* Enhanced main heading with gradient text */}
        <h1 className={`text-3xl font-bold mb-4 leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
          <span className={`${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent'
          }`}>
            Mukit
          </span>
          <span 
            role="img" 
            aria-label="waving hand"
            className="inline-block origin-[70%_70%] ml-2"
            style={{ filter: 'hue-rotate(-30deg) saturate(0.7) brightness(1.1) sepia(0.3)' }}
          >👋</span>
        </h1>

        {/* Enhanced subtitle with better styling */}
        <div className="mb-4">
          <p className={`text-lg leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Builder & Philomath, learning by doing
          </p>
        </div>

        {/* Enhanced product ethos with better visual treatment - Mobile optimized */}
        <div className={`mb-3 p-2 rounded-lg border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
          }`}>
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
        </div>
        
        {/* Mobile CTA Buttons - Icons Only */}
        <div className="flex items-end justify-start gap-4 pt-2 flex-wrap">
          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
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
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Portfolio
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
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
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Resume
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
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
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Email
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
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
                <Image
                  src={theme === 'dark' ? '/InBug-White.png' : '/InBug-Black.png'}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                />
              </a>
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                LinkedIn
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
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
                <Image
                  src={theme === 'dark' ? '/github-mark-white.svg' : '/github-mark.svg'}
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                />
              </a>
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                GitHub
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
            >
              <button
                onClick={onOpenInvitations}
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                aria-label="Open invitations"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                >
                  <path d="M4 4h4l2 3h6l2-3h2v16h-16v-16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Invitations
              </span>
            </motion.div>
          </Suspense>

          <Suspense fallback={<div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />}>
            <motion.div
              whileHover={iconHover}
              whileTap={iconTap}
              className="flex flex-col items-center justify-center gap-1"
            >
              <button
                onClick={onOpenDeepDives}
                className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center justify-center w-8 h-8 ${
                  theme === 'dark'
                    ? 'text-gray-200 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                aria-label="Open deep dives"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 transition-all duration-150 group-hover:scale-110"
                >
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <span className={`text-[10px] font-medium leading-none ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Deep dives
              </span>
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
        </div>

        {/* Enhanced Footer Section */}
        <div className={`mt-8 pt-6 border-t ${
            theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
          }`}>
          <div className="flex flex-col gap-3">
            <div className={`text-[11px] ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
            }`}>
              Last Updated: <span className="font-medium">March, 2026</span>
            </div>
            
            <div className={`text-[11px] flex items-center gap-2 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
            }`}>
              <span>Vibed while making this site</span>
              <span className="text-base">☕</span>
              <span className={`text-base ${theme === 'dark' ? '' : 'text-gray-700'}`}>🎧</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
