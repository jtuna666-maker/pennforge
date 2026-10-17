"use client";

import { Check } from "lucide-react";
import { ctaLabels, pricing } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";
import { Reveal } from "./Reveal";

/**
 * Section H — Pricing. The exact approved offer: one plan, setup fee,
 * overage rate. No invented tiers, discounts, or trials.
 */
export function Pricing() {
  const { openDemo } = useDemoModal();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-blueprint relative scroll-mt-20 overflow-hidden bg-navy-900/40 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="h-[420px] w-[720px] rounded-full bg-forge-500/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            One Simple Plan. More Calls Answered.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-14 max-w-xl">
          <article className="relative overflow-hidden rounded-3xl border border-forge-500/30 bg-navy-950/90 shadow-2xl shadow-forge-500/10 backdrop-blur">
            <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-forge-600 via-forge-400 to-forge-600" />
            <div className="p-8 sm:p-10">
              <h3 className="text-center text-sm font-semibold tracking-[0.2em] text-forge-400 uppercase">
                {pricing.planName}
              </h3>

              <p className="mt-6 text-center">
                <span
                  className="font-display text-6xl font-black tracking-tight text-white"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  ${pricing.monthlyPrice}
                </span>
                <span className="text-lg text-mist"> / month</span>
              </p>
              <p className="mt-2 text-center text-sm text-slate-400">
                + ${pricing.setupFee} one-time setup fee
              </p>

              <ul className="mt-8 space-y-3.5">
                {pricing.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.95rem] text-slate-200">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forge-500/20">
                      <Check size={13} className="text-forge-400" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
                <p className="text-sm text-slate-300">
                  Additional AI minutes:{" "}
                  <span className="font-semibold text-white">
                    ${pricing.overageRate.toFixed(2)} per minute
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={openDemo}
                className="mt-8 w-full rounded-xl bg-forge-500 px-7 py-4 text-base font-semibold text-white shadow-xl shadow-forge-500/25 transition-all hover:bg-forge-400"
              >
                {ctaLabels.bookFreeDemo}
              </button>

              <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">
                {pricing.note}
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
