import { cn, formatLkr, formatUsd } from "@/lib/utils";

interface PriceDisplayProps {
  usdAmount: number;
  usdToLkrRate: number;
  label?: string;
  theme?: "light" | "dark";
  size?: "sm" | "lg";
  className?: string;
}

export function PriceDisplay({
  usdAmount,
  usdToLkrRate,
  label = "From",
  theme = "light",
  size = "sm",
  className,
}: PriceDisplayProps) {
  const lkrAmount = formatLkr(usdAmount * usdToLkrRate);
  const usdLabel = `USD ${formatUsd(usdAmount)}`;
  const isDark = theme === "dark";
  const isLarge = size === "lg";

  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "flex items-baseline gap-2",
          isLarge ? "flex-col items-start gap-1 sm:flex-row sm:items-baseline" : "flex-wrap",
        )}
      >
        <span
          className={cn(
            "shrink-0 text-xs font-semibold uppercase tracking-[0.16em]",
            isDark ? "text-sky-200" : "text-sky-700",
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            "font-semibold leading-none",
            isLarge ? "text-3xl sm:text-4xl" : "text-lg",
            isDark ? "text-white" : "text-slate-950",
          )}
        >
          {lkrAmount}
        </span>
      </div>
      <span
        className={cn(
          "mt-2 inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold",
          isDark
            ? "bg-white/10 text-slate-200 ring-1 ring-white/15"
            : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
        )}
      >
        {usdLabel}
      </span>
    </div>
  );
}
