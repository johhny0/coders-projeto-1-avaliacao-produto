import { NextRequest } from "next/server";
import { createProductController } from "@/api/products";

const controller = createProductController();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return controller.getById(req, params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return controller.update(req, params.id);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return controller.update(req, params.id);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return controller.delete(req, params.id);
}
