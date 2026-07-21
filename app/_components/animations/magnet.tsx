"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
}

const ORIGIN = { x: 0, y: 0 };

export function Magnet({ children, padding = 120, strength = 3 }: MagnetProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(ORIGIN);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const deltaX = event.clientX - (rect.left + rect.width / 2);
      const deltaY = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(deltaX, deltaY);
      const reach = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < reach) {
        setIsActive(true);
        setPosition({ x: deltaX / strength, y: deltaY / strength });
        return;
      }

      setIsActive(false);
      setPosition(ORIGIN);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={elementRef}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive
          ? "transform 0.3s ease-out"
          : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
