'use client'

import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  fullWidth = false,
}) => {
  const { darkMode } = useTheme();

  const sizeClasses = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-10 py-5 text-sm',
    lg: 'px-12 py-6 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-full font-medium border-[1.75px] group
        ${sizeClasses[size]}
        ${darkMode ? 'bg-white text-black border-white/30 hover:border-white' : 'bg-black text-white border-black/30 hover:border-black'}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        active:scale-[0.98] transition-all
        ${className}
      `}
      style={{ touchAction: 'manipulation' }}
    >
      <span className="relative z-10 pointer-events-none select-none transition-opacity duration-150 group-hover:opacity-0">
        {children}
      </span>

      <span
        className={`absolute inset-0 ${darkMode ? 'bg-black' : 'bg-white'} rounded-full pointer-events-none translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]`}
        aria-hidden="true"
      />

      <span
        className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-150 ${darkMode ? 'text-white' : 'text-black'}`}
        aria-hidden="true"
      >
        {children}
      </span>
    </button>
  );
};

export default AnimatedButton;
