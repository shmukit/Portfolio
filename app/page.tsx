'use client';

import { ErrorBoundary } from './components/ErrorBoundary';
import { useProjects } from '../lib/hooks/useProjects';
import { Project } from '../types/project';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useCallback, useMemo, memo, useEffect, lazy, Suspense } from 'react';
import PerformanceOptimizedImage from './components/PerformanceOptimizedImage';
import PerformanceMonitor from './components/PerformanceMonitor';
import { 
  pillTap, 
  swipeCard,
  pillBreathe,
  modalOverlay,
  modalContent,
  mobileModalSlide,
  mobileCardDrag,
  staggeredReveal,
  buttonHover,
  buttonTap,
  iconHover,
  closeButtonHover,
  closeButtonTap
} from '../lib/utils/animations';
import { useTheme } from '../lib/hooks/useTheme';
import { usePortfolio } from '../lib/hooks/usePortfolio';
import ThemeToggle from './components/ThemeToggle';
import MobileHeader from './components/MobileHeader';
import CTASection from './components/CTASection';
import UrlCTAMultiple from './components/UrlCTAMultiple';
import MukitLoader from './components/MukitLoader';
import ProjectStructuredData from './components/ProjectStructuredData';
import { isValidImageUrl } from '../lib/utils/imageValidation';

// Lazy load heavy components
const ProjectContent = lazy(() => import('./components/ProjectContent'));
const AnimatedBackground = dynamic(() => import('./components/AnimatedBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
});

