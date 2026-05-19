export default function AboutWhy({ dict }: { dict: any }) {
  const reasons = [
    {
      title: dict.r1Title || "Übernahme administrativer Aufgaben",
      text: dict.r1Desc || "Unser Service umfasst das komplette Meldewesen von der Anmeldung über die Behördenkommunikation bis zur lückenlosen Dokumentation.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
    },
    {
      title: dict.r2Title || "Stabile Arbeitsverhältnisse",
      text: dict.r2Desc || "Unsere Fachkräfte sind langfristig motiviert und garantieren eine stabile Zusammenarbeit, die auf Vertrauen basiert.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      ),
    },
    {
      title: dict.r3Title || "Flexible Arbeitskräfte",
      text: dict.r3Desc || "Ob für kurzfristige Projekte oder langfristige Einsätze – unsere Arbeitskräfte passen sich flexibel an Ihre Anforderungen an.",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="why-section py-20 bg-navy relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(240,0,105,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 max-w-4xl">
          <h2 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            {dict.whyTitle}
          </h2>
          <div className="w-16 h-1.5 bg-primary mb-6 rounded-full" />
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {dict.whyDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-primary/50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {r.icon}
              </div>
              <h4 className="text-white font-bold text-lg mb-3">{r.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
