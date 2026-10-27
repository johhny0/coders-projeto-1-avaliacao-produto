import Link from "next/link";
import { cn } from "cn";

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Avalia — ir para o início"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt",
        className,
      )}
    >
      <span aria-hidden className="grid size-7 place-items-center bg-ink">
        <span className="flex items-end gap-[2.5px]">
          <span className="h-1.5 w-[3px] bg-marker" />
          <span className="h-2.5 w-[3px] bg-marker" />
          <span className="h-3.5 w-[3px] bg-marker" />
        </span>
      </span>
      <span className="font-display text-[21px] leading-none font-extrabold tracking-[-0.04em] text-ink">
        avalia
      </span>
    </Link>
  );
}
