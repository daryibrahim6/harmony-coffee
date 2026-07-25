'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface ProductModalProps {
  robustaProducts: any[]
  arabicaProducts: any[]
  whatsappNumber: string
}

interface SelectedProduct {
  product: any
  groupLabel: string
}

export function ProductModal({ robustaProducts, arabicaProducts, whatsappNumber }: ProductModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState<'robusta' | 'arabica' | null>(null)
  const [selected, setSelected] = useState<SelectedProduct | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)

  const openMenu = useCallback((group: 'robusta' | 'arabica') => {
    setActiveGroup(group)
    setSelected(null)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    setActiveGroup(null)
    setSelected(null)
    setCurrentImageIndex(0)
  }, [])

  useEffect(() => {
    const troupeCols = document.querySelectorAll('[data-troupe]')
    const handlers: { el: Element; handler: (e: Event) => void }[] = []

    troupeCols.forEach((col) => {
      const handler = (e: Event) => {
        e.preventDefault()
        const group = (col as HTMLElement).dataset.troupe as 'robusta' | 'arabica'
        openMenu(group)
      }
      col.addEventListener('click', handler)
      handlers.push({ el: col, handler })
    })

    return () => {
      handlers.forEach(({ el, handler }) => el.removeEventListener('click', handler))
    }
  }, [openMenu])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length) focusable[0].focus()

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => document.removeEventListener('keydown', trapFocus)
  }, [isOpen, selected])

  if (!isOpen) return null

  const products = activeGroup === 'robusta' ? robustaProducts : arabicaProducts
  const groupLabel = activeGroup === 'robusta' ? 'ROBUST(A) TROUPE' : 'ARABICA TROUPE'
  const groupSub = activeGroup === 'robusta'
    ? 'Bold, full-bodied blends designated for espresso.'
    : 'Single origin specialty, curated for the discerning palate.'

  const handleProductClick = (product: any) => {
    setSelected({ product, groupLabel })
    setCurrentImageIndex(0)
  }

  const handleBack = () => {
    setSelected(null)
    setCurrentImageIndex(0)
  }

  const currentProduct = selected?.product
  const images = currentProduct?.gallery?.map((g: any) => g.image?.url).filter(Boolean) || []
  const notes = currentProduct?.notes?.map((n: any) => n.note) || []
  const specs = currentProduct?.specs
  const waText = currentProduct?.waPrefillText || `Hi, I would like to order ${currentProduct?.title}`
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waText)}`

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Product menu"
      onClick={close}
    >
      <div
        className="modal-container"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={close} aria-label="Close modal">
          <span></span>
          <span></span>
        </button>

        {!selected ? (
          <div className="modal-menu-view">
            <div className="modal-menu-header">
              <h2 className="modal-menu-title">{groupLabel}</h2>
              <p className="modal-menu-subtitle">{groupSub}</p>
            </div>
            <div className="modal-cards">
              {products?.map((product) => {
                const img = product?.gallery?.[0]?.image?.url
                return (
                  <article
                    key={product.id}
                    className="modal-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleProductClick(product)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleProductClick(product)
                      }
                    }}
                  >
                    {img && <img src={img} alt={product.title} className="modal-card__img" />}
                    <div className="modal-card__body">
                      <h3 className="modal-card__name">{product.title}</h3>
                      {product.origin && (
                        <p className="modal-card__origin">{product.origin}</p>
                      )}
                      {product.shortDesc && (
                        <p className="modal-card__desc">{product.shortDesc}</p>
                      )}
                    </div>
                  </article>
                )
              })}
              {products?.length === 0 && (
                <p className="modal-empty">No products available yet.</p>
              )}
            </div>
          </div>
        ) : (
          <div className="modal-detail-view">
            <button className="modal-back" onClick={handleBack} aria-label="Back to menu">
              <span>←</span> Back to {groupLabel}
            </button>

            <div className="modal-detail">
              <div className="modal-detail__gallery">
                {images.length > 0 && (
                  <>
                    <img
                      src={images[currentImageIndex]}
                      alt={currentProduct.title}
                      className="modal-detail__img"
                    />
                    {images.length > 1 && (
                      <div className="modal-detail__thumbs">
                        {images.map((img: string, i: number) => (
                          <button
                            key={i}
                            className={`modal-detail__thumb ${i === currentImageIndex ? 'is-active' : ''}`}
                            onClick={() => setCurrentImageIndex(i)}
                            aria-label={`View image ${i + 1}`}
                          >
                            <img src={img} alt="" />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="modal-detail__info">
                <h2 className="modal-detail__name">{currentProduct.title}</h2>
                {currentProduct.origin && (
                  <p className="modal-detail__origin">{currentProduct.origin}</p>
                )}
                {currentProduct.shortDesc && (
                  <p className="modal-detail__shortdesc">{currentProduct.shortDesc}</p>
                )}

                {specs && (specs.roast || specs.body || specs.acidity || specs.process) && (
                  <div className="modal-detail__specs">
                    {specs.roast && <span className="spec-pill">Roast: {specs.roast}</span>}
                    {specs.body && <span className="spec-pill">Body: {specs.body}</span>}
                    {specs.acidity && <span className="spec-pill">Acidity: {specs.acidity}</span>}
                    {specs.process && <span className="spec-pill">Process: {specs.process}</span>}
                  </div>
                )}

                {notes.length > 0 && (
                  <div className="modal-detail__notes">
                    {notes.map((n: string, i: number) => (
                      <span key={i} className="pill pill--outline">{n}</span>
                    ))}
                  </div>
                )}

                {currentProduct.longStory && (
                  <div
                    className="modal-detail__story"
                    dangerouslySetInnerHTML={{ __html: currentProduct.longStory }}
                  />
                )}

                {currentProduct.priceLabel && (
                  <p className="modal-detail__price">{currentProduct.priceLabel}</p>
                )}

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
        )}
      </div>
    </div>
  )
}
