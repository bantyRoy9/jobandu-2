import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import ContactHero from '@/components/ContactHero'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function KontaktPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <ContactHero dict={dict.contact} lang={lang} />
      <ContactSection dict={dict.contact} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
