import { Star } from "lucide-react";
import { cn } from "cn";

interface ReviewRatingSummaryProps {
  scores: number[];
}

const STAR_VALUES = [5, 4, 3, 2, 1];

export function ReviewRatingSummary({ scores }: ReviewRatingSummaryProps) {
  if (scores.length === 0) {
    return null;
  }

  const totalReviews = scores.length;
  const averageScore =
    scores.reduce((total, score) => total + score, 0) / totalReviews;

  const distribution = STAR_VALUES.map((star) => {
    const count = scores.filter((score) => score === star).length;
    return {
      star,
      count,
      percentage: (count / totalReviews) * 100,
    };
  });

  return (
    <section className="mt-10" aria-label="Rating summary">
      <div className="grid gap-6 rounded border border-rule bg-surface p-6 md:grid-cols-[180px_1fr] md:items-center">
        <div>
          <p className="font-display text-[40px] leading-none font-extrabold tracking-[-0.04em] text-ink">
            {averageScore.toFixed(1)}
          </p>
          <div className="mt-2 flex items-center gap-0.5" aria-hidden>
            {STAR_VALUES.slice()
              .reverse()
              .map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    averageScore >= star - 0.5
                      ? "fill-ink text-ink"
                      : "text-graphite/40",
                  )}
                />
              ))}
          </div>
          <p className="mt-2 text-sm text-graphite">
            {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        </div>

        <div className="space-y-2">
          {distribution.map(({ star, count, percentage }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="flex w-10 items-center gap-1 text-sm text-graphite">
                {star}
                <Star className="h-3.5 w-3.5 fill-ink text-ink" aria-hidden />
              </span>
              <div
                className="h-2 flex-1 overflow-hidden rounded-full bg-rule/60"
                role="img"
                aria-label={`${Math.round(percentage)}% of reviews rated ${star} stars`}
              >
                <div
                  className="h-full rounded-full bg-ink"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm text-graphite">
                {Math.round(percentage)}%
              </span>
              <span className="sr-only">{count} reviews</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
