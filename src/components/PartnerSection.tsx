'use client'
import { useState } from 'react'

export default function PartnerSection({ dict }: { dict: any }) {
  const [applyForm, setApplyForm] = useState({ name: '', email: '' })
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', betreff: '', nachricht: '' })

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

          {/* ── Apply form ── */}
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

            <div className="partner-form">
              <div className="form-row">
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input" value={applyForm.name}
                  onChange={e => setApplyForm({...applyForm, name: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input" value={applyForm.email}
                  onChange={e => setApplyForm({...applyForm, email: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.cvLabel}</label>
                <label className="cv-drop-zone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cv-drop-icon">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span className="cv-drop-text">
                    {dict.dropText}<span className="cv-drop-link">{dict.uploadText}</span>
                  </span>
                  <input type="file" accept=".pdf" className="sr-only" />
                </label>
              </div>
              <button className="btn-primary w-full">{dict.submitBtn}</button>
            </div>
          </div>

          {/* ── Inquiry form ── */}
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

            <div className="partner-form">
              <div className="form-row">
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input" value={inquiryForm.name}
                  onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input" value={inquiryForm.email}
                  onChange={e => setInquiryForm({...inquiryForm, email: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.subjectLabel}</label>
                <input type="text" className="form-input" value={inquiryForm.betreff}
                  onChange={e => setInquiryForm({...inquiryForm, betreff: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.msgLabel}</label>
                <textarea className="form-input" rows={4} placeholder={dict.msgPlaceholder}
                  value={inquiryForm.nachricht}
                  onChange={e => setInquiryForm({...inquiryForm, nachricht: e.target.value})} />
              </div>
              <button className="btn-primary w-full">{dict.submitBtn}</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
