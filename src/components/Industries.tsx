export default function Industries({ dict }: { dict: any }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top heading */}
        <div className="mb-12">
          <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold mb-3">
            {dict.indTitle}
          </h2>
          <div className="w-12 h-0.5 bg-primary mb-4" />
          <p className="text-gray-600 text-[14px] leading-relaxed max-w-4xl">
            {dict.indDesc}
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1 */}
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50/50 hover:shadow-md hover:border-primary/20 transition-all group duration-300">
            <div className="w-11 h-11 rounded-full bg-accent border border-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
              <svg className="w-5.5 h-5.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {dict.ind1Title}
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {dict.ind1Desc}
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50/50 hover:shadow-md hover:border-primary/20 transition-all group duration-300">
            <div className="w-11 h-11 rounded-full bg-accent border border-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
              <svg className="w-5.5 h-5.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10M21 16V10a2 2 0 00-2-2h-6M21 16H9" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {dict.ind2Title}
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {dict.ind2Desc}
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 border border-gray-200 rounded-xl bg-gray-50/50 hover:shadow-md hover:border-primary/20 transition-all group duration-300">
            <div className="w-11 h-11 rounded-full bg-accent border border-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
              <svg className="w-5.5 h-5.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
              {dict.ind3Title}
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed">
              {dict.ind3Desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
