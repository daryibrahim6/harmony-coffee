import { CollectionConfig } from 'payload'

export const Standards: CollectionConfig = {
  slug: 'standards',
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
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        description: 'Display number, e.g. "01", "02"',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
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
