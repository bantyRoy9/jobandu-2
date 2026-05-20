import Link from 'next/link'

export default function AboutHero({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section className="inner-hero inner-hero--about">
      <div className="inner-hero-overlay" />
      <div className="inner-hero-content section-container">
        <div className="inner-hero-text">
          <h1 className="inner-hero-title">{dict.heroTitle}</h1>
          <p className="inner-hero-subtitle">{dict.heroSubtitle}</p>
        </div>
        <nav className="inner-hero-breadcrumb" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="inner-hero-bc-link">Home</Link>
          <span className="inner-hero-bc-sep">›</span>
          <span className="inner-hero-bc-current">
            {lang === 'de' ? 'Über uns' : lang === 'ro' ? 'Despre noi' : 'About us'}
          </span>
        </nav>
      </div>
    </section>
  )
}
