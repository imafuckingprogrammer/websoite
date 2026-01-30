'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Layout from '../src/components/layout/Layout'
import Hero from '../src/components/sections/Hero'
import Services from '../src/components/sections/Services'
import Projects from '../src/components/sections/Projects'
import About from '../src/components/sections/AboutSection'
import Contact from '../src/components/sections/Contact'
import FAQ from '../src/components/ui/FAQ'
import Loader from '../src/components/ui/Loader'
import AnimatedButton from '../src/components/ui/AnimatedButton'
import { useTheme } from '../src/contexts/ThemeContext'

function IntroSection() {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  // Stagger variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Word-by-word animation
  const text = "We craft stunning digital experiences that captivate your audience and transform your vision into reality.";
  const words = text.split(' ');

  return (
    <section ref={sectionRef} className={`py-20 md:py-28 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'}`}>
      <div className="container-wide">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Word-by-word stagger text */}
          <motion.p
            className={`text-lg md:text-xl max-w-md leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}
            variants={containerVariants}
          >
            {words.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: { y: '100%', opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.03,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.p>

          <div className="flex justify-center md:justify-end">
            <AnimatedButton onClick={scrollToWork}>
              Explore Our Work
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`py-24 md:py-32 ${
        darkMode ? 'bg-neutral-950 text-white' : 'bg-cream-100 text-black'
      }`}
    >
      <div className="container-wide max-w-3xl">
        <div className="mb-12">
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              Frequently Asked
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Questions
            </motion.h2>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FAQ />
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Loader loading={loading} />

      {!loading && (
        <Layout>
          <Hero />
          <IntroSection />
          <Services />
          <Projects />
          <About />
          <Contact />
          <FAQSection />
        </Layout>
      )}
    </>
  )
}
