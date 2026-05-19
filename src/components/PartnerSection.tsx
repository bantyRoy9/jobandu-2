'use client'
import { useState } from 'react'

export default function PartnerSection({ dict }: { dict: any }) {
  const [applyForm, setApplyForm] = useState({ name: '', email: '' })
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', betreff: '', nachricht: '' })

  return (
    <section id="jetzt-anfragen" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="section-heading mb-2">
            {dict.title}
          </h2>
          <div className="divider" />
          <p className="text-[14px] text-gray-600 leading-relaxed max-w-4xl">
            {dict.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Apply form */}
          <div id="jetzt-bewerben" className="border border-gray-200 rounded p-7">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-accent border border-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">{dict.applyTitle}</h3>
            </div>
            <div className="divider" />
            <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
              {dict.applyDesc}
            </p>
            <div className="space-y-3.5">
              <div>
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input"
                  value={applyForm.name} onChange={e => setApplyForm({...applyForm, name: e.target.value})}/>
              </div>
              <div>
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input"
                  value={applyForm.email} onChange={e => setApplyForm({...applyForm, email: e.target.value})}/>
              </div>
              <div>
                <label className="form-label">{dict.cvLabel}</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-5 cursor-pointer hover:border-primary transition-colors group bg-gray-50">
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span className="text-[12px] text-gray-500 group-hover:text-primary">{dict.dropText}<span className="font-semibold underline">{dict.uploadText}</span></span>
                  <input type="file" accept=".pdf" className="hidden"/>
                </label>
              </div>
              <button className="btn-primary w-full text-center">{dict.submitBtn}</button>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="border border-gray-200 rounded p-7">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 bg-accent border border-primary rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4.5 h-4.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 className="text-base font-bold text-gray-900">{dict.inquiryTitle}</h3>
            </div>
            <div className="divider" />
            <p className="text-[13px] text-gray-600 leading-relaxed mb-5">
              {dict.inquiryDesc}
            </p>
            <div className="space-y-3.5">
              <div>
                <label className="form-label">{dict.nameLabel}</label>
                <input type="text" className="form-input"
                  value={inquiryForm.name} onChange={e => setInquiryForm({...inquiryForm, name: e.target.value})}/>
              </div>
              <div>
                <label className="form-label">{dict.emailLabel}</label>
                <input type="email" className="form-input"
                  value={inquiryForm.email} onChange={e => setInquiryForm({...inquiryForm, email: e.target.value})}/>
              </div>
              <div>
                <label className="form-label">{dict.subjectLabel}</label>
                <input type="text" className="form-input"
                  value={inquiryForm.betreff} onChange={e => setInquiryForm({...inquiryForm, betreff: e.target.value})}/>
              </div>
              <div>
                <label className="form-label">{dict.msgLabel}</label>
                <textarea className="form-input" rows={4} placeholder={dict.msgPlaceholder}
                  value={inquiryForm.nachricht} onChange={e => setInquiryForm({...inquiryForm, nachricht: e.target.value})}/>
              </div>
              <button className="btn-primary w-full text-center">{dict.submitBtn}</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
