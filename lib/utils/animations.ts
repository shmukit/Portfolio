import { Variants } from 'framer-motion';

// Animation utility functions for the portfolio
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRight: Variants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const slideOutRight: Variants = {
  visible: { x: 0, opacity: 1 },
  hidden: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export const backdropFade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

// Enhanced hover animations with micro-interactions
export const cardHover = {
  scale: 1.03,
  y: -4,
  boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)",
  transition: { 
    type: "spring" as const,
    stiffness: 400,
    damping: 25
  }
};

export const buttonHover = {
  scale: 1.05,
  y: -1,
  transition: { 
    type: "spring" as const,
    stiffness: 500,
    damping: 30
  }
};

// Micro-interactions for buttons
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1, ease: "easeOut" as const }
};

export const iconHover = {
  scale: 1.2,
  rotate: 5,
  transition: { 
    type: "spring" as const,
    stiffness: 400,
    damping: 20
  }
};

export const iconTap = {
  scale: 0.9,
  rotate: -5,
  transition: { duration: 0.1 }
};

// Enhanced pill interactions
export const pillHoverEnhanced = {
  scale: 1.08,
  x: 8,
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  boxShadow: "0 12px 35px -8px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.15)",
  transition: {
    type: "spring" as const,
    stiffness: 500,
    damping: 30
  }
};

// Close button micro-interactions
export const closeButtonHover = {
  scale: 1.1,
  rotate: 90,
  backgroundColor: "rgba(239, 68, 68, 0.1)",
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25
  }
};

export const closeButtonTap = {
  scale: 0.9,
  transition: { duration: 0.1 }
};

// Theme toggle micro-interactions
export const themeToggleHover = {
  scale: 1.1,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20
  }
};

// Link hover effects
export const linkHover = {
  scale: 1.05,
  y: -2,
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25
  }
};

// Page transition animations
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

// Enhanced loading animations
export const pulse: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Enhanced skeleton animations
export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const skeletonWave: Variants = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Content reveal animations
export const contentReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth reveal
    }
  }
};

// Staggered content reveal
export const staggeredReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const revealItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: "blur(5px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Loading spinner with spring physics
export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Bouncing dots loader
export const bouncingDots: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Utility function to check for reduced motion preference
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation variants that respect reduced motion
export const motionSafeFadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion() ? 0.01 : 0.6,
      ease: "easeOut"
    }
  }
};

// Project pill animations - beautiful hover interactions
export const pillHover = {
  scale: 1.05,
  x: 10,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(99, 102, 241, 0.1)",
  transition: {
    duration: 0.3,
    ease: "easeOut" as const
  }
};

export const pillTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

// Breathing animation for idle state
export const breathe: Variants = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Optimized breathing animation - reduced frequency and intensity
export const pillBreathe = {
  scale: [1, 1.01, 1],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

// Glowing effect for active/selected items
export const glow: Variants = {
  initial: {
    boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)"
  },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(99, 102, 241, 0.4)",
      "0 0 20px 10px rgba(99, 102, 241, 0)",
      "0 0 0 0 rgba(99, 102, 241, 0)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Optimized Modal overlay animations - removed expensive blur effects
export const modalOverlay: Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Optimized modal content - simplified animations for better performance
export const modalContent: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.98,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 10,
    transition: { 
      duration: 0.15,
      ease: "easeIn"
    }
  }
};

// Mobile-specific modal animations
export const mobileModalSlide: Variants = {
  hidden: { 
    y: "100%",
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 35
    }
  },
  exit: {
    y: "100%",
    opacity: 0,
    scale: 0.95,
    transition: { 
      duration: 0.2, 
      ease: "easeIn" 
    }
  }
};

// Mobile modal slide left/right animations for project navigation
export const mobileModalSlideLeft: Variants = {
  hidden: { 
    x: "100%",
    opacity: 0.8,
    scale: 0.98
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  exit: {
    x: "-100%",
    opacity: 0.8,
    scale: 0.98,
    transition: { 
      duration: 0.25, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const mobileModalSlideRight: Variants = {
  hidden: { 
    x: "-100%",
    opacity: 0.8,
    scale: 0.98
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  exit: {
    x: "100%",
    opacity: 0.8,
    scale: 0.98,
    transition: { 
      duration: 0.25, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Stagger children animation for project pills
export const pillContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const pillItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Enhanced swipe animations for mobile cards with better physics
export const swipeCard: Variants = {
  initial: { x: 0, opacity: 1, scale: 1 },
  swipeLeft: { 
    x: -100, 
    scale: 0.95,
    opacity: 0.7,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for natural feel
    }
  },
  swipeRight: { 
    x: 100, 
    scale: 0.95,
    opacity: 0.7,
    transition: { 
      duration: 0.3, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  snapBack: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

export const swipeContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Slightly faster stagger
      delayChildren: 0.1
    }
  }
};

// Enhanced mobile card drag feedback
export const mobileCardDrag = {
  drag: "x" as const,
  dragConstraints: { left: -120, right: 120 }, // Wider drag range
  dragElastic: 0.2, // More elastic feel
  dragMomentum: false,
  whileDrag: { 
    scale: 0.98,
    rotate: 2, // Slight rotation for natural feel
    transition: { duration: 0.1, ease: "easeOut" as const }
  }
};

// Mobile card hover states for better touch feedback
export const mobileCardHover = {
  scale: 1.02,
  y: -4,
  boxShadow: "0 8px 25px -8px rgba(0, 0, 0, 0.15)",
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 25
  }
};
