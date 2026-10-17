import { ImageResponse } from "next/og";

export const alt = "PennForge — AI receptionist for contractors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f8fafc",
          background: "linear-gradient(135deg, #0b1424 0%, #15243a 70%, #1e3454 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#f97316",
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            CF
          </div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>PennForge</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ maxWidth: 940, fontSize: 82, lineHeight: 1.02, fontWeight: 900 }}>
            Never miss another call.
          </div>
          <div style={{ maxWidth: 880, color: "#cbd5e1", fontSize: 34, lineHeight: 1.25 }}>
            The AI receptionist that answers, captures leads, and helps book jobs 24/7.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "2px solid #fb923c",
            borderRadius: 999,
            padding: "13px 22px",
            color: "#fed7aa",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Built for contractors and home-service businesses
        </div>
      </div>
    ),
    size,
  );
}
