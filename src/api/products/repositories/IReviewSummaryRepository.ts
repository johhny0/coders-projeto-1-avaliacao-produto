import {
  ReviewForSummary,
  ReviewSummary,
  UpsertReviewSummaryInput,
} from "@/api/products/entities/ReviewSummary";

export interface IReviewSummaryRepository {
  findReviewsWithComments(productId: string): Promise<ReviewForSummary[]>;
  findSummary(productId: string): Promise<ReviewSummary | null>;
  upsertSummary(input: UpsertReviewSummaryInput): Promise<ReviewSummary>;
}
