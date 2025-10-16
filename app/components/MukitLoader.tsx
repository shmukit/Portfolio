'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MukitLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function MukitLoader({ className = '', size = 'md' }: MukitLoaderProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Gradually loading M text with favicon font style */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <motion.div
          className={`font-bold text-gray-600 ${textSizes[size]} font-heading`}
          style={{
            fontFamily: 'Inter Tight, Inter, sans-serif',
            fontWeight: 600,
            letterSpacing: '-0.025em'
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            M
          </motion.span>
        </motion.div>
      </div>

      {/* Simple Loading text */}
      <motion.div
        className={`font-medium text-gray-500 ${textSizes[size]}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: [0, 1, 0.7, 1], 
          y: [10, 0, -2, 0] 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      >
        Loading
      </motion.div>
    </div>
  );
}

// Alternative minimal version for smaller spaces
export function MukitLoaderMinimal({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Simplified M with rotation */}
      <motion.div
        className="w-8 h-8 flex items-center justify-center"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M3 21 L3 3 L7 3 L12 12 L17 3 L21 3 L21 21 L18 21 L18 8 L15 8 L12 15 L9 8 L6 8 L6 21 Z"
            fill="currentColor"
            className="text-indigo-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>
      
      <motion.span
        className="text-sm text-gray-600"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        Loading...
      </motion.span>
    </div>
  );
}
