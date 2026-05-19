export default function ServiceTypes({ dict }: { dict: any }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Service 1: Zeitarbeit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 sm:p-8 rounded-xl border border-gray-150 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent border border-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{dict.s1Title}</h3>
            </div>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
              {dict.s1Desc}
            </p>
            <ul className="space-y-3.5">
              {[dict.s1B1, dict.s1B2, dict.s1B3].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden h-[300px] w-full relative">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/zeitarbeitt.png" 
              alt={dict.s1Title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Service 2: Try & Hire */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 sm:p-8 rounded-xl border border-gray-150 shadow-sm">
          <div className="rounded-lg overflow-hidden h-[300px] w-full relative order-2 lg:order-1">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/tryandhire-scaled.jpg" 
              alt={dict.s2Title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent border border-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{dict.s2Title}</h3>
            </div>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
              {dict.s2Desc}
            </p>
            <ul className="space-y-3.5">
              {[dict.s2B1, dict.s2B2, dict.s2B3].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Service 3: Recruiting */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white p-6 sm:p-8 rounded-xl border border-gray-150 shadow-sm">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent border border-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">{dict.s3Title}</h3>
            </div>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-6">
              {dict.s3Desc}
            </p>
            <ul className="space-y-3.5">
              {[dict.s3B1, dict.s3B2, dict.s3B3].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden h-[300px] w-full relative">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/recruiting-scaled.jpg" 
              alt={dict.s3Title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

      </div>
    </section>
  )
}
