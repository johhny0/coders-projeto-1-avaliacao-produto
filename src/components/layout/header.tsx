import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";
import { Brand } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";
import { LogoutButton } from "@/components/layout/logout-button";
import { getSession } from "@/lib/auth/session";

function getDiceBearAvatar(email: string) {
  const seed = encodeURIComponent(email.trim().toLowerCase());
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}&backgroundType=gradientLinear&radius=50`;
}

export async function Header({ action }: { action?: ReactNode }) {
  const session = await getSession();

  return (
    <header className="flex items-center justify-between border-b border-rule py-5 md:py-6">
      <Brand />
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <div className="flex items-center gap-3">
              <img
                src={getDiceBearAvatar(session.email)}
                alt=""
                className="hidden size-9 rounded-full border border-rule bg-paper sm:block"
              />
              <div className="text-right">
                <p className="max-w-[5rem] truncate text-[13px] font-medium leading-tight text-ink sm:max-w-[10rem]">
                  {session.firstName} {session.lastName}
                </p>
                <p className="hidden text-[12px] leading-tight text-graphite sm:block">
                  {session.email}
                </p>
              </div>
            </div>
            <LogoutButton />
          </>
        ) : (
          <Link
            href="/auth/sign-in"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
          >
            Entrar
          </Link>
        )}
        {action}
      </div>
    </header>
  );
}

export function HeaderFallback({ action }: { action?: ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-rule py-5 md:py-6">
      <Brand />
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="h-8 w-20 animate-pulse rounded bg-rule"
        />
        {action}
      </div>
    </header>
  );
}
