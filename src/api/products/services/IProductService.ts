import { CreateProductDTO } from "@/api/products/dtos/CreateProductDTO";
import { UpdateProductDTO } from "@/api/products/dtos/UpdateProductDTO";
import { ProductResponseDTO } from "@/api/products/dtos/CreateProductDTO";

export interface IProductService {
  getAll(params?: { cursor?: string | null; limit?: number }): Promise<{ products: ProductResponseDTO[]; nextCursor: string | null }>;
  getById(id: string): Promise<ProductResponseDTO>;
  create(data: unknown): Promise<ProductResponseDTO>;
  update(id: string, data: unknown): Promise<ProductResponseDTO>;
  delete(id: string): Promise<void>;
}
