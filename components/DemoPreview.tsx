"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, MapPin, Play, RotateCcw, Wrench } from "lucide-react";
import { ctaLabels, demoCall } from "@/lib/site-config";
import { useDemoModal } from "./demo-modal-context";
import { Reveal } from "./Reveal";

/**
 * Section E — Interactive Demo Preview.
 *
 * ARCHITECTURE NOTE (for future integration):
 * The conversation below is fully scripted from `demoCall.script` in
 * lib/site-config.ts. To upgrade this to a real demo later:
 *   1. Add a real demo phone number → replace the "Play Demo" trigger with a
 *      tel: link / click-to-call widget, or
 *   2. Add an audio clip → swap the transcript timer for an <audio> element
 *      synced to the same script steps, or
 *   3. Add a backend → POST to a demo-session endpoint and stream real
 *      transcript events into the same message list UI.
 * The message list, timer, and lead-summary components are already
 * decoupled from the scripted driver so any of these can slot in.
 *
 * This is ALWAYS labeled as a simulation — never presented as a live call.
 */

type Phase = "idle" | "playing" | "done";

const STEP_MS = 2300;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function DemoPreview() {
  const { openDemo } = useDemoModal();
  const [phase, setPhase] = useState<Phase>("idle");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const startDemo = () => {
    clearTimers();
    setPhase("playing");
    setVisibleSteps(0);
    setElapsed(0);

    demoCall.script.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => setVisibleSteps(i + 1), STEP_MS * (i + 1))
      );
    });
    // Finish shortly after the last message
    timers.current.push(
      window.setTimeout(() => setPhase("done"), STEP_MS * (demoCall.script.length + 1))
    );
  };

  const resetDemo = () => {
    clearTimers();
    setPhase("idle");
    setVisibleSteps(0);
    setElapsed(0);
  };

  // Call timer
  useEffect(() => {
    if (phase !== "playing") return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [phase]);

  return (
    <section
      id="demo"
      aria-labelledby="demo-heading"
      className="relative scroll-mt-20 overflow-hidden bg-navy-950 py-20 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-forge-500/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] text-forge-400 uppercase">
              Interactive demo
            </p>
            <h2
              id="demo-heading"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white text-balance sm:text-5xl"
              style={{ fontFamily: "var(--font-archivo)" }}
            >
              Meet Your New Front Desk.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              This is what your customers experience: a professional greeting,
              the right questions, and every detail captured — while
              you&apos;re still on the job.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">
              <span aria-hidden="true">ⓘ</span>
              Interactive simulation — scripted demo, not a live phone call.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <dt className="text-mist">Caller</dt>
                <dd className="mt-1 font-semibold text-white">{demoCall.callerName}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <dt className="text-mist">Business</dt>
                <dd className="mt-1 font-semibold text-white">{demoCall.businessName}</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <dt className="text-mist">Request</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-semibold text-white">
                  <Wrench size={14} className="text-forge-400" aria-hidden="true" />
                  {demoCall.request}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-navy-900/60 p-4">
                <dt className="text-mist">Location</dt>
                <dd className="mt-1 flex items-center gap-1.5 font-semibold text-white">
                  <MapPin size={14} className="text-forge-400" aria-hidden="true" />
                  {demoCall.location}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <button
                type="button"
                onClick={openDemo}
                className="rounded-xl bg-forge-500 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-forge-500/25 transition-all hover:bg-forge-400"
              >
                {ctaLabels.bookFreeDemo}
              </button>
            </div>
          </Reveal>

          {/* Simulated call interface */}
          <Reveal delay={0.12}>
            <div className="mx-auto max-w-[430px] rounded-[2rem] border border-white/12 bg-navy-900/80 p-3 shadow-2xl shadow-black/60">
              <div className="flex min-h-[560px] flex-col rounded-[1.6rem] bg-navy-950 p-5">
                {/* Call header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-forge-400 to-forge-600 text-sm font-bold text-white">
                      SM
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{demoCall.callerName}</p>
                      <p className="text-xs text-mist">{demoCall.callerPhone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {phase === "playing" ? (
                      <>
                        <p className="flex items-center justify-end gap-1.5 text-xs font-semibold text-emerald-400">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                          Live
                        </p>
                        <p className="mt-0.5 text-xs text-mist tabular-nums" aria-live="off">
                          {formatTime(elapsed)}
                        </p>
                      </>
                    ) : phase === "done" ? (
                      <p className="text-xs font-semibold text-mist">Call ended</p>
                    ) : (
                      <p className="text-xs font-semibold text-mist">Ready</p>
                    )}
                  </div>
                </div>

                {/* Transcript */}
                <div
                  className="flex-1 space-y-3 overflow-y-auto py-4"
                  aria-live="polite"
                  aria-label="Simulated call transcript"
                >
                  {phase === "idle" && (
                    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
                      <button
                        type="button"
                        onClick={startDemo}
                        className="group flex h-20 w-20 items-center justify-center rounded-full bg-forge-500 text-white shadow-xl shadow-forge-500/30 transition-transform hover:scale-105"
                        aria-label="Play simulated demo call"
                      >
                        <Play size={30} className="ml-1" aria-hidden="true" />
                      </button>
                      <p className="mt-5 text-sm font-medium text-slate-300">Play Demo</p>
                      <p className="mt-1 max-w-[220px] text-xs text-mist">
                        Watch a scripted call play out, message by message.
                      </p>
                    </div>
                  )}

                  {demoCall.script.slice(0, visibleSteps).map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${line.speaker === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          line.speaker === "ai"
                            ? "rounded-bl-md bg-navy-800 text-slate-100"
                            : "rounded-br-md bg-forge-500/90 text-white"
                        }`}
                      >
                        {line.speaker === "ai" && (
                          <p className="mb-0.5 text-[10px] font-bold tracking-wider text-forge-400 uppercase">
                            PennForge AI
                          </p>
                        )}
                        {line.text}
                      </div>
                    </div>
                  ))}

                  {phase === "playing" && visibleSteps < demoCall.script.length && (
                    <div className="flex justify-start" aria-hidden="true">
                      <div className="flex gap-1 rounded-2xl rounded-bl-md bg-navy-800 px-4 py-3">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-mist"
                            style={{ animationDelay: `${d * 0.18}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Lead summary / controls */}
                <div className="border-t border-white/10 pt-4">
                  {phase === "done" ? (
                    <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/5 p-4">
                      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
                        <CheckCircle2 size={16} aria-hidden="true" />
                        Lead summary sent
                      </p>
                      <ul className="mt-2 space-y-1 text-[13px] text-slate-300">
                        {demoCall.leadSummary.map((item) => (
                          <li key={item.label}>
                            <span className="text-mist">{item.label}: </span>
                            <span className="font-medium text-white">{item.value}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={resetDemo}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-forge-400 hover:text-forge-300"
                      >
                        <RotateCcw size={13} aria-hidden="true" />
                        Replay simulation
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-mist">Simulation · fictional data</p>
                      {phase === "playing" ? (
                        <button
                          type="button"
                          onClick={resetDemo}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5"
                        >
                          <RotateCcw size={13} aria-hidden="true" />
                          Restart
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={startDemo}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-forge-500 px-4 py-2 text-xs font-bold text-white hover:bg-forge-400"
                        >
                          <Play size={13} aria-hidden="true" />
                          Play Demo
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
