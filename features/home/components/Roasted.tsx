'use client'

import { useState } from 'react'

import { Product } from '@/payload-types'

interface RoastedProps {
  robustaProducts: Product[]
  arabicaProducts: Product[]
  whatsappNumber: string | null | undefined
}

export function Roasted({}: RoastedProps) {
  const [activeTroupe, setActiveTroupe] = useState<'robusta' | 'arabica' | null>(null)

  return (
    <section className="roasted-section" id="roasted" data-theme="dark">
      <div className="container">
        <h2 className="sr-only">Roasted Bean Collections</h2>
        <div className="section-header" data-gsap="fade-up">
          <span className="badge badge--red">ROASTED BEAN</span>
          <p className="roasted__hint">Tap either side to explore the full lineup</p>
        </div>
        <div className="troupe-split">
          <div
            className={`troupe-col ${activeTroupe === 'robusta' ? 'is-hovered' : ''}`}
            data-troupe="robusta"
            role="button"
            tabIndex={0}
            aria-label="View Robusta coffee lineup"
            onClick={() => setActiveTroupe('robusta')}
            onPointerEnter={() => setActiveTroupe('robusta')}
            onPointerLeave={() => setActiveTroupe(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveTroupe('robusta')
              }
            }}
          >
            <h2 className="troupe-col__title">ROBUST(A) TROUPE</h2>
            <p className="troupe-col__sub">Bold, full-bodied espresso blends</p>
            <div className="mascot-robusta" role="img" aria-label="Robusta Mascot"></div>
          </div>
          <div className="troupe-divider" aria-hidden="true"></div>
          <div
            className={`troupe-col ${activeTroupe === 'arabica' ? 'is-hovered' : ''}`}
            data-troupe="arabica"
            role="button"
            tabIndex={0}
            aria-label="View Arabica coffee lineup"
            onClick={() => setActiveTroupe('arabica')}
            onPointerEnter={() => setActiveTroupe('arabica')}
            onPointerLeave={() => setActiveTroupe(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setActiveTroupe('arabica')
              }
            }}
          >
            <h2 className="troupe-col__title troupe-col__title--arabica">
              <span className="arabica-wordmark">ARA</span>
              <img src="/assets/decorative/arabica-cradle.svg" className="arabica-svg" alt="Arabica Cradle Icon" />
              <span className="arabica-wordmark">ICA TROUPE</span>
            </h2>
            <p className="troupe-col__sub">Single origin specialty Arabica</p>
            <div className="mascot-arabica" role="img" aria-label="Arabica Mascot"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
