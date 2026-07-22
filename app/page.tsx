import { AboutSection } from "@/app/_components/portfolio/about-section";
import { ContactSection } from "@/app/_components/portfolio/contact-section";
import { HeroSection } from "@/app/_components/portfolio/hero-section";
import { MarqueeSection } from "@/app/_components/portfolio/marquee-section";
import { PortfolioFooter } from "@/app/_components/portfolio/portfolio-footer";
import { ProjectsSection } from "@/app/_components/portfolio/projects-section";
import { ServicesSection } from "@/app/_components/portfolio/services-section";
import { PROJECTS } from "@/app/_data/portfolio";

export default function HomePage() {
  return (
    <main className="portfolio-shell">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={PROJECTS.slice(0, 5)} showAllLink />
      <ContactSection />
      <PortfolioFooter />
    </main>
  );
}
