import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Jobandu – Sofort verfügbare Hilfskräfte deutschlandweit',
  description: 'Zuverlässige Zeitarbeit in Lager, Produktion & Transport. Heute beauftragen, morgen im Einsatz.',
}

export async function generateStaticParams() {
  return [{ lang: 'de' }, { lang: 'en' }, { lang: 'ro' }]
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang || 'de'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body style={{fontFamily: "'Inter', system-ui, sans-serif"}}>{children}</body>
    </html>
  )
}
