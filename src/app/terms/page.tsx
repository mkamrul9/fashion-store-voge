export default function TermsPage() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--bg-primary)" }}>
      <div className="info-page-hero">
        <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", marginBottom: "1rem" }}>Terms of Service</h1>
        <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
          Rules and guidelines for using our platform.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
          By accessing or using the VŌGE website, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.
        </p>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          All content included on this site, such as text, graphics, logos, images, and software, is the property of VŌGE or its content suppliers and protected by international copyright laws.
        </p>
      </div>
    </div>
  );
}
