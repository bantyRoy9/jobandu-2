import Link from 'next/link'

export default function Expertise({ dict, lang }: { dict: any; lang?: string }) {
  const rows = [
    {
      title: dict.lagerTitle,
      desc: dict.lagerDesc,
      bullets: [dict.lager1, dict.lager2, dict.lager3],
      img: '/images/industry-warehouse.jpg',
      imgAlt: dict.lagerTitle,
      imgRight: true,
    },
    {
      title: dict.lkwTitle,
      badge: dict.new,
      desc: dict.lkwDesc,
      bullets: [dict.lkw1, dict.lkw2, dict.lkw3],
      img: '/images/industry-truck.jpg',
      imgAlt: dict.lkwTitle,
      imgRight: false,
    },
    {
      title: dict.schweisserTitle,
      desc: dict.schweisserDesc,
      bullets: [dict.schweisser1, dict.schweisser2, dict.schweisser3],
      img: '/images/industry-welder.jpg',
      imgAlt: dict.schweisserTitle,
      imgRight: true,
    },
  ]

  return (
    <section className="expertise-section">
      <div className="section-container">

        {/* ── Section header ── */}
        <div className="expertise-header">
          <div className="expertise-header-left">
            <h2 className="section-heading">
              <span className="green-text">{dict.title1}</span>{dict.title2}<br />{dict.title3}
            </h2>
            <div className="divider" />
          </div>
          <p className="expertise-intro">{dict.desc}</p>
        </div>

        {/* ── Rows ── */}
        <div className="expertise-rows">
          {rows.map((row, i) => (
            <div key={i} className={`expertise-row ${row.imgRight ? '' : 'expertise-row-reverse'}`}>
              {/* Text side */}
              <div className="expertise-text">
                <div className="expertise-row-title-wrap">
                  <span className="expertise-check-dot">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                  </span>
                  <h3 className="expertise-row-title">{row.title}</h3>
                  {row.badge && <span className="expertise-badge">{row.badge}</span>}
                </div>
                <div className="divider" style={{marginTop: 0}} />
                <p className="expertise-row-desc">{row.desc}</p>
                <ul className="expertise-bullets">
                  {row.bullets.map((b, j) => (
                    <li key={j} className="expertise-bullet">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Image side */}
              <div className="expertise-img-wrap">
                <img src={row.img} alt={row.imgAlt} className="expertise-img" />
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="expertise-cta">
          <Link href={lang ? `/${lang}/leistungen` : '/leistungen'} className="btn-primary">
            {dict.btn}
          </Link>
        </div>

      </div>
    </section>
  )
}
