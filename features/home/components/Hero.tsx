interface HeroProps {
  subtitle: string | null | undefined
  title: string | null | undefined
  tagline: string | null | undefined
  whatsappNumber: string | null | undefined
}

export function Hero({ subtitle, title, tagline, whatsappNumber }: HeroProps) {
  const waLink = `https://wa.me/${whatsappNumber ?? ''}`
  const [titleLine1, titleLine2] = (title ?? '').split(',')

  return (
    <header className="hero" id="hero" data-theme="dark">
      <div className="hero__bg">
        <img src="/assets/photos/hero-bg.webp" alt="" />
        <div className="hero__overlay"></div>
      </div>
      <div className="hero__blob"></div>
      <div className="container hero__grid">
        <div className="hero__text-stack" data-gsap="fade-up">
          <p className="hero__subtitle">{subtitle}</p>
          <h1 className="hero__title hero__title--normal-case">
            {titleLine1}
            {titleLine2 && (<><br />{titleLine2}</>)}
          </h1>
          <div className="hero__tagline-group">
            <p className="hero__tagline-sub">{tagline}</p>
          </div>
          <div className="hero__ctas">
            <a href="#roasted" className="btn btn--red btn--pill">
              <span>Explore Beans</span>
            </a>
            <a
              href={waLink}
              data-contact="whatsapp"
              className="btn btn--outline-cream btn--pill"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
