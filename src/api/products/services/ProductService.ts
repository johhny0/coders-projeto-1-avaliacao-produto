import { IProductService } from "@/api/products/services/IProductService";
import { IProductRepository } from "@/api/products/repositories/IProductRepository";
import { IProductValidator } from "@/api/products/validators/ProductValidator";
import { IIdGenerator } from "@/api/shared/services/IdGenerator";
import { IDateService } from "@/api/shared/services/DateService";
import { ProductResponseDTO } from "@/api/products/dtos/CreateProductDTO";
import { AppError, NotFoundError } from "@/api/shared/errors/AppError";

export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
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
}
