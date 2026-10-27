import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "cn";
import { Brand } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";

export default function SignUpSuccessPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-6 py-12">
      <div className="w-full max-w-[540px]">
        <div className="relative border border-ink/15 bg-surface px-7 py-9 sm:px-10 sm:py-11">
          <span
            aria-hidden
            className="absolute -top-3 left-10 size-6 rounded-full border border-rule bg-paper"
          />

          <div className="flex items-start justify-between gap-6">
            <Brand />
            <span className="rotate-[-4deg] border-2 border-cobalt/70 px-2.5 py-1 font-display text-[11px] leading-none font-bold text-cobalt">
              conta criada
            </span>
          </div>

          <div className="mt-12 flex size-14 items-center justify-center bg-ink">
            <Check
              aria-hidden
              strokeWidth={2.5}
              className="size-7 text-marker"
            />
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,3.6rem)] leading-[0.92] font-extrabold tracking-[-0.045em] text-ink">
            Conta criada.
          </h1>

          <p className="mt-4 max-w-[40ch] text-[15px] leading-[1.65] text-graphite">
            Seu perfil está pronto. Agora você pode avaliar o que usa e ajudar
            outras pessoas a escolher melhor.
          </p>

          <div className="mt-8 border-t border-rule pt-6">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-6 text-[15px]",
              )}
            >
              Ir para o início
            </Link>
          </div>
        </div>

        <p className="mt-4 px-1 text-[12px] text-graphite">
          Cadastro concluído com sucesso.
        </p>
      </div>
    </div>
  );
}
