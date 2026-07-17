export default function SustainabilityPage() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--bg-primary)" }}>
      <div className="info-page-hero">
        <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", marginBottom: "1rem" }}>Sustainability</h1>
        <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
          Our commitment to the planet and ethical craftsmanship.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          At VŌGE, we believe luxury should not come at the cost of our environment. We source our materials responsibly, partner with fair-wage artisans, and design pieces meant to last a lifetime, not a season.
        </p>
      </div>
    </div>
  );
}
