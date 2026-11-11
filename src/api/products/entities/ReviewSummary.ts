export interface ReviewForSummary {
  score: number;
  comment: string;
  created_at: string;
}

export interface ReviewSummary {
  product_id: string;
  summary: string;
  reviews_count: number;
  latest_review_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpsertReviewSummaryInput {
  product_id: string;
  summary: string;
  reviews_count: number;
  latest_review_at: string | null;
  updated_at: string;
}
