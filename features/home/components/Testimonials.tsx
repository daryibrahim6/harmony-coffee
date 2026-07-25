import { Testimonial } from '@/payload-types'

interface TestimonialsProps {
  items: Testimonial[]
}

export function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="testimonials-section section" id="testimonials" data-theme="dark">
      <div className="container">
        <div className="testimonials__header text-center" data-gsap="fade-up">
          <span className="badge badge--dark">TESTIMONIALS</span>
          <h2 className="section__title mb-12 text-white">What They Say</h2>
          <p className="testimonials__lead">
            Feedback from buyers who value flavor clarity, consistency, and dependable service.
          </p>
        </div>
        <div className="testimonials__grid" data-gsap="fade-up" data-gsap-delay="0.1">
          {items?.map((item) => (
            <article key={item.id} className="testimonial-card">
              {item.pill && <span className="testimonial-card__pill">{item.pill}</span>}
              <p className="testimonial-card__quote">&ldquo;{item.quote}&rdquo;</p>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar" aria-hidden="true"></div>
                <div className="testimonial-card__author-info">
                  <div className="testimonial-card__author">{item.authorName}</div>
                  {item.authorRole && (
                    <div className="testimonial-card__role">{item.authorRole}</div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
