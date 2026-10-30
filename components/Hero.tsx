"use client";

import { ArrowRight, BadgeCheck, PhoneIncoming } from "lucide-react";
import { contact, ctaLabels, hero } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";

const benefitIcons = [PhoneIncoming, BadgeCheck, BadgeCheck, BadgeCheck];

/**
 * Hero — eyebrow, headline, Call Lucy CTA card, CTAs, benefits. Copy only.
 * The truck visual and the fixed background watermark were both removed
 * 2026-10-30 at Jesse's decision ("Remove both, no truck background")
 * to speed up mobile loading: the truck was a ~167KB embedded image in
 * this file, and the watermark was a fixed element over every page.
 * No background image is used here.
 * 2026-10-30 evening: the Call Lucy number was made the hero's second
 * focal point (after the headline) as a large bordered card, because
 * the old plain-text phone line blended in and was easy to skim past.
 */
export function Hero() {
  const { openDemo } = useDemoModal();

  return (
    <section id="top" className="bg-blueprint relative overflow-hidden pt-16">
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-forge-500/12 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-navy-700/50 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 lg:pb-24">
        {/* Copy */}
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-forge-500/30 bg-forge-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-forge-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-forge-400" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            className="mt-6 font-display text-[2.65rem] leading-[1.02] font-black tracking-tight text-white text-balance sm:text-6xl lg:text-[4.35rem]"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {hero.headlineTop}{" "}
            <span className="text-forge-500">{hero.headlineAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            {hero.subcopy}
          </p>

          <div className="mt-8 rounded-2xl border-2 border-forge-500/60 bg-navy-900/70 p-5 shadow-lg shadow-forge-500/10 sm:p-6">
            <p className="flex items-center gap-2 text-sm font-bold text-white">
              <PhoneIncoming size={18} className="shrink-0 text-forge-400" aria-hidden="true" />
              Call Lucy now to test her live
            </p>
            <a
              href={contact.phoneHref}
              aria-label={`Call Lucy now at ${contact.phone}`}
              className="mt-2 block text-3xl font-black tracking-tight text-forge-400 hover:text-forge-300 sm:text-[2.75rem] sm:leading-none"
            >
              {contact.phone}
            </a>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Talk to Lucy herself — no script, no recording. Leave your details
              and we&apos;ll get back to you promptly. Prefer email?{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold text-forge-400 hover:text-white">
                {contact.email}
              </a>{" "}
              for a free demo.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openDemo}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-forge-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-forge-500/25 transition-all hover:bg-forge-400 hover:shadow-forge-400/30"
            >
              {ctaLabels.bookFreeDemo}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
            >
              {ctaLabels.seeHowItWorks}
            </a>
          </div>

          <ul
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7"
            aria-label="Key benefits"
          >
            {hero.benefits.map((benefit, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <li key={benefit} className="flex items-center gap-2 text-sm font-medium text-slate-300">
                  <Icon size={16} className="shrink-0 text-forge-400" aria-hidden="true" />
                  {benefit}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
