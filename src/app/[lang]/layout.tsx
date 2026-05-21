import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Jobandu – Sofort verfügbare Hilfskräfte deutschlandweit',
  description: 'Zuverlässige Zeitarbeit in Lager, Produktion & Transport. Heute beauftragen, morgen im Einsatz.',
}

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'ro' }]
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
