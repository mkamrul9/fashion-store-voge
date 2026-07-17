export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--bg-primary)" }}>
      <div className="info-page-hero">
        <h1 style={{ fontFamily: "var(--font-editorial)", fontSize: "3rem", marginBottom: "1rem" }}>Privacy Policy</h1>
        <p style={{ opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
          How we protect and manage your data.
        </p>
      </div>
      <div className="mx-auto max-w-3xl px-6 py-20">
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1rem" }}>
          Your privacy is critically important to us. At VŌGE, we have a few fundamental principles:
        </p>
        <ul className="list-disc pl-5" style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
          <li>We are thoughtful about the personal information we ask you to provide.</li>
          <li>We store personal information for only as long as we have a reason to keep it.</li>
          <li>We aim for full transparency on how we gather, use, and share your personal information.</li>
        </ul>
      </div>
    </div>
  );
}
