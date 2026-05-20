export default function BewerberBenefits({ dict }: { dict: any }) {
  const icons = [
    // Regular income
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    // Varied work
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
    // Social security
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    // Collective agreement
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>,
    // Continued pay
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
    // Further training
    <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    // Protective workwear
    <svg key="6" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  ]

  return (
    <section className="bew-benefits-section">
      <div className="section-container">

        {/* ── Benefits header ── */}
        <div className="bew-benefits-header">
          <h2 className="section-heading">{dict.benefitsTitle}</h2>
          <div className="divider" />
          <p className="bew-benefits-subtitle">{dict.benefitsSubtitle}</p>
        </div>

        {/* ── 7-item benefits grid ── */}
        <div className="bew-benefits-grid">
          {dict.benefits.map((benefit: any, idx: number) => (
            <div key={idx} className="bew-benefit-card">
              <div className="bew-benefit-icon">
                {icons[idx] ?? icons[0]}
              </div>
              <div>
                <h4 className="bew-benefit-title">{benefit.title}</h4>
                <p className="bew-benefit-desc">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Advantages at a glance (dark panel) ── */}
        <div className="bew-advantages">
          <h3 className="bew-advantages-title">{dict.advantagesTitle}</h3>
          <div className="divider" />
          <ul className="bew-advantages-list">
            {dict.advantages.map((adv: string, idx: number) => (
              <li key={idx} className="bew-advantage-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}
