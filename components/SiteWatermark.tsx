/**
 * Site-wide fixed watermark: one large, faint PennForge mark + wordmark
 * pinned to the center of the viewport. Page content scrolls over it;
 * the watermark itself never moves.
 *
 * It can never interfere with the page: pointer-events-none (clicks pass
 * straight through), aria-hidden (invisible to screen readers), and a
 * deliberately low opacity so text stays exactly as readable as before.
 * To make it stronger or fainter, change only the opacity value below.
 */
export function SiteWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] flex select-none items-center justify-center"
    >
      <div className="flex flex-col items-center gap-5 opacity-[0.07]">
        <svg
          viewBox="0 0 34 34"
          fill="none"
          aria-hidden="true"
          className="h-auto w-[min(52vw,340px)]"
        >
          <defs>
            <linearGradient
              id="pf-mark-watermark"
              x1="4"
              y1="6"
              x2="30"
              y2="28"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FB923C" />
              <stop offset="1" stopColor="#EA6A0A" />
            </linearGradient>
          </defs>
          {/* Outer roof peak */}
          <path
            d="M5 23 L17 8 L29 23"
            stroke="url(#pf-mark-watermark)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inner forge notch */}
          <path
            d="M11.5 23 L17 16 L22.5 23"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.92"
          />
        </svg>
        <span
          className="font-display text-[clamp(3rem,10vw,6.5rem)] leading-none font-extrabold tracking-tight text-white"
          style={{ fontFamily: "var(--font-archivo)" }}
        >
          Penn<span className="text-forge-500">Forge</span>
        </span>
      </div>
    </div>
  );
}
