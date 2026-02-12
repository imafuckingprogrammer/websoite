'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedButton from '../ui/AnimatedButton';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Work', href: '#work' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

const Navbar: React.FC<{ animate?: boolean; onMenuChange?: (open: boolean) => void; showNavbar?: boolean }> = ({ animate = true, onMenuChange, showNavbar = true }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showWipe, setShowWipe] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      setMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDarkModeToggle = () => {
    setShowWipe(true);
    setTimeout(() => {
      toggleDarkMode();
      setTimeout(() => setShowWipe(false), 400);
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    onMenuChange?.(menuOpen);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, onMenuChange]);

  return (
    <>
      <AnimatePresence>
        {showWipe && (
          <motion.div
            className={`fixed inset-0 z-[100] ${darkMode ? 'bg-cream-100' : 'bg-neutral-950'}`}
            initial={{ y: '100%' }}
            animate={{ y: 0, opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              y: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.7, times: [0, 0.6, 1] }
            }}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? `py-3 ${darkMode ? 'bg-neutral-950/80 backdrop-blur-xl' : 'bg-cream-100/80 backdrop-blur-xl'}`
            : 'py-5'
        } ${darkMode ? 'text-white' : 'text-black'}`}
        initial={animate ? { y: -100, opacity: 0 } : false}
        animate={showNavbar ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-wide flex justify-between items-center">
          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'} transition-colors`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className={`block w-5 h-0.5 ${darkMode ? 'bg-white' : 'bg-black'} origin-center`}
                  animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className={`block w-5 h-0.5 ${darkMode ? 'bg-white' : 'bg-black'} origin-center`}
                  animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>

            <button
              onClick={() => handleLinkClick('#home')}
              className={`font-bold tracking-tight transition-colors ${darkMode ? 'text-white/80 hover:text-white' : 'text-black/80 hover:text-black'}`}
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            >
              <span className="text-2xl lg:hidden">^</span>
              <span className="hidden lg:inline text-lg font-semibold">caret design</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <AnimatedButton onClick={() => handleLinkClick('#contact')} size="sm">
              Get Quote
            </AnimatedButton>

            <motion.button
              onClick={handleDarkModeToggle}
              disabled={showWipe}
              className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                darkMode ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/5 text-black hover:bg-black/10'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {darkMode ? 'Light' : 'Dark'}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`fixed inset-0 z-40 ${darkMode ? 'bg-neutral-950' : 'bg-cream-100'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-full flex flex-col justify-center items-center px-8 relative">
              <motion.nav className="flex flex-col items-center gap-6 md:gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`relative text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter ${darkMode ? 'text-white' : 'text-black'} group`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="relative inline-block">
                      {link.name}
                      <span className={`absolute -bottom-2 left-0 w-full h-1 ${darkMode ? 'bg-white' : 'bg-black'} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                    </span>
                  </motion.button>
                ))}
              </motion.nav>

              <motion.div
                className="absolute bottom-8 sm:bottom-12 left-0 right-0 px-6 sm:px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <a
                    href="mailto:caretdesign0@gmail.com"
                    className={`text-sm ${darkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} transition-colors`}
                  >
                    caretdesign0@gmail.com
                  </a>
                  <div className="flex items-center gap-6">
                    {['Instagram', 'X', 'GitHub'].map((name) => (
                      <span
                        key={name}
                        className={`relative group text-sm cursor-default ${darkMode ? 'text-white/50' : 'text-black/50'}`}
                      >
                        {name}
                        <span className={`absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
                          Coming soon
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
