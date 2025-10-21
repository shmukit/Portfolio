'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Failure } from '../../types/project';
import { useFailures } from '../../lib/hooks/useFailures';
import PerformanceOptimizedImage from './PerformanceOptimizedImage';
import AutoVideo from './AutoVideo';
import { 
  buttonTap,
  closeButtonHover,
  closeButtonTap,
  iconHover,
  modalContent,
  modalOverlay
} from '../../lib/utils/animations';

interface FailuresClientProps {
  theme: string;
}

// Returns true if the failure has enough content to show a modal
const hasDetails = (failure: Failure): boolean => {
  return !!(
    failure.description ||
    failure.imageUrl ||
    failure.situation ||
    failure.task ||
    failure.result ||
    (failure.keyResults && failure.keyResults.length > 0) ||
    (failure.tags && failure.tags.length > 0) ||
    (failure.contributions && failure.contributions.length > 0)
  );
};

export default function FailuresClient({ theme }: FailuresClientProps) {
  const { failures } = useFailures();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFailure, setSelectedFailure] = useState<Failure | null>(null);

  // Minimal icon representing "trial and error"
  const TrialIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
      <path d="M3 3h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M7 3v2a5 5 0 0 0 5 5v9a3 3 0 0 1-6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 3v2a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const openOverlay = useCallback(() => setIsOpen(true), []);
  const closeOverlay = useCallback(() => {
    setSelectedFailure(null);
    setIsOpen(false);
  }, []);

  // Open overlay automatically if there are failures (first time only on desktop could be intrusive; keep manual)
  useEffect(() => {
    // No-op; manual open via button
  }, []);

  const desktopList = useMemo(() => (
    <div className="hidden lg:block w-80 z-30">
      <div className="pl-24 pr-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Failures</div>
        </div>
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {failures.map((failure) => {
            const canOpen = hasDetails(failure);
            return (
              <motion.button
                key={failure.id}
                className={`w-full text-left px-4 py-2 rounded-2xl cursor-pointer flex flex-col relative overflow-hidden border backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'} ${!canOpen ? 'opacity-70 cursor-default' : ''}`}
                onClick={() => { if (canOpen) setSelectedFailure(failure); }}
                whileTap={buttonTap}
                style={{ background: 'transparent', borderColor: 'transparent' }}
              >
                <span className={`relative z-10 text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{failure.year}</span>
                <span className={`relative z-10 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{failure.title}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  ), [failures, theme]);

  const mobileList = useMemo(() => (
    <div className="lg:hidden py-4 px-3">
      <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Failures</div>
      <div className="space-y-2 max-w-md mx-auto">
        {failures.map((failure) => {
          const canOpen = hasDetails(failure);
          return (
            <div key={failure.id} className="relative">
              <motion.button
                className={`w-full text-left px-4 py-2 rounded-2xl flex flex-col relative overflow-hidden border backdrop-blur-md ${theme === 'dark' ? 'text-white' : 'text-black'} ${!canOpen ? 'opacity-70 cursor-default' : ''}`}
                onClick={() => { if (canOpen) setSelectedFailure(failure); }}
                whileTap={buttonTap}
                style={{ background: 'transparent', borderColor: 'transparent' }}
              >
                <span className={`relative z-10 text-[10px] font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{failure.year}</span>
                <span className={`relative z-10 text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{failure.title}</span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  ), [failures, theme]);

  return (
    <>
      {/* Trigger button - Desktop floating and Mobile in-footer button - HIDDEN FOR NOW */}
      <div className="fixed bottom-6 left-6 z-40 hidden">
        <motion.button
          onClick={openOverlay}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border ${theme === 'dark' ? 'bg-gray-800/80 border-gray-700 text-gray-200 hover:bg-gray-700' : 'bg-white/80 border-gray-200 text-gray-800 hover:bg-gray-100'}`}
          whileHover={{ scale: 1.03 }}
          whileTap={buttonTap}
          aria-label="Open failures"
        >
          {TrialIcon}
          <span className="text-sm font-semibold hidden sm:inline">Failures</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeOverlay();
              }
            }}
          >
            {/* Close button */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); closeOverlay(); }}
              className={`absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              aria-label="Close"
              whileHover={closeButtonHover}
              whileTap={closeButtonTap}
            >
              <motion.svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" whileHover={iconHover}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            </motion.button>

            {/* Overlay content: left list + detail panel */}
            <div className="flex w-full h-full">
              {/* Left list */}
              {desktopList}

              {/* Right details */}
              <div className="flex-1 flex items-center justify-center p-3 lg:p-6">
                <motion.div 
                  className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto scrollbar-hide rounded-3xl shadow-2xl p-5 lg:p-8 relative ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
                  variants={modalContent}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!selectedFailure && (
                    <div className={`text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="mb-2 font-semibold">Select a failure to view details</div>
                      {mobileList}
                    </div>
                  )}

                  {selectedFailure && (
                    <div>
                      <div className="mb-4">
                        <div className="flex gap-2 mb-3 flex-wrap">
                          <div className={`px-2 py-1 rounded-full text-[11px] font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{selectedFailure.year}</div>
                          {selectedFailure.category && (
                            <div className={`px-2 py-1 rounded-full text-[11px] font-medium ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-700'}`}>{selectedFailure.category}</div>
                          )}
                          {selectedFailure.phase && (
                            <div className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-2 py-1 rounded-full text-[11px] font-semibold">{selectedFailure.phase}</div>
                          )}
                        </div>
                        <h2 className={`text-2xl lg:text-3xl font-bold mb-2 leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{selectedFailure.title}</h2>
                        {(selectedFailure.role || selectedFailure.company) && (
                          <p className="text-sm text-accent font-medium mb-4">{selectedFailure.role}{selectedFailure.role && selectedFailure.company ? ' • ' : ''}{selectedFailure.company}</p>
                        )}
                      </div>

                      {/* Media */}
                      {(selectedFailure.imageUrl) && (
                        <div className="mb-5 flex justify-center">
                          {selectedFailure.imageUrl.includes('.webm') || selectedFailure.imageUrl.includes('.mp4') ? (
                            <div className="w-full mx-auto max-w-[360px] sm:max-w-[390px]">
                              <AutoVideo
                                src={selectedFailure.imageUrl}
                                alt={selectedFailure.title}
                                width={390}
                                height={640}
                                sizes="(max-width: 640px) 90vw, 390px"
                                priority={false}
                                poster={selectedFailure.videoPoster || '/images/projects/gamification-demo-poster.jpg'}
                                fallbackImage={selectedFailure.videoFallback || '/images/projects/gamification-financial-literacy.gif'}
                              />
                            </div>
                          ) : (
                            <div className="max-w-2xl mx-auto">
                              <PerformanceOptimizedImage
                                src={selectedFailure.imageUrl}
                                alt={selectedFailure.title}
                                width={800}
                                height={500}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={60}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-4">
                        {selectedFailure.description && (
                          <div className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{selectedFailure.description}</div>
                        )}

                        {selectedFailure.situation && (
                          <div>
                            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Situation</h3>
                            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{selectedFailure.situation}</p>
                          </div>
                        )}

                        {selectedFailure.task && (
                          <div>
                            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Task</h3>
                            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{selectedFailure.task}</p>
                          </div>
                        )}

                        {selectedFailure.result && (
                          <div>
                            <h3 className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Result</h3>
                            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{selectedFailure.result}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


