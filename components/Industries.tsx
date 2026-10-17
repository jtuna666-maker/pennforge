import {
  HardHat,
  House,
  Leaf,
  Thermometer,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { industries } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Thermometer,
  Zap,
  House,
  Leaf,
  HardHat,
};

/**
 * Section G — Industries. Trade-specific cards with a concrete use case each.
 */
export function Industries() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative scroll-mt-20 bg-navy-950 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            Industries
          </p>
          <h2
            id="industries-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Built for Businesses That Can&apos;t Stop Working to Answer the Phone.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.icon] ?? Wrench;
            return (
              <Reveal key={industry.name} delay={0.07 * (i % 3)}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-navy-900/80 to-navy-950 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forge-500/40 hover:shadow-xl hover:shadow-forge-500/10">
                  <div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-forge-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forge-500/15 text-forge-400">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{industry.name}</h3>
                  <p className="mt-2 leading-relaxed text-slate-400">“{industry.useCase}”</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
