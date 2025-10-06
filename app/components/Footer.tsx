'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/utils/animations';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-white border-t border-gray-100 mt-32"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-4xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            © {currentYear} Your Name. All rights reserved.
          </div>

          {/* Built with */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Built with</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Next.js</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Framer Motion</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-xs">Tailwind CSS</span>
            </div>
          </div>

          {/* Inspiration */}
          <div className="text-sm text-gray-500">
            Design inspired by modern portfolio aesthetics
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
