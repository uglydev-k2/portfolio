"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  radius: number;
  speed: number;
};

export function HeroField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nearRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!canvas || reduce.matches) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const pointer = { x: 0.62, y: 0.28 };
    const count = window.innerWidth < 700 ? 24 : 52;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1 + Math.random() * 1.8,
      speed: 0.2 + Math.random() * 0.8,
    }));

    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, canvas.offsetWidth) * ratio;
      canvas.height = Math.max(1, canvas.offsetHeight) * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;
      pointer.x = (event.clientX - bounds.left) / bounds.width;
      pointer.y = (event.clientY - bounds.top) / bounds.height;
      const shiftX = (pointer.x - 0.5) * 28;
      const shiftY = (pointer.y - 0.5) * 18;
      if (nearRef.current) nearRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      if (farRef.current) farRef.current.style.transform = `translate3d(${shiftX * -0.45}px, ${shiftY * -0.35}px, 0)`;
    };

    const draw = (time: number) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#0b6e70";
      context.fillStyle = accent;
      for (const particle of particles) {
        const driftX = Math.sin(time * 0.00025 + particle.speed * 8) * 14;
        const driftY = Math.cos(time * 0.0002 + particle.radius) * 12;
        const x = particle.x * width + (pointer.x - 0.5) * 46 * particle.speed + driftX;
        const y = particle.y * height + (pointer.y - 0.5) * 32 * particle.speed + driftY;
        context.globalAlpha = 0.28 + particle.speed * 0.25;
        context.beginPath();
        context.arc(x, y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div ref={farRef} className="hero-orb hero-orb-far" />
      <div ref={nearRef} className="hero-orb hero-orb-near" />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
