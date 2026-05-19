'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const navLinks = [
    { label: dict.home, href: `/${lang}` },
    { label: dict.leistungen, href: `/${lang}/leistungen` },
    { label: dict.ueberUns, href: `/${lang}/ueber-uns` },
    { label: dict.fuerBewerber, href: `/${lang}/fuer-bewerber` },
    { label: dict.kontakt, href: `/${lang}/kontakt` },
  ]

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪', href: '/de' },
    { code: 'en', label: 'English', flag: '🇺🇸', href: '/en' },
    { code: 'ro', label: 'Română', flag: '🇷🇴', href: '/ro' },
  ]

  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const activeLang = languages.find(l => l.code === lang) || languages[0]
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <>
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex-shrink-0">
              <img src="https://jobandu.de/wp-content/uploads/2025/05/1.png" alt="Jobandu" className="h-10 w-auto object-contain" />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-5">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="text-[14px] font-medium text-gray-700 hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}

              {/* Lang switcher */}
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-[14px] font-medium text-gray-700 hover:text-primary">
                  <span>{activeLang.flag}</span>
                  <span>{activeLang.label}</span>
                  <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-100 rounded shadow-lg py-1 min-w-[130px] z-50">
                    {languages.map(langOpt => (
                      <a key={langOpt.code} href={langOpt.href}
                        className="flex items-center gap-2 w-full px-3 py-2 text-[13px] text-gray-700 hover:bg-accent hover:text-primary">
                        <span>{langOpt.flag}</span><span>{langOpt.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-2.5">
              <a href="https://www.facebook.com/profile.php?id=61576964961776" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors p-1">
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <button onClick={() => setApplyOpen(true)} className="btn-primary text-[13px]">{dict.jetztBewerben}</button>
              <Link href="#jetzt-anfragen" className="text-[13px] font-semibold text-primary border border-primary px-4 py-[7px] rounded hover:bg-accent transition-colors">{dict.jetztAnfragen}</Link>
            </div>

            {/* Hamburger */}
            <button className="lg:hidden p-2 flex flex-col gap-1.5" onClick={() => setMobileOpen(!mobileOpen)}>
              <span className={`w-5 h-0.5 bg-gray-600 transition-all block ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}/>
              <span className={`w-5 h-0.5 bg-gray-600 block ${mobileOpen ? 'opacity-0' : ''}`}/>
              <span className={`w-5 h-0.5 bg-gray-600 transition-all block ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 py-3 space-y-0.5 pb-4">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-[14px] font-medium text-gray-700 hover:text-primary hover:bg-accent rounded">
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <button onClick={() => { setApplyOpen(true); setMobileOpen(false) }} className="btn-primary text-sm text-center w-full">{dict.jetztBewerben}</button>
                <Link href="#jetzt-anfragen" onClick={() => setMobileOpen(false)} className="text-sm font-semibold text-primary border border-primary px-4 py-2 rounded text-center hover:bg-accent">{dict.jetztAnfragen}</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Apply Modal */}
      {applyOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
          onClick={e => { if (e.target === e.currentTarget) setApplyOpen(false) }}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-7 relative">
            <button onClick={() => setApplyOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{dict.applyTitle}</h3>
            <p className="text-xs text-gray-500 mb-5">{dict.applyDesc}</p>
            <div className="space-y-3.5">
              <div><label className="form-label">{dict.name}</label><input type="text" className="form-input" /></div>
              <div><label className="form-label">{dict.email}</label><input type="email" className="form-input" /></div>
              <div>
                <label className="form-label">{dict.uploadCV}</label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded p-5 cursor-pointer hover:border-primary transition-colors group">
                  <svg className="w-7 h-7 text-gray-300 group-hover:text-primary mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                  <span className="text-xs text-gray-500 group-hover:text-primary">{dict.uploadBtn}</span>
                  <input type="file" accept=".pdf" className="hidden"/>
                </label>
              </div>
              <button className="btn-primary w-full text-center mt-1">{dict.submitBtn}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
