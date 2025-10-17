'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { isValidImageUrl } from '../../lib/utils/imageValidation';

interface PerformanceOptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export default function PerformanceOptimizedImage({
  src,
  alt,
  width,
  height,
  className = "w-full h-auto object-contain",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75
}: PerformanceOptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setIsLoading(false);
  }, []);

  // Don't render if image URL is invalid
  if (!isValidImageUrl(src) || imageError) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border border-gray-300 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} object-contain`}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        sizes={sizes}
        quality={quality}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
