'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface MobileNavProps {
  years: number[];
  activeYear: number | null;
  onYearClick: (year: number) => void;
}

export const MobileNav = ({ years, activeYear, onYearClick }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle navigation menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Mobile navigation overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Navigation panel */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-xl font-bold text-gray-900">Your Name</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Designer & Developer
                </p>
              </div>

              {/* Navigation items */}
              <nav className="p-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Timeline
                </h2>
                <div className="space-y-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      className={`
                        w-full text-left py-3 px-4 rounded-lg font-medium transition-colors duration-200
                        ${activeYear === year
                          ? 'bg-accent text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                      onClick={() => {
                        onYearClick(year);
                        setIsOpen(false);
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
