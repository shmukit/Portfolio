'use client';

import { Project } from '../../types/project';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  modalOverlay,
  modalContent,
  iconHover,
  closeButtonHover,
  closeButtonTap
} from '../../lib/utils/animations';
import ProjectContent from './ProjectContent';
import ProjectPill from './portfolio/ProjectPill';
import ProjectMetaBadges from './portfolio/ProjectMetaBadges';
import ProjectMedia from './portfolio/ProjectMedia';
import MobileProjectModalBody from './portfolio/MobileProjectModalBody';

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

  const mobileModalVariants: Variants = {
    enter: (direction: 'left' | 'right' | 'none') => {
      if (direction === 'left') {
        return { x: '100%', y: 0, opacity: 0.85, scale: 0.98 };
      }
      if (direction === 'right') {
        return { x: '-100%', y: 0, opacity: 0.85, scale: 0.98 };
      }
      return { x: 0, y: '100%', opacity: 0, scale: 0.95 };
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.32,
        ease: [0.22, 0.61, 0.36, 1]
      }
    },
    exit: (direction: 'left' | 'right' | 'none') => {
      if (direction === 'left') {
        return {
          x: '-100%',
          y: 0,
          opacity: 0.85,
          scale: 0.98,
          transition: {
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1]
          }
        };
      }
      if (direction === 'right') {
        return {
          x: '100%',
          y: 0,
          opacity: 0.85,
          scale: 0.98,
          transition: {
            duration: 0.28,
            ease: [0.4, 0, 0.2, 1]
          }
        };
      }
      return {
        x: 0,
        y: '100%',
        opacity: 0,
        scale: 0.95,
        transition: {
          duration: 0.26,
          ease: [0.4, 0, 0.2, 1]
        }
      };
    }
  };

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
    setSlideDirection('none');
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

  // Reset slide direction after animation completes
  useEffect(() => {
    if (slideDirection !== 'none') {
      const timer = setTimeout(() => {
        setSlideDirection('none');
      }, 400); // Reset after animation duration
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
                <ProjectPill
                  key={project.id}
                  project={project}
                  theme={theme}
                  isActive={hoveredProject?.id === project.id}
                  glowColor={glowColors[project.id]}
                  isMobile={false}
                  shouldReduceMotion={!!shouldReduceMotion}
                  onClick={() => handleProjectSelect(project)}
                  onHoverStart={() => handleProjectHover(project)}
                  onHoverEnd={() => handleProjectHover(null)}
                />
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
                <ProjectMetaBadges project={hoveredProject} theme={theme} compact={false} />

                <h2 className={`text-2xl lg:text-4xl font-bold mb-3 leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {hoveredProject.title}
                </h2>
                <p className="text-base lg:text-lg text-accent font-medium mb-6">
                  {hoveredProject.role} • {hoveredProject.company}
                </p>
              </div>

              <ProjectMedia project={hoveredProject} isMobile={false} />

              <ProjectContent project={hoveredProject} theme={theme} />
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
                <ProjectPill
                  project={project}
                  theme={theme}
                  isActive={hoveredProject?.id === project.id}
                  glowColor={glowColors[project.id]}
                  isMobile={true}
                  onClick={() => handleProjectSelect(project)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Modal */}
      <AnimatePresence mode="wait" initial={false}>
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
              variants={mobileModalVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={slideDirection}
              layout
              onClick={(e) => e.stopPropagation()}
              key={hoveredProject?.id}
            >
              <MobileProjectModalBody project={hoveredProject} theme={theme} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

