'use client';

import { motion } from 'framer-motion';
import { Project } from '../../../types/project';
import { buttonHover, buttonTap, pillBreathe } from '../../../lib/utils/animations';

const getPillStyle = (
  isActive: boolean,
  theme: string,
  glowColor: string | undefined,
  useGlowShadow: boolean
) => ({
  background: isActive
    ? glowColor || (theme === 'dark'
      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(99, 102, 241, 0.3))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))')
    : 'transparent',
  borderColor: isActive
    ? (theme === 'dark' ? 'rgba(100, 116, 139, 0.4)' : 'rgba(200, 200, 200, 0.3)')
    : 'transparent',
  boxShadow: isActive
    ? (useGlowShadow ? `0 4px 20px ${glowColor || 'rgba(99, 102, 241, 0.15)'}` : '0 4px 20px rgba(99, 102, 241, 0.2)')
    : 'none'
});

export default function ProjectPill({
  project,
  theme,
  isActive,
  glowColor,
  isMobile,
  shouldReduceMotion,
  onClick,
  onHoverStart,
  onHoverEnd
}: {
  project: Project;
  theme: string;
  isActive: boolean;
  glowColor?: string;
  isMobile: boolean;
  shouldReduceMotion?: boolean;
  onClick: () => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}) {
  return (
    <motion.button
      className={`w-full text-left px-4 py-2 rounded-2xl ${isMobile ? '' : 'cursor-pointer'} flex flex-col relative overflow-hidden border backdrop-blur-md ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={isMobile ? undefined : buttonHover}
      whileTap={buttonTap}
      animate={!isMobile && !shouldReduceMotion ? (isActive ? 'breathing' : 'idle') : undefined}
      variants={!isMobile ? { breathing: pillBreathe, idle: {} } : undefined}
      style={getPillStyle(isActive, theme, glowColor, isMobile)}
    >
      <span className={`relative z-10 ${isMobile ? 'text-[10px]' : 'text-xs'} font-medium mb-1 ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {project.year}
      </span>
      <span className={`relative z-10 text-sm font-medium ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {project.title}
      </span>
    </motion.button>
  );
}
