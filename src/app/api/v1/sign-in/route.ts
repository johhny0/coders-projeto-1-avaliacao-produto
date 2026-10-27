import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import { supabaseAdmin } from "@/lib/supabase/server";
import { createSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const { data: account, error } = await supabaseAdmin
      .from("accounts")
      .select("id, first_name, last_name, email, password, active")
      .eq("email", email)
      .maybeSingle();

    if (error || !account) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos" },
        { status: 401 },
      );
    }

    if (account.active === false) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos" },
        { status: 401 },
      );
    }

    const isPasswordValid = await compare(password, account.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "E-mail ou senha inválidos" },
        { status: 401 },
      );
    }

    await createSession({
      userId: account.id,
      email: account.email,
      firstName: account.first_name,
      lastName: account.last_name,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
  }
}
