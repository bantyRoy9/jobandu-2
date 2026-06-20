'use client'
import { useState, useEffect } from 'react'
import { PUBLIC_API_BASE } from '@/lib/admin-api'

const BACKEND = 'https://jobandubackend.up.railway.app/api'

interface Job {
  id: string
  title: string
  location: string
  is_active: boolean
}

const EMPTY_APPLY = { name: '', email: '', phone: '', experience_years: '', position: '' }
const EMPTY_INQUIRY = { name: '', company: '', email: '', phone: '', betreff: '', nachricht: '' }

export default function PartnerSection({ dict }: { dict: any }) {
  const [activeJobs, setActiveJobs] = useState<Job[]>([])

  // ── Apply form state ──
  const [applyForm, setApplyForm] = useState(EMPTY_APPLY)
  const [applyFile, setApplyFile]     = useState<File | null>(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applySuccess, setApplySuccess] = useState('')
  const [applyError,   setApplyError]   = useState('')

  // ── Inquiry form state ──
  const [inquiryForm, setInquiryForm]     = useState(EMPTY_INQUIRY)
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState('')
  const [inquiryError,   setInquiryError]   = useState('')

  // Fetch active jobs for the position dropdown
  useEffect(() => {
    fetch(`${BACKEND}/content/jobs`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Job[]) => setActiveJobs(Array.isArray(data) ? data.filter(j => j.is_active) : []))
      .catch(() => {})
  }, [])

  // ── Apply submit ──
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApplyError('')

    // Client-side validation for all required API fields
    if (!applyForm.name.trim() || !applyForm.email.trim() || !applyForm.phone.trim()) {
      setApplyError('Please fill in all required fields.')
      return
    }
    const expYears = parseInt(applyForm.experience_years, 10)
    if (isNaN(expYears) || expYears < 0) {
      setApplyError('Please enter a valid number of experience years.')
      return
    }

    setApplyLoading(true)

    // Find the selected job to inherit its location
    const selectedJob = activeJobs.find(j => j.title === applyForm.position)

    const fd = new FormData()
    fd.append('name',             applyForm.name.trim())
    fd.append('email',            applyForm.email.trim())
    fd.append('phone',            applyForm.phone.trim())
    fd.append('skills',           JSON.stringify(
      applyForm.position ? [applyForm.position] : ['General Application']
    ))
    fd.append('experience_years', String(expYears))
    fd.append('location',         selectedJob?.location || 'Not specified')
    if (applyFile) {
      if (applyFile.size > 5 * 1024 * 1024) {
        setApplyError('File too large. Maximum size is 5MB.')
        setApplyLoading(false)
        return
      }
      fd.append('cv', applyFile)
    }

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/applicants/`, { method: 'POST', body: fd })
      if (!res.ok) {
        let msg = `Error ${res.status}`
        try { const d = await res.json(); msg = d.detail || msg } catch { /* noop */ }
        throw new Error(msg)
      }
      setApplySuccess(dict.successMsg || 'Application sent successfully!')
      setApplyForm(EMPTY_APPLY)
      setApplyFile(null)
    } catch (err) {
      setApplyError((err as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setApplyLoading(false)
    }
  }

  // ── Inquiry submit ──
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.phone || !inquiryForm.nachricht) {
      setInquiryError('Please fill in all required fields.')
      return
    }
    setInquiryLoading(true)
    setInquiryError('')
    setInquirySuccess('')

    const payload = {
      company_name:   inquiryForm.company || inquiryForm.name,
      contact_person: inquiryForm.name,
      email:          inquiryForm.email,
      phone:          inquiryForm.phone,
      requirements:   inquiryForm.betreff ? [inquiryForm.betreff] : ['Staffing Request'],
      location:       'Not specified',
      notes:          inquiryForm.nachricht,
    }

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/employers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        let msg = `Error ${res.status}`
        try { const d = await res.json(); msg = d.detail || msg } catch { /* noop */ }
        throw new Error(msg)
      }
      setInquirySuccess(dict.inquirySuccessMsg || "Message sent! We'll respond within 24 hours.")
      setInquiryForm(EMPTY_INQUIRY)
    } catch (err) {
      setInquiryError((err as Error).message || 'Something went wrong. Please try again.')
    } finally {
      setInquiryLoading(false)
    }
  }

  return (
    <section id="jetzt-anfragen" className="partner-section">
      <div className="section-container">

        {/* Heading */}
        <div className="partner-header">
          <h2 className="section-heading">{dict.title}</h2>
          <div className="divider" />
          <p className="partner-desc">{dict.desc}</p>
        </div>

        <div className="partner-grid">

          {/* ════════════════════════════════════
              Apply form
          ════════════════════════════════════ */}
          <div id="jetzt-bewerben" className="partner-card">
            <div className="partner-card-head">
              <div className="partner-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="partner-card-title">{dict.applyTitle}</h3>
            </div>
            <div className="divider" />
            <p className="partner-card-desc">{dict.applyDesc}</p>

            <form onSubmit={handleApplySubmit} className="partner-form">

              {applySuccess && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.875rem' }}>
                  {applySuccess}
                </div>
              )}
              {applyError && (
                <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '6px', marginBottom: '12px', fontSize: '0.875rem' }}>
                  {applyError}
                </div>
              )}

              {/* Name — required */}
              <div className="form-row">
                <label className="form-label">{dict.nameLabel}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={dict.nameLabel}
                  value={applyForm.name}
                  onChange={e => setApplyForm(p => ({ ...p, name: e.target.value }))}
                />
              </div>

              {/* Email — required */}
              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  placeholder={dict.emailLabel}
                  value={applyForm.email}
                  onChange={e => setApplyForm(p => ({ ...p, email: e.target.value }))}
                />
              </div>

              {/* Phone — required by API */}
              <div className="form-row">
                <label className="form-label">{dict.phoneLabel} *</label>
                <input
                  type="tel"
                  required
                  className="form-input"
                  placeholder="+49 123 456789"
                  value={applyForm.phone}
                  onChange={e => setApplyForm(p => ({ ...p, phone: e.target.value }))}
                />
              </div>

              {/* Experience years — required by API */}
              <div className="form-row">
                <label className="form-label">{dict.expYearsLabel || 'Years of Experience *'}</label>
                <input
                  type="number"
                  required
                  min={0}
                  max={50}
                  className="form-input"
                  placeholder="0"
                  value={applyForm.experience_years}
                  onChange={e => setApplyForm(p => ({ ...p, experience_years: e.target.value }))}
                />
              </div>

              {/* Position — maps to skills[] in API, auto-fills location */}
              <div className="form-row">
                <label className="form-label">{dict.positionLabel}</label>
                <select
                  className="form-input"
                  value={applyForm.position}
                  onChange={e => setApplyForm(p => ({ ...p, position: e.target.value }))}
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">{dict.positionPlaceholder || '— Select a position —'}</option>
                  {activeJobs.map(job => (
                    <option key={job.id} value={job.title}>
                      {job.title}{job.location ? ` – ${job.location}` : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* CV Upload — optional */}
              <div className="form-row">
                <label className="form-label">
                  {dict.cvLabel}{' '}
                  <span style={{ fontWeight: 400, color: '#999', fontSize: '0.8em' }}>({dict.cvOptionalLabel || 'optional'})</span>
                </label>
                <label className="cv-drop-zone">
                  {applyFile ? (
                    <span className="cv-drop-text" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                      📄 {applyFile.name}
                    </span>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cv-drop-icon">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <span className="cv-drop-text">
                        {dict.dropText}<span className="cv-drop-link">{dict.uploadText}</span>
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    onChange={e => {
                      if (e.target.files?.[0]) setApplyFile(e.target.files[0])
                    }}
                  />
                </label>
              </div>

              <button type="submit" className="btn-primary w-full" disabled={applyLoading}>
                {applyLoading ? 'Sending…' : dict.submitBtn}
              </button>
            </form>
          </div>

          {/* ════════════════════════════════════
              Inquiry form
          ════════════════════════════════════ */}
          <div className="partner-card">
            <div className="partner-card-head">
              <div className="partner-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 className="partner-card-title">{dict.inquiryTitle}</h3>
            </div>
            <div className="divider" />
            <p className="partner-card-desc">{dict.inquiryDesc}</p>

            <form onSubmit={handleInquirySubmit} className="partner-form">

              {inquirySuccess && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
                  {inquirySuccess}
                </div>
              )}
              {inquiryError && (
                <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
                  {inquiryError}
                </div>
              )}

              <div className="form-row">
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" required className="form-input"
                  placeholder={dict.nameLabel}
                  value={inquiryForm.name}
                  onChange={e => setInquiryForm(p => ({ ...p, name: e.target.value }))} />
              </div>

              <div className="form-row">
                <label className="form-label">{dict.companyLabel || 'Company Name'}</label>
                <input type="text" className="form-input"
                  placeholder={dict.companyLabel || 'Company Name'}
                  value={inquiryForm.company}
                  onChange={e => setInquiryForm(p => ({ ...p, company: e.target.value }))} />
              </div>

              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" required className="form-input"
                  placeholder={dict.emailLabel}
                  value={inquiryForm.email}
                  onChange={e => setInquiryForm(p => ({ ...p, email: e.target.value }))} />
              </div>

              <div className="form-row">
                <label className="form-label">{dict.phoneLabel} *</label>
                <input type="tel" required className="form-input"
                  placeholder="+49 123 456789"
                  value={inquiryForm.phone}
                  onChange={e => setInquiryForm(p => ({ ...p, phone: e.target.value }))} />
              </div>

              <div className="form-row">
                <label className="form-label">{dict.subjectLabel}</label>
                <input type="text" className="form-input"
                  placeholder={dict.subjectLabel}
                  value={inquiryForm.betreff}
                  onChange={e => setInquiryForm(p => ({ ...p, betreff: e.target.value }))} />
              </div>

              <div className="form-row">
                <label className="form-label">{dict.msgLabel}</label>
                <textarea className="form-input" rows={5} required
                  placeholder={dict.msgPlaceholder}
                  value={inquiryForm.nachricht}
                  onChange={e => setInquiryForm(p => ({ ...p, nachricht: e.target.value }))} />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={inquiryLoading}>
                {inquiryLoading ? 'Sending…' : dict.submitBtn}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
