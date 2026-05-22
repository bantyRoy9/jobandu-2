import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'Jobandu – Immediate Staff Availability Nationwide',
  description: 'Reliable temporary staffing in warehousing, production & transport. Commission today, work tomorrow.',
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'da' }]
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
