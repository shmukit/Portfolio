'use client';

import { Project } from '../../types/project';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useCallback, useMemo, useEffect } from 'react';
import PerformanceOptimizedImage from './PerformanceOptimizedImage';
import AutoVideo from './AutoVideo';
import { 
  pillBreathe,
  modalOverlay,
  modalContent,
  mobileModalSlide,
  mobileModalSlideLeft,
  mobileModalSlideRight,
  buttonHover,
  buttonTap,
  iconHover,
  closeButtonHover,
  closeButtonTap
} from '../../lib/utils/animations';
import UrlCTAMultiple from './UrlCTAMultiple';
import { Suspense, lazy } from 'react';
import { isValidImageUrl } from '../../lib/utils/imageValidation';

const ProjectContent = lazy(() => import('./ProjectContent'));

interface PortfolioClientProps {
  projects: Project[];
  theme: string;
  showPortfolio: boolean;
}

export default function PortfolioClient({ projects, theme, showPortfolio }: PortfolioClientProps) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [glowColors, setGlowColors] = useState<Record<string, string>>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
  const shouldReduceMotion = useReducedMotion();

  const gradients = useMemo(() => [
    'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.2))',
    'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(147, 51, 234, 0.2))',
    'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(59, 130, 246, 0.2))',
    'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(236, 72, 153, 0.2))'
  ], []);

  const getRandomGradient = useCallback(() => {
    return gradients[Math.floor(Math.random() * gradients.length)];
  }, [gradients]);

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

  const handleProjectClose = useCallback(() => {
    setHoveredProject(null);
    setIsPinned(false);
    setSlideDirection('none');
  }, []);

  const handleModalSwipeLeft = useCallback(() => {
    if (currentProjectIndex < projects.length - 1) {
      setSlideDirection('left');
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
  }, [currentProjectIndex, projects, glowColors, getRandomGradient]);

  const handleModalSwipeRight = useCallback(() => {
    if (currentProjectIndex > 0) {
      setSlideDirection('right');
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
  }, [currentProjectIndex, projects, glowColors, getRandomGradient]);

  const minSwipeDistance = 60;
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

    if (absDistance > minSwipeDistance) {
      if (isLeftSwipe) {
        handleModalSwipeLeft();
      } else if (isRightSwipe) {
        handleModalSwipeRight();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Get the appropriate animation variant based on slide direction
  const getModalAnimation = () => {
    if (slideDirection === 'left') return mobileModalSlideLeft;
    if (slideDirection === 'right') return mobileModalSlideRight;
    return mobileModalSlide;
  };

  // Reset slide direction after animation completes
  useEffect(() => {
    if (slideDirection !== 'none') {
      const timer = setTimeout(() => {
        setSlideDirection('none');
      }, 300); // Reset after animation duration
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  return (
    <>
      {/* Desktop Project Pills */}
      {showPortfolio && (
        <div className="hidden lg:block w-80 z-30">
          <div className="pl-24 pr-4 py-8">
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Project Modal */}
      {hoveredProject && (
        <div className="hidden lg:flex fixed left-[352px] right-0 top-0 h-screen items-center justify-center pointer-events-none z-30">
          <div className="w-full max-w-5xl px-6 lg:px-12 pointer-events-auto">
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

              <div className="mb-6 lg:mb-8">
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

              {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
                <div className="mb-6 lg:mb-8 flex justify-center">
                  {hoveredProject.imageUrl.includes('RCT_tara') || 
                   hoveredProject.imageUrl.includes('Rating System') || 
                   hoveredProject.imageUrl.includes('quizards') ? (
                    <div className="max-w-[450px] mx-auto">
                      <PerformanceOptimizedImage
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={450}
                        height={750}
                        sizes="(max-width: 768px) 400px, (max-width: 1024px) 450px, 500px"
                        quality={60}
                        priority={true}
                      />
                    </div>
                  ) : hoveredProject.imageUrl.includes('.webm') || hoveredProject.imageUrl.includes('.mp4') ? (
                    <div className="w-full mx-auto max-w-[360px] sm:max-w-[390px]">
                      <AutoVideo
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={390}
                        height={640}
                        sizes="(max-width: 640px) 90vw, 390px"
                        priority={true}
                        poster={hoveredProject.videoPoster || '/images/projects/gamification-demo-poster.jpg'}
                        fallbackImage={hoveredProject.videoFallback || '/images/projects/gamification-financial-literacy.gif'}
                      />
                    </div>
                  ) : (
                    <div className="max-w-2xl mx-auto">
                      <PerformanceOptimizedImage
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={800}
                        height={500}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={60}
                      />
                    </div>
                  )}
                </div>
              )}

              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
                <ProjectContent project={hoveredProject} theme={theme} />
              </Suspense>
            </motion.div>
          </div>
        </div>
      )}

      {/* Mobile Project Cards */}
      <div className="lg:hidden py-8 px-4 relative z-10">
        {showPortfolio && (
          <div className="space-y-2 max-w-md mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="relative">
                <motion.button
                  className={`w-full text-left px-4 py-2 rounded-2xl flex flex-col relative overflow-hidden border backdrop-blur-md ${
                    theme === 'dark' ? 'text-white' : 'text-black'
                  }`}
                  onClick={() => handleProjectSelect(project)}
                  whileHover={undefined}
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
                  <span className={`relative z-10 text-[10px] font-medium mb-1 ${
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
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Modal */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-1"
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

            {currentProjectIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalSwipeRight();
                }}
                className="absolute left-0 top-16 w-1/4 h-[calc(100%-4rem)] z-20 pointer-events-auto"
                aria-label="Previous project"
              />
            )}

            {currentProjectIndex < projects.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleModalSwipeLeft();
                }}
                className="absolute right-0 top-16 w-1/4 h-[calc(100%-4rem)] z-20 pointer-events-auto"
                aria-label="Next project"
              />
            )}

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
              className={`relative rounded-3xl shadow-2xl max-h-[85vh] w-full max-w-[95vw] sm:max-w-lg overflow-y-auto border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700'
                  : 'bg-white border-gray-200'
              }`}
              variants={getModalAnimation()}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              key={hoveredProject?.id}
            >
              <div className="p-4 pt-2">
                <div className="mb-6">
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

                {isValidImageUrl(hoveredProject.imageUrl) && hoveredProject.imageUrl && (
                  <div className="mb-6 flex justify-center">
                    {hoveredProject.imageUrl.includes('RCT_tara') || 
                     hoveredProject.imageUrl.includes('Rating System') || 
                     hoveredProject.imageUrl.includes('quizards') ? (
                      <div className="w-[320px] max-w-full">
                        <PerformanceOptimizedImage
                          src={hoveredProject.imageUrl}
                          alt={hoveredProject.title}
                          width={320}
                          height={520}
                          sizes="(max-width: 768px) 320px, 320px"
                          quality={60}
                        />
                      </div>
                    ) : hoveredProject.imageUrl.includes('.webm') || hoveredProject.imageUrl.includes('.mp4') ? (
                      <div className="w-full mx-auto max-w-[200px] sm:max-w-[260px]">
                        <AutoVideo
                          src={hoveredProject.imageUrl}
                          alt={hoveredProject.title}
                          width={260}
                          height={160}
                          sizes="(max-width: 640px) 80vw, 260px"
                          priority={false}
                          poster={hoveredProject.videoPoster || '/images/projects/gamification-demo-poster.jpg'}
                          fallbackImage={hoveredProject.videoFallback || '/images/projects/gamification-financial-literacy.gif'}
                        />
                      </div>
                    ) : (
                      <PerformanceOptimizedImage
                        src={hoveredProject.imageUrl}
                        alt={hoveredProject.title}
                        width={450}
                        height={280}
                        sizes="(max-width: 768px) 90vw, 450px"
                        quality={60}
                      />
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {hoveredProject.description && !hoveredProject.description.includes('Digital Public Infrastructure') && !hoveredProject.description.includes('Feature Suit') && !hoveredProject.description.includes('Comprehensive Learning Management System') && (
                    <div className={`text-sm leading-relaxed ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {hoveredProject.description}
                    </div>
                  )}

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

                  {hoveredProject.collaborators && hoveredProject.collaborators.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-semibold mb-3 ${
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                      }`}>Collaborators</h3>
                      <div className="flex flex-wrap gap-2">
                        {hoveredProject.collaborators.map((collaborator, index) => (
                          <span key={collaborator.id}>
                            {collaborator.linkedinUrl ? (
                              <a
                                href={collaborator.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-sm font-medium underline hover:no-underline ${
                                  theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                                }`}
                              >
                                {collaborator.name}
                              </a>
                            ) : (
                              <span className={`text-sm font-medium ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                              }`}>
                                {collaborator.name}
                              </span>
                            )}
                            {hoveredProject.collaborators && index < hoveredProject.collaborators.length - 1 && (
                              <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>, </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

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
                    theme={theme as "light" | "dark"}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

