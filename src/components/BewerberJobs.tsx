'use client'
import { useState, useEffect } from 'react'
import { PUBLIC_API_BASE, CONTENT_API_BASE } from '@/lib/admin-api'

interface Job {
  id: string
  title: string
  location: string
  apply_url: string | null
  is_active: boolean
}

export default function BewerberJobs({ dict, lang }: { dict: any; lang: string }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // ── all required API fields ──
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience_years: '',
  })
  const [applyFile, setApplyFile] = useState<File | null>(null)

  const upd = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }))

  useEffect(() => {
    fetch(`${CONTENT_API_BASE}/jobs`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Job[]) => {
        setJobs(Array.isArray(data) ? data.filter(j => j.is_active) : [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const openModal = (job: Job) => {
    setSelectedJob(job)
    setSubmitted(false)
    setError('')
    setForm({ name: '', email: '', phone: '', experience_years: '' })
    setApplyFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.experience_years.trim()) {
      setError(lang === 'da' ? 'Udfyld alle påkrævede felter.' : 'Please fill in all required fields.')
      return
    }
    const expYears = parseInt(form.experience_years, 10)
    if (isNaN(expYears) || expYears < 0) {
      setError(lang === 'da' ? 'Ugyldig erfaring i år.' : 'Please enter a valid number of experience years.')
      return
    }

    setSubmitting(true)
    setError('')

    const fd = new FormData()
    fd.append('name',             form.name.trim())
    fd.append('email',            form.email.trim())
    fd.append('phone',            form.phone.trim())
    // skills = the job title the applicant is applying for
    fd.append('skills',           JSON.stringify([selectedJob!.title]))
    fd.append('experience_years', String(expYears))
    fd.append('location',         selectedJob!.location || 'Not specified')
    if (applyFile) fd.append('cv', applyFile)

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/applicants/`, { method: 'POST', body: fd })
      if (!res.ok) {
        let msg = `Error ${res.status}`
        try { const e = await res.json(); msg = e.detail || msg } catch { /* noop */ }
        throw new Error(msg)
      }
      setSubmitted(true)
      setTimeout(() => { setSelectedJob(null); setSubmitted(false) }, 4000)
    } catch (err) {
      setError((err as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const t = {
    applyLabel:   lang === 'da' ? 'Ansøg nu!'          : 'Apply now!',
    titleLabel:   lang === 'da' ? 'Stillingsbetegnelse' : 'Job Title',
    locLabel:     lang === 'da' ? 'Placering'           : 'Location',
    appLabel:     lang === 'da' ? 'Ansøgning'           : 'Application',
    applyAs:      lang === 'da' ? 'Ansøg som'           : 'Apply for',
    fullName:     lang === 'da' ? 'Fuldt navn *'        : 'Full Name *',
    phone:        lang === 'da' ? 'Telefonnummer *'     : 'Phone Number *',
    expYears:     lang === 'da' ? 'Års erfaring *'      : 'Years of Experience *',
    cvLabel:      lang === 'da' ? 'CV (PDF)'            : 'CV (PDF)',
    cvOptional:   lang === 'da' ? 'valgfri'             : 'optional',
    selectPdf:    lang === 'da' ? 'Vælg PDF'            : 'Select PDF',
    submitBtn:    lang === 'da' ? 'Send ansøgning'      : 'Submit Application',
    sending:      lang === 'da' ? 'Sender…'             : 'Sending…',
    successTitle: lang === 'da' ? 'Ansøgning sendt!'    : 'Application Sent!',
    successDesc:  lang === 'da'
      ? 'Tak. Vi vender tilbage til dig snarest.'
      : 'Thank you. We will get back to you shortly.',
  }

  return (
    <section id="stellenangebote" className="jobs-section">
      <div className="section-container">

        {/* Header */}
        <div className="jobs-header">
          <h2 className="section-heading">{dict.jobsTitle}</h2>
          <div className="divider" />
          <p className="jobs-subtitle">{dict.jobsSubtitle}</p>
        </div>

        {/* Jobs table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '0.9rem' }}>
            {lang === 'da' ? 'Indlæser stillinger…' : 'Loading job positions…'}
          </div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '0.9rem' }}>
            {lang === 'da' ? 'Ingen aktive stillinger i øjeblikket.' : 'No active job positions at the moment.'}
          </div>
        ) : (
          <div className="jobs-table-wrap">
            <table className="jobs-table">
              <thead>
                <tr>
                  <th>{t.titleLabel}</th>
                  <th>{t.locLabel}</th>
                  <th>{t.appLabel}</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(job => (
                  <tr key={job.id}>
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
                      <button onClick={() => openModal(job)} className="jobs-apply-btn">
                        {t.applyLabel}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No job CTA */}
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

            {/* Close */}
            <button onClick={() => setSelectedJob(null)} className="modal-close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {submitted ? (
              /* Success state */
              <div className="modal-success">
                <div className="modal-success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h4 className="modal-title">{t.successTitle}</h4>
                <p className="modal-desc">{t.successDesc}</p>
              </div>
            ) : (
              <>
                <h3 className="modal-title">{t.applyAs}</h3>
                <p className="modal-job-name">{selectedJob.title}</p>
                {selectedJob.location && (
                  <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {selectedJob.location}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="modal-form">
                  {error && (
                    <div style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '10px 12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="form-label">{t.fullName}</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={upd('name')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="form-label">E-Mail *</label>
                    <input
                      type="email"
                      required
                      className="form-input"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={upd('email')}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="form-label">{t.phone}</label>
                    <input
                      type="tel"
                      required
                      className="form-input"
                      placeholder="+49 123 456789"
                      value={form.phone}
                      onChange={upd('phone')}
                    />
                  </div>

                  {/* Experience years */}
                  <div>
                    <label className="form-label">{t.expYears}</label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={50}
                      className="form-input"
                      placeholder="0"
                      value={form.experience_years}
                      onChange={upd('experience_years')}
                    />
                  </div>

                  {/* CV upload — optional */}
                  <div>
                    <label className="form-label">
                      {t.cvLabel}{' '}
                      <span style={{ fontWeight: 400, color: '#999', fontSize: '0.8em' }}>({t.cvOptional})</span>
                    </label>
                    <label className="cv-upload-area">
                      {applyFile ? (
                        <span className="cv-upload-text" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>
                          📄 {applyFile.name}
                        </span>
                      ) : (
                        <>
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cv-upload-icon">
                            <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                          </svg>
                          <span className="cv-upload-text">{t.selectPdf}</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={e => { if (e.target.files?.[0]) setApplyFile(e.target.files[0]) }}
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn-primary w-full" disabled={submitting}>
                    {submitting ? t.sending : t.submitBtn}
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
