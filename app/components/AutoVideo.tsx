'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface AutoVideoProps {
  src: string;
  poster?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  fallbackImage?: string;
}

export default function AutoVideo({
  src,
  poster,
  alt,
  width,
  height,
  className = "w-full h-auto object-contain",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 60,
  fallbackImage
}: AutoVideoProps) {
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px',
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Check video support and handle errors
  const handleVideoError = useCallback(() => {
    console.warn('Video failed to load, falling back to image:', src);
    setIsVideoError(true);
    setIsVideoSupported(false);
  }, [src]);

  const handleVideoLoaded = useCallback(() => {
    setIsVideoLoaded(true);
  }, []);

  // Handle video play/pause on visibility change
  useEffect(() => {
    if (!videoRef.current || !isVideoLoaded) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRef.current?.pause();
      } else if (isInView) {
        videoRef.current?.play().catch(console.warn);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isVideoLoaded, isInView]);

  // Helper: choose a safe image-only fallback (avoid passing video URLs to next/image)
  const imageFallbackCandidate = fallbackImage || poster || src.replace(/\.(webm|mp4)$/i, '.jpg');
  const isImageCandidate = /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(imageFallbackCandidate || '');

  // Fallback to image if video fails or not supported or not yet in view
  if (!isVideoSupported || isVideoError || !isInView) {
    return (
      <div ref={containerRef} className="relative">
        {isImageCandidate ? (
          <Image
            src={imageFallbackCandidate}
            alt={alt}
            width={width}
            height={height}
            className={className}
            loading={priority ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            sizes={sizes}
            quality={quality}
          />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-gray-300 bg-gray-100 text-gray-500" style={{width, height}}>
            Media unavailable
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden border border-gray-300 shadow-sm">
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500 text-sm">Loading...</div>
        </div>
      )}
      
      {isInView && (
        <video
          ref={videoRef}
          className={`${className} object-contain`}
          width={width}
          height={height}
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          onError={handleVideoError}
          onLoadedData={handleVideoLoaded}
          preload={priority ? "auto" : "metadata"}
        >
          <source src={src} type="video/webm" />
          {/* Only add mp4 fallback if it exists by convention; otherwise the browser logs an error. */}
          {src.endsWith('.webm') ? null : <source src={src.replace('.webm', '.mp4')} type="video/mp4" />}
          {/* Fallback content for very old browsers */}
          {isImageCandidate && (
            <Image
              src={imageFallbackCandidate}
              alt={alt}
              width={width}
              height={height}
              className={className}
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              sizes={sizes}
              quality={quality}
            />
          )}
        </video>
      )}
    </div>
  );
}
