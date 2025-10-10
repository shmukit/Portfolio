'use client';

import { ErrorBoundary } from './components/ErrorBoundary';
import Image from 'next/image';
import { useProjects } from '../lib/hooks/useProjects';
import { usePanelState } from '../lib/hooks/usePanelState';
import { Project } from '../types/project';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  pillHover, 
  pillTap, 
  pillContainer, 
  pillItem,
  modalOverlay,
  modalContent,
  breathe,
  swipeCard,
  swipeContainer,
  pillBreathe
} from '../lib/utils/animations';

export default function Home() {
  const { projects, loading, error } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPinned, setIsPinned] = useState(false); // Track if modal is pinned (clicked)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});


  // Get unique years for sidebar
  const years = Array.from(new Set(projects.map(p => p.year))).sort((a, b) => b - a);

  // Group projects by year
  const projectsByYear = projects.reduce((acc, project) => {
    if (!acc[project.year]) {
      acc[project.year] = [];
    }
    acc[project.year].push(project);
    return acc;
  }, {} as Record<number, Project[]>);

  // Generate random gradient colors for breathing effect (white + color)
  const getRandomGradient = () => {
    const gradients = [
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.2))',   // white to cyan
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(147, 51, 234, 0.2))',  // white to purple
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(59, 130, 246, 0.2))',  // white to blue
      'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(236, 72, 153, 0.2))'   // white to pink
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

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
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background - Multiple Layers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-blue-50/30 to-pink-50/30"></div>
          
          {/* Animated gradient blobs - very subtle movement */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)"
            }}
            animate={{
              x: [0, 10, 0],
              y: [0, 5, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            }}
            animate={{
              x: [0, -8, 0],
              y: [0, -5, 0],
              scale: [1, 1.03, 1]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)"
            }}
            animate={{
              x: [0, 5, 0],
              y: [0, -3, 0],
              scale: [1, 1.01, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Mobile: Static About Section at Top */}
        <div className="lg:hidden bg-transparent p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Your Name
            </h1>
            <p className="text-sm text-accent font-medium">
              Product Designer & Developer
            </p>
          </motion.div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-10 min-h-screen">
          {/* Column 1 - Empty spacer */}
          <div className="hidden lg:block"></div>

          {/* Columns 2-3 - Direct Project Navigation with Enhanced Interactions */}
          <motion.div 
            className="lg:col-span-2 lg:flex lg:items-start lg:justify-center lg:h-screen lg:py-8 lg:overflow-y-auto lg:scrollbar-hide"
            variants={pillContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-2 lg:py-4 w-full px-4">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="relative"
                  variants={pillItem}
                >
                  {/* Project Pill Button with Enhanced Interactions */}
                  <motion.button
                    className="w-full text-left px-6 py-3 rounded-3xl cursor-pointer flex flex-col relative overflow-hidden border backdrop-blur-md text-black"
                    onClick={() => handleProjectSelect(project)}
                    onHoverStart={() => handleProjectHover(project)}
                    onHoverEnd={() => handleProjectHover(null)}
                    whileTap={pillTap}
                    animate={hoveredProject?.id === project.id ? "breathing" : "idle"}
                    variants={{
                      breathing: pillBreathe,
                      idle: {}
                    }}
                    style={{
                      background: hoveredProject?.id === project.id 
                        ? glowColors[project.id] || 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))'
                        : 'transparent',
                      borderColor: hoveredProject?.id === project.id 
                        ? 'rgba(200, 200, 200, 0.3)'
                        : 'transparent',
                      boxShadow: hoveredProject?.id === project.id 
                        ? '0 4px 20px rgba(99, 102, 241, 0.2)' 
                        : 'none'
                    }}
                  >
                    {/* Year on first line */}
                    <span className="relative z-10 text-sm font-medium text-gray-500 mb-1">
                      {project.year}
                    </span>
                    {/* Project title on second line */}
                    <span className="relative z-10 text-base font-medium text-gray-900">
                      {project.title}
                    </span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columns 4-8 - Central Content Area (Conditional) */}
          <div className="lg:col-span-5 flex items-center justify-center h-screen px-6 lg:px-12 py-16 relative overflow-y-auto scrollbar-hide">
            {hoveredProject ? (
              /* Project Detail Modal Content */
              <motion.div 
                className="w-full max-w-7xl max-h-full overflow-y-auto scrollbar-hide bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 relative"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Close Button */}
                <button
                  onClick={handleProjectClose}
                  className="absolute top-6 right-6 z-20 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                        {hoveredProject.projectType}
                      </div>
                    )}
                    <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                      {hoveredProject.year}
                    </div>
                  </div>

                  <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {hoveredProject.title}
                  </h2>
                  <p className="text-lg lg:text-xl text-accent font-medium mb-6">
                    {hoveredProject.role} • {hoveredProject.company}
                  </p>
                </div>

                {/* Project Image - full width, prominent */}
                {hoveredProject.imageUrl && (
                  <div className="w-full aspect-video lg:aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 lg:mb-8">
                    <Image
                      src={hoveredProject.imageUrl}
                      alt={hoveredProject.title}
                      width={1200}
                      height={750}
                      className="w-full h-full object-cover"
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
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Situation</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.situation}
                        </p>
                      </div>
                    )}

                    {/* Task */}
                    {hoveredProject.task && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Task</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.task}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {hoveredProject.result && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Result</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.result}
                        </p>
                      </div>
                    )}

                    {/* My Contributions */}
                    {hoveredProject.contributions && hoveredProject.contributions.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Contribution</h3>
                        <ul className="space-y-2">
                          {hoveredProject.contributions.map((contribution: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{contribution}</span>
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
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h3>
                        <div className="space-y-4">
                          {hoveredProject.metrics.map((metric: any, idx: number) => (
                            <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                              <div className="text-sm font-medium text-gray-700 mb-1">{metric.label}</div>
                              {metric.description && (
                                <div className="text-xs text-gray-500">{metric.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {hoveredProject.tags && hoveredProject.tags.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {hoveredProject.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium border border-blue-200"
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
              <div className="text-center space-y-6 lg:space-y-8 max-w-2xl">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 lg:mb-5">
                    Your Name
                  </h1>
                  <p className="text-xl lg:text-2xl text-accent font-medium mb-3">
                    Product Designer & Developer
                  </p>
                  <p className="text-gray-600 text-lg lg:text-xl leading-relaxed">
                    Passionate about creating meaningful digital experiences
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-3 lg:gap-4 justify-center pt-4">
                  <a
                    href="#"
                    className="px-6 lg:px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all hover:shadow-lg text-base"
                  >
                    About / CV
                  </a>
                  <a
                    href="mailto:your.email@example.com"
                    className="px-6 lg:px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-base"
                  >
                    Email
                  </a>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 lg:px-8 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-all text-base"
                  >
                    LinkedIn
                  </a>
                </div>

                {/* Last Update */}
                <div className="text-sm text-gray-500 pt-8">
                  Last update: Aug &apos;22
                </div>
              </div>
            )}
          </div>

          {/* Columns 9-10 - Empty spacers */}
          <div className="lg:col-span-2 hidden lg:block"></div>
        </div>

        {/* Mobile Layout - Swipeable Cards */}
        <div className="lg:hidden py-8 px-4">
          <motion.div 
            className="space-y-2 max-w-md mx-auto"
            variants={swipeContainer}
            initial="initial"
            animate="animate"
          >
            {projects.map((project, index) => (
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
                  className="w-full text-left px-6 py-3 rounded-3xl flex flex-col relative overflow-hidden border backdrop-blur-md text-black"
                  onClick={() => handleProjectSelect(project)}
                  whileTap={pillTap}
                  style={{
                    background: hoveredProject?.id === project.id 
                      ? glowColors[project.id] || 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(99, 102, 241, 0.2))'
                      : 'transparent',
                    borderColor: hoveredProject?.id === project.id 
                      ? 'rgba(200, 200, 200, 0.3)'
                      : 'transparent',
                    boxShadow: hoveredProject?.id === project.id 
                      ? `0 4px 20px ${glowColors[project.id] || 'rgba(99, 102, 241, 0.15)'}` 
                      : 'none'
                  }}
                >
                  {/* Year on first line */}
                  <span className="relative z-10 text-sm font-medium text-gray-500 mb-1">
                    {project.year}
                  </span>
                  {/* Project title on second line */}
                  <span className="relative z-10 text-base font-medium text-gray-900">
                    {project.title}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Modal Overlay - Card View */}
        <AnimatePresence>
          {hoveredProject && (
            <motion.div
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  handleProjectClose();
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

              <motion.div
                className="relative bg-white border border-gray-200 rounded-3xl shadow-2xl max-h-[85vh] w-full max-w-lg overflow-y-auto"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
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
                        <div className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                          {hoveredProject.projectType}
                        </div>
                      )}
                      <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                        {hoveredProject.year}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                      {hoveredProject.title}
                    </h2>
                    <p className="text-lg text-accent font-medium mb-4">
                      {hoveredProject.role} • {hoveredProject.company}
                    </p>
                  </div>

                  {/* Project Image */}
                  {hoveredProject.imageUrl && (
                    <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Content Sections */}
                  <div className="space-y-6">
                    {/* Situation */}
                    {hoveredProject.situation && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Situation</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.situation}
                        </p>
                      </div>
                    )}

                    {/* Task */}
                    {hoveredProject.task && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Task</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.task}
                        </p>
                      </div>
                    )}

                    {/* Result */}
                    {hoveredProject.result && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Result</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {hoveredProject.result}
                        </p>
                      </div>
                    )}

                    {/* Key Metrics */}
                    {hoveredProject.metrics && hoveredProject.metrics.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h3>
                        <div className="space-y-4">
                          {hoveredProject.metrics.map((metric: any, idx: number) => (
                            <div key={idx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                              <div className="text-sm font-medium text-gray-700 mb-1">{metric.label}</div>
                              {metric.description && (
                                <div className="text-xs text-gray-500">{metric.description}</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* My Contributions */}
                    {hoveredProject.contributions && hoveredProject.contributions.length > 0 && (
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Contribution</h3>
                        <ul className="space-y-2">
                          {hoveredProject.contributions.map((contribution: string, idx: number) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {hoveredProject.tags && hoveredProject.tags.length > 0 && (
                      <div className="bg-white border border-gray-200 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {hoveredProject.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-3 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium border border-blue-200"
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
      </div>
    </ErrorBoundary>
  );
}
