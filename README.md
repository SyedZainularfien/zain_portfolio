# Zain Portfolio

A responsive developer portfolio built with Next.js 16, React 19, TypeScript,
Tailwind CSS, and Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/
├── _components/
│   ├── animations/   # Reusable interactive motion primitives
│   ├── portfolio/    # Portfolio-specific sections and visuals
│   └── ui/           # Shared presentational components
├── _data/            # Static portfolio content
├── _lib/             # Shared theme tokens and utilities
├── _types/           # Domain types
├── globals.css       # Global styles and Tailwind entry point
├── layout.tsx        # Root metadata, fonts, and document shell
└── page.tsx          # Home route composition
```

The underscore-prefixed folders are private App Router implementation folders;
they organize code without creating URL segments. Components use server
rendering by default, with client boundaries limited to browser-driven
animations and interactions.

## Quality checks

```bash
npm run lint
npm run build
```
