import {
  BellRing,
  BookOpen,
  CalendarCheck,
  Megaphone,
  MoonStar,
  PhoneCall,
  PhoneForwarded,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/lib/site-config";
import { Reveal } from "./Reveal";

/** Maps config icon names to Lucide components. */
const iconMap: Record<string, LucideIcon> = {
  PhoneCall,
  UserPlus,
  CalendarCheck,
  BookOpen,
  BellRing,
  PhoneForwarded,
  MoonStar,
  Megaphone,
};

/**
 * Section F — Features grid. Benefit-focused copy, subtle hover lift.
 */
export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative scroll-mt-20 bg-navy-900/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
            style={{ fontFamily: "var(--font-archivo)" }}
          >
            Everything Your Phone Should Be Doing for You.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? PhoneCall;
            return (
              <Reveal key={feature.title} delay={0.06 * (i % 4)}>
                <article className="group h-full rounded-2xl border border-white/10 bg-navy-950/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forge-500/40 hover:shadow-xl hover:shadow-forge-500/10">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-forge-500/25 to-forge-500/10 text-forge-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-400">{feature.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
