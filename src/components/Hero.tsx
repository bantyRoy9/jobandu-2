import Link from 'next/link'

export default function Hero({ dict }: { dict: any }) {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left: text content */}
          <div className="max-w-xl">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 anim">
              {dict.title}
            </h1>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-6 anim anim-1">
              <strong className="text-white">{dict.subtitle1}</strong>{' '}
              {dict.subtitle2} <strong className="text-white">{dict.subtitle3}</strong>
            </p>
            <div className="flex flex-wrap gap-3 anim anim-2">
              <a href="#jetzt-bewerben" className="btn-primary">{dict.btnApply}</a>
            </div>
          </div>

          {/* Right: quick link columns */}
          <div className="flex flex-col gap-6 lg:min-w-[240px] anim anim-3 mt-10 lg:mt-0">
            <Link href="/fuer-bewerber#stellenangebot" className="group flex items-start flex-col gap-2 relative">
              <h3 className="text-white text-lg font-bold">Stellenangebote</h3>
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-full bg-transparent border-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <h5 className="text-sm font-semibold uppercase tracking-wider">{dict.more}</h5>
              </div>
            </Link>

            <Link href="/ueber-uns#ueber-uns" className="group flex items-start flex-col gap-2 relative">
              <h3 className="text-white text-lg font-bold">Ansprechpartner</h3>
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-full bg-transparent border-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <h5 className="text-sm font-semibold uppercase tracking-wider">{dict.more}</h5>
              </div>
            </Link>

            <Link href="/kontakt" className="group flex items-start flex-col gap-2 relative">
              <h3 className="text-white text-lg font-bold">Kontakt</h3>
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-full bg-transparent border-none flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
                <h5 className="text-sm font-semibold uppercase tracking-wider">{dict.more}</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
