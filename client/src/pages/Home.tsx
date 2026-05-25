/**
 * TCG Coming Soon Landing Page
 * Design: Industrial Command Center
 * Colors: Deep Navy #0D2240 | Gold #F5C400 | White
 * Fonts: Barlow Condensed (headlines) | Barlow (body)
 */

import { useEffect, useRef, useState } from "react";

// ─── Brand Logos (SVG inline components) ─────────────────────────────────────

function TcgLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TCG"
    >
      {/* T */}
      <text
        x="0"
        y="82"
        fontFamily="'Barlow Condensed', sans-serif"
        fontWeight="800"
        fontStyle="italic"
        fontSize="90"
        fill="white"
      >
        TCG
      </text>
      {/* Yellow chevron arrow */}
      <polygon
        points="218,8 248,45 218,82 232,82 262,45 232,8"
        fill="#F5C400"
      />
    </svg>
  );
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate.getTime() - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          lineHeight: 1,
          color: "#F5C400",
          letterSpacing: "0.02em",
          minWidth: "2ch",
          textAlign: "center",
          textShadow: "0 0 40px rgba(245,196,0,0.35)",
        }}
      >
        {display}
      </div>
      <div
        style={{
          fontFamily: "'Barlow', sans-serif",
          fontWeight: 600,
          fontSize: "0.65rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          marginTop: "0.4rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function CountdownSeparator() {
  return (
    <div
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2rem, 5vw, 4rem)",
        color: "rgba(245,196,0,0.4)",
        lineHeight: 1,
        paddingBottom: "1.4rem",
        userSelect: "none",
      }}
    >
      :
    </div>
  );
}

// ─── Intersection Observer hook ───────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Brand Logos Data ─────────────────────────────────────────────────────────

const BRAND_LOGOS = [
  { name: "SKY Transportation Services", abbr: "SKY", color: "#2ECC40", textColor: "#fff", accent: "#F5C400", style: "lightning" },
  { name: "TLI Total Logistics", abbr: "TLI", color: "#CC2200", textColor: "#fff", accent: "#CC2200", style: "triangle" },
  { name: "CTS Strong", abbr: "CTS", color: "#2ECC40", textColor: "#fff", accent: "#2ECC40", style: "circle" },
  { name: "DLI Dedicated Logistics", abbr: "DLI", color: "#1A3A6B", textColor: "#fff", accent: "#CC2200", style: "triangle" },
  { name: "SKY Logística de México", abbr: "SKY MX", color: "#1A3A6B", textColor: "#fff", accent: "#F5C400", style: "lightning" },
  { name: "ILSCi", abbr: "ILSCi", color: "#1A3A6B", textColor: "#fff", accent: "#CC2200", style: "maple" },
  { name: "Walts Drive-A-Way", abbr: "Walts", color: "#1A1A1A", textColor: "#fff", accent: "#F5C400", style: "script" },
  { name: "COPP of St. Louis", abbr: "COPP", color: "#1A3A6B", textColor: "#fff", accent: "#F5C400", style: "arrow" },
  { name: "ILS International Logistics", abbr: "ILS", color: "#1A3A6B", textColor: "#fff", accent: "#1A3A6B", style: "bold" },
];

