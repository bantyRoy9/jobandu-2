export default function Industries({ dict }: { dict: any }) {
  const industries = [
    {
      title: dict.ind1Title,
      desc: dict.ind1Desc,
      img: 'https://jobandu.de/wp-content/uploads/2025/05/0fee25c922f61800938d163c2321999b.jpg',
    },
    {
      title: dict.ind2Title,
      desc: dict.ind2Desc,
      img: 'https://jobandu.de/wp-content/uploads/2025/05/lkw.jpg',
    },
    {
      title: dict.ind3Title,
      desc: dict.ind3Desc,
      img: 'https://jobandu.de/wp-content/uploads/2025/05/Industrie-scaled.jpg',
    },
  ]

  return (
    <section className="ind-section">
      <div className="section-container">
        <h2 className="section-heading">{dict.indTitle}</h2>
        <div className="divider" />
        <p className="ind-desc">{dict.indDesc}</p>

        <div className="ind-grid">
          {industries.map((ind, i) => (
            <div key={i} className="ind-card">
              <div className="ind-img-wrap">
                <img
                  src={ind.img}
                  alt={ind.title}
                  className="ind-img"
                  loading="lazy"
                />
              </div>
              <div className="ind-body">
                <h3 className="ind-title">{ind.title}</h3>
                <p className="ind-text">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
