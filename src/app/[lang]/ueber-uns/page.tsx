import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import AboutHero from '@/components/AboutHero'
import TeamBios from '@/components/TeamBios'
import WhyJobandu from '@/components/WhyJobandu'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function UeberUnsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <AboutHero dict={dict.about} lang={lang} />
      <TeamBios dict={dict.about} lang={lang} />
      <WhyJobandu dict={dict.why} />
      <TeamSection dict={dict.team} />
      <ContactSection dict={dict.contact} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
