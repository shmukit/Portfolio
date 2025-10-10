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

// Hover animations
export const cardHover = {
  scale: 1.02,
  y: -2,
  transition: { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] as const }
};

export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] as const }
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

// Loading animations
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer: Variants = {
  animate: {
    backgroundPosition: ["-200% 0", "200% 0"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear"
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

// Breathing animation for selected/hovered pills
export const pillBreathe = {
  scale: [1, 1.02, 1],
  transition: {
    duration: 2.5,
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

// Modal overlay animations
export const modalOverlay: Variants = {
  hidden: { 
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
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

// Swipe animations for mobile cards
export const swipeCard: Variants = {
  initial: { x: 0, opacity: 1 },
  exit: {
    x: -300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

export const swipeContainer: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
