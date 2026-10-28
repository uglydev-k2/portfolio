import type { ReactNode } from "react";
import type { SkillIcon } from "@/data/profile";

export function TechIcon({ icon }: { icon: SkillIcon }) {
  switch (icon) {
    case "html":
      return <Letters>HTML</Letters>;
    case "css":
      return <Letters>CSS</Letters>;
    case "javascript":
      return <Letters>JS</Letters>;
    case "typescript":
      return <Letters>TS</Letters>;
    case "react":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="8.5" ry="3.3" />
          <ellipse cx="12" cy="12" rx="8.5" ry="3.3" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8.5" ry="3.3" transform="rotate(120 12 12)" />
        </Glyph>
      );
    case "nextjs":
      return (
        <Glyph>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9 16V8l6 8V8" />
        </Glyph>
      );
    case "tailwind":
      return (
        <Glyph>
          <path d="M4 8c1.5 0 2-1.5 3.5-1.5S9.5 8 11 8s2-1.5 3.5-1.5S16.5 8 18 8" />
          <path d="M4 13c1.5 0 2-1.5 3.5-1.5S9.5 13 11 13s2-1.5 3.5-1.5S16.5 13 18 13" />
          <path d="M4 18c1.5 0 2-1.5 3.5-1.5S9.5 18 11 18s2-1.5 3.5-1.5S16.5 18 18 18" />
        </Glyph>
      );
    case "git":
      return (
        <Glyph>
          <circle cx="7" cy="6" r="2.1" />
          <circle cx="7" cy="18" r="2.1" />
          <circle cx="17" cy="12" r="2.1" />
          <path d="M7 8.1v7.8M7 12h8" />
        </Glyph>
      );
    case "figma":
      return (
        <Glyph>
          <path d="M14.5 5.5 19 10 8 21H4v-4L14.5 5.5z" />
          <path d="m12.5 7.5 4 4" />
        </Glyph>
      );
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}

function Letters({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="font-mono text-[10px] font-semibold tracking-tight">
      {children}
    </span>
  );
}

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
