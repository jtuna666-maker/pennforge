"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BadgeCheck, PhoneIncoming } from "lucide-react";
import { ctaLabels, hero } from "@/lib/site-config";
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
 * Hero — split editorial layout. Left: eyebrow, headline, CTAs, benefits.
 * Right: layered phone mock (incoming call + AI status + lead capture).
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

      <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-16 sm:px-6 sm:pt-20 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8 lg:pt-24 lg:pb-24">
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

          <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            custom={4}
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

        {/* Visual composition */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 lg:mt-0"
          aria-hidden="true"
        >
          <div className="relative mx-auto max-w-[420px]">
            {/* Phone frame */}
            <div className="animate-float rounded-[2.2rem] border border-white/15 bg-navy-900/90 p-3 shadow-2xl shadow-black/60 backdrop-blur">
              <div className="rounded-[1.7rem] bg-navy-950 px-5 pt-8 pb-6">
                {/* Incoming call */}
                <div className="text-center">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-mist uppercase">
                    Incoming call
                  </p>
                  <div className="relative mx-auto mt-5 h-20 w-20">
                    <span className="animate-pulse-ring absolute inset-0 rounded-full bg-forge-500/50" />
                    <span
                      className="animate-pulse-ring absolute inset-0 rounded-full bg-forge-500/30"
                      style={{ animationDelay: "1.2s" }}
                    />
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-forge-400 to-forge-600 text-xl font-bold text-white">
                      SM
                    </span>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-white">Sarah Mitchell</p>
                  <p className="text-sm text-mist">Summit Ridge Plumbing line</p>
                  <div className="mt-5 flex justify-center gap-6">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/90 shadow-lg">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.7 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.7 2.11L8.09 9.91" transform="rotate(135 12 12)"/></svg>
                    </span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.7 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.7 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI status pill */}
            <div className="animate-float-slow absolute -top-4 -right-3 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-navy-900/95 px-4 py-2 shadow-xl backdrop-blur sm:-right-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-semibold text-white">AI Receptionist · Answering</span>
            </div>

            {/* Lead capture card */}
            <div className="animate-float-slow absolute -bottom-8 -left-3 w-64 rounded-2xl border border-white/10 bg-navy-900/95 p-4 shadow-2xl backdrop-blur sm:-left-10" style={{ animationDelay: "1.4s" }}>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">
                Lead captured
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                <li className="flex items-center gap-2 text-slate-200">
                  <BadgeCheck size={15} className="shrink-0 text-emerald-400" /> Sarah Mitchell
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <BadgeCheck size={15} className="shrink-0 text-emerald-400" /> (570) 555-0148
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <BadgeCheck size={15} className="shrink-0 text-emerald-400" /> Leaking water heater
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
