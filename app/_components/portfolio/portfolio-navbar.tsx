"use client";

import { ArrowUpRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { NAVIGATION_ITEMS } from "@/app/_data/portfolio";

const NAVIGATION_LINKS = NAVIGATION_ITEMS.map((label, index) => ({
  code: String(index + 1).padStart(2, "0"),
  id: label.toLowerCase(),
  label,
}));

export function PortfolioNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsMenuOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    let frameId = 0;

    function updateNavigationState() {
      frameId = 0;
      setIsScrolled((current) => {
        const next = window.scrollY > 28;
        return current === next ? current : next;
      });

      const activationLine = window.innerHeight * 0.38;
      let nextActiveSection: string | null = null;

      for (const link of NAVIGATION_LINKS) {
        const section = document.getElementById(link.id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          nextActiveSection = link.id;
        }
      }

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
    }

    function requestUpdate() {
      if (!frameId) frameId = window.requestAnimationFrame(updateNavigationState);
    }

    updateNavigationState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus());

    function handleKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        headerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  function handleMenuButtonKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" && !isMenuOpen) {
      event.preventDefault();
      setIsMenuOpen(true);
    }
  }

  return (
    <header
      ref={headerRef}
      className={`portfolio-navbar${isScrolled ? " is-scrolled" : ""}${
        isMenuOpen ? " is-menu-open" : ""
      }`}
    >
      <div className="portfolio-nav-bar">
        <a
          href="#top"
          className="portfolio-nav-brand"
          aria-label="Zain — back to the top"
          onClick={() => closeMenu()}
        >
          <span className="portfolio-nav-name">Syed Zain</span>
          <span className="portfolio-nav-role">Full-stack developer</span>
        </a>

        <nav className="portfolio-nav-desktop" aria-label="Primary navigation">
          <ul>
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? "is-active" : undefined}
                  aria-current={activeSection === link.id ? "location" : undefined}
                  onClick={() => setActiveSection(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="portfolio-nav-actions">
          <a href="#contact" className="portfolio-nav-cta">
            <span>Start a project</span>
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="portfolio-menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="portfolio-mobile-menu"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            onKeyDown={handleMenuButtonKeyDown}
          >
            <span>{isMenuOpen ? "Close" : "Menu"}</span>
            <i aria-hidden="true">
              <span />
              <span />
            </i>
          </button>
        </div>
      </div>

      <div
        id="portfolio-mobile-menu"
        className="portfolio-mobile-menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="portfolio-mobile-menu-inner">
          <p className="portfolio-mobile-menu-label">Navigation / 04</p>

          <nav aria-label="Mobile navigation">
            <ol>
              {NAVIGATION_LINKS.map((link, index) => (
                <li
                  key={link.id}
                  style={
                    { "--nav-delay": `${80 + index * 45}ms` } as CSSProperties
                  }
                >
                  <a
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    href={`#${link.id}`}
                    className={activeSection === link.id ? "is-active" : undefined}
                    aria-current={activeSection === link.id ? "location" : undefined}
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={() => {
                      setActiveSection(link.id);
                      closeMenu();
                    }}
                  >
                    <span>{link.code}</span>
                    <strong>{link.label}</strong>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="portfolio-mobile-menu-footer">
            <p>
              Have a product idea, a difficult build, or a role worth talking
              about?
            </p>
            <a
              href="#contact"
              className="portfolio-mobile-cta"
              tabIndex={isMenuOpen ? 0 : -1}
              onClick={() => closeMenu()}
            >
              <span>Start a conversation</span>
              <ArrowUpRight size={20} strokeWidth={1.8} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