// Memoized Project Pill Component for better performance
const ProjectPill = memo(({ 
  project, 
  isHovered, 
  glowColor, 
  theme, 
  onHover, 
  onSelect, 
  shouldReduceMotion 
}: {
  project: Project;
  isHovered: boolean;
  glowColor: string | undefined;
  theme: string;
  onHover: (project: Project | null) => void;
  onSelect: (project: Project) => void;
  shouldReduceMotion: boolean | null;
}) => (
  <motion.button
    key={project.id} 
    className={`w-full text-left px-4 py-2 rounded-2xl cursor-pointer flex flex-col relative overflow-hidden border backdrop-blur-md ${
      theme === 'dark' ? 'text-white' : 'text-black'
    }`}
    onClick={() => onSelect(project)}
    onHoverStart={() => onHover(project)}
    onHoverEnd={() => onHover(null)}
    whileTap={pillTap}
    animate={shouldReduceMotion ? {} : (isHovered ? "breathing" : "idle")}
    variants={{
      breathing: pillBreathe,
      idle: {}
    }}
    style={{
      background: isHovered 
        ? glowColor || (theme === 'dark' 
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(99, 102, 241, 0.3))'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))')
        : 'transparent',
      borderColor: isHovered 
        ? (theme === 'dark' ? 'rgba(100, 116, 139, 0.4)' : 'rgba(200, 200, 200, 0.3)')
        : 'transparent',
      boxShadow: isHovered 
        ? '0 4px 20px rgba(99, 102, 241, 0.2)' 
        : 'none'
    }}
  >
    <span className={`relative z-10 text-xs font-medium mb-1 ${
      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
    }`}>
      {project.year}
    </span>
    <span className={`relative z-10 text-sm font-medium ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      {project.title}
    </span>
  </motion.button>
));

ProjectPill.displayName = 'ProjectPill';


export default function Home() {
  const { projects, loading, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPinned, setIsPinned] = useState(false); // Track if modal is pinned (clicked)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const [hasAnimated, setHasAnimated] = useState(false); // Track if initial animation has played
  const { theme, toggleTheme } = useTheme();
  const { showPortfolio, togglePortfolio } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();

  // Set hasAnimated to true after initial load to prevent re-animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 2000); // Allow initial animations to complete
    
    return () => clearTimeout(timer);
  }, []);

  // Projects are already available from useProjects hook
  // Removed unused years and projectsByYear variables

  // Memoized gradient colors for better performance
  const gradients = useMemo(() => [
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.2))',   // white to cyan
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(147, 51, 234, 0.2))',  // white to purple
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(59, 130, 246, 0.2))',  // white to blue
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(236, 72, 153, 0.2))'   // white to pink
  ], []);

  const getRandomGradient = useCallback(() => {
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, [gradients]);

  // Memoized project hover handler
  const handleProjectHover = useCallback((project: Project | null) => {
    if (project) {
    setHoveredProject(project);
      setIsPinned(false);
      if (!glowColors[project.id]) {
      setGlowColors(prev => ({
        ...prev,
        [project.id]: getRandomGradient()
      }));
      }
    } else if (!isPinned) {
        setHoveredProject(null);
      }
  }, [glowColors, isPinned, getRandomGradient]);

  // Memoized project selection handler
  const handleProjectSelect = useCallback((project: Project) => {
    setHoveredProject(project);
    setIsPinned(true);
    const index = projects.findIndex(p => p.id === project.id);
    setCurrentProjectIndex(index);
    if (!glowColors[project.id]) {
      setGlowColors(prev => ({
        ...prev,
        [project.id]: getRandomGradient()
      }));
    }
  }, [projects, glowColors, getRandomGradient]);

  // Memoized close handler
  const handleProjectClose = useCallback(() => {
    setHoveredProject(null);
    setIsPinned(false);
  }, []);

  // Enhanced mobile swipe navigation with better thresholds
  const handleSwipeLeft = () => {
    if (currentProjectIndex < projects.length - 1) {
      const nextProject = projects[currentProjectIndex + 1];
      setCurrentProjectIndex(currentProjectIndex + 1);
      handleProjectSelect(nextProject);
    }
  };

  const handleSwipeRight = () => {
    if (currentProjectIndex > 0) {
      const prevProject = projects[currentProjectIndex - 1];
      setCurrentProjectIndex(currentProjectIndex - 1);
      handleProjectSelect(prevProject);
    }
  };

  // Enhanced swipe detection with velocity consideration
  const minSwipeDistance = 60;
  const minSwipeVelocity = 0.5;

  // Handle mobile modal swipe navigation
  const handleModalSwipeLeft = () => {
    if (currentProjectIndex < projects.length - 1) {
      const nextProject = projects[currentProjectIndex + 1];
      setCurrentProjectIndex(currentProjectIndex + 1);
      setHoveredProject(nextProject);
      if (!glowColors[nextProject.id]) {
        setGlowColors(prev => ({
          ...prev,
          [nextProject.id]: getRandomGradient()
        }));
      }
    }
  };

  const handleModalSwipeRight = () => {
    if (currentProjectIndex > 0) {
      const prevProject = projects[currentProjectIndex - 1];
      setCurrentProjectIndex(currentProjectIndex - 1);
      setHoveredProject(prevProject);
      if (!glowColors[prevProject.id]) {
        setGlowColors(prev => ({
          ...prev,
          [prevProject.id]: getRandomGradient()
        }));
      }
    }
  };

  // Touch event handlers for better mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const absDistance = Math.abs(distance);
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    // Enhanced swipe detection with minimum distance
    if (absDistance > minSwipeDistance) {
    if (isLeftSwipe) {
      handleModalSwipeLeft();
      } else if (isRightSwipe) {
      handleModalSwipeRight();
    }
    }
    
    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Enhanced loading state with custom Mukit loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <MukitLoader size="lg" />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {/* Performance monitoring */}
      <PerformanceMonitor />
      {/* Project-specific structured data for SEO & GenAI */}
      <ProjectStructuredData projects={projects} />
      
      <main className="min-h-screen relative" role="main">
        {/* Animated Background - Lazy loaded */}
        <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />}>
          <AnimatedBackground theme={theme} />
        </Suspense>
        {/* Theme Toggle Button */}
        <ThemeToggle theme={theme} onToggle={toggleTheme} />

        {/* Mobile Header */}
        <MobileHeader 
          theme={theme} 
          showPortfolio={showPortfolio} 
          onTogglePortfolio={togglePortfolio} 
        />


        {/* Desktop Layout - Scrollable Page with Fixed Center */}
        <div className="hidden lg:block relative z-10">
          {/* Main scrollable container */}
          <div className="flex">
            {/* Left Project Pane - Scrolls with page */}
            {showPortfolio && (
            <div className="w-80 z-30">
              <div className="pl-24 pr-4 py-8">
                {/* Project pills */}
                <motion.div 
                  className="space-y-3"
                  variants={staggeredReveal}
                  initial="hidden"
                  animate={hasAnimated ? "visible" : "visible"}
                >
                  {projects.map((project) => (
                    <motion.button
                    key={project.id} 
                      className={`w-full text-left px-4 py-2 rounded-2xl cursor-pointer flex flex-col relative overflow-hidden border backdrop-blur-md ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                      onClick={() => handleProjectSelect(project)}
                    onHoverStart={() => handleProjectHover(project)}
                    onHoverEnd={() => handleProjectHover(null)}
                      whileHover={buttonHover}
                      whileTap={buttonTap}
                      animate={shouldReduceMotion ? {} : (hoveredProject?.id === project.id ? "breathing" : "idle")}
                      variants={{
                        breathing: pillBreathe,
                        idle: {}
                      }}
                      style={{
                        background: hoveredProject?.id === project.id 
                          ? glowColors[project.id] || (theme === 'dark' 
                            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(99, 102, 241, 0.3))'
                            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))')
                          : 'transparent',
                        borderColor: hoveredProject?.id === project.id 
                          ? (theme === 'dark' ? 'rgba(100, 116, 139, 0.4)' : 'rgba(200, 200, 200, 0.3)')
                          : 'transparent',
                        boxShadow: hoveredProject?.id === project.id 
                          ? '0 4px 20px rgba(99, 102, 241, 0.2)' 
                          : 'none'
                      }}
                    >
                      {/* Year on first line */}
                      <span className={`relative z-10 text-xs font-medium mb-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {project.year}
                      </span>
                      {/* Project title on second line */}
                      <span className={`relative z-10 text-sm font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
            )}

            {/* Right Content Area */}
            <div className={`flex-1 relative ${!showPortfolio && 'flex justify-center'}`}>

              {/* Fixed Center Content Area */}
                <div className={`${showPortfolio ? 'fixed left-[352px] right-0' : 'w-full'} top-0 h-screen flex items-center justify-center pointer-events-none z-20`}>
                <div className="w-full max-w-5xl px-6 lg:px-12 pointer-events-auto">
            {hoveredProject ? (
              /* Project Detail Modal Content */
              <motion.div 
                  className={`w-full max-h-[85vh] overflow-y-auto scrollbar-hide rounded-3xl shadow-2xl p-8 relative ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                  {/* Enhanced Close Button */}
                  <motion.button
                    onClick={handleProjectClose}
                    className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    aria-label="Close"
                    whileHover={closeButtonHover}
                    whileTap={closeButtonTap}
                  >
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={iconHover}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  </motion.button>

                {/* Project Header */}
                <div className="mb-6 lg:mb-8">
                  {/* Phase and Project Type Badges */}
                  <div className="flex gap-3 mb-4">
                    {hoveredProject.category && (
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {hoveredProject.category}
                      </div>
                    )}
                    {hoveredProject.phase && (
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {hoveredProject.phase}
                      </div>
                    )}
                    {hoveredProject.projectType && (
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                        {hoveredProject.projectType}
                      </div>
                    )}
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                      {hoveredProject.year}
                    </div>
                  </div>

                    <h2 className={`text-2xl lg:text-4xl font-bold mb-3 leading-tight ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    {hoveredProject.title}
                  </h2>
                  <p className="text-base lg:text-lg text-accent font-medium mb-6">
                    {hoveredProject.role} • {hoveredProject.company}
                  </p>
                </div>

                {/* Project Image - Performance optimized with smart sizing */}
                {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
                  <div className="mb-6 lg:mb-8 flex justify-center">
                    {/* Detect if it's a mobile screenshot based on filename */}
                    {hoveredProject.imageUrl.includes('RCT_tara') || 
                     hoveredProject.imageUrl.includes('Rating System') || 
                     hoveredProject.imageUrl.includes('quizards') ? (
                      // Mobile screenshots - responsive sizing for better readability
                      <div className="max-w-[320px] lg:max-w-[380px] mx-auto">
                        <PerformanceOptimizedImage
                          src={hoveredProject.imageUrl}
                          alt={hoveredProject.title}
                          width={380}
                          height={650}
                          sizes="(max-width: 768px) 320px, (max-width: 1024px) 350px, 380px"
                          quality={75}
                        />
                      </div>
                    ) : (
                      // Desktop/web screenshots - larger container
                      <div className="max-w-2xl mx-auto">
                        <PerformanceOptimizedImage
                          src={hoveredProject.imageUrl}
                          alt={hoveredProject.title}
                          width={800}
                          height={500}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={75}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Project Content - Lazy loaded */}
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
                  <ProjectContent project={hoveredProject} theme={theme} />
                </Suspense>
              </motion.div>
            ) : (
              /* Enhanced Hero Section */
                <div className="space-y-8 lg:space-y-10 max-w-4xl">
                <div className="relative">
                  {/* Decorative background elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Enhanced greeting with better typography */}
                    <motion.div 
                      className="mb-4"
                      initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <span className={`text-lg lg:text-xl font-medium ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        Hello there! I&apos;m
                      </span>
                    </motion.div>

                    {/* Enhanced main heading with gradient text */}
                    <motion.h1 
                      className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                      initial={hasAnimated ? false : { opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: hasAnimated ? 0 : 0.1 }}
                    >
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                        Mukit
                      </span>
                      <motion.span 
                      role="img" 
                      aria-label="waving hand"
                        className="inline-block origin-[70%_70%] ml-3"
                        style={{ filter: 'hue-rotate(-30deg) saturate(0.7) brightness(1.1) sepia(0.3)' }}
                      animate={shouldReduceMotion ? {} : { rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={shouldReduceMotion ? {} : { 
                        duration: 2.5, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      >👋</motion.span>
                    </motion.h1>

                    {/* Enhanced subtitle with better styling */}
                    <motion.div 
                      className="space-y-4"
                      initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: hasAnimated ? 0 : 0.2 }}
                    >
                      <p className={`text-xl lg:text-2xl leading-relaxed font-medium ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        Builder & Philomath, learning by doing
                      </p>
                    </motion.div>

                    {/* Enhanced product ethos with better visual treatment */}
                    <motion.div 
                      className={`mt-8 p-6 rounded-2xl border backdrop-blur-sm ${
                        theme === 'dark' 
                          ? 'bg-gray-800/50 border-gray-700/50' 
                          : 'bg-white/50 border-gray-200/50'
                      }`}
                      initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: hasAnimated ? 0 : 0.3 }}
                    >
                      <h3 className={`text-sm font-semibold mb-3 uppercase tracking-wider ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                        Product Ethos
                      </h3>
                      <p className={`text-lg leading-relaxed ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>Data</span> (analysis) • <span className={`font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>Decision</span> (strategy) • <span className={`font-bold bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent`}>Design</span> (service)
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <CTASection 
                  theme={theme} 
                  onTogglePortfolio={togglePortfolio} 
                  hasAnimated={hasAnimated}
                />

                {/* Enhanced Footer Section - Static after initial load */}
                <motion.div 
                  className={`mt-12 pt-8 border-t ${
                    theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                  }`}
                  initial={hasAnimated ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: hasAnimated ? 0 : 0.4 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>
                      Last updated: <span className="font-medium">October 2025</span>
                    </div>

                    <div className={`text-sm flex items-center gap-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                }`}>
                      <span>Vibed while making this site</span>
                      <span className="text-lg">☕</span>
                      <span className={`text-lg ${theme === 'dark' ? '' : 'text-gray-700'}`}>🎧</span>
                </div>
                  </div>
                </motion.div>

              </div>
            )}
                </div>
              </div>

              {/* Scrollable Page Content - Creates page-wide scroll */}
              <div className="min-h-screen">
                {/* Content that pushes the page height to enable scrolling */}
                <div className="pt-screen pb-20">
                  {/* Empty space to enable scrolling without showing generic content */}
                  <div className="h-screen"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Project Cards Only */}
        <div className="lg:hidden py-8 px-4 relative z-10">
          {/* Mobile Project Cards - Only show when portfolio is toggled */}
          {showPortfolio && (
          <motion.div 
            className="space-y-2 max-w-md mx-auto"
            variants={staggeredReveal}
            initial="hidden"
            animate={hasAnimated ? "visible" : "visible"}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="relative"
                {...mobileCardDrag}
                onDragEnd={(e, info) => {
                  const { offset, velocity } = info;
                  const swipeDistance = Math.abs(offset.x);
                  const swipeVelocity = Math.abs(velocity.x);
                  
                  // Enhanced swipe detection: distance OR velocity
                  if (swipeDistance > minSwipeDistance || swipeVelocity > minSwipeVelocity) {
                    if (offset.x > 0) {
                    handleSwipeRight();
                    } else if (offset.x < 0) {
                    handleSwipeLeft();
                    }
                  }
                }}
                variants={{
                  ...swipeCard
                }}
              >
                <motion.button
                  className={`w-full text-left px-4 py-2 rounded-2xl flex flex-col relative overflow-hidden border backdrop-blur-md ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  onClick={() => handleProjectSelect(project)}
                  whileHover={buttonHover}
                  whileTap={buttonTap}
                  style={{
                    background: hoveredProject?.id === project.id 
                      ? glowColors[project.id] || (theme === 'dark' 
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(99, 102, 241, 0.3))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))')
                      : 'transparent',
                    borderColor: hoveredProject?.id === project.id 
                      ? (theme === 'dark' ? 'rgba(100, 116, 139, 0.4)' : 'rgba(200, 200, 200, 0.3)')
                      : 'transparent',
                    boxShadow: hoveredProject?.id === project.id 
                      ? `0 4px 20px ${glowColors[project.id] || 'rgba(99, 102, 241, 0.15)'}` 
                      : 'none'
                  }}
                >
                  {/* Year on first line */}
                  <span className={`relative z-10 text-[10px] font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {project.year}
                  </span>
                  {/* Project title on second line */}
                  <span className={`relative z-10 text-sm font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {project.title}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
          )}
        </div>

        {/* Mobile Modal Overlay - Card View */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              variants={modalOverlay}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleProjectClose();
                }
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Enhanced Close Button - Outside the card, at the top */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClose();
                }}
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                aria-label="Close"
                whileHover={closeButtonHover}
                whileTap={closeButtonTap}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="#ffffff" 
                  viewBox="0 0 24 24"
                  whileHover={iconHover}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              </motion.button>

              {/* Click Areas for Navigation - Left Side */}
              {currentProjectIndex > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalSwipeRight();
                  }}
                  className="absolute left-0 top-16 w-1/3 h-[calc(100%-4rem)] z-20 pointer-events-auto"
                  aria-label="Previous project"
                />
              )}

              {/* Click Areas for Navigation - Right Side */}
              {currentProjectIndex < projects.length - 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalSwipeLeft();
                  }}
                  className="absolute right-0 top-16 w-1/3 h-[calc(100%-4rem)] z-20 pointer-events-auto"
                  aria-label="Next project"
                />
              )}

              {/* Swipe Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-2">
                  {projects.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentProjectIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <motion.div
                className={`relative rounded-3xl shadow-2xl max-h-[85vh] w-full max-w-lg overflow-y-auto border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
                variants={mobileModalSlide}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                key={hoveredProject?.id}
              >

                {/* Project Content */}
                <div className="p-6 pt-2">
                  {/* Project Header */}
                  <div className="mb-6">
                    {/* Phase and Project Type Badges */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {hoveredProject.category && (
                        <div className={`px-2 py-1 rounded-full text-[9px] font-medium ${
                          theme === 'dark'
                            ? 'bg-gray-700 text-gray-200'
                            : 'bg-gray-200 text-gray-700'
                        }`}>
                          {hoveredProject.category}
                        </div>
                      )}
                      {hoveredProject.phase && (
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-[9px] font-semibold">
                          {hoveredProject.phase}
                        </div>
                      )}
                      {hoveredProject.projectType && (
                        <div className={`px-2 py-1 rounded-full text-[9px] font-medium border ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {hoveredProject.projectType}
                        </div>
                      )}
                      <div className={`px-2 py-1 rounded-full text-[9px] font-medium ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {hoveredProject.year}
                      </div>
                    </div>

                    <h2 className={`text-2xl font-bold mb-3 leading-tight ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {hoveredProject.title}
                    </h2>
                    <p className="text-sm text-accent font-medium mb-4">
                      {hoveredProject.role} • {hoveredProject.company}
                    </p>
                  </div>

                  {/* Project Image - Performance optimized for mobile view */}
                  {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
                    <div className="mb-6 flex justify-center">
                      {/* Detect if it's a mobile screenshot based on filename */}
                      {hoveredProject.imageUrl.includes('RCT_tara') || 
                       hoveredProject.imageUrl.includes('Rating System') || 
                       hoveredProject.imageUrl.includes('quizards') ? (
                        // Mobile screenshots - responsive sizing for better readability
                        <div className="max-w-[300px] sm:max-w-[350px] mx-auto">
                          <PerformanceOptimizedImage
                            src={hoveredProject.imageUrl}
                            alt={hoveredProject.title}
                            width={350}
                            height={600}
                            sizes="(max-width: 640px) 300px, (max-width: 768px) 350px, 400px"
                            quality={75}
                          />
                        </div>
                      ) : (
                        // Desktop/web screenshots - larger container
                        <div className="max-w-sm mx-auto">
                          <PerformanceOptimizedImage
                            src={hoveredProject.imageUrl}
                            alt={hoveredProject.title}
                            width={400}
                            height={250}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={75}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content Sections - Mobile Minimal */}
                  <div className="space-y-4">
                    
                    {/* Project Description - Only show if it doesn't contain tag names */}
                    {hoveredProject.description && !hoveredProject.description.includes('Digital Public Infrastructure') && !hoveredProject.description.includes('Feature Suit') && !hoveredProject.description.includes('Comprehensive Learning Management System') && (
                        <div className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.description}
                        </div>
                      )}

                    {/* Key Results - Mobile Card - Moved to top after description */}
                    {hoveredProject.keyResults && hoveredProject.keyResults.length > 0 && (
                      <div className={`p-4 rounded-lg shadow-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800/50 border border-gray-700' 
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <h3 className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>Key Results</h3>
                        <div className="space-y-3">
                          {hoveredProject.keyResults.map((keyResult, index) => (
                            <div key={index}>
                              <div className={`text-lg font-bold mb-1 ${
                                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
                              }`}>
                                {keyResult.value}
                              </div>
                              <div className={`text-xs font-medium mb-1 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {keyResult.label}
                              </div>
                                <div className={`text-xs ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {keyResult.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Situation */}
                    {hoveredProject.situation && (
                      <div>
                        <h3 className={`text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>Situation</h3>
                        <p className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {hoveredProject.situation}
                        </p>
                      </div>
                    )}

                    {/* Task */}
                    {hoveredProject.task && (
                      <div>
                        <h3 className={`text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>Task</h3>
                        <p className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {hoveredProject.task}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {hoveredProject.result && (
                      <div>
                        <h3 className={`text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>Result</h3>
                        <p className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {hoveredProject.result}
                        </p>
                      </div>
                    )}

                    {/* My Contributions */}
                    {hoveredProject.contributions && hoveredProject.contributions.length > 0 && (
                      <div>
                        <h3 className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>My Contribution</h3>
                        <ul className={`space-y-2 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {hoveredProject.contributions.slice(0, 3).map((contribution, index) => (
                            <li key={index} className="text-sm leading-relaxed flex items-start">
                              <span className="text-gray-500 mr-2 mt-1">•</span>
                              <span>{contribution.contribution}</span>
                            </li>
                          ))}
                          {hoveredProject.contributions.length > 3 && (
                            <li className="text-sm text-gray-500">
                              +{hoveredProject.contributions.length - 3} more contributions
                            </li>
                          )}
                        </ul>
                      </div>
                    )}


                    {/* Skills & Technologies - Mobile Card */}
                    {hoveredProject.tags && hoveredProject.tags.length > 0 && (
                      <div className={`p-4 rounded-lg shadow-sm ${
                        theme === 'dark'
                          ? 'bg-gray-800/50 border border-gray-700' 
                          : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <h3 className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                        }`}>Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {hoveredProject.tags.slice(0, 6).map((tag, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded-full ${
                                theme === 'dark'
                                ? 'bg-gray-700 text-gray-200' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {tag}
                            </span>
                          ))}
                          {hoveredProject.tags.length > 6 && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              theme === 'dark' 
                                ? 'bg-gray-700 text-gray-200' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              +{hoveredProject.tags.length - 6}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* URL CTAs - Mobile */}
                    <UrlCTAMultiple 
                      companyUrl={hoveredProject.companyUrl}
                      projectUrl={hoveredProject.projectUrl}
                      reportUrl={hoveredProject.reportUrl}
                      demoUrl={hoveredProject.demoUrl}
                      companyLabel={hoveredProject.companyLabel}
                      projectLabel={hoveredProject.projectLabel}
                      reportLabel={hoveredProject.reportLabel}
                      demoLabel={hoveredProject.demoLabel}
                      companyUrls={hoveredProject.companyUrls}
                      projectUrls={hoveredProject.projectUrls}
                      reportUrls={hoveredProject.reportUrls}
                      demoUrls={hoveredProject.demoUrls}
                      theme={theme}
                    />

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </ErrorBoundary>
  );
}
