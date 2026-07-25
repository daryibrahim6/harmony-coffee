import { Navbar } from '@/features/home/components/Navbar'
import { Hero } from '@/features/home/components/Hero'
import { About } from '@/features/home/components/About'
import { Standard } from '@/features/home/components/Standard'
import { Roasted } from '@/features/home/components/Roasted'
import { GreenBean } from '@/features/home/components/GreenBean'
import { Testimonials } from '@/features/home/components/Testimonials'
import { CTA } from '@/features/home/components/CTA'
import { Footer } from '@/features/home/components/Footer'
import { ProductModal } from '@/features/products/components/ProductModal'
import { getSiteSettings } from '@/features/home/services/getSiteSettings'
import { getProductsByGroup } from '@/features/products/services/getProductsByGroup'
import { getTestimonials } from '@/features/home/services/getTestimonials'
import { getStandards } from '@/features/home/services/getStandards'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [siteSettings, robustaProducts, arabicaProducts, greenProducts, testimonials, standards] =
    await Promise.all([
      getSiteSettings(),
      getProductsByGroup('robusta'),
      getProductsByGroup('arabica'),
      getProductsByGroup('green'),
      getTestimonials(),
      getStandards(),
    ])

  return (
    <>
      <Navbar brandName={siteSettings.brandName} />
      <main aria-label="Main content">
        <Hero
          subtitle={siteSettings.hero.subtitle}
          title={siteSettings.hero.title}
          tagline={siteSettings.hero.tagline}
          whatsappNumber={siteSettings.whatsappNumber}
        />
        <About
          pullquote={siteSettings.about.pullquote}
          paragraphs={siteSettings.about.paragraphs}
          stats={siteSettings.about.stats}
        />
        <Standard items={standards} />
        <Roasted
          robustaProducts={robustaProducts}
          arabicaProducts={arabicaProducts}
          whatsappNumber={siteSettings.whatsappNumber}
        />
        <GreenBean
          products={greenProducts}
          whatsappNumber={siteSettings.whatsappNumber}
        />
        <Testimonials items={testimonials} />
        <CTA
          preheading={siteSettings.cta.preheading}
          heading={siteSettings.cta.heading}
          subtext={siteSettings.cta.subtext}
          points={siteSettings.cta.points}
          whatsappNumber={siteSettings.whatsappNumber}
        />
      </main>
      <Footer
        tagline={siteSettings.footer.tagline}
        address={siteSettings.footer.address}
        mapUrl={siteSettings.footer.mapUrl}
        social={siteSettings.social}
        whatsappNumber={siteSettings.whatsappNumber}
      />
      <ProductModal
        robustaProducts={robustaProducts}
        arabicaProducts={arabicaProducts}
        whatsappNumber={siteSettings.whatsappNumber}
      />
    </>
  )
}
