import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { premiumTemplates } from "@/config/premiumTemplates";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRole) {
    return NextResponse.json(
      { error: "Premium downloads are not configured on this deployment." },
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Missing account session." }, { status: 401 });
  }

  const supabase = createClient(supabaseUrl, serviceRole);
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ error: "Invalid account session." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_pro")
    .eq("id", user.id)
    .single();

  if (!profile?.is_pro) {
    return NextResponse.json({ error: "Active Pro subscription required." }, { status: 403 });
  }

  const body = await request.json();
  const template = premiumTemplates.find((item) => item.id === body.templateId);

  if (!template) {
    return NextResponse.json({ error: "Premium template not found." }, { status: 404 });
  }

  return NextResponse.json({ template });
}
