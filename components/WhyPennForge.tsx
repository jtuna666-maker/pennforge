"use client";

import { ArrowRight } from "lucide-react";
import { ctaLabels, whyPennForge } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";
import { Reveal } from "./Reveal";

/**
 * Section I — Why PennForge. Split section: sticky headline on the left,
 * practical value points on the right. No revenue guarantees.
 */
export function WhyPennForge() {
  const { openDemo } = useDemoModal();

  return (
    <section
      aria-labelledby="why-heading"
      className="relative bg-navy-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
                Why PennForge
              </p>
              <h2
                id="why-heading"
                className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
                style={{ fontFamily: "var(--font-archivo)" }}
              >
                {whyPennForge.headline}
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-slate-300">
                Your crew&apos;s job is the work in front of them. PennForge
                makes sure the phone never pulls them off it.
              </p>
              <button
                type="button"
                onClick={openDemo}
                className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-forge-400 hover:text-forge-300"
              >
                {ctaLabels.bookFreeDemo}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          <ul className="space-y-4">
            {whyPennForge.points.map((point, i) => (
              <li key={point.title}>
                <Reveal delay={0.06 * i}>
                  <div className="flex gap-5 rounded-2xl border border-white/10 bg-navy-900/60 p-6 transition-colors hover:border-forge-500/30">
                    <span
                      aria-hidden="true"
                      className="font-display text-2xl font-black text-forge-500/70"
                      style={{ fontFamily: "var(--font-archivo)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-slate-400">{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
