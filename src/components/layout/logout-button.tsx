"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const logout = async () => {
    setError("");
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/v1/sign-out", { method: "POST" });

      if (!response.ok) {
        setError("Não foi possível sair. Tente novamente.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("Não foi possível sair. Verifique sua conexão e tente novamente.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        className="sm:h-8 sm:px-3 sm:text-[13px]"
        aria-label="Sair da conta"
        aria-busy={isLoggingOut}
        disabled={isLoggingOut}
        onClick={logout}
      >
        <LogOut aria-hidden="true" />
      </Button>
      {error ? (
        <span role="alert" className="max-w-40 text-right text-xs text-rose">
          {error}
        </span>
      ) : null}
    </>
  );
}
