import type { Product, Standard, Testimonial, SiteSetting } from '@/payload-types'

export const mockStandards: Standard[] = [
  { id: 1, number: '01', title: 'Fresh & Natural', description: 'Sourced directly from local Indonesian farmers, our beans are harvested at peak ripeness and processed with care to preserve their natural flavor profile.', sortOrder: 1, updatedAt: '', createdAt: '' },
  { id: 2, number: '02', title: 'Hygienic Processing', description: 'Every step of our roasting process adheres to strict hygiene standards, ensuring that you receive clean, safe, and high-quality coffee beans.', sortOrder: 2, updatedAt: '', createdAt: '' },
  { id: 3, number: '03', title: 'Guaranteed Quality', description: 'We select only the finest grade beans and rigorously test each batch for defects, moisture content, and cup quality before it reaches you.', sortOrder: 3, updatedAt: '', createdAt: '' },
  { id: 4, number: '04', title: 'Fair Trade', description: 'We are committed to equitable partnerships with our farmers, ensuring they receive fair compensation for their dedication and craft.', sortOrder: 4, updatedAt: '', createdAt: '' },
]

export const mockTestimonials: Testimonial[] = [
  { id: 1, quote: 'The Krama Robusta is absolutely phenomenal. Bold, intense, but surprisingly smooth. My customers love it.', authorName: 'Budi S.', authorRole: 'Cafe Owner', pill: 'Loyal Customer', sortOrder: 1, updatedAt: '', createdAt: '' },
  { id: 2, quote: "Their House Blend changed how I see local beans. The chocolate-citrus balance is spot on.", authorName: 'Sarah W.', authorRole: 'Coffee Buyer', pill: 'Retail Partner', sortOrder: 2, updatedAt: '', createdAt: '' },
  { id: 3, quote: 'Packaging quality and after-sales service are excellent. Reorder process is always smooth.', authorName: 'Andre L.', authorRole: 'Hospitality Group', pill: 'Corporate Client', sortOrder: 3, updatedAt: '', createdAt: '' },
]

export const mockProducts: Record<string, Product[]> = {
  robusta: [
    { id: 1, title: 'Krama Robusta', productGroup: 1, origin: 'Single Origin · Lampung', shortDesc: 'Bold, full-bodied with dark chocolate and nutty notes.', specs: { roast: 'Dark', body: 'Full', acidity: 'Low', process: 'Wet-hulled' }, priceLabel: 'Rp 75.000 / 250g', notes: [{ note: 'Dark Chocolate' }, { note: 'Nutty' }, { note: 'Bold' }], gallery: [{ image: { id: 1, url: '/assets/products/gayo-arabica.webp', updatedAt: '', createdAt: '' } }], sortOrder: 1, waPrefillText: 'Hi, I would like to order Krama Robusta', updatedAt: '', createdAt: '' },
    { id: 2, title: 'House Blend Robusta', productGroup: 1, origin: 'Blend · Lampung & Java', shortDesc: 'Smooth espresso blend with caramel sweetness.', specs: { roast: 'Medium-Dark', body: 'Full', acidity: 'Medium', process: 'Wet-hulled' }, priceLabel: 'Rp 85.000 / 250g', notes: [{ note: 'Caramel' }, { note: 'Cocoa' }, { note: 'Smooth' }], gallery: [{ image: { id: 2, url: '/assets/products/gayo-arabica.webp', updatedAt: '', createdAt: '' } }], sortOrder: 2, waPrefillText: 'Hi, I would like to order House Blend Robusta', updatedAt: '', createdAt: '' },
  ],
  arabica: [
    { id: 3, title: 'Gayo Arabica', productGroup: 2, origin: 'Single Origin · Aceh Gayo', shortDesc: 'Clean, bright with floral notes and citrus acidity.', specs: { roast: 'Medium', body: 'Medium', acidity: 'High', process: 'Washed' }, priceLabel: 'Rp 95.000 / 250g', notes: [{ note: 'Floral' }, { note: 'Citrus' }, { note: 'Clean' }], gallery: [{ image: { id: 3, url: '/assets/products/gayo-arabica.webp', updatedAt: '', createdAt: '' } }], sortOrder: 1, waPrefillText: 'Hi, I would like to order Gayo Arabica', updatedAt: '', createdAt: '' },
    { id: 4, title: 'Pangrango Arabica', productGroup: 2, origin: 'Single Origin · West Java', shortDesc: 'Sweet, syrupy body with honey and stone fruit.', specs: { roast: 'Medium', body: 'Full', acidity: 'Medium', process: 'Honey' }, priceLabel: 'Rp 100.000 / 250g', notes: [{ note: 'Honey' }, { note: 'Stone Fruit' }, { note: 'Syrupy' }], gallery: [{ image: { id: 4, url: '/assets/products/gayo-arabica.webp', updatedAt: '', createdAt: '' } }], sortOrder: 2, waPrefillText: 'Hi, I would like to order Pangrango Arabica', updatedAt: '', createdAt: '' },
  ],
  green: [
    { id: 5, title: 'Arabica Pangrango Green', productGroup: 3, origin: 'Single Origin · West Java, Mt. Pangrango', shortDesc: 'Clean, bright green beans with floral notes and honey-like sweetness.', specs: { process: 'Washed' }, notes: [{ note: 'Floral' }, { note: 'Honey' }, { note: 'Citrus' }], gallery: [{ image: { id: 5, url: '/assets/products/gayo-arabica.webp', updatedAt: '', createdAt: '' } }], sortOrder: 1, waPrefillText: 'Hi, I would like to order Green Bean Arabica Pangrango', updatedAt: '', createdAt: '' },
  ],
}

export const mockSiteSettings: SiteSetting = {
  id: 0,
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
      { text: "D'Harmony was born from a simple belief: that exceptional coffee should be accessible, honest, and deeply rooted in its origin. We work directly with farmers across the Indonesian archipelago to bring you beans that tell a story." },
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
}
