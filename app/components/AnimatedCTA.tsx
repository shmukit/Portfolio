"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const iconsMap: Record<string, string[]> = {
  cv: ["📄", "📄", "📄", "📑"],
  email: ["✉️", "💌", "📧"],
  linkedin: ["⭐", "✨", "🌟", "💫"],
  github: ["0", "1", "0", "1", "0"],
  portfolio: ["💼", "🎯", "🚀", "⚡"],
  tools: ["🛠️", "✏️", "📏", "🔧"],
};

interface AnimatedCTAProps {
  type: keyof typeof iconsMap;
  label: string;
  href: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
}

export default function AnimatedCTA({ type, label, href, theme = 'light', onClick }: AnimatedCTAProps) {
  const [hovered, setHovered] = useState(false);
  const items = iconsMap[type] || [];

  return (
    <div className="relative inline-block">
      <motion.a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className={`text-sm font-medium transition-all duration-300 relative z-10 ${
          theme === 'dark'
            ? 'text-gray-300 hover:text-gray-200'
            : 'text-gray-600 hover:text-gray-700'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.a>

      <AnimatePresence>
        {hovered &&
          items.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
              animate={{
                y: [0, -40 - Math.random() * 30],
                x: [(i - items.length / 2) * 10, (i - items.length / 2) * 15 + (Math.random() - 0.5) * 20],
                opacity: [1, 0.8, 0],
                rotate: [0, (Math.random() - 0.5) * 60],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1 + Math.random() * 0.5, 
                ease: "easeOut",
                delay: i * 0.05
              }}
              className="absolute left-1/2 top-0 text-base pointer-events-none select-none"
              style={{
                transform: `translateX(-50%)`,
                zIndex: -1,
              }}
            >
              {icon}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

