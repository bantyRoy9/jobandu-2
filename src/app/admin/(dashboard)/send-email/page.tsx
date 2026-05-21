'use client';
import { useState } from 'react';
import { sendEmail, type SendEmailPayload } from '@/lib/admin-api';

export default function SendEmailPage() {
  const [recipientType, setRecipientType] = useState<'applicant' | 'employer'>('applicant');
  const [recipientId, setRecipientId] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [useId, setUseId] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) { setError('Subject and message are required.'); return; }
    if (useId && !recipientId.trim()) { setError('Recipient ID is required.'); return; }
    if (!useId && !to.trim()) { setError('Email address is required.'); return; }
    setLoading(true); setError('');
    const payload: SendEmailPayload = { subject: subject.trim(), body: body.trim() };
    if (useId) {
      payload.recipient_id = recipientId.trim();
      payload.recipient_type = recipientType;
    } else {
      payload.to = to.trim();
    }
    try {
      await sendEmail(payload);
      setSuccess(true);
      setRecipientId(''); setTo(''); setSubject(''); setBody('');
    } catch (err) {
      setError((err as Error).message || 'Failed to send email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Direct Communications</h1>
          <p className="admin-page-subtitle">Compose and dispatch custom <span className="text-gradient" style={{ fontWeight: 800 }}>professional mail</span> to candidates or partners.</p>
        </div>
      </div>

      <div style={{ maxWidth: 720 }}>
        {success && (
          <div className="admin-alert admin-alert-success" style={{ marginBottom: '2rem', borderRadius: '1.25rem', border: '1px solid rgba(16, 185, 129, 0.2)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: 'var(--color-primary)' }}><polyline points="20 6 9 17 4 12"/></svg>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', fontSize: '0.9375rem' }}>Transmission Successful</strong>
              <div style={{ fontSize: '.8125rem', opacity: 0.8, marginTop: '.125rem' }}>Your message has been authenticated and dispatched to our mail servers.</div>
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981', fontWeight: 800, fontSize: '1.125rem' }} onClick={() => setSuccess(false)}>×</button>
          </div>
        )}

        <div className="admin-card glowing-border-card" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Recipient mode toggle */}
            <div style={{ background: 'rgba(248, 250, 252, 0.8)', padding: '1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              <label className="form-label" style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.6875rem', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' }}>Recipient Protocol</label>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '.625rem', cursor: 'pointer', fontSize: '.875rem', fontWeight: 600, color: useId ? 'var(--color-secondary)' : '#64748b' }}>
                  <input type="radio" name="mode" checked={useId} onChange={() => setUseId(true)} style={{ accentColor: 'var(--color-primary)', width: '1.125rem', height: '1.125rem' }} />
                  ID Reference
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '.625rem', cursor: 'pointer', fontSize: '.875rem', fontWeight: 600, color: !useId ? 'var(--color-secondary)' : '#64748b' }}>
                  <input type="radio" name="mode" checked={!useId} onChange={() => setUseId(false)} style={{ accentColor: 'var(--color-primary)', width: '1.125rem', height: '1.125rem' }} />
                  Direct Address
                </label>
              </div>
            </div>

            {useId ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div className="form-group">
                  <label className="form-label">Classification</label>
                  <select className="form-select" value={recipientType} onChange={e => setRecipientType(e.target.value as 'applicant' | 'employer')} style={{ borderRadius: '0.875rem', padding: '0.625rem 1rem' }}>
                    <option value="applicant">Applicant (Talent)</option>
                    <option value="employer">Employer (Partner)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Database ID <span className="req">*</span></label>
                  <input type="text" className="form-input" placeholder="e.g. 69f74cdb..." value={recipientId} onChange={e => setRecipientId(e.target.value)} style={{ borderRadius: '0.875rem', padding: '0.625rem 1rem' }} />
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Destination Address <span className="req">*</span></label>
                <input type="email" className="form-input" placeholder="recipient@organization.com" value={to} onChange={e => setTo(e.target.value)} style={{ borderRadius: '0.875rem', padding: '0.625rem 1rem' }} />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Message Subject <span className="req">*</span></label>
              <input type="text" className="form-input" placeholder="Enter clear, professional subject..." value={subject} onChange={e => setSubject(e.target.value)} style={{ borderRadius: '0.875rem', padding: '0.625rem 1rem' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Communication Body <span className="req">*</span></label>
              <textarea
                className="form-input"
                placeholder="Compose your professional message here..."
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={10}
                style={{ resize: 'vertical', borderRadius: '1rem', padding: '1rem', lineHeight: 1.7, fontSize: '0.9375rem' }}
              />
              <div style={{ fontSize: '.6875rem', color: '#94a3b8', marginTop: '.5rem', textAlign: 'right', fontWeight: 600 }}>METRICS: {body.length} CHARACTERS</div>
            </div>

            {error && (
              <div className="admin-alert admin-alert-error" style={{ borderRadius: '0.875rem' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
              <button type="submit" className="btn btn-primary hover-lift" disabled={loading} style={{ padding: '0.875rem 2rem', flex: 1 }}>
                {loading
                  ? <><span className="admin-spinner" /> Processing...</>
                  : <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '0.5rem' }}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Dispatch Message</>
                }
              </button>
              <button type="button" className="btn hover-lift" style={{ background: '#f8fafc', color: '#475569', border: '1px solid #e2e8f0', padding: '0 1.5rem' }}
                onClick={() => { setRecipientId(''); setTo(''); setSubject(''); setBody(''); setError(''); setSuccess(false); }}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
