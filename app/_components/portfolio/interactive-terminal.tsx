"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import {
  PROJECTS,
  SERVICES,
  TECHNOLOGIES,
} from "@/app/_data/portfolio";
import { COLORS, FONT_FAMILY } from "@/app/_lib/theme";

type TerminalEntry = {
  id: number;
  command?: string;
  output: string;
  kind: "info" | "success" | "error";
};

type OnlineTerminalResponse = {
  answer?: string;
  error?: string;
};

const INITIAL_ENTRIES: TerminalEntry[] = [
  {
    id: 0,
    output:
      'Zain CLI v2.0.0\nAsk me anything—not just about me.\nI can explain tech, brainstorm ideas, solve simple problems, or show you around my work.\nType "help" if you need ideas.',
    kind: "info",
  },
];

const HELP_TEXT = [
  "about       Who am I?",
  "experience  My professional experience",
  "skills      Technologies and tools I use",
  "projects    Work I have built",
  "services    What I can build for you",
  "approach    How I work and solve problems",
  "contact     Start a conversation with me",
  "clear       Clear this terminal",
  "",
  "Or ask anything else—get tech help, brainstorm an idea, or solve a problem.",
].join("\n");

const KEYBOARD_MASHES = [
  "asdf",
  "asdfgh",
  "qwerty",
  "qwertyuiop",
  "zxcv",
  "hjkl",
];

const MEANINGFUL_SINGLE_WORDS = new Set([
  "about",
  "approach",
  "availability",
  "backend",
  "bye",
  "clear",
  "contact",
  "css",
  "experience",
  "frontend",
  "hello",
  "help",
  "hi",
  "html",
  "hire",
  "joke",
  "jwt",
  "mobile",
  "node",
  "npm",
  "projects",
  "resume",
  "services",
  "skills",
  "stack",
  "strengths",
  "thanks",
  "typescript",
  "weather",
  "api",
]);

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+#.\s-]/g, "").trim();
}

function includesAny(query: string, phrases: string[]) {
  return phrases.some((phrase) => query.includes(phrase));
}

function looksLikeGibberish(command: string) {
  const query = normalize(command);

  if (query.length < 2 || /^(.)\1{3,}$/.test(query.replace(/\s/g, ""))) {
    return true;
  }

  if (KEYBOARD_MASHES.some((pattern) => query.includes(pattern))) {
    return true;
  }

  const words = query.match(/[a-z]+/g) ?? [];
  if (words.length === 0) return !/\d\s*[+\-*/]\s*\d/.test(command);
  if (words.length === 1 && MEANINGFUL_SINGLE_WORDS.has(words[0])) return false;

  const vowelLessWords = words.filter(
    (word) => word.length >= 3 && !/[aeiouy]/.test(word),
  );
  if (vowelLessWords.length === words.length) return true;

  const suspiciousWords = words.filter((word) => {
    if (word.length < 7) return false;

    const vowelCount = (word.match(/[aeiouy]/g) ?? []).length;
    const hasLongConsonantRun = /[bcdfghjklmnpqrstvwxz]{5,}/.test(word);
    return vowelCount / word.length < 0.16 || hasLongConsonantRun;
  });

  return suspiciousWords.length === words.length;
}

function getMathResponse(command: string) {
  const match = command
    .trim()
    .match(/^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/);

  if (!match) return null;

  const left = Number(match[1]);
  const right = Number(match[3]);
  const operator = match[2];
  const result =
    operator === "+"
      ? left + right
      : operator === "-"
        ? left - right
        : operator === "*"
          ? left * right
          : right === 0
            ? null
            : left / right;

  return result === null ? "I cannot divide by zero." : `${left} ${operator} ${right} = ${result}`;
}

