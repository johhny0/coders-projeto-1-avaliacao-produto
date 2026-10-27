import Link from "next/link";
import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth/session";
import { FeedbackList } from "@/components/feedback/feedback-list";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { AuthRequired } from "@/components/feedback/auth-required";

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const session = await getSession();
  const { data: product } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  const { data: feedbacksData } = await supabaseAdmin
    .from("products_feedbacks")
    .select("id, score, comment, created_at, created_by")
    .eq("product_id", id)
    .order("created_at", { ascending: false });

  const feedbacks = await Promise.all(
    (feedbacksData || []).map(async (feedback) => {
      const { data: account } = await supabaseAdmin
        .from("accounts")
        .select("first_name, last_name")
        .eq("id", feedback.created_by)
        .maybeSingle();

      return {
        id: feedback.id,
        score: feedback.score,
        comment: feedback.comment,
        created_at: feedback.created_at,
        author: account
          ? { firstName: account.first_name, lastName: account.last_name }
          : null,
      };
    }),
  );

  if (!product) {
    return (
      <div className="flex min-h-dvh flex-col bg-paper">
        <div className="mx-auto flex w-full max-w-[800px] flex-1 flex-col px-6 md:px-10">
            <Header
              action={
              <Link
                href="/"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
              >
                Voltar
              </Link>
              }
            />
          <main className="flex flex-1 items-center justify-center py-12">
            <div className="text-center">
              <h1 className="font-display text-2xl font-bold text-ink">
                Produto não encontrado
              </h1>
              <p className="mt-2 text-graphite">
                O produto que você procura não existe ou foi removido.
              </p>
              <Link
                href="/"
                className={cn(buttonVariants({ size: "lg" }), "mt-6")}
              >
                Voltar para home
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-[800px] flex-1 flex-col px-6 md:px-10">
        <Header
          action={
            <Link
              href="/"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              Voltar
            </Link>
          }
        />

        <main className="flex-1 py-10 md:py-14">
          <article>
            {product.image_url ? (
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded border border-rule md:h-96">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : null}
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.04em] text-ink">
              {product.name}
            </h1>
            {product.description ? (
              <p className="mt-6 text-[16px] leading-[1.75] text-graphite">
                {product.description}
              </p>
            ) : null}
            {product.external_link ? (
              <div className="mt-8">
                <Link
                  href={product.external_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: "lg" }))}
                >
                  Ver produto externo
                </Link>
              </div>
            ) : null}
          </article>

          <FeedbackList feedbacks={feedbacks} />

          {session?.userId ? <FeedbackForm productId={id} /> : <AuthRequired />}
        </main>

        <footer className="border-t border-rule py-6 text-[13px] text-graphite">
          O que a embalagem não conta, quem usa conta.
        </footer>
      </div>
    </div>
  );
}
