"use client";

import {
  ArrowUpRight,
  Camera,
  Check,
  Copy,
  Mail,
  MessageCircle,
} from "lucide-react";
import { useState, type MouseEvent } from "react";
import { FadeIn } from "@/app/_components/animations/fade-in";
import { FONT_FAMILY, HEADING_GRADIENT } from "@/app/_lib/theme";

const PHONE_NUMBER = "+923332378127";
const WHATSAPP_URL =
  "https://wa.me/923332378127?text=Hi%20Zain%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.";
const INSTAGRAM_URL = "https://www.instagram.com/zsyed3826/";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  function handlePointerMove(event: MouseEvent<HTMLElement>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  async function copyPhoneNumber() {
    await navigator.clipboard.writeText(PHONE_NUMBER);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-orb contact-orb-cyan" aria-hidden="true" />
      <div className="contact-orb contact-orb-violet" aria-hidden="true" />
      <div className="contact-grid" aria-hidden="true" />

      <div className="contact-content">
        <FadeIn y={30}>
          <p className="contact-eyebrow">
            <span className="contact-status-dot" aria-hidden="true" />
            Available for new opportunities
          </p>
          <h2
            id="contact-heading"
            style={{
              background: HEADING_GRADIENT,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: FONT_FAMILY.display,
            }}
            className="contact-heading"
          >
            Let&apos;s build something great
          </h2>
          <p className="contact-intro">
            Have a product idea, an ambitious build, or a role worth talking
            about? Send me a message. WhatsApp is the fastest way to reach me.
          </p>
        </FadeIn>

        <div className="contact-layout">
          <FadeIn y={28} style={{ height: "100%" }}>
            <article
              className="contact-whatsapp-card contact-interactive-card"
              onMouseMove={handlePointerMove}
            >
              <div className="contact-card-glow" aria-hidden="true" />
              <div className="contact-card-topline">
                <span className="contact-icon contact-icon-primary">
                  <MessageCircle size={27} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="contact-primary-label">Fastest response</span>
              </div>

              <div className="contact-whatsapp-copy">
                <p>Start a conversation</p>
                <h3>Chat with me on WhatsApp</h3>
                <span>Usually the best place to reach me directly.</span>
              </div>

              <div className="contact-whatsapp-actions">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-whatsapp-button"
                  aria-label="Start a WhatsApp chat with Zain"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  Message me
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className="contact-phone-copy"
                  onClick={copyPhoneNumber}
                  aria-label="Copy WhatsApp phone number"
                >
                  <span>{PHONE_NUMBER}</span>
                  {copied ? (
                    <Check size={17} aria-hidden="true" />
                  ) : (
                    <Copy size={17} aria-hidden="true" />
                  )}
                  <span className="sr-only" aria-live="polite">
                    {copied ? "Phone number copied" : ""}
                  </span>
                </button>
              </div>
            </article>
          </FadeIn>

          <div className="contact-secondary-grid">
            <FadeIn delay={0.08} y={24} style={{ height: "100%" }}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="contact-social-card contact-instagram-card contact-interactive-card"
                onMouseMove={handlePointerMove}
                aria-label="Visit Zain on Instagram"
              >
                <div className="contact-card-glow" aria-hidden="true" />
                <span className="contact-icon">
                  <Camera size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="contact-social-copy">
                  <small>Follow along</small>
                  <strong>Instagram</strong>
                  <span>@zsyed3826</span>
                </span>
                <ArrowUpRight className="contact-social-arrow" size={21} aria-hidden="true" />
              </a>
            </FadeIn>

            <FadeIn delay={0.16} y={24} style={{ height: "100%" }}>
              <a
                href="mailto:zsyed3826@gmail.com"
                className="contact-social-card contact-interactive-card"
                onMouseMove={handlePointerMove}
                aria-label="Email Zain"
              >
                <div className="contact-card-glow" aria-hidden="true" />
                <span className="contact-icon">
                  <Mail size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="contact-social-copy">
                  <small>Prefer email?</small>
                  <strong>Email me</strong>
                  <span>zsyed3826@gmail.com</span>
                </span>
                <ArrowUpRight className="contact-social-arrow" size={21} aria-hidden="true" />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
