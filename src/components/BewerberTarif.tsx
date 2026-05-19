export default function BewerberTarif({ dict }: { dict: any }) {
  return (
    <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="section-heading mb-2">{dict.tarifTitle}</h2>
          <div className="divider mb-6" />
          
          <div className="space-y-4 text-[14px] text-gray-700 leading-relaxed mb-8">
            <p>{dict.tarifDesc1}</p>
            <p>{dict.tarifDesc2}</p>
          </div>

          <a
            href="https://jobandu.de/wp-content/uploads/2025/05/2023-03-13_iGZ_Arbeitsvertrag-Muster-unveraendert.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2 text-[13px]"
          >
            {/* Download Icon */}
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {dict.tarifBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
