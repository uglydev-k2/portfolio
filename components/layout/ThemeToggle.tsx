"use client";

import { toggleTheme } from "@/components/layout/ThemeProvider";
import { usePointerFx } from "@/components/ui/pointer-fx";

export function ThemeToggle() {
  const pointer = usePointerFx();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      onPointerDown={pointer.onPointerDown}
      aria-label="Toggle color theme"
      data-cursor="pointer"
      className="relative isolate inline-flex size-11 items-center justify-center overflow-hidden rounded-lg border border-border text-foreground hover:bg-hover"
    >
      <SunIcon />
      <MoonIcon />
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="theme-icon-sun size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="theme-icon-moon size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 7.5 7.5 0 1 0 20 14.5z" />
    </svg>
  );
}
