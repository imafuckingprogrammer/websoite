'use client'

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import TextReveal, { LineReveal } from '../ui/TextReveal';
import AnimatedButton from '../ui/AnimatedButton';
import confetti from 'canvas-confetti';

// Fire confetti with proper gravity physics
const fireConfetti = () => {
  const duration = 3000;
  const end = Date.now() + duration;

  const colors = ['#ff0000', '#ff8000', '#ffff00', '#00ff00', '#00ffff', '#0080ff', '#8000ff', '#ff00ff'];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
      gravity: 1.2,
      drift: 0,
      scalar: 1.2,
      ticks: 200
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
      gravity: 1.2,
      drift: 0,
      scalar: 1.2,
      ticks: 200
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  // Initial burst from top
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x: 0.5, y: 0 },
    colors: colors,
    gravity: 1.5,
    scalar: 1.5,
    ticks: 300
  });

  frame();
};

// Innovation Card - static, non-interactive
const InnovationCard: React.FC<{ darkMode: boolean; isInView: boolean; index: number }> = ({ darkMode, isInView, index }) => {
  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <h4 className="text-xl md:text-2xl font-bold mb-4">Innovation</h4>
      <p className={`text-base ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
        We push boundaries and explore new possibilities in design and technology.
      </p>
    </motion.div>
  );
};

// Excellence Card - static, no tooltip
const ExcellenceCard: React.FC<{ darkMode: boolean; isInView: boolean; index: number }> = ({ darkMode, isInView, index }) => {
  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <h4 className="text-xl md:text-2xl font-bold mb-4">Excellence</h4>
      <p className={`text-base ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
        We hold ourselves to the highest standards in everything we create.
      </p>
    </motion.div>
  );
};

// Party Card - confetti on click with 8 second cooldown
const PartyCard: React.FC<{ darkMode: boolean; isInView: boolean; index: number }> = ({ darkMode, isInView, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const handleParty = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cooldown) return;

    fireConfetti();
    setCooldown(true);
    setTimeout(() => setCooldown(false), 8000);
  };

  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-xl relative cursor-pointer ${darkMode ? 'bg-neutral-900' : 'bg-white'} ${cooldown ? 'opacity-70' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: cooldown ? 0 : -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleParty}
    >
      <h4 className="text-xl md:text-2xl font-bold mb-4">Party</h4>
      <p className={`text-base ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
        We always party.
      </p>

      {/* Party button - positioned absolutely on the right, doesn't affect layout */}
      <AnimatePresence>
        {isHovered && !cooldown && (
          <motion.button
            className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium ${
              darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleParty}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            party
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile indicator */}
      {!cooldown && (
        <div className={`md:hidden absolute top-2 right-2 px-2 py-1 rounded text-xs ${
          darkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'
        }`}>
          tap me
        </div>
      )}

      {/* Desktop indicator */}
      {!cooldown && (
        <div className={`hidden md:block absolute top-2 right-2 px-2 py-1 rounded text-xs ${
          darkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'
        }`}>
          click me
        </div>
      )}

      {/* Cooldown indicator */}
      {cooldown && (
        <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${
          darkMode ? 'bg-white/10 text-white/60' : 'bg-black/10 text-black/60'
        }`}>
          wait...
        </div>
      )}
    </motion.div>
  );
};

const About: React.FC = () => {
  const { darkMode } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isImagesInView = useInView(imagesRef, { once: true, margin: "-100px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className={`py-24 md:py-32 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}
    >
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Crafting digital
            <br />
            experiences
          </h2>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-white/60' : 'text-black/60'} max-w-xl`}>
            We're a passionate team of students building the future of web design and development.
          </p>
        </motion.div>

        {/* Images - Smaller */}
        <motion.div
          ref={imagesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isImagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] shadow-xl">
            <img
              src="/images/about/about01.jpg"
              alt="Team collaboration"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] md:mt-12 shadow-xl">
            <img
              src="/images/about/photo-1522071820081-009f0129c71c.avif"
              alt="Creative workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Story - Fixed paragraph layout */}
        <motion.div
          ref={storyRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <LineReveal
              lines={['Our Story']}
              lineClassName="text-2xl md:text-3xl font-bold tracking-tight"
              className="mb-6"
            />
            <TextReveal
              className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-white/70' : 'text-black/70'}`}
              delay={0.2}
            >
              Founded recently by a group of ambitious students, Caret Design is our platform to explore design and technology. We believe great design should be accessible to everyone, and we're excited to bring our fresh perspective to every project.
            </TextReveal>
          </div>
          <div>
            <LineReveal
              lines={['Our Approach']}
              lineClassName="text-2xl md:text-3xl font-bold tracking-tight"
              className="mb-6"
            />
            <TextReveal
              className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-white/70' : 'text-black/70'}`}
              delay={0.2}
            >
              As a student startup, we're on a journey of discovery and growth. We might be new, but we bring enthusiasm, creativity, and a willingness to push boundaries. Every project is an opportunity to learn and innovate together.
            </TextReveal>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className={`grid grid-cols-3 gap-8 md:gap-12 mb-20 md:mb-32 pb-20 md:pb-32 border-b ${darkMode ? 'border-white/10' : 'border-black/10'}`}
          initial={{ opacity: 0, y: 40 }}
          animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          {[
            { number: '10+', label: 'Projects' },
            { number: '4', label: 'Team Members' },
            { number: '2', label: 'Years Experience' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight">{stat.number}</h3>
              <p className={`text-sm md:text-base ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          ref={valuesRef}
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 40 }}
          animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 md:mb-16">
            Our Principles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <InnovationCard darkMode={darkMode} isInView={isValuesInView} index={0} />
            <ExcellenceCard darkMode={darkMode} isInView={isValuesInView} index={1} />
            <PartyCard darkMode={darkMode} isInView={isValuesInView} index={2} />
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <AnimatedButton onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'auto' });
            }
          }}>
            Get in Touch
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default About;
