'use client'
import { useState } from 'react'

export default function BewerberJobs({ dict, lang }: { dict: any; lang: string }) {
  const [selectedJob, setSelectedJob] = useState<any | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSelectedJob(null); setSubmitted(false) }, 2500)
  }

  const applyLabel  = lang === 'de' ? 'Jetzt bewerben!' : lang === 'ro' ? 'Aplică acum!' : 'Apply now!'
  const titleLabel  = lang === 'de' ? 'Stellentitel'    : lang === 'ro' ? 'Titlu'        : 'Job Title'
  const locLabel    = lang === 'de' ? 'Standort'        : lang === 'ro' ? 'Locație'      : 'Location'
  const appLabel    = lang === 'de' ? 'Bewerbung'       : lang === 'ro' ? 'Candidatură'  : 'Application'

  return (
    <section id="stellenangebote" className="jobs-section">
      <div className="section-container">

        {/* Header */}
        <div className="jobs-header">
          <h2 className="section-heading">{dict.jobsTitle}</h2>
          <div className="divider" />
          <p className="jobs-subtitle">{dict.jobsSubtitle}</p>
        </div>

        {/* ── Jobs table ── */}
        <div className="jobs-table-wrap">
          <table className="jobs-table">
            <thead>
              <tr>
                <th>{titleLabel}</th>
                <th>{locLabel}</th>
                <th>{appLabel}</th>
              </tr>
            </thead>
            <tbody>
              {dict.jobs.map((job: any, idx: number) => (
                <tr key={idx}>
                  <td className="jobs-td-title">{job.title}</td>
                  <td className="jobs-td-loc">
                    <span className="jobs-loc-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {job.location}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => { setSelectedJob(job); setSubmitted(false) }}
                      className="jobs-apply-btn"
                    >
                      {applyLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── No job found CTA ── */}
        <div className="jobs-nojob">
          <h4 className="jobs-nojob-title">{dict.noJobTitle}</h4>
          <p className="jobs-nojob-desc">{dict.noJobDesc}</p>
        </div>

      </div>

      {/* ── Apply modal ── */}
      {selectedJob && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={e => { if (e.target === e.currentTarget) setSelectedJob(null) }}
        >
          <div className="modal-box">
            <button onClick={() => setSelectedJob(null)} className="modal-close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {submitted ? (
              <div className="modal-success">
                <div className="modal-success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 className="modal-title">
                  {lang === 'de' ? 'Bewerbung gesendet!' : lang === 'ro' ? 'Candidatură trimisă!' : 'Application Sent!'}
                </h4>
                <p className="modal-desc">
                  {lang === 'de' ? 'Vielen Dank. Wir melden uns in Kürze.' : lang === 'ro' ? 'Vă mulțumim. Vă vom contacta în curând.' : 'Thank you. We will get back to you shortly.'}
                </p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">
                  {lang === 'de' ? 'Bewerbung als' : lang === 'ro' ? 'Candidatură ca' : 'Apply as'}
                </h3>
                <p className="modal-job-name">{selectedJob.title}</p>

                <form onSubmit={handleSubmit} className="modal-form">
                  <div>
                    <label className="form-label">
                      {lang === 'de' ? 'Vollständiger Name *' : lang === 'ro' ? 'Nume complet *' : 'Full Name *'}
                    </label>
                    <input type="text" required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">E-Mail *</label>
                    <input type="email" required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">
                      {lang === 'de' ? 'Lebenslauf (PDF) *' : lang === 'ro' ? 'CV (PDF) *' : 'CV (PDF) *'}
                    </label>
                    <label className="cv-upload-area">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cv-upload-icon">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <span className="cv-upload-text">
                        {lang === 'de' ? 'PDF auswählen' : lang === 'ro' ? 'Alege PDF' : 'Select PDF'}
                      </span>
                      <input type="file" accept=".pdf" required className="sr-only" />
                    </label>
                  </div>
                  <button type="submit" className="btn-primary w-full">
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
