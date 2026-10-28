"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, PhoneIncoming } from "lucide-react";
import { contact, ctaLabels, hero } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";

const benefitIcons = [PhoneIncoming, BadgeCheck, BadgeCheck, BadgeCheck];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Hero — eyebrow, headline, CTAs, benefits.
 * The phone-mock visual (incoming call + AI status + lead capture)
 * was removed 2026-10-28, so the hero is copy only.
 */
export function Hero() {
  const { openDemo } = useDemoModal();
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="bg-blueprint relative overflow-hidden pt-16">
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-forge-500/12 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-navy-700/50 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 lg:pb-24">
        {/* Copy */}
        <motion.div
          initial={reduceMotion ? undefined : "hidden"}
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-forge-500/30 bg-forge-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-forge-400 uppercase"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-forge-400" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="mt-6 font-display text-[2.65rem] leading-[1.02] font-black tracking-tight text-white text-balance sm:text-6xl lg:text-[4.35rem]"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {hero.headlineTop}{" "}
            <span className="text-forge-500">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
          >
            {hero.subcopy}
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            className="mt-6 text-base font-semibold text-white"
          >
            Call <a href={contact.phoneHref} className="text-forge-400 hover:text-white">{contact.phone}</a>{" "}
            or email{" "}
            <a href={`mailto:${contact.email}`} className="text-forge-400 hover:text-white">
              {contact.email}
            </a>{" "}
            for a free demo.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={4}
            className="mt-3 text-sm leading-relaxed text-slate-400"
          >
            When you call, you&apos;ll reach Lucy, our AI receptionist — leave your
            details and we&apos;ll get back to you promptly.
          </motion.p>

          <motion.div variants={fadeUp} custom={5} className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          </motion.div>

          <motion.ul
            variants={fadeUp}
            custom={6}
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
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
