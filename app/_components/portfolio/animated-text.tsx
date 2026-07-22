"use client";

import { useEffect, useRef, useState } from "react";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

interface AnimatedTextProps {
  text: string;
}

export function AnimatedText({ text }: AnimatedTextProps) {
  const elementRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.8;
      const end = window.innerHeight * 0.2;
      const nextProgress = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <p
      ref={elementRef}
      style={{
        color: COLORS.text,
        fontFamily: FONT_FAMILY.display,
        maxWidth: 560,
        fontSize: "clamp(1rem, 2vw, 1.3rem)",
      }}
      className="text-center leading-relaxed font-medium"
    >
      {Array.from(text).map((character, index) => {
        const localProgress = Math.min(
          1,
          Math.max(0, progress * text.length - index + 6),
        );

        return (
          <span key={`${character}-${index}`} style={{ opacity: 0.2 + 0.8 * localProgress }}>
            {character}
          </span>
        );
      })}
    </p>
  );
}
