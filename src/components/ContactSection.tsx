'use client'
import { useState, useEffect } from 'react'

export default function ContactSection({ dict }: { dict: any }) {
  const [form, setForm] = useState({ name: '', email: '', betreff: '', nachricht: '' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const infoCards = [
    {
      label: dict.address,
      value: 'Johannes-Kepler-Str. 7\n54634 Bitburg',
      href: undefined as string | undefined,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
    {
      label: dict.hours,
      value: (dict.hoursValue || 'Monday to Friday\n08:00 to 18:00').replace('\\n', '\n'),
      href: undefined as string | undefined,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
    {
      label: dict.email,
      value: 'info@jobandu.de',
      href: 'mailto:info@jobandu.de',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      label: dict.phone,
      value: '+49 (0) 65619451-144',
      href: 'tel:+4965619451144',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="kontakt" className="contact-section">
      <div className="section-container">

        {/* ── Section heading ── */}
        <h2 className="section-heading">{dict.title}</h2>
        <div className="divider" />

        {/* ── Callout line matching live site ── */}
        <p className="contact-callout">{dict.desc}</p>

        {/* ── 4 info cards in a single row ── */}
        <div className="contact-info-row">
          {infoCards.map((card, i) => (
            <div key={i} className="contact-info-card">
              <div className="contact-info-icon">{card.icon}</div>
              <div className="contact-info-body">
                <p className="contact-info-label">{card.label}</p>
                {card.href ? (
                  <a href={card.href} className="contact-info-value contact-info-link">
                    {card.value}
                  </a>
                ) : (
                  <p className="contact-info-value" style={{ whiteSpace: 'pre-line' }}>
                    {card.value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ── Form + Map side by side ── */}
        <div className="contact-grid">

          {/* Left: contact form */}
          <div className="contact-form-box">
            <div className="contact-form-row-2">
              <div>
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input" value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="form-row">
              <label className="form-label">{dict.subjectLabel}</label>
              <input type="text" className="form-input" value={form.betreff}
                onChange={e => setForm({ ...form, betreff: e.target.value })} />
            </div>
            <div className="form-row">
              <label className="form-label">{dict.msgLabel}</label>
              <textarea className="form-input" rows={5} placeholder={dict.msgPlaceholder}
                value={form.nachricht}
                onChange={e => setForm({ ...form, nachricht: e.target.value })} />
            </div>
            <button className="btn-primary w-full">{dict.submitBtn}</button>
          </div>

          {/* Right: Google Map */}
          <div className="contact-map">
            {mounted && (
              <iframe
                src="https://maps.google.com/maps?q=Johannes-Kepler-Str.+7+54634+Bitburg&t=&z=14&ie=UTF8&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '460px', display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Jobandu Standort"
              />
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
