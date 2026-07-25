interface FooterProps {
  tagline: string | null | undefined
  address: string | null | undefined
  mapUrl: string | null | undefined
  social: {
    instagram?: string | null
    tiktok?: string | null
    shopee?: string | null
    tokopedia?: string | null
  } | undefined
  whatsappNumber: string | null | undefined
}

export function Footer({ tagline, address, mapUrl, social, whatsappNumber }: FooterProps) {
  const waLink = `https://wa.me/${whatsappNumber ?? ''}`

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src="/assets/logo/logo-full.webp" alt="D'Harmony Logo" className="footer__logo" />
          <p className="footer__tagline">{tagline}</p>
        </div>
        <div className="footer__contact">
          <h4 className="footer__label">Visit Us</h4>
          <a
            href={mapUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="footer__address-link"
          >
            <p className="footer__address">
              {address?.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < (address?.split('\n').length ?? 0) - 1 && <br />}
                </span>
              ))}
            </p>
          </a>
        </div>
        <div className="footer__socials">
          <h4 className="footer__label">Connect With Us</h4>
          <div className="footer__social-links">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--wa"
              aria-label="WhatsApp"
            >
              <span className="social-link__icon-wrapper">
                <img src="/assets/icons/wa.svg" alt="" width="20" height="20" />
              </span>
              <span className="social-link__text">WhatsApp</span>
            </a>
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link--ig"
                aria-label="Instagram"
              >
                <span className="social-link__icon-wrapper">
                  <img src="/assets/icons/ig.svg" alt="" width="20" height="20" />
                </span>
                <span className="social-link__text">Instagram</span>
              </a>
            )}
            {social?.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link--tiktok"
                aria-label="TikTok"
              >
                <span className="social-link__icon-wrapper">
                  <img src="/assets/icons/tiktok.svg" alt="" width="20" height="20" />
                </span>
                <span className="social-link__text">TikTok</span>
              </a>
            )}
            {social?.shopee && (
              <a
                href={social.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link--shopee"
                aria-label="Shopee"
              >
                <span className="social-link__icon-wrapper">
                  <img src="/assets/icons/shopee.svg" alt="" width="20" height="20" />
                </span>
                <span className="social-link__text">Shopee</span>
              </a>
            )}
            {social?.tokopedia && (
              <a
                href={social.tokopedia}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link--tokped"
                aria-label="Tokopedia"
              >
                <span className="social-link__icon-wrapper">
                  <img src="/assets/icons/tokped.svg" alt="" width="20" height="20" />
                </span>
                <span className="social-link__text">Tokopedia</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} D&apos;Harmony Coffee Beans and Roastery. All rights reserved.</p>
      </div>
    </footer>
  )
}
