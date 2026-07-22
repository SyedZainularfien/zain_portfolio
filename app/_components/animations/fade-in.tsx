"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
}

export function FadeIn({
  children,
  delay = 0,
  x = 0,
  y = 30,
  style,
}: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : `translate(${x}px, ${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.25,.1,.25,1) ${delay}s, transform 0.7s cubic-bezier(.25,.1,.25,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
