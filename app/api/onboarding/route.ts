// READY TO PUSH — drop into repo at app/api/onboarding/route.ts
// Mirrors app/api/demo-request/route.ts (same Resend setup, same env vars:
// RESEND_API_KEY, RESEND_FROM_EMAIL, DEMO_REQUEST_TO_EMAIL — no new env vars
// needed in Vercel). Validates the onboarding questionnaire, honeypot included,
// and emails the answers to Jesse. Never logs submitted names/emails/phones.
import { NextRequest, NextResponse } from "next/server";

type OnboardingBody = {
  businessName?: unknown;
  businessType?: unknown;
  serviceArea?: unknown;
  services?: unknown;
  contactName?: unknown;
  contactPhone?: unknown;
  contactEmail?: unknown;
  currentNumber?: unknown;
  numberChoice?: unknown;
  hours?: unknown;
  afterHours?: unknown;
  greeting?: unknown;
  commonQuestions?: unknown;
  scheduling?: unknown;
  transferRules?: unknown;
  messageDestination?: unknown;
  notes?: unknown;
  termsAck?: unknown;
  company_website?: unknown; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function validate(body: OnboardingBody): string[] {
  const errors: string[] = [];
  if (!str(body.businessName)) errors.push("Business name is required.");
  if (!str(body.businessType)) errors.push("Type of business is required.");
  if (!str(body.services)) errors.push("Services are required.");
  if (!str(body.contactName)) errors.push("Your name is required.");
  if (str(body.contactPhone).replace(/\D/g, "").length < 7)
    errors.push("A valid phone number is required.");
  if (!EMAIL_RE.test(str(body.contactEmail)))
    errors.push("A valid email is required.");
  if (str(body.currentNumber).replace(/\D/g, "").length < 7)
    errors.push("A valid current business number is required.");
  if (!str(body.numberChoice)) errors.push("Please choose how to use your number.");
  if (!str(body.hours)) errors.push("Business hours are required.");
  if (!str(body.messageDestination))
    errors.push("Please say where call summaries should go.");
  if (body.termsAck !== true)
    errors.push("Please confirm you understand the terms.");
  for (const field of [
    "businessName",
    "businessType",
    "serviceArea",
    "contactName",
    "contactPhone",
    "contactEmail",
    "currentNumber",
    "numberChoice",
    "messageDestination",
  ] as const) {
    if (str(body[field]).length > 200) errors.push(`${field} is too long.`);
  }
  for (const field of [
    "services",
    "hours",
    "afterHours",
    "greeting",
    "commonQuestions",
    "scheduling",
    "transferRules",
    "notes",
  ] as const) {
    if (str(body[field]).length > 2000) errors.push(`${field} is too long.`);
  }
  if (str(body.contactEmail).length > 254) errors.push("Email is too long.");
  return errors;
}

export async function POST(req: NextRequest) {
  let body: OnboardingBody;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid payload");
    }
    body = parsed as OnboardingBody;
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Invalid request body."] },
      { status: 400 }
    );
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
      {
        ok: false,
        errors: ["Onboarding is temporarily unavailable. Please try again later."],
      },
      { status: 503 }
    );
  }

  const text = [
    "New PennForge onboarding submission",
    "",
    `Business: ${str(body.businessName)} (${str(body.businessType)})`,
    `Service area: ${str(body.serviceArea) || "Not provided"}`,
    `Services: ${str(body.services)}`,
    "",
    `Contact: ${str(body.contactName)}`,
    `Phone: ${str(body.contactPhone)}`,
    `Email: ${str(body.contactEmail)}`,
    "",
    `Current number: ${str(body.currentNumber)}`,
    `Number choice: ${str(body.numberChoice)}`,
    "",
    `Hours: ${str(body.hours)}`,
    `After hours: ${str(body.afterHours) || "Not provided"}`,
    `Greeting wording: ${str(body.greeting) || "Not provided"}`,
    `Common questions: ${str(body.commonQuestions) || "Not provided"}`,
    `Scheduling: ${str(body.scheduling) || "Not provided"}`,
    `Transfer rules: ${str(body.transferRules) || "Not provided"}`,
    `Call summaries to: ${str(body.messageDestination)}`,
    "",
    "Notes for Jesse:",
    str(body.notes) || "Not provided",
    "",
    "Payment: customer was shown the Stripe Payment Link on the confirmation screen after submitting. Check Stripe for payment before onboarding.",
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
        reply_to: str(body.contactEmail),
        subject: `New PennForge onboarding: ${str(body.businessName)}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const result: unknown = await response.json();
    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      !("id" in result) ||
      typeof result.id !== "string" ||
      !result.id
    ) {
      throw new Error("Email delivery failed");
    }
    return NextResponse.json({ ok: true, mode: "production" });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        errors: ["Your details could not be sent. Please try again."],
      },
      { status: 502 }
    );
  }
}
