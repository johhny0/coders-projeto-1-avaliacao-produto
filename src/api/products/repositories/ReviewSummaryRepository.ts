import { SupabaseClient } from "@supabase/supabase-js";
import {
  ReviewForSummary,
  ReviewSummary,
  UpsertReviewSummaryInput,
} from "@/api/products/entities/ReviewSummary";
import { IReviewSummaryRepository } from "@/api/products/repositories/IReviewSummaryRepository";
import { supabaseAdmin } from "@/lib/supabase/server";

export class ReviewSummaryRepository implements IReviewSummaryRepository {
  constructor(private readonly db: SupabaseClient = supabaseAdmin) {}

  async findReviewsWithComments(productId: string): Promise<ReviewForSummary[]> {
    const { data, error } = await this.db
      .from("products_feedbacks")
      .select("score, comment, created_at")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return (data ?? [])
      .filter(
        (review) =>
          typeof review.comment === "string" && review.comment.trim().length > 0,
      )
      .map((review) => ({
        score: review.score,
        comment: review.comment.trim(),
        created_at: review.created_at,
      }));
  }

  async findSummary(productId: string): Promise<ReviewSummary | null> {
    const { data, error } = await this.db
      .from("product_review_summaries")
      .select("*")
      .eq("product_id", productId)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return (data as ReviewSummary | null) ?? null;
  }

  async upsertSummary(input: UpsertReviewSummaryInput): Promise<ReviewSummary> {
    const { data, error } = await this.db
      .from("product_review_summaries")
      .upsert(
        {
          product_id: input.product_id,
          summary: input.summary,
          reviews_count: input.reviews_count,
          latest_review_at: input.latest_review_at,
          updated_at: input.updated_at,
        },
        { onConflict: "product_id" },
      )
      .select()
      .single();

    if (error || !data) {
      throw error || new Error("Failed to save review summary");
    }

    return data as ReviewSummary;
  }
}

export const reviewSummaryRepository = new ReviewSummaryRepository(supabaseAdmin);