function getLocalResponse(
  command: string,
): Pick<TerminalEntry, "output" | "kind"> | null {
  const query = normalize(command);
  const mathResponse = getMathResponse(command);
  const requestedProject = PROJECTS.find((project) =>
    query.includes(normalize(project.name)),
  );

  if (looksLikeGibberish(command)) {
    return {
      output: `zsh: input not understood: "${command}"\nThat looks like random or incomplete text. Try a meaningful question, or type "help".`,
      kind: "error",
    };
  }

  if (mathResponse) {
    return { output: mathResponse, kind: "success" };
  }

  if (requestedProject) {
    const technologies = requestedProject.technologies
      ? `\nStack: ${requestedProject.technologies}`
      : "";

    return {
      output: `I worked on ${requestedProject.name}, a ${requestedProject.category.toLowerCase()} product.\n${requestedProject.description}${technologies}`,
      kind: "success",
    };
  }

  if (query === "help" || query.includes("what can i ask")) {
    return { output: HELP_TEXT, kind: "info" };
  }

  if (/^(hi|hello|hey|yo)\b/.test(query)) {
    return {
      output:
        'Hey! You\'re talking directly to me through my portfolio. Ask me anything—or try, "What do you build?"',
      kind: "success",
    };
  }

  if (includesAny(query, ["how are you", "how is it going", "hows it going"])) {
    return {
      output:
        "I’m doing great—probably building, debugging, or thinking about the next product idea. How can I help?",
      kind: "success",
    };
  }

  if (
    query === "about" ||
    query.includes("who is zain") ||
    query.includes("who are you") ||
    query.includes("your name") ||
    query.includes("tell me about") ||
    query.includes("about zain")
  ) {
    return {
      output:
        "I’m Zain, a full-stack developer with 3+ years of experience. I focus on frontend architecture, scalable full-stack systems, mobile apps, and AI-powered products.",
      kind: "success",
    };
  }

  if (
    query === "experience" ||
    query.includes("experience") ||
    query.includes("how long") ||
    query.includes("years")
  ) {
    return {
      output:
        "I have 3+ years of software development experience across frontend architecture, full-stack systems, mobile apps, and AI-powered products.",
      kind: "success",
    };
  }

  if (
    query === "skills" ||
    query.includes("tech stack") ||
    query.includes("technologies") ||
    query.includes("technology") ||
    query.includes("tools")
  ) {
    return {
      output: `My core stack:\n${TECHNOLOGIES.join(" · ")}`,
      kind: "success",
    };
  }

  if (
    query === "projects" ||
    query.includes("projects") ||
    query.includes("portfolio") ||
    query.includes("work has zain") ||
    query.includes("what has zain built") ||
    query.includes("what have you built") ||
    query.includes("your work")
  ) {
    return {
      output: `Some products I’ve worked on:\n${PROJECTS.slice(0, 6)
        .map((project) => `• ${project.name} — ${project.category}`)
        .join("\n")}\n\nAsk about a project by name for more details.`,
      kind: "success",
    };
  }

  if (
    query === "services" ||
    query.includes("services") ||
    query.includes("what does zain build") ||
    query.includes("what can zain build") ||
    query.includes("what do you build") ||
    query.includes("what can you build") ||
    query.includes("what do you do")
  ) {
    return {
      output: `I can help with:\n${SERVICES.map((service) => `• ${service.name}`).join("\n")}`,
      kind: "success",
    };
  }

  if (
    query === "approach" ||
    includesAny(query, [
      "how do you work",
      "work process",
      "your process",
      "solve problems",
      "problem solving",
      "development process",
    ])
  ) {
    return {
      output:
        "I start by clarifying the real problem and constraints, then choose the smallest sound architecture, ship in testable increments, and refine using feedback and measurable results.",
      kind: "success",
    };
  }

  if (includesAny(query, ["why hire", "hire you", "good fit", "choose you"])) {
    return {
      output:
        "You should hire me if you want someone who can own features end-to-end, communicate clearly, move quickly without cutting corners, and care about both engineering quality and the final user experience.",
      kind: "success",
    };
  }

  if (includesAny(query, ["strength", "best quality", "good at"])) {
    return {
      output:
        "My strongest qualities are product-minded engineering, frontend attention to detail, full-stack ownership, fast learning, and turning unclear requirements into practical software.",
      kind: "success",
    };
  }

  if (includesAny(query, ["weakness", "improve yourself", "working on improving"])) {
    return {
      output:
        "I can sometimes spend too long polishing details. I manage that by defining the quality bar early, time-boxing refinement, and prioritizing what creates real user value.",
      kind: "success",
    };
  }

  if (
    includesAny(query, [
      "teamwork",
      "work with a team",
      "collaborate",
      "communication",
      "code review",
    ])
  ) {
    return {
      output:
        "I like collaborative teams with clear ownership, honest feedback, thoughtful code reviews, and frequent communication. I document decisions so everyone understands both the solution and the reasoning.",
      kind: "success",
    };
  }

  if (includesAny(query, ["deadline", "pressure", "urgent", "ship fast"])) {
    return {
      output:
        "Under tight deadlines, I identify the critical path, protect the core user flow, communicate tradeoffs early, and divide delivery into safe increments instead of creating hidden technical risk.",
      kind: "success",
    };
  }

  if (includesAny(query, ["frontend", "user interface", " ui ", "website"])) {
    return {
      output:
        "Frontend is one of my strongest areas. I build responsive, accessible interfaces with React, Next.js, TypeScript, Tailwind CSS, Mantine, Shadcn UI, Framer Motion, and GSAP.",
      kind: "success",
    };
  }

  if (includesAny(query, ["backend", " api", "server", "database"])) {
    return {
      output:
        "For backend work, I build secure APIs and business logic with Node.js, Express, and NestJS, usually backed by MongoDB and clean validation, authentication, and data models.",
      kind: "success",
    };
  }

  if (includesAny(query, ["mobile", "react native", "expo", "phone app"])) {
    return {
      output:
        "I build cross-platform mobile applications with React Native and Expo, focusing on native-feeling interactions, reliable data flows, and maintainable shared architecture.",
      kind: "success",
    };
  }

  if (includesAny(query, ["artificial intelligence", " ai ", "ai agent", "llm", "claude"])) {
    return {
      output:
        "I integrate LLMs and AI agents into real products—from prompt and tool design to production workflows, guardrails, structured outputs, and useful user experiences.",
      kind: "success",
    };
  }

  if (includesAny(query, ["testing", "test code", "quality", "bugs"])) {
    return {
      output:
        "I protect quality with typed contracts, focused unit and integration tests, validation at system boundaries, careful review, and end-to-end checks for the flows users depend on most.",
      kind: "success",
    };
  }

  if (includesAny(query, ["performance", "fast website", "optimization", "optimize"])) {
    return {
      output:
        "I treat performance as a product feature: measure first, reduce unnecessary client work, optimize rendering and data access, load assets intentionally, and verify the result on realistic devices.",
      kind: "success",
    };
  }

  if (includesAny(query, ["accessibility", "accessible", "a11y"])) {
    return {
      output:
        "I build with semantic HTML, keyboard navigation, readable contrast, sensible focus states, reduced-motion support, and screen-reader-friendly labels from the start.",
      kind: "success",
    };
  }

  if (includesAny(query, ["security", "authentication", "jwt", "secure"])) {
    return {
      output:
        "I approach security in layers: validate inputs, enforce authorization server-side, protect secrets, use secure authentication patterns, minimize exposed data, and keep dependencies reviewed.",
      kind: "success",
    };
  }

  if (includesAny(query, ["learn", "keep up", "new technology", "new skill"])) {
    return {
      output:
        "I learn by building. I start from primary documentation, create a small working model, test the edge cases, and then apply the technology to a real product problem.",
      kind: "success",
    };
  }

  if (includesAny(query, ["goal", "future", "next step", "five years"])) {
    return {
      output:
        "My goal is to keep growing into an engineer who can shape products as well as implement them—especially full-stack systems and genuinely useful AI-powered experiences.",
      kind: "success",
    };
  }

  if (includesAny(query, ["available", "availability", "freelance", "full time", "part time"])) {
    return {
      output:
        "I’m open to discussing strong opportunities and interesting product work. Use the Contact Me button and tell me what you’re building.",
      kind: "success",
    };
  }

  if (includesAny(query, ["remote", "onsite", "relocate", "time zone", "timezone"])) {
    return {
      output:
        "I’m comfortable collaborating remotely and asynchronously. For location, timezone, or onsite requirements, contact me so we can discuss the exact role.",
      kind: "success",
    };
  }

  if (includesAny(query, ["salary", "rate", "budget", "cost", "price"])) {
    return {
      output:
        "Compensation depends on the role, scope, timeline, and level of ownership. Send me the details through Contact Me and we can discuss it directly.",
      kind: "success",
    };
  }

  if (includesAny(query, ["resume", "cv", "github", "linkedin", "code sample"])) {
    return {
      output:
        "The projects and skills on this page are the best overview of my work. Use Contact Me if you’d like my résumé, profiles, or relevant code samples.",
      kind: "success",
    };
  }

  if (includesAny(query, ["education", "degree", "university", "college"])) {
    return {
      output:
        "I haven’t added my education details to this portfolio yet. I’d rather leave that blank than invent information—feel free to ask me directly through Contact Me.",
      kind: "info",
    };
  }

  if (includesAny(query, ["where are you", "location", "where do you live", "country"])) {
    return {
      output:
        "I haven’t published my location in this portfolio. If it matters for an opportunity, contact me and I’ll share the relevant details directly.",
      kind: "info",
    };
  }

  if (includesAny(query, ["age", "married", "religion", "politics", "personal life"])) {
    return {
      output:
        "I keep sensitive personal details private here, but I’m happy to talk about my work, experience, and how I could contribute to your project.",
      kind: "info",
    };
  }

  if (includesAny(query, ["what is react", "explain react"])) {
    return {
      output:
        "React is a component-based JavaScript library for building user interfaces. I use it to create predictable, reusable, and highly interactive product experiences.",
      kind: "success",
    };
  }

  if (includesAny(query, ["what is nextjs", "what is next.js", "explain next"])) {
    return {
      output:
        "Next.js is a React framework for building full-stack web applications with routing, server rendering, data fetching, and production optimizations built in.",
      kind: "success",
    };
  }

  if (includesAny(query, ["what is typescript", "explain typescript"])) {
    return {
      output:
        "TypeScript adds static types to JavaScript. I use it to make contracts clearer, catch mistakes earlier, and keep growing codebases easier to change safely.",
      kind: "success",
    };
  }

  if (includesAny(query, ["what is full stack", "full-stack developer", "full stack developer"])) {
    return {
      output:
        "A full-stack developer works across the interface, server, data, and delivery layers. For me, it means being able to own a feature from idea to production.",
      kind: "success",
    };
  }

  if (includesAny(query, ["joke", "make me laugh", "something funny"])) {
    return {
      output:
        "Why did the developer go broke? Because he used up all his cache. I promise my code is better than my jokes.",
      kind: "success",
    };
  }

  if (includesAny(query, ["time", "date", "day is it"])) {
    return {
      output: `Your local time is ${new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date())}.`,
      kind: "success",
    };
  }

  if (includesAny(query, ["weather", "temperature", "forecast"])) {
    return {
      output:
        "I don’t have live weather access in this offline terminal. I’d rather say that clearly than make up a forecast.",
      kind: "info",
    };
  }

  if (includesAny(query, ["thank", "nice work", "good job", "well done"])) {
    return {
      output: "Thank you—I appreciate that. I’m glad you stopped by my portfolio!",
      kind: "success",
    };
  }

  if (includesAny(query, ["bye", "goodbye", "see you"])) {
    return {
      output: "Thanks for visiting. If you have a project in mind, let’s talk!",
      kind: "success",
    };
  }

  if (
    query === "contact" ||
    query.includes("contact") ||
    query.includes("email") ||
    query.includes("hire") ||
    query.includes("get in touch")
  ) {
    return {
      output:
        "Use the Contact Me button in this hero to start a conversation with me.",
      kind: "success",
    };
  }

  return null;
}

