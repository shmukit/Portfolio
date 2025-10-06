'use client';

import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-4">
        {/* Thumbnail skeleton */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="flex-1 space-y-3">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />

          {/* Role skeleton */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />

          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          </div>

          {/* Meta skeleton */}
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16" />
            <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const SkeletonCards = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
