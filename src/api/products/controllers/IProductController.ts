import { NextRequest, NextResponse } from "next/server";

export interface IProductController {
  getAll(req: NextRequest): Promise<NextResponse>;
  getById(req: NextRequest, id: string): Promise<NextResponse>;
  create(req: NextRequest): Promise<NextResponse>;
  update(req: NextRequest, id: string): Promise<NextResponse>;
  delete(req: NextRequest, id: string): Promise<NextResponse>;
}
