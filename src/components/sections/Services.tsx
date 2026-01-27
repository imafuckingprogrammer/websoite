'use client'

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedButton from '../ui/AnimatedButton';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: 'Web Design',
    description: 'Beautiful, functional websites that capture your brands essence and engage your audience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ['Responsive Design', 'UI/UX', 'Prototyping', 'Design Systems']
  },
  {
    id: 2,
    title: 'Development',
    description: 'High-performance web applications built with modern technologies and best practices.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    features: ['React/Next.js', 'TypeScript', 'APIs', 'Performance']
  },
  {
    id: 3,
    title: 'Branding',
    description: 'Distinctive brand identities that tell your story and connect with your audience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    features: ['Logo Design', 'Visual Identity', 'Brand Strategy', 'Guidelines']
  },
  {
    id: 4,
    title: 'SEO & Growth',
    description: 'Data-driven strategies to increase visibility and drive meaningful results.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    features: ['Technical SEO', 'Analytics', 'Content Strategy', 'Optimization']
  }
];

const RainbowPill: React.FC<{ text: string; shouldAnimate: boolean; index: number; darkMode: boolean }> = ({
  text, shouldAnimate, index, darkMode
}) => {
  const borderColors = [
    'rgba(255,0,0,0.7)', 'rgba(255,128,0,0.7)', 'rgba(255,255,0,0.7)', 'rgba(128,255,0,0.7)',
    'rgba(0,255,0,0.7)', 'rgba(0,255,128,0.7)', 'rgba(0,255,255,0.7)', 'rgba(0,128,255,0.7)',
    'rgba(0,0,255,0.7)', 'rgba(128,0,255,0.7)', 'rgba(255,0,255,0.7)', 'rgba(255,0,128,0.7)', 'rgba(255,0,0,0.7)'
  ];

  const bgColors = [
    'rgba(255,0,0,0.1)', 'rgba(255,128,0,0.1)', 'rgba(255,255,0,0.1)', 'rgba(128,255,0,0.1)',
    'rgba(0,255,0,0.1)', 'rgba(0,255,128,0.1)', 'rgba(0,255,255,0.1)', 'rgba(0,128,255,0.1)',
    'rgba(0,0,255,0.1)', 'rgba(128,0,255,0.1)', 'rgba(255,0,255,0.1)', 'rgba(255,0,128,0.1)', 'rgba(255,0,0,0.1)'
  ];

  const glowShadows = [
    '0 0 10px rgba(255,0,0,0.3)', '0 0 10px rgba(255,128,0,0.3)', '0 0 10px rgba(255,255,0,0.3)', '0 0 10px rgba(128,255,0,0.3)',
    '0 0 10px rgba(0,255,0,0.3)', '0 0 10px rgba(0,255,128,0.3)', '0 0 10px rgba(0,255,255,0.3)', '0 0 10px rgba(0,128,255,0.3)',
    '0 0 10px rgba(0,0,255,0.3)', '0 0 10px rgba(128,0,255,0.3)', '0 0 10px rgba(255,0,255,0.3)', '0 0 10px rgba(255,0,128,0.3)', '0 0 10px rgba(255,0,0,0.3)'
  ];

  return (
    <motion.span
      className={`px-3 py-1.5 rounded-full text-sm font-medium border ${darkMode ? 'text-white/80' : 'text-black/80'}`}
      animate={shouldAnimate ? {
        borderColor: borderColors,
        backgroundColor: bgColors,
        boxShadow: glowShadows
      } : {
        borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        boxShadow: 'none'
      }}
      transition={shouldAnimate ? {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
        delay: index * 0.1
      } : { duration: 0.3 }}
    >
      {text}
    </motion.span>
  );
};

const ServiceCard: React.FC<{ service: Service; index: number; isMobile: boolean }> = ({ service, index, isMobile }) => {
  const { darkMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

  const shouldAnimatePills = isMobile || hasBeenHovered;

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const contentVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: index * 0.15 + 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative p-8 md:p-10 rounded-2xl md:rounded-3xl cursor-pointer ${
        darkMode ? 'bg-neutral-900' : 'bg-white'
      } shadow-xl`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8 }}
      onMouseEnter={() => !isMobile && setHasBeenHovered(true)}
    >
      <motion.div variants={contentVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <motion.div
          variants={itemVariants}
          className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-6 ${
            darkMode ? 'bg-white/10' : 'bg-black/5'
          }`}
        >
          {service.icon}
        </motion.div>

        <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
          {service.title}
        </motion.h3>

        <motion.p variants={itemVariants} className={`text-base md:text-lg mb-6 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          {service.description}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {service.features.map((feature, featureIndex) => (
            <RainbowPill
              key={featureIndex}
              text={feature}
              shouldAnimate={shouldAnimatePills}
              index={featureIndex}
              darkMode={darkMode}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { darkMode } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const headerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section
      id="services"
      className={`py-24 md:py-32 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}
    >
      <div className="container-wide">
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-16 md:mb-24"
          variants={headerContainerVariants}
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
        >
          <div className="overflow-hidden">
            <motion.h2
              variants={headerItemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6"
            >
              Services
            </motion.h2>
          </div>
          <motion.p
            variants={headerItemVariants}
            className={`text-lg md:text-xl ${darkMode ? 'text-white/60' : 'text-black/60'} max-w-xl`}
          >
            We offer comprehensive digital solutions to help your business thrive in todays competitive landscape.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} isMobile={isMobile} />
          ))}
        </div>

        <div className="mt-16 md:mt-24 text-center">
          <AnimatedButton onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'auto' });
          }}>
            Start a Project
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Services;
