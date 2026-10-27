import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getSession } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.userId) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const body = await req.json();
    const { product_id, score, comment } = body;

    if (
      !product_id ||
      typeof product_id !== "string" ||
      score === undefined ||
      comment === undefined
    ) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    const scoreNumber = Number(score);
    if (Number.isNaN(scoreNumber) || scoreNumber < 1 || scoreNumber > 5 || !Number.isInteger(scoreNumber)) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    if (typeof comment !== "string" || comment.trim().length === 0) {
      return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
    }

    // Verify product exists
    const { data: product, error: productError } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("id", product_id)
      .maybeSingle();

    if (productError || !product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 400 });
    }

    const id = nanoid();
    const now = new Date().toISOString();

    const { error } = await supabaseAdmin.from("products_feedbacks").insert({
      id,
      score: scoreNumber,
      comment: comment.trim(),
      created_at: now,
      created_by: session.userId,
      product_id,
    });

    if (error) {
      return NextResponse.json({ error: "Erro ao criar avaliação" }, { status: 400 });
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Má formatação de dados" }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get("product_id");

    if (!productId) {
      return NextResponse.json({ feedbacks: [] }, { status: 200 });
    }

    const { data, error } = await supabaseAdmin
      .from("products_feedbacks")
      .select(`
        id,
        score,
        comment,
        created_at,
        created_by,
        product_id
      `)
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ feedbacks: [] }, { status: 200 });
    }

    // Fetch account info for each feedback
    const feedbacksWithAuthor = await Promise.all(
      (data || []).map(async (feedback) => {
        const { data: account } = await supabaseAdmin
          .from("accounts")
          .select("id, first_name, last_name")
          .eq("id", feedback.created_by)
          .maybeSingle();

        return {
          ...feedback,
          author: account
            ? { firstName: account.first_name, lastName: account.last_name }
            : null,
        };
      }),
    );

    return NextResponse.json({ feedbacks: feedbacksWithAuthor }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ feedbacks: [] }, { status: 200 });
  }
}
