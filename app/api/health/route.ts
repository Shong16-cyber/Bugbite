import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { supabase } = await import("@/lib/supabase");
  try {
    // Simple health check - just verifying the client initializes
    const { error } = await supabase.from("_health").select("*").limit(1);

    // Table won't exist yet, but a connection error vs table-not-found are different
    if (error && error.code !== "42P01") {
      return NextResponse.json({ status: "error", message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", message: "Supabase connected" });
  } catch (err) {
    return NextResponse.json({ status: "error", message: String(err) }, { status: 500 });
  }
}
