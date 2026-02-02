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

// Word component with hover font effect (desktop) or auto-cycle (mobile/initial)
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

  useEffect(() => {
    if (isAutoActive) {
      const randomFont = randomFonts[Math.floor(Math.random() * randomFonts.length)];
      setFont(randomFont);
    } else if (!isAutoActive && isMobile !== null) {
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

// "hot" with RGB color cycling - always active on mobile, hover on desktop
const BurnText: React.FC<{ darkMode: boolean; isMobile: boolean | null }> = ({ darkMode, isMobile }) => {
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
      burn
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [initialCycleDone, setInitialCycleDone] = useState(false);

  const allWords = ['Websites', 'that', 'the', 'competition'];

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

    const startDelay = setTimeout(() => {
      setActiveWordIndex(0);
    }, 1000);

    return () => clearTimeout(startDelay);
  }, [initialCycleDone, isMobile]);

  // Handle the cycling logic
  useEffect(() => {
    if (activeWordIndex === -1 || isMobile === null) return;

    const isInitialCycle = !initialCycleDone;
    const interval = isInitialCycle ? 250 : 500;

    const timer = setTimeout(() => {
      const nextIndex = activeWordIndex + 1;

      if (nextIndex >= allWords.length) {
        if (!initialCycleDone) {
          setInitialCycleDone(true);
          if (!isMobile) {
            setActiveWordIndex(-1);
          } else {
            setActiveWordIndex(0);
          }
        } else {
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

          {/* Line 2: "burn the" */}
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <BurnText darkMode={darkMode} isMobile={isMobile} />
              <span>&nbsp;</span>
              <HoverWord word="the" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 2} />
            </motion.span>
          </div>

          {/* Line 3: "competition" */}
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HoverWord word="competition" darkMode={darkMode} isMobile={isMobile} isAutoActive={activeWordIndex === 3} />
            </motion.span>
          </div>
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
