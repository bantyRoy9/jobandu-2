import { getDictionary, Locale } from '@/i18n/dictionaries'
import Navbar from '@/components/Navbar'
import BewerberHero from '@/components/BewerberHero'
import BewerberBenefits from '@/components/BewerberBenefits'
import BewerberTarif from '@/components/BewerberTarif'
import BewerberJobs from '@/components/BewerberJobs'
import Footer from '@/components/Footer'

export default function BewerberPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = getDictionary(lang)

  return (
    <main>
      <Navbar dict={dict.nav} lang={lang} />
      <BewerberHero dict={dict.bewerber} lang={lang} />
      <BewerberBenefits dict={dict.bewerber} />
      <BewerberTarif dict={dict.bewerber} />
      <BewerberJobs dict={dict.bewerber} lang={lang} />
      <Footer footerDict={dict.footer} navDict={dict.nav} lang={lang} />
    </main>
  )
}
