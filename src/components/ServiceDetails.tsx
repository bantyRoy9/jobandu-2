import React from 'react'

export default function ServiceDetails({ dict }: { dict: any }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Card 1: Temporary Employment */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#2e7d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2e7d32]">{dict.s1Title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {dict.s1Desc}
            </p>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Ihre Vorteile:</h4>
            <ul className="space-y-2.5">
              {[dict.s1B1, dict.s1B2, dict.s1B3].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-600">
                  <svg className="w-4 h-4 text-[#2e7d32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-2/5 h-64 lg:h-auto min-h-[300px] relative">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/zeitarbeitt.png" 
              alt={dict.s1Title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 2: Try & Hire */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row-reverse">
          <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#2e7d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2e7d32]">{dict.s2Title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {dict.s2Desc}
            </p>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Ihre Vorteile:</h4>
            <ul className="space-y-2.5">
              {[dict.s2B1, dict.s2B2, dict.s2B3].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-600">
                  <svg className="w-4 h-4 text-[#2e7d32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-2/5 h-64 lg:h-auto min-h-[300px] relative">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/tryandhire-2048x1365.jpg" 
              alt={dict.s2Title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Card 3: Recruiting */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row">
          <div className="p-8 lg:p-12 lg:w-3/5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#2e7d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2e7d32]">{dict.s3Title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              {dict.s3Desc}
            </p>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Ihre Vorteile:</h4>
            <ul className="space-y-2.5">
              {[dict.s3B1, dict.s3B2, dict.s3B3].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[14px] text-gray-600">
                  <svg className="w-4 h-4 text-[#2e7d32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-2/5 h-64 lg:h-auto min-h-[300px] relative">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/05/recruiting-2048x1850.jpg" 
              alt={dict.s3Title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
