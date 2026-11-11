import { IProductService } from "@/api/products/services/IProductService";
import { IProductRepository } from "@/api/products/repositories/IProductRepository";
import { IReviewSummaryRepository } from "@/api/products/repositories/IReviewSummaryRepository";
import { IProductValidator } from "@/api/products/validators/ProductValidator";
import { IIdGenerator } from "@/api/shared/services/IdGenerator";
import { IDateService } from "@/api/shared/services/DateService";
import { ProductResponseDTO } from "@/api/products/dtos/CreateProductDTO";
import { ReviewForSummary } from "@/api/products/entities/ReviewSummary";
import { AppError, NotFoundError } from "@/api/shared/errors/AppError";
import { reviewSummaryAgent } from "@/mastra";

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly reviewSummaryRepository: IReviewSummaryRepository,
    private readonly productValidator: IProductValidator,
    private readonly idGenerator: IIdGenerator,
    private readonly dateService: IDateService,
  ) {}

  async getAll(params?: { cursor?: string | null; limit?: number }): Promise<{ products: ProductResponseDTO[]; nextCursor: string | null }> {
    const result = await this.productRepository.findAll({
      cursor: params?.cursor ?? null,
      limit: params?.limit,
    });

    const products = result.products as ProductResponseDTO[];
    const nextCursor = result.hasMore && products.length > 0 ? products[products.length - 1].created_at : null;

    return {
      products,
      nextCursor,
    };
  }

  async getById(id: string): Promise<ProductResponseDTO> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }
    return product as ProductResponseDTO;
  }

  async create(data: unknown): Promise<ProductResponseDTO> {
    const validated = this.productValidator.validateCreate(data);
    const id = this.idGenerator.generate();
    const now = this.dateService.nowIso();

    const created = await this.productRepository.create({
      ...validated,
      id,
      score: false,
      created_at: now,
      updated_at: now,
    });

    return created as ProductResponseDTO;
  }

  async update(id: string, data: unknown): Promise<ProductResponseDTO> {
    const validated = this.productValidator.validateUpdate(data);
    const now = this.dateService.nowIso();

    const updated = await this.productRepository.update(id, {
      ...validated,
      updated_at: now,
    });

    if (!updated) {
      throw new NotFoundError("Produto não encontrado");
    }

    return updated as ProductResponseDTO;
  }

  async delete(id: string): Promise<void> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError("Produto não encontrado");
    }
    await this.productRepository.delete(id);
  }

  async generateReviewSummary(productId: string): Promise<{ summary: string }> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    const reviews = await this.reviewSummaryRepository.findReviewsWithComments(productId);

    if (reviews.length === 0) {
      throw new AppError("Nenhuma avaliação com comentário encontrada", 204);
    }

    const latestReviewAt = reviews[0]?.created_at ?? null;
    const cachedSummary = await this.reviewSummaryRepository.findSummary(productId);

    const hasFreshSummary =
      cachedSummary !== null &&
      cachedSummary.reviews_count === reviews.length &&
      cachedSummary.latest_review_at === latestReviewAt;

    if (hasFreshSummary) {
      return { summary: cachedSummary.summary };
    }

    let summary: string;

    try {
      summary = await this.generateSummary(product.name, reviews);
    } catch (err) {
      // If the AI provider is unavailable, keep showing the last stored summary.
      if (cachedSummary) {
        return { summary: cachedSummary.summary };
      }
      if (err instanceof AppError) {
        throw err;
      }
      throw new AppError("Erro ao gerar resumo com IA", 500);
    }

    try {
      await this.reviewSummaryRepository.upsertSummary({
        product_id: productId,
        summary,
        reviews_count: reviews.length,
        latest_review_at: latestReviewAt,
        updated_at: this.dateService.nowIso(),
      });
    } catch {
      // The generated summary is still valid for this request; the next
      // request will try to persist it again.
    }

    return { summary };
  }

  private async generateSummary(
    productName: string,
    reviews: ReviewForSummary[],
  ): Promise<string> {
    const reviewsText = reviews
      .map((review, idx) => `Avaliação ${idx + 1} (nota ${review.score}/5): ${review.comment}`)
      .join("\n\n");

    const prompt = `Produto: ${productName}

Avaliações (${reviews.length}):
${reviewsText}

Gere um resumo conciso dessas avaliações.`;

    const result = await reviewSummaryAgent.generate(prompt);
    const summary = result.text?.trim();

    if (!summary) {
      throw new AppError("Não foi possível gerar o resumo no momento", 500);
    }

    return summary;
  }
}
