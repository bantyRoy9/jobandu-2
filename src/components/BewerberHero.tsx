import Link from 'next/link'

export default function BewerberHero({ dict, lang }: { dict: any; lang: string }) {
  return (
    <section className="relative bg-navy py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(240,0,105,0.15),transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[12px] text-gray-400 mb-6 uppercase tracking-wider font-semibold">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">
              {lang === 'de' ? 'Start' : lang === 'ro' ? 'Start' : 'Home'}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">
              {lang === 'de' ? 'Für Bewerber' : lang === 'ro' ? 'Pentru Candidați' : 'For Applicants'}
            </span>
          </nav>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            {dict.heroTitle}
          </h1>
          
          <p className="text-gray-300 text-[15px] sm:text-base leading-relaxed mb-8 max-w-2xl">
            {dict.heroSubtitle}
          </p>

          <a href="#stellenangebote" className="btn-primary inline-block text-[14px]">
            {dict.heroBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
