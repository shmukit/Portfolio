"use client";

import { motion } from "framer-motion";
import { themeToggleHover } from '../../lib/utils/animations';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed top-6 right-6 z-50 w-11 h-6 rounded-full flex items-center transition-all duration-500 shadow-lg ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500'
      }`}
      aria-label="Toggle theme"
      whileHover={themeToggleHover}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
          theme === 'dark' ? 'bg-white' : 'bg-white'
        }`}
        animate={{
          x: theme === 'dark' ? 20 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 180 : 0,
            scale: theme === 'dark' ? 0.8 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        >
          {theme === 'light' ? (
            <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
