export default function FeatureStrip({ dict }: { dict: any }) {
  const features = [
    {
      text: dict.f1,
      icon: (
        // Hexagon / gear-like shape — "qualified specialists"
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 3l14.5 8.25v16.5L20 36 5.5 27.75V11.25L20 3z" />
          <circle cx="20" cy="20" r="5" />
        </svg>
      ),
    },
    {
      text: dict.f2,
      icon: (
        // Person with scan frame — "customised solutions"
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="10" height="10" rx="1" />
          <rect x="26" y="4" width="10" height="10" rx="1" />
          <rect x="4" y="26" width="10" height="10" rx="1" />
          <rect x="26" y="26" width="10" height="10" rx="1" />
          <circle cx="20" cy="16" r="4" />
          <path d="M13 30c0-3.866 3.134-7 7-7s7 3.134 7 7" />
        </svg>
      ),
    },
    {
      text: dict.f3,
      icon: (
        // Concentric circles / target — "partnership at eye level"
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="20" cy="20" r="17" />
          <circle cx="20" cy="20" r="11" />
          <circle cx="20" cy="20" r="5" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      text: dict.f4,
      icon: (
        // 2×2 grid / dashboard — "expertise in temporary employment"
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="14" height="14" rx="1" />
          <rect x="22" y="4" width="14" height="14" rx="1" />
          <rect x="4" y="22" width="14" height="14" rx="1" />
          <rect x="22" y="22" width="14" height="14" rx="1" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* ── 4-column feature strip on dark background ── */}
      <section className="feature-strip-dark">
        <div className="feature-strip-inner">
          {features.map((f, i) => (
            <div key={i} className="feature-strip-item">
              <span className="feature-strip-icon">{f.icon}</span>
              <p className="feature-strip-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Green emergency bar ── */}
      <div className="emergency-bar">
        <a href="tel:+491732827622" className="emergency-bar-link">
          <span>{dict.emergency}</span>
          <strong>+49 1732827622</strong>
        </a>
      </div>
    </>
  )
}
