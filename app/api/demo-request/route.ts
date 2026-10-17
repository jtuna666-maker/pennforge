import { NextRequest, NextResponse } from "next/server";

/** Sends validated demo requests through Resend. Keep credentials server-side
 * and never log submitted names, email addresses, phone numbers, or messages. */

type DemoRequestBody = {
  fullName?: unknown;
  businessName?: unknown;
  email?: unknown;
  phone?: unknown;
  industry?: unknown;
  callVolume?: unknown;
  message?: unknown;
  company_website?: unknown; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function validate(body: DemoRequestBody): string[] {
  const errors: string[] = [];

  if (!str(body.fullName)) errors.push("Full name is required.");
  if (!str(body.businessName)) errors.push("Business name is required.");
  if (!EMAIL_RE.test(str(body.email))) errors.push("A valid email is required.");
  if (str(body.phone).replace(/\D/g, "").length < 7)
    errors.push("A valid phone number is required.");
  if (!str(body.industry)) errors.push("Industry is required.");
  if (str(body.message).length > 2000) errors.push("Message is too long.");
  for (const field of ["fullName", "businessName", "phone", "industry", "callVolume"] as const) {
    if (str(body[field]).length > 200) errors.push(`${field} is too long.`);
  }
  if (str(body.email).length > 254) errors.push("Email is too long.");
  return errors;
}

export async function POST(req: NextRequest) {
  let body: DemoRequestBody;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid payload");
    }
    body = parsed as DemoRequestBody;
  } catch {
    return NextResponse.json({ ok: false, errors: ["Invalid request body."] }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field — silently accept and discard.
  if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true, mode: "production" });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.DEMO_REQUEST_TO_EMAIL;
  if (!apiKey || !from || !to || !EMAIL_RE.test(to)) {
    return NextResponse.json(
      { ok: false, errors: ["Demo requests are temporarily unavailable. Please try again later."] },
      { status: 503 },
    );
  }

  const text = [
    "New PennForge demo request",
    "",
    `Full name: ${str(body.fullName)}`,
    `Business: ${str(body.businessName)}`,
    `Email: ${str(body.email)}`,
    `Phone: ${str(body.phone)}`,
    `Industry: ${str(body.industry)}`,
    `Monthly call volume: ${str(body.callVolume) || "Not provided"}`,
    "",
    "Message:",
    str(body.message) || "Not provided",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: str(body.email),
        subject: "New PennForge demo request",
        text,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== "object" ||
        !("id" in result) || typeof result.id !== "string" || !result.id) {
      throw new Error("Email delivery failed");
    }
    return NextResponse.json({ ok: true, mode: "production" });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Your request could not be sent. Please try again."] },
      { status: 502 },
    );
  }
}
