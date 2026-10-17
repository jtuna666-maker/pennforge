import { Briefcase, MoonStar, PhoneMissed, Voicemail } from "lucide-react";
import { painPoints } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const icons = [Briefcase, PhoneMissed, MoonStar, Voicemail];

/**
 * Section C — The Problem. Four pain-point cards, then a transition
 * into the solution. No invented statistics.
 */
export function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="relative bg-navy-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Every Missed Call Could Be a Missed Opportunity.
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            You didn&apos;t get into the trades to run a call center. But every
            time the phone rings while you&apos;re working, that&apos;s the choice
            you&apos;re forced to make.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {painPoints.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={point.title} delay={0.08 * i}>
                <article className="group h-full rounded-2xl border border-white/10 bg-navy-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forge-500/40 hover:shadow-xl hover:shadow-forge-500/10">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-forge-500/15 text-forge-400 transition-colors group-hover:bg-forge-500/25">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-400">{point.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center" delay={0.1}>
          <p className="text-xl font-medium text-slate-200">
            What if <span className="font-semibold text-forge-400">every call got answered</span> —
            even the ones that come in while you&apos;re on the tools?
          </p>
          <a
            href="#how-it-works"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-forge-500/40 bg-forge-500/10 px-6 py-3 text-sm font-semibold text-forge-300 transition-colors hover:bg-forge-500/20"
          >
            See how PennForge works
            <span aria-hidden="true">↓</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
