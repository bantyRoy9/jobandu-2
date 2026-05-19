import Link from 'next/link'

const cards = [
  {
    title: 'Stellenangebote',
    subtitle: 'mehr erfahren',
    href: '/fuer-bewerber#stellenangebot',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Ansprechpartner',
    subtitle: 'mehr erfahren',
    href: '/ueber-uns#ueber-uns',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Kontakt',
    subtitle: 'mehr erfahren',
    href: '/kontakt',
    icon: (
      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function QuickCards() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 -mt-10 relative z-10">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} className="quick-card group block">
              <div className="icon group-hover:bg-primary transition-colors duration-300">
                <div className="group-hover:[&_svg]:text-white transition-colors duration-300">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">{card.title}</h3>
              <p className="text-sm text-primary font-semibold">{card.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
