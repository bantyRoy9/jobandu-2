import Link from 'next/link'

export default function BewerberHero({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section className="inner-hero inner-hero--bewerber">
      <div className="inner-hero-overlay" />
      <div className="inner-hero-content section-container">
        <div className="inner-hero-text">
          <h1 className="inner-hero-title">{dict.heroTitle}</h1>
          <p className="inner-hero-subtitle">{dict.heroSubtitle}</p>
          <a href="#stellenangebote" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            {dict.heroBtn}
          </a>
        </div>
        <nav className="inner-hero-breadcrumb" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="inner-hero-bc-link">Home</Link>
          <span className="inner-hero-bc-sep">›</span>
          <span className="inner-hero-bc-current">
            {lang === 'de' ? 'Für Bewerber' : lang === 'ro' ? 'Pentru Candidați' : 'For Applicants'}
          </span>
        </nav>
      </div>
    </section>
  )
}
