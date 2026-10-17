"use client";

import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { contact, ctaLabels, finalCta } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";
import { Reveal } from "./Reveal";

/**
 * Section K — Final CTA. Dramatic navy + orange conversion block.
 */
export function FinalCta() {
  const { openDemo } = useDemoModal();

  return (
    <section aria-labelledby="final-cta-heading" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-blueprint absolute inset-0 opacity-70" />
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forge-500/15 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <h2
            id="final-cta-heading"
            className="font-display text-4xl font-black tracking-tight text-white text-balance sm:text-6xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            {finalCta.headline}
          </h2>
          <p className="mt-5 text-xl text-slate-300">{finalCta.subheadline}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openDemo}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forge-500 px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-forge-500/30 transition-all hover:bg-forge-400 sm:w-auto"
            >
              {ctaLabels.bookYourFreeDemo}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent("Question about PennForge")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 sm:w-auto"
            >
              <MessageCircleQuestion size={18} aria-hidden="true" />
              {ctaLabels.askQuestion}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
