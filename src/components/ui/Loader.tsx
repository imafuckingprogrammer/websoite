'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  const { darkMode } = useTheme();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (loading) {
      // ^ -> ^^ -> ^^^ -> ^ sequence
      const timings = [0, 250, 500, 750];
      const timers = timings.map((delay, index) =>
        setTimeout(() => setStage(index), delay)
      );
      return () => timers.forEach(timer => clearTimeout(timer));
    }
  }, [loading]);

  const getText = () => {
    switch(stage) {
      case 0: return '^';
      case 1: return '^^';
      case 2: return '^^^';
      case 3: return '^';
      default: return '^';
    }
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={`fixed inset-0 z-[60] flex items-center justify-center ${
            darkMode ? 'bg-neutral-950' : 'bg-cream-100'
          }`}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <motion.span
            key={stage}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: stage === 3 ? [1, 1.3, 1] : 1,
              opacity: 1,
            }}
            transition={{
              duration: stage === 3 ? 0.3 : 0.15,
              ease: stage === 3 ? [0.68, -0.55, 0.265, 1.55] : 'easeOut'
            }}
            className={`text-6xl md:text-8xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}
          >
            {getText()}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
