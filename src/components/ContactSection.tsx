'use client'
import { useState, useEffect } from 'react'

export default function ContactSection({ dict }: { dict: any }) {
  const [form, setForm] = useState({ name: '', email: '', betreff: '', nachricht: '' })
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <section id="kontakt" className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-2">{dict.title}</h2>
        <div className="divider" />
        <p className="text-[14px] text-gray-600 leading-relaxed max-w-4xl mb-10">
          {dict.desc}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left col: info cards + form */}
          <div className="space-y-5">
            {/* 2x2 green info cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: dict.address,
                  value: 'Johannes-Kepler-Str. 7\n54634 Bitburg',
                  icon: (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  ),
                },
                {
                  label: dict.hours,
                  value: dict.hoursValue,
                  icon: (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  ),
                },
                {
                  label: dict.email,
                  value: 'info@jobandu.de',
                  href: 'mailto:info@jobandu.de',
                  icon: (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                },
                {
                  label: dict.phone,
                  value: '+49 (0) 65619451-144',
                  href: 'tel:+4965619451144',
                  icon: (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <div key={i} className="contact-info-card">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white/80 uppercase tracking-wide mb-0.5">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="text-[12px] text-white hover:underline whitespace-pre-line leading-snug">{card.value}</a>
                    ) : (
                      <p className="text-[12px] text-white whitespace-pre-line leading-snug">{card.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="bg-white border border-gray-200 rounded p-6">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="form-label">{dict.nameLabel}</label>
                  <input type="text" className="form-input"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                </div>
                <div>
                  <label className="form-label">{dict.emailLabel}</label>
                  <input type="email" className="form-input"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">{dict.subjectLabel}</label>
                <input type="text" className="form-input"
                  value={form.betreff} onChange={e => setForm({...form, betreff: e.target.value})}/>
              </div>
              <div className="mb-4">
                <label className="form-label">{dict.msgLabel}</label>
                <textarea className="form-input" rows={4} placeholder={dict.msgPlaceholder}
                  value={form.nachricht} onChange={e => setForm({...form, nachricht: e.target.value})}/>
              </div>
              <button className="btn-primary w-full">{dict.submitBtn}</button>
            </div>
          </div>

          {/* Right col: Google Map */}
          <div className="rounded overflow-hidden border border-gray-200" style={{minHeight: '520px'}}>
            {mounted && (
              <iframe
                src="https://maps.google.com/maps?q=Johannes-Kepler-Str.+7+54634+Bitburg&t=&z=14&ie=UTF8&output=embed"
                width="100%" height="100%"
                style={{border: 0, minHeight: '520px', display: 'block'}}
                allowFullScreen loading="lazy"
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
