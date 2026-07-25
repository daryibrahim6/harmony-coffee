import { getPayload } from 'payload'
import config from '../payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding product groups...')

  const robustaGroup = await payload.create({
    collection: 'product-groups',
    data: {
      title: 'ROBUST(A) TROUPE',
      slug: 'robusta',
      subtitle: 'Bold, full-bodied blends designated for espresso.',
    },
  })

  const arabicaGroup = await payload.create({
    collection: 'product-groups',
    data: {
      title: 'ARABICA TROUPE',
      slug: 'arabica',
      subtitle: 'Single origin specialty, curated for the discerning palate.',
    },
  })

  const greenGroup = await payload.create({
    collection: 'product-groups',
    data: {
      title: 'Green Bean',
      slug: 'green',
      subtitle: 'Unroasted specialty grade green beans.',
    },
  })

  console.log('Seeding standards...')

  const standards = [
    { number: '01', title: 'Fresh & Natural', description: 'Sourced directly from local Indonesian farmers, our beans are harvested at peak ripeness and processed with care to preserve their natural flavor profile.', sortOrder: 1 },
    { number: '02', title: 'Hygienic Processing', description: 'Every step of our roasting process adheres to strict hygiene standards, ensuring that you receive clean, safe, and high-quality coffee beans.', sortOrder: 2 },
    { number: '03', title: 'Guaranteed Quality', description: 'We select only the finest grade beans and rigorously test each batch for defects, moisture content, and cup quality before it reaches you.', sortOrder: 3 },
    { number: '04', title: 'Fair Trade', description: 'We are committed to equitable partnerships with our farmers, ensuring they receive fair compensation for their dedication and craft.', sortOrder: 4 },
  ]

  for (const s of standards) {
    await payload.create({ collection: 'standards', data: s })
  }

  console.log('Seeding testimonials...')

  const testimonials = [
    { quote: 'The Krama Robusta is absolutely phenomenal. Bold, intense, but surprisingly smooth. My customers love it.', authorName: 'Budi S.', authorRole: 'Cafe Owner', pill: 'Loyal Customer', sortOrder: 1 },
    { quote: "Their House Blend changed how I see local beans. The chocolate-citrus balance is spot on.", authorName: 'Sarah W.', authorRole: 'Coffee Buyer', pill: 'Retail Partner', sortOrder: 2 },
    { quote: 'Packaging quality and after-sales service are excellent. Reorder process is always smooth.', authorName: 'Andre L.', authorRole: 'Hospitality Group', pill: 'Corporate Client', sortOrder: 3 },
  ]

  for (const t of testimonials) {
    await payload.create({ collection: 'testimonials', data: t })
  }

  console.log('Seeding site settings...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brandName: "D'Harmony Coffee Beans and Roastery",
      whatsappNumber: '6281299435019',
      hero: {
        subtitle: 'SPECIALTY COFFEE BEANS & ROASTERY',
        title: 'sip the balance, Taste the Harmony',
        tagline: 'balancing the flavour',
      },
      about: {
        pullquote: 'Every great cup of coffee is a matter of equilibrium.',
        paragraphs: [
          { text: 'D\'Harmony was born from a simple belief: that exceptional coffee should be accessible, honest, and deeply rooted in its origin. We work directly with farmers across the Indonesian archipelago to bring you beans that tell a story.' },
          { text: 'Our roasting philosophy centers on balance. We do not chase trends or extremes. Instead, we coax out the natural character of each bean, finding the sweet spot where acidity, body, and aroma exist in harmony.' },
          { text: 'From robusta blends built for espresso to single-origin arabica that shines in a pour-over, every product in our lineup is a reflection of our commitment to quality and transparency.' },
        ],
        stats: [
          { number: '2021', label: 'Est. Year' },
          { number: '12+', label: 'Origins' },
          { number: '24', label: 'Roast Profiles' },
        ],
      },
      cta: {
        preheading: 'Taste the harmony',
        heading: 'Ready to Order?',
        subtext: 'Chat directly with us via WhatsApp. Fast, easy, and personal service right to your doorstep.',
        points: [
          { text: 'Fast Response' },
          { text: 'Export Buyer Friendly' },
          { text: 'Custom Roast Discussion' },
        ],
      },
      footer: {
        tagline: 'Balancing the flavour of Nusantara coffee.',
        address: 'Jl. Dalang I No.45, RT.003/RW.017,\nRawalumbu, Kec. Bekasi Tim.,\nKota Bks, Jawa Barat 17116\nIndonesia',
        mapUrl: 'https://maps.app.goo.gl/9Qd4qH7uL6zLwR6m9',
      },
      social: {
        instagram: 'https://www.instagram.com/harmonycoffeebeans/',
        tiktok: 'https://www.tiktok.com/@harmonycoffeebeans',
        shopee: 'https://shopee.co.id/harmonycoffeebean',
        tokopedia: 'https://tokopedia.com/harmonycoffeebean',
      },
      seo: {
        metaTitle: "D'Harmony Coffee Beans and Roastery",
        metaDescription: "D'Harmony Coffee Beans and Roastery - Specialty coffee roasted to perfection. Sip the Balance, Taste the Harmony.",
      },
    },
  })

  console.log('Seed complete!')
  console.log(`  Product Groups: ${[robustaGroup.id, arabicaGroup.id, greenGroup.id].length}`)
  console.log(`  Standards: ${standards.length}`)
  console.log(`  Testimonials: ${testimonials.length}`)
  console.log('  SiteSettings: updated')

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
