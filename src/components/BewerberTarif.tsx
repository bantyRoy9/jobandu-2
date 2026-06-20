export default function BewerberTarif({ dict }: { dict: any }) {
  return (
    <section className="tarif-section">
      <div className="section-container">
        <div className="tarif-inner">
          <h2 className="section-heading">{dict.tarifTitle}</h2>
          <div className="divider" />
          <div className="tarif-body">
            <p>{dict.tarifDesc1}</p>
            <p>{dict.tarifDesc2}</p>
          </div>
          <a
            href="/images/igz-tarifvertrag.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="tarif-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {dict.tarifBtn}
          </a>
        </div>
      </div>
    </section>
  )
}
