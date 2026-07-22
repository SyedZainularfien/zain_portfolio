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
    name: "Golden Eye",
    category: "Community & Property Management",
    description:
      "Smart community/property management platform with a resident mobile app and admin dashboard.",
    overview:
      "A connected property-management experience designed to make everyday community operations easier for residents, staff, and administrators across mobile and web.",
    highlights: [
      "Resident-facing mobile experience",
      "Property operations dashboard",
      "Community communication workflows",
    ],
    gradients: [
      "linear-gradient(135deg,#3B2A0B,#7A5A12)",
      "linear-gradient(135deg,#1F2937,#D4AF3733)",
      "linear-gradient(160deg,#4A350A,#0A0B0D)",
    ],
  },
  {
    name: "CheckyPro",
    category: "Commerce & Payments",
    description:
      "Shopify merchant onboarding, checkout, and transaction management platform.",
    overview:
      "A commerce and payments platform that supports Shopify merchants from onboarding through checkout, payments, and day-to-day transaction operations.",
    highlights: [
      "Merchant onboarding journeys",
      "Checkout and payment experiences",
      "Transaction and store operations",
    ],
    technologies: "React · TypeScript · MongoDB",
    gradients: [
      "linear-gradient(135deg,#092B2E,#0E4A50)",
      "linear-gradient(135deg,#0B3B4A,#083344)",
      "linear-gradient(160deg,#083344,#0A0B0D)",
    ],
  },
  {
    name: "2250 Oxygen",
    category: "Healthcare & Pharmacy",
    description:
      "Healthcare platform for oxygen products and pharmacy services.",
    overview:
      "A healthcare commerce platform that brings oxygen products and pharmacy services into a clear, accessible digital customer journey.",
    highlights: [
      "Healthcare product discovery",
      "Pharmacy service workflows",
      "Responsive customer experience",
    ],
    gradients: [
      "linear-gradient(135deg,#063B3A,#0F766E)",
      "linear-gradient(135deg,#0B2A3B,#22D3EE33)",
      "linear-gradient(160deg,#0D4A52,#0A0B0D)",
    ],
  },
  {
    name: "RESAIA",
    category: "Learning & Certification",
    description: "AI-powered learning and certification platform.",
    overview:
      "An AI-assisted learning platform built around guided education, knowledge assessment, and a clear path toward professional certification.",
    highlights: [
      "AI-supported learning journeys",
      "Assessment and progress flows",
      "Certification-focused experience",
    ],
    gradients: [
      "linear-gradient(135deg,#2E1065,#6D28D9)",
      "linear-gradient(135deg,#1A0B3B,#A855F733)",
      "linear-gradient(160deg,#3B0F5C,#0A0B0D)",
    ],
  },
  {
    name: "Locum Hero",
    category: "Digital Health",
    description:
      "Healthcare platform for clinical assessments and patient vitals.",
    overview:
      "A digital-health workflow for recording clinical assessments and patient vitals while keeping complex information clear and actionable for care teams.",
    highlights: [
      "Clinical assessment workflows",
      "Patient vitals management",
      "Care-team focused interface",
    ],
    gradients: [
      "linear-gradient(135deg,#0B3B4A,#0369A1)",
      "linear-gradient(135deg,#083344,#38BDF833)",
      "linear-gradient(160deg,#0C4A6E,#0A0B0D)",
    ],
  },
  {
    name: "Orinnu AI",
    category: "AI Platform",
    description: "ChatGPT-style AI web application.",
    overview:
      "A conversational AI product that combines a focused chat experience with agent-powered workflows and a scalable application backend.",
    highlights: [
      "Conversational AI interface",
      "Agent-powered product flows",
      "Scalable application architecture",
    ],
    technologies: "Next.js · AI Agents · NestJS",
    gradients: [
      "linear-gradient(135deg,#1A0B3B,#3B0F5C)",
      "linear-gradient(135deg,#0B2A3B,#22D3EE33)",
      "linear-gradient(160deg,#241033,#0A0B0D)",
    ],
  },
  {
    name: "INFIN Global",
    category: "Enterprise Operations",
    description: "Enterprise business management platform.",
    overview:
      "An enterprise platform designed to centralize operational workflows, business information, and management visibility in one cohesive workspace.",
    highlights: [
      "Operational dashboards",
      "Structured business workflows",
      "Centralized information management",
    ],
    gradients: [
      "linear-gradient(135deg,#172554,#1D4ED8)",
      "linear-gradient(135deg,#0B2A3B,#3B82F633)",
      "linear-gradient(160deg,#1E3A8A,#0A0B0D)",
    ],
  },
  {
    name: "BlockMed Pro",
    category: "Healthcare Management",
    description: "Medical and healthcare management solution.",
    overview:
      "A cross-platform healthcare solution focused on making medical management workflows practical, accessible, and consistent across devices.",
    highlights: [
      "Cross-platform mobile experience",
      "Healthcare management workflows",
      "Secure application foundation",
    ],
    technologies: "React Native · Expo · Node.js",
    gradients: [
      "linear-gradient(135deg,#1B0F2E,#341758)",
      "linear-gradient(135deg,#0B2A3B,#3B0F5C)",
      "linear-gradient(160deg,#1A0B3B,#0A0B0D)",
    ],
  },
  {
    name: "GetFits",
    category: "Fitness & Wellness",
    description: "Fitness and wellness platform.",
    overview:
      "A wellness-focused product experience that helps users engage with fitness services, follow their journey, and stay connected to healthy routines.",
    highlights: [
      "Fitness journey experience",
      "Wellness-focused content flows",
      "Responsive product interface",
    ],
    gradients: [
      "linear-gradient(135deg,#123B1D,#15803D)",
      "linear-gradient(135deg,#092B2E,#4ADE8033)",
      "linear-gradient(160deg,#14532D,#0A0B0D)",
    ],
  },
  {
    name: "Paw Play Love",
    category: "Pet Care & Adoption",
    description: "Pet care and adoption platform.",
    overview:
      "A friendly digital platform that connects pet-care needs with adoption discovery through approachable browsing and management experiences.",
    highlights: [
      "Pet discovery and adoption flows",
      "Care-oriented user journeys",
      "Warm, approachable interface",
    ],
    gradients: [
      "linear-gradient(135deg,#4A1D2F,#BE185D)",
      "linear-gradient(135deg,#3B0F5C,#F472B633)",
      "linear-gradient(160deg,#831843,#0A0B0D)",
    ],
  },
  {
    name: "Lawnolu",
    category: "Lawn & Landscaping",
    description: "Lawn care and landscaping service platform.",
    overview:
      "A service platform that makes it easier for customers to discover, request, and manage lawn-care and landscaping work online.",
    highlights: [
      "Service discovery experience",
      "Booking and request workflows",
      "Customer-friendly responsive UI",
    ],
    gradients: [
      "linear-gradient(135deg,#1A2E05,#4D7C0F)",
      "linear-gradient(135deg,#092B2E,#A3E63533)",
      "linear-gradient(160deg,#365314,#0A0B0D)",
    ],
  },
  {
    name: "NeanderBros",
    category: "Web3 Business & Digital",
    description: "A Web3 business website and digital platform.",
    overview:
      "A bold digital presence for a Web3-focused business, balancing technical subject matter with a polished, accessible brand experience.",
    highlights: [
      "Web3 brand storytelling",
      "Modern marketing experience",
      "Responsive digital presence",
    ],
    gradients: [
      "linear-gradient(135deg,#3F1D0B,#C2410C)",
      "linear-gradient(135deg,#241033,#FB923C33)",
      "linear-gradient(160deg,#7C2D12,#0A0B0D)",
    ],
  },
  {
    name: "Zera",
    category: "SaaS Platform",
    description: "Modern SaaS web application.",
    overview:
      "A modern SaaS product shaped around clear workflows, reusable interface patterns, and a scalable foundation for evolving product needs.",
    highlights: [
      "Reusable product interface",
      "Dashboard-driven workflows",
      "Scalable SaaS foundation",
    ],
    gradients: [
      "linear-gradient(135deg,#0B2A3B,#0E7490)",
      "linear-gradient(135deg,#1A0B3B,#22D3EE33)",
      "linear-gradient(160deg,#164E63,#0A0B0D)",
    ],
  },
  {
    name: "Golden Year",
    category: "Senior Care & Community",
    description: "Senior care and community management platform.",
    overview:
      "A community-oriented senior-care platform designed to support accessible coordination, engagement, and everyday management experiences.",
    highlights: [
      "Senior-friendly user experience",
      "Care and community workflows",
      "Accessible management interface",
    ],
    gradients: [
      "linear-gradient(135deg,#3B2F0B,#A16207)",
      "linear-gradient(135deg,#241033,#FACC1533)",
      "linear-gradient(160deg,#713F12,#0A0B0D)",
    ],
  },
];

export const ABOUT_COPY =
  "With more than three years of experience in software development, i focus on frontend architecture, full-stack systems, and AI-powered applications, i truly enjoy working with teams that want to ship fast without cutting corners. Let's build something incredible together!";
