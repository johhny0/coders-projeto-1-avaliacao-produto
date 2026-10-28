import { ProductRepository } from "@/api/products/repositories/ProductRepository";
import { ProductValidator } from "@/api/products/validators/ProductValidator";
import { ProductService } from "@/api/products/services/ProductService";
import { ProductController } from "@/api/products/controllers/ProductController";
import { idGenerator } from "@/api/shared/services/IdGenerator";
import { dateService } from "@/api/shared/services/DateService";
import { supabaseAdmin } from "@/lib/supabase/server";

export function createProductController() {
  const repository = new ProductRepository(supabaseAdmin);
  const validator = new ProductValidator();
  const service = new ProductService(repository, validator, idGenerator, dateService);
  const controller = new ProductController(service);
  return controller;
}

export { ProductController } from "@/api/products/controllers/ProductController";
export { ProductService } from "@/api/products/services/ProductService";
export { ProductRepository } from "@/api/products/repositories/ProductRepository";
export { ProductValidator } from "@/api/products/validators/ProductValidator";
