'use client';

import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
}

export default function LoadingSkeleton({ className = '' }: LoadingSkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded h-3 w-1/2 mb-4"></div>
      <div className="bg-gray-200 rounded h-32 w-full"></div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-3/4 mb-3"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2 mb-4"></div>
      <div className="bg-gray-200 dark:bg-gray-700 rounded h-32 w-full mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-3 w-full"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-3 w-5/6"></div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded h-3 w-4/6"></div>
      </div>
    </div>
  );
}
