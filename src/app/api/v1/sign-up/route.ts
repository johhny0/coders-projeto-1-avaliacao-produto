import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase/server";

async function hashPassword(password: string) {
  const hashRounds = 10;
  return await hash(password, hashRounds);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, password, confirmPassword } = body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof confirmPassword !== "string"
    ) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const id = nanoid();
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from("accounts").insert({
      id,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
      active: true,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      return NextResponse.json({ error: "Erro ao criar conta" }, { status: 400 });
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
  }
}
