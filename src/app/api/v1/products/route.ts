import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get("cursor");
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 10;

    let query = supabaseAdmin
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit + 1);

    if (cursor) {
      // If using cursor-based pagination (created_at)
      query = query.lt("created_at", cursor);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ products: [], nextCursor: null }, { status: 200 });
    }

    const hasMore = data.length > limit;
    const products = hasMore ? data.slice(0, limit) : data;
    const nextCursor = hasMore ? products[products.length - 1].created_at : null;

    return NextResponse.json({ products, nextCursor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ products: [], nextCursor: null }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, image_url, external_link } = body;

    if (!name || typeof name !== "string" || !external_link || typeof external_link !== "string") {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const id = nanoid();
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from("products").insert({
      id,
      name,
      description: description && typeof description === "string" ? description : null,
      image_url: image_url && typeof image_url === "string" ? image_url : null,
      external_link,
      score: false,
      created_at: now,
      updated_at: now,
    });

    if (error) {
      return NextResponse.json({ error: "Erro ao inserir produto" }, { status: 400 });
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
  }
}
