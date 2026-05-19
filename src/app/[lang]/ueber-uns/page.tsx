import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import AboutHero from '@/components/AboutHero'
import TeamBios from '@/components/TeamBios'
import AboutWhy from '@/components/AboutWhy'
import AboutContact from '@/components/AboutContact'
import Footer from '@/components/Footer'

export default function UeberUnsPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <AboutHero dict={dict.about} lang={lang} />
      <TeamBios dict={dict.about} lang={lang} />
      <AboutWhy dict={dict.about} />
      <AboutContact dict={dict.contact} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
