'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', (entry as PerformanceEntry & { value: number }).value);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as PerformanceEntry & { processingStart: number }).processingStart - entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'layout-shift', 'first-input'] });

    return () => observer.disconnect();
  }, []);

  return null;
}
