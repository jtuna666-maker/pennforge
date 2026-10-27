"use client";

import { ArrowRight, Phone } from "lucide-react";
import { contact, ctaLabels } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";
import { Reveal } from "./Reveal";

/**
 * Section E — Live Demo.
 *
 * No scripted transcript, no simulation. Visitors call Lucy herself on
 * (570) 529-9998 — the real AI receptionist, answering around the clock
 * exactly as she would for their business. They can also leave their
 * details with Lucy and Jesse follows up personally, or request a demo
 * through the form / by email.
 *
 * Kept the `demo` section id so existing links still land here.
 */

export function DemoPreview() {
  const { openDemo } = useDemoModal();

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-20 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-forge-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-forge-400 to-forge-600 text-white shadow-xl shadow-forge-500/30">
            <Phone size={32} aria-hidden="true" />
          </span>

          <p className="mt-8 text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            Live demo
          </p>
          <h2
            id="demo-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Want a live demo of Lucy?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
            No scripts, no simulations — call and talk to Lucy herself. She
            answers around the clock, exactly as she would for your business.
            Ask her anything about PennForge, or leave your details and Jesse
            will personally follow up.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={contact.phoneHref}
              className="inline-flex items-center gap-2 rounded-xl bg-forge-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-forge-500/25 transition-all hover:bg-forge-400"
            >
              <Phone size={18} aria-hidden="true" />
              Call Lucy now — {contact.phone}
            </a>
            <button
              type="button"
              onClick={openDemo}
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
            >
              {ctaLabels.bookFreeDemo}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>

          <p className="mt-6 text-sm text-mist">
            Prefer email?{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold text-forge-400 hover:text-white">
              {contact.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
