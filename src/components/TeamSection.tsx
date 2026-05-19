export default function TeamSection({ dict }: { dict: any }) {
  const features = [
    {
      title: dict.f1Title,
      text: dict.f1Desc,
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
    {
      title: dict.f2Title,
      text: dict.f2Desc,
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
        </svg>
      ),
    },
    {
      title: dict.f3Title,
      text: dict.f3Desc,
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
    },
  ]

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
          {/* Left: heading */}
          <div>
            <h2 className="section-heading mb-2">
              {dict.title}
            </h2>
            <div className="divider" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 mt-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-4 border border-gray-100 rounded bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-accent border border-primary flex items-center justify-center flex-shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h5 className="text-[13px] font-bold text-gray-900 mb-1">{f.title}</h5>
                    <p className="text-[12px] text-gray-500 leading-relaxed">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: description text */}
          <div className="text-[14px] text-gray-600 leading-relaxed space-y-4 lg:pt-2">
            <p>
              {dict.p1}
            </p>
            <p>
              {dict.p2}
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
