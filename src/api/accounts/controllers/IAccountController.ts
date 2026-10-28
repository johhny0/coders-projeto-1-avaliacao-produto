import { NextRequest, NextResponse } from "next/server";

export interface IAccountController {
  signUp(req: NextRequest): Promise<NextResponse>;
}