function BrandLogoCard({ name, abbr, color, textColor, accent, style }: typeof BRAND_LOGOS[0]) {
  return (
    <div
      className="flex items-center justify-center rounded"
      style={{
        background: "rgba(255,255,255,0.97)",
        padding: "0.6rem 1.2rem",
        minWidth: "120px",
        height: "52px",
        flexShrink: 0,
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      }}
      title={name}
    >
      {style === "lightning" && (
        <div className="flex items-center gap-1">
          <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
            <polygon points="8,0 0,12 6,12 6,22 14,10 8,10" fill={accent} />
          </svg>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.3rem", color, letterSpacing: "-0.02em" }}>
            {abbr.replace(" MX", "")}
          </span>
          {abbr.includes("MX") && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.55rem", color: "#666", letterSpacing: "0.05em", marginLeft: "2px", lineHeight: 1.1 }}>
              LOGÍSTICA<br />DE MÉXICO
            </span>
          )}
          {!abbr.includes("MX") && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.5rem", color: "#666", letterSpacing: "0.05em", marginLeft: "2px", lineHeight: 1.1 }}>
              TRANSPORTATION<br />SERVICES
            </span>
          )}
        </div>
      )}
      {style === "triangle" && (
        <div className="flex items-center gap-1">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <polygon points="0,20 8,0 16,20" fill={accent} />
            <polygon points="3,20 8,8 13,20" fill="white" />
          </svg>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", color, letterSpacing: "-0.02em" }}>
            {abbr}
          </span>
          {abbr === "TLI" && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.5rem", color: "#666", letterSpacing: "0.04em", marginLeft: "2px", lineHeight: 1.1 }}>
              TOTAL<br />LOGISTICS
            </span>
          )}
          {abbr === "DLI" && (
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.5rem", color: "#666", letterSpacing: "0.04em", marginLeft: "2px", lineHeight: 1.1 }}>
              DEDICATED<br />LOGISTICS
            </span>
          )}
        </div>
      )}
      {style === "circle" && (
        <div className="flex items-center gap-1">
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: `2.5px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: accent, letterSpacing: "-0.01em", lineHeight: 1 }}>
              CTS<br />
              <span style={{ fontSize: "0.55rem", fontWeight: 700 }}>STRONG</span>
            </span>
          </div>
        </div>
      )}
      {style === "maple" && (
        <div className="flex items-center gap-1">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "1.3rem", color, letterSpacing: "-0.02em" }}>
            ILS
          </span>
          <span style={{ color: accent, fontSize: "1.1rem", lineHeight: 1 }}>🍁</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "1.3rem", color, letterSpacing: "-0.02em" }}>
            Ci
          </span>
        </div>
      )}
      {style === "script" && (
        <div className="flex items-center gap-1">
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontStyle: "italic", fontSize: "1.2rem", color: "#1A1A1A", letterSpacing: "0.01em" }}>
            Walts
          </span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.45rem", color: "#666", letterSpacing: "0.06em", lineHeight: 1.2 }}>
            DRIVE-A-WAY
          </span>
        </div>
      )}
      {style === "arrow" && (
        <div className="flex items-center gap-1">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.4rem", color, letterSpacing: "-0.02em" }}>
            COPP
          </span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <polygon points="0,0 12,8 0,16" fill={accent} />
          </svg>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.45rem", color: "#666", letterSpacing: "0.05em", lineHeight: 1.2 }}>
            OF ST. LOUIS,<br />INC.
          </span>
        </div>
      )}
      {style === "bold" && (
        <div className="flex items-center gap-1">
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontStyle: "italic", fontSize: "1.5rem", color, letterSpacing: "-0.02em" }}>
            ILS
          </span>
          <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.45rem", color: "#666", letterSpacing: "0.05em", lineHeight: 1.2 }}>
            INTERNATIONAL<br />LOGISTICS SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Email Capture Form ───────────────────────────────────────────────────────

function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="animate-fade-up"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.85rem 1.5rem",
          background: "rgba(245,196,0,0.12)",
          border: "1.5px solid rgba(245,196,0,0.5)",
          borderRadius: "4px",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#F5C400" strokeWidth="1.5" />
          <path d="M6 10l3 3 5-5" stroke="#F5C400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, color: "rgba(255,255,255,0.9)", fontSize: "0.9rem" }}>
          You're on the list. We'll be in touch.
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0", maxWidth: "480px", width: "100%" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Enter your email address"
        required
          style={{
            flex: 1,
            padding: "0.85rem 1.25rem",
            background: "rgba(255,255,255,0.07)",
            borderTop: `1.5px solid ${focused ? "#F5C400" : "rgba(255,255,255,0.2)"}`,
            borderBottom: `1.5px solid ${focused ? "#F5C400" : "rgba(255,255,255,0.2)"}`,
            borderLeft: `1.5px solid ${focused ? "#F5C400" : "rgba(255,255,255,0.2)"}`,
            borderRight: "none",
            borderRadius: "4px 0 0 4px",
          color: "white",
          fontFamily: "'Barlow', sans-serif",
          fontSize: "0.9rem",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.85rem 1.5rem",
          background: "#F5C400",
          border: "1.5px solid #F5C400",
          borderRadius: "0 4px 4px 0",
          color: "#0D2240",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "background 0.15s ease, transform 0.1s ease",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#ffd700"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#F5C400"; }}
        onMouseDown={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        Notify Me
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="#0D2240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const LAUNCH_DATE = new Date("2026-09-01T00:00:00");

const HERO_TRUCK_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029836944/4hoLYGkxNUNQpxb63DmJdw/tcg-hero-truck-LjPzgwtvMFWZ9jgCXCNFmX.webp";
const NETWORK_MAP_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029836944/4hoLYGkxNUNQpxb63DmJdw/tcg-network-map-QvtEyW5exyivyzfwgoJBFn.webp";

export default function Home() {
  const countdown = useCountdown(LAUNCH_DATE);
  const { ref: brandsRef, inView: brandsInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();
  const { ref: emailRef, inView: emailInView } = useInView();

  // Duplicate logos for seamless marquee
  const allLogos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D2240",
        color: "white",
        overflowX: "hidden",
      }}
    >
      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background truck image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_TRUCK_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Dark overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(13,34,64,0.92) 0%, rgba(13,34,64,0.75) 50%, rgba(13,34,64,0.55) 100%)",
          }}
        />
        {/* Network map overlay (top right) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "45%",
            height: "55%",
            backgroundImage: `url(${NETWORK_MAP_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.18,
            maskImage: "radial-gradient(ellipse 80% 80% at 80% 20%, black 30%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 80% 20%, black 30%, transparent 80%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
            width: "100%",
          }}
        >
          {/* COMING SOON label */}
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ width: "32px", height: "2px", background: "#F5C400" }} />
            <span
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#F5C400",
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* TCG Logo / Wordmark — real brand asset */}
          <div className="animate-slide-left delay-100" style={{ marginBottom: "1.5rem" }}>
            <img
              src="/manus-storage/tcg-logo-white_e296c14d.png"
              alt="TCG"
              style={{
                height: "clamp(4rem, 12vw, 9rem)",
                width: "auto",
                display: "block",
                filter: "drop-shadow(0 4px 32px rgba(0,0,0,0.4))",
              }}
            />
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up delay-200"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
              lineHeight: 0.95,
              textTransform: "uppercase",
              color: "white",
              letterSpacing: "-0.01em",
              maxWidth: "760px",
              marginBottom: "1.25rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          >
            Moving Business<br />
            <span style={{ color: "#F5C400" }}>Across</span> North America
          </h1>

          {/* Tagline */}
          <p
            className="animate-fade-up delay-300"
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(0.85rem, 2vw, 1.05rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "1rem",
            }}
          >
            Logistics. Warehousing. Trucking.
          </p>

          {/* Countries */}
          <div
            className="animate-fade-up delay-400"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}
          >
            {["U.S.", "Mexico", "Canada"].map((country, i) => (
              <div key={country} style={{ display: "flex", alignItems: "center", gap: i > 0 ? "1.25rem" : 0 }}>
                {i > 0 && (
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#F5C400" }} />
                )}
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.85rem, 2vw, 1rem)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {country}
                </span>
              </div>
            ))}
          </div>

          {/* Countdown */}
          <div
            className="animate-fade-up delay-500"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "clamp(0.75rem, 2.5vw, 2rem)",
              marginBottom: "3rem",
            }}
          >
            <CountdownUnit value={countdown.days} label="Days" />
            <CountdownSeparator />
            <CountdownUnit value={countdown.hours} label="Hours" />
            <CountdownSeparator />
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <CountdownSeparator />
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </div>

          {/* Email capture */}
          <div className="animate-fade-up delay-600" ref={emailRef}>
            <p
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.55)",
                marginBottom: "0.85rem",
                letterSpacing: "0.04em",
              }}
            >
              Be the first to know when we launch.
            </p>
            <EmailCapture />
          </div>
        </div>

        {/* Bottom chevron scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            opacity: 0.45,
          }}
        >
          <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.4)" }} />
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 1l7 7 7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* ── TAGLINE BAND ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a1c35",
          borderTop: "1px solid rgba(245,196,0,0.2)",
          borderBottom: "1px solid rgba(245,196,0,0.2)",
          padding: "2.5rem clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div
          ref={statsRef}
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {[
            { value: "40+", label: "Years of Experience", sub: "Since 1986" },
            { value: "19+", label: "States Nationwide", sub: "Growing Network" },
            { value: "3", label: "Countries", sub: "U.S. · Mexico · Canada" },
            { value: "9+", label: "Brands Unified", sub: "One Network" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={statsInView ? `animate-fade-up delay-${(i + 1) * 100}` : ""}
              style={{
                opacity: statsInView ? undefined : 0,
                textAlign: "center",
                padding: "0.5rem",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: "#F5C400",
                  lineHeight: 1,
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "white",
                  marginBottom: "0.2rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.45)",
                  letterSpacing: "0.06em",
                }}
              >
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES BAND ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0D2240",
          padding: "2rem clamp(1.5rem, 5vw, 4rem)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0",
          }}
        >
          {[
            "Supply Chain Solutions",
            "Freight & Transportation",
            "Distribution & Fulfillment",
            "Value-Added & Custom Solutions",
          ].map((service, i, arr) => (
            <div
              key={service}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.65rem, 1.5vw, 0.75rem)",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                  padding: "0.5rem 1.25rem",
                  textAlign: "center",
                }}
              >
                {service}
              </span>
              {i < arr.length - 1 && (
                <div style={{ width: "1px", height: "24px", background: "rgba(245,196,0,0.3)" }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── ONE NETWORK SECTION ──────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a1c35",
          padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section header with gold rules */}
          <div
            ref={brandsRef}
            className={brandsInView ? "animate-fade-up" : ""}
            style={{
              opacity: brandsInView ? undefined : 0,
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginBottom: "3.5rem",
              justifyContent: "center",
            }}
          >
            <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to right, transparent, #F5C400)" }} />
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#F5C400",
                  marginBottom: "0.5rem",
                }}
              >
                Working Together to Provide Turn-Key Solutions
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontStyle: "italic",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  textTransform: "uppercase",
                  color: "white",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                }}
              >
                One Network. Streamlined Solutions.
              </h2>
            </div>
            <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to left, transparent, #F5C400)" }} />
          </div>

          {/* Marquee logos */}
          <div style={{ overflow: "hidden", position: "relative" }}>
            {/* Left fade */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to right, #0a1c35, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            {/* Right fade */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to left, #0a1c35, transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              className="marquee-track"
              style={{
                display: "flex",
                gap: "1.25rem",
                width: "max-content",
                padding: "0.5rem 0",
              }}
            >
              {allLogos.map((logo, i) => (
                <BrandLogoCard key={`${logo.abbr}-${i}`} {...logo} />
              ))}
            </div>
          </div>

          {/* Countries footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "3rem",
            }}
          >
            <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to right, transparent, rgba(245,196,0,0.4))" }} />
            {["U.S.", "Mexico", "Canada"].map((country, i) => (
              <div key={country} style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                {i > 0 && (
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#F5C400" }} />
                )}
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "white",
                  }}
                >
                  {country}
                </span>
              </div>
            ))}
            <div style={{ flex: 1, height: "1.5px", background: "linear-gradient(to left, transparent, rgba(245,196,0,0.4))" }} />
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#060f1c",
          borderTop: "2px solid #F5C400",
          padding: "2rem clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "40px", height: "1.5px", background: "#F5C400" }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(0.8rem, 2vw, 0.95rem)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              Driving Supply Chains Forward.
            </span>
            <div style={{ width: "40px", height: "1.5px", background: "#F5C400" }} />
          </div>
          <a
            href="https://tcgenterprise.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#F5C400",
              textDecoration: "none",
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            TCGENTERPRISE.COM
          </a>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 400,
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.06em",
              marginTop: "0.5rem",
            }}
          >
            © {new Date().getFullYear()} The Cox Group. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
