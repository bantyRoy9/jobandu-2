import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function DatenschutzPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  const title = lang === 'de' ? 'Datenschutzerklärung' : lang === 'ro' ? 'Politica de confidențialitate' : 'Privacy Policy'
  const homeLabel = lang === 'de' ? 'Start' : lang === 'ro' ? 'Acasă' : 'Home'

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />

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

      <section className="legal-section">
        <div className="section-container">
          <div className="legal-content">

            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann
              es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten
              werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
              IT-Systeme erfasst.
            </p>

            <h2>2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Vercel Inc.,
              440 N Barranca Ave #4133, Covina, CA 91723, USA.
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3>Verantwortliche Stelle</h3>
            <p>
              Jobandu GmbH<br />
              Johannes-Kepler-Str. 7<br />
              54634 Bitburg<br />
              Telefon: +49 (0) 65619451-144<br />
              E-Mail: <a href="mailto:info@jobandu.de">info@jobandu.de</a>
            </p>

            <h3>Speicherdauer</h3>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
              wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
              Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder
              eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern
              wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
              personenbezogenen Daten haben.
            </p>

            <h2>4. Datenerfassung auf dieser Website</h2>
            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter.
            </p>

            <h3>Bewerbungsunterlagen</h3>
            <p>
              Wenn Sie sich über unser Bewerbungsformular bewerben, werden Ihre Bewerbungsunterlagen
              (Name, E-Mail-Adresse, Lebenslauf) zur Bearbeitung Ihrer Bewerbung gespeichert. Die
              Daten werden nach Abschluss des Bewerbungsverfahrens gelöscht, sofern keine
              Einstellung erfolgt.
            </p>

            <h2>5. Ihre Rechte</h2>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
              personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
              Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu
              sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit
              an uns wenden.
            </p>
            <p>
              Außerdem steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>

          </div>
        </div>
      </section>

      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
