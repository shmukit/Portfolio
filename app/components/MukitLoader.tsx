'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MukitLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function MukitLoader({ className = '', size = 'md' }: MukitLoaderProps) {
  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2', 
    lg: 'w-2.5 h-2.5'
  };

  const spacing = {
    sm: 'space-x-1',
    md: 'space-x-2',
    lg: 'space-x-3'
  };

  const colors = ['bg-blue-500', 'bg-cyan-500', 'bg-purple-500', 'bg-pink-500'];

  return (
    <div className={`flex items-center justify-center ${spacing[size]} ${className}`}>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={`${dotSizes[size]} ${color} rounded-full`}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Alternative minimal version for smaller spaces
export function MukitLoaderMinimal({ className = '' }: { className?: string }) {
  const colors = ['bg-blue-500', 'bg-cyan-500', 'bg-purple-500', 'bg-pink-500'];

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={`w-1.5 h-1.5 ${color} rounded-full`}
          animate={{
            y: [0, -6, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}
