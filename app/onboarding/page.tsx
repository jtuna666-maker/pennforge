// PennForge /onboarding page — app/onboarding/page.tsx
// Dark theme: site background is navy #0B1424, so page text is light.
// Form inputs stay white with dark text so typed text and placeholders read clearly.
// "How it works" box stays light (bg-slate-50) with dark text — it was the only readable block before this fix.
// Stripe step is on the SUCCESS screen: fill in the form, submit, then pay via the live Payment Link.
"use client";

import { useState } from "react";

const STRIPE_PAYMENT_LINK_HREF = "https://buy.stripe.com/4gM8wO69d9qS7wW797ao801";

export default function OnboardingPage() {
  const [values, setValues] = useState({
    businessName: "",
    businessType: "",
    serviceArea: "",
    services: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    currentNumber: "",
    numberChoice: "",
    hours: "",
    afterHours: "",
    greeting: "",
    commonQuestions: "",
    scheduling: "",
    transferRules: "",
    messageDestination: "",
    notes: "",
    company_website: "", // honeypot — must stay empty
  });
  const [termsAck, setTermsAck] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-200 mb-1";

  const set =
    (key: keyof typeof values) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!termsAck) {
      setError("Please tick the box confirming you understand the terms.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, termsAck: true }),
      });
      const data = (await res.json()) as { ok: boolean; errors?: string[] };
      if (!res.ok || !data.ok) {
        throw new Error(data.errors?.join(" ") ?? "Submission failed.");
      }
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-white">
          Details received — one step left
        </h1>
        <p className="mt-3 text-slate-300">
          Thanks — your onboarding details are with Jesse. To start your
          service, complete payment now: $99 one-time setup + your first
          $299/month.
        </p>
        <a
          href={STRIPE_PAYMENT_LINK_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-orange-500 px-6 py-3 font-semibold text-white"
        >
          Pay $99 setup + $299/month with Stripe
        </a>
        <p className="mt-4 text-sm text-slate-400">
          PennForge is month-to-month, $299/month, 500 AI minutes included,
          $0.20/minute overage. Setup is in 2–3 business days once onboarding
          and payment are complete. Questions? Call Lucy at{" "}
          <a href="tel:+15705299998" className="underline">
            (570) 529-9998
          </a>{" "}
          or email{" "}
          <a href="mailto:jesse@pennforge.app" className="underline">
            jesse@pennforge.app
          </a>
          .
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-white">Start Onboarding</h1>
      <p className="mt-3 text-slate-300">
        Tell us about your business and how you want calls handled, and
        we&apos;ll get you set up in 2–3 business days once onboarding and
        payment are complete.
      </p>

      <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">How it works</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Fill in this questionnaire.</li>
          <li>
            After you submit, complete payment for the $99 one-time setup and
            your first $299/month via Stripe (link on the next screen).
          </li>
          <li>
            We confirm your details, configure your greeting, business
            knowledge, and call routing, and test it with you.
          </li>
          <li>
            You keep your existing number and forward it to your PennForge
            number, or use the new PennForge number directly.
          </li>
        </ol>
        <p className="mt-3">
          <strong>Price:</strong> $99 one-time setup + $299/month, 500 AI
          minutes included, $0.20/minute overage. Month-to-month, cancel with
          30 days&apos; notice. $99 setup is non-refundable. Unused minutes do
          not roll over.
        </p>
        <p className="mt-2">
          <strong>What Lucy does:</strong> Answers 24/7, greets callers,
          answers common questions about your business, takes name, number,
          and need, and sends you a written summary. She identifies as an AI
          receptionist where required by law. PennForge does not record or
          store call audio. PennForge is not an emergency service — callers
          with emergencies are directed to 911.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-slate-100">Your business</h2>
          <div className="mt-3 space-y-4">
            <div>
              <label className={labelClass} htmlFor="businessName">Business name *</label>
              <input className={inputClass} id="businessName" name="businessName" required value={values.businessName} onChange={set("businessName")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="businessType">Type of business *</label>
              <select className={inputClass} id="businessType" name="businessType" required value={values.businessType} onChange={set("businessType")}>
                <option value="">Choose one…</option>
                <option>Plumbing</option>
                <option>HVAC</option>
                <option>Electrical</option>
                <option>Roofing</option>
                <option>Landscaping</option>
                <option>General contracting</option>
                <option>Other home service</option>
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="serviceArea">Towns / service area</label>
              <input className={inputClass} id="serviceArea" name="serviceArea" placeholder="e.g. Troy, Canton, Wellsboro" value={values.serviceArea} onChange={set("serviceArea")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="services">Services you offer *</label>
              <textarea className={inputClass} id="services" name="services" rows={3} required placeholder="List the main services callers ask about" value={values.services} onChange={set("services")} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100">Your contact</h2>
          <div className="mt-3 space-y-4">
            <div>
              <label className={labelClass} htmlFor="contactName">Your name *</label>
              <input className={inputClass} id="contactName" name="contactName" required value={values.contactName} onChange={set("contactName")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contactPhone">Phone *</label>
              <input className={inputClass} id="contactPhone" name="contactPhone" type="tel" required value={values.contactPhone} onChange={set("contactPhone")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="contactEmail">Email *</label>
              <input className={inputClass} id="contactEmail" name="contactEmail" type="email" required value={values.contactEmail} onChange={set("contactEmail")} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100">Your phone number</h2>
          <div className="mt-3 space-y-4">
            <div>
              <label className={labelClass} htmlFor="currentNumber">Current business number *</label>
              <input className={inputClass} id="currentNumber" name="currentNumber" type="tel" required value={values.currentNumber} onChange={set("currentNumber")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="numberChoice">How do you want to use it? *</label>
              <select className={inputClass} id="numberChoice" name="numberChoice" required value={values.numberChoice} onChange={set("numberChoice")}>
                <option value="">Choose one…</option>
                <option>Keep my number and forward it to PennForge</option>
                <option>Use a new PennForge number instead</option>
                <option>Not sure yet — talk it through with me</option>
              </select>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100">Hours &amp; call handling</h2>
          <div className="mt-3 space-y-4">
            <div>
              <label className={labelClass} htmlFor="hours">Business hours *</label>
              <textarea className={inputClass} id="hours" name="hours" rows={2} required placeholder="e.g. Mon–Fri 8–4, Sat 8–12" value={values.hours} onChange={set("hours")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="afterHours">What should happen after hours?</label>
              <textarea className={inputClass} id="afterHours" name="afterHours" rows={2} placeholder="e.g. Take a message for everything, or transfer urgent calls" value={values.afterHours} onChange={set("afterHours")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="greeting">Greeting wording you want</label>
              <textarea className={inputClass} id="greeting" name="greeting" rows={2} placeholder="e.g. Thanks for calling [Business Name], how can I help?" value={values.greeting} onChange={set("greeting")} />
              <p className="mt-1 text-xs text-slate-400">
                This is wording only — the voice stays the same, it does not sound like you.
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="commonQuestions">Common questions callers ask, and your answers</label>
              <textarea className={inputClass} id="commonQuestions" name="commonQuestions" rows={4} placeholder="e.g. Do you do emergency calls? Yes, 24-hour emergency… / What areas do you cover?…" value={values.commonQuestions} onChange={set("commonQuestions")} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100">Appointments, transfers &amp; messages</h2>
          <div className="mt-3 space-y-4">
            <div>
              <label className={labelClass} htmlFor="scheduling">How does scheduling work for you?</label>
              <textarea className={inputClass} id="scheduling" name="scheduling" rows={2} placeholder="e.g. We take appointment requests and confirm by phone, we use [calendar system], we don't book by phone" value={values.scheduling} onChange={set("scheduling")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="transferRules">Transfer / escalation rules</label>
              <textarea className={inputClass} id="transferRules" name="transferRules" rows={2} placeholder="e.g. Transfer urgent leaks / no-heat calls to [name/number], take a message for everything else" value={values.transferRules} onChange={set("transferRules")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="messageDestination">Where should call summaries go? *</label>
              <input className={inputClass} id="messageDestination" name="messageDestination" required placeholder="Name + phone and/or email for summaries" value={values.messageDestination} onChange={set("messageDestination")} />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-100">Anything else?</h2>
          <div className="mt-3">
            <label className={labelClass} htmlFor="notes">Notes for Jesse</label>
            <textarea className={inputClass} id="notes" name="notes" rows={3} value={values.notes} onChange={set("notes")} />
          </div>
          <label className="mt-4 flex items-start gap-2 text-sm text-slate-300">
            <input type="checkbox" name="termsAck" required className="mt-1" checked={termsAck} onChange={(e) => setTermsAck(e.target.checked)} />
            <span>
              I understand PennForge is month-to-month, $299/month + $99 setup,
              500 minutes included, and that Lucy is an AI receptionist who
              provides a written summary — PennForge does not record call audio
              and is not an emergency service. I have read the{" "}
              <a href="/terms-of-service" className="underline">Terms of Service</a>{" "}
              and{" "}
              <a href="/privacy-policy" className="underline">Privacy Policy</a>.
            </span>
          </label>
          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            type="text"
            name="company_website"
            value={values.company_website}
            onChange={set("company_website")}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: "none" }}
          />
        </section>

        {error ? (
          <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-800">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-md bg-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Submit onboarding details"}
        </button>
        <p className="text-sm text-slate-400">
          Questions first? Call Lucy live at{" "}
          <a href="tel:+15705299998" className="underline">(570) 529-9998</a>{" "}
          or email{" "}
          <a href="mailto:jesse@pennforge.app" className="underline">jesse@pennforge.app</a>.
        </p>
      </form>
    </main>
  );
}
