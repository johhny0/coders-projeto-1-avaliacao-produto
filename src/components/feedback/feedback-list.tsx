import { Star } from "lucide-react";
import { cn } from "cn";

interface Feedback {
  id: string;
  score: number;
  comment: string;
  created_at: string;
  author: { firstName: string; lastName: string } | null;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

export function FeedbackList({ feedbacks }: FeedbackListProps) {
  if (feedbacks.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-ink">Avaliações</h2>
        <p className="mt-3 text-[15px] text-graphite">
          Ainda não há avaliações para este produto. Seja o primeiro a avaliar!
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-ink">
        Avaliações ({feedbacks.length})
      </h2>
      <div className="mt-4 space-y-4">
        {feedbacks.map((feedback) => (
          <article
            key={feedback.id}
            className="rounded border border-rule p-4 md:p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-4 w-4",
                        feedback.score >= star
                          ? "fill-ink text-ink"
                          : "text-graphite/40",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-graphite">{feedback.score}/5</span>
              </div>
              {feedback.author && (
                <p className="text-sm text-graphite">
                  {feedback.author.firstName} {feedback.author.lastName}
                </p>
              )}
            </div>
            <p className="mt-3 text-[15px] leading-[1.7] text-ink whitespace-pre-wrap">
              {feedback.comment}
            </p>
            <p className="mt-3 text-xs text-graphite/70">
              {new Date(feedback.created_at).toLocaleDateString("pt-BR")}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