export function InteractiveTerminal() {
  const [entries, setEntries] = useState<TerminalEntry[]>(INITIAL_ENTRIES);
  const [value, setValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isThinking, setIsThinking] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries]);

  const submitCommand = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim();

    if (!command) return;

    setCommandHistory((previous) => [...previous, command]);
    setHistoryIndex(commandHistory.length + 1);
    setValue("");

    if (normalize(command) === "clear") {
      setEntries([]);
      return;
    }

    const localResponse = getLocalResponse(command);

    if (localResponse) {
      setEntries((previous) => [
        ...previous,
        { id: nextId.current++, command, ...localResponse },
      ]);
      return;
    }

    const responseId = nextId.current++;
    const history = entries
      .filter((entry): entry is TerminalEntry & { command: string } => Boolean(entry.command))
      .slice(-6)
      .map((entry) => ({ user: entry.command, assistant: entry.output }));

    setIsThinking(true);
    setEntries((previous) => [
      ...previous,
      { id: responseId, command, output: "Thinking…", kind: "info" },
    ]);

    try {
      const response = await fetch("/api/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: command, history }),
      });
      const result = (await response.json()) as OnlineTerminalResponse;

      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === responseId
            ? {
                ...entry,
                output: result.answer || result.error || "The online assistant is unavailable.",
                kind: response.ok && result.answer ? "success" : "error",
              }
            : entry,
        ),
      );
    } catch {
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === responseId
            ? {
                ...entry,
                output: "I could not reach the online assistant. Please try again.",
                kind: "error",
              }
            : entry,
        ),
      );
    } finally {
      setIsThinking(false);
    }
  };

  const handleHistory = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;

    event.preventDefault();
    const nextIndex =
      event.key === "ArrowUp"
        ? Math.max(0, historyIndex - 1)
        : Math.min(commandHistory.length, historyIndex + 1);

    setHistoryIndex(nextIndex);
    setValue(commandHistory[nextIndex] ?? "");
  };

  return (
    <div
      style={{
        background: "rgba(9, 12, 17, 0.88)",
        border: "1px solid rgba(139,233,253,0.22)",
        boxShadow:
          "0 28px 80px rgba(0,0,0,0.6), 0 0 50px rgba(34,211,238,0.06)",
        backdropFilter: "blur(18px)",
        width: "100%",
      }}
      className="overflow-hidden rounded-2xl"
    >
      <div
        style={{ borderBottom: "1px solid rgba(215,226,234,0.1)" }}
        className="flex items-center gap-2 px-3 py-2.5"
      >
        {[
          ["close", "#FF5F56"],
          ["minimize", "#FFBD2E"],
          ["maximize", "#27C93F"],
        ].map(([label, color]) => (
          <span
            key={label}
            aria-hidden="true"
            style={{
              width: 9,
              height: 9,
              borderRadius: 999,
              background: color,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 7,
            color: COLORS.muted,
            fontFamily: FONT_FAMILY.mono,
            fontSize: "0.62rem",
          }}
        >
          zain-cli — online
        </span>
      </div>

      <div
        ref={outputRef}
        aria-live="polite"
        aria-label="Terminal output"
        style={{
          fontFamily: FONT_FAMILY.mono,
          fontSize: "0.72rem",
          lineHeight: 1.55,
          height: 260,
          scrollbarColor: "rgba(139,233,253,0.3) transparent",
        }}
        className="overflow-y-auto px-3 py-3"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="mb-3 last:mb-0">
            {entry.command && (
              <div style={{ color: COLORS.text }}>
                <span style={{ color: COLORS.cyan }}>zain@portfolio:~$</span>{" "}
                {entry.command}
              </div>
            )}
            <div
              style={{
                color:
                  entry.kind === "error"
                    ? "#FF7B72"
                    : entry.kind === "info"
                      ? COLORS.muted
                      : "#A7F3D0",
                whiteSpace: "pre-wrap",
              }}
            >
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={submitCommand}
        style={{
          borderTop: "1px solid rgba(215,226,234,0.1)",
          fontFamily: FONT_FAMILY.mono,
        }}
        className="flex items-center gap-2 px-3 py-2.5"
      >
        <label htmlFor="hero-terminal-input" className="sr-only">
          Ask me a question
        </label>
        <span aria-hidden="true" style={{ color: COLORS.cyan, fontSize: "0.7rem" }}>
          $
        </span>
        <input
          id="hero-terminal-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleHistory}
          maxLength={240}
          autoComplete="off"
          spellCheck={false}
          placeholder="Ask me anything..."
          disabled={isThinking}
          className="min-w-0 flex-1 bg-transparent text-[0.72rem] outline-none placeholder:text-slate-600"
          style={{ color: COLORS.text }}
        />
        <button
          type="submit"
          aria-label="Run command"
          disabled={isThinking}
          className="rounded-md px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-wider transition-opacity hover:opacity-70"
          style={{ color: COLORS.cyan, border: "1px solid rgba(34,211,238,0.28)" }}
        >
          {isThinking ? "..." : "Run"}
        </button>
      </form>
    </div>
  );
}
