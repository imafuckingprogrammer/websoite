'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Random fonts for the easter egg
const randomFonts = [
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'Comic Sans MS, cursive',
  'Impact, sans-serif',
  'Trebuchet MS, sans-serif',
  'Verdana, sans-serif',
  'Palatino Linotype, serif',
  'Lucida Console, monospace',
  'Arial Black, sans-serif',
];

// Word component with hover effect (desktop) or auto-cycle (mobile/initial)
const HoverWord: React.FC<{
  word: string;
  darkMode: boolean;
  isMobile: boolean | null;
  isAutoActive?: boolean;
}> = ({ word, darkMode, isMobile, isAutoActive = false }) => {
  const [font, setFont] = useState<string | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (isMobile || isMobile === null) return;
    const randomFont = randomFonts[Math.floor(Math.random() * randomFonts.length)];
    setFont(randomFont);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || isMobile === null) return;
    setFont(null);
  }, [isMobile]);

  // For auto-cycle (initial load on both, continuous on mobile)
  useEffect(() => {
    if (isAutoActive) {
      const randomFont = randomFonts[Math.floor(Math.random() * randomFonts.length)];
      setFont(randomFont);
    } else if (!isAutoActive && isMobile !== null) {
      // Reset when not active (both mobile and desktop)
      setFont(null);
    }
  }, [isAutoActive, isMobile]);

  return (
    <span
      className="inline-block cursor-default md:cursor-pointer transition-all duration-200"
      style={{
        fontFamily: font || 'inherit',
        color: darkMode ? '#ffffff' : '#000000',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {word}
    </span>
  );
};

// WAHT! with RGB effect - always active on mobile
const WahtText: React.FC<{ darkMode: boolean; isMobile: boolean | null }> = ({ darkMode, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = isMobile === true || isHovered;

  return (
    <motion.span
      className="inline-block cursor-pointer"
      onMouseEnter={() => isMobile === false && setIsHovered(true)}
      onMouseLeave={() => isMobile === false && setIsHovered(false)}
      animate={shouldAnimate ? {
        color: [
          '#ff0000', '#ff8000', '#ffff00', '#80ff00',
          '#00ff00', '#00ff80', '#00ffff', '#0080ff',
          '#0000ff', '#8000ff', '#ff00ff', '#ff0080', '#ff0000'
        ]
      } : {
        color: darkMode ? '#ffffff' : '#000000'
      }}
      transition={shouldAnimate ? {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      } : {
        duration: 0.3
      }}
    >
      WAHT!
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null); // null = not yet determined
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [initialCycleDone, setInitialCycleDone] = useState(false);

  // All words in the hero (excluding WAHT! which has its own effect)
  const allWords = ['Websites', 'that', 'make', 'people', 'say'];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial fast cycle on load (both mobile and desktop)
  useEffect(() => {
    if (initialCycleDone || isMobile === null) return;

    // Start after a brief delay for the entrance animation
    const startDelay = setTimeout(() => {
      setActiveWordIndex(0);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, [initialCycleDone, isMobile]);

  // Handle the cycling logic
  useEffect(() => {
    if (activeWordIndex === -1 || isMobile === null) return;

    // During initial cycle: 250ms, after: 500ms (mobile only)
    const isInitialCycle = !initialCycleDone;
    const interval = isInitialCycle ? 250 : 500;

    const timer = setTimeout(() => {
      const nextIndex = activeWordIndex + 1;

      if (nextIndex >= allWords.length) {
        // Completed one cycle
        if (!initialCycleDone) {
          setInitialCycleDone(true);
          if (!isMobile) {
            // Desktop: stop cycling after initial
            setActiveWordIndex(-1);
          } else {
            // Mobile: continue cycling
            setActiveWordIndex(0);
          }
        } else {
          // Already past initial, loop (mobile only)
          setActiveWordIndex(0);
        }
      } else {
        setActiveWordIndex(nextIndex);
      }
    }, interval);

    return () => clearTimeout(timer);
  }, [activeWordIndex, initialCycleDone, isMobile, allWords.length]);

  // When resizing from mobile to desktop, stop cycling
  useEffect(() => {
    if (isMobile === false && initialCycleDone) {
      setActiveWordIndex(-1);
    }
    // When resizing from desktop to mobile, start cycling
    if (isMobile === true && initialCycleDone && activeWordIndex === -1) {
      setActiveWordIndex(0);
    }
  }, [isMobile, initialCycleDone, activeWordIndex]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  // Get the global index for a word based on line and word position
  const getGlobalIndex = (lineIndex: number, wordIndex: number) => {
    if (lineIndex === 0) return wordIndex; // "Websites" = 0, "that" = 1
    if (lineIndex === 1) return 2 + wordIndex; // "make" = 2, "people" = 3
    return 4 + wordIndex; // "say" = 4
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className={`min-h-screen relative flex flex-col justify-center overflow-hidden ${
        darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'
      }`}
    >
      <div className="container-wide py-32 md:py-40 lg:py-48 relative z-10">
        <motion.h1
          className="relative text-[clamp(3rem,13vw,11rem)] font-bold tracking-tighter leading-[0.9]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Line 1: "Websites that" */}
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HoverWord word="Websites" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 0} />
              <span>&nbsp;</span>
              <HoverWord word="that" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 1} />
            </motion.span>
          </div>

          {/* Line 2: "make people" */}
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HoverWord word="make" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 2} />
              <span>&nbsp;</span>
              <HoverWord word="people" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 3} />
            </motion.span>
          </div>

          {/* Line 3: "say WAHT!" */}
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HoverWord word="say" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 4} />
              <span>&nbsp;</span>
              <WahtText darkMode={darkMode} isMobile={isMobile} />
            </motion.span>
          </div>
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
