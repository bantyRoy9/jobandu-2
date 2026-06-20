export default function ServiceTypes({ dict }: { dict: any }) {
  const services = [
    {
      title: dict.s1Title,
      desc: dict.s1Desc,
      benefitsLabel: dict.s1BenefitsLabel || 'Your Benefits',
      bullets: [dict.s1B1, dict.s1B2, dict.s1B3],
      img: '/images/service-zeitarbeit.png',
      imgRight: true,
    },
    {
      title: dict.s2Title,
      desc: dict.s2Desc,
      benefitsLabel: dict.s2BenefitsLabel || 'This means for you:',
      bullets: [dict.s2B1, dict.s2B2, dict.s2B3],
      img: '/images/service-tryandhire.jpg',
      imgRight: false,
    },
    {
      title: dict.s3Title,
      desc: dict.s3Desc,
      benefitsLabel: dict.s3BenefitsLabel || 'Our recruiting service includes:',
      bullets: [dict.s3B1, dict.s3B2, dict.s3B3],
      img: '/images/service-recruiting.jpg',
      imgRight: true,
    },
  ]

  return (
    <section className="svc-section">
      <div className="section-container">
        <div className="svc-rows">
          {services.map((svc, i) => (
            <div key={i} className={`svc-row ${svc.imgRight ? '' : 'svc-row-flip'}`}>

              {/* ── Text side ── */}
              <div className="svc-text">
                <h3 className="svc-title">{svc.title}</h3>
                <div className="divider" />
                <p className="svc-desc">{svc.desc}</p>
                <p className="svc-benefits-label">{svc.benefitsLabel}</p>
                <ul className="svc-bullets">
                  {svc.bullets.map((b, j) => (
                    <li key={j} className="svc-bullet">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Image side ── */}
              <div className="svc-img-wrap">
                <img
                  src={svc.img}
                  alt={svc.title}
                  className="svc-img"
                  loading="lazy"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
