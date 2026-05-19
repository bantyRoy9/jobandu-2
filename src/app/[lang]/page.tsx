import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeatureStrip from '@/components/FeatureStrip'
import Expertise from '@/components/Expertise'
import PartnerSection from '@/components/PartnerSection'
import WhyJobandu from '@/components/WhyJobandu'
import TeamSection from '@/components/TeamSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <Hero dict={dict.hero} />
      <FeatureStrip dict={dict.features} />
      <Expertise dict={dict.expertise} />
      <PartnerSection dict={dict.partner} />
      <WhyJobandu dict={dict.why} />
      <TeamSection dict={dict.team} />
      <ContactSection dict={dict.contact} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
