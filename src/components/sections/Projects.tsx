'use client'

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedButton from '../ui/AnimatedButton';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Digital Commerce Platform',
    category: 'E-Commerce',
    description: 'A modern e-commerce experience with seamless checkout and inventory management.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=1200&q=80',
    url: '#'
  },
  {
    id: 2,
    title: 'FinTech Dashboard',
    category: 'Finance',
    description: 'Real-time analytics and portfolio management for modern investors.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    url: '#'
  },
  {
    id: 3,
    title: 'Healthcare Portal',
    category: 'Healthcare',
    description: 'Patient-centered telemedicine platform with appointment scheduling and records.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    url: '#'
  },
  {
    id: 4,
    title: 'Restaurant Booking App',
    category: 'Hospitality',
    description: 'Streamlined reservations and table management for dining establishments.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    url: '#'
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { darkMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Later cards have higher z-index to stack on top
  const zIndex = index + 1;

  // Scale up as card comes into view
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      className="sticky top-24"
      style={{
        zIndex,
      }}
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block rounded-3xl overflow-hidden will-change-transform ${
          darkMode ? 'bg-neutral-900' : 'bg-white'
        }`}
        style={{
          scale,
          opacity,
          boxShadow: darkMode
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 12px 24px -8px rgba(0, 0, 0, 0.3)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 12px 24px -8px rgba(0, 0, 0, 0.08)'
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${darkMode ? 'bg-black/20' : 'bg-black/10'}`} />
          </div>

          {/* Content */}
          <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-4 w-fit ${
              darkMode ? 'bg-white/10 text-white/70' : 'bg-black/5 text-black/70'
            }`}>
              {project.category}
            </span>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {project.title}
            </h3>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 ${
              darkMode ? 'text-white/60' : 'text-black/60'
            }`}>
              {project.description}
            </p>

            <span className={`text-sm font-medium ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
              Visit Website
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const { darkMode } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      className={`py-24 md:py-32 ${
        darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'
      }`}
    >
      <div className="container-wide">
        {/* Section Header with stagger */}
        <motion.div
          ref={headerRef}
          className="max-w-3xl mb-16 md:mb-24"
          initial="hidden"
          animate={isHeaderInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
              }
            }
          }}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6"
              variants={{
                hidden: { y: '100%', opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                }
              }}
            >
              Our Work
            </motion.h2>
          </div>
          <motion.p
            className={`text-lg md:text-xl ${darkMode ? 'text-white/60' : 'text-black/60'} max-w-xl`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
              }
            }}
          >
            A curated collection of our best work, showcasing innovation across industries.
          </motion.p>
        </motion.div>

        {/* Projects Stack */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <AnimatedButton onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({ behavior: 'auto' });
            }
          }}>
            Let's Build Something
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Projects;
