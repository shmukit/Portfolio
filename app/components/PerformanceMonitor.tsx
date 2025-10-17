'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    if (process.env.NODE_ENV !== 'development' && !process.env.NEXT_PUBLIC_PERF_MONITOR) {
      return;
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        } else if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          console.log('FID:', fidEntry.processingStart - entry.startTime);
        } else if (entry.entryType === 'layout-shift') {
          console.log('CLS:', (entry as PerformanceEntry & { value: number }).value);
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }

    // Monitor image loading performance
    const imageObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource' && (entry as PerformanceEntry & { name: string; transferSize: number }).name.includes('.gif')) {
          const resourceEntry = entry as PerformanceEntry & { name: string; transferSize: number };
          console.warn('Large GIF detected:', resourceEntry.name, 'Size:', resourceEntry.transferSize);
        }
      }
    });

    try {
      imageObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource monitoring not supported:', error);
    }

    return () => {
      observer.disconnect();
      imageObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}