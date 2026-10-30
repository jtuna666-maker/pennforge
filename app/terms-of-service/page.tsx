import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — PennForge",
  description:
    "PennForge terms of service: plans, pricing, cancellation, and how Lucy works.",
};

export default function TermsOfService() {
  return (
    <main className="bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black tracking-tight text-white">
          PennForge Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          Effective date: October 30, 2026
        </p>
        <p className="mt-6 leading-relaxed text-slate-300">
          These terms govern your use of PennForge, an AI-powered phone
          receptionist for service businesses. By signing up for or using
          PennForge, you agree to these terms. If you do not agree, do not use
          the service.
        </p>
        <p className="mt-4 leading-relaxed text-slate-300">
          Contact us: jesse@pennforge.app · (570) 529-9998
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">1. The service</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            PennForge answers calls to your business phone number using Lucy,
            our AI receptionist. Lucy greets callers, gathers their name,
            callback number, and reason for calling, and sends that information
            to you by text message so you can follow up.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            2. Plans and pricing
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>
              <strong className="text-slate-200">Professional plan:</strong> $299
              per month
            </li>
            <li>
              <strong className="text-slate-200">One-time setup fee:</strong> $99
              (non-refundable)
            </li>
            <li>
              <strong className="text-slate-200">Included minutes:</strong> 500 AI
              call minutes per month; unused minutes do not roll over
            </li>
            <li>
              <strong className="text-slate-200">Additional minutes:</strong> $0.20
              per minute over the included amount
            </li>
          </ul>
          <p className="mt-3 leading-relaxed text-slate-300">
            Prices may change with reasonable notice. Continued use after a
            price change means you accept the new price.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            3. Term and cancellation
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Service is month-to-month. There is no long-term contract. Either
            side may cancel with 30 days’ notice. Service continues until the
            end of the notice period. The $99 setup fee is non-refundable.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            4. Setup and your responsibilities
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            To use PennForge, you must:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>
              Provide accurate information about your business, services,
              service area, and hours
            </li>
            <li>
              Authorize PennForge to set up call forwarding and AI answering
              for the phone number you designate
            </li>
            <li>
              Keep your own phone service active; PennForge answers calls
              forwarded to it and does not replace your phone carrier
            </li>
            <li>Keep your contact and payment information up to date</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            5. How Lucy works — and her limits
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>
              Lucy is an artificial intelligence system. She may occasionally
              mishear a name, number, or detail. Please review messages before
              acting on them.
            </li>
            <li>
              Lucy identifies herself as an AI receptionist where required by
              law. You are responsible for complying with any laws that apply
              to your business’s calls and customer communications.
            </li>
            <li>
              <strong className="text-slate-200">
                PennForge is not an emergency service.
              </strong>{" "}
              Callers with an emergency should dial 911. Lucy is not a
              substitute for human staff for urgent or safety-critical matters.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">6. Acceptable use</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            You agree to use PennForge only for lawful purposes. You will not
            use it to harass, deceive, or defame anyone, to break the law, or
            to interfere with the service or its underlying systems.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">7. Availability</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            PennForge aims to answer calls around the clock, but uninterrupted
            service is not guaranteed. Maintenance, outages, or third-party
            service issues may occasionally interrupt service.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            8. Billing and payment
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>Billing is monthly, in advance, to the payment method you provide.</li>
            <li>
              If a payment fails, we will notify you, and service may be paused
              until payment is made.
            </li>
            <li>
              You are responsible for any taxes that apply to your purchase,
              except where the law says otherwise.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">9. Liability</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            PennForge’s total liability for any claim related to the service
            will not exceed the fees you paid in the month before the claim
            arose. PennForge is not liable for indirect or consequential
            losses, including lost profits or lost business from a missed or
            mishandled call. Nothing in these terms limits liability that
            cannot be limited by law.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            10. Changes to the service or terms
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We may update the service or these terms from time to time.
            Material changes will be communicated with reasonable notice, and
            continued use after a change means you accept the updated terms.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">11. Governing law</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            These terms are governed by the laws of the Commonwealth of
            Pennsylvania.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">12. Contact</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Questions about these terms: jesse@pennforge.app · (570) 529-9998
          </p>
        </section>
      </div>
    </main>
  );
}
