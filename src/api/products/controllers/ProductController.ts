import { NextRequest, NextResponse } from "next/server";
import { IProductController } from "@/api/products/controllers/IProductController";
import { IProductService } from "@/api/products/services/IProductService";
import { AppError } from "@/api/shared/errors/AppError";

export class ProductController implements IProductController {
  constructor(private readonly productService: IProductService) {}

  async getAll(req: NextRequest): Promise<NextResponse> {
    try {
      const searchParams = req.nextUrl.searchParams;
      const cursor = searchParams.get("cursor");
      const limitParam = searchParams.get("limit");
      const limit = limitParam ? parseInt(limitParam) : undefined;

      const result = await this.productService.getAll({ cursor, limit });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      return NextResponse.json({ products: [], nextCursor: null }, { status: 200 });
    }
  }

  async getById(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const product = await this.productService.getById(id);
      return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 400 });
    }
  }

  async create(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const product = await this.productService.create(body);
      return NextResponse.json({ success: true, id: product.id }, { status: 201 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }
  }

  async update(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      const body = await req.json();
      const product = await this.productService.update(id, body);
      return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }
  }

  async delete(req: NextRequest, id: string): Promise<NextResponse> {
    try {
      await this.productService.delete(id);
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }
      return NextResponse.json({ error: "Erro ao remover produto" }, { status: 400 });
    }
  }
}
