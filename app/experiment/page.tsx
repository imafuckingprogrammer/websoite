'use client'

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../src/contexts/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animated SVG Line Component - like Lusion's wavy lines
const AnimatedLine: React.FC<{ className?: string }> = ({ className }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up the line to be hidden initially
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    // Animate the line drawing on scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: path,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });
  }, []);

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 1200 600"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M-100,300 Q200,100 400,300 T800,300 T1300,200"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500/60"
      />
    </svg>
  );
};

// Second wavy line with different path
const AnimatedLine2: React.FC<{ className?: string }> = ({ className }) => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: path,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 1.5
      }
    });
  }, []);

  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 1200 400"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M-50,200 C150,50 300,350 500,200 S700,50 900,200 S1100,350 1250,150"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className="text-blue-500/40"
      />
    </svg>
  );
};

// Distortion effect on scroll - elements skew as they enter/exit
const DistortionCard: React.FC<{ children: React.ReactNode; index: number; darkMode: boolean }> = ({ children, index, darkMode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Skew effect based on scroll velocity
      gsap.fromTo(cardRef.current,
        {
          skewY: 5,
          opacity: 0,
          y: 100
        },
        {
          skewY: 0,
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}
      style={{ transformOrigin: 'center center' }}
    >
      {children}
    </div>
  );
};

// Service Card Component (from main site)
const ServiceCard: React.FC<{ title: string; description: string; features: string[]; darkMode: boolean; index: number }> = ({
  title, description, features, darkMode, index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Complex entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1
        }
      });

      tl.fromTo(cardRef.current, {
        y: 80,
        opacity: 0,
        rotateX: 10,
        skewY: 3
      }, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        skewY: 0,
        duration: 1
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-neutral-800' : 'bg-white'}`}
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className={`mb-6 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-full text-sm ${
              darkMode ? 'bg-white/10 text-white/80' : 'bg-black/5 text-black/80'
            }`}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

// Scroll Transform Section - Lusion style
const ScrollTransformSection: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !imageContainerRef.current || !textRef.current || !overlayTextRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Image transforms from card to fullscreen
      tl.fromTo(imageContainerRef.current,
        {
          width: '45%',
          height: '60%',
          borderRadius: 24,
          x: 0,
          rotateY: -5,
          rotateX: 2,
          skewY: 2
        },
        {
          width: '95%',
          height: '85%',
          borderRadius: 16,
          x: '0%',
          rotateY: 0,
          rotateX: 0,
          skewY: 0,
          duration: 1,
          ease: 'none'
        }
      );

      // Text fades out
      tl.to(textRef.current, {
        opacity: 0,
        x: 100,
        skewX: -5,
        duration: 0.5,
        ease: 'none'
      }, 0);

      // Overlay text fades in
      tl.fromTo(overlayTextRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'none' },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`h-screen w-full overflow-hidden relative ${darkMode ? 'bg-neutral-950' : 'bg-gray-100'}`}
      style={{ perspective: '1000px' }}
    >
      {/* Animated background lines */}
      <AnimatedLine className="top-0 left-0 w-full h-[600px] opacity-30" />
      <AnimatedLine2 className="bottom-0 right-0 w-full h-[400px] opacity-20" />

      <div className="h-full w-full flex items-center justify-center relative px-8">
        {/* Image Container */}
        <div
          ref={imageContainerRef}
          className="absolute overflow-hidden shadow-2xl"
          style={{
            transformStyle: 'preserve-3d',
            left: '5%',
          }}
        >
          <img
            src="https://picsum.photos/1200/800?random=1"
            alt="Transform demo"
            className="w-full h-full object-cover"
          />
          {/* Overlay text */}
          <div
            ref={overlayTextRef}
            className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0"
          >
            <div className="flex items-center gap-4 text-white">
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                PLAY
              </span>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                REEL
              </span>
            </div>
          </div>
        </div>

        {/* Side text */}
        <div
          ref={textRef}
          className={`absolute right-[5%] max-w-md ${darkMode ? 'text-white' : 'text-black'}`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Scroll-Linked Transform
          </h2>
          <p className={`text-lg ${darkMode ? 'text-white/60' : 'text-black/60'} mb-8`}>
            This effect is tied to your scroll position. The image expands with perspective distortion as you scroll. Scroll back to reverse.
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stretch Distortion Section - images stretch/squeeze based on scroll velocity (like Lusion)
const StretchDistortionSection: React.FC = () => {
  const { darkMode } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const images = imagesRef.current.filter(Boolean) as HTMLDivElement[];
    if (images.length === 0) return;

    const ctx = gsap.context(() => {
      // Track velocity for stretch effect
      let currentScaleY = 1;
      let targetScaleY = 1;
      let rafId: number;

      // Smooth interpolation for the stretch effect
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const animate = () => {
        // Smoothly interpolate towards target
        currentScaleY = lerp(currentScaleY, targetScaleY, 0.1);

        // Apply to all images
        images.forEach((img) => {
          gsap.set(img, {
            scaleY: currentScaleY,
            transformOrigin: 'center center'
          });
        });

        // Gradually return to normal when not scrolling
        targetScaleY = lerp(targetScaleY, 1, 0.05);

        rafId = requestAnimationFrame(animate);
      };

      rafId = requestAnimationFrame(animate);

      // Update target based on scroll velocity
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          // Stretch more when scrolling down, squeeze when scrolling up
          // Clamp the effect to reasonable values
          const stretchAmount = Math.min(Math.max(velocity / 2000, -0.3), 0.3);
          targetScaleY = 1 + stretchAmount;
        }
      });

      // Entrance animation
      images.forEach((img, i) => {
        gsap.fromTo(img,
          {
            y: 100,
            opacity: 0,
            scaleY: 1.3 // Start stretched
          },
          {
            y: 0,
            opacity: 1,
            scaleY: 1,
            duration: 1,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      return () => {
        cancelAnimationFrame(rafId);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [darkMode]);

  const galleryItems = [
    { src: 'https://picsum.photos/600/800?random=10', title: 'Project Alpha' },
    { src: 'https://picsum.photos/600/800?random=11', title: 'Project Beta' },
    { src: 'https://picsum.photos/600/800?random=12', title: 'Project Gamma' },
    { src: 'https://picsum.photos/600/800?random=13', title: 'Project Delta' },
    { src: 'https://picsum.photos/600/800?random=14', title: 'Project Epsilon' },
    { src: 'https://picsum.photos/600/800?random=15', title: 'Project Zeta' },
  ];

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen py-32 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}
    >
      <div className="container mx-auto px-8">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
          Stretch Distortion
        </h2>
        <p className={`text-lg mb-16 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          Scroll and watch the images stretch vertically based on velocity. Stop scrolling to see them snap back to shape.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => { imagesRef.current[i] = el; }}
              className="relative overflow-hidden rounded-2xl shadow-xl aspect-[3/4] cursor-pointer group"
              style={{ willChange: 'transform' }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Parallax Text Section
const ParallaxTextSection: React.FC = () => {
  const { darkMode } = useTheme();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        x: '-50%',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`py-20 overflow-hidden ${darkMode ? 'bg-neutral-950' : 'bg-gray-100'}`}>
      <div ref={textRef} className="whitespace-nowrap">
        <span className={`text-[15vw] font-bold tracking-tighter ${darkMode ? 'text-white/10' : 'text-black/5'}`}>
          GSAP ScrollTrigger — Experiments — GSAP ScrollTrigger — Experiments —
        </span>
      </div>
    </section>
  );
};

export default function ExperimentPage() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <main className={darkMode ? 'bg-neutral-950 text-white' : 'bg-gray-50 text-black'}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center backdrop-blur-sm">
        <a
          href="/"
          className={`text-sm font-medium ${darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'}`}
        >
          Back to Home
        </a>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            darkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
          }`}
        >
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* Intro */}
      <section className="h-screen flex flex-col items-center justify-center px-8 text-center relative">
        <AnimatedLine className="top-20 left-0 w-full h-[400px] opacity-20" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 relative z-10">
          GSAP Experiments
        </h1>
        <p className={`text-xl max-w-2xl ${darkMode ? 'text-white/60' : 'text-black/60'} mb-8 relative z-10`}>
          Testing scroll-linked animations, distortion effects, animated SVG lines, and more.
          These effects respond to your scroll position.
        </p>
        <div className="flex items-center gap-2 animate-bounce relative z-10">
          <span className="text-sm">Scroll down</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Demo 1: Lusion-style transform with animated lines */}
      <ScrollTransformSection />

      {/* Parallax text */}
      <ParallaxTextSection />

      {/* Demo 2: Stretch distortion based on scroll velocity */}
      <StretchDistortionSection />

      {/* Distortion cards section */}
      <section className={`min-h-screen py-32 ${darkMode ? 'bg-neutral-950' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Distortion Entry</h2>
          <p className={`text-lg mb-16 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            Cards skew as they enter the viewport, then straighten out
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Innovation', desc: 'Pushing boundaries in design and tech' },
              { title: 'Excellence', desc: 'Holding ourselves to the highest standards' },
              { title: 'Creativity', desc: 'Finding unique solutions to every problem' },
              { title: 'Collaboration', desc: 'Building together, achieving more' }
            ].map((item, i) => (
              <DistortionCard key={i} index={i} darkMode={darkMode}>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className={darkMode ? 'text-white/60' : 'text-black/60'}>{item.desc}</p>
              </DistortionCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className={`py-20 text-center ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
        <p className={darkMode ? 'text-white/40' : 'text-black/40'}>
          These GSAP effects can be integrated into the main site.
        </p>
        <a
          href="/"
          className={`inline-block mt-4 px-6 py-3 rounded-full text-sm font-medium ${
            darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
          }`}
        >
          Back to Home
        </a>
      </section>
    </main>
  );
}
