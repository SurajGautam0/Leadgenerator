import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-fg placeholder:text-subtle",
        "transition-[box-shadow,border-color] duration-150 ease-out",
        "focus:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring/20",
        className,
      )}
      {...props}
    />
  );
}
