import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

export function PortfolioFooter() {
  return (
    <footer
      id="contact"
      style={{
        background: COLORS.background,
        color: COLORS.muted,
        fontFamily: FONT_FAMILY.display,
      }}
      className="py-10 text-center text-xs tracking-widest uppercase"
    >
      Syed Zain Ul Arfien — zsyed3826@gmail.com
    </footer>
  );
}
