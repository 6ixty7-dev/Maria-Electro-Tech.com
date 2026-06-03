'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'; // Direction of translation
  className?: string;
  threshold?: number; // Trigger threshold
}

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the element enters the viewport
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getDirectionClass = () => {
    switch (direction) {
      case 'up':
        return 'translate-y-8 opacity-0';
      case 'down':
        return '-translate-y-8 opacity-0';
      case 'left':
        return 'translate-x-8 opacity-0';
      case 'right':
        return '-translate-x-8 opacity-0';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  const getTransitionStyle = () => {
    return {
      transitionProperty: 'opacity, transform',
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: 'cubic-bezier(0.21, 1.02, 0.43, 1.01)', // Custom smooth cubic-bezier
    };
  };

  return (
    <div
      ref={ref}
      style={isVisible ? getTransitionStyle() : undefined}
      className={`${
        isVisible ? 'translate-y-0 translate-x-0 opacity-100' : getDirectionClass()
      } ${className}`}
    >
      {children}
    </div>
  );
}
