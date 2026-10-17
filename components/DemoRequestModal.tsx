"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, TriangleAlert, X } from "lucide-react";
import { demoForm } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"fullName" | "businessName" | "email" | "phone" | "industry", string>>;

const callVolumeOptions = [
  "Under 50 calls / month",
  "50 – 150 calls / month",
  "150 – 400 calls / month",
  "400+ calls / month",
  "Not sure yet",
];

function validate(values: Record<string, string>): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.businessName.trim()) errors.businessName = "Please enter your business name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (digits.length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!values.industry) errors.industry = "Please choose your industry.";
  return errors;
}

/**
 * Demo request modal shared by every CTA on the page.
 * - Client-side validation with accessible, per-field error messages
 * - Honeypot spam field (bots fill it; humans never see it)
 * - Posts to /api/demo-request; success appears only after email acceptance.
 */
export function DemoRequestModal() {
  const { isOpen, closeDemo } = useDemoModal();
  const [values, setValues] = useState({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    industry: "",
    callVolume: "",
    message: "",
    company_website: "", // honeypot — must stay empty
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    // Reset form state on close so every open starts fresh.
    setStatus("idle");
    setErrors({});
    closeDemo();
  }, [closeDemo]);

  // Lock body scroll, focus the first field, and close on Escape while open.
  // (No state resets here — those happen in handleClose.)
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const set = (key: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    // Clear the field's error as the user fixes it
    if (errors[key as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      // Move focus to the error summary for screen readers
      document.getElementById("demo-form-errors")?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(demoForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; mode?: string; note?: string; errors?: string[] };
      if (!res.ok || !data.ok) {
        throw new Error(data.errors?.join(" ") ?? "Submission failed.");
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-navy-950/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors ${
      hasError
        ? "border-red-400/70 focus:border-red-400"
        : "border-white/15 focus:border-forge-400"
    }`;

  const errorIds: Record<string, string> = {
    fullName: "demo-err-fullName",
    businessName: "demo-err-businessName",
    email: "demo-err-email",
    phone: "demo-err-phone",
    industry: "demo-err-industry",
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/12 bg-navy-900 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close demo request form"
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center">
            <CheckCircle2 size={52} className="mx-auto text-emerald-400" aria-hidden="true" />
            <h2 id="demo-modal-title" className="mt-4 text-2xl font-bold text-white">
              Request received
            </h2>
            <p className="mt-3 leading-relaxed text-slate-300">
              Thanks, {values.fullName.split(" ")[0] || "there"} — your demo request for{" "}
              {values.businessName || "your business"} has been sent. We’ll be in touch soon.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 rounded-xl bg-forge-500 px-6 py-3 text-sm font-semibold text-white hover:bg-forge-400"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="demo-modal-title" className="pr-8 text-2xl font-bold text-white">
              Book a Free Demo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Tell us about your business and we&apos;ll show you PennForge handling
              calls like yours.
            </p>

            {errorList.length > 0 && (
              <div
                id="demo-form-errors"
                role="alert"
                tabIndex={-1}
                className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <p className="font-semibold">Please fix the following:</p>
                <ul className="mt-1 list-disc pl-5">
                  {errorList.map(([key, msg]) => (
                    <li key={key}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}

            {status === "error" && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              >
                <TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>
                  Something went wrong submitting the form. Please check your connection
                  and try again.
                </p>
              </div>
            )}

            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
              {/* Honeypot — hidden from humans, bots fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                <label htmlFor="demo-company-website">Company website</label>
                <input
                  id="demo-company-website"
                  type="text"
                  name="company_website"
                  value={values.company_website}
                  onChange={set("company_website")}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="demo-fullName" className="mb-1.5 block text-sm font-medium text-slate-200">
                  Full name <span aria-hidden="true" className="text-forge-400">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="demo-fullName"
                  type="text"
                  autoComplete="name"
                  value={values.fullName}
                  onChange={set("fullName")}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? errorIds.fullName : undefined}
                  className={inputClass(!!errors.fullName)}
                  placeholder="Jane Smith"
                />
                {errors.fullName && (
                  <p id={errorIds.fullName} className="mt-1 text-xs text-red-300">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="demo-businessName" className="mb-1.5 block text-sm font-medium text-slate-200">
                  Business name <span aria-hidden="true" className="text-forge-400">*</span>
                </label>
                <input
                  id="demo-businessName"
                  type="text"
                  autoComplete="organization"
                  value={values.businessName}
                  onChange={set("businessName")}
                  aria-invalid={!!errors.businessName}
                  aria-describedby={errors.businessName ? errorIds.businessName : undefined}
                  className={inputClass(!!errors.businessName)}
                  placeholder="Smith Plumbing LLC"
                />
                {errors.businessName && (
                  <p id={errorIds.businessName} className="mt-1 text-xs text-red-300">{errors.businessName}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-email" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Email <span aria-hidden="true" className="text-forge-400">*</span>
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={set("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? errorIds.email : undefined}
                    className={inputClass(!!errors.email)}
                    placeholder="jane@smithplumbing.com"
                  />
                  {errors.email && (
                    <p id={errorIds.email} className="mt-1 text-xs text-red-300">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Phone <span aria-hidden="true" className="text-forge-400">*</span>
                  </label>
                  <input
                    id="demo-phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={set("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? errorIds.phone : undefined}
                    className={inputClass(!!errors.phone)}
                    placeholder="(570) 555-0100"
                  />
                  {errors.phone && (
                    <p id={errorIds.phone} className="mt-1 text-xs text-red-300">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="demo-industry" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Industry <span aria-hidden="true" className="text-forge-400">*</span>
                  </label>
                  <select
                    id="demo-industry"
                    value={values.industry}
                    onChange={set("industry")}
                    aria-invalid={!!errors.industry}
                    aria-describedby={errors.industry ? errorIds.industry : undefined}
                    className={`${inputClass(!!errors.industry)} ${values.industry ? "" : "text-slate-500"}`}
                  >
                    <option value="" disabled>
                      Select industry
                    </option>
                    {demoForm.industries.map((ind) => (
                      <option key={ind} value={ind} className="bg-navy-900 text-white">
                        {ind}
                      </option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p id={errorIds.industry} className="mt-1 text-xs text-red-300">{errors.industry}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="demo-callVolume" className="mb-1.5 block text-sm font-medium text-slate-200">
                    Monthly call volume <span className="text-slate-500">(optional)</span>
                  </label>
                  <select
                    id="demo-callVolume"
                    value={values.callVolume}
                    onChange={set("callVolume")}
                    className={`${inputClass(false)} ${values.callVolume ? "" : "text-slate-500"}`}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    {callVolumeOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-navy-900 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="demo-message" className="mb-1.5 block text-sm font-medium text-slate-200">
                  Message <span className="text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="demo-message"
                  rows={3}
                  value={values.message}
                  onChange={set("message")}
                  className={`${inputClass(false)} resize-none`}
                  placeholder="Anything we should know before the demo?"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-forge-500 px-6 py-3.5 text-base font-semibold text-white shadow-xl shadow-forge-500/25 transition-all hover:bg-forge-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  "Request My Free Demo"
                )}
              </button>
              <p className="text-center text-xs text-slate-500">
                We&apos;ll only use your details to arrange the demo. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
