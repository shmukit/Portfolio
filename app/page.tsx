'use client';

import { ErrorBoundary } from './components/ErrorBoundary';
import Image from 'next/image';
import { useProjects } from '../lib/hooks/useProjects';
import { Project } from '../types/project';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { 
  pillTap, 
  swipeCard,
  swipeContainer,
  pillBreathe
} from '../lib/utils/animations';
import { useTheme } from '../lib/hooks/useTheme';
import { usePortfolio } from '../lib/hooks/usePortfolio';
import ThemeToggle from './components/ThemeToggle';
import AnimatedBackground from './components/AnimatedBackground';
import MobileHeader from './components/MobileHeader';
import CTASection from './components/CTASection';
import UrlCTA from './components/UrlCTA';
import { isValidImageUrl } from '../lib/utils/imageValidation';


export default function Home() {
  const { projects, loading, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPinned, setIsPinned] = useState(false); // Track if modal is pinned (clicked)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const { theme, toggleTheme } = useTheme();
  const { showPortfolio, togglePortfolio } = usePortfolio();
  const shouldReduceMotion = useReducedMotion();


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

  // Touch event handlers for better mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

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
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleModalSwipeLeft();
    }
    if (isRightSwipe) {
      handleModalSwipeRight();
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
        {/* Animated Background */}
        <AnimatedBackground theme={theme} />
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
                <div className={`${showPortfolio ? 'fixed left-[352px] right-0' : 'w-full'} top-0 h-screen flex items-center justify-center pointer-events-none z-20`} style={{ willChange: 'transform' }}>
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

                {/* Project Image - Only show if image exists and is valid */}
                {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
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

                {/* Project Content - Two Column Layout */}
                <div className="flex gap-8 h-full">
                  
                  {/* Left Column - Project Details */}
                  <div className="flex-1 space-y-6">
                    
                    {/* Project Header */}
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
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
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {hoveredProject.phase}
                          </div>
                        )}
                        {hoveredProject.projectType && (
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {hoveredProject.projectType}
                          </div>
                        )}
                      </div>

                      {/* Project Description */}
                      {hoveredProject.description && (
                        <div className={`text-base leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.description}
                        </div>
                      )}
                    </div>

                    {/* Main Content Grid - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Left Column - Project Details */}
                      <div className="space-y-6">
                    
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
                              {hoveredProject.contributions.map((contribution, index) => (
                                <li key={index} className="text-sm leading-relaxed flex items-start">
                                  <span className="text-gray-500 mr-2 mt-1">•</span>
                                  <span>{contribution.contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                      {/* Right Column - Stats */}
                  <div className="space-y-6">
                    
                        {/* Key Results Card */}
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

                        {/* Skills & Technologies Card */}
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

                    {/* URL CTAs */}
                    <UrlCTA 
                      companyUrl={hoveredProject.companyUrl}
                      projectUrl={hoveredProject.projectUrl}
                      reportUrl={hoveredProject.reportUrl}
                      demoUrl={hoveredProject.demoUrl}
                      companyLabel={hoveredProject.companyLabel}
                      projectLabel={hoveredProject.projectLabel}
                      reportLabel={hoveredProject.reportLabel}
                      demoLabel={hoveredProject.demoLabel}
                      theme={theme}
                    />
                  </div>
                </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Default Name/Title/CV Section */
                <div className="space-y-4 lg:space-y-5 max-w-2xl">
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
                <CTASection 
                  theme={theme} 
                  onTogglePortfolio={togglePortfolio} 
                />

                {/* Last Update */}
                <div className={`text-xs pt-6 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Last update: Oct &apos;25
                </div>

                {/* Vibed while making this site */}
                <div className={`text-xs pt-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Vibed while making this site. <span role="img" aria-label="coffee">☕</span><span role="img" aria-label="headphones">🎧</span>
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
                  <div className="h-screen" style={{ willChange: 'auto' }}></div>
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
                dragElastic={0.1}
                dragMomentum={false}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 50) {
                    handleSwipeRight();
                  } else if (info.offset.x < -50) {
                    handleSwipeLeft();
                  }
                }}
                whileDrag={{ scale: 0.98 }}
                variants={swipeCard}
                style={{ willChange: shouldReduceMotion ? 'auto' : 'transform' }}
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
                  <span className={`relative z-10 text-[10px] font-medium mb-1 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
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
              transition={{ duration: 0.30, ease: "easeOut" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleProjectClose();
                }
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Close Button - Outside the card, at the top */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleProjectClose();
                }}
                className="absolute top-4 right-4 z-30 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

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
                <p className="text-white/70 text-xs text-center mt-2">Swipe or tap sides to navigate</p>
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
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-semibold">
                          {hoveredProject.phase}
                        </div>
                      )}
                      {hoveredProject.projectType && (
                        <div className={`px-3 py-1 rounded-full text-[10px] font-medium border ${
                          theme === 'dark'
                            ? 'bg-blue-900/30 text-blue-300 border-blue-700'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {hoveredProject.projectType}
                        </div>
                      )}
                      <div className={`px-3 py-1 rounded-full text-[10px] font-medium ${
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

                  {/* Project Image with lazy loading - Only show if image is valid */}
                  {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
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

                  {/* Content Sections - Mobile Minimal */}
                  <div className="space-y-4">
                    
                    {/* Project Header */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {hoveredProject.category && (
                          <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {hoveredProject.category}
                          </div>
                        )}
                        {hoveredProject.phase && (
                          <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {hoveredProject.phase}
                          </div>
                        )}
                        {hoveredProject.projectType && (
                          <div className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                            theme === 'dark' 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {hoveredProject.projectType}
                          </div>
                        )}
                      </div>

                      {/* Project Description */}
                      {hoveredProject.description && (
                        <div className={`text-sm leading-relaxed ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {hoveredProject.description}
                        </div>
                      )}
                    </div>

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

                    {/* Key Results - Mobile Card */}
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
                    <UrlCTA 
                      companyUrl={hoveredProject.companyUrl}
                      projectUrl={hoveredProject.projectUrl}
                      reportUrl={hoveredProject.reportUrl}
                      demoUrl={hoveredProject.demoUrl}
                      companyLabel={hoveredProject.companyLabel}
                      projectLabel={hoveredProject.projectLabel}
                      reportLabel={hoveredProject.reportLabel}
                      demoLabel={hoveredProject.demoLabel}
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
