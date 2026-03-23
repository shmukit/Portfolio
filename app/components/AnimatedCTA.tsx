"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const iconsMap: Record<string, string[]> = {
  cv: ["📄", "📄", "📄", "📑"],
  email: ["✉️", "💌", "📧"],
  linkedin: ["⭐", "✨", "🌟", "💫"],
  github: ["0", "1", "0", "1", "0"],
  portfolio: ["💼", "🎯", "🚀", "⚡"],
  tools: ["🛠️", "✏️", "📏", "🔧"],
  failures: ["❌", "⚠️", "💥", "🔄"],
  invitations: ["🎤", "📢", "🎙️", "📽️"],
  deepdives: ["🔍", "🧠", "📊", "🗂️"],
};

interface AnimatedCTAProps {
  type: keyof typeof iconsMap;
  label: string;
  href: string;
  theme?: 'light' | 'dark';
  onClick?: () => void;
  hasAnimated?: boolean;
}

export default function AnimatedCTA({ type, label, href, theme = 'light', onClick, hasAnimated = false }: AnimatedCTAProps) {
  const [hovered, setHovered] = useState(false);
  const [showEmailTooltip, setShowEmailTooltip] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const items = iconsMap[type] || [];
  const emailAddresses = ["shazzadhossainmukit@gmail.com", "mukit@moncho.ai"];

  const copyEmail = async (emailAddress: string) => {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailAddress);
        copied = true;
      }
    } catch {
      copied = false;
    }

    if (!copied) {
      const textArea = document.createElement('textarea');
      textArea.value = emailAddress;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    if (copied) {
      setCopiedEmail(emailAddress);
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
      copyResetTimeoutRef.current = setTimeout(() => {
        setCopiedEmail(null);
      }, 1800);
    }
  };

  useEffect(() => {
    if (!showEmailTooltip) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowEmailTooltip(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowEmailTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showEmailTooltip]);

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <motion.a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={(e) => {
          if (type === 'email') {
            e.preventDefault();
            setShowEmailTooltip((prev) => !prev);
            return;
          }

          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        aria-label={type === 'email' ? 'Open email copy tooltip' : undefined}
        aria-expanded={type === 'email' ? showEmailTooltip : undefined}
        aria-haspopup={type === 'email' ? 'dialog' : undefined}
        className={`group relative text-sm font-medium transition-all duration-150 inline-flex items-center ${
          theme === 'dark'
            ? 'text-gray-200 hover:text-white'
            : 'text-gray-700 hover:text-gray-900'
        }`}
        whileHover={{ 
          scale: 1.02,
          y: -2
        }}
        whileTap={{ scale: 0.98 }}
        initial={hasAnimated ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {label}
      </motion.a>

      {type === 'email' && showEmailTooltip && (
        <div
          ref={tooltipRef}
          role="dialog"
          aria-label="Email address and copy action"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            minWidth: '290px',
            backgroundColor: '#1e293b',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '12px 14px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.45)',
          }}
        >
          {/* downward CSS-triangle tail */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid #1e293b',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {emailAddresses.map((emailAddress) => (
              <div key={emailAddress} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#f1f5f9', whiteSpace: 'nowrap' }}>{emailAddress}</span>
                <button
                  type="button"
                  onClick={() => copyEmail(emailAddress)}
                  aria-label={`Copy ${emailAddress}`}
                  style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: copiedEmail === emailAddress ? '#15803d' : '#334155',
                    color: '#f1f5f9',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.18)',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {copiedEmail === emailAddress ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M4 10.5L8 14.5L16 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span role="status">Copied</span>
                    </>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {hovered &&
          items.map((icon, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1, rotate: 0, x: 0 }}
              animate={{
                y: [0, -40 - Math.random() * 30],
                x: [(i - items.length / 2) * 10, (i - items.length / 2) * 15 + (Math.random() - 0.5) * 20],
                opacity: [1, 0.8, 0],
                rotate: [0, (Math.random() - 0.5) * 60],
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 1 + Math.random() * 0.5, 
                ease: "easeOut",
                delay: i * 0.05
              }}
              className="absolute left-1/2 top-0 text-base pointer-events-none select-none z-50"
              style={{
                transform: `translateX(-50%)`,
              }}
            >
              {icon}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

