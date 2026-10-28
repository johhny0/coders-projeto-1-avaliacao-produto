import { NextRequest } from "next/server";
import { createAccountController } from "@/api/accounts";

const controller = createAccountController();

export async function POST(req: NextRequest) {
  return controller.signUp(req);
}
