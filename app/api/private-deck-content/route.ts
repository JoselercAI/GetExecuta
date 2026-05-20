import { readFile } from "fs/promises";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, isValidAccessToken } from "../private-deck-access/session";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ACCESS_COOKIE)?.value;

  if (!isValidAccessToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const html = await readFile(join(process.cwd(), "executa_platform_deck.html"), "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
