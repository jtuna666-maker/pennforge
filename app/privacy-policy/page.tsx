import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PennForge",
  description:
    "PennForge privacy policy: what information we collect, how we use it, and what choices you have.",
};

export default function PrivacyPolicy() {
  return (
    <main className="bg-navy-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black tracking-tight text-white">
          PennForge Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          Effective date: October 30, 2026
        </p>
        <p className="mt-6 leading-relaxed text-slate-300">
          PennForge provides an AI-powered phone receptionist for service
          businesses such as plumbers, HVAC companies, and other home-service
          pros. This policy explains what information we collect, how we use
          it, and what choices you have.
        </p>
        <p className="mt-4 leading-relaxed text-slate-300">
          Contact us: jesse@pennforge.app · (570) 529-9998
        </p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            1. Information we collect
          </h2>
          <p className="mt-3 font-semibold text-slate-200">
            From our business customers:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>Your name, business name, phone number, and email address</li>
            <li>The phone number you want PennForge to answer</li>
            <li>
              Information about your services, service area, and hours, so Lucy
              can answer callers accurately
            </li>
            <li>Billing information, handled through our payment provider (see Section 4)</li>
          </ul>
          <p className="mt-6 font-semibold text-slate-200">
            From callers to your business:
          </p>
          <p className="mt-2 leading-relaxed text-slate-300">
            When someone calls your PennForge-covered number, Lucy may collect:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>The caller’s name and callback number</li>
            <li>The reason for their call and any details they choose to share</li>
            <li>The date, time, and length of the call</li>
          </ul>
          <p className="mt-3 leading-relaxed text-slate-300">
            This information is passed to you, the business, so you can follow
            up. PennForge does not use caller information to contact callers
            for its own marketing.
          </p>
          <p className="mt-6 font-semibold text-slate-200">
            From website visitors:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>
              Information you submit through our demo-request form (name,
              business, phone, email, and message)
            </li>
            <li>
              Basic technical information our website host records automatically,
              such as browser type and pages visited
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            2. How we use information
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We use the information we collect to:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>Provide the receptionist service and deliver message alerts to you</li>
            <li>Set up and manage your account and billing</li>
            <li>Respond to your questions and demo requests</li>
            <li>Operate, maintain, and improve the service</li>
            <li>Comply with the law</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            3. How information is shared
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We share information only as needed to run the service:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-6 leading-relaxed text-slate-300">
            <li>
              <strong className="text-slate-200">Phone provider (Twilio):</strong>{" "}
              carries the calls and sends message alerts
            </li>
            <li>
              <strong className="text-slate-200">AI provider (OpenAI):</strong>{" "}
              powers Lucy’s understanding and replies during calls
            </li>
            <li>
              <strong className="text-slate-200">Hosting providers (Microsoft Azure, Vercel):</strong>{" "}
              run the voice service and website
            </li>
            <li>
              <strong className="text-slate-200">Email provider (Resend):</strong>{" "}
              delivers demo-request and service emails
            </li>
          </ul>
          <p className="mt-3 leading-relaxed text-slate-300">
            These providers may only use the information to perform their
            services for PennForge. We do <strong className="text-slate-200">not</strong> sell
            your information or caller information to anyone. We may also share
            information if required by law or to protect the safety and rights
            of PennForge, its customers, or others.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">4. Payments</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Payments are processed by our payment provider. PennForge does not
            receive or store your full card number.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">5. Call handling</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            Lucy is an AI receptionist. She identifies herself as an AI
            receptionist where required by law. Call audio is processed in real
            time so Lucy can understand the caller. PennForge does not record
            or store call audio.
          </p>
          <p className="mt-3 leading-relaxed text-slate-300">
            Call records and event logs — such as the numbers involved, the
            time, and the duration of a call — are kept by our phone provider
            for 13 months by default.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">6. Data retention</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We keep information only as long as needed to provide the service
            and for a reasonable period afterward, for example to handle
            billing questions. You may ask us to delete your information (see
            Section 8); we will honor deletion requests except where the law
            requires us to keep something. Note that call records held by our
            phone provider follow the provider’s own retention period (see
            Section 5), which PennForge does not control.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">7. Security</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We use reasonable technical and organizational measures to protect
            information. No system is completely secure, and we cannot guarantee
            absolute security.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            8. Your choices and rights
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            You may ask us to access, correct, or delete your information by
            contacting jesse@pennforge.app. We will respond within a reasonable
            time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">9. Children</h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            PennForge is a business service and is not directed at children
            under 13. We do not knowingly collect information from children
            under 13.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-white">
            10. Changes to this policy
          </h2>
          <p className="mt-3 leading-relaxed text-slate-300">
            We may update this policy from time to time. The updated version
            will be posted on our website with a new effective date. Continued
            use of the service after a change means you accept the updated
            policy.
          </p>
        </section>
      </div>
    </main>
  );
}
