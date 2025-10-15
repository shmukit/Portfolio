'use client';

import { ErrorBoundary } from './components/ErrorBoundary';
import Image from 'next/image';
import { useProjects } from '../lib/hooks/useProjects';
import { Project } from '../types/project';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { 
  pillTap, 
  swipeCard,
  swipeContainer,
  pillBreathe
} from '../lib/utils/animations';

// Lazy load heavy components
const AnimatedCTA = lazy(() => import('./components/AnimatedCTA'));

export default function Home() {
  const { projects, loading, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPinned, setIsPinned] = useState(false); // Track if modal is pinned (clicked)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showPortfolio, setShowPortfolio] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Toggle portfolio visibility
  const togglePortfolio = () => {
    setShowPortfolio(!showPortfolio);
  };


  // Projects are already available from useProjects hook
  // Removed unused years and projectsByYear variables

  // Generate random gradient colors for breathing effect (white + color) - memoized
  const getRandomGradient = useCallback(() => {
    const gradients = [
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.2))',   // white to cyan
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(147, 51, 234, 0.2))',  // white to purple
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(59, 130, 246, 0.2))',  // white to blue
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(236, 72, 153, 0.2))'   // white to pink
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, []);

  // Handle project hover (desktop)
  const handleProjectHover = (project: Project | null) => {
    // Always allow showing new project on hover (closes previous)
    if (project) {
    setHoveredProject(project);
      setIsPinned(false); // Unpin when hovering over new project
      if (!glowColors[project.id]) {
      setGlowColors(prev => ({
        ...prev,
        [project.id]: getRandomGradient()
      }));
      }
    } else {
      // Only close on hover end if not pinned
      if (!isPinned) {
        setHoveredProject(null);
      }
    }
  };

  // Handle project selection (both desktop and mobile) - Pins the modal
  const handleProjectSelect = (project: Project) => {
    setHoveredProject(project);
    setIsPinned(true); // Pin the modal open
    const index = projects.findIndex(p => p.id === project.id);
    setCurrentProjectIndex(index);
    if (!glowColors[project.id]) {
      setGlowColors(prev => ({
        ...prev,
        [project.id]: getRandomGradient()
      }));
    }
  };

  // Handle close - Unpins and closes modal
  const handleProjectClose = () => {
    setHoveredProject(null);
    setIsPinned(false);
  };

  // Handle mobile swipe navigation
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

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
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
      <main className="min-h-screen relative" role="main">
        {/* Animated Background - Multiple Layers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* Base gradient layer */}
          <div className={`absolute inset-0 transition-colors duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
              : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
          }`}></div>
          
          {/* Optimized animated gradient blobs - cyan */}
          <motion.div
            className="absolute"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: theme === 'dark'
                ? "radial-gradient(ellipse 1200px 900px at 20% 30%, rgba(6, 182, 212, 0.35) 0%, rgba(6, 182, 212, 0.22) 25%, rgba(6, 182, 212, 0.14) 45%, rgba(6, 182, 212, 0.08) 65%, transparent 90%)"
                : "radial-gradient(ellipse 1200px 900px at 20% 30%, rgba(6, 182, 212, 0.20) 0%, rgba(6, 182, 212, 0.12) 25%, rgba(6, 182, 212, 0.06) 45%, rgba(6, 182, 212, 0.03) 65%, transparent 90%)",
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply',
              filter: 'blur(1px)'
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, 20, -15, 18, 0],
              y: [0, 15, -20, 25, 0],
              scale: [1, 1.02, 0.98, 1.04, 1]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Optimized animated gradient blobs - blue */}
          <motion.div
            className="absolute"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: theme === 'dark'
                ? "radial-gradient(ellipse 1000px 1100px at 80% 70%, rgba(59, 130, 246, 0.35) 0%, rgba(59, 130, 246, 0.22) 25%, rgba(59, 130, 246, 0.14) 45%, rgba(59, 130, 246, 0.08) 65%, transparent 90%)"
                : "radial-gradient(ellipse 1000px 1100px at 80% 70%, rgba(59, 130, 246, 0.20) 0%, rgba(59, 130, 246, 0.12) 25%, rgba(59, 130, 246, 0.06) 45%, rgba(59, 130, 246, 0.03) 65%, transparent 90%)",
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply',
              filter: 'blur(1px)'
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, -18, 25, -12, 0],
              y: [0, -22, 18, -28, 0],
              scale: [1, 0.98, 1.02, 0.96, 1]
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Optimized animated gradient blobs - purple */}
          <motion.div
            className="absolute"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: theme === 'dark'
                ? "radial-gradient(ellipse 900px 1000px at 60% 40%, rgba(147, 51, 234, 0.48) 0%, rgba(147, 51, 234, 0.32) 25%, rgba(147, 51, 234, 0.20) 45%, rgba(147, 51, 234, 0.12) 65%, transparent 90%)"
                : "radial-gradient(ellipse 900px 1000px at 60% 40%, rgba(147, 51, 234, 0.18) 0%, rgba(147, 51, 234, 0.10) 25%, rgba(147, 51, 234, 0.05) 45%, rgba(147, 51, 234, 0.03) 65%, transparent 90%)",
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply',
              filter: 'blur(1px)'
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, 15, -22, 20, 0],
              y: [0, -18, 15, -25, 0],
              scale: [1, 1.02, 0.98, 1.04, 1]
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          {/* Optimized animated gradient blobs - pink */}
          <motion.div
            className="absolute"
            style={{
              width: '120%',
              height: '120%',
              left: '-10%',
              top: '-10%',
              background: theme === 'dark'
                ? "radial-gradient(ellipse 1100px 800px at 40% 80%, rgba(236, 72, 153, 0.45) 0%, rgba(236, 72, 153, 0.30) 25%, rgba(236, 72, 153, 0.19) 45%, rgba(236, 72, 153, 0.11) 65%, transparent 90%)"
                : "radial-gradient(ellipse 1100px 800px at 40% 80%, rgba(236, 72, 153, 0.18) 0%, rgba(236, 72, 153, 0.10) 25%, rgba(236, 72, 153, 0.05) 45%, rgba(236, 72, 153, 0.03) 65%, transparent 90%)",
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply',
              filter: 'blur(1px)'
            }}
            animate={shouldReduceMotion ? {} : {
              x: [0, 16, -20, 22, 0],
              y: [0, -15, 12, -22, 0],
              scale: [1, 1.02, 0.98, 1.04, 1]
            }}
            transition={{
              duration: 33,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Theme Toggle Button - Smaller */}
        <motion.button
          onClick={toggleTheme}
          className={`fixed top-6 right-6 z-50 w-11 h-6 rounded-full flex items-center transition-all duration-500 shadow-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'bg-gradient-to-r from-yellow-400 to-orange-500'
          }`}
          aria-label="Toggle theme"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${
              theme === 'dark' ? 'bg-white' : 'bg-white'
            }`}
            animate={{
              x: theme === 'dark' ? 20 : 2,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          >
            <motion.div
              animate={{
                rotate: theme === 'dark' ? 180 : 0,
                scale: theme === 'dark' ? 0.8 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
            >
              {theme === 'light' ? (
                <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </motion.div>
          </motion.div>
        </motion.button>

        {/* Mobile: Static About Section at Top */}
        <div className={`lg:hidden bg-transparent p-6 relative z-10 ${!showPortfolio ? 'min-h-screen flex items-center justify-center' : ''}`}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Hi, <motion.span 
                role="img" 
                aria-label="waving hand"
                className="inline-block origin-[70%_70%]"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >👋🏼</motion.span> I am Mukit
            </h1>
            <p className={`text-sm leading-relaxed mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Entrepreneur & Philomath, learning by doing.
            </p>
            <p className={`text-sm leading-relaxed mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Product Ethos: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Data</span> (analysis), <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Decision</span> (strategy) & (service) <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Design</span>.
            </p>
            
            {/* Mobile CTA Buttons - Icons Only */}
            <div className="flex flex-wrap gap-6 lg:gap-8 pt-2">
              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="cv" 
                  label="📄" 
                  href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
                  theme={theme}
                />
              </Suspense>

              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="email" 
                  label="✉️" 
                  href="mailto:shazzadhossainmukit@gmail.com"
                  theme={theme}
                />
              </Suspense>

              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="linkedin" 
                  label="💼" 
                  href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
                  theme={theme}
                />
              </Suspense>

              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="github" 
                  label="⚡" 
                  href="https://github.com/shmukit"
                  theme={theme}
                />
              </Suspense>

              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="portfolio" 
                  label="🎯" 
                  href="#"
                  theme={theme}
                  onClick={togglePortfolio}
                />
              </Suspense>

              <Suspense fallback={<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />}>
                <AnimatedCTA 
                  type="tools" 
                  label="🛠️" 
                  href="#tools"
                  theme={theme}
                />
              </Suspense>
            </div>
          </motion.div>
        </div>


        {/* Desktop Layout - Scrollable Page with Fixed Center */}
        <div className="hidden lg:block relative z-10">
          {/* Main scrollable container */}
          <div className="flex">
            {/* Left Project Pane - Scrolls with page */}
            {showPortfolio && (
              <div className="w-80 z-30">
              <div className="pl-24 pr-4 py-8">
                {/* Project pills */}
                <div className="space-y-3">
                  {projects.map((project) => (
                    <motion.button
                    key={project.id} 
                      className={`w-full text-left px-4 py-2 rounded-2xl cursor-pointer flex flex-col relative overflow-hidden border backdrop-blur-md ${
                        theme === 'dark' ? 'text-white' : 'text-black'
                      }`}
                      onClick={() => handleProjectSelect(project)}
                    onHoverStart={() => handleProjectHover(project)}
                    onHoverEnd={() => handleProjectHover(null)}
                      whileTap={pillTap}
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
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-500'
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
                </div>
              </div>
            </div>
            )}

            {/* Right Content Area */}
            <div className={`flex-1 relative ${showPortfolio ? '' : 'flex justify-center'}`}>

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
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                  {/* Close Button */}
                  <button
                    onClick={handleProjectClose}
                    className={`absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                {/* Project Header */}
                <div className="mb-6 lg:mb-8">
                  {/* Phase and Project Type Badges */}
                  <div className="flex gap-3 mb-4">
                    {hoveredProject.phase && (
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {hoveredProject.phase}
                      </div>
                    )}
                    {hoveredProject.projectType && (
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                        {hoveredProject.projectType}
                      </div>
                    )}
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                  <p className="text-lg lg:text-xl text-accent font-medium mb-6">
                    {hoveredProject.role} • {hoveredProject.company}
                  </p>
                </div>

                {/* Project Image - full width, prominent with lazy loading */}
                {hoveredProject.imageUrl && (
                  <div className="w-full aspect-video lg:aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 lg:mb-8">
                    <Image
                      src={hoveredProject.imageUrl}
                      alt={hoveredProject.title}
                      width={1200}
                      height={750}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    {/* Situation */}
                    {hoveredProject.situation && (
                      <div>
                          <h3 className={`text-lg font-semibold mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Situation</h3>
                          <p className={`leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          {hoveredProject.situation}
                        </p>
                      </div>
                    )}

                    {/* Task */}
                    {hoveredProject.task && (
                      <div>
                          <h3 className={`text-lg font-semibold mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Task</h3>
                          <p className={`leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          {hoveredProject.task}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {hoveredProject.result && (
                      <div>
                          <h3 className={`text-lg font-semibold mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Result</h3>
                          <p className={`leading-relaxed ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                          {hoveredProject.result}
                        </p>
                      </div>
                    )}

                    {/* My Contributions */}
                    {hoveredProject.contributions && hoveredProject.contributions.length > 0 && (
                        <div className={`rounded-2xl p-6 ${
                          theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                        }`}>
                          <h3 className={`text-lg font-semibold mb-4 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>My Contribution</h3>
                        <ul className="space-y-2">
                          {hoveredProject.contributions.map((contribution: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Metrics and Tags */}
                  <div className="space-y-6">
                    
                    {/* Key Metrics */}
                    {hoveredProject.metrics && hoveredProject.metrics.length > 0 && (
                        <div className={`rounded-2xl p-6 border ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 border-gray-600'
                            : 'bg-white border-gray-200'
                        }`}>
                          <h3 className={`text-lg font-semibold mb-4 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Key Results</h3>
                        <div className="space-y-4">
                          {hoveredProject.metrics.map((metric: { value: string; label: string; description?: string }, idx: number) => (
                              <div key={idx} className={`border-b pb-4 last:border-b-0 last:pb-0 ${
                                theme === 'dark' ? 'border-gray-600' : 'border-gray-100'
                              }`}>
                                <div className={`text-2xl font-bold mb-1 ${
                                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>{metric.value}</div>
                                <div className={`text-sm font-medium mb-1 ${
                                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                                }`}>{metric.label}</div>
                              {metric.description && (
                                  <div className={`text-xs ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                  }`}>{metric.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {hoveredProject.tags && hoveredProject.tags.length > 0 && (
                        <div className={`rounded-2xl p-6 border ${
                          theme === 'dark'
                            ? 'bg-gray-700/50 border-gray-600'
                            : 'bg-white border-gray-200'
                        }`}>
                          <h3 className={`text-lg font-semibold mb-4 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {hoveredProject.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                                className={`px-3 py-2 text-sm rounded-lg font-medium border ${
                                  theme === 'dark'
                                    ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dashboard Link */}
                {hoveredProject.dashboardUrl && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <a
                      href={hoveredProject.dashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      View Dashboard
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </motion.div>
            ) : (
              /* Default Name/Title/CV Section */
                <div className="text-left space-y-4 lg:space-y-5 max-w-2xl">
                <div>
                    <h1 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                    Hi, <motion.span 
                      role="img" 
                      aria-label="waving hand"
                      className="inline-block origin-[70%_70%]"
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ 
                        duration: 2.5, 
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    >👋🏼</motion.span> I am Mukit
                  </h1>
                    <p className={`text-base lg:text-lg leading-relaxed mb-3 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    Entrepreneur & Philomath, learning by doing.
                  </p>
                    <p className={`text-base lg:text-lg leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                    Product Ethos: <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Data</span> (analysis), <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Decision</span> (strategy) & (service) <span className={`font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}`}>Design</span>.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-6 lg:gap-8 pt-4">
                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="cv" 
                      label="CV" 
                      href="https://drive.google.com/file/d/1kotdk1LONJx3ZYHZqkmIALWtZV7rRDlp/view?usp=sharing"
                      theme={theme}
                    />
                  </Suspense>

                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="email" 
                      label="Email" 
                      href="mailto:shazzadhossainmukit@gmail.com"
                      theme={theme}
                    />
                  </Suspense>

                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="linkedin" 
                      label="LinkedIn" 
                      href="https://www.linkedin.com/in/shazzad-hossain-mukit/"
                      theme={theme}
                    />
                  </Suspense>

                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="github" 
                      label="GitHub" 
                      href="https://github.com/shmukit"
                      theme={theme}
                    />
                  </Suspense>

                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="portfolio" 
                      label="Portfolio" 
                      href="#"
                      theme={theme}
                      onClick={togglePortfolio}
                    />
                  </Suspense>

                  <Suspense fallback={<div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />}>
                    <AnimatedCTA 
                      type="tools" 
                      label="Tools" 
                      href="#tools"
                      theme={theme}
                    />
                  </Suspense>
                </div>

                {/* Last Update */}
                  <div className={`text-xs pt-6 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                  Last update: Oct &apos;25
                </div>
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

        {/* Mobile Layout - Swipeable Cards */}
        <div className="lg:hidden py-8 px-4 relative z-10">
          {showPortfolio && (
            <motion.div 
              className="space-y-2 max-w-md mx-auto"
              variants={swipeContainer}
              initial="initial"
              animate="animate"
            >
              {projects.map((project) => (
              <motion.div
                key={project.id}
                className="relative"
                drag="x"
                dragConstraints={{ left: -100, right: 100 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 50) {
                    handleSwipeRight();
                  } else if (info.offset.x < -50) {
                    handleSwipeLeft();
                  }
                }}
                whileDrag={{ scale: 0.98 }}
                variants={swipeCard}
              >
                <motion.button
                  className={`w-full text-left px-4 py-2 rounded-2xl flex flex-col relative overflow-hidden border backdrop-blur-md ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  onClick={() => handleProjectSelect(project)}
                  whileTap={pillTap}
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
                  <span className={`relative z-10 text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-500'
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.48, ease: "easeOut" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleProjectClose();
                }
              }}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              onDragEnd={(e, info) => {
                if (info.offset.x > 50) {
                  handleModalSwipeRight();
                } else if (info.offset.x < -50) {
                  handleModalSwipeLeft();
                }
              }}
            >
              {/* Close Button - Outside the card, at the top */}
              <button
                onClick={handleProjectClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none">
                {/* Previous Button */}
                {currentProjectIndex > 0 && (
                  <motion.button
                    onClick={handleModalSwipeRight}
                    className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/80 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </motion.button>
                )}

                {/* Next Button */}
                {currentProjectIndex < projects.length - 1 && (
                  <motion.button
                    onClick={handleModalSwipeLeft}
                    className="w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg pointer-events-auto hover:bg-black/80 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                )}
              </div>

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
                <p className="text-white/70 text-xs text-center mt-2">Swipe to navigate</p>
              </div>

              <motion.div
                className={`relative rounded-3xl shadow-2xl max-h-[85vh] w-full max-w-lg overflow-y-auto border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                }`}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
                key={hoveredProject?.id}
              >

                {/* Project Content */}
                <div className="p-6 pt-2">
                  {/* Project Header */}
                  <div className="mb-6">
                    {/* Phase and Project Type Badges */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {hoveredProject.phase && (
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          {hoveredProject.phase}
                        </div>
                      )}
                      {hoveredProject.projectType && (
                        <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {hoveredProject.projectType}
                        </div>
                      )}
                      <div className={`px-4 py-2 rounded-full text-sm font-medium ${
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
                    <p className="text-lg text-accent font-medium mb-4">
                      {hoveredProject.role} • {hoveredProject.company}
                    </p>
                  </div>

                  {/* Project Image with lazy loading */}
                  {hoveredProject.imageUrl && (
                    <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}

                  {/* Content Sections */}
                  <div className="space-y-6">
                    {/* Situation */}
                    {hoveredProject.situation && (
                      <div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Situation</h3>
                        <p className={`leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.situation}
                        </p>
                      </div>
                    )}

                    {/* Task */}
                    {hoveredProject.task && (
                      <div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Task</h3>
                        <p className={`leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.task}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {hoveredProject.result && (
                      <div>
                        <h3 className={`text-lg font-semibold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Result</h3>
                        <p className={`leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.result}
                        </p>
                      </div>
                    )}

                    {/* Key Metrics */}
                    {hoveredProject.metrics && hoveredProject.metrics.length > 0 && (
                      <div className={`rounded-2xl p-6 border ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 border-gray-600'
                          : 'bg-white border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Key Results</h3>
                        <div className="space-y-4">
                          {hoveredProject.metrics.map((metric: { value: string; label: string; description?: string }, idx: number) => (
                            <div key={idx} className={`border-b pb-4 last:border-b-0 last:pb-0 ${
                              theme === 'dark' ? 'border-gray-600' : 'border-gray-100'
                            }`}>
                              <div className={`text-2xl font-bold mb-1 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-900'
                              }`}>{metric.value}</div>
                              <div className={`text-sm font-medium mb-1 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>{metric.label}</div>
                              {metric.description && (
                                <div className={`text-xs ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                }`}>{metric.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* My Contributions */}
                    {hoveredProject.contributions && hoveredProject.contributions.length > 0 && (
                      <div className={`rounded-2xl p-6 ${
                        theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>My Contribution</h3>
                        <ul className="space-y-2">
                          {hoveredProject.contributions.map((contribution: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {hoveredProject.tags && hoveredProject.tags.length > 0 && (
                      <div className={`rounded-2xl p-6 border ${
                        theme === 'dark'
                          ? 'bg-gray-700/50 border-gray-600'
                          : 'bg-white border-gray-200'
                      }`}>
                        <h3 className={`text-lg font-semibold mb-4 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {hoveredProject.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className={`px-3 py-2 text-sm rounded-lg font-medium border ${
                                theme === 'dark'
                                  ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                                  : 'bg-blue-50 text-blue-700 border-blue-200'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dashboard Link */}
                    {hoveredProject.dashboardUrl && (
                      <div className="pt-4">
                        <a
                          href={hoveredProject.dashboardUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium w-full justify-center"
                        >
                          View Dashboard
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
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
