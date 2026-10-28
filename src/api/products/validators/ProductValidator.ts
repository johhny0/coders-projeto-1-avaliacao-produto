import { BadRequestError } from "@/api/shared/errors/AppError";
import { CreateProductDTO } from "@/api/products/dtos/CreateProductDTO";
import { UpdateProductDTO } from "@/api/products/dtos/UpdateProductDTO";

export interface IProductValidator {
  validateCreate(data: unknown): CreateProductDTO;
  validateUpdate(data: unknown): UpdateProductDTO;
}

export class ProductValidator implements IProductValidator {
  validateCreate(data: unknown): CreateProductDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Má formatação de dados");
    }

    const body = data as Record<string, unknown>;
    const { name, description, image_url, external_link } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      throw new BadRequestError("Má formatação de dados");
    }

    if (!external_link || typeof external_link !== "string" || !external_link.trim()) {
      throw new BadRequestError("Má formatação de dados");
    }

    const result: CreateProductDTO = {
      name: name.trim(),
      external_link: external_link.trim(),
    };

    if (description !== undefined && description !== null) {
      if (typeof description !== "string") {
        throw new BadRequestError("Má formatação de dados");
      }
      result.description = description;
    }

    if (image_url !== undefined && image_url !== null) {
      if (typeof image_url !== "string") {
        throw new BadRequestError("Má formatação de dados");
      }
      result.image_url = image_url;
    }

    return result;
  }

  validateUpdate(data: unknown): UpdateProductDTO {
    if (!data || typeof data !== "object") {
      throw new BadRequestError("Má formatação de dados");
    }

    const body = data as Record<string, unknown>;
    const { name, description, image_url, external_link, score } = body;

    if (
      name === undefined &&
      description === undefined &&
      image_url === undefined &&
      external_link === undefined &&
      score === undefined
    ) {
      throw new BadRequestError("Má formatação de dados");
    }

    const result: UpdateProductDTO = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        throw new BadRequestError("Má formatação de dados");
      }
      result.name = name.trim();
    }

    if (external_link !== undefined) {
      if (typeof external_link !== "string" || !external_link.trim()) {
        throw new BadRequestError("Má formatação de dados");
      }
      result.external_link = external_link.trim();
    }

    if (description !== undefined) {
      if (description !== null && typeof description !== "string") {
        throw new BadRequestError("Má formatação de dados");
      }
      result.description = description;
    }

    if (image_url !== undefined) {
      if (image_url !== null && typeof image_url !== "string") {
        throw new BadRequestError("Má formatação de dados");
      }
      result.image_url = image_url;
    }

    if (score !== undefined) {
      if (typeof score !== "boolean") {
        throw new BadRequestError("Má formatação de dados");
      }
      result.score = score;
    }

    return result;
  }
}

export const productValidator = new ProductValidator();
