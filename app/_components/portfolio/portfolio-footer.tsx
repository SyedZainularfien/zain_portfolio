import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

export function PortfolioFooter() {
  return (
    <footer
      style={{
        background: COLORS.background,
        color: COLORS.muted,
        fontFamily: FONT_FAMILY.display,
      }}
      className="px-5 py-8 text-center text-xs tracking-widest uppercase"
    >
      Syed Zain Ul Arfien — Full Stack Developer
    </footer>
  );
}
