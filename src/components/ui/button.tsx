import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-fg hover:opacity-90",
        secondary:
          "bg-card text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "bg-transparent text-fg hover:bg-fg/5",
        outline: "border border-border bg-transparent text-fg hover:bg-fg/4",
        danger: "bg-danger text-primary-fg hover:opacity-90",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-sm",
        md: "h-11 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-xl px-5 text-base",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
