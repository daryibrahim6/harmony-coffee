import { Product } from '@/payload-types'

interface GreenBeanProps {
  products: Product[]
  whatsappNumber: string | null | undefined
}

export function GreenBean({ products, whatsappNumber }: GreenBeanProps) {
  const product = products?.[0]

  const name = product?.title || 'Arabica Pangrango'
  const origin = product?.origin || 'Single Origin · West Java, Mt. Pangrango'
  const desc = product?.shortDesc || 'Clean, bright green beans with floral notes and honey-like sweetness.'
  const firstImage = product?.gallery?.[0]?.image
  const image = (typeof firstImage === 'object' ? firstImage?.url : undefined) || '/assets/products/gayo-arabica.webp'
  const notes = product?.notes?.map((n) => n.note) || ['Floral', 'Honey', 'Citrus']
  const waText = `Hi, I would like to order Green Bean ${name}`
  const waLink = `https://wa.me/${whatsappNumber ?? ''}?text=${encodeURIComponent(waText)}`

  return (
    <section className="green-beans-section" id="green" data-theme="light">
      <div className="grain" aria-hidden="true"></div>
      <img
        src="/assets/decorative/decorator2.webp"
        alt=""
        className="geo geo--flower-scatter-1 parallax-layer"
        data-speed="0.6"
        aria-hidden="true"
      />
      <img
        src="/assets/decorative/decorator1.webp"
        alt=""
        className="geo geo--flower-scatter-2 parallax-layer"
        data-speed="0.4"
        aria-hidden="true"
      />
      <div className="container green-beans-section__content">
        <div className="section-header" data-gsap="fade-up">
          <span className="badge badge--dark">GREEN BEAN</span>
          <h2 className="products__title green-beans-section__title">Single Origin</h2>
        </div>
        <div className="green-bean-card" data-gsap="fade-up">
          <img src={image} alt={name} loading="lazy" />
          <div className="green-bean-details">
            <span className="green-bean-details__tag">Unroasted · Specialty Grade</span>
            <h3 className="green-bean-details__name">{name}</h3>
            <p className="green-bean-details__origin">{origin}</p>
            <p className="green-bean-details__desc">{desc}</p>
            <div className="card__notes">
              {notes.map((n: string, i: number) => (
                <span key={i} className="pill pill--outline">{n}</span>
              ))}
            </div>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--wa-green btn--pill"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
