export default function WhyJobandu({ dict }: { dict: any }) {
  const reasons = [
    {
      title: dict.r1Title,
      text: dict.r1Desc,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
    },
    {
      title: dict.r2Title,
      text: dict.r2Desc,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
        </svg>
      ),
    },
    {
      title: dict.r3Title,
      text: dict.r3Desc,
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="why-section py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-white text-2xl md:text-3xl font-extrabold mb-2">
            {dict.title1}<span className="text-primary">{dict.title2}</span>
          </h2>
          <div className="w-12 h-0.5 bg-primary mb-4" />
          <p className="text-gray-300 text-[14px] leading-relaxed max-w-4xl">
            {dict.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h4 className="text-white font-bold text-[15px] mb-2">{r.title}</h4>
              <p className="text-gray-400 text-[13px] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
