import { NextRequest, NextResponse } from "next/server";
import { IAccountController } from "@/api/accounts/controllers/IAccountController";
import { IAccountService } from "@/api/accounts/services/IAccountService";
import { AppError } from "@/api/shared/errors/AppError";

export class AccountController implements IAccountController {
  constructor(private readonly accountService: IAccountService) {}

  async signUp(req: NextRequest): Promise<NextResponse> {
    try {
      const body = await req.json();
      const result = await this.accountService.createAccount(body);
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.statusCode });
      }

      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }
  }
}
