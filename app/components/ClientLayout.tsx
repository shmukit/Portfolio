'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from '../../lib/hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import { usePortfolio } from '../../lib/hooks/usePortfolio';
import MobileHeader from './MobileHeader';
import CTASection from './CTASection';
import PortfolioClient from './PortfolioClient';
import { Project } from '../../types/project';

const AnimatedBackground = dynamic(() => import('./AnimatedBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
});

interface ClientLayoutProps {
  projects: Project[];
}

export default function ClientLayout({ projects }: ClientLayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const { showPortfolio, togglePortfolio } = usePortfolio();

  return (
    <main className="min-h-screen relative" role="main">
      <Suspense fallback={<div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />}>
        <AnimatedBackground theme={theme} />
      </Suspense>
      
      <MobileHeader 
        theme={theme} 
        showPortfolio={showPortfolio} 
        onTogglePortfolio={togglePortfolio} 
      />

      <div className="hidden lg:block relative z-10">
        {/* Desktop-only theme toggle positioned within the header area */}
        <div className="absolute top-6 right-6 z-40">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
        <div className="flex">
          <PortfolioClient projects={projects} theme={theme} showPortfolio={showPortfolio} />

          <div className={`flex-1 relative ${!showPortfolio && 'flex justify-center'}`}>
            <div className={`${showPortfolio ? 'fixed left-[352px] right-0' : 'w-full'} top-0 h-screen flex items-center justify-center pointer-events-none z-10`}>
              <div className="w-full max-w-5xl px-6 lg:px-12 pointer-events-auto">
                <div className="space-y-8 lg:space-y-10 max-w-4xl">
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10">
                      <div className="mb-4">
                        <span className={`text-lg lg:text-xl font-medium ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          Hello there! I&apos;m
                        </span>
                      </div>

                      <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                          Mukit
                        </span>
                        <span 
                          role="img" 
                          aria-label="waving hand"
                          className="inline-block origin-[70%_70%] ml-3"
                          style={{ filter: 'hue-rotate(-30deg) saturate(0.7) brightness(1.1) sepia(0.3)' }}
                        >👋</span>
                      </h1>

                      <div className="space-y-4">
                        <p className={`text-xl lg:text-2xl leading-relaxed font-medium ${
                          theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          Builder & Philomath, learning by doing
                        </p>
                      </div>

                      <div className={`mt-8 p-6 rounded-2xl border backdrop-blur-sm ${
                          theme === 'dark' 
                            ? 'bg-gray-800/50 border-gray-700/50' 
                            : 'bg-white/50 border-gray-200/50'
                        }`}>
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
                      </div>
                    </div>
                  </div>

                  <CTASection 
                    theme={theme} 
                    onTogglePortfolio={togglePortfolio} 
                    hasAnimated={true}
                  />

                  <div className={`mt-12 pt-8 border-t ${
                      theme === 'dark' ? 'border-gray-600' : 'border-gray-200'
                    }`}>
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
                  </div>
                </div>
              </div>
            </div>

            <div className="min-h-screen">
              <div className="pt-screen pb-20">
                <div className="h-screen"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden relative z-10">
        <PortfolioClient projects={projects} theme={theme} showPortfolio={showPortfolio} />
      </div>
    </main>
  );
}

