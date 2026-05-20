export default function TeamSection({ dict }: { dict: any }) {
  const features = [
    {
      title: dict.f1Title,
      text: dict.f1Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
    {
      title: dict.f2Title,
      text: dict.f2Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
    },
    {
      title: dict.f3Title,
      text: dict.f3Desc,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="team-section">
      <div className="section-container">
        <div className="team-grid">

          {/* Left: heading + feature cards */}
          <div className="team-left">
            <h2 className="section-heading">{dict.title}</h2>
            <div className="divider" />
            <div className="team-features">
              {features.map((f, i) => (
                <div key={i} className="team-feature-card">
                  <div className="team-feature-icon">{f.icon}</div>
                  <div>
                    <h5 className="team-feature-title">{f.title}</h5>
                    <p className="team-feature-text">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: description paragraphs */}
          <div className="team-right">
            <p className="team-para">{dict.p1}</p>
            <p className="team-para">{dict.p2}</p>
          </div>

        </div>
      </div>
    </section>
  )
}
