'use client'

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  delay?: number;
  staggerDelay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Component = 'p',
  delay = 0,
  staggerDelay = 0.03
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Split text into words
  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      rotateX: -80
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}
    >
      {words.map((word, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            perspective: '500px'
          }}
        >
          <motion.span
            variants={wordVariants}
            style={{
              display: 'inline-block',
              transformOrigin: 'bottom center'
            }}
          >
            {Component === 'p' || Component === 'span' ? (
              word
            ) : (
              <Component style={{ display: 'inline', margin: 0 }}>{word}</Component>
            )}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// Line-by-line reveal for headings
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  staggerDelay?: number;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay
      }
    }
  };

  const lineVariants = {
    hidden: {
      y: '100%',
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {lines.map((line, index) => (
        <div
          key={index}
          style={{ overflow: 'hidden' }}
        >
          <motion.div
            variants={lineVariants}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default TextReveal;
