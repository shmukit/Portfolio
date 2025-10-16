"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedBackgroundProps {
  theme: 'light' | 'dark';
}

export default function AnimatedBackground({ theme }: AnimatedBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Enhanced base gradient layer */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900'
          : 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30'
      }`}></div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: theme === 'dark' ? 'overlay' : 'multiply'
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className={`absolute inset-0 opacity-[0.03] ${
          theme === 'dark' ? 'opacity-[0.05]' : 'opacity-[0.02]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
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
  );
}
