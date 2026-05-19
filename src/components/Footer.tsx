import Link from 'next/link'

export default function Footer({ footerDict, navDict, lang }: { footerDict: any, navDict: any, lang: string }) {
  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Kontakt */}
          <div>
            <h5 className="text-white font-bold text-[14px] mb-3">{footerDict.contact}</h5>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <div className="space-y-1.5 text-[13px] text-gray-400">
              <p>Jobandu GmbH</p>
              <p>Johannes-Kepler-Str. 7</p>
              <p>54634 Bitburg</p>
              <p className="pt-1">
                Tel: <a href="tel:+4965619451144" className="text-gray-300 hover:text-white">+49 (0) 65619451-144</a>
              </p>
              <p>
                Mail: <a href="mailto:info@jobandu.de" className="text-gray-300 hover:text-white">info@jobandu.de</a>
              </p>
            </div>
          </div>

          {/* Nützliche Links */}
          <div>
            <h5 className="text-white font-bold text-[14px] mb-3">{footerDict.links}</h5>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2">
              {[
                { label: navDict.leistungen, href: `/${lang}/leistungen` },
                { label: navDict.ueberUns, href: `/${lang}/ueber-uns` },
                { label: navDict.kontakt, href: `/${lang}/kontakt` },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    <svg className="w-2.5 h-2.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h5 className="text-white font-bold text-[14px] mb-3">{footerDict.legal}</h5>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <ul className="space-y-2">
              {[
                { label: footerDict.privacy, href: `/${lang}/datenschutzerklaerung` },
                { label: footerDict.imprint, href: `/${lang}/impressum` },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-gray-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    <svg className="w-2.5 h-2.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* GVP */}
          <div>
            <h5 className="text-white font-bold text-[14px] mb-3 leading-snug">
              {footerDict.gvp1}<br/>{footerDict.gvp2}<br/>{footerDict.gvp3}
            </h5>
            <div className="w-8 h-0.5 bg-primary mb-4" />
            <img
              src="https://jobandu.de/wp-content/uploads/2025/07/GVP-Logo_Mitglied_quer_blau_RGB-1-002.png"
              alt="GVP Mitglied"
              style={{height: '52px', width: 'auto', filter: 'brightness(0) invert(1)', opacity: 0.8}}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-gray-500">{footerDict.rights}</p>
          <a href="https://www.facebook.com/profile.php?id=61576964961776" target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors">
            <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
