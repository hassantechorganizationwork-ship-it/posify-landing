import { ImageResponse } from "next/og";

export const alt = "Posify — Pakistan's #1 POS Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 55%, #1a1530 100%)",
          color: "#e6edf3",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* glow accent */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 999,
            background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(99,102,241,0) 70%)",
            display: "flex",
          }}
        />

        {/* Logo + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 38 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 900,
              color: "#fff",
            }}
          >
            P
          </div>
          <div style={{ fontSize: 44, fontWeight: 800 }}>Posify</div>
          <div
            style={{
              marginLeft: 8,
              padding: "6px 18px",
              borderRadius: 999,
              border: "1px solid rgba(99,102,241,0.5)",
              background: "rgba(99,102,241,0.15)",
              color: "#a5b4fc",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Built for Pakistan
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", fontSize: 76, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1 }}>
          Pakistan ka #1
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1 }}>
          <span style={{ color: "#818cf8" }}>POS Software</span>
        </div>

        {/* Subtitle */}
        <div style={{ display: "flex", fontSize: 30, color: "#8b949e", marginTop: 28 }}>
          Restaurant / Grocery / Boutique / Pharmacy - FBR Integrated
        </div>

        {/* Price pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 40 }}>
          <div
            style={{
              display: "flex",
              padding: "14px 30px",
              borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            Rs. 2,000 / month
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#34d399", fontWeight: 700 }}>
            Free Trial
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
