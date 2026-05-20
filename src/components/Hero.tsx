import Link from 'next/link'

interface HeroDict {
  title: string
  subtitle1: string
  subtitle2: string
  subtitle3: string
  btnApply: string
  jobs: string
  more: string
  contactPerson: string
  contact: string
}

export default function Hero({ dict, lang }: { dict: HeroDict; lang: string }) {
  const quickLinks = [
    { label: dict.jobs,          href: `/${lang}/fuer-bewerber#stellenangebote` },
    { label: dict.contactPerson, href: `/${lang}/ueber-uns#team` },
    { label: dict.contact,       href: `/${lang}/kontakt` },
  ]

  return (
    <section className="hero-section">
      {/* Dark gradient overlay — stronger on left, fades right */}
      <div className="hero-overlay" />

      <div className="hero-content">
        {/* ── LEFT: headline + subtitle + CTA ── */}
        <div className="hero-left">
          <h1 className="hero-title anim">
            {dict.title}
          </h1>
          <p className="hero-subtitle anim anim-1">
            {dict.subtitle1}
            <br />
            {dict.subtitle2}
            <strong>{dict.subtitle3}</strong>
          </p>
          <a href={`/${lang}/fuer-bewerber`} className="hero-apply-btn anim anim-2">
            {dict.btnApply}
          </a>
        </div>

        {/* ── RIGHT: quick links ── */}
        <div className="hero-right anim anim-3">
          {quickLinks.map((link, i) => (
            <div key={link.href}>
              {i > 0 && <div className="hero-divider" />}
              <Link href={link.href} className="hero-quick-link group">
                <span className="hero-quick-label">{link.label}</span>
                <span className="hero-quick-more">
                  <span className="hero-quick-icon">
                    <svg
                      width="22" height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8l4 4-4 4M8 12h8" />
                    </svg>
                  </span>
                  <span className="hero-quick-more-text">{dict.more}</span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
