'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { PUBLIC_API_BASE } from '@/lib/admin-api'
import AdminLoginModal from '@/components/admin/AdminLoginModal'

export default function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const navLinks = [
    { label: dict.home,        href: `/${lang}` },
    { label: dict.leistungen,  href: `/${lang}/leistungen` },
    { label: dict.ueberUns,    href: `/${lang}/ueber-uns` },
    { label: dict.fuerBewerber,href: `/${lang}/fuer-bewerber` },
    { label: dict.kontakt,     href: `/${lang}/kontakt` },
  ]

  const languages = [
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ro', label: 'Română', flag: '🇷🇴' },
  ]

  const activeLang = languages.find(l => l.code === lang) || languages[0]

  const [mobileOpen, setMobileOpen]     = useState(false)
  const [langOpen,   setLangOpen]       = useState(false)
  const [applyOpen,  setApplyOpen]      = useState(false)
  const [adminModalOpen, setAdminModalOpen] = useState(false)

  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    dob: '',
    position: '',
    message: '',
  })
  const [applyFile, setApplyFile] = useState<File | null>(null)
  const [applyLoading, setApplyLoading] = useState(false)
  const [applySuccessMsg, setApplySuccessMsg] = useState('')

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email || !applyForm.nationality || !applyForm.dob) {
      alert('Please fill all required fields.');
      return;
    }

    setApplyLoading(true);

    const fd = new FormData();
    fd.append('name', applyForm.name);
    fd.append('email', applyForm.email);
    fd.append('phone', applyForm.phone);
    fd.append('nationality', applyForm.nationality);
    fd.append('dob', applyForm.dob);
    fd.append('position', applyForm.position);
    fd.append('message', applyForm.message);
    fd.append('location', 'Not specified');
    fd.append('skills', JSON.stringify(['General Application']));
    fd.append('experience_years', '0');

    if (applyFile) {
      if (applyFile.size > 5 * 1024 * 1024) {
        alert('File too large. Maximum size is 5MB.');
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

      setApplySuccessMsg(dict.successMsg || 'Application sent successfully!');
      setTimeout(() => {
        setApplySuccessMsg('');
        setApplyOpen(false);
        setApplyForm({ name: '', email: '', phone: '', nationality: '', dob: '', position: '', message: '' });
        setApplyFile(null);
      }, 3000);
    } catch (err) {
      alert((err as Error).message || 'Something went wrong. Please try again.');
    } finally {
      setApplyLoading(false);
    }
  }

  const langRef = useRef<HTMLDivElement>(null)

  // Close lang dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ─── NAVBAR ─────────────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="navbar-inner">

          {/* ── LEFT: Logo + Facebook ── */}
          <div className="navbar-left">
            <Link href={`/${lang}`} className="navbar-logo-link" aria-label="Jobandu – Home">
              <img
                src="https://jobandu.de/wp-content/uploads/2025/05/1.png"
                alt="Jobandu"
                className="navbar-logo"
              />
            </Link>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61576964961776"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-fb"
              aria-label="Jobandu on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#137a42" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

          {/* ── CENTER: Nav links + Lang switcher (desktop) ── */}
          <div className="navbar-center">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="navbar-link">
                {l.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div className="navbar-lang" ref={langRef}>
              <button
                onClick={() => setLangOpen(v => !v)}
                className="navbar-lang-btn"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <span aria-hidden="true">{activeLang.flag}</span>
                <span>{activeLang.label}</span>
                <svg
                  className={`navbar-lang-chevron ${langOpen ? 'rotate-180' : ''}`}
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {langOpen && (
                <div className="navbar-lang-dropdown" role="listbox">
                  {languages.map(opt => (
                    <a
                      key={opt.code}
                      href={`/${opt.code}`}
                      role="option"
                      aria-selected={opt.code === lang}
                      className={`navbar-lang-option ${opt.code === lang ? 'active' : ''}`}
                      onClick={() => setLangOpen(false)}
                    >
                      <span aria-hidden="true">{opt.flag}</span>
                      <span>{opt.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: CTA buttons + Admin (desktop) ── */}
          <div className="navbar-right">
            {/* Admin login button — icon + label */}
            <button
              id="admin-login-btn"
              className="admin-header-btn"
              onClick={() => setAdminModalOpen(true)}
              aria-label="Admin login"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {dict.adminLogin || 'Admin'}
            </button>
            <button
              onClick={() => setApplyOpen(true)}
              className="btn-nav-primary"
            >
              {dict.jetztBewerben}
            </button>
            <Link href={`/${lang}/kontakt`} className="btn-nav-outline">
              {dict.jetztAnfragen}
            </Link>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`ham-bar ${mobileOpen ? 'ham-bar-1-open' : ''}`} />
            <span className={`ham-bar ${mobileOpen ? 'ham-bar-2-open' : ''}`} />
            <span className={`ham-bar ${mobileOpen ? 'ham-bar-3-open' : ''}`} />
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
          <div className="navbar-mobile-inner">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="navbar-mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile lang switcher */}
            <div className="navbar-mobile-langs">
              {languages.map(opt => (
                <a
                  key={opt.code}
                  href={`/${opt.code}`}
                  className={`navbar-mobile-lang-opt ${opt.code === lang ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </a>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="navbar-mobile-ctas">
              <button
                onClick={() => { setApplyOpen(true); setMobileOpen(false) }}
                className="btn-nav-primary w-full"
              >
                {dict.jetztBewerben}
              </button>
              <Link
                href={`/${lang}/kontakt`}
                className="btn-nav-outline w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                {dict.jetztAnfragen}
              </Link>
              <button
                onClick={() => { setAdminModalOpen(true); setMobileOpen(false) }}
                className="btn-nav-outline w-full"
                style={{ justifyContent: 'center' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {dict.adminLogin || 'Admin'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── APPLY MODAL ─────────────────────────────────────────────── */}
      {applyOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="apply-modal-title"
          onClick={e => { if (e.target === e.currentTarget) setApplyOpen(false) }}
        >
          <div className="modal-box">
            <button
              onClick={() => setApplyOpen(false)}
              className="modal-close"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* <h3 id="apply-modal-title" className="modal-title">{dict.applyTitle}</h3> */}
            {/* <p className="modal-desc">{dict.applyDesc}</p> */}

            <form className="modal-form" onSubmit={handleApplySubmit}>
              {applySuccessMsg && (
                <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
                  {applySuccessMsg}
                </div>
              )}

              {/* Name */}
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder={`${dict.name || 'Name'} *`}
                  autoComplete="name"
                  required
                  value={applyForm.name}
                  onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  className="form-input"
                  placeholder={`${dict.email || 'Email Address'} *`}
                  autoComplete="email"
                  required
                  value={applyForm.email}
                  onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  className="form-input"
                  placeholder={dict.phoneNumber || 'Phone Number'}
                  autoComplete="tel"
                  value={applyForm.phone}
                  onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                />
              </div>

              {/* Nationality */}
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder={`${dict.nationality || 'Nationality'} *`}
                  required
                  value={applyForm.nationality}
                  onChange={e => setApplyForm({ ...applyForm, nationality: e.target.value })}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder={`${dict.dob || 'Date of Birth'} * (DD.MM.YYYY)`}
                  pattern="\d{2}\.\d{2}\.\d{4}"
                  title="Format: DD.MM.YYYY"
                  required
                  value={applyForm.dob}
                  onChange={e => setApplyForm({ ...applyForm, dob: e.target.value })}
                />
              </div>

              {/* Position */}
              <div>
                <input
                  type="text"
                  className="form-input"
                  placeholder={dict.position || 'Which position are you applying for?'}
                  value={applyForm.position}
                  onChange={e => setApplyForm({ ...applyForm, position: e.target.value })}
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  className="form-input"
                  placeholder={dict.messageOrComment || 'Message or comment'}
                  rows={4}
                  value={applyForm.message}
                  onChange={e => setApplyForm({ ...applyForm, message: e.target.value })}
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="form-label text-sm text-gray-600">{dict.uploadCV || 'Upload CV (PDF)'}</label>
                <label className="cv-upload-area mt-1">
                  {applyFile ? (
                    <span className="cv-upload-text" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                      📄 {applyFile.name}
                    </span>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="cv-upload-icon">
                        <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      <span className="cv-upload-text">{dict.uploadBtn || 'Choose File'}</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf"
                    className="sr-only"
                    onChange={e => {
                      if (e.target.files && e.target.files.length > 0) {
                        setApplyFile(e.target.files[0])
                      }
                    }}
                  />
                </label>
              </div>

              <button type="submit" className="btn-nav-primary w-full mt-2" disabled={applyLoading}>
                {applyLoading ? 'Sending...' : (dict.submitBtn || 'Submit Application')}
              </button>
            </form>
          </div>
        </div>
      )}
      {adminModalOpen && <AdminLoginModal onClose={() => setAdminModalOpen(false)} />}
    </>
  )
}
