interface Member {
  name: string
  role: string
  email: string
  phone?: string
}

export default function TeamBios({ dict, lang }: { dict: any; lang: string }) {
  const categories: { title: string; members: Member[] }[] = [
    {
      title: dict.vertriebTitle,
      members: [
        { name: 'Dennis Del',    role: dict.vertriebTitle, email: 'dd@jobandu.de' },
        { name: 'Manuela Klug', role: dict.vertriebTitle, email: 'mk@jobandu.de' },
      ],
    },
    {
      title: dict.recruitingTitle,
      members: [
        { name: 'Mathias Nielsen',  role: dict.recruitingTitle, email: 'mv@jobandu.de', phone: '+49 (0) 174 1628182' },
        { name: 'Natalia Sandhoff', role: dict.recruitingTitle, email: 'ns@jobandu.de', phone: '+49 (0) 1732827622' },
        { name: 'Emilia Skrzypek',  role: dict.recruitingTitle, email: 'es@jobandu.de', phone: '+49 (0) 1732789912' },
      ],
    },
    {
      title: dict.kundenbetreuungTitle,
      members: [
        {
          name: 'Henning Nielsen',
          role: lang === 'da' ? 'Administrerende direktør' : 'Managing Director',
          email: 'hn@jobandu.de',
        },
      ],
    },
  ]

  return (
    <section className="teambios-section">
      <div className="section-container">

        {/* ── Section intro ── */}
        <div className="teambios-intro">
          <h2 className="section-heading">{dict.teamTitle}</h2>
          <div className="divider" />
          <p className="teambios-desc">{dict.teamDesc}</p>
        </div>

        {/* ── Category groups ── */}
        <div className="teambios-groups">
          {categories.map((cat, ci) => (
            <div key={ci} className="teambios-group">
              <h3 className="teambios-cat-title">{cat.title}</h3>
              <div className="teambios-members">
                {cat.members.map((m, mi) => (
                  <div key={mi} className="teambios-member">
                    {/* Avatar */}
                    <div className="teambios-avatar" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    {/* Info */}
                    <div className="teambios-member-info">
                      <p className="teambios-name">{m.name}</p>
                      <p className="teambios-role">{m.role}</p>
                      {m.phone && (
                        <a href={`tel:${m.phone.replace(/[\s()]/g, '')}`} className="teambios-contact">
                          {m.phone}
                        </a>
                      )}
                      <a href={`mailto:${m.email}`} className="teambios-contact">
                        {m.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── GVP / Equal Pay ── */}
        <div className="teambios-gvp">
          <div className="teambios-gvp-text">
            <p>{dict.gvpText}</p>
          </div>
          <div className="teambios-gvp-logos">
            <img
              src="https://jobandu.de/wp-content/uploads/2025/07/Equal-Pay-.png"
              alt="Equal Pay"
              className="teambios-gvp-logo"
            />
            <img
              src="https://jobandu.de/wp-content/uploads/2025/07/GVP-Logo_Mitglied_quer_blau_RGB-1-002.png"
              alt="GVP Mitglied"
              className="teambios-gvp-logo"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
