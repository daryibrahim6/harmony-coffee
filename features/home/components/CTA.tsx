interface CTAProps {
  preheading: string
  heading: string
  subtext: string
  points: { text: string }[]
  whatsappNumber: string
}

export function CTA({ preheading, heading, subtext, points, whatsappNumber }: CTAProps) {
  const waLink = `https://wa.me/${whatsappNumber}`

  return (
    <section className="cta section text-center" id="order" data-theme="dark">
      <div className="container relative z-10" data-gsap="fade-up">
        <img
          src="/assets/logo/logo-icon.webp"
          alt=""
          aria-hidden="true"
          className="cta__logo-icon"
        />
        <p className="cta__preheading">{preheading}</p>
        <h2 className="cta__heading">{heading}</h2>
        <p className="cta__sub">{subtext}</p>
        {points?.length > 0 && (
          <div className="cta__points" aria-label="Ordering benefits">
            {points.map((p, i) => (
              <span key={i} className="cta__point">{p.text}</span>
            ))}
          </div>
        )}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--red btn--pill inline-block"
        >
          Order via WhatsApp
        </a>
      </div>
    </section>
  )
}
