'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollSpyHookReturn } from '../../types/ui';

export const useScrollSpy = (years: number[]): ScrollSpyHookReturn => {
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || years.length === 0) return;

    const yearElements = years.map(year => {
      const element = container.querySelector(`[data-year="${year}"]`) as HTMLElement;
      return { year, element };
    }).filter(({ element }) => element !== null);

    if (yearElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (highest first) and position from top
          const sortedEntries = visibleEntries.sort((a, b) => {
            const ratioDiff = b.intersectionRatio - a.intersectionRatio;
            if (ratioDiff !== 0) return ratioDiff;

            // If ratios are equal, prefer the one closer to the top
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          const mostVisible = sortedEntries[0];
          const year = mostVisible.target.getAttribute('data-year');
          if (year) {
            setActiveYear(parseInt(year));
          }
        }
      },
      {
        root: container,
        rootMargin: '-20% 0px -70% 0px', // Trigger when 20% from top, stop when 70% from top
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    );

    // Observe all year sections
    yearElements.forEach(({ element }) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [years]);

  // Set initial active year on mount
  useEffect(() => {
    if (years.length > 0 && activeYear === null) {
      setActiveYear(Math.max(...years));
    }
  }, [years, activeYear]);

  return { activeYear, containerRef };
};