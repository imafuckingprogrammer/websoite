'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const faqs = [
  {
    q: 'What services do you offer?',
    a: 'We specialize in web design, development, branding, SEO, and digital solutions for businesses worldwide.'
  },
  {
    q: 'How long does it take to build a website?',
    a: 'Most projects take about 2 weeks for a standard website, but can range up to 6 weeks for complex builds or custom features. Timelines depend on project scope and client feedback speed.'
  },
  {
    q: 'How much does a website cost?',
    a: 'Pricing depends on your needs. Most projects start at $2,000 for a standard business website. Simpler sites can be less, and complex or custom builds may cost more. We provide transparent, fixed quotes after a free consultation.'
  },
  {
    q: 'What is your process?',
    a: 'Our process includes discovery, strategy, design, development, testing, and launch. We keep you involved at every step for feedback and approvals.'
  },
  {
    q: 'How many revisions do I get?',
    a: 'We include at least two rounds of revisions at each major stage (design and development) to ensure you love the final result.'
  },
  {
    q: 'What technologies do you use?',
    a: 'We use modern technologies like React, TypeScript, Next.js, Tailwind CSS, and more. We choose the best stack for your project\'s needs.'
  },
  {
    q: 'Do you offer support after launch?',
    a: 'Yes! We offer ongoing support, maintenance, and updates to keep your website running smoothly.'
  },
  {
    q: 'How do we get started?',
    a: 'Just contact us through the form or email, and we\'ll schedule a free consultation to discuss your project.'
  },
  {
    q: 'Do you provide hosting?',
    a: 'Yes! We can handle hosting, setup, and management for your website, or work with your preferred provider. Our managed hosting means you don\'t have to worry about technical details—just focus on your business.'
  }
];

const FAQ: React.FC = () => {
  const { darkMode } = useTheme();
  const [open, setOpen] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState(false);

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev);
    setOpen(null);
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <motion.button
          className={`relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-medium ${
            darkMode
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-black/5 text-black hover:bg-black/10'
          } transition-colors`}
          onClick={handleExpandAll}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {expandAll ? 'Collapse All' : 'Expand All'}
        </motion.button>
      </div>
      <div className={`divide-y ${darkMode ? 'divide-white/10' : 'divide-black/10'}`}>
        {faqs.map((faq, i) => {
          const isOpen = expandAll || open === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="w-full text-left py-6 focus:outline-none flex items-center justify-between group"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <span className={`text-lg font-medium ${darkMode ? 'group-hover:text-white/80' : 'group-hover:text-black/80'} transition-colors`}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  className={`ml-4 text-2xl font-bold select-none ${darkMode ? 'text-white/60' : 'text-black/60'}`}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={`pb-6 text-base leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;
