'use client'

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedButton from '../ui/AnimatedButton';
import { supabase } from '../../lib/supabase';

const Contact: React.FC = () => {
  const { darkMode } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            message: formData.message,
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <section
      id="contact"
      className={`py-24 md:py-32 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            ref={headerRef}
            variants={containerVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <div className="mb-8">
              <div className="overflow-hidden">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Let's work
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  together
                </motion.h2>
              </div>
            </div>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl ${darkMode ? 'text-white/60' : 'text-black/60'} mb-12`}
            >
              Ready to turn your big idea into reality? We're here to help you create something extraordinary.
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants}>
                <p className={`text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Email</p>
                <motion.a
                  href="mailto:caretdesign0@gmail.com"
                  className={`text-base md:text-lg ${darkMode ? 'hover:text-white/70' : 'hover:text-black/70'} transition-colors`}
                  whileHover={{ x: 5 }}
                >
                  caretdesign0@gmail.com
                </motion.a>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className={`text-sm uppercase tracking-wider mb-2 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Location</p>
                <p className={`text-base md:text-lg ${darkMode ? 'text-white/80' : 'text-black/80'}`}>New York</p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <motion.div variants={formItemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-4 rounded-2xl text-base bg-transparent border-2 ${
                      darkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'
                    } outline-none transition-colors`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-5 py-4 rounded-2xl text-base bg-transparent border-2 ${
                      darkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'
                    } outline-none transition-colors`}
                    placeholder="your@email.com"
                  />
                </div>
              </motion.div>

              <motion.div variants={formItemVariants}>
                <label htmlFor="company" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Company <span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full px-5 py-4 rounded-2xl text-base bg-transparent border-2 ${
                    darkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'
                  } outline-none transition-colors`}
                  placeholder="Your company"
                />
              </motion.div>

              <motion.div variants={formItemVariants}>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white/70' : 'text-black/70'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-5 py-4 rounded-2xl text-base bg-transparent border-2 ${
                    darkMode ? 'border-white/10 focus:border-white/30' : 'border-black/10 focus:border-black/30'
                  } outline-none transition-colors resize-none`}
                  placeholder="Tell us about your project..."
                />
              </motion.div>

              <motion.div variants={formItemVariants}>
                {isSuccess ? (
                  <button
                    type="button"
                    disabled
                    className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium border bg-green-500 text-white border-green-500/20"
                  >
                    Message Sent!
                  </button>
                ) : (
                  <AnimatedButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </AnimatedButton>
                )}
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
