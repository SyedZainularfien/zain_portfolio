"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { FadeIn } from "@/app/_components/animations/fade-in";

const EMAIL_ADDRESS = "zsyed3826@gmail.com";
const PHONE_NUMBER = "+923332378127";
const WHATSAPP_URL =
  "https://wa.me/923332378127?text=Hi%20Zain%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect.";

const CONTACT_LINKS = [
  {
    code: "01",
    label: "Email",
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
  },
  {
    code: "02",
    label: "WhatsApp",
    value: PHONE_NUMBER,
    href: WHATSAPP_URL,
  },
  {
    code: "03",
    label: "Instagram",
    value: "@zain_ul_arfien",
    href: "https://www.instagram.com/zain_ul_arfien/",
  },
] as const;

const PROJECT_TYPES = [
  "Web application",
  "Mobile application",
  "Frontend engineering",
  "Backend & API",
  "AI-powered product",
  "Full-time opportunity",
  "Something else",
] as const;

type FieldName = "name" | "email" | "project" | "message";
type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;
type SubmitStatus = "idle" | "submitting" | "success";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  project: "",
  message: "",
};

function validateField(name: FieldName, value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return name === "project"
      ? "Choose the closest option."
      : "This field is required.";
  }

  if (name === "email" && !/^\S+@\S+\.\S+$/.test(trimmedValue)) {
    return "Enter a valid email address.";
  }

  if (name === "message" && trimmedValue.length < 20) {
    return "Add a little more detail (at least 20 characters).";
  }

  return "";
}

