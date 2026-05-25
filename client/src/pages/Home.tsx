/**
 * TCG Coming Soon — v3 Design Implementation
 *
 * Faithfully implements TCG Landing Page v3.html from the handoff bundle.
 *
 * Design system (colors_and_type.css):
 *   --tcg-navy-900: #061130  (body bg)
 *   --tcg-navy-800: #0A1A40  (gradient stop)
 *   --tcg-yellow-400: #FAD93D (accent — chevron, rules, CTA)
 *   --tcg-yellow-300: #FCE15B (hover)
 *   --font-display: "Barlow Condensed"
 *   --font-sans:    "Barlow"
 *   --font-body:    "Source Sans 3"
 *
 * Layout: fixed-shell grid (header / center / footer), no scroll on desktop.
 * Assets: real PNGs from handoff bundle, uploaded to /manus-storage/.
 */

import { useEffect, useRef, useState } from "react";

// ─── Asset URLs (uploaded from handoff bundle) ────────────────────────────────
const ASSETS = {
  logoWhite:    "/manus-storage/tcg-logo-white_e296c14d.png",
  heroTruck:    "/manus-storage/hero-truck_6751829a.png",
  networkMap:   "/manus-storage/network-map_fb7f77c7.png",
  brands: {
    skyTransport: "/manus-storage/brand-sky-transport_7468a822.png",
    tli:          "/manus-storage/brand-tli_2cfee114.png",
    ctsStrong:    "/manus-storage/brand-cts-strong_06b8ba47.png",
    dli:          "/manus-storage/brand-dli_87707888.png",
    skyLogistica: "/manus-storage/brand-sky-logistica_13541c2b.png",
    ilsci:        "/manus-storage/brand-ilsci_8ab5cec8.png",
    walts:        "/manus-storage/brand-walts_7e6ca9a7.png",
    copp:         "/manus-storage/brand-copp_080df38b.png",
    ils:          "/manus-storage/brand-ils_93cbe831.png",
  },
};

// ─── Email Capture ────────────────────────────────────────────────────────────

function SignupForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  if (sent) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "min(540px, 100%)",
          padding: "18px 28px",
          background: "rgba(250,217,61,0.06)",
          border: "1px solid #FAD93D",
          borderRadius: "999px",
        }}
      >
        <span
          style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: "13px",
            letterSpacing: "0.04em",
            color: "#FCE15B",
            textTransform: "uppercase",
          }}
        >
          — You're on the list. See you summer '26. —
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: focused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${focused ? "#FAD93D" : "rgba(255,255,255,0.18)"}`,
        borderRadius: "999px",
        padding: "6px 6px 6px 22px",
        width: "min(540px, 100%)",
        boxShadow: focused ? "0 0 0 3px rgba(250,217,61,0.16)" : "none",
        transition: "border-color 220ms ease, background 220ms ease, box-shadow 220ms ease",
      }}
    >
      <label htmlFor="email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        Work email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="your@email.com"
        autoComplete="email"
        required
        style={{
          flex: 1,
          background: "transparent",
          border: 0,
          outline: 0,
          color: "#fff",
          fontFamily: "'Source Sans 3', 'Barlow', sans-serif",
          fontSize: "15px",
          padding: "13px 0",
          minWidth: 0,
        }}
      />
      <button
        type="submit"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          background: "#FAD93D",
          color: "#061130",
          border: 0,
          borderRadius: "999px",
          padding: "13px 22px",
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 700,
          letterSpacing: "0.04em",
          fontSize: "12px",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          cursor: "pointer",
          transition: "background 160ms ease, box-shadow 160ms ease, transform 80ms ease",
        }}
        onMouseEnter={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.background = "#FCE15B";
          b.style.boxShadow = "0 8px 22px rgba(250,217,61,0.25)";
        }}
        onMouseLeave={(e) => {
          const b = e.currentTarget as HTMLButtonElement;
          b.style.background = "#FAD93D";
          b.style.boxShadow = "none";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        <span>Notify me at launch</span>
        {/* TCG chevron arrow */}
        <svg
          viewBox="0 0 140 140"
          aria-hidden="true"
          style={{ width: 11, height: 11, transition: "transform 200ms ease" }}
        >
          <path d="M 10 10 L 130 70 L 10 130 L 10 90 L 60 70 L 10 50 Z" fill="currentColor" />
        </svg>
      </button>
    </form>
  );
}

// ─── Brand Logo Strip ─────────────────────────────────────────────────────────

const BRAND_LIST = [
  { src: ASSETS.brands.skyTransport, alt: "SKY Transportation Services" },
  { src: ASSETS.brands.tli,          alt: "TLI Total Logistics" },
  { src: ASSETS.brands.ctsStrong,    alt: "CTS Strong" },
  { src: ASSETS.brands.dli,          alt: "DLI Dedicated Logistics" },
  { src: ASSETS.brands.skyLogistica, alt: "SKY Logística de México" },
  { src: ASSETS.brands.ilsci,        alt: "ILSCi" },
  { src: ASSETS.brands.walts,        alt: "Walt's Drive-A-Way" },
  { src: ASSETS.brands.copp,         alt: "COPP of St. Louis" },
  { src: ASSETS.brands.ils,          alt: "ILS International Logistics" },
];

function BrandStrip() {
  // Duplicate for seamless marquee
  const doubled = [...BRAND_LIST, ...BRAND_LIST];

  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to right, #061130, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: "linear-gradient(to left, #061130, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div
        className="marquee-track"
        style={{ display: "flex", alignItems: "center", gap: "32px", width: "max-content", padding: "4px 0" }}
      >
        {doubled.map((brand, i) => (
          <div
            key={`${brand.alt}-${i}`}
            style={{
              background: "rgba(255,255,255,0.96)",
              borderRadius: "6px",
              padding: "8px 16px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src={brand.src}
              alt={brand.alt}
              style={{ height: "30px", width: "auto", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Animated entrance hook ───────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { ref: centerRef, inView: centerInView } = useInView(0.05);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#061130",
        color: "#fff",
        fontFamily: "'Source Sans 3', 'Barlow', sans-serif",
        WebkitFontSmoothing: "antialiased",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── BACKGROUND LAYERS ─────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(60% 55% at 50% 45%, rgba(20,55,122,0.55) 0%, transparent 70%),
            linear-gradient(180deg, #061130 0%, #0A1A40 60%, #061130 100%)
          `,
        }} />
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "96px 96px",
          opacity: 0.03,
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 25%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 25%, transparent 70%)",
        }} />
        {/* Network map */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${ASSETS.networkMap})`,
          backgroundSize: "min(1300px, 95vw)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.07,
        }} />
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }} />
      </div>

      {/* ── SHELL GRID ────────────────────────────────────────────────── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          padding: "clamp(20px, 3vw, 40px) clamp(24px, 4vw, 64px)",
          gap: "clamp(20px, 3vw, 40px)",
          minHeight: "100vh",
        }}
      >
        {/* ── TOP RAIL ─────────────────────────────────────────────── */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <a href="#" aria-label="TCG home" style={{ display: "block", lineHeight: 0 }}>
            <img
              src={ASSETS.logoWhite}
              alt="TCG"
              style={{ height: "24px", width: "auto" }}
            />
          </a>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)" }}>TCGENTERPRISE.COM</span>
            <span style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.18)" }} aria-hidden="true" />
            <span style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.85)" }}>
              <StatusDot />
              Launching Summer 2026
            </span>
          </div>
        </header>

        {/* ── CENTER STACK ─────────────────────────────────────────── */}
        <section
          ref={centerRef}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "clamp(14px, 1.8vw, 22px)",
            maxWidth: "920px",
            margin: "0 auto",
            width: "100%",
            padding: "clamp(8px, 2vw, 24px) 0",
          }}
        >
          {/* Eyebrow */}
          <p
            className={centerInView ? "animate-fade-up" : ""}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FAD93D",
              margin: 0,
              opacity: centerInView ? undefined : 0,
            }}
          >
            <span style={{ width: "36px", height: "1px", background: "#FAD93D", opacity: 0.7 }} aria-hidden="true" />
            A brand announcement from The Cox Group
            <span style={{ width: "36px", height: "1px", background: "#FAD93D", opacity: 0.7 }} aria-hidden="true" />
          </p>

          {/* Wordmark — real PNG logo */}
          <div
            className={centerInView ? "animate-scale-in delay-100" : ""}
            style={{ opacity: centerInView ? undefined : 0 }}
          >
            <img
              src={ASSETS.logoWhite}
              alt="TCG"
              style={{
                height: "clamp(64px, 8.5vw, 112px)",
                width: "auto",
                margin: "0 auto",
                display: "block",
                filter: "drop-shadow(0 12px 36px rgba(0,0,0,0.45))",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            className={centerInView ? "animate-fade-up delay-200" : ""}
            style={{
              margin: "4px 0 0",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 88px)",
              lineHeight: 0.95,
              letterSpacing: "-0.012em",
              textTransform: "uppercase",
              textWrap: "balance" as React.CSSProperties["textWrap"],
              opacity: centerInView ? undefined : 0,
            }}
          >
            Moving business across<br />
            <span style={{ color: "#FAD93D" }}>North America.</span>
          </h1>

          {/* Tagline */}
          <p
            className={centerInView ? "animate-fade-up delay-300" : ""}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(16px, 1.6vw, 20px)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.78)",
              margin: 0,
              opacity: centerInView ? undefined : 0,
            }}
          >
            <span>Logistics.</span>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FAD93D", flexShrink: 0 }} aria-hidden="true" />
            <span>Warehousing.</span>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FAD93D", flexShrink: 0 }} aria-hidden="true" />
            <span>Trucking.</span>
          </p>

          {/* Lede */}
          <p
            className={centerInView ? "animate-fade-up delay-400" : ""}
            style={{
              margin: "4px 0 8px",
              fontFamily: "'Source Sans 3', 'Barlow', sans-serif",
              fontSize: "clamp(15px, 1.25vw, 17px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.7)",
              maxWidth: "560px",
              opacity: centerInView ? undefined : 0,
            }}
          >
            Many operating companies of The Cox Group, uniting under one brand.
            Your service, your team, and your contracts continue uninterrupted.
          </p>

          {/* Signup form */}
          <div
            className={centerInView ? "animate-fade-up delay-500" : ""}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              opacity: centerInView ? undefined : 0,
            }}
          >
            <SignupForm />
            <p style={{
              margin: 0,
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.4)",
            }}>
              No spam. Unsubscribe any time. Visit{" "}
              <a
                href="https://tcgenterprise.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  borderBottom: "1px dashed rgba(255,255,255,0.3)",
                  paddingBottom: "1px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = "#FAD93D";
                  a.style.borderBottomColor = "#FAD93D";
                }}
                onMouseLeave={(e) => {
                  const a = e.currentTarget as HTMLAnchorElement;
                  a.style.color = "rgba(255,255,255,0.75)";
                  a.style.borderBottomColor = "rgba(255,255,255,0.3)";
                }}
              >
                tcgenterprise.com
              </a>
            </p>
          </div>
        </section>

        {/* ── BOTTOM RAIL ──────────────────────────────────────────── */}
        <footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(16px, 3vw, 40px)",
            flexWrap: "wrap",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Countries */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "22px",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              flexShrink: 0,
            }}
          >
            {["U.S.", "Mexico", "Canada"].map((c) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#FAD93D", flexShrink: 0 }} aria-hidden="true" />
                {c}
              </span>
            ))}
          </div>

          {/* Brand logos marquee */}
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <BrandStrip />
          </div>

          {/* Endorse */}
          <div
            style={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "14px",
              paddingLeft: "clamp(16px, 2vw, 24px)",
              borderLeft: "1px solid rgba(255,255,255,0.12)",
              fontFamily: "'Barlow', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            <span>A brand of</span>
            <em
              style={{
                fontFamily: "'Source Sans 3', 'Barlow', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "16px",
                color: "#FAD93D",
                textTransform: "none",
                letterSpacing: "-0.005em",
              }}
            >
              The Cox Group
            </em>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ─── Status dot component ─────────────────────────────────────────────────────

function StatusDot() {
  return (
    <span
      style={{
        display: "inline-block",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "#FAD93D",
        boxShadow: "0 0 10px rgba(250,217,61,0.7)",
        animation: "status-pulse 2.4s ease-in-out infinite",
        flexShrink: 0,
      }}
      aria-hidden="true"
    />
  );
}
