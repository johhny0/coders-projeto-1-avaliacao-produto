import { SupabaseClient } from "@supabase/supabase-js";
import { IProductRepository, PaginationParams } from "@/api/products/repositories/IProductRepository";
import { Product } from "@/api/products/entities/Product";
import { CreateProductInput } from "@/api/products/dtos/CreateProductDTO";
import { UpdateProductDTO } from "@/api/products/dtos/UpdateProductDTO";
import { supabaseAdmin } from "@/lib/supabase/server";

export class ProductRepository implements IProductRepository {
  constructor(private readonly db: SupabaseClient = supabaseAdmin) {}

  async findAll(params: PaginationParams): Promise<{ products: Product[]; hasMore: boolean }> {
    const limit = params.limit && params.limit > 0 ? params.limit : 10;
    let query = this.db
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit + 1);

    if (params.cursor) {
      query = query.lt("created_at", params.cursor);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return { products: [], hasMore: false };
    }

    const hasMore = data.length > limit;
    const products = hasMore ? data.slice(0, limit) : data;

    return { products: products as Product[], hasMore };
  }

  async findById(id: string): Promise<Product | null> {
    const { data, error } = await this.db.from("products").select("*").eq("id", id).single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return (data as Product) || null;
  }

  async create(data: CreateProductInput): Promise<Product> {
    const { data: product, error } = await this.db
      .from("products")
      .insert({
        id: data.id,
        name: data.name,
        description: data.description ?? null,
        image_url: data.image_url ?? null,
        external_link: data.external_link,
        score: data.score,
        created_at: data.created_at,
        updated_at: data.updated_at,
      })
      .select()
      .single();

    if (error || !product) {
      throw error || new Error("Failed to create product");
    }

    return product as Product;
  }

  async update(id: string, data: UpdateProductDTO & { updated_at: string }): Promise<Product | null> {
    const updatePayload: Record<string, unknown> = {
      updated_at: data.updated_at,
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.image_url !== undefined) updatePayload.image_url = data.image_url;
    if (data.external_link !== undefined) updatePayload.external_link = data.external_link;
    if (data.score !== undefined) updatePayload.score = data.score;

    const { data: product, error } = await this.db
      .from("products")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw error;
    }

    return (product as Product) || null;
  }

  async delete(id: string): Promise<boolean> {
    const { error } = await this.db.from("products").delete().eq("id", id);

    if (error) {
      throw error;
    }

    return true;
  }
}

export const productRepository = new ProductRepository(supabaseAdmin);
