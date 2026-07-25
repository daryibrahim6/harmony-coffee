import { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        if ((req as any).next) {
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        }
      },
    ],
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
      defaultValue: "D'Harmony Coffee Beans and Roastery",
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      label: 'WhatsApp Number',
      defaultValue: '6281299435019',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'subtitle', type: 'text', defaultValue: 'SPECIALTY COFFEE BEANS & ROASTERY' },
        { name: 'title', type: 'text', defaultValue: 'sip the balance, Taste the Harmony' },
        { name: 'tagline', type: 'text', defaultValue: 'balancing the flavour' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'About Section',
      fields: [
        { name: 'pullquote', type: 'text', defaultValue: 'Every great cup of coffee is a matter of equilibrium.' },
        {
          name: 'paragraphs',
          type: 'array',
          label: 'Paragraphs',
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'stats',
          type: 'array',
          label: 'Micro Stats',
          fields: [
            { name: 'number', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
        { name: 'photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA Section',
      fields: [
        { name: 'preheading', type: 'text', defaultValue: 'Taste the harmony' },
        { name: 'heading', type: 'text', defaultValue: 'Ready to Order?' },
        { name: 'subtext', type: 'textarea', defaultValue: 'Chat directly with us via WhatsApp. Fast, easy, and personal service right to your doorstep.' },
        {
          name: 'points',
          type: 'array',
          label: 'CTA Points',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        { name: 'tagline', type: 'text', defaultValue: 'Balancing the flavour of Nusantara coffee.' },
        { name: 'address', type: 'textarea', defaultValue: 'Jl. Dalang I No.45, RT.003/RW.017,\nRawalumbu, Kec. Bekasi Tim.,\nKota Bks, Jawa Barat 17116\nIndonesia' },
        { name: 'mapUrl', type: 'text', defaultValue: 'https://maps.app.goo.gl/9Qd4qH7uL6zLwR6m9' },
      ],
    },
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        { name: 'instagram', type: 'text', defaultValue: 'https://www.instagram.com/harmonycoffeebeans/' },
        { name: 'tiktok', type: 'text', defaultValue: 'https://www.tiktok.com/@harmonycoffeebeans' },
        { name: 'shopee', type: 'text', defaultValue: 'https://shopee.co.id/harmonycoffeebean' },
        { name: 'tokopedia', type: 'text', defaultValue: 'https://tokopedia.com/harmonycoffeebean' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', defaultValue: "D'Harmony Coffee Beans and Roastery" },
        {
          name: 'metaDescription',
          type: 'textarea',
          defaultValue: "D'Harmony Coffee Beans and Roastery - Specialty coffee roasted to perfection. Sip the Balance, Taste the Harmony.",
        },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        {
          name: 'structuredData',
          type: 'json',
          label: 'Structured Data (JSON-LD)',
          admin: {
            description: 'LocalBusiness schema for search engines. Edit NAP data here.',
          },
        },
      ],
    },
  ],
}
