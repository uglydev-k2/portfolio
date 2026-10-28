"use client";

import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Button } from "@/components/ui/Button";
import { usePointerFx } from "@/components/ui/pointer-fx";
import { projects, type Project } from "@/data/projects";

const filters = ["All", "Web", "Design"] as const;
type Filter = (typeof filters)[number];

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const closeStudy = useCallback(() => setSelected(null), []);
  const reduce = useReducedMotion();
  const visible = projects.filter((project) => filter === "All" || project.category === filter);

  return (
    <div>
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <FilterButton key={item} active={filter === item} onClick={() => setFilter(item)}>
            {item}
          </FilterButton>
        ))}
      </div>

      <m.ul layout className="mt-8 grid list-none gap-5 p-0 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <m.li
              key={project.title}
              layout
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <TiltCard project={project} onOpen={() => setSelected(project)} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">Nothing in this category yet.</p>
      ) : null}

      <CaseStudy project={selected} onClose={closeStudy} />
    </div>
  );
}

function canTilt() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  const pointer = usePointerFx();
  return (
    <button
      type="button"
      data-cursor="pointer"
      aria-pressed={active}
      onClick={onClick}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      onPointerDown={pointer.onPointerDown}
      className={`relative isolate h-10 overflow-hidden rounded-full border px-4 font-mono text-[13px] ${
        active ? "border-accent bg-accent text-accent-fg" : "border-border-strong text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TiltCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const cardRef = useRef<HTMLButtonElement>(null);

  function onPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const card = cardRef.current;
    if (!card || !canTilt()) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transition = "transform 40ms linear";
    card.style.transform = `rotateX(${(-y * 9).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
  }

  function onPointerLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.45s ease";
    card.style.transform = "";
  }

  return (
    <div className="[perspective:1000px]">
      <button
        ref={cardRef}
        type="button"
        data-cursor="card"
        aria-label={`Open the ${project.title} case study`}
        onClick={onOpen}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group relative block w-full overflow-hidden rounded-[18px] border border-border bg-card text-left [transform-style:preserve-3d]"
      >
        <span className="relative block aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
          />
          <span className="preview-veil">View case study</span>
        </span>
        <span className="block p-5">
          <span className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">{project.category}</span>
          <span className="mt-2 block text-xl font-medium tracking-[-0.02em]">{project.title}</span>
          <span className="mt-2 block text-sm leading-relaxed text-muted">{project.description}</span>
        </span>
      </button>
    </div>
  );
}

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dialog = dialogRef.current;
    const focusable = () =>
      dialog
        ? [...dialog.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
            (element) => !element.hasAttribute("disabled"),
          )
        : [];

    focusable()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <m.div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close case study"
            className="absolute inset-0 bg-[#06080a]/70"
            onClick={onClose}
          />
          <m.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-[24px] border border-border bg-background p-5 sm:max-w-3xl sm:rounded-[24px] sm:p-8"
            initial={reduce ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? undefined : { y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-[12px] tracking-[0.14em] text-accent uppercase">
                {project.category} · {project.year}
              </p>
              <button
                type="button"
                data-cursor="pointer"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border"
              >
                <span className="sr-only">Close</span>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <h3 id={titleId} className="mt-4 text-3xl font-light tracking-[-0.04em] sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-3 font-mono text-[13px] text-muted">{project.role}</p>
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[18px] border border-border">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 768px) 720px, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-6 text-pretty leading-relaxed">{project.description}</p>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{project.outcome}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-border-strong px-3 py-1 font-mono text-xs">
                  {tag}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={project.liveUrl} external>
                Live Demo
              </Button>
              <Button href={project.githubUrl} external variant="secondary">
                GitHub
              </Button>
            </div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
