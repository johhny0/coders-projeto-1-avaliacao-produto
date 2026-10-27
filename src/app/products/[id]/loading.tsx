import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper" aria-busy="true">
      <div className="mx-auto flex w-full max-w-[800px] flex-1 flex-col px-6 md:px-10">
        <header className="flex items-center justify-between border-b border-rule py-5 md:py-6">
          <Link href="/" className="font-display font-bold text-ink">
            Avalia
          </Link>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Voltar
          </Link>
        </header>

        <main className="flex-1 space-y-6 py-10 md:py-14">
          <p className="sr-only">Loading product...</p>
          <div className="h-10 w-2/3 animate-pulse rounded bg-rule" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-rule" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-rule" />
          </div>
          <div className="h-10 w-40 animate-pulse rounded bg-rule" />
        </main>
      </div>
    </div>
  );
}
