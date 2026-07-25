import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'authorName',
    group: 'Content',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Author Role',
    },
    {
      name: 'pill',
      type: 'text',
      admin: {
        description: 'Category label, e.g. "Loyal Customer", "Retail Partner"',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
      defaultValue: 0,
    },
  ],
}
