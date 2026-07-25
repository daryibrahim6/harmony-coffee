interface AboutProps {
  pullquote: string
  paragraphs: any[]
  stats: any[]
}

export function About({ pullquote, paragraphs, stats }: AboutProps) {
  return (
    <section className="about section" id="about" data-theme="light">
      <div className="container">
        <h2 className="sr-only">About D'Harmony Coffee</h2>
        <div className="about__header" data-gsap="fade-up">
          <span className="badge badge--red">OUR STORY</span>
          <blockquote className="about__pullquote">{pullquote}</blockquote>
        </div>
        <div className="about__grid">
          <div className="about__text-col" data-gsap="fade-up" data-gsap-delay="0.2">
            {paragraphs?.map((p, i) => (
              <p key={i} className="about__p">{p.text}</p>
            ))}
            {stats?.length > 0 && (
              <div className="about__stats">
                {stats.map((s, i) => (
                  <div key={i} className="stat-item">
                    <span className="stat-number">{s.number}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="about__visual-col" data-gsap="fade-up" data-gsap-delay="0.4">
            <img
              src="/assets/photos/company.webp"
              alt="D'Harmony Coffee Roastery"
              className="about__photo"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
