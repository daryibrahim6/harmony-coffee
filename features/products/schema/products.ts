import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    afterChange: [
      async ({ req }) => {
        if ((req as any).next) {
          const { revalidateTag } = await import('next/cache')
          revalidateTag('products')
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'productGroup',
      type: 'relationship',
      relationTo: 'product-groups',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'origin',
      type: 'text',
    },
    {
      name: 'shortDesc',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'longStory',
      type: 'richText',
      label: 'Long Story',
    },
    {
      name: 'specs',
      type: 'group',
      label: 'Specifications',
      fields: [
        { name: 'roast', type: 'text' },
        { name: 'body', type: 'text' },
        { name: 'acidity', type: 'text' },
        { name: 'process', type: 'text' },
      ],
    },
    {
      name: 'priceLabel',
      type: 'text',
      label: 'Price Label',
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Tasting Notes',
      fields: [
        {
          name: 'note',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Product Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'Sort Order',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 0,
    },
    {
      name: 'waPrefillText',
      type: 'text',
      label: 'WhatsApp Prefill Text',
      admin: {
        description: 'Custom WhatsApp message for this product. Leave empty to use default.',
      },
    },
  ],
}
