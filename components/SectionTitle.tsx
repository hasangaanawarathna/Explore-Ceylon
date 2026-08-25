import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
  center?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: SectionTitleProps) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm sm:tracking-[0.24em]",
          dark ? "text-sky-300" : "text-sky-700",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 text-2xl font-semibold tracking-tight text-balance sm:mt-4 sm:text-4xl",
          dark ? "text-white" : "text-slate-950",
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "mt-3 text-sm leading-7 sm:mt-4 sm:text-base sm:leading-8",
          dark ? "text-slate-300" : "text-slate-600",
        )}
      >
        {description}
      </p>
    </div>
  );
}
