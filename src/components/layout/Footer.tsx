'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Toast from '../ui/Toast';
import AnimatedButton from '../ui/AnimatedButton';
import { supabase } from '../../lib/supabase';

const Footer: React.FC = () => {
  const { darkMode } = useTheme();
  const currentYear = new Date().getFullYear();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          setToast({ message: "You're already subscribed!", type: 'success' });
        } else {
          throw error;
        }
      } else {
        setToast({ message: "You're in! We'll keep you posted on the good stuff.", type: 'success' });
      }
      setEmail('');
    } catch (err) {
      console.error('Error subscribing:', err);
      setToast({ message: 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
    { name: 'X', icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
    { name: 'GitHub', icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/> },
  ];

  return (
    <footer className={`${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'} py-16 md:py-24 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
      <div className="container-wide">
        <motion.div
          className={`mb-16 md:mb-24 pb-16 md:pb-24 border-b ${darkMode ? 'border-white/10' : 'border-black/10'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">FOMO?</h3>
              <p className={`text-base md:text-lg ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                Let us ping you when we drop exclusive deals, fresh tech insights, or add new work to the portfolio. No spam, just the good stuff.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className={`flex-1 px-5 py-4 rounded-2xl text-base bg-transparent border-2 ${darkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'} outline-none transition-colors`}
              />
              <AnimatedButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Joining...' : 'Count Me In'}
              </AnimatedButton>
            </form>
          </div>
          <Toast show={!!toast} message={toast?.message || ''} onClose={() => setToast(null)} type={toast?.type || 'success'} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <h4 className="text-sm font-bold mb-6 tracking-tight">Sriracha Creative</h4>
            <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>Premium web solutions for modern businesses.</p>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-6 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Journal</h4>
            <ul className="space-y-3">
              <li>
                <motion.button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} transition-colors`} whileHover={{ x: 3 }}>
                  Technology
                </motion.button>
              </li>
              <li>
                <motion.button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} transition-colors`} whileHover={{ x: 3 }}>
                  Projects
                </motion.button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-6 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Company</h4>
            <ul className="space-y-3">
              <li>
                <motion.button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} transition-colors`} whileHover={{ x: 3 }}>
                  About
                </motion.button>
              </li>
              <li>
                <motion.button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} transition-colors`} whileHover={{ x: 3 }}>
                  Contact
                </motion.button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-medium mb-6 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:srirachacreative@gmail.com" className={`text-sm ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} transition-colors`}>
                  srirachacreative@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          className={`flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>&copy; {currentYear} Sriracha Creative. All rights reserved.</p>
            <span className={`hidden sm:block ${darkMode ? 'text-white/30' : 'text-black/30'}`}>|</span>
            <a href="/privacy" className={`text-sm ${darkMode ? 'text-white/50 hover:text-white/70' : 'text-black/50 hover:text-black/70'} transition-colors`}>Privacy Policy</a>
            <span className={`${darkMode ? 'text-white/30' : 'text-black/30'}`}>|</span>
            <a href="/terms" className={`text-sm ${darkMode ? 'text-white/50 hover:text-white/70' : 'text-black/50 hover:text-black/70'} transition-colors`}>Terms of Service</a>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.button
                key={link.name}
                className={`relative group ${darkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'} transition-colors`}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">{link.icon}</svg>
                <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${darkMode ? 'bg-white/10 text-white/70' : 'bg-black/10 text-black/70'}`}>
                  Coming soon
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
