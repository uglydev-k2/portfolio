"use client";

import type { PointerEvent } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function coarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

/** Magnetic pull and a click ripple. Both stay off for touch and reduced motion. */
export function usePointerFx() {
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    const el = event.currentTarget;
    if (coarsePointer() || prefersReducedMotion()) return;
    const bounds = el.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    const pullX = Math.max(-12, Math.min(12, x * 0.22));
    const pullY = Math.max(-8, Math.min(8, y * 0.28));
    el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.transform = "";
  }

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    const el = event.currentTarget;
    if (prefersReducedMotion()) return;
    const bounds = el.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    el.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  }

  return { onPointerMove, onPointerLeave, onPointerDown };
}
