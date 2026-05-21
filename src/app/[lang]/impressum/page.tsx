import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ImpressumPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  const title = lang === 'de' ? 'Impressum' : lang === 'ro' ? 'Mențiuni legale' : 'Imprint'
  const homeLabel = lang === 'de' ? 'Start' : lang === 'ro' ? 'Acasă' : 'Home'

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />

      {/* Page hero */}
      <section className="page-hero" style={{ background: 'var(--navy)' }}>
        <div className="section-container">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href={`/${lang}`} className="breadcrumb-link">{homeLabel}</Link>
            <span className="breadcrumb-sep">›</span>
            <span className="breadcrumb-current">{title}</span>
          </nav>
          <h1 className="page-hero-title">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="legal-section">
        <div className="section-container">
          <div className="legal-content">

            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Jobandu GmbH<br />
              Johannes-Kepler-Str. 7<br />
              54634 Bitburg<br />
              Deutschland
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <a href="tel:+4965619451144">+49 (0) 65619451-144</a><br />
              E-Mail: <a href="mailto:info@jobandu.de">info@jobandu.de</a>
            </p>

            <h2>Vertreten durch</h2>
            <p>Henning Nielsen (Geschäftsführer)</p>

            <h2>Handelsregister</h2>
            <p>
              Registergericht: Amtsgericht Wittlich<br />
              Registernummer: HRB 50000
            </p>

            <h2>Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              DE XXX XXX XXX
            </p>

            <h2>Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Berufsbezeichnung: Personaldienstleister / Zeitarbeitsunternehmen<br />
              Zuständige Aufsichtsbehörde: Bundesagentur für Arbeit
            </p>

            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>

            <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
              Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen.
            </p>

            <h2>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
              Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
              Seiten verantwortlich.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
              dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
              der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
              Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

          </div>
        </div>
      </section>

      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
