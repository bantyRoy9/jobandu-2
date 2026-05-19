import Link from 'next/link'

export default function Expertise({ dict }: { dict: any }) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top: heading left + intro text right */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 mb-10">
          <div>
            <h2 className="section-heading">
              <span className="green-text">{dict.title1}</span>{dict.title2}<br />{dict.title3}
            </h2>
            <div className="divider" />
          </div>
          <div className="text-[14px] text-gray-600 leading-relaxed">
            {dict.desc}
          </div>
        </div>

        {/* Row 1: Lager & Produktion — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 rounded mb-5 overflow-hidden">
          <div className="p-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">{dict.lagerTitle}</h3>
            </div>
            <div className="divider" style={{marginTop: '0'}} />
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              {dict.lagerDesc}
            </p>
            <ul className="space-y-2">
              {[
                dict.lager1,
                dict.lager2,
                dict.lager3,
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600">
                  <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[220px]">
            <img src="https://jobandu.de/wp-content/uploads/2025/05/0fee25c922f61800938d163c2321999b.jpg"
              alt="Lager & Produktion" className="w-full h-full object-cover" style={{minHeight: '220px'}}/>
          </div>
        </div>

        {/* Row 2: LKW-Fahrer — image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 rounded mb-5 overflow-hidden">
          <div className="relative min-h-[220px] order-2 lg:order-1">
            <img src="https://jobandu.de/wp-content/uploads/2025/05/lkw.jpg"
              alt="LKW-Fahrer" className="w-full h-full object-cover" style={{minHeight: '220px'}}
            />
          </div>
          <div className="p-7 order-1 lg:order-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">{dict.lkwTitle}</h3>
              <span className="ml-1 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">{dict.new}</span>
            </div>
            <div className="divider" style={{marginTop: '0'}} />
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              {dict.lkwDesc}
            </p>
            <ul className="space-y-2">
              {[
                dict.lkw1,
                dict.lkw2,
                dict.lkw3,
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600">
                  <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Row 3: Schweißer & Metallfachkräfte — text left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-gray-200 rounded mb-8 overflow-hidden">
          <div className="p-7">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">{dict.schweisserTitle}</h3>
            </div>
            <div className="divider" style={{marginTop: '0'}} />
            <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
              {dict.schweisserDesc}
            </p>
            <ul className="space-y-2">
              {[
                dict.schweisser1,
                dict.schweisser2,
                dict.schweisser3,
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600">
                  <svg className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                  </svg>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[220px]">
            <img src="https://jobandu.de/wp-content/uploads/2025/05/Industrie-scaled.jpg"
              alt="Schweißer & Metallfachkräfte" className="w-full h-full object-cover" style={{minHeight: '220px'}}/>
          </div>
        </div>

        <div className="text-center">
          <Link href="/leistungen" className="btn-primary">{dict.btn}</Link>
        </div>
      </div>
    </section>
  )
}
