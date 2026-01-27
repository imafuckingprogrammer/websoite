'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Random fonts for the easter egg (desktop only)
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

// Single letter component with hover effect (desktop only)
const HoverLetter: React.FC<{ char: string; darkMode: boolean; isMobile: boolean }> = ({ char, darkMode, isMobile }) => {
  const [font, setFont] = useState<string | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    const randomFont = randomFonts[Math.floor(Math.random() * randomFonts.length)];
    setFont(randomFont);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    setFont(null);
  }, []);

  if (char === ' ') return <span>&nbsp;</span>;

  return (
    <span
      className="inline-block cursor-default md:cursor-pointer transition-all duration-150"
      style={{
        fontFamily: font || 'inherit',
        color: darkMode ? '#ffffff' : '#000000',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {char}
    </span>
  );
};

// WAHT! with RGB effect - always active on mobile
const WahtText: React.FC<{ darkMode: boolean; isMobile: boolean }> = ({ darkMode, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const shouldAnimate = isMobile || isHovered;

  return (
    <motion.span
      className="inline-block cursor-pointer"
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
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

// Line component that renders letters with hover effect
const HeroLine: React.FC<{ text: string; darkMode: boolean; isMobile: boolean; includeWaht?: boolean }> = ({
  text, darkMode, isMobile, includeWaht = false
}) => {
  if (includeWaht) {
    return (
      <>
        {text.split('').map((char, i) => (
          <HoverLetter key={i} char={char} darkMode={darkMode} isMobile={isMobile} />
        ))}
        <WahtText darkMode={darkMode} isMobile={isMobile} />
      </>
    );
  }

  return (
    <>
      {text.split('').map((char, i) => (
        <HoverLetter key={i} char={char} darkMode={darkMode} isMobile={isMobile} />
      ))}
    </>
  );
};

const Hero: React.FC = () => {
  const { darkMode } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
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
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HeroLine text="Websites that" darkMode={darkMode} isMobile={isMobile} />
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HeroLine text="make people" darkMode={darkMode} isMobile={isMobile} />
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span className="block" variants={lineVariants}>
              <HeroLine text="say " darkMode={darkMode} isMobile={isMobile} includeWaht />
            </motion.span>
          </div>
        </motion.h1>
      </div>
    </section>
  );
};

export default Hero;
