import { NextRequest } from "next/server";
import { createProductController } from "@/api/products";

const controller = createProductController();

export async function GET(req: NextRequest) {
  return controller.getAll(req);
}

export async function POST(req: NextRequest) {
  return controller.create(req);
}
