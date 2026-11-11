"use client";

import { useEffect, useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "cn";

interface ReviewSummaryProps {
  productId: string;
  className?: string;
}

export function ReviewSummary({ productId, className }: ReviewSummaryProps) {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSummary = async () => {
      setIsLoading(true);
      setError("");
      setSummary("");

      try {
        const response = await fetch(`/api/products/${productId}/review-summary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!isMounted) {
          return;
        }

        if (response.status === 204) {
          setShouldRender(false);
          return;
        }

        const data = await response.json();

        if (!isMounted) {
          return;
        }

        if (response.ok && data.summary) {
          setSummary(data.summary);
          setShouldRender(true);
        } else {
          setShouldRender(false);
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }
        setShouldRender(false);
        setError("");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSummary();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (!shouldRender && !isLoading) {
    return null;
  }

  return (
    <section className={cn("mt-10 border-t border-rule pt-8", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="size-5 text-ink" aria-hidden />
        <h2 className="font-display text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-ink">
          Resumo das avaliações com IA
        </h2>
      </div>

      {isLoading ? (
        <div className="rounded border border-rule bg-surface p-6 flex items-center gap-3">
          <Loader2 className="size-5 animate-spin text-ink" aria-hidden />
          <p className="text-[15px] text-graphite">Gerando resumo com IA...</p>
        </div>
      ) : null}

      {!isLoading && shouldRender && summary ? (
        <div className="rounded border border-rule bg-surface p-6">
          <p className="text-[15px] leading-[1.75] text-graphite whitespace-pre-wrap">
            {summary}
          </p>
        </div>
      ) : null}

      {!isLoading && shouldRender && error ? (
        <div className="rounded border border-rose/30 bg-rose/[0.06] p-6">
          <p className="text-[15px] text-rose/90">{error}</p>
        </div>
      ) : null}
    </section>
  );
}
