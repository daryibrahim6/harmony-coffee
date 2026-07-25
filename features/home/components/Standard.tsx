import { Standard as StandardType } from '@/payload-types'

interface StandardProps {
  items: StandardType[]
}

export function Standard({ items }: StandardProps) {
  return (
    <section className="standard-section section" id="standard" data-theme="light">
      <div className="container">
        <div className="standard__header text-center" data-gsap="fade-up">
          <span className="badge badge--red">WHY CHOOSE US</span>
          <h2 className="section__title mb-12">The D&apos;Harmony Standard</h2>
        </div>
        <div className="swiss__grid">
          {items?.map((item, i) => (
            <article
              key={item.id}
              className="swiss-item"
              data-gsap="fade-up"
              data-gsap-delay={`0.${i + 1}`}
            >
              <div className="swiss-item__num">{item.number}</div>
              <h3 className="swiss-item__title">{item.title}</h3>
              {item.description && (
                <p className="swiss-item__desc">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
