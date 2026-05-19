import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import ServicesHero from '@/components/ServicesHero'
import ServiceTypes from '@/components/ServiceTypes'
import Industries from '@/components/Industries'
import WhyJobandu from '@/components/WhyJobandu'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function LeistungenPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <ServicesHero dict={dict.services} lang={lang} />
      <ServiceTypes dict={dict.services} />
      <Industries dict={dict.services} />
      <WhyJobandu dict={dict.why} />
      <TeamSection dict={dict.team} />
      <ContactSection dict={dict.contact} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
