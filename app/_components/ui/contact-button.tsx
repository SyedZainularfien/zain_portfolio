import { FONT_FAMILY } from "@/app/_lib/theme";

export function ContactButton() {
  return (
    <a
      href="#contact"
      style={{
        borderRadius: 999,
        background:
          "linear-gradient(123deg, #18011F 7%, #0B3B4A 37%, #1A0B3B 72%, #22D3EE 130%)",
        boxShadow:
          "0 4px 4px rgba(34,211,238,0.2), 4px 4px 12px rgba(124,58,237,0.35) inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
        color: "white",
        fontFamily: FONT_FAMILY.display,
        padding: "0.85rem 2.2rem",
      }}
      className="inline-flex text-sm font-medium uppercase tracking-widest transition-transform duration-200 hover:-translate-y-0.5"
    >
      Contact Me
    </a>
  );
}
