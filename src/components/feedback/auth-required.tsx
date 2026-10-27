import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AuthRequired() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="font-display text-xl">Faça login para avaliar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[15px] leading-[1.7] text-graphite">
          Você precisa estar autenticado para adicionar uma avaliação neste produto.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/auth/sign-in" className={cn(buttonVariants({ size: "default" }))}>
            Entrar
          </Link>
          <Link href="/auth/sign-up" className={cn(buttonVariants({ variant: "outline", size: "default" }))}>
            Criar conta
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
