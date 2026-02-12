'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// "burn" with rainbow color cycling - always active
const BurnText: React.FC = () => {
  return (
    <motion.span
      className="inline-block"
      animate={{
        color: [
          '#ff0000', '#ff8000', '#ffff00', '#80ff00',
          '#00ff00', '#00ff80', '#00ffff', '#0080ff',
          '#0000ff', '#8000ff', '#ff00ff', '#ff0080', '#ff0000'
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      burn
    </motion.span>
  );
};

const Hero: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="home"
      className={`min-h-screen relative flex flex-col justify-center overflow-hidden ${
        darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'
      }`}
    >
      <div className="container-wide py-32 md:py-40 lg:py-48 relative z-10">
        {/* No animation - text renders immediately for LCP */}
        <h1 className="relative text-[clamp(3rem,13vw,11rem)] font-bold tracking-tighter leading-[0.9]">
          <span className="block">Websites that</span>
          <span className="block"><BurnText /> the</span>
          <span className="block">competition</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
