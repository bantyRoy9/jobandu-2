export default function FeatureStrip({ dict }: { dict: any }) {
  const features = [
    {
      text: dict.f1,
      icon: "https://jobandu.de/wp-content/uploads/2021/09/about-icon-1.svg",
    },
    {
      text: dict.f2,
      icon: "https://jobandu.de/wp-content/uploads/2021/09/about-icon-2.svg",
    },
    {
      text: dict.f3,
      icon: "https://jobandu.de/wp-content/uploads/2021/09/about-icon-3.svg",
    },
    {
      text: dict.f4,
      icon: "https://jobandu.de/wp-content/uploads/2021/09/about-icon-4.svg",
    },
  ]

  return (
    <>
      {/* 4-col feature strip */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-800">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-start sm:items-center text-left sm:text-center px-4 pt-6 sm:pt-0">
                <img src={f.icon} alt="feature icon" className="w-12 h-12 mb-4" />
                <h5 className="text-sm font-semibold text-white leading-snug">{f.text}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Green emergency bar */}
      <div className="emergency-bar">
        <a href="tel:+491732827622" className="hover:underline text-white flex items-center justify-center gap-2">
          <span>{dict.emergency}</span>
          <strong>+49 1732827622</strong>
        </a>
      </div>
    </>
  )
}
