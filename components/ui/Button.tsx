"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { usePointerFx } from "@/components/ui/pointer-fx";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary: "border border-transparent bg-accent text-accent-fg hover:brightness-95",
  secondary: "border border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent",
};

const base =
  "relative isolate inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-[15px] font-semibold transition-[background-color,border-color,color,filter] motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-60";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  download?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
  className,
}: LinkProps) {
  const pointer = usePointerFx();
  const classes = buttonClasses(variant, cn("w-full sm:w-auto", className));

  return (
    <a
      href={href}
      data-cursor="pointer"
      className={classes}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      onPointerDown={pointer.onPointerDown}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...(download ? { download: "" } : {})}
    >
      {children}
      {external ? <ExternalIcon /> : null}
      {external ? <span className="sr-only"> (opens in new tab)</span> : null}
    </a>
  );
}

type ActionProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function ActionButton({
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  onClick,
}: ActionProps) {
  const pointer = usePointerFx();

  return (
    <button
      type={type}
      data-cursor="pointer"
      className={buttonClasses(variant, className)}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      onPointerDown={pointer.onPointerDown}
    >
      {children}
    </button>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M7 4h5v5" />
    </svg>
  );
}
