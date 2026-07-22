"use client";

import { useEffect, useState } from "react";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

const TERMINAL_LINES = [
  "const zain = {",
  "  role: 'Full Stack Developer',",
  "  stack: ['React','Next.js','Node.js'],",
  "  shipping: true,",
  "};",
];

export function TerminalVisual() {
  const [typedLines, setTypedLines] = useState(() =>
    TERMINAL_LINES.map(() => ""),
  );

  useEffect(() => {
    let lineIndex = 0;
    let characterIndex = 0;

    const interval = window.setInterval(() => {
      if (lineIndex >= TERMINAL_LINES.length) {
        window.clearInterval(interval);
        return;
      }

      const currentLineIndex = lineIndex;
      const currentCharacterIndex = characterIndex;

      setTypedLines((previousLines) => {
        const nextLines = [...previousLines];
        nextLines[currentLineIndex] = TERMINAL_LINES[currentLineIndex].slice(
          0,
          currentCharacterIndex + 1,
        );
        return nextLines;
      });

      characterIndex += 1;
      if (characterIndex >= TERMINAL_LINES[lineIndex].length) {
        lineIndex += 1;
        characterIndex = 0;
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, []);

  const activeLineIndex = typedLines.filter(Boolean).length - 1;

  return (
    <div
      style={{
        background: "#111318",
        border: "1px solid rgba(215,226,234,0.15)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        width: "100%",
        maxWidth: 480,
      }}
      className="overflow-hidden rounded-2xl"
    >
      <div
        style={{ borderBottom: "1px solid rgba(215,226,234,0.1)" }}
        className="flex items-center gap-2 px-4 py-3"
      >
        {[
          ["close", "#FF5F56"],
          ["minimize", "#FFBD2E"],
          ["maximize", "#27C93F"],
        ].map(([label, color]) => (
          <span
            key={label}
            aria-hidden="true"
            style={{
              width: 11,
              height: 11,
              borderRadius: 999,
              background: color,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 10,
            color: COLORS.muted,
            fontFamily: FONT_FAMILY.mono,
            fontSize: "0.7rem",
          }}
        >
          zain.dev — zsh
        </span>
      </div>

      <div
        style={{
          fontFamily: FONT_FAMILY.mono,
          fontSize: "clamp(0.625rem, 1.6vw, 0.95rem)",
          lineHeight: 1.9,
        }}
        className="p-4 sm:p-5"
      >
        {typedLines.map((line, index) => (
          <div
            key={TERMINAL_LINES[index]}
            style={{
              color: index === 1 ? COLORS.cyan : COLORS.text,
              minHeight: "1.9em",
              whiteSpace: "pre",
            }}
          >
            {line}
            {index === activeLineIndex && (
              <span className="terminal-cursor" style={{ color: COLORS.cyan }}>
                ▍
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
