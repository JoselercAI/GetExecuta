import { createHmac, timingSafeEqual } from "crypto";

export const ACCESS_COOKIE = "executa_deck_access";

export function createAccessToken(email: string) {
  const value = Buffer.from(email).toString("base64url");
  const signature = createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "")
    .update(value)
    .digest("base64url");

  return `${value}.${signature}`;
}

export function isValidAccessToken(token?: string) {
  if (!token || !process.env.SUPABASE_SERVICE_ROLE_KEY) return false;

  const [value, signature] = token.split(".");
  if (!value || !signature) return false;

  const expected = createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY)
    .update(value)
    .digest("base64url");
  const receivedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}
