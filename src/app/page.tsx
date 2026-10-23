import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Bem-vindo</h1>
        <Link href="/auth/sign-up">
          <Button>Criar Conta</Button>
        </Link>
      </div>
    </div>
  );
}
