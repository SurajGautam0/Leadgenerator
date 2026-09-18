"use client";

import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  to = "/",
  compact,
}: {
  className?: string;
  to?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn("inline-flex items-center gap-2.5 text-fg no-underline", className)}
    >
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-md bg-primary text-primary-fg"
      >
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
          <path
            d="M1.5 9.5c2-3 3.2-3 5 0s3 3 4.8 0 3-3 3.7 0"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-[13px] font-semibold tracking-[-0.02em]">
          Wavesolution
        </span>
        {!compact && (
          <span className="block text-[10px] font-medium tracking-[0.18em] text-muted uppercase">
            Lead
          </span>
        )}
      </span>
    </Link>
  );
}
