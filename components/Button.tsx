import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-sky-600 text-white shadow-lg shadow-sky-600/20 hover:-translate-y-0.5 hover:bg-sky-500",
  secondary:
    "bg-white/10 text-white ring-1 ring-white/20 backdrop-blur hover:bg-white/15",
  outline:
    "bg-white text-slate-950 ring-1 ring-slate-200 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};

interface ButtonProps extends ComponentPropsWithoutRef<typeof Link> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}