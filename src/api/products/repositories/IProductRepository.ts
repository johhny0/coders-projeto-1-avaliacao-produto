import { Product } from "@/api/products/entities/Product";
import { CreateProductInput } from "@/api/products/dtos/CreateProductDTO";
import { UpdateProductDTO } from "@/api/products/dtos/UpdateProductDTO";

export interface PaginationParams {
  cursor?: string | null;
  limit?: number;
}

export interface IProductRepository {
  findAll(params: PaginationParams): Promise<{ products: Product[]; hasMore: boolean }>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductInput): Promise<Product>;
  update(id: string, data: UpdateProductDTO & { updated_at: string }): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}
