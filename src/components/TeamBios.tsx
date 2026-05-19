import Image from 'next/image'

interface Member {
  name: string
  role: string
  email: string
  phone?: string
}

export default function TeamBios({ dict, lang }: { dict: any; lang: string }) {
  const categories: { title: any; members: Member[] }[] = [
    {
      title: dict.vertriebTitle,
      members: [
        { name: 'Dennis Del', role: dict.vertriebTitle, email: 'dd@jobandu.de' },
        { name: 'Manuela Klug', role: dict.vertriebTitle, email: 'mk@jobandu.de' }
      ]
    },
    {
      title: dict.recruitingTitle,
      members: [
        { name: 'Mathias Nielsen', role: dict.recruitingTitle, email: 'mv@jobandu.de', phone: '+49 (0) 174 1628182' },
        { name: 'Natalia Sandhoff', role: dict.recruitingTitle, email: 'ns@jobandu.de', phone: '+49 (0) 1732827622' },
        { name: 'Emilia Skrzypek', role: dict.recruitingTitle, email: 'es@jobandu.de', phone: '+49 (0) 1732789912' }
      ]
    },
    {
      title: dict.kundenbetreuungTitle,
      members: [
        { name: 'Henning Nielsen', role: lang === 'de' ? 'Geschäftsführer' : lang === 'ro' ? 'Director General' : 'Managing Director', email: 'hn@jobandu.de' }
      ]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-navy tracking-tight sm:text-4xl mb-4">
            {dict.teamTitle}
          </h2>
          <div className="h-1.5 w-16 bg-primary mx-auto mb-6 rounded-full" />
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {dict.teamDesc}
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-16">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-6">
              <h3 className="text-xl font-bold text-navy border-l-4 border-primary pl-3 uppercase tracking-wider">
                {cat.title}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.members.map((member, memberIdx) => (
                  <div 
                    key={memberIdx} 
                    className="bg-accent/30 rounded-lg p-6 hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 flex flex-col justify-between"
                  >
                    <div>
                      {/* Avatar Placeholder */}
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      
                      <h4 className="text-lg font-bold text-navy mb-1">{member.name}</h4>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-4">{member.role}</p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-primary/5 text-sm text-gray-600">
                      {member.phone && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">
                            {member.phone}
                          </a>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors break-all">
                          {member.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* GVP Membership Section */}
        <div className="mt-20 pt-16 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-navy mb-4">
              {lang === 'de' ? 'Equal Pay & GVP Mitgliedschaft' : lang === 'ro' ? 'Equal Pay & Calitatea de Membru GVP' : 'Equal Pay & GVP Membership'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {dict.gvpText}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6 flex-shrink-0">
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/07/Equal-Pay-.png" 
              alt="Equal Pay" 
              className="h-16 w-auto object-contain"
            />
            <img 
              src="https://jobandu.de/wp-content/uploads/2025/07/GVP-Logo_Mitglied_quer_blau_RGB-1-002.png" 
              alt="GVP Member" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
