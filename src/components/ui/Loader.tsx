'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LoaderProps {
  onLoadComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadComplete }) => {
  const { darkMode } = useTheme();
  const [isExiting, setIsExiting] = useState(false);
  const [targetProgress, setTargetProgress] = useState(0);
  const hasCompletedRef = useRef(false);

  // Smooth spring animation for progress
  const springProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });

  // Transform spring value to clip-path percentage
  const clipPath = useTransform(springProgress, (value) => `inset(${100 - value}% 0 0 0)`);

  useEffect(() => {
    springProgress.set(targetProgress);
  }, [targetProgress, springProgress]);

  useEffect(() => {
    let resourcesLoaded = false;
    let fontsLoaded = false;

    const checkComplete = () => {
      if (resourcesLoaded && fontsLoaded && !hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setTargetProgress(100);

        // Brief pause to show 100%, then exit
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onLoadComplete, 300);
        }, 200);
      }
    };

    // Start progress
    setTargetProgress(20);

    // Track document ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTargetProgress(prev => Math.max(prev, 50));
      });
    } else {
      setTargetProgress(50);
    }

    // Track window load (images, scripts, etc.)
    if (document.readyState === 'complete') {
      setTargetProgress(80);
      resourcesLoaded = true;
      checkComplete();
    } else {
      window.addEventListener('load', () => {
        setTargetProgress(80);
        resourcesLoaded = true;
        checkComplete();
      });
    }

    // Track fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTargetProgress(prev => Math.max(prev, 90));
        fontsLoaded = true;
        checkComplete();
      });
    } else {
      fontsLoaded = true;
      checkComplete();
    }

    return () => {};
  }, [onLoadComplete, springProgress]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={`fixed inset-0 z-[100] flex items-center justify-center ${
            darkMode ? 'bg-neutral-950' : 'bg-cream-100'
          }`}
          exit={{
            y: '-100%',
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <motion.div
            className="relative text-[120px] md:text-[180px] font-bold leading-none select-none flex items-center justify-center"
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            exit={{
              scale: 0.8,
              opacity: 0,
              transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {/* Grey background caret */}
            <span className={`${darkMode ? 'text-white/20' : 'text-black/20'}`}>
              ^
            </span>

            {/* Rainbow fill caret - fills from bottom like water */}
            <motion.span
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              style={{ clipPath }}
              animate={{
                color: [
                  '#ff0000', '#ff8000', '#ffff00', '#80ff00',
                  '#00ff00', '#00ff80', '#00ffff', '#0080ff',
                  '#0000ff', '#8000ff', '#ff00ff', '#ff0080', '#ff0000'
                ]
              }}
              transition={{
                color: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear'
                }
              }}
            >
              ^
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