export function ContactSection() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [copied, setCopied] = useState(false);

  function updateValue(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const fieldName = event.target.name as FieldName;
    const value = event.target.value;

    setValues((current) => ({ ...current, [fieldName]: value }));
    setSubmitStatus("idle");

    if (errors[fieldName]) {
      setErrors((current) => ({
        ...current,
        [fieldName]: validateField(fieldName, value),
      }));
    }
  }

  function validateOnBlur(
    event: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const fieldName = event.target.name as FieldName;
    setErrors((current) => ({
      ...current,
      [fieldName]: validateField(fieldName, event.target.value),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = (Object.keys(values) as FieldName[]).reduce<FormErrors>(
      (result, fieldName) => {
        const error = validateField(fieldName, values[fieldName]);
        if (error) result[fieldName] = error;
        return result;
      },
      {},
    );

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalidField = Object.keys(nextErrors)[0];
      window.requestAnimationFrame(() => {
        document.getElementById(`contact-${firstInvalidField}`)?.focus();
      });
      return;
    }

    setSubmitStatus("submitting");
    await new Promise((resolve) => window.setTimeout(resolve, 550));

    const subject = encodeURIComponent(`Portfolio enquiry — ${values.project}`);
    const body = encodeURIComponent(
      `Hi Zain,\n\n${values.message.trim()}\n\nProject type: ${values.project}\nFrom: ${values.name.trim()} (${values.email.trim()})`,
    );

    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
    setSubmitStatus("success");
  }

  async function copyPhoneNumber() {
    await navigator.clipboard.writeText(PHONE_NUMBER);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section
      id="contact"
      className="contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-shell">
        <FadeIn y={28}>
          <div className="contact-kicker">
            <span>04 / Contact</span>
          </div>

          <div className="contact-title-row">
            <h2 id="contact-heading" className="contact-heading">
              <span>Let&apos;s make</span>
              <span>something real.</span>
            </h2>
            <p className="contact-title-note">
              Thoughtful products start with a clear conversation. Tell me what
              you&apos;re building, where you&apos;re stuck, or what role you
              need filled.
            </p>
          </div>
        </FadeIn>

        <div className="contact-main">
          <FadeIn y={22} style={{ height: "100%" }}>
            <aside
              className="contact-details"
              aria-label="Direct contact options"
            >
              <div>
                <h3 className="contact-details-label">
                  Prefer a direct channel?
                </h3>
                <p className="contact-details-copy">
                  <strong>WhatsApp is fastest.</strong>
                  <span>
                    Email works best for project briefs and longer
                    introductions.
                  </span>
                </p>
              </div>

              <div className="contact-links">
                {CONTACT_LINKS.map((link) => (
                  <div className="contact-link-row" key={link.code}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="contact-link"
                    >
                      <span className="contact-link-code">{link.code}</span>
                      <span className="contact-link-copy">
                        <small>{link.label}</small>
                        <strong>{link.value}</strong>
                      </span>
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </a>

                    {link.label === "WhatsApp" ? (
                      <button
                        type="button"
                        className="contact-copy-button"
                        onClick={copyPhoneNumber}
                        aria-label="Copy WhatsApp phone number"
                      >
                        {copied ? (
                          <Check size={16} aria-hidden="true" />
                        ) : (
                          <Copy size={16} aria-hidden="true" />
                        )}
                        <span className="sr-only" aria-live="polite">
                          {copied ? "Phone number copied" : ""}
                        </span>
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>

              <p className="contact-response-note">
                <span>Response time</span>
                Usually within 24–48 hours
              </p>
            </aside>
          </FadeIn>

          <FadeIn delay={0.1} y={22} style={{ height: "100%" }}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-heading">
                <span>Start a project</span>
                <span>Required fields / 04</span>
              </div>

              <div className="contact-field-grid">
                <div
                  className="contact-field"
                  data-invalid={Boolean(errors.name)}
                >
                  <label htmlFor="contact-name">Your name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={updateValue}
                    onBlur={validateOnBlur}
                    autoComplete="name"
                    placeholder="Jane Smith"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name ? (
                    <span id="contact-name-error" className="contact-error">
                      {errors.name}
                    </span>
                  ) : null}
                </div>

                <div
                  className="contact-field"
                  data-invalid={Boolean(errors.email)}
                >
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={updateValue}
                    onBlur={validateOnBlur}
                    autoComplete="email"
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email ? (
                    <span id="contact-email-error" className="contact-error">
                      {errors.email}
                    </span>
                  ) : null}
                </div>
              </div>

              <div
                className="contact-field"
                data-invalid={Boolean(errors.project)}
              >
                <label htmlFor="contact-project">What are we building?</label>
                <select
                  id="contact-project"
                  name="project"
                  value={values.project}
                  onChange={updateValue}
                  onBlur={validateOnBlur}
                  aria-invalid={Boolean(errors.project)}
                  aria-describedby={
                    errors.project ? "contact-project-error" : undefined
                  }
                >
                  <option value="" disabled>
                    Select a project type
                  </option>
                  {PROJECT_TYPES.map((projectType) => (
                    <option key={projectType} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
                {errors.project ? (
                  <span id="contact-project-error" className="contact-error">
                    {errors.project}
                  </span>
                ) : null}
              </div>

              <div
                className="contact-field"
                data-invalid={Boolean(errors.message)}
              >
                <label htmlFor="contact-message">A few project details</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={values.message}
                  onChange={updateValue}
                  onBlur={validateOnBlur}
                  rows={4}
                  placeholder="The idea, the challenge, and what a great outcome looks like…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message
                      ? "contact-message-error"
                      : "contact-message-hint"
                  }
                />
                <span
                  id="contact-message-hint"
                  className="contact-character-count"
                >
                  {values.message.length} / 20 min
                </span>
                {errors.message ? (
                  <span id="contact-message-error" className="contact-error">
                    {errors.message}
                  </span>
                ) : null}
              </div>

              <div className="contact-form-footer">
                <p className="contact-submit-note" aria-live="polite">
                  {submitStatus === "success"
                    ? "Draft prepared — your email app should open now."
                    : "Submitting prepares an email in your default mail app."}
                </p>
                <button
                  type="submit"
                  className="contact-submit"
                  disabled={submitStatus === "submitting"}
                >
                  <span>
                    {submitStatus === "submitting"
                      ? "Preparing"
                      : submitStatus === "success"
                        ? "Draft prepared"
                        : "Send enquiry"}
                  </span>
                  {submitStatus === "submitting" ? (
                    <i className="contact-spinner" aria-hidden="true" />
                  ) : submitStatus === "success" ? (
                    <Check size={19} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={19} aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
