import { NextRequest } from "next/server";
import { createProductController } from "@/api/products";

const controller = createProductController();

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return controller.getReviewSummary(req, id);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return controller.getReviewSummary(req, id);
}
