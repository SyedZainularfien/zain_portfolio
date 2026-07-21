import type { Project, Service } from "@/app/_types/portfolio";

export const NAVIGATION_ITEMS = ["About", "Skills", "Projects", "Contact"];

export const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express.js",
  "NestJS",
  "MongoDB",
  "React Native",
  "Expo",
  "Redux Toolkit",
  "TanStack Query",
  "Tailwind CSS",
  "Mantine UI",
  "Shadcn UI",
  "Framer Motion",
  "GSAP",
  "Zod",
  "JWT Auth",
  "AI Agents",
  "Claude",
  "Cursor",
] as const;

export const TECHNOLOGY_ROWS = [
  TECHNOLOGIES.slice(0, 11),
  TECHNOLOGIES.slice(11),
] as const;

export const TILE_GRADIENTS = [
  "linear-gradient(135deg,#0B3B4A,#083344)",
  "linear-gradient(135deg,#1A0B3B,#2E1065)",
  "linear-gradient(135deg,#0B2A3B,#083E52)",
  "linear-gradient(135deg,#241033,#3B0F5C)",
  "linear-gradient(135deg,#092B2E,#0E4A50)",
  "linear-gradient(135deg,#1B0F2E,#341758)",
] as const;

export const SERVICES: readonly Service[] = [
  {
    code: "FE",
    name: "Frontend Engineering",
    description:
      "Building fast, accessible interfaces with React, Next.js, and TypeScript — from design systems to pixel-perfect components.",
  },
  {
    code: "BE",
    name: "Backend & APIs",
    description:
      "Designing secure, scalable APIs with Node.js, Express, and NestJS, backed by MongoDB and clean data models.",
  },
  {
    code: "MO",
    name: "Mobile Apps",
    description:
      "Cross-platform apps with React Native and Expo that feel native, ship fast, and don't compromise on polish.",
  },
  {
    code: "AI",
    name: "AI-Powered Features",
    description:
      "Integrating LLMs and AI agents into real products — from prompt engineering to production-ready AI workflows.",
  },
  {
    code: "FS",
    name: "Full Stack Delivery",
    description:
      "Owning a feature end-to-end: architecture, implementation, code review, and deployment, across SaaS, healthcare, and e-commerce.",
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: "Orinnu AI",
    category: "AI Platform · Client",
    technologies: "Next.js · AI Agents · NestJS",
    gradients: [
      "linear-gradient(135deg,#1A0B3B,#3B0F5C)",
      "linear-gradient(135deg,#0B2A3B,#22D3EE33)",
      "linear-gradient(160deg,#241033,#0A0B0D)",
    ],
  },
  {
    name: "CheckyPro",
    category: "SaaS Dashboard · Client",
    technologies: "React · TypeScript · MongoDB",
    gradients: [
      "linear-gradient(135deg,#092B2E,#0E4A50)",
      "linear-gradient(135deg,#0B3B4A,#083344)",
      "linear-gradient(160deg,#083344,#0A0B0D)",
    ],
  },
  {
    name: "BlockMed Pro",
    category: "Healthcare Platform · Client",
    technologies: "React Native · Expo · Node.js",
    gradients: [
      "linear-gradient(135deg,#1B0F2E,#341758)",
      "linear-gradient(135deg,#0B2A3B,#3B0F5C)",
      "linear-gradient(160deg,#1A0B3B,#0A0B0D)",
    ],
  },
];

export const ABOUT_COPY =
  "With more than three years of experience in software development, i focus on frontend architecture, full-stack systems, and AI-powered applications, i truly enjoy working with teams that want to ship fast without cutting corners. Let's build something incredible together!";
