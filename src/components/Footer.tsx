import Link from 'next/link'

export default function Footer({ footerDict, navDict, lang }: { footerDict: any; navDict: any; lang: string }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">

          {/* Col 1 — Contact */}
          <div>
            <h5 className="footer-col-title">{footerDict.contact}</h5>
            <div className="footer-divider" />
            <div className="footer-contact-info">
              <p>Jobandu GmbH</p>
              <p>Johannes-Kepler-Str. 7</p>
              <p>54634 Bitburg</p>
              <p className="footer-contact-row">
                <span>Tel:</span>
                <a href="tel:+4965619451144" className="footer-link">+49 (0) 65619451-144</a>
              </p>
              <p className="footer-contact-row">
                <span>Mail:</span>
                <a href="mailto:info@jobandu.de" className="footer-link">info@jobandu.de</a>
              </p>
            </div>
          </div>

          {/* Col 2 — Useful links */}
          <div>
            <h5 className="footer-col-title">{footerDict.links}</h5>
            <div className="footer-divider" />
            <ul className="footer-links-list">
              {[
                { label: navDict.leistungen,  href: `/${lang}/leistungen` },
                { label: navDict.ueberUns,    href: `/${lang}/ueber-uns` },
                { label: navDict.kontakt,     href: `/${lang}/kontakt` },
                { label: navDict.adminLogin || 'Admin', href: `/admin/login` },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-nav-link">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h5 className="footer-col-title">{footerDict.legal}</h5>
            <div className="footer-divider" />
            <ul className="footer-links-list">
              {[
                { label: footerDict.privacy, href: `/${lang}/datenschutzerklaerung` },
                { label: footerDict.imprint, href: `/${lang}/impressum` },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-nav-link">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — GVP */}
          <div>
            <h5 className="footer-col-title footer-gvp-title">
              {footerDict.gvp1}<br />{footerDict.gvp2}<br />{footerDict.gvp3}
            </h5>
            <div className="footer-divider" />
            <img
              src="https://jobandu.de/wp-content/uploads/2025/07/GVP-Logo_Mitglied_quer_blau_RGB-1-002.png"
              alt="GVP Mitglied"
              className="footer-gvp-logo"
            />
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">{footerDict.rights}</p>
          <a
            href="https://www.facebook.com/profile.php?id=61576964961776"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-fb"
            aria-label="Jobandu on Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
