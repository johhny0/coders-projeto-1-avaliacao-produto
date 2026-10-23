import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Conta criada com sucesso!</CardTitle>
          <CardDescription>Sua conta foi criada com sucesso.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/sign-up">
            <Button className="w-full">Voltar</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
