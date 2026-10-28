"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { usePointerFx } from "@/components/ui/pointer-fx";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPointer = usePointerFx();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors",
        solid || open ? "border-border bg-header backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <Container>
        <div className="relative flex h-16 items-center justify-between gap-3">
          <a
            href="#top"
            data-cursor="pointer"
            className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
            aria-label={`${profile.name}, home`}
          >
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-ok shadow-[0_0_0_4px_color-mix(in_srgb,var(--ok)_18%,transparent)]"
            />
            {profile.name}
          </a>

          <nav aria-label="Primary" className="hidden rounded-full border border-border bg-header p-0.5 md:block">
            <NavList active={active} onNavigate={() => undefined} />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPath}
              download
              data-cursor="pointer"
              className="hidden h-9 items-center rounded-full border border-border-strong px-3 text-[13px] font-semibold sm:inline-flex"
            >
              CV
            </a>
            <a
              href="#contact"
              data-cursor="pointer"
              className="hidden h-9 items-center rounded-full bg-accent px-3 text-[13px] font-semibold text-accent-fg sm:inline-flex"
            >
              Contact
            </a>
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              data-cursor="pointer"
              className="relative isolate inline-flex size-11 items-center justify-center overflow-hidden rounded-lg border border-border md:hidden"
              onPointerMove={menuPointer.onPointerMove}
              onPointerLeave={menuPointer.onPointerLeave}
              onPointerDown={menuPointer.onPointerDown}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((current) => !current)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          <nav
            id="site-menu"
            aria-label="Primary"
            hidden={!open}
            className="absolute inset-x-0 top-full z-50 border-b border-border bg-background px-2 py-3 md:hidden"
          >
            <NavList
              active={active}
              stacked
              firstRef={firstLinkRef}
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </div>
      </Container>
    </header>
  );
}

function NavList({
  active,
  onNavigate,
  stacked = false,
  firstRef,
}: {
  active: string | null;
  onNavigate: () => void;
  stacked?: boolean;
  firstRef?: RefObject<HTMLAnchorElement | null>;
}) {
  return (
    <ul className={cn("flex gap-1", stacked ? "flex-col" : "items-center")}>
      {navItems.map((item, index) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              ref={index === 0 ? firstRef : undefined}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              data-cursor="pointer"
              className={cn(
                "block rounded-full px-3 py-2 font-mono text-[13px] font-medium",
                isActive ? "text-accent" : "text-muted hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
