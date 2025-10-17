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

  const gradientColors = [
    {
      background: 'linear-gradient(135deg, #ec4899, #3b82f6, #8b5cf6)', // pink to blue to purple
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)', // blue to cyan to purple
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #06b6d4, #ec4899, #3b82f6)', // cyan to pink to blue
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)', // purple to pink to cyan
      backgroundSize: '200% 200%'
    }
  ];

  return (
    <div className={`flex items-center justify-center ${spacing[size]} ${className}`}>
      {gradientColors.map((color, index) => (
        <motion.div
          key={index}
          className={`${dotSizes[size]} rounded-full`}
          style={color}
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
  const gradientColors = [
    {
      background: 'linear-gradient(135deg, #ec4899, #3b82f6, #8b5cf6)', // pink to blue to purple
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)', // blue to cyan to purple
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #06b6d4, #ec4899, #3b82f6)', // cyan to pink to blue
      backgroundSize: '200% 200%'
    },
    {
      background: 'linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)', // purple to pink to cyan
      backgroundSize: '200% 200%'
    }
  ];

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {gradientColors.map((color, index) => (
        <motion.div
          key={index}
          className={`w-1.5 h-1.5 rounded-full`}
          style={color}
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
