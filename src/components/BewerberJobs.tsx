'use client'

import { useState } from 'react'

export default function BewerberJobs({ dict, lang }: { dict: any; lang: string }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [submitted, setSubmitted] = useState(false)

  // Filter jobs based on search term
  const filteredJobs = dict.jobs.filter((job: any) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.desc.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleApply = (job: any) => {
    setSelectedJob(job)
    setSubmitted(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSelectedJob(null)
      setSubmitted(false)
    }, 2000)
  }

  return (
    <section id="stellenangebote" className="py-16 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="section-heading mb-2">{dict.jobsTitle}</h2>
          <div className="divider" />
          <p className="text-[14px] text-gray-600 leading-relaxed max-w-4xl">
            {dict.jobsSubtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder={lang === 'de' ? 'Stellenangebote durchsuchen...' : lang === 'ro' ? 'Căutați locuri de muncă...' : 'Search job offers...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pl-10 py-2.5 text-[13px]"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredJobs.map((job: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:border-primary/30 hover:shadow-lg transition-all flex flex-col justify-between h-[210px] bg-white group">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold text-primary bg-accent/30 rounded uppercase tracking-wider">
                      {job.title.includes('Minijob') ? 'Minijob' : lang === 'de' ? 'Vollzeit' : lang === 'ro' ? 'Normă întreagă' : 'Full-time'}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {job.title}
                  </h4>
                  <p className="text-[12px] text-gray-500 mt-2 line-clamp-2">
                    {job.desc}
                  </p>
                </div>
                
                <button
                  onClick={() => handleApply(job)}
                  className="btn-primary w-full text-center text-[12px] py-2 mt-4"
                >
                  {dict.applyBtn}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg mb-16 bg-gray-50">
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-[13px] text-gray-500">
              {lang === 'de' ? 'Keine passenden Stellenangebote gefunden.' : lang === 'ro' ? 'Nu s-au găsit locuri de muncă potrivite.' : 'No matching job offers found.'}
            </p>
          </div>
        )}

        {/* Unsolicited application initiator */}
        <div className="bg-navy rounded-xl p-8 relative overflow-hidden shadow-xl text-center md:text-left md:flex md:items-center md:justify-between gap-8 border-t-4 border-primary">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,0,105,0.06),transparent_40%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mb-6 md:mb-0">
            <h4 className="text-white text-base font-bold mb-2">
              {dict.noJobTitle}
            </h4>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              {dict.noJobDesc}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 flex-shrink-0">
            <a
              href="mailto:info@jobandu.de"
              className="btn-primary w-full sm:w-auto text-center text-[13px]"
            >
              {lang === 'de' ? 'E-Mail senden' : lang === 'ro' ? 'Trimite e-mail' : 'Send E-Mail'}
            </a>
            <a
              href="https://wa.me/4965619451144"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded text-[13px] px-6 py-2.5 flex items-center justify-center gap-2 shadow-lg transition-colors w-full sm:w-auto"
            >
              {/* WhatsApp Icon */}
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 2.012 14.12 1.01 11.493 1.01c-5.442 0-9.866 4.372-9.87 9.802 0 1.689.479 3.336 1.39 4.795l-.975 3.565 3.665-.957zm11.588-7.072c-.303-.15-1.793-.88-2.072-.982-.279-.1-.483-.15-.688.15-.204.3-.792.982-.972 1.18-.18.2-.36.223-.663.074-.303-.15-1.28-.471-2.438-1.503-.9-.802-1.507-1.793-1.684-2.093-.178-.3-.02-.462.13-.612.135-.135.303-.35.454-.523.15-.173.2-.3.3-.5.1-.2.05-.375-.025-.524-.075-.15-.688-1.656-.942-2.27-.247-.59-.5-.51-.688-.52-.178-.008-.382-.01-.586-.01-.205 0-.538.077-.82.385-.282.308-1.078 1.05-1.078 2.56 0 1.512 1.102 2.973 1.253 3.177.15.203 2.167 3.31 5.25 4.64.733.317 1.307.507 1.753.648.736.234 1.407.2 1.936.12.59-.09 1.793-.733 2.048-1.44.256-.708.256-1.314.18-1.44-.076-.124-.28-.2-.583-.35z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Pop-up Bewerbungsmuster Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedJob(null)
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-7 relative animate-fade-in">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-[16px] font-bold text-gray-900 mb-1">
                  {lang === 'de' ? 'Bewerbung gesendet!' : lang === 'ro' ? 'Candidatură trimisă!' : 'Application Sent!'}
                </h4>
                <p className="text-[12px] text-gray-500">
                  {lang === 'de' ? 'Vielen Dank für Ihre Bewerbung. Wir melden uns in Kürze.' : lang === 'ro' ? 'Vă mulțumim pentru candidatură. Vă vom contacta în curând.' : 'Thank you for your application. We will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-[16px] font-extrabold text-gray-900 mb-1">
                  {lang === 'de' ? 'Bewerbung als' : lang === 'ro' ? 'Candidatură ca' : 'Apply as'}
                </h3>
                <span className="inline-block text-[13px] font-bold text-primary mb-5">
                  {selectedJob.title}
                </span>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="form-label text-[11px]">
                      {lang === 'de' ? 'Vollständiger Name' : lang === 'ro' ? 'Nume complet' : 'Full Name'}
                    </label>
                    <input type="text" required className="form-input text-[12px] py-1.5" />
                  </div>

                  <div>
                    <label className="form-label text-[11px]">
                      E-Mail-Adresse
                    </label>
                    <input type="email" required className="form-input text-[12px] py-1.5" />
                  </div>

                  <div>
                    <label className="form-label text-[11px]">
                      {lang === 'de' ? 'Lebenslauf hochladen (PDF)' : lang === 'ro' ? 'Încarcă CV (PDF)' : 'Upload CV (PDF)'}
                    </label>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded p-4 cursor-pointer hover:border-primary transition-colors group bg-gray-50">
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-primary mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-[11px] text-gray-500 group-hover:text-primary">
                        {lang === 'de' ? 'PDF auswählen' : lang === 'ro' ? 'Alege PDF' : 'Select PDF'}
                      </span>
                      <input type="file" accept=".pdf" required className="hidden" />
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full text-center text-[13px] py-2 mt-2"
                  >
                    {lang === 'de' ? 'Bewerbung absenden' : lang === 'ro' ? 'Trimite candidatura' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
