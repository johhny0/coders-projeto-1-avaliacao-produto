"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const feedbackSchema = z.object({
  score: z.number().int().min(1).max(5),
  comment: z.string().min(1, "Comentário é obrigatório").max(1000, "Comentário muito longo"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  productId: string;
  onSuccess?: () => void;
}

export function FeedbackForm({ productId, onSuccess }: FeedbackFormProps) {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      score: 0,
      comment: "",
    },
  });

  const selectedScore = watch("score");

  const onSubmit = async (values: FeedbackFormValues) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/v1/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: productId,
          score: values.score,
          comment: values.comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao enviar avaliação");
        return;
      }

      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (err) {
      setError("Erro ao enviar avaliação");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="font-display text-xl">Adicionar avaliação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Nota</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoveredScore !== null ? hoveredScore : selectedScore) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("score", star, { shouldValidate: true })}
                    onMouseEnter={() => setHoveredScore(star)}
                    onMouseLeave={() => setHoveredScore(null)}
                    className="p-1 transition-colors"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        isActive ? "fill-ink text-ink" : "text-graphite/40",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            {errors.score && (
              <p className="text-sm text-red-600">Selecione uma nota de 1 a 5</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comentário</Label>
            <textarea
              id="comment"
              {...register("comment")}
              className="w-full rounded border border-rule bg-paper px-3 py-2 text-[15px] text-ink placeholder:text-graphite/60 focus:outline-none focus:ring-2 focus:ring-ink/10"
              rows={4}
              placeholder="Compartilhe sua experiência com este produto..."
            />
            {errors.comment && (
              <p className="text-sm text-red-600">{errors.comment.message}</p>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && (
            <p className="text-sm text-green-600">Avaliação enviada com sucesso!</p>
          )}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar avaliação"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
