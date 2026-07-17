export default function CareersPage() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--bg-primary)" }}>
      <div className="info-page-hero">
        <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", marginBottom: "1rem" }}>Careers at VŌGE</h1>
        <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
          Join the team redefining modern luxury.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 style={{ fontFamily: "var(--font-editorial)", fontSize: "2rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>Open Positions</h2>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          We currently don't have any open positions, but we are always looking for exceptional talent. Send your portfolio and resume to <strong>careers@voge.com</strong>.
        </p>
      </div>
    </div>
  );
}
