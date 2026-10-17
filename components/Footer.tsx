"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { brand, contact, legal, navLinks } from "@/lib/site-config";
import { Logo } from "./Logo";

/**
 * Section L — Footer. No invented address. Legal links are placeholders
 * until real policy URLs exist (see lib/site-config.ts).
 */
export function Footer() {
  // Computed on the client after mount so prerendering stays deterministic.
  // Intentionally set once on mount (dynamic copyright year) — not derived state.
  const [year, setYear] = useState<number | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">{brand.tagline}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              <Mail size={15} className="text-forge-400" aria-hidden="true" />
              {contact.email}
            </a>
          </div>

          <nav aria-label="Product">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Product</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href="#demo" className="text-slate-400 hover:text-white">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="text-slate-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={legal.privacyPolicyUrl} className="text-slate-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href={legal.termsOfServiceUrl} className="text-slate-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {year ?? "2026"} {brand.name}. All rights reserved.</p>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
