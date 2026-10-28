"use client";

import { useEffect } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function toggleTheme() {
  const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
  const apply = () => {
    applyTheme(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && typeof document.startViewTransition === "function") {
    document.startViewTransition(apply);
    return;
  }
  apply();
}

/** Keeps an unset choice in sync with the system preference. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === "light" || stored === "dark") return;
      applyTheme(media.matches ? "dark" : "light");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return children;
}
