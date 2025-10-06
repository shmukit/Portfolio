'use client';

import { motion } from 'framer-motion';
import { SidebarProps } from '../../types/ui';
import { fadeInUp } from '../../lib/utils/animations';

export const Sidebar = ({ years, activeYear, onYearClick, className = '' }: SidebarProps) => {
  return (
    <motion.aside
      className={`fixed left-0 top-0 h-full w-80 bg-white border-r border-gray-100 z-40 ${className}`}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {/* Header Section */}
      <motion.div
        className="sticky top-0 bg-white p-8 border-b border-gray-100 backdrop-blur-sm"
        variants={fadeInUp}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Your Name
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Product Designer & Developer passionate about creating meaningful digital experiences
        </p>
      </motion.div>

      {/* Navigation Section */}
      <motion.nav
        className="p-8"
        variants={fadeInUp}
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Timeline
        </h2>
        <ul className="space-y-2">
          {years.map((year, index) => (
            <motion.li
              key={year}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <button
                className={`
                  w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
                  ${
                    activeYear === year
                      ? 'bg-accent text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                onClick={() => onYearClick(year)}
                aria-label={`View projects from ${year}`}
                aria-pressed={activeYear === year}
              >
                <span className="flex items-center justify-between">
                  {year}
                  {activeYear === year && (
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.nav>

      {/* Footer Section */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-8 border-t border-gray-100 bg-gray-50/50"
        variants={fadeInUp}
      >
        <div className="text-xs text-gray-500 space-y-1">
          <p>Built with Next.js & Framer Motion</p>
          <p>Modern portfolio design</p>
        </div>
      </motion.div>
    </motion.aside>
  );
};
