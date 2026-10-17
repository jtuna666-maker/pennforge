import { howItWorksNote, howItWorksSteps } from "@/lib/site-config";
import { Reveal } from "./Reveal";

/**
 * Section D — How PennForge Works. Four-step timeline from ringing phone
 * to qualified lead, with a qualification note on configuration-dependent
 * features.
 */
export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="relative scroll-mt-20 bg-navy-900/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            How it works
          </p>
          <h2
            id="how-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            From Ringing Phone to Qualified Lead.
          </h2>
          <p className="mt-5 text-lg text-slate-300">
            No new hardware, no app for your customers to download. They call
            your number — PennForge does the rest.
          </p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connector line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-forge-500/50 to-transparent lg:block"
          />
          {howItWorksSteps.map((step, i) => (
            <li key={step.number} className="relative">
              <Reveal delay={0.1 * i}>
                <span
                  aria-hidden="true"
                  className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-forge-500/30 bg-navy-950 font-display text-lg font-extrabold text-forge-400 shadow-lg shadow-forge-500/10"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {step.number}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-slate-400">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-14" delay={0.15}>
          <p className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm text-slate-400">
            <span className="font-semibold text-slate-300">Good to know: </span>
            {howItWorksNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
