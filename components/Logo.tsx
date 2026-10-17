/**
 * Temporary PennForge logo.
 * Angular forge/roof-inspired mark + bold wordmark.
 * Replace the inline SVG with the official logo asset when available —
 * layout and sizing stay the same.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="cf-mark" x1="4" y1="6" x2="30" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FB923C" />
            <stop offset="1" stopColor="#EA6A0A" />
          </linearGradient>
        </defs>
        {/* Outer roof peak */}
        <path
          d="M5 23 L17 8 L29 23"
          stroke="url(#cf-mark)"
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
        className="font-display text-[1.35rem] font-extrabold tracking-tight text-white"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        Call<span className="text-forge-500">Forge</span>
      </span>
    </span>
  );
}
