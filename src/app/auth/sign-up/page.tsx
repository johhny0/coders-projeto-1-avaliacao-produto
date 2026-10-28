"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Primeiro nome é obrigatório"),
    lastName: z.string().min(1, "Sobrenome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[12.5px] leading-snug text-rose">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/auth/sign-up/success");
      } else {
        const result = await response.json();
        setError(result.error || "Erro ao criar conta");
      }
    } catch (err) {
      setError("Erro ao criar conta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-dvh bg-surface lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <aside className="hidden flex-col justify-between border-r border-rule bg-paper px-10 py-10 lg:flex xl:px-14 xl:py-12">
        <Brand />

        <div className="max-w-[460px] py-10">
          <h2 className="font-display text-[clamp(2.6rem,4.2vw,4rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-ink">
            Sua opinião vira{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span
                aria-hidden
                className="absolute inset-x-[-0.05em] bottom-[0.06em] h-[0.34em] -rotate-[0.6deg] bg-marker"
              />
              <span className="relative">referência</span>
            </span>
            .
          </h2>

          <p className="mt-6 max-w-[38ch] text-[15px] leading-[1.65] text-graphite">
            Crie sua conta para avaliar o que você usa e ajudar outras pessoas a
            escolher melhor.
          </p>
        </div>

        <div className="max-w-[360px] border-t border-rule pt-5">
          <p className="font-display text-[19px] leading-[1.35] font-medium tracking-[-0.01em] text-ink">
            O que a embalagem não conta, quem usa conta.
          </p>
        </div>
      </aside>

      <main className="flex flex-col px-6 py-8 sm:px-10 lg:justify-center lg:py-12 xl:px-16">
        <div className="mb-10 lg:hidden">
          <Brand />
        </div>

        <div className="mx-auto w-full max-w-[420px]">
          <h1 className="font-display text-[clamp(2.25rem,5vw,2.75rem)] leading-[1] font-extrabold tracking-[-0.04em] text-ink">
            Crie sua conta
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-graphite">
            Leva menos de um minuto. Depois é só avaliar.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="mt-8 space-y-5"
          >
            {error ? (
              <Alert
                variant="destructive"
                className="border-rose/30 bg-rose/[0.06]"
              >
                <AlertTriangle aria-hidden />
                <AlertTitle>Não foi possível criar sua conta</AlertTitle>
                <AlertDescription className="text-rose/85">
                  {error}
                </AlertDescription>
              </Alert>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                id="firstName"
                label="Primeiro nome"
                error={errors.firstName?.message}
              >
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  aria-invalid={errors.firstName ? true : undefined}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  {...register("firstName")}
                />
              </Field>

              <Field
                id="lastName"
                label="Sobrenome"
                error={errors.lastName?.message}
              >
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  aria-invalid={errors.lastName ? true : undefined}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  {...register("lastName")}
                />
              </Field>
            </div>

            <Field id="email" label="E-mail" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
            </Field>

            <Field id="password" label="Senha" error={errors.password?.message}>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password")}
              />
            </Field>

            <Field
              id="confirmPassword"
              label="Confirme sua senha"
              error={errors.confirmPassword?.message}
            >
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={errors.confirmPassword ? true : undefined}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword")}
              />
            </Field>

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              aria-busy={isLoading}
              className="h-12 w-full text-[15px]"
            >
              {isLoading ? (
                <>
                  <span
                    aria-hidden
                    className="size-4 animate-spin rounded-full border-2 border-white/35 border-t-white motion-reduce:animate-none"
                  />
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>

          <p className="mt-6 border-t border-rule pt-4 text-[12.5px] leading-relaxed text-graphite">
            Sua conta fica ativa assim que o cadastro é concluído.
          </p>
        </div>
      </main>
    </div>
  );
}
