"use client";

import { useEffect, useRef } from "react";

const finePointer = "(hover: hover) and (pointer: fine)";
const textFields = "input, textarea, select, [contenteditable='true']";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const fine = window.matchMedia(finePointer);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let ringX = x;
    let ringY = y;
    let frame = 0;
    let tracking = false;

    const reveal = (event: PointerEvent) => {
      const target = event.target;
      const typing = target instanceof Element && target.closest(textFields);
      const hidden = typing ? "0" : "1";
      dot.style.opacity = hidden;
      ring.style.opacity = hidden;
      if (!typing && target instanceof Element) {
        ring.dataset.kind = target.closest("[data-cursor]")?.getAttribute("data-cursor") ?? "";
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      reveal(event);
    };

    const stop = () => {
      tracking = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", reveal);
      document.documentElement.classList.remove("has-custom-cursor");
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const start = () => {
      if (tracking) return;
      tracking = true;
      document.documentElement.classList.add("has-custom-cursor");
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerover", reveal);
      const loop = () => {
        ringX += (x - ringX) * 0.18;
        ringY += (y - ringY) * 0.18;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };

    const sync = () => {
      if (fine.matches && !reduce.matches) start();
      else stop();
    };

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      stop();
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
