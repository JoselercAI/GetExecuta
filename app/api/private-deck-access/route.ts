import { createClient } from "@supabase/supabase-js";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, createAccessToken } from "./session";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const runtime = "nodejs";

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const savedKey = Buffer.from(key, "hex");
  const typedKey = scryptSync(password, salt, 64);

  return savedKey.length === typedKey.length && timingSafeEqual(savedKey, typedKey);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const mode = body?.mode === "register" ? "register" : "login";
  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim().toLowerCase();
  const password = String(body?.password ?? "");

  if (!email || !password || (mode === "register" && !name)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Supabase is not configured" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: existingUser, error: readError } = await supabase
    .from("deck_access_users")
    .select("id,name,email,password_hash")
    .eq("email", email)
    .maybeSingle();

  if (readError) {
    return NextResponse.json({ error: "Unable to verify access" }, { status: 500 });
  }

  if (mode === "register" && existingUser) {
    return NextResponse.json({ error: "Email already registered. Please log in." }, { status: 409 });
  }

  if (mode === "login" && (!existingUser || !verifyPassword(password, existingUser.password_hash))) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const user =
    existingUser ??
    (
      await supabase
        .from("deck_access_users")
        .insert({ name, email, password_hash: hashPassword(password) })
        .select("id,name,email")
        .single()
    ).data;

  if (!user) {
    return NextResponse.json({ error: "Unable to save registration" }, { status: 500 });
  }

  const { error } = await supabase.from("deck_access_events").insert({
    user_id: user.id,
    email,
    event_type: mode,
    user_agent: request.headers.get("user-agent"),
  });

  if (error) {
    return NextResponse.json({ error: "Unable to save access event" }, { status: 500 });
  }

  await supabase.from("deck_access_users").update({ last_login_at: new Date().toISOString() }).eq("id", user.id);

  const response = NextResponse.json({ ok: true, name: user.name });
  response.cookies.set(ACCESS_COOKIE, createAccessToken(email), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
