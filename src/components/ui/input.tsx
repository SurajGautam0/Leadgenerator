import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-lg border border-border bg-card px-3.5 text-sm text-fg placeholder:text-subtle",
        "transition-[box-shadow,border-color] duration-150 ease-out",
        "focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring/20",
        "disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
