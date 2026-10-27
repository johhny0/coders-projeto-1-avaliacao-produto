import { Suspense } from "react";
import { Header, HeaderFallback } from "@/components/layout/header";
import { ProductList } from "@/components/products/product-list";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-[1220px] flex-1 flex-col px-6 md:px-10">
        <Suspense fallback={<HeaderFallback />}>
          <Header />
        </Suspense>

        <main className="flex-1 py-10 md:py-14">
          <div className="mb-10">
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-ink">
              Produtos
            </h1>
            <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-graphite">
              Descubra produtos avaliados pela comunidade.
            </p>
          </div>

          <ProductList />
        </main>

        <footer className="border-t border-rule py-6 text-[13px] text-graphite">
          O que a embalagem não conta, quem usa conta.
        </footer>
      </div>
    </div>
  );
}
