'use client'
import { useState } from 'react'
import { PUBLIC_API_BASE } from '@/lib/admin-api'

export default function PartnerSection({ dict }: { dict: any }) {
  const [applyForm, setApplyForm] = useState({ name: '', email: '' })
  const [applyFile, setApplyFile] = useState<File | null>(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applySuccess, setApplySuccess] = useState('')
  const [applyError, setApplyError] = useState('')

  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', betreff: '', nachricht: '' })
  const [inquiryLoading, setInquiryLoading] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState('')
  const [inquiryError, setInquiryError] = useState('')

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) {
      alert('Please fill all required fields.');
      return;
    }
    setApplyLoading(true);
    setApplyError('');
    setApplySuccess('');

    const fd = new FormData();
    fd.append('name', applyForm.name);
    fd.append('email', applyForm.email);
    fd.append('phone', '');
    fd.append('location', 'Not specified');
    fd.append('skills', JSON.stringify(['Corporate Partnership Application']));
    fd.append('experience_years', '0');

    if (applyFile) {
      if (applyFile.size > 5 * 1024 * 1024) {
        setApplyError('File too large. Maximum size is 5MB.');
        setApplyLoading(false);
        return;
      }
      fd.append('cv', applyFile);
    }

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/applicants/`, {
        method: 'POST',
        body: fd,
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const errData = await res.json();
          msg = errData.detail || msg;
        } catch {
          /* noop */
        }
        throw new Error(msg);
      }

      setApplySuccess(dict.successMsg || "Application sent successfully!");
      setApplyForm({ name: '', email: '' });
      setApplyFile(null);
    } catch (err) {
      setApplyError((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setApplyLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.nachricht) {
      alert('Please fill all required fields.');
      return;
    }
    setInquiryLoading(true);
    setInquiryError('');
    setInquirySuccess('');

    const payload = {
      company_name: inquiryForm.betreff || 'Corporate Partner Lead',
      contact_person: inquiryForm.name,
      email: inquiryForm.email,
      phone: 'Not provided',
      requirements: inquiryForm.betreff ? [inquiryForm.betreff] : ['Corporate Partner Inquiry'],
      location: 'Not provided',
      notes: inquiryForm.nachricht,
    };

    try {
      const res = await fetch(`${PUBLIC_API_BASE}/employers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const errData = await res.json();
          msg = errData.detail || msg;
        } catch {
          /* noop */
        }
        throw new Error(msg);
      }

      setInquirySuccess(dict.successMsg || "Message sent! We'll respond within 24 hours.");
      setInquiryForm({ name: '', email: '', betreff: '', nachricht: '' });
    } catch (err) {
      setInquiryError((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setInquiryLoading(false);
    }
  };

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

            <form onSubmit={handleApplySubmit} className="partner-form">
              {applySuccess && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
                  {applySuccess}
                </div>
              )}
              {applyError && (
                <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem' }}>
                  {applyError}
                </div>
              )}
              <div className="form-row">
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input" required value={applyForm.name}
                  onChange={e => setApplyForm({...applyForm, name: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input" required value={applyForm.email}
                  onChange={e => setApplyForm({...applyForm, email: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.cvLabel}</label>
                <label className="cv-drop-zone">
                  {applyFile ? (
                    <span className="cv-drop-text" style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>📄 {applyFile.name}</span>
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
                  <input type="file" accept=".pdf" className="sr-only" onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      setApplyFile(e.target.files[0]);
                    }
                  }} />
                </label>
              </div>
              <button type="submit" className="btn-primary w-full" disabled={applyLoading}>
                {applyLoading ? 'Sending...' : dict.submitBtn}
              </button>
            </form>
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
                <input type="text" className="form-input" required value={inquiryForm.name}
                  onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input" required value={inquiryForm.email}
                  onChange={e => setInquiryForm({...inquiryForm, email: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.subjectLabel}</label>
                <input type="text" className="form-input" value={inquiryForm.betreff}
                  onChange={e => setInquiryForm({...inquiryForm, betreff: e.target.value})} />
              </div>
              <div className="form-row">
                <label className="form-label">{dict.msgLabel}</label>
                <textarea className="form-input" rows={4} placeholder={dict.msgPlaceholder} required
                  value={inquiryForm.nachricht}
                  onChange={e => setInquiryForm({...inquiryForm, nachricht: e.target.value})} />
              </div>
              <button type="submit" className="btn-primary w-full" disabled={inquiryLoading}>
                {inquiryLoading ? 'Sending...' : dict.submitBtn}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
