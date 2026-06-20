'use client'
import { useState, useEffect } from 'react'
import { CONTENT_API_BASE } from '@/lib/admin-api'

interface Member {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone?: string | null
}

export default function TeamBios({ dict, lang }: { dict: any; lang: string }) {
  const [teamMembers, setTeamMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${CONTENT_API_BASE}/team`)
      .then(r => r.ok ? r.json() : [])
      .then((data: Member[]) => setTeamMembers(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Map API department names → translated labels
  const departmentLabel: Record<string, string> = {
    'Sales': dict.vertriebTitle,
    'Recruiting': dict.recruitingTitle,
    'Customer Support': dict.kundenbetreuungTitle,
  }

  // Group by department, preserving order: Sales → Recruiting → Customer Support
  const ORDER = ['Sales', 'Recruiting', 'Customer Support']
  const grouped: Record<string, Member[]> = {}
  teamMembers.forEach(m => {
    const dept = m.department || 'Other'
    if (!grouped[dept]) grouped[dept] = []
    grouped[dept].push(m)
  })
  const categories = [
    ...ORDER.filter(d => grouped[d]).map(d => ({ key: d, title: departmentLabel[d] || d, members: grouped[d] })),
    ...Object.keys(grouped).filter(d => !ORDER.includes(d)).map(d => ({ key: d, title: d, members: grouped[d] })),
  ]

  return (
    <section className="teambios-section">
      <div className="section-container">

        {/* ── Section intro ── */}
        <div className="teambios-intro">
          <h2 className="section-heading">{dict.teamTitle}</h2>
          <div className="divider" />
          <p className="teambios-desc">{dict.teamDesc}</p>
        </div>

        {/* ── Category groups ── */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '0.9rem' }}>
            Loading team…
          </div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: '0.9rem' }}>
            No team members found.
          </div>
        ) : (
          <div className="teambios-groups">
            {categories.map(cat => (
              <div key={cat.key} className="teambios-group">
                <h3 className="teambios-cat-title">{cat.title}</h3>
                <div className="teambios-members">
                  {cat.members.map(m => (
                    <div key={m.id} className="teambios-member">
                      {/* Avatar */}
                      <div className="teambios-avatar" aria-hidden="true">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      {/* Info */}
                      <div className="teambios-member-info">
                        <p className="teambios-name">{m.name}</p>
                        <p className="teambios-role">{m.role}</p>
                        {m.phone && (
                          <a href={`tel:${m.phone.replace(/[\s()]/g, '')}`} className="teambios-contact">
                            {m.phone}
                          </a>
                        )}
                        <a href={`mailto:${m.email}`} className="teambios-contact">
                          {m.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── GVP / Equal Pay ── */}
        <div className="teambios-gvp">
          <div className="teambios-gvp-text">
            <p>{dict.gvpText}</p>
          </div>
          <div className="teambios-gvp-logos">
            <img
              src="/images/equal-pay.png"
              alt="Equal Pay"
              className="teambios-gvp-logo"
            />
            <img
              src="/images/gvp-logo.png"
              alt="GVP Mitglied"
              className="teambios-gvp-logo"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
